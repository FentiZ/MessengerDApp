import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

import ChatsScreen from "../screens/ChatsScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import VideoCallScreen from "../screens/VideoCallScreen";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Chats"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Chats"
          component={ChatsScreen}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />

        <Stack.Screen
          name="VideoCall"
          component={VideoCallScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}