import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import WeatherResultsScreen from './src/screens/WeatherResultsScreen';
import AccommodationsScreen from './src/screens/AccommodationsScreen';
import ThingsToDoScreen from './src/screens/ThingsToDoScreen';

export type RootStackParamList = {
  Main: undefined;
  WeatherResults: {
    originQuery?: string;
    destinationQuery?: string;
  };
  Accommodations: {
    city: string;
    country: string;
  };
  ThingsToDo: {
    city: string;
    country: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d44000',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#d44000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Weather & Travel' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#d44000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WeatherResults"
            component={WeatherResultsScreen}
            options={{ title: 'Weather Comparison' }}
          />
          <Stack.Screen
            name="Accommodations"
            component={AccommodationsScreen}
            options={{ title: 'Where to Stay' }}
          />
          <Stack.Screen
            name="ThingsToDo"
            component={ThingsToDoScreen}
            options={{ title: 'Things to Do' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
