import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header, Button, Card, Badge } from '../../components';

interface DigitalReceiptScreenProps {
  onBackPress: () => void;
}

export const DigitalReceiptScreen: React.FC<DigitalReceiptScreenProps> = ({
  onBackPress,
}) => {
  const [qrValue] = useState(
    'BLK_TXN_0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5_5000_2024-04-20'
  );

  const receipt = {
    receiptId: 'RCP-2024-04-20-001',
    studentName: 'John Doe',
    studentId: 'STU-2024-00123',
    feeType: 'Tuition Fee - Spring 2024',
    date: 'April 20, 2024',
    amount: 5000.0,
    currency: 'USD',
    transactionHash: '0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5',
    blockNumber: '18,234,567',
    timestamp: '2024-04-20 14:32:15 UTC',
    status: 'confirmed',
    institution: 'State University',
    semester: 'Spring 2024',
    paymentMethod: 'Blockchain',
  };

  const handleDownload = () => {
    Alert.alert('Success', 'Receipt downloaded as PDF');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Receipt shared successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Digital Receipt" onBackPress={onBackPress} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.receiptCard} shadow={false}>
          <View style={styles.receiptHeader}>
            <View style={styles.institutionInfo}>
              <View style={styles.institutionBadge}>
                <Icon name="school" size={28} color={colors.white} />
              </View>
              <View>
                <Text style={styles.institutionName}>{receipt.institution}</Text>
                <Text style={styles.receiptId}>{receipt.receiptId}</Text>
              </View>
            </View>
            <Badge label="CONFIRMED" variant="success" size="medium" />
          </View>

          <View style={styles.divider} />

          <View style={styles.studentInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Student Name</Text>
              <Text style={styles.infoValue}>{receipt.studentName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>{receipt.studentId}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.transactionInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fee Type</Text>
              <Text style={styles.infoValue}>{receipt.feeType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Semester</Text>
              <Text style={styles.infoValue}>{receipt.semester}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{receipt.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment Method</Text>
              <Text style={styles.infoValue}>{receipt.paymentMethod}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Amount Paid</Text>
            <Text style={styles.amount}>
              {receipt.currency} ${receipt.amount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.blockchainInfo}>
            <Text style={styles.blockchainLabel}>Blockchain Details</Text>
            <View style={styles.blockchainDetails}>
              <View style={styles.detailRow}>
                <Icon name="link" size={16} color={colors.gray600} />
                <Text style={styles.detailLabel}>Transaction Hash</Text>
              </View>
              <Text style={styles.detailValue}>{receipt.transactionHash}</Text>
            </View>
            <View style={styles.blockchainDetails}>
              <View style={styles.detailRow}>
                <Icon name="cube" size={16} color={colors.gray600} />
                <Text style={styles.detailLabel}>Block Number</Text>
              </View>
              <Text style={styles.detailValue}>{receipt.blockNumber}</Text>
            </View>
            <View style={styles.blockchainDetails}>
              <View style={styles.detailRow}>
                <Icon name="time" size={16} color={colors.gray600} />
                <Text style={styles.detailLabel}>Timestamp</Text>
              </View>
              <Text style={styles.detailValue}>{receipt.timestamp}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>Receipt QR Code</Text>
            <View style={styles.qrContainer}>
              <QRCode value={qrValue} size={150} />
            </View>
            <Text style={styles.qrDescription}>
              Scan this code to verify the receipt authenticity
            </Text>
          </View>
        </Card>

        <View style={styles.actionButtons}>
          <Button
            label="Download PDF"
            onPress={handleDownload}
            variant="primary"
            size="large"
            style={styles.actionButton}
          />
          <Button
            label="Share Receipt"
            onPress={handleShare}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  receiptCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  institutionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  institutionBadge: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  institutionName: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
  },
  receiptId: {
    ...typography.caption,
    color: colors.gray600,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.md,
  },
  studentInfo: {
    marginBottom: spacing.md,
  },
  transactionInfo: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.gray600,
  },
  infoValue: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
  },
  amountSection: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  amountLabel: {
    ...typography.caption,
    color: colors.gray600,
    marginBottom: spacing.sm,
  },
  amount: {
    ...typography.heading2,
    color: colors.success,
  },
  blockchainInfo: {
    marginBottom: spacing.md,
  },
  blockchainLabel: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  blockchainDetails: {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.gray600,
    fontWeight: '600',
  },
  detailValue: {
    ...typography.caption,
    color: colors.gray800,
    fontFamily: 'monospace',
    marginTop: spacing.xs,
    wordWrap: 'break-word',
  },
  qrSection: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  qrLabel: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  qrContainer: {
    padding: spacing.md,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  qrDescription: {
    ...typography.caption,
    color: colors.gray600,
    textAlign: 'center',
  },
  actionButtons: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  actionButton: {
    marginBottom: spacing.sm,
  },
});
