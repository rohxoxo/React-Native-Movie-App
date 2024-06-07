import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/Header/Header';
import MoviesScreen from './src/components/Movies/MovieScreen';
import SearchScreen from './src/components/Search/SearchScreen';
import TVScreen from './src/components/Tv/TVScreen';
import MovieDetailsScreen from './src/components/Details/Details'; 

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MoviesList" component={MoviesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Details" component={MovieDetailsScreen} options={{ title: 'Back to List' }} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SearchList" component={SearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Details" component={MovieDetailsScreen} options={{ title: 'Back to List' }} />
  </Stack.Navigator>
);

const TVStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TVList" component={TVScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Details" component={MovieDetailsScreen} options={{ title: 'Back to List' }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <View style={styles.container}>
      <Header title="Movies App" />
      <StatusBar style="auto" />
      <View style={{ flex: 1, paddingTop: 100 }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Movies" component={MoviesStack} />
            <Tab.Screen name="Search" component={SearchStack} />
            <Tab.Screen name="TV" component={TVStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
