# TDPRS - Trusted Digital Payment Record System

A modern, blockchain-based mobile application for managing and verifying student payment transactions in educational institutions.

## Overview

TDPRS is a comprehensive React Native application designed for colleges to manage and verify student payment transactions using blockchain technology. The application supports three distinct user roles:

- **Students**: View payment records, download receipts, verify transactions
- **Accountants**: Record payments, verify transactions, manage payment data
- **Administrators**: Manage users, view analytics, configure system settings

## Key Features

### Core Functionality
- **Secure Authentication**: Email/Student ID and password-based login with wallet connection
- **Wallet Integration**: Support for MetaMask, private key import, and institutional wallets
- **Blockchain Integration**: All payments recorded on blockchain with transaction verification
- **Digital Receipts**: QR code-based receipt generation and verification
- **Payment History**: Comprehensive transaction tracking with filtering options
- **Analytics Dashboard**: Real-time analytics for administrators and accountants

### User-Specific Features

#### Student Features
- Dashboard with wallet balance and payment overview
- Payment history with semester and category filters
- Digital receipt viewing and PDF download
- Blockchain transaction verification
- QR code verification for instant transaction validation
- Profile management and security settings

#### Accountant Features
- Dashboard with payment metrics and alerts
- Record new student payments with blockchain submission
- Transaction verification and management
- Weekly payment analytics
- Student records management

#### Admin Features
- System health monitoring dashboard
- User management (add, remove, assign roles)
- Revenue distribution analytics
- System settings and blockchain configuration
- Recent activity tracking
- Network and security status monitoring

## Project Structure

```
MyAppCLI/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   ├── DashboardCards.tsx
│   │   └── index.ts
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── RoleSelectionScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── WalletConnectionScreen.tsx
│   │   ├── student/         # Student screens
│   │   │   ├── StudentDashboardScreen.tsx
│   │   │   ├── PaymentHistoryScreen.tsx
│   │   │   └── DigitalReceiptScreen.tsx
│   │   ├── accountant/      # Accountant screens
│   │   │   ├── AccountantDashboardScreen.tsx
│   │   │   ├── RecordPaymentScreen.tsx
│   │   │   └── VerifyPaymentScreen.tsx
│   │   ├── admin/           # Admin screens
│   │   │   ├── AdminDashboardScreen.tsx
│   │   │   └── UserManagementScreen.tsx
│   │   └── common/          # Shared screens
│   │       └── ProfileScreen.tsx
│   ├── navigation/
│   │   └── RootNavigator.tsx # Navigation configuration
│   ├── stores/
│   │   └── index.ts          # Zustand state management
│   ├── theme/
│   │   └── index.ts          # Design system & colors
│   └── utils/                # Utility functions
├── App.tsx                   # Root application component
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Design System

### Colors
- **Primary**: #5B6FFF (Blue/Purple)
- **Secondary**: #00D084 (Green)
- **Accent**: #FF6B6B (Red)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typography
- **Heading1**: 32px, 700 weight
- **Heading2**: 28px, 700 weight
- **Body**: 16px, 400 weight
- **Caption**: 12px, 400 weight

### Components
- **Button**: Primary, Secondary, Outline, Danger variants
- **Card**: Elevated card containers with optional shadow
- **Input**: Text input with labels, error states, and icons
- **Badge**: Status and label badges in multiple variants
- **Header**: Navigation header with back button and actions
- **TransactionCard**: Transaction display with status indicators
- **BalanceCard**: Gradient card showing wallet balance
- **StatCard**: Key metric display cards

## Tech Stack

### Core
- React Native 0.84.1
- React 19.2.3
- TypeScript 5.8.3

### Navigation
- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/native-stack

### State Management
- Zustand 4.4.7 - Lightweight state management

### UI & Styling
- react-native-vector-icons - Icon library
- react-native-linear-gradient - Gradient backgrounds
- react-native-qrcode-svg - QR code generation
- react-native-chart-kit - Charts and graphs

### Web3 & Blockchain
- ethers 6.10.0 - Ethereum library for blockchain integration

### Forms & Validation
- Formik 2.4.5 - Form state management
- Yup 1.3.3 - Schema validation

### Other
- react-native-gesture-handler - Touch handling
- react-native-reanimated - Smooth animations
- axios 1.6.5 - HTTP client

## Getting Started

### Prerequisites
- Node.js 22.11.0 or higher
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Install dependencies**:
```bash
npm install
# or
yarn install
```

2. **Set up native dependencies**:
```bash
# For Android
cd android
./gradlew clean build
cd ..

# For iOS
cd ios
pod install
cd ..
```

### Running the Application

#### Android
```bash
npm run android
# or
react-native run-android
```

#### iOS
```bash
npm run ios
# or
react-native run-ios
```

#### Start Metro Bundler
```bash
npm start
# or
react-native start
```

## Navigation Flow

### Authentication Flow
1. **Splash Screen** → Displays TDPRS logo and loading animation (3 seconds)
2. **Onboarding** → Three screens explaining the system benefits
3. **Role Selection** → Choose between Student, Accountant, or Admin
4. **Login** → Email/Student ID and password authentication
5. **Wallet Connection** → Connect blockchain wallet (MetaMask, Private Key, or Institutional)

### Post-Authentication Navigation

#### Student App
- **Dashboard Tab**: Balance, stats, quick actions, recent transactions
- **History Tab**: Payment history with filtering by semester and category
- **Profile Tab**: User profile, security settings

#### Accountant App
- **Dashboard Tab**: Payment metrics, weekly analytics, alerts
- **Transactions Tab**: Record payments, verify transactions, manage records
- **Profile Tab**: User profile, security settings

#### Admin App
- **Dashboard Tab**: System health, analytics, recent activities
- **Users Tab**: User management (add, edit, delete, change roles)
- **Profile Tab**: User profile, security settings

## State Management

### Zustand Stores

#### useAuthStore
- `user`: Current authenticated user
- `isAuthenticated`: Authentication status
- `isLoading`: Loading state
- `setUser()`: Set user after authentication
- `clearUser()`: Clear user on logout

#### useAppStore
- `userRole`: Current user role
- `theme`: Light or dark theme
- `walletConnected`: Wallet connection status
- `setUserRole()`: Set user role
- `setTheme()`: Change theme
- `setWalletConnected()`: Update wallet status

#### useTransactionStore
- `transactions`: List of transactions
- `addTransaction()`: Add new transaction
- `updateTransaction()`: Update existing transaction
- `setTransactions()`: Set all transactions

## API Integration

### Mock Data
The application currently uses mock data. To integrate with real APIs:

1. Update `useAuthStore` to call authentication endpoints
2. Modify `useTransactionStore` to fetch from transaction API
3. Connect wallet functionality to MetaMask SDK
4. Integrate blockchain transaction submission

### Example API Endpoints (To be implemented)
```
POST /auth/login
POST /auth/logout
POST /payments/record
GET /payments/verify/{txHash}
GET /users
POST /users
PUT /users/{id}
DELETE /users/{id}
```

## Blockchain Integration

### Current Implementation
- Mock blockchain transaction verification
- QR code generation for receipts
- Transaction hash display and verification

### To Implement
1. Connect to Ethereum testnet (Sepolia) or mainnet
2. Deploy smart contract for payment recording
3. Integrate ethers.js for contract interaction
4. Implement transaction signing with wallet
5. Add gas fee estimation

## Security Considerations

- **Private Key Management**: Keys stored locally only, never transmitted
- **Wallet Security**: Support for hardware wallet integration
- **Session Management**: Automatic logout on inactivity
- **Data Encryption**: Implement encryption for sensitive data
- **SSL/TLS**: Use HTTPS for all API calls
- **Rate Limiting**: Implement rate limiting on authentication

## Testing

### Unit Tests
```bash
npm test
```

### E2E Testing
(To be configured)

## Performance Optimization

- **Lazy Loading**: Screens load on demand
- **Image Optimization**: Vector icons used throughout
- **State Management**: Efficient state updates with Zustand
- **Memoization**: Component optimization with React.memo
- **Code Splitting**: Separate navigation stacks per role

## Accessibility

- **Screen Reader Support**: ARIA labels on interactive elements
- **Touch Targets**: Minimum 44x44pt touch targets
- **Color Contrast**: WCAG AA compliant color ratios
- **Text Scaling**: Support for dynamic text sizing

## Deployment

### Android
```bash
cd android
./gradlew assembleRelease
# APK located at android/app/build/outputs/apk/release/
```

### iOS
```bash
cd ios
xcodebuild -workspace MyAppCLI.xcworkspace -scheme MyAppCLI -configuration Release
```

## Future Enhancements

- [ ] Dark mode support
- [ ] Biometric authentication (Face ID, Touch ID)
- [ ] Offline transaction recording
- [ ] Advanced analytics and reporting
- [ ] Integration with institutional systems (Banner, Blackboard)
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Document OCR for payment verification
- [ ] Audit trail and compliance reporting
- [ ] Mobile wallet integration (Samsung Pay, Google Pay)

## Contributing

1. Follow React Native best practices
2. Use TypeScript for type safety
3. Maintain component naming conventions
4. Update documentation for new features
5. Test on both Android and iOS

## License

Proprietary - State University

## Support

For technical support or questions, contact:
- Development Team: dev@university.edu
- Documentation: docs.university.edu/tdprs

## Changelog

### Version 1.0.0
- Initial release with core functionality
- Three user roles (Student, Accountant, Admin)
- Blockchain integration framework
- Complete UI design system
- Authentication and wallet integration
