import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Header, Input, Button, Card, Badge } from '../components';

interface VerifyPaymentScreenProps {
  onBackPress: () => void;
}

interface VerificationResult {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  transactionHash: string;
  blockNumber: string;
  status: 'verified' | 'pending' | 'failed';
  date: string;
  confirmations: number;
}

export const VerifyPaymentScreen: React.FC<VerifyPaymentScreenProps> = ({
  onBackPress,
}) => {
  const [searchMethod, setSearchMethod] = useState<'studentId' | 'txHash'>('studentId');
  const [searchValue, setSearchValue] = useState('');
  const [verified, setVerified] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const mockVerifiedData: Record<string, VerificationResult> = {
    'STU-2024-00123': {
      id: '1',
      studentId: 'STU-2024-00123',
      studentName: 'John Doe',
      amount: 5000,
      transactionHash: '0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5',
      blockNumber: '18,234,567',
      status: 'verified',
      date: '2024-04-20',
      confirmations: 12,
    },
    '0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5': {
      id: '2',
      studentId: 'STU-2024-00124',
      studentName: 'Jane Smith',
      amount: 3500,
      transactionHash: '0x8a5c8f9d2b1e4f6a9c3d7e5f2a9b6c1d',
      blockNumber: '18,234,566',
      status: 'verified',
      date: '2024-04-19',
      confirmations: 48,
    },
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const result = mockVerifiedData[searchValue];
      setVerified(result || null);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'failed':
        return colors.error;
      default:
        return colors.gray500;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Verify Payment" onBackPress={onBackPress} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchMethodContainer}>
          <Text style={styles.label}>Search By</Text>
          <View style={styles.toggleGroup}>
            {(['studentId', 'txHash'] as const).map((method) => (
              <Button
                key={method}
                label={method === 'studentId' ? 'Student ID' : 'TX Hash'}
                onPress={() => {
                  setSearchMethod(method);
                  setSearchValue('');
                  setVerified(null);
                }}
                variant={searchMethod === method ? 'primary' : 'outline'}
                size="small"
                style={styles.toggleButton}
              />
            ))}
          </View>
        </View>

        <Input
          label={searchMethod === 'studentId' ? 'Enter Student ID' : 'Enter Transaction Hash'}
          placeholder={
            searchMethod === 'studentId' ? 'STU-2024-00123' : '0x...'
          }
          value={searchValue}
          onChangeText={setSearchValue}
          containerStyle={styles.inputContainer}
        />

        <Button
          label="Search"
          onPress={handleSearch}
          loading={loading}
          variant="primary"
          size="large"
          style={styles.searchButton}
        />

        {verified ? (
          <>
            <Card style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View
                  style={[
                    styles.resultStatusIcon,
                    { backgroundColor: getStatusColor(verified.status) + '20' },
                  ]}
                >
                  <Icon
                    name={
                      verified.status === 'verified'
                        ? 'checkmark-circle'
                        : verified.status === 'pending'
                        ? 'time'
                        : 'close-circle'
                    }
                    size={28}
                    color={getStatusColor(verified.status)}
                  />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultStudentName}>
                    {verified.studentName}
                  </Text>
                  <Text style={styles.resultStudentId}>
                    {verified.studentId}
                  </Text>
                </View>
                <Badge
                  label={verified.status.toUpperCase()}
                  variant={
                    verified.status === 'verified'
                      ? 'success'
                      : verified.status === 'pending'
                      ? 'warning'
                      : 'error'
                  }
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Transaction Details</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={styles.detailValue}>
                    ${verified.amount.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{verified.date}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Block Number</Text>
                  <Text style={styles.detailValue} numberOfLines={1}>
                    {verified.blockNumber}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Confirmations</Text>
                  <Text style={styles.detailValue}>
                    {verified.confirmations}
                  </Text>
                </View>

                <View style={[styles.detailRow, styles.detailRowBorder]}>
                  <Text style={styles.detailLabel}>Transaction Hash</Text>
                </View>
                <Text style={styles.txHash}>{verified.transactionHash}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.verificationBadge}>
                <Icon name="shield-checkmark" size={20} color={colors.success} />
                <Text style={styles.verificationText}>
                  Payment verified on blockchain
                </Text>
              </View>
            </Card>

            <Button
              label="Approve Transaction"
              onPress={() => {}}
              variant="primary"
              size="large"
              style={styles.approveButton}
            />
            <Button
              label="Reject Transaction"
              onPress={() => {}}
              variant="danger"
              size="large"
            />
          </>
        ) : searchValue && !verified ? (
          <Card style={styles.notFoundCard}>
            <View style={styles.notFoundContent}>
              <Icon name="search" size={48} color={colors.gray400} />
              <Text style={styles.notFoundTitle}>Payment Not Found</Text>
              <Text style={styles.notFoundText}>
                No transaction found for the given {searchMethod === 'studentId' ? 'Student ID' : 'Transaction Hash'}
              </Text>
            </View>
          </Card>
        ) : null}
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
  searchMethodContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body2,
    color: colors.gray800,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  toggleGroup: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  toggleButton: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  searchButton: {
    marginBottom: spacing.lg,
  },
  resultCard: {
    marginBottom: spacing.lg,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  resultStatusIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultStudentName: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
  },
  resultStudentId: {
    ...typography.caption,
    color: colors.gray600,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.md,
  },
  detailsContainer: {
    marginBottom: spacing.md,
  },
  detailsTitle: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  detailRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingTop: spacing.md,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.gray600,
  },
  detailValue: {
    ...typography.caption,
    color: colors.gray900,
    fontWeight: '600',
    textAlign: 'right',
    maxWidth: '60%',
  },
  txHash: {
    ...typography.caption,
    color: colors.gray800,
    fontFamily: 'monospace',
    backgroundColor: colors.gray100,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  verificationText: {
    ...typography.body2,
    color: colors.secondary,
    fontWeight: '600',
  },
  approveButton: {
    marginBottom: spacing.md,
  },
  notFoundCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  notFoundContent: {
    alignItems: 'center',
  },
  notFoundTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginVertical: spacing.md,
  },
  notFoundText: {
    ...typography.caption,
    color: colors.gray600,
    textAlign: 'center',
    maxWidth: 250,
  },
});
