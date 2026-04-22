import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button, Input, Card } from '../../components';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onForgotPassword,
  onSignUp,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!email.includes('@')) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="shield-checkmark" size={50} color={colors.primary} />
          </View>
          <Text style={styles.title}>TDPRS Login</Text>
          <Text style={styles.subtitle}>
            Secure Student Payment Record System
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address or Student ID"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
            containerStyle={styles.inputContainer}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={errors.password}
            rightIcon={showPassword ? 'eye' : 'eye-off'}
            onRightIconPress={() => setShowPassword(!showPassword)}
            containerStyle={styles.inputContainer}
          />

          <TouchableOpacity onPress={onForgotPassword} style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            label="Login"
            onPress={handleLogin}
            loading={loading}
            size="large"
            variant="primary"
            style={styles.loginButton}
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or connect wallet</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.walletOptions}>
          <Card style={styles.walletCard} onPress={() => {}}>
            <View style={styles.walletItem}>
              <Icon name="wallet" size={24} color={colors.primary} />
              <Text style={styles.walletLabel}>MetaMask</Text>
              <Icon name="chevron-forward" size={20} color={colors.gray400} />
            </View>
          </Card>

          <Card style={styles.walletCard} onPress={() => {}}>
            <View style={styles.walletItem}>
              <Icon name="key" size={24} color={colors.secondary} />
              <Text style={styles.walletLabel}>Private Key Import</Text>
              <Icon name="chevron-forward" size={20} color={colors.gray400} />
            </View>
          </Card>

          <Card style={styles.walletCard} onPress={() => {}}>
            <View style={styles.walletItem}>
              <Icon name="business" size={24} color={colors.accent} />
              <Text style={styles.walletLabel}>Institution Wallet</Text>
              <Icon name="chevron-forward" size={20} color={colors.gray400} />
            </View>
          </Card>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onSignUp}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.securityNote}>
          <Icon name="information-circle" size={16} color={colors.info} />
          <Text style={styles.securityText}>
            Your private key is never shared. Always keep it safe.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading2,
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    color: colors.gray600,
  },
  form: {
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  dividerText: {
    ...typography.caption,
    color: colors.gray500,
    marginHorizontal: spacing.md,
  },
  walletOptions: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  walletCard: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  walletLabel: {
    flex: 1,
    ...typography.body2,
    color: colors.gray800,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  signUpText: {
    ...typography.body2,
    color: colors.gray600,
  },
  signUpLink: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '700',
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  securityText: {
    flex: 1,
    ...typography.caption,
    color: colors.info,
  },
});
