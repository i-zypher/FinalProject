import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import FavoritesScreen from '../screens/FavoritesScreen';
import RemindersScreen from '../screens/RemindersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { DrawerParamList } from './types';
import { colors, spacing, fontSizes } from '../styles/theme';
import { useUser } from '../context/UserContext';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { name, setName } = useUser();

  const handleLogout = () => {
    setName('');
    props.navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: colors.background, flexGrow: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>{name ? `Hi, ${name}` : 'Menu'}</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={colors.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      sceneContainerStyle={{ flex: 1 }}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerStyle: { backgroundColor: colors.background, width: 260 },
        drawerLabelStyle: { fontSize: fontSizes.md },
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} /> }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  headerText: { color: colors.text, fontSize: fontSizes.lg, fontWeight: '700' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  logoutText: { color: colors.error, fontSize: fontSizes.md, marginLeft: spacing.sm, fontWeight: '600' },
});