import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  secondary: '#F5A623', // provisional — not yet confirmed from Figma's tag/category screens
  background: '#FAF9FC',
  surface: '#FFFFFF',
  text: '#1E1A34',
  textMuted: '#5C5670',
  border: '#EAE7F2',
  error: '#EF4444',
  errorBg: '#FEE2E2',
  logoGradientStart: '#1E1B4B',
  logoGradientEnd: '#4338CA',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};

// Family names must exactly match what useFonts() registers in App.tsx.
export const fonts = {
  headingBold: 'Outfit_700Bold',
  bodyRegular: 'Manrope_400Regular',
  bodySemiBold: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  screenPadding: {
    padding: spacing.lg,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  brandHeader: {
    alignItems: 'center',
    gap: spacing.sm + 4,
  },
  headerText: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.xl,
    color: colors.text,
    textAlign: 'center',
  },
  subHeaderText: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.md,
    color: colors.textMuted,
    textAlign: 'center',
  },
  fieldLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs + 4,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    height: 52,
    paddingHorizontal: spacing.md + 4,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.md,
    color: '#FFFFFF',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  linkText: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  linkTextBold: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  errorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.xs,
    color: colors.error,
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
  logo: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
});