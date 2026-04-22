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
import { PieChart } from 'react-native-chart-kit';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Header, StatCard, QuickAction, Card } from '../components';

interface AdminDashboardScreenProps {
  onManageUsers: () => void;
  onSystemSettings: () => void;
  onViewAnalytics: () => void;
  onViewProfile: () => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onManageUsers,
  onSystemSettings,
  onViewAnalytics,
  onViewProfile,
}) => {
  const analyticsData = [
    {
      name: 'Tuition',
      population: 856000,
      color: colors.primary,
      legendFontColor: colors.gray800,
      legendFontSize: 12,
    },
    {
      name: 'Lab Fees',
      population: 125000,
      color: colors.secondary,
      legendFontColor: colors.gray800,
      legendFontSize: 12,
    },
    {
      name: 'Misc',
      population: 84000,
      color: colors.accent,
      legendFontColor: colors.gray800,
      legendFontSize: 12,
    },
  ];

  const stats = [
    {
      label: 'Total Transactions',
      value: '1,234',
      icon: 'swap-horizontal',
      iconBgColor: colors.primaryLight,
    },
    {
      label: 'Total Revenue',
      value: '$1.06M',
      icon: 'wallet',
      iconBgColor: colors.secondaryLight,
    },
    {
      label: 'Active Students',
      value: '3,847',
      icon: 'people',
      iconBgColor: colors.accentLight,
    },
    {
      label: 'Blockchain Activity',
      value: '98.5%',
      icon: 'link',
      iconBgColor: colors.gray100,
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'payment',
      description: 'Payment recorded: STU-2024-00456 - $5,000',
      time: '2 min ago',
      icon: 'checkmark-circle',
      color: colors.success,
    },
    {
      id: '2',
      type: 'user',
      description: 'New accountant added: Jane Smith',
      time: '15 min ago',
      icon: 'person-add',
      color: colors.primary,
    },
    {
      id: '3',
      type: 'system',
      description: 'System backup completed successfully',
      time: '1 hour ago',
      icon: 'cloud-check',
      color: colors.secondary,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Admin Dashboard"
        showBackButton={false}
        rightIcon="person"
        onRightPress={onViewProfile}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>System Health</Text>
          <View style={styles.healthIndicators}>
            <View style={styles.healthItem}>
              <Icon name="checkmark-circle" size={24} color={colors.success} />
              <Text style={styles.healthText}>All Systems</Text>
            </View>
            <View style={styles.healthItem}>
              <Icon name="shield-checkmark" size={24} color={colors.success} />
              <Text style={styles.healthText}>Security OK</Text>
            </View>
            <View style={styles.healthItem}>
              <Icon name="trending-up" size={24} color={colors.success} />
              <Text style={styles.healthText}>Network Good</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Key Analytics</Text>
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
          <Text style={styles.sectionTitle}>Admin Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              label="Manage Users"
              icon="people"
              onPress={onManageUsers}
              backgroundColor={colors.primaryLight}
              iconColor={colors.primary}
            />
            <QuickAction
              label="System Settings"
              icon="settings"
              onPress={onSystemSettings}
              backgroundColor={colors.secondaryLight}
              iconColor={colors.secondary}
            />
            <QuickAction
              label="View Analytics"
              icon="bar-chart"
              onPress={onViewAnalytics}
              backgroundColor={colors.accentLight}
              iconColor={colors.accent}
            />
            <QuickAction
              label="Blockchain Config"
              icon="link"
              onPress={() => {}}
              backgroundColor={colors.gray100}
              iconColor={colors.gray600}
            />
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Revenue Distribution</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={analyticsData}
              width={320}
              height={220}
              chartConfig={{
                backgroundColor: colors.white,
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                color: () => colors.primary,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={[styles.activityCard, shadows.sm]}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: activity.color + '20' },
                ]}
              >
                <Icon
                  name={activity.icon}
                  size={20}
                  color={activity.color}
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
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
  summaryCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryLabel: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  healthIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  healthItem: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  healthText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
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
    alignItems: 'center',
  },
  chart: {
    borderRadius: borderRadius.lg,
  },
  activitiesSection: {
    marginBottom: spacing.lg,
  },
  activityCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  activityTime: {
    ...typography.caption,
    color: colors.gray600,
  },
});
