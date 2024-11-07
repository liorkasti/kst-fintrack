# kst-fintrack

**kst-fintrack** is a React Native expense tracking app designed for efficient state management and data persistence, with a focus on clean code, modular architecture, and optimized performance.

## Key Features

- **Expense Management**: Add, update, and delete expenses.
- **Filtering**: Filter expenses by title, date, and amount.
- **Data Persistence**: Persistent data storage using Redux Persist and AsyncStorage.
- **Performance Optimization**: Memoized calculations, list virtualization, and React Query for caching.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/liorkasti/kst-fintrack.git
   cd kst-fintrack
   ```

2. **Install Bun and Dependencies**:
   Install [Bun](https://bun.sh/) (if not installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

   Then install project dependencies:
   ```bash
   bun install
   ```

3. **Run the App**:
   - **Start Development Server**:
     ```bash
     bun run start
     ```
   - **iOS** (Mac required):
     ```bash
     bun run ios
     ```
   - **Android** (with emulator/device connected):
     ```bash
     bun run android
     ```

## Technologies

- **React Native** - Cross-platform framework
- **Redux Toolkit** - Simplified state management
- **Redux Persist** - Persistent Redux state
- **React Query** - Efficient data fetching
- **TypeScript** - Type-safe development
- **Bun** - Fast package management

---

This README provides a quick overview and installation guide, suitable for assessment purposes.