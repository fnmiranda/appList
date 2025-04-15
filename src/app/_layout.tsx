// import './gesture-handler';
import { StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../database/initializeDatabase';
import { AuthProvider } from '../context/authContext';
import Routes from '../routes/index.routes';


export default function RootLayout() {
  return (
    <AuthProvider>
      <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
        {/* <NavigationContainer> */}
          <Routes/>
        {/* </NavigationContainer> */}
      </SQLiteProvider>
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
 
});
