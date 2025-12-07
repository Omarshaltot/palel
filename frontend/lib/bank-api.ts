/**
 * Call the Bank Bridge API to execute banking operations
 * @param username - User's username
 * @param password - User's password
 * @param command - Command to execute (e.g., "DEPOSIT|500", "WITHDRAW|100", "BALANCE", "TRANSFER|username2|200")
 * @returns Promise with the API response
 */
export async function callBankAPI(
  username: string,
  password: string,
  command: string
): Promise<{ success: boolean; message: string; data?: string }> {
  try {
    const response = await fetch('http://localhost:8080/api/bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        command,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Failed to connect to server',
    };
  }
}

// Example usage in your components:

/**
 * Example: Deposit money
 */
export async function depositMoney(username: string, password: string, amount: number) {
  return await callBankAPI(username, password, `DEPOSIT|${amount}`);
}

/**
 * Example: Withdraw money
 */
export async function withdrawMoney(username: string, password: string, amount: number) {
  return await callBankAPI(username, password, `WITHDRAW|${amount}`);
}

/**
 * Example: Check balance
 */
export async function checkBalance(username: string, password: string) {
  return await callBankAPI(username, password, 'BALANCE');
}

/**
 * Example: Transfer money
 */
export async function transferMoney(
  username: string,
  password: string,
  toUsername: string,
  amount: number
) {
  return await callBankAPI(username, password, `TRANSFER|${toUsername}|${amount}`);
}

/**
 * Example: Get transaction history
 */
export async function getTransactionHistory(username: string, password: string) {
  return await callBankAPI(username, password, 'HISTORY');
}
