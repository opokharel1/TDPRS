import React from 'react';
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
import { LineChart } from 'react-native-chart-kit';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import {
  Header,
  BalanceCard,
  StatCard,
  QuickAction,
} from '../../components';

interface AccountantDashboardScreenProps {
  onRecordPayment: () => void;
  onVerifyTransaction: () => void;
  onViewStudents: () => void;
  onViewProfile: () => void;
}

export const AccountantDashboardScreen: React.FC<AccountantDashboardScreenProps> = ({
  onRecordPayment,
  onVerifyTransaction,
  onViewStudents,
  onViewProfile,
}) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [12000, 15000, 13000, 18000, 22000, 19000, 21000],
        strokeWidth: 2,
      },
    ],
  };

  const alerts = [
    {
      id: '1',
      title: 'Pending Verification',
      message: '5 transactions awaiting verification',
      type: 'warning',
      icon: 'alert-circle',
    },
    {
      id: '2',
      title: 'High Transaction Volume',
      message: 'Today: $156,500 processed',
      type: 'info',
      icon: 'trending-up',
    },
  ];

  const stats = [
    {
      label: 'Total Received',
      value: '$856,000',
      icon: 'wallet',
      iconBgColor: colors.primaryLight,
    },
    {
      label: 'Today',
      value: '$156,500',
      icon: 'calendar',
      iconBgColor: colors.secondaryLight,
    },
    {
      label: 'Pending',
      value: '12',
      icon: 'time',
      iconBgColor: colors.accentLight,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Accountant Dashboard"
        showBackButton={false}
        rightIcon="person"
        onRightPress={onViewProfile}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard balance={156500} />

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <FlatList
            data={stats}
            renderItem={({ item }) => (
              <View style={styles.statItem}>
                <StatCard
                  label={item.label}
                  value={item.value}
                  icon={item.icon}
                  iconBgColor={item.iconBgColor}
                />
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
              label="Record Payment"
              icon="add-circle"
              onPress={onRecordPayment}
              backgroundColor={colors.primaryLight}
              iconColor={colors.primary}
            />
            <QuickAction
              label="Verify Transaction"
              icon="checkmark-circle"
              onPress={onVerifyTransaction}
              backgroundColor={colors.secondaryLight}
              iconColor={colors.secondary}
            />
            <QuickAction
              label="View Students"
              icon="people"
              onPress={onViewStudents}
              backgroundColor={colors.accentLight}
              iconColor={colors.accent}
            />
            <QuickAction
              label="Export Report"
              icon="download"
              onPress={() => {}}
              backgroundColor={colors.gray100}
              iconColor={colors.gray600}
            />
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Weekly Transactions</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={320}
              height={200}
              chartConfig={{
                backgroundColor: colors.white,
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                color: () => colors.primary,
                strokeWidth: 2,
                useShadowColorFromDataset: false,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          {alerts.map((alert) => (
            <View key={alert.id} style={[styles.alertCard, shadows.sm]}>
              <View
                style={[
                  styles.alertIcon,
                  {
                    backgroundColor:
                      alert.type === 'warning' ? colors.accentLight : colors.primaryLight,
                  },
                ]}
              >
                <Icon
                  name={alert.icon}
                  size={20}
                  color={alert.type === 'warning' ? colors.accent : colors.primary}
                />
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            </View>
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
  chartSection: {
    marginBottom: spacing.lg,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  chart: {
    borderRadius: borderRadius.lg,
  },
  alertsSection: {
    marginBottom: spacing.lg,
  },
  alertCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  alertIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  alertMessage: {
    ...typography.caption,
    color: colors.gray600,
  },
});
