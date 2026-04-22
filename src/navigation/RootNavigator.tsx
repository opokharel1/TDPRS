import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme';
import { useAuthStore, useAppStore } from '../stores';

// Auth Screens
import { SplashScreen } from '../screens/auth/SplashScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { WalletConnectionScreen } from '../screens/auth/WalletConnectionScreen';

// Student Screens
import { StudentDashboardScreen } from '../screens/student/StudentDashboardScreen';
import { PaymentHistoryScreen } from '../screens/student/PaymentHistoryScreen';
import { DigitalReceiptScreen } from '../screens/student/DigitalReceiptScreen';

// Accountant Screens
import { AccountantDashboardScreen } from '../screens/accountant/AccountantDashboardScreen';

// Admin Screens
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';

// Common Screens
import { ProfileScreen } from '../screens/common/ProfileScreen';

export type RootStackParamList = {
  Auth: undefined;
  StudentApp: undefined;
  AccountantApp: undefined;
  AdminApp: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  RoleSelection: undefined;
  Login: undefined;
  WalletConnection: undefined;
};

export type StudentStackParamList = {
  StudentTabs: undefined;
  PaymentHistory: undefined;
  DigitalReceipt: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const StudentStack = createNativeStackNavigator<StudentStackParamList>();
const StudentTabs = createBottomTabNavigator();

const AccountantStack = createNativeStackNavigator();
const AccountantTabs = createBottomTabNavigator();

const AdminStack = createNativeStackNavigator();
const AdminTabs = createBottomTabNavigator();

// Auth Stack Navigation
const AuthStackNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const setUserRole = useAppStore((state) => state.setUserRole);
  const setUser = useAuthStore((state) => state.setUser);

  const handleRoleSelect = (role: 'student' | 'accountant' | 'admin') => {
    setUserRole(role);
  };

  const handleLoginSuccess = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5',
    });
  };

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white },
      }}
    >
      <AuthStack.Screen
        name="Splash"
        component={SplashScreen}
        listeners={({ navigation }) => ({
          focus: () => {
            setTimeout(() => {
              if (showOnboarding) {
                navigation.navigate('Onboarding' as never);
              } else {
                navigation.navigate('RoleSelection' as never);
              }
            }, 3000);
          },
        })}
      />
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          animationEnabled: false,
        }}
        listeners={() => ({
          focus: () => {
            setShowOnboarding(false);
          },
        })}
      />
      <AuthStack.Screen
        name="RoleSelection"
        options={{ animationEnabled: false }}
        listeners={() => ({
          focus: () => {
            const unsubscribe = useAppStore.subscribe(
              (state) => state.userRole,
              (role) => {
                if (role) {
                  // navigation.navigate('Login' as never);
                }
              }
            );
            return unsubscribe;
          },
        })}
      >
        {(props: any) => (
          <RoleSelectionScreen
            {...props}
            onRoleSelect={(role) => {
              handleRoleSelect(role);
              props.navigation.navigate('Login');
            }}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen
        name="Login"
        options={{ animationEnabled: true }}
      >
        {(props: any) => (
          <LoginScreen
            {...props}
            onLoginSuccess={() => {
              handleLoginSuccess();
              props.navigation.navigate('WalletConnection');
            }}
            onForgotPassword={() => {}}
            onSignUp={() => {}}
          />
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name="WalletConnection">
        {(props: any) => (
          <WalletConnectionScreen
            {...props}
            onWalletConnected={(walletAddress) => {
              props.navigation.getParent().navigate('StudentApp');
            }}
            onCancel={() => props.navigation.goBack()}
          />
        )}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

// Student Stack Navigation
const StudentTabsNavigator = () => {
  return (
    <StudentTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'home';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray200,
          paddingTop: 8,
          paddingBottom: 8,
        },
      })}
    >
      <StudentTabs.Screen
        name="Home"
        component={StudentDashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
        listeners={({ navigation }: any) => ({
          tabPress: (e: any) => {
            // Navigation handled by screen
          },
        })}
      />
      <StudentTabs.Screen
        name="History"
        component={PaymentHistoryScreen}
        options={{
          tabBarLabel: 'History',
        }}
      />
      <StudentTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </StudentTabs.Navigator>
  );
};

const StudentStackNavigator = () => {
  return (
    <StudentStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white },
      }}
    >
      <StudentStack.Screen
        name="StudentTabs"
        component={StudentTabsNavigator}
      />
      <StudentStack.Screen
        name="PaymentHistory"
        component={PaymentHistoryScreen}
        options={{ animationEnabled: true }}
      />
      <StudentStack.Screen
        name="DigitalReceipt"
        component={DigitalReceiptScreen}
        options={{ animationEnabled: true }}
      />
    </StudentStack.Navigator>
  );
};

// Accountant Stack Navigation
const AccountantTabsNavigator = () => {
  return (
    <AccountantTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'calculator';
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Transactions') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray200,
          paddingTop: 8,
          paddingBottom: 8,
        },
      })}
    >
      <AccountantTabs.Screen
        name="Dashboard"
        component={AccountantDashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <AccountantTabs.Screen
        name="Transactions"
        component={AccountantDashboardScreen}
        options={{ tabBarLabel: 'Transactions' }}
      />
      <AccountantTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </AccountantTabs.Navigator>
  );
};

const AccountantStackNavigator = () => {
  return (
    <AccountantStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white },
      }}
    >
      <AccountantStack.Screen
        name="AccountantTabs"
        component={AccountantTabsNavigator}
      />
    </AccountantStack.Navigator>
  );
};

// Admin Stack Navigation
const AdminTabsNavigator = () => {
  return (
    <AdminTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'settings';
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray400,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray200,
          paddingTop: 8,
          paddingBottom: 8,
        },
      })}
    >
      <AdminTabs.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <AdminTabs.Screen
        name="Users"
        component={AdminDashboardScreen}
        options={{ tabBarLabel: 'Users' }}
      />
      <AdminTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </AdminTabs.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.white },
      }}
    >
      <AdminStack.Screen
        name="AdminTabs"
        component={AdminTabsNavigator}
      />
    </AdminStack.Navigator>
  );
};

// Root Navigator
export const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAppStore((state) => state.userRole);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.white },
        }}
      >
        {!isAuthenticated ? (
          <RootStack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{ animationEnabled: false }}
          />
        ) : userRole === 'student' ? (
          <RootStack.Screen
            name="StudentApp"
            component={StudentStackNavigator}
            options={{ animationEnabled: false }}
          />
        ) : userRole === 'accountant' ? (
          <RootStack.Screen
            name="AccountantApp"
            component={AccountantStackNavigator}
            options={{ animationEnabled: false }}
          />
        ) : (
          <RootStack.Screen
            name="AdminApp"
            component={AdminStackNavigator}
            options={{ animationEnabled: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
