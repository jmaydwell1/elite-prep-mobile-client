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
import LineGraph from './onboarding/lineGraph';
import Performance from './onboarding/performance';
import StartPractice from './onboarding/StartPractice';
import PhysicalPractice from './onboarding/PhysicalPractice';
import Settings from './onboarding/Settings';
import PracticeType from './onboarding/PracticeType';
import SkillsPractice from './onboarding/SkillsPractice';
import ShortGameReflection from './onboarding/ShortGameReflection';
import TeeShotsReflection from './onboarding/TeeShotsReflection';
import ApproachShotsReflection from './onboarding/ApproachShotsReflection';
import PuttingReflection from './onboarding/PuttingReflection';
import RoundReflection from './onboarding/RoundReflection';

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
            <Stack.Screen name="LineGraph" component={LineGraph} />
            <Stack.Screen name="Performance" component={Performance} />
            <Stack.Screen name="StartPractice" component={StartPractice} />
            <Stack.Screen name="PhysicalPractice" component={PhysicalPractice} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="PracticeType" component={PracticeType} />
            <Stack.Screen name="SkillsPractice" component={SkillsPractice} />
            <Stack.Screen name="ShortGameReflection" component={ShortGameReflection} />
            <Stack.Screen name="TeeShotsReflection" component={TeeShotsReflection} />
            <Stack.Screen name="ApproachShotsReflection" component={ApproachShotsReflection} />
            <Stack.Screen name="PuttingReflection" component={PuttingReflection} />
            <Stack.Screen name="RoundReflection" component={RoundReflection} />
          </Stack.Navigator>
        </NavigationContainer>
      </StyledView>
    </SafeAreaProvider>
  );
}
