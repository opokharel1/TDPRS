import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    };

    // Size variants
    if (size === 'small') {
      baseStyle.paddingVertical = spacing.sm;
      baseStyle.paddingHorizontal = spacing.md;
    } else if (size === 'medium') {
      baseStyle.paddingVertical = spacing.md;
      baseStyle.paddingHorizontal = spacing.lg;
    } else if (size === 'large') {
      baseStyle.paddingVertical = spacing.lg;
      baseStyle.paddingHorizontal = spacing.xl;
    }

    // Color variants
    if (variant === 'primary') {
      baseStyle.backgroundColor = disabled ? colors.gray300 : colors.primary;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = disabled ? colors.gray200 : colors.secondary;
    } else if (variant === 'outline') {
      baseStyle.backgroundColor = colors.white;
      baseStyle.borderWidth = 2;
      baseStyle.borderColor = disabled ? colors.gray300 : colors.primary;
    } else if (variant === 'danger') {
      baseStyle.backgroundColor = disabled ? colors.gray300 : colors.error;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle: TextStyle = {
      ...typography.button,
    };

    if (variant === 'outline') {
      baseTextStyle.color = disabled ? colors.gray500 : colors.primary;
    } else {
      baseTextStyle.color = colors.white;
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style, disabled && styles.disabled]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.6,
  },
});
