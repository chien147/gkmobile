import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './Hooks/useAuth';
import StackNatigator from './StackNatigator';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNatigator />
      </AuthProvider>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
