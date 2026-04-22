import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Header, TransactionCard } from '../components';

interface PaymentHistoryScreenProps {
  onTransactionPress: (txId: string) => void;
  onBackPress: () => void;
}

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  label: string;
  amount: number;
  date: string;
  status: 'pending' | 'confirmed' | 'failed';
  icon: string;
  semester: string;
  category: string;
}

export const PaymentHistoryScreen: React.FC<PaymentHistoryScreenProps> = ({
  onTransactionPress,
  onBackPress,
}) => {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'sent',
      label: 'Tuition Fee - Spring 2024',
      amount: 5000,
      date: '2024-04-20',
      status: 'confirmed',
      icon: 'school',
      semester: 'spring2024',
      category: 'tuition',
    },
    {
      id: '2',
      type: 'sent',
      label: 'Library Fee',
      amount: 150,
      date: '2024-04-19',
      status: 'confirmed',
      icon: 'book',
      semester: 'spring2024',
      category: 'misc',
    },
    {
      id: '3',
      type: 'sent',
      label: 'Lab Fee - Physics',
      amount: 200,
      date: '2024-04-18',
      status: 'pending',
      icon: 'flask',
      semester: 'spring2024',
      category: 'lab',
    },
    {
      id: '4',
      type: 'sent',
      label: 'Tuition Fee - Fall 2023',
      amount: 5000,
      date: '2023-09-10',
      status: 'confirmed',
      icon: 'school',
      semester: 'fall2023',
      category: 'tuition',
    },
    {
      id: '5',
      type: 'sent',
      label: 'Sports Fee',
      amount: 100,
      date: '2023-09-08',
      status: 'confirmed',
      icon: 'football',
      semester: 'fall2023',
      category: 'misc',
    },
  ];

  const semesters = [
    { id: 'all', label: 'All Semesters' },
    { id: 'spring2024', label: 'Spring 2024' },
    { id: 'fall2023', label: 'Fall 2023' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'tuition', label: 'Tuition' },
    { id: 'lab', label: 'Lab Fees' },
    { id: 'misc', label: 'Miscellaneous' },
  ];

  const filteredTransactions = transactions.filter(
    (tx) =>
      (selectedSemester === 'all' || tx.semester === selectedSemester) &&
      (selectedCategory === 'all' || tx.category === selectedCategory)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Payment History" onBackPress={onBackPress} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Semester</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {semesters.map((semester) => (
              <TouchableOpacity
                key={semester.id}
                style={[
                  styles.filterChip,
                  selectedSemester === semester.id && styles.activeFilterChip,
                ]}
                onPress={() => setSelectedSemester(semester.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedSemester === semester.id && styles.activeFilterChipText,
                  ]}
                >
                  {semester.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.filterChip,
                  selectedCategory === category.id && styles.activeFilterChip,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === category.id && styles.activeFilterChipText,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Paid</Text>
            <Text style={styles.statValue}>
              ${filteredTransactions
                .filter((tx) => tx.status === 'confirmed')
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toFixed(2)}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Transactions</Text>
            <Text style={styles.statValue}>{filteredTransactions.length}</Text>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>
            {filteredTransactions.length} Transaction
            {filteredTransactions.length !== 1 ? 's' : ''}
          </Text>
          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="search" size={48} color={colors.gray400} />
              <Text style={styles.emptyStateText}>No transactions found</Text>
            </View>
          ) : (
            filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                {...transaction}
                onPress={() => onTransactionPress(transaction.id)}
              />
            ))
          )}
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
  filterSection: {
    marginBottom: spacing.lg,
  },
  filterLabel: {
    ...typography.body2,
    color: colors.gray800,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  filterScroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  filterChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray100,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  activeFilterChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.caption,
    color: colors.gray700,
    fontWeight: '600',
  },
  activeFilterChipText: {
    color: colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray600,
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.heading4,
    color: colors.gray900,
  },
  transactionsContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyStateText: {
    ...typography.body2,
    color: colors.gray600,
    marginTop: spacing.md,
  },
});
