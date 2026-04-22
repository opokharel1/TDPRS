import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing } from '../theme';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Icon name="shield-checkmark" size={60} color={colors.primary} />
        </View>
        <Text style={styles.title}>TDPRS</Text>
        <Text style={styles.tagline}>
          Secure Student Payment Records on Blockchain
        </Text>
      </View>
      <View style={styles.loader}>
        <View style={[styles.loaderBar, styles.loaderBar1]} />
        <View style={[styles.loaderBar, styles.loaderBar2]} />
        <View style={[styles.loaderBar, styles.loaderBar3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading1,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  tagline: {
    ...typography.body2,
    color: colors.gray600,
    textAlign: 'center',
    maxWidth: 250,
  },
  loader: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  loaderBar: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  loaderBar1: {
    opacity: 0.3,
  },
  loaderBar2: {
    opacity: 0.6,
  },
  loaderBar3: {
    opacity: 1,
  },
});
