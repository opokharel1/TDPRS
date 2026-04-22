import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing } from '../theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  style?: ViewStyle;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  rightIcon,
  onRightPress,
  style,
  showBackButton = true,
}) => {
  return (
    <SafeAreaView style={[styles.header, style]}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          {onBackPress && showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Icon name="chevron-back" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerCenter}>
          <Text style={[typography.heading4, styles.title]}>{title}</Text>
          {subtitle && (
            <Text style={[typography.caption, styles.subtitle]}>{subtitle}</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
              <Icon name={rightIcon} size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

interface StatusIndicatorProps {
  status: 'pending' | 'confirmed' | 'failed' | 'processing';
  size?: 'small' | 'medium' | 'large';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'medium',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'failed':
        return colors.error;
      case 'processing':
        return colors.info;
      default:
        return colors.gray500;
    }
  };

  const getStatusLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const sizeMap = {
    small: 8,
    medium: 12,
    large: 16,
  };

  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusDot,
          {
            width: sizeMap[size],
            height: sizeMap[size],
            backgroundColor: getStatusColor(),
          },
        ]}
      />
      <Text
        style={[
          typography.caption,
          { color: getStatusColor(), fontWeight: '600', marginLeft: spacing.sm },
        ]}
      >
        {getStatusLabel()}
      </Text>
    </View>
  );
};

interface TransactionCardProps {
  type: 'sent' | 'received';
  label: string;
  amount: number;
  date: string;
  status: 'pending' | 'confirmed' | 'failed';
  onPress?: () => void;
  icon?: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  label,
  amount,
  date,
  status,
  onPress,
  icon = 'swap-horizontal',
}) => {
  const isPositive = type === 'received';

  return (
    <TouchableOpacity
      style={styles.transactionCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.transactionIcon,
            { backgroundColor: isPositive ? colors.secondaryLight : colors.primaryLight },
          ]}
        >
          <Icon
            name={icon}
            size={20}
            color={isPositive ? colors.secondary : colors.primary}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={[typography.body2, styles.transactionLabel]}>{label}</Text>
          <Text style={[typography.caption, styles.transactionDate]}>{date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text
          style={[
            typography.body2,
            {
              color: isPositive ? colors.secondary : colors.gray800,
              fontWeight: '600',
            },
          ]}
        >
          {isPositive ? '+' : '-'}${amount.toFixed(2)}
        </Text>
        <StatusIndicator status={status} size="small" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flex: 0.2,
  },
  headerCenter: {
    flex: 0.6,
    alignItems: 'center',
  },
  headerRight: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: spacing.sm,
  },
  rightButton: {
    padding: spacing.sm,
  },
  title: {
    color: colors.gray900,
  },
  subtitle: {
    color: colors.gray500,
    marginTop: spacing.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    borderRadius: 10,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionLabel: {
    color: colors.gray800,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  transactionDate: {
    color: colors.gray500,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
});
