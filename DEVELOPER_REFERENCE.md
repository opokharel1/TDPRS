# TDPRS Developer Quick Reference

## Quick Setup

```bash
# Install all dependencies
npm install

# Install native dependencies
cd android && ./gradlew clean build && cd ..
cd ios && pod install && cd ..

# Start development
npm start

# Run on Android
npm run android

# Run on iOS  
npm run ios
```

## Project Structure at a Glance

| Folder | Purpose |
|--------|---------|
| `src/components/` | Reusable UI components |
| `src/screens/` | All application screens |
| `src/navigation/` | Navigation & routing setup |
| `src/stores/` | Zustand state management |
| `src/theme/` | Colors, typography, spacing |
| `src/utils/` | Utility functions |

## Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Root component |
| `src/navigation/RootNavigator.tsx` | Navigation config |
| `src/stores/index.ts` | State management |
| `src/theme/index.ts` | Design system |

## Common Tasks

### Add a New Screen

1. Create file in `src/screens/{role}/NewScreen.tsx`
2. Add to navigation in `RootNavigator.tsx`
3. Import and use in appropriate stack

### Add a Component

1. Create in `src/components/NewComponent.tsx`
2. Export from `src/components/index.ts`
3. Import in screens: `import { NewComponent } from '../components'`

### Add State

1. Update `src/stores/index.ts`
2. Use hook in component: `const value = useStore((state) => state.value)`

### Use Theme

```typescript
import { colors, typography, spacing } from '../theme';

// Colors
colors.primary
colors.gray600
colors.success

// Typography
typography.heading1
typography.body2
typography.caption

// Spacing
spacing.md
spacing.lg
```

## Component Usage Examples

### Button
```typescript
import { Button } from '../components';

<Button 
  label="Login"
  onPress={handleLogin}
  variant="primary"  // primary, secondary, outline, danger
  size="large"       // small, medium, large
  loading={isLoading}
/>
```

### Input
```typescript
import { Input } from '../components';

<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  rightIcon="eye"
  onRightIconPress={togglePassword}
/>
```

### Card
```typescript
import { Card } from '../components';

<Card style={styles.customStyle} onPress={handlePress}>
  {/* Content */}
</Card>
```

### Header
```typescript
import { Header } from '../components';

<Header
  title="Screen Title"
  onBackPress={() => navigation.goBack()}
  rightIcon="settings"
  onRightPress={handleSettings}
/>
```

## Navigation

### Navigate Between Screens
```typescript
// From component
navigation.navigate('ScreenName')

// With params
navigation.navigate('Details', { id: 123 })

// Go back
navigation.goBack()

// Replace screen
navigation.replace('NewScreen')
```

### Access Navigation Props
```typescript
type ScreenProps = NativeStackScreenProps<StackParamList, 'ScreenName'>;

const MyScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const params = route.params;
  return <View>{/* Component */}</View>;
};
```

## State Management

### Auth Store
```typescript
import { useAuthStore } from '../stores';

// Get user
const user = useAuthStore((state) => state.user);
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

// Set user
const setUser = useAuthStore((state) => state.setUser);
setUser({ id: '1', name: 'John', role: 'student', email: 'john@example.com' });

// Logout
const clearUser = useAuthStore((state) => state.clearUser);
clearUser();
```

### App Store
```typescript
import { useAppStore } from '../stores';

const userRole = useAppStore((state) => state.userRole);
const setUserRole = useAppStore((state) => state.setUserRole);

setUserRole('student');
```

### Transaction Store
```typescript
import { useTransactionStore } from '../stores';

const transactions = useTransactionStore((state) => state.transactions);
const addTransaction = useTransactionStore((state) => state.addTransaction);

addTransaction({
  id: '1',
  transactionHash: '0x...',
  studentId: 'STU-001',
  amount: 5000,
  feeType: 'tuition',
  date: '2024-04-20',
  semester: 'spring2024',
  status: 'pending',
});
```

## Styling Best Practices

```typescript
import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.heading2,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
});
```

## Role-Based Screens Map

### Student
- `StudentDashboardScreen` - Main dashboard
- `PaymentHistoryScreen` - Transaction history
- `DigitalReceiptScreen` - Receipt details
- `ProfileScreen` - User profile

### Accountant
- `AccountantDashboardScreen` - Dashboard
- `RecordPaymentScreen` - Record payment
- `VerifyPaymentScreen` - Verify transaction
- `ProfileScreen` - User profile

### Admin
- `AdminDashboardScreen` - Dashboard
- `UserManagementScreen` - Manage users
- `ProfileScreen` - User profile

## Common Issues & Solutions

### Navigation Not Working
- Ensure screen is registered in RootNavigator
- Check navigation prop is passed correctly
- Verify navigation type matches definition

### State Not Updating
- Check if using correct hook (useAuthStore, useAppStore, etc.)
- Ensure updating correct state path
- Check component is listening to right store

### Styling Issues
- Use spacing constants instead of hardcoded values
- Check color names against colors object
- Use typography styles for consistency

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build: `npm run android -- --mode=release`
- Check Pod issues on iOS: `cd ios && pod install && cd ..`

## Testing Components Locally

```typescript
// Use mock data
const mockUsers = [
  { id: '1', name: 'John', role: 'student' },
];

// Render with props
<StudentDashboardScreen
  onViewReceipts={jest.fn()}
  onViewPaymentHistory={jest.fn()}
  onViewProfile={jest.fn()}
/>
```

## Performance Tips

- Use React.memo for expensive components
- Avoid inline functions in render
- Use FlatList for long lists (not ScrollView)
- Lazy load images
- Memoize selectors in Zustand

## Useful Commands

```bash
# Clear cache and rebuild
npm start -- --reset-cache

# Build for production
cd android && ./gradlew assembleRelease && cd ..

# Lint check
npm run lint

# Run tests
npm test

# Watch mode for development
npm start
```

## Important Patterns

### Navigation with Role
```typescript
const userRole = useAppStore((state) => state.userRole);

useEffect(() => {
  if (userRole === 'student') {
    navigation.navigate('StudentApp');
  } else if (userRole === 'accountant') {
    navigation.navigate('AccountantApp');
  }
}, [userRole]);
```

### Form Validation
```typescript
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!email) newErrors.email = 'Required';
  if (!password) newErrors.password = 'Required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Loading State
```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    // API call
  } finally {
    setLoading(false);
  }
};
```

## Resources

- [React Native Docs](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Support

For issues or questions:
1. Check TDPRS_DOCUMENTATION.md
2. Review inline code comments
3. Check component PropTypes
4. Test with mock data

---

**Happy Coding! 🚀**
