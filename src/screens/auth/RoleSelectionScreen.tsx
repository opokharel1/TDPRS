import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { Button } from '../../components';

interface RoleSelectionScreenProps {
  onRoleSelect: (role: 'student' | 'accountant' | 'admin') => void;
}

const roles = [
  {
    id: 'student',
    title: 'Student',
    description: 'Track your payment records and view digital receipts',
    icon: 'book',
    color: colors.primary,
    lightColor: colors.primaryLight,
  },
  {
    id: 'accountant',
    title: 'Accountant',
    description: 'Record and manage student payments on blockchain',
    icon: 'calculator',
    color: colors.secondary,
    lightColor: colors.secondaryLight,
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage system, users, and view analytics',
    icon: 'settings',
    color: colors.accent,
    lightColor: colors.accentLight,
  },
];

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onRoleSelect,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>
          Choose how you'll use TDPRS
        </Text>

        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[styles.roleCard, shadows.md]}
              onPress={() => onRoleSelect(role.id as 'student' | 'accountant' | 'admin')}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.roleIcon,
                  { backgroundColor: role.lightColor },
                ]}
              >
                <Icon name={role.icon} size={40} color={role.color} />
              </View>
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  title: {
    ...typography.heading2,
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.gray600,
    marginBottom: spacing.xxxl,
  },
  rolesContainer: {
    gap: spacing.lg,
  },
  roleCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roleTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginBottom: spacing.sm,
  },
  roleDescription: {
    ...typography.caption,
    color: colors.gray600,
    textAlign: 'center',
    lineHeight: 18,
  },
});
