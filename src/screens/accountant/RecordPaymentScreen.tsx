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
import { colors, typography, spacing, borderRadius } from '../theme';
import { Header, Button, Input, Card } from '../components';

interface RecordPaymentScreenProps {
  onBackPress: () => void;
}

export const RecordPaymentScreen: React.FC<RecordPaymentScreenProps> = ({
  onBackPress,
}) => {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    amount: '',
    feeType: 'tuition',
    semester: 'spring2024',
    paymentMethod: 'blockchain',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const feeTypes = ['tuition', 'lab', 'library', 'sports', 'misc'];
  const semesters = ['spring2024', 'fall2023', 'summer2024'];
  const paymentMethods = ['blockchain', 'bank_transfer', 'check'];

  const validateForm = () => {
    let valid = true;
    const newErrors: Record<string, string> = {};

    if (!formData.studentId) {
      newErrors.studentId = 'Student ID is required';
      valid = false;
    }

    if (!formData.studentName) {
      newErrors.studentName = 'Student Name is required';
      valid = false;
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
      valid = false;
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Payment recorded successfully on blockchain',
        [
          {
            text: 'OK',
            onPress: onBackPress,
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Record Payment" onBackPress={onBackPress} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Student Information</Text>

        <Input
          label="Student ID"
          placeholder="STU-2024-00123"
          value={formData.studentId}
          onChangeText={(value) =>
            setFormData({ ...formData, studentId: value })
          }
          error={errors.studentId}
          containerStyle={styles.inputContainer}
        />

        <Input
          label="Student Name"
          placeholder="John Doe"
          value={formData.studentName}
          onChangeText={(value) =>
            setFormData({ ...formData, studentName: value })
          }
          error={errors.studentName}
          containerStyle={styles.inputContainer}
        />

        <Text style={styles.sectionTitle}>Payment Details</Text>

        <Input
          label="Amount (USD)"
          placeholder="5000.00"
          value={formData.amount}
          onChangeText={(value) =>
            setFormData({ ...formData, amount: value })
          }
          error={errors.amount}
          keyboardType="decimal-pad"
          containerStyle={styles.inputContainer}
        />

        <View style={styles.selectContainer}>
          <Text style={styles.selectLabel}>Fee Type</Text>
          <View style={styles.selectGroup}>
            {feeTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectOption,
                  formData.feeType === type && styles.selectOptionActive,
                ]}
                onPress={() =>
                  setFormData({ ...formData, feeType: type })
                }
              >
                <Text
                  style={[
                    styles.selectOptionText,
                    formData.feeType === type &&
                      styles.selectOptionTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.selectContainer}>
          <Text style={styles.selectLabel}>Semester</Text>
          <View style={styles.selectGroup}>
            {semesters.map((semester) => (
              <TouchableOpacity
                key={semester}
                style={[
                  styles.selectOption,
                  formData.semester === semester &&
                    styles.selectOptionActive,
                ]}
                onPress={() =>
                  setFormData({ ...formData, semester })
                }
              >
                <Text
                  style={[
                    styles.selectOptionText,
                    formData.semester === semester &&
                      styles.selectOptionTextActive,
                  ]}
                >
                  {semester === 'spring2024'
                    ? 'Spring 2024'
                    : semester === 'fall2023'
                    ? 'Fall 2023'
                    : 'Summer 2024'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.selectContainer}>
          <Text style={styles.selectLabel}>Payment Method</Text>
          <View style={styles.selectGroup}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.selectOption,
                  formData.paymentMethod === method &&
                    styles.selectOptionActive,
                ]}
                onPress={() =>
                  setFormData({
                    ...formData,
                    paymentMethod: method,
                  })
                }
              >
                <Text
                  style={[
                    styles.selectOptionText,
                    formData.paymentMethod === method &&
                      styles.selectOptionTextActive,
                  ]}
                >
                  {method === 'blockchain'
                    ? 'Blockchain'
                    : method === 'bank_transfer'
                    ? 'Bank Transfer'
                    : 'Check'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Card style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>Payment Summary</Text>
          <View style={styles.confirmRow}>
            <Text style={styles.confirmLabel}>Student:</Text>
            <Text style={styles.confirmValue}>
              {formData.studentName || 'N/A'}
            </Text>
          </View>
          <View style={styles.confirmRow}>
            <Text style={styles.confirmLabel}>Amount:</Text>
            <Text style={styles.confirmValue}>
              ${formData.amount || '0.00'}
            </Text>
          </View>
          <View style={styles.confirmRow}>
            <Text style={styles.confirmLabel}>Fee Type:</Text>
            <Text style={styles.confirmValue}>
              {formData.feeType.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.confirmRow, styles.confirmRowBorder]}>
            <Text style={styles.confirmLabel}>Method:</Text>
            <Text style={styles.confirmValue}>
              {formData.paymentMethod === 'blockchain'
                ? 'Blockchain'
                : 'Traditional'}
            </Text>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            label="Submit and Record on Blockchain"
            onPress={handleSubmit}
            loading={loading}
            variant="primary"
            size="large"
            style={styles.submitButton}
          />
          <Button
            label="Cancel"
            onPress={onBackPress}
            variant="outline"
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
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.heading5,
    color: colors.gray900,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  selectContainer: {
    marginBottom: spacing.lg,
  },
  selectLabel: {
    ...typography.body2,
    color: colors.gray800,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  selectGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  selectOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  selectOptionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectOptionText: {
    ...typography.caption,
    color: colors.gray700,
    fontWeight: '600',
  },
  selectOptionTextActive: {
    color: colors.white,
  },
  confirmCard: {
    marginBottom: spacing.lg,
  },
  confirmTitle: {
    ...typography.body2,
    color: colors.gray900,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  confirmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  confirmRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingTop: spacing.md,
  },
  confirmLabel: {
    ...typography.caption,
    color: colors.gray600,
  },
  confirmValue: {
    ...typography.caption,
    color: colors.gray900,
    fontWeight: '600',
  },
  actions: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginBottom: spacing.sm,
  },
});
