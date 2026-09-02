import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#4C6EF5',
  primaryDark: '#3B5BDB',
  secondary: '#F5A623',
  background: '#1A1A2E',
  surface: '#16213E',
  text: '#FFFFFF',
  textMuted: '#A0A0B8',
  border: '#2E2E4E',
  error: '#E63946',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSizes = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  screenPadding: {
    padding: spacing.lg,
  },
  headerText: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subHeaderText: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    fontSize: fontSizes.md,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.text,
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
  linkText: {
    color: colors.secondary,
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  
});