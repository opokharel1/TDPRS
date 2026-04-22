import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Header, Button, Card, Input, Badge } from '../components';

interface UserManagementScreenProps {
  onBackPress: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'accountant' | 'admin';
  status: 'active' | 'inactive';
  joinDate: string;
}

export const UserManagementScreen: React.FC<UserManagementScreenProps> = ({
  onBackPress,
}) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@university.edu',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@university.edu',
      role: 'accountant',
      status: 'active',
      joinDate: '2024-02-01',
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@university.edu',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah@university.edu',
      role: 'student',
      status: 'inactive',
      joinDate: '2024-03-10',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'student' | 'accountant' | 'admin'>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return colors.primary;
      case 'accountant':
        return colors.secondary;
      case 'admin':
        return colors.accent;
      default:
        return colors.gray500;
    }
  };

  const handleAddUser = () => {
    Alert.alert('Add User', 'Redirect to add user screen');
  };

  const handleEditUser = (user: User) => {
    Alert.alert('Edit User', `Edit user: ${user.name}`);
  };

  const handleDeleteUser = (user: User) => {
    Alert.alert('Delete User', `Delete user: ${user.name}?`, [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          setUsers(users.filter((u) => u.id !== user.id));
        },
        style: 'destructive',
      },
    ]);
  };

  const handleToggleStatus = (user: User) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            status: u.status === 'active' ? 'inactive' : 'active',
          }
        : u
    );
    setUsers(updatedUsers);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <Card style={styles.userCard} shadow={true}>
      <View style={styles.userHeader}>
        <View style={styles.userAvatar}>
          <Icon name="person" size={24} color={colors.white} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Badge
          label={item.role.toUpperCase()}
          variant={
            item.role === 'student'
              ? 'primary'
              : item.role === 'accountant'
              ? 'info'
              : 'success'
          }
          size="small"
        />
      </View>

      <View style={styles.userDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status</Text>
          <TouchableOpacity
            onPress={() => handleToggleStatus(item)}
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === 'active'
                    ? colors.successLight || colors.gray100
                    : colors.gray100,
              },
            ]}
          >
            <Icon
              name={item.status === 'active' ? 'checkmark-circle' : 'close-circle'}
              size={14}
              color={
                item.status === 'active' ? colors.success : colors.gray600
              }
            />
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    item.status === 'active'
                      ? colors.success
                      : colors.gray600,
                },
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Joined</Text>
          <Text style={styles.detailValue}>{item.joinDate}</Text>
        </View>
      </View>

      <View style={styles.userActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditUser(item)}
        >
          <Icon name="create" size={16} color={colors.primary} />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteUser(item)}
        >
          <Icon name="trash" size={16} color={colors.error} />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="User Management" onBackPress={onBackPress} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Button
          label="Add New User"
          onPress={handleAddUser}
          variant="primary"
          size="large"
          style={styles.addButton}
        />

        <Input
          label="Search Users"
          placeholder="Search by name or email"
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search"
          containerStyle={styles.searchContainer}
        />

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by Role</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {(['all', 'student', 'accountant', 'admin'] as const).map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.filterChip,
                  selectedRole === role && styles.activeFilterChip,
                ]}
                onPress={() => setSelectedRole(role)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedRole === role && styles.activeFilterChipText,
                  ]}
                >
                  {role === 'all' ? 'All Users' : role.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Users</Text>
            <Text style={styles.statValue}>{users.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Active</Text>
            <Text style={styles.statValue}>
              {users.filter((u) => u.status === 'active').length}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Students</Text>
            <Text style={styles.statValue}>
              {users.filter((u) => u.role === 'student').length}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Users ({filteredUsers.length})</Text>

        {filteredUsers.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="people" size={48} color={colors.gray400} />
            <Text style={styles.emptyStateText}>No users found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            nestedScrollEnabled={false}
          />
        )}
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
  addButton: {
    marginBottom: spacing.lg,
  },
  searchContainer: {
    marginBottom: spacing.lg,
  },
  filterContainer: {
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
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray300,
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
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statLabel: {
    ...typography.caption,
    color: colors.gray600,
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.heading4,
    color: colors.primary,
  },
  sectionTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  userCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
  },
  userEmail: {
    ...typography.caption,
    color: colors.gray600,
    marginTop: spacing.xs,
  },
  userDetails: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
    marginBottom: spacing.md,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.gray600,
    marginBottom: spacing.xs,
  },
  detailValue: {
    ...typography.caption,
    color: colors.gray900,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  statusText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '600',
  },
  userActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  editButton: {
    backgroundColor: colors.primaryLight,
  },
  editButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.accentLight,
  },
  deleteButtonText: {
    ...typography.caption,
    color: colors.error,
    fontWeight: '600',
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
