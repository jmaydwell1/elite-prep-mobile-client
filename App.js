import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { styled } from 'nativewind';
import Login from './onboarding/login';
import InitialScreen from './onboarding/initialScreen';
import Create from './onboarding/create';
import UserProfile from './onboarding/userProfile';
import SportsSelection from './onboarding/sportsSelection';
import Notifications from './onboarding/notifications';
import TournamentDetails from './onboarding/tournamentDetails';
import AthleticStatus from './onboarding/athleticStatus';
import GoalSetting from './onboarding/goalSetting';
import BaselineReminder from './onboarding/baselineReminder';
import BaselineQuestionnaire from './onboarding/baselineQuestionnaire';
import Home from './onboarding/home';


const StyledView = styled(View);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StyledView className="flex-1 bg-[#1C1C1D]">
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="InitialScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            {/* Add other screens here */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="SportsSelection" component={SportsSelection} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="TournamentDetails" component={TournamentDetails} />
            <Stack.Screen name="AthleticStatus" component={AthleticStatus} />
            <Stack.Screen name="GoalSetting" component={GoalSetting} />
            <Stack.Screen name="BaselineReminder" component={BaselineReminder} />
            <Stack.Screen name="BaselineQuestionnaire" component={BaselineQuestionnaire} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </StyledView>
    </SafeAreaProvider>
  );
}
