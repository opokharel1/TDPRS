import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius } from '../theme';
import {
  Header,
  BalanceCard,
  StatCard,
  QuickAction,
  TransactionCard,
} from '../components';

interface StudentDashboardScreenProps {
  onViewReceipts: () => void;
  onViewPaymentHistory: () => void;
  onViewProfile: () => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({
  onViewReceipts,
  onViewPaymentHistory,
  onViewProfile,
}) => {
  const [transactions] = useState([
    {
      id: '1',
      type: 'sent' as const,
      label: 'Tuition Fee - Spring 2024',
      amount: 5000,
      date: 'Today',
      status: 'confirmed' as const,
      icon: 'school',
    },
    {
      id: '2',
      type: 'sent' as const,
      label: 'Library Fee',
      amount: 150,
      date: 'Yesterday',
      status: 'confirmed' as const,
      icon: 'book',
    },
    {
      id: '3',
      type: 'sent' as const,
      label: 'Lab Fee - Physics',
      amount: 200,
      date: '2 days ago',
      status: 'pending' as const,
      icon: 'flask',
    },
  ]);

  const stats = [
    {
      label: 'Total Paid',
      value: '$12,500',
      icon: 'wallet',
      iconBgColor: colors.primaryLight,
      onPress: onViewPaymentHistory,
    },
    {
      label: 'Pending',
      value: '$2,000',
      icon: 'hourglass',
      iconBgColor: colors.secondaryLight,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Dashboard"
        showBackButton={false}
        rightIcon="person"
        onRightPress={onViewProfile}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard
          balance={8500}
          walletAddress="0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5"
        />

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <FlatList
            data={stats}
            renderItem={({ item }) => (
              <View style={styles.statItem}>
                <StatCard {...item} />
              </View>
            )}
            keyExtractor={(item) => item.label}
            scrollEnabled={false}
            nestedScrollEnabled={false}
          />
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              label="View Receipts"
              icon="document"
              onPress={onViewReceipts}
              backgroundColor={colors.primaryLight}
              iconColor={colors.primary}
            />
            <QuickAction
              label="Download"
              icon="download"
              onPress={() => {}}
              backgroundColor={colors.secondaryLight}
              iconColor={colors.secondary}
            />
            <QuickAction
              label="Verify"
              icon="checkmark-circle"
              onPress={() => {}}
              backgroundColor={colors.accentLight}
              iconColor={colors.accent}
            />
            <QuickAction
              label="Blockchain"
              icon="link"
              onPress={() => {}}
              backgroundColor={colors.gray100}
              iconColor={colors.gray600}
            />
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={onViewPaymentHistory}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              {...transaction}
              onPress={() => {}}
            />
          ))}
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
    paddingVertical: spacing.md,
  },
  statsSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  statItem: {
    marginBottom: spacing.md,
  },
  quickActionsSection: {
    marginBottom: spacing.lg,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  transactionsSection: {
    marginBottom: spacing.lg,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  viewAll: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});
