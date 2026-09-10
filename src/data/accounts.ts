import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'aura_accounts';

// Stored as a plain object: { "someone@email.com": "Full Name" }
type AccountMap = Record<string, string>;

async function loadAccounts(): Promise<AccountMap> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Failed to load accounts from storage', err);
    return {};
  }
}

async function persistAccounts(accounts: AccountMap): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.warn('Failed to save accounts to storage', err);
  }
}

export async function saveAccount(email: string, name: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  accounts[normalizedEmail] = name;
  await persistAccounts(accounts);
}
export async function deleteAccount(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  delete accounts[normalizedEmail];
  await persistAccounts(accounts);
}

export async function findAccountName(email: string): Promise<string | undefined> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  return accounts[normalizedEmail];
}