import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';

interface BalanceCardProps {
  balance: number;
  walletAddress?: string;
  style?: ViewStyle;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  walletAddress,
  style,
}) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.balanceCard, shadows.lg, style]}
    >
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Icon name="wallet" size={24} color={colors.white} />
      </View>

      <View style={styles.balanceAmount}>
        <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
        {walletAddress && (
          <Text style={styles.walletAddress}>
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </Text>
        )}
      </View>

      <View style={styles.balanceFooter}>
        <View style={styles.footerItem}>
          <Icon name="arrow-down" size={16} color={colors.white} />
          <Text style={styles.footerLabel}>Received</Text>
        </View>
        <View style={[styles.footerItem, styles.footerDivider]} />
        <View style={styles.footerItem}>
          <Icon name="arrow-up" size={16} color={colors.white} />
          <Text style={styles.footerLabel}>Sent</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  iconBgColor?: string;
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBgColor = colors.primaryLight,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.statCard, shadows.sm]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.statIcon, { backgroundColor: iconBgColor }]}>
        <Icon
          name={icon}
          size={24}
          color={
            iconBgColor === colors.primaryLight
              ? colors.primary
              : iconBgColor === colors.secondaryLight
              ? colors.secondary
              : colors.warning
          }
        />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface QuickActionProps {
  label: string;
  icon: string;
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  label,
  icon,
  onPress,
  backgroundColor = colors.primaryLight,
  iconColor = colors.primary,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.quickAction,
        { backgroundColor },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.quickActionIcon}>
        <Icon name={icon} size={24} color={iconColor} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

interface StatsGridProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon: string;
    iconBgColor?: string;
    onPress?: () => void;
  }>;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <View style={styles.statsGrid}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statGridItem}>
          <StatCard {...stat} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  balanceLabel: {
    ...typography.body2,
    color: colors.white,
    opacity: 0.9,
  },
  balanceAmount: {
    marginBottom: spacing.lg,
  },
  balanceValue: {
    ...typography.heading1,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  walletAddress: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.8,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  footerDivider: {
    opacity: 0.3,
  },
  footerLabel: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  statCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...typography.heading5,
    color: colors.gray900,
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray500,
    marginTop: spacing.xs,
  },
  quickAction: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  quickActionIcon: {
    marginBottom: spacing.sm,
  },
  quickActionLabel: {
    ...typography.caption,
    color: colors.gray800,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsGrid: {
    gap: spacing.md,
  },
  statGridItem: {
    flexDirection: 'row',
  },
});
