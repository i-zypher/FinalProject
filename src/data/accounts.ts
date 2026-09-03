// Runtime-only "accounts" store — resets on every app reload/restart.
// This is a stand-in for a real backend so a name typed at Signup can
// actually show up after Login, without building real persistence.
type Account = {
  email: string;
  name: string;
};

const accounts: Account[] = [];

export function saveAccount(email: string, name: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = accounts.find((a) => a.email === normalizedEmail);
  if (existing) {
    existing.name = name;
  } else {
    accounts.push({ email: normalizedEmail, name });
  }
}

export function findAccountName(email: string): string | undefined {
  const normalizedEmail = email.trim().toLowerCase();
  return accounts.find((a) => a.email === normalizedEmail)?.name;
}