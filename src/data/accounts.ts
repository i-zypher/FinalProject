import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'aura_accounts';

type Account = {
  name: string;
  password: string;
};

type AccountMap = Record<string, Account>;

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

// password is optional so Settings can update just the name/email
// without needing to know (or reset) the existing password.
export async function saveAccount(email: string, name: string, password?: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  const existing = accounts[normalizedEmail];
  accounts[normalizedEmail] = {
    name,
    password: password !== undefined ? password : existing?.password ?? '',
  };
  await persistAccounts(accounts);
}

export async function findAccountName(email: string): Promise<string | undefined> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  return accounts[normalizedEmail]?.name;
}

// Returns the account's name if email+password match a real account,
// or null if the account doesn't exist or the password is wrong. This
// is the actual gate Login checks against now.
export async function verifyCredentials(email: string, password: string): Promise<string | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  const account = accounts[normalizedEmail];
  if (!account) return null;
  if (account.password !== password) return null;
  return account.name;
}

export async function deleteAccount(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  delete accounts[normalizedEmail];
  await persistAccounts(accounts);
}

// --- Profile extras: username, age, country ---
// Unchanged from before — stored separately from the account/password
// map above.

const PROFILE_EXTRA_KEY = 'aura_profile_extra';

export type ProfileExtra = {
  username: string;
  age: number;
  country: string;
};

type ProfileExtraMap = Record<string, ProfileExtra>;

async function loadProfileExtraMap(): Promise<ProfileExtraMap> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_EXTRA_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Failed to load profile extras from storage', err);
    return {};
  }
}

async function persistProfileExtraMap(map: ProfileExtraMap): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILE_EXTRA_KEY, JSON.stringify(map));
  } catch (err) {
    console.warn('Failed to save profile extras to storage', err);
  }
}

export async function saveProfileExtra(email: string, extra: ProfileExtra): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const map = await loadProfileExtraMap();
  map[normalizedEmail] = extra;
  await persistProfileExtraMap(map);
}

export async function loadProfileExtra(email: string): Promise<ProfileExtra | undefined> {
  const normalizedEmail = email.trim().toLowerCase();
  const map = await loadProfileExtraMap();
  return map[normalizedEmail];
}

export async function deleteProfileExtra(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();
  const map = await loadProfileExtraMap();
  delete map[normalizedEmail];
  await persistProfileExtraMap(map);
}