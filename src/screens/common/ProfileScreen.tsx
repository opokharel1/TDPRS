import React from 'react';
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
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Header, Button, Card } from '../../components';

interface ProfileScreenProps {
  onBackPress: () => void;
  onLogout: () => void;
  role: 'student' | 'accountant' | 'admin';
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBackPress,
  onLogout,
  role,
}) => {
  const user = {
    name: role === 'student' ? 'John Doe' : role === 'accountant' ? 'Jane Smith' : 'Admin User',
    email:
      role === 'student'
        ? 'john.doe@university.edu'
        : role === 'accountant'
        ? 'jane.smith@university.edu'
        : 'admin@university.edu',
    role: role.charAt(0).toUpperCase() + role.slice(1),
    studentId: role === 'student' ? 'STU-2024-00123' : undefined,
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5',
    joinDate: 'January 15, 2024',
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Redirect to password change screen');
  };

  const handleSecuritySettings = () => {
    Alert.alert('Security Settings', 'Redirect to security settings');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: onLogout,
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" onBackPress={onBackPress} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Icon name="person" size={50} color={colors.white} />
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{user.role}</Text>
          </View>
        </View>

        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoLabel}>
              <Icon name="mail" size={18} color={colors.primary} />
              <Text style={styles.infoLabelText}>Email</Text>
            </View>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>

          {user.studentId && (
            <View style={[styles.infoRow, styles.borderTop]}>
              <View style={styles.infoLabel}>
                <Icon name="card" size={18} color={colors.primary} />
                <Text style={styles.infoLabelText}>Student ID</Text>
              </View>
              <Text style={styles.infoValue}>{user.studentId}</Text>
            </View>
          )}

          <View style={[styles.infoRow, styles.borderTop]}>
            <View style={styles.infoLabel}>
              <Icon name="wallet" size={18} color={colors.primary} />
              <Text style={styles.infoLabelText}>Wallet Address</Text>
            </View>
            <Text style={styles.infoValue} numberOfLines={1}>
              {user.walletAddress.substring(0, 10)}...
            </Text>
          </View>

          <View style={[styles.infoRow, styles.borderTop]}>
            <View style={styles.infoLabel}>
              <Icon name="calendar" size={18} color={colors.primary} />
              <Text style={styles.infoLabelText}>Member Since</Text>
            </View>
            <Text style={styles.infoValue}>{user.joinDate}</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity
            style={[styles.settingItem, shadows.sm]}
            onPress={handleChangePassword}
          >
            <View style={styles.settingIcon}>
              <Icon name="key" size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingDescription}>Update your password</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, shadows.sm]}
            onPress={handleSecuritySettings}
          >
            <View style={styles.settingIcon}>
              <Icon name="shield-checkmark" size={20} color={colors.secondary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Security Settings</Text>
              <Text style={styles.settingDescription}>Manage your security preferences</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.lastItem, shadows.sm]}
            onPress={() => Alert.alert('Two-Factor Authentication')}
          >
            <View style={styles.settingIcon}>
              <Icon name="lock-closed" size={20} color={colors.accent} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
              <Text style={styles.settingDescription}>Enabled</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>ON</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <TouchableOpacity
            style={[styles.settingItem, shadows.sm]}
            onPress={() => Alert.alert('Notifications')}
          >
            <View style={styles.settingIcon}>
              <Icon name="notifications" size={20} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDescription}>Manage notification preferences</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.lastItem, shadows.sm]}
            onPress={() => Alert.alert('About')}
          >
            <View style={styles.settingIcon}>
              <Icon name="information-circle" size={20} color={colors.secondary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>About TDPRS</Text>
              <Text style={styles.settingDescription}>Version 1.0.0</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoutSection}>
          <Button
            label="Logout"
            onPress={handleLogout}
            variant="danger"
            size="large"
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
    paddingVertical: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.lg,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileName: {
    ...typography.heading4,
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  roleBadge: {
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  roleBadgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  infoCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 0.4,
  },
  infoLabelText: {
    ...typography.caption,
    color: colors.gray600,
    fontWeight: '600',
  },
  infoValue: {
    ...typography.body2,
    color: colors.gray900,
    flex: 0.6,
    textAlign: 'right',
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  settingItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  lastItem: {
    marginBottom: 0,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.gray600,
  },
  badge: {
    backgroundColor: colors.successLight || colors.gray100,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '700',
    fontSize: 10,
  },
  logoutSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
