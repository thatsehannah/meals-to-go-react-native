import { useContext } from 'react';
import { Text } from 'react-native';
import { AuthButton } from '../../features/account/components/account.styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SafeAreaContainer } from '../../components/utility/safe-area.component';
import { RestaurantsNavigator } from './restaurants.navigator';
import { AuthenticationContext } from '../../services/auth/auth.context';

import { MapScreen } from '../../features/maps/screens/map.screen';
import { Spacer } from '../../components/spacer/spacer.component';
import { FavoritesContextProvider } from '../../services/favorites/favorites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurant/restaurants.context';

const SettingsScreen = () => {
  const { onLogout, user } = useContext(AuthenticationContext);

  return (
    <SafeAreaContainer
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Current user: {user.email}</Text>
      <Spacer />
      <AuthButton onPress={() => onLogout()}>Logout</AuthButton>
    </SafeAreaContainer>
  );
};

//object that uses the name of the route defined in Tab.Screen as the key
//and the icon name from @expo/vector-icons/Ionicons as the value to easily
//select the icon based on the route in screen options (see below)
const TAB_ICON = {
  Restaurants: 'restaurant',
  Map: 'map',
  Settings: 'settings',
};

//function that simplifies the process of determining the appropriate icon
//based on the route given in screen options in Tab.Navigator
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons
        name={iconName}
        size={size}
        color={color}
      />
    ),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  };
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <FavoritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
              name='Restaurants'
              component={RestaurantsNavigator}
            />
            <Tab.Screen
              name='Map'
              component={MapScreen}
            />
            <Tab.Screen
              name='Settings'
              component={SettingsScreen}
            />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoritesContextProvider>
  );
};
