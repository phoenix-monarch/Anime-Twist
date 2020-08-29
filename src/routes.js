/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HistoryScreen from './screens/HistoryScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SecondSearchScreen from './screens/SecondSearchScreen';
import AnimeScreen from './screens/AnimeScreen';

const HistoryStack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={() => ({
    animationEnabled: false,
    headerShown: false,
  })}
  >
    <SearchStack.Screen component={SearchScreen} name="Search" />
    <SearchStack.Screen component={SecondSearchScreen} name="SecondSearch" />
    <SearchStack.Screen component={AnimeScreen} name="Anime" />
  </SearchStack.Navigator>
);

const HistoryStackScreen = () => (
  <HistoryStack.Navigator screenOptions={() => ({
    cardStyle: {
      backgroundColor: 'transparent',
    },
    headerShown: false,
  })}
  >
    <HistoryStack.Screen component={HistoryScreen} name="History" />
    <HistoryStack.Screen component={AnimeScreen} name="Anime" />
  </HistoryStack.Navigator>
);

const FavoritesStackScreen = () => (
  <FavoritesStack.Navigator screenOptions={() => ({
    cardStyle: {
      backgroundColor: 'transparent',
    },
    headerShown: false,
  })}
  >
    <FavoritesStack.Screen component={FavoritesScreen} name="Favorites" />
    <FavoritesStack.Screen component={AnimeScreen} name="Anime" />
  </FavoritesStack.Navigator>
);

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#232323',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        component={SearchStackScreen}
        name="Search"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome color={focused ? '#e63232' : color} name="search" size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={FavoritesStackScreen}
        name="Favorites"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome color={focused ? '#e63232' : color} name="heart" size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={HistoryStackScreen}
        name="History"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <FontAwesome color={focused ? '#e63232' : color} name="history" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
