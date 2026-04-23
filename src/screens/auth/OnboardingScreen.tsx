import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { Button } from '../../components';

interface OnboardingScreenProps {
  onComplete?: () => void;
  navigation?: any;
}

const onboardingData = [
  {
    id: 1,
    title: 'Secure Transactions',
    description: 'Every payment is recorded securely using blockchain technology.',
    icon: 'shield-checkmark',
    iconBgColor: colors.secondaryLight,
    iconColor: colors.secondary,
  },
  {
    id: 2,
    title: 'Paperless Receipts',
    description: 'Students no longer need physical receipts.',
    icon: 'document',
    iconBgColor: colors.primaryLight,
    iconColor: colors.primary,
  },
  {
    id: 3,
    title: 'Easy Verification',
    description: 'Institutions can instantly verify transactions.',
    icon: 'checkmark-circle',
    iconBgColor: colors.accentLight,
    iconColor: colors.accent,
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
      navigation?.navigate('RoleSelection');
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const current = onboardingData[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.iconContainer, { backgroundColor: current.iconBgColor }]}
        >
          <Icon
            name={current.icon}
            size={80}
            color={current.iconColor}
          />
        </View>

        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.description}</Text>
      </ScrollView>

      <View style={styles.dots}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentStep && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          label={currentStep === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="primary"
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  skipButton: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    ...typography.heading2,
    color: colors.gray900,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body1,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray300,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
});
