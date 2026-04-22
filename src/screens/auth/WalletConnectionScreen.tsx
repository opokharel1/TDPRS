import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Button, Input, Card } from '../components';
import { Header } from '../components';

interface WalletConnectionScreenProps {
  onWalletConnected: (walletAddress: string) => void;
  onCancel: () => void;
}

export const WalletConnectionScreen: React.FC<WalletConnectionScreenProps> = ({
  onWalletConnected,
  onCancel,
}) => {
  const [method, setMethod] = useState<'metamask' | 'private-key' | 'institutional' | null>(null);
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    // Simulate wallet connection
    setTimeout(() => {
      setLoading(false);
      const mockWallet = '0x742d35Cc6634C0532925a3b844Bc7e7595f42bE5';
      onWalletConnected(mockWallet);
    }, 1500);
  };

  const connectionMethods = [
    {
      id: 'metamask',
      title: 'MetaMask',
      description: 'Connect using your MetaMask browser extension',
      icon: 'wallet',
      color: colors.primary,
      lightColor: colors.primaryLight,
    },
    {
      id: 'private-key',
      title: 'Private Key',
      description: 'Import wallet using private key',
      icon: 'key',
      color: colors.secondary,
      lightColor: colors.secondaryLight,
    },
    {
      id: 'institutional',
      title: 'Institutional Wallet',
      description: 'Connect institutional blockchain wallet',
      icon: 'business',
      color: colors.accent,
      lightColor: colors.accentLight,
    },
  ];

  if (method === null) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Connect Wallet"
          subtitle="Choose your preferred method"
          onBackPress={onCancel}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.methodsContainer}>
            {connectionMethods.map((connectionMethod) => (
              <TouchableOpacity
                key={connectionMethod.id}
                style={[styles.methodCard, shadows.sm]}
                onPress={() => setMethod(connectionMethod.id as any)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.methodIcon,
                    { backgroundColor: connectionMethod.lightColor },
                  ]}
                >
                  <Icon
                    name={connectionMethod.icon}
                    size={32}
                    color={connectionMethod.color}
                  />
                </View>
                <View style={styles.methodContent}>
                  <Text style={styles.methodTitle}>{connectionMethod.title}</Text>
                  <Text style={styles.methodDescription}>
                    {connectionMethod.description}
                  </Text>
                </View>
                <Icon name="chevron-forward" size={20} color={colors.gray400} />
              </TouchableOpacity>
            ))}
          </View>

          <Card style={styles.securityCard}>
            <View style={styles.securityHeader}>
              <Icon name="shield-checkmark" size={20} color={colors.success} />
              <Text style={styles.securityTitle}>Security Note</Text>
            </View>
            <Text style={styles.securityText}>
              Your private key is encrypted and stored locally on your device. Never share
              your private key with anyone. TDPRS will never ask for your private key.
            </Text>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (method === 'private-key') {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Import Private Key"
          subtitle="Enter your wallet private key"
          onBackPress={() => setMethod(null)}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Input
            label="Private Key"
            placeholder="Paste your private key here"
            value={privateKey}
            onChangeText={setPrivateKey}
            secureTextEntry
            multiline
            numberOfLines={4}
            containerStyle={styles.inputContainer}
          />

          <Card style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon name="information-circle" size={20} color={colors.warning} />
              <Text style={styles.infoTitle}>Important</Text>
            </View>
            <Text style={styles.infoText}>
              • Private key should start with '0x' and contain 64 hexadecimal characters
              • Never share this key with anyone
              • Keep it stored safely
            </Text>
          </Card>

          <Button
            label="Import Wallet"
            onPress={handleConnect}
            loading={loading}
            size="large"
            variant="primary"
            style={styles.importButton}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={method === 'metamask' ? 'Connect MetaMask' : 'Connect Institutional Wallet'}
        onBackPress={() => setMethod(null)}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.instructionContainer}>
          <Icon name="sync" size={60} color={colors.primary} />
          <Text style={styles.instructionTitle}>Waiting for Connection...</Text>
          <Text style={styles.instructionText}>
            Please confirm the connection in your wallet application.
          </Text>
        </View>

        <Button
          label="Retry"
          onPress={handleConnect}
          loading={loading}
          size="large"
          variant="primary"
        />
        <Button
          label="Cancel"
          onPress={() => setMethod(null)}
          size="large"
          variant="outline"
          style={styles.cancelButton}
        />
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
    paddingVertical: spacing.lg,
  },
  methodsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  methodCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  methodIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  methodDescription: {
    ...typography.caption,
    color: colors.gray600,
  },
  securityCard: {
    backgroundColor: colors.gray100,
    marginBottom: spacing.lg,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  securityTitle: {
    ...typography.body2,
    color: colors.success,
    fontWeight: '600',
  },
  securityText: {
    ...typography.caption,
    color: colors.gray700,
    lineHeight: 18,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.gray100,
    marginBottom: spacing.lg,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  infoTitle: {
    ...typography.body2,
    color: colors.warning,
    fontWeight: '600',
  },
  infoText: {
    ...typography.caption,
    color: colors.gray700,
    lineHeight: 18,
  },
  importButton: {
    marginBottom: spacing.md,
  },
  instructionContainer: {
    alignItems: 'center',
    marginVertical: spacing.xxxl,
  },
  instructionTitle: {
    ...typography.heading4,
    color: colors.gray900,
    marginVertical: spacing.md,
  },
  instructionText: {
    ...typography.body2,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  cancelButton: {
    marginTop: spacing.md,
  },
});
