import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, shadow = true }) => {
  const content = (
    <View
      style={[
        styles.card,
        shadow && shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[typography.body2, styles.label, { fontWeight: '600' }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          error && styles.inputError,
        ]}
      >
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.gray400}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            <Icon name={rightIcon} size={20} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[typography.caption, styles.errorText]}>
          {error}
        </Text>
      )}
    </View>
  );
};

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', size = 'medium' }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      case 'info':
        return colors.info;
      default:
        return colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: size === 'small' ? spacing.xs : spacing.sm,
        },
      ]}
    >
      <Text
        style={[
          typography.caption,
          {
            color: colors.white,
            fontWeight: '600',
            fontSize: size === 'small' ? 10 : 12,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.gray800,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.gray100,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    ...typography.body2,
    color: colors.gray800,
  },
  rightIcon: {
    padding: spacing.sm,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
});
