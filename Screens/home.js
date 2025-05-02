import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../assets/logo.png';
import Focus from '../assets/focus.png';
import PerformanceAnxiety from '../assets/performance-anxiety.png';
import Enjoyment from '../assets/enjoyment.png';
import Stress from '../assets/stress.png';
import Confidence from '../assets/confidence.png';
import FloatingActionButton from '../components/FloatingActionButton';
import { Svg, Circle } from 'react-native-svg';
import { userService } from '../api';
import { useOnboarding } from '../context/OnboardingContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SIZE = 64;  // same as w-24,h-24 → 24*4px
const STROKE = 8;   // same as border-8

const Home = () => {
    const navigation = useNavigation();
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 24,
        minutes: 60,
        seconds: 0
    });
    const [performanceAverages, setPerformanceAverages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { onboardingData } = useOnboarding();

    useEffect(() => {
        const fetchPerformanceAverages = async () => {
            if (!onboardingData.email) {
                console.log('No email found in onboardingData:', onboardingData);
                setIsLoading(false);
                return;
            }
            
            console.log('Fetching performance averages for email:', onboardingData.email);
            try {
                const response = await userService.getPerformanceAverages(onboardingData.email);
                console.log('API Response:', response);
                console.log('Response data:', response.data);
                setPerformanceAverages(response.data);
            } catch (error) {
                console.error('Error fetching performance averages:', error);
                console.error('Error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });
                
                // Handle specific error cases
                if (error.response?.status === 404) {
                    if (error.response?.data?.detail === "User not found") {
                        Alert.alert(
                            'Error',
                            'User account not found. Please complete the registration process.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.navigate('Create')
                                }
                            ]
                        );
                    } else if (error.response?.data?.detail === "No performance data available") {
                        Alert.alert(
                            'No Data',
                            'No performance data available yet. Complete your first check-in to see your performance trends.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.navigate('baselineQuestionnaire')
                                }
                            ]
                        );
                    }
                } else {
                    Alert.alert('Error', 'Failed to load performance data. Please try again later.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPerformanceAverages();
    }, [onboardingData.email]);

    // Calculate average readiness score from performance averages
    const calculateReadinessScore = () => {
        if (!performanceAverages) return 0;
        return performanceAverages.total_average || 0;
    };

    const progress = (calculateReadinessScore() / 10) * 100;

    const R = (SIZE - STROKE) / 2;              // radius
    const circumference = 2 * Math.PI * R;      // circumference
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        // Set your target date here
        const targetDate = new Date('2024-04-01T00:00:00');

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <ScrollView className="flex-1">
                <StyledView className="px-5 py-6">
                    <StyledView className="flex-row justify-end ">
                        <StyledTouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledView className="items-center -mt-24 -mb-16">
                        <Image
                            source={Logo}
                            className="w-52 h-52"
                            resizeMode="contain"
                        />
                    </StyledView>

                    <StyledText className="text-[#89898A] text-xl font-semibold mb-4 text-center">
                        Your Next Milestone
                    </StyledText>
                    <StyledView className="flex-row justify-center items-center gap-2 mb-8">
                        <StyledTouchableOpacity
                            className="items-center"
                            onPress={() => navigation.navigate('LineGraph')}
                        >
                            <StyledText className="text-white text-6xl font-bold">
                                {timeLeft.days}
                            </StyledText>
                            <StyledText className="text-[#89898A]">Days</StyledText>
                        </StyledTouchableOpacity>
                        <StyledView className="h-[64px] justify-center">
                            <StyledText className="text-white text-4xl font-bold">:</StyledText>
                        </StyledView>
                        <StyledTouchableOpacity
                            className="items-center"
                            onPress={() => navigation.navigate('LineGraph')}
                        >
                            <StyledText className="text-white text-6xl font-bold">
                                {timeLeft.hours}
                            </StyledText>
                            <StyledText className="text-[#89898A]">Hours</StyledText>
                        </StyledTouchableOpacity>
                        <StyledView className="h-[64px] justify-center">
                            <StyledText className="text-white text-4xl font-bold">:</StyledText>
                        </StyledView>
                        <StyledTouchableOpacity
                            className="items-center"
                            onPress={() => navigation.navigate('LineGraph')}
                        >
                            <StyledText className="text-[#F6FF6B] text-6xl font-bold">
                                {timeLeft.minutes}
                            </StyledText>
                            <StyledText className="text-[#89898A]">Minutes</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledView className="bg-white rounded-lg p-4 mb-3">
                        <StyledText className="text-[#2D2D2E] text-lg font-semibold mb-2">Your Readiness: </StyledText>
                        <StyledView className="flex-row items-center justify-between">
                            <StyledView className="items-center">
                                <StyledView className="relative" style={{ width: SIZE, height: SIZE }}>
                                    {/* background track */}
                                    <Svg width={SIZE} height={SIZE}>
                                        <Circle
                                            cx={SIZE / 2} cy={SIZE / 2} r={R}
                                            stroke="#E5E5E5"
                                            strokeWidth={STROKE}
                                            fill="none"
                                        />
                                        {/* progress stroke */}
                                        <Circle
                                            cx={SIZE / 2} cy={SIZE / 2} r={R}
                                            stroke="#58C5C7"
                                            strokeWidth={STROKE}
                                            fill="none"
                                            strokeDasharray={`${circumference} ${circumference}`}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                                        />
                                    </Svg>

                                    {/* center score */}
                                    <StyledView className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                                        {isLoading ? (
                                            <StyledText className="text-[#58C5C7] text-2xl font-bold">...</StyledText>
                                        ) : (
                                            <StyledText className="text-[#58C5C7] text-2xl font-bold">
                                                {Math.round(calculateReadinessScore())}
                                                <StyledText className="text-[#89898A] text-base">/10</StyledText>
                                            </StyledText>
                                        )}
                                    </StyledView>
                                </StyledView>

                                <StyledText className="text-[#89898A] text-sm mt-3">
                                    Performance average
                                </StyledText>
                            </StyledView>

                            {/* Check-in Button */}
                            <StyledTouchableOpacity
                                className="h-[50px] w-[100px] rounded-full overflow-hidden"
                                onPress={() => navigation.navigate('baselineQuestionnaire')}
                            >
                                <LinearGradient
                                    colors={['#58C5C7', '#5996C8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="flex-1 justify-center items-center"
                                >
                                    <StyledText className="text-white text-base font-semibold">
                                        Check-in
                                    </StyledText>
                                </LinearGradient>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>

                    <StyledView className="bg-[#3D3D3E] rounded-lg p-4 mb-3">
                        <StyledText className="text-white text-lg font-semibold mb-4">Practice Time Distribution</StyledText>
                        <StyledView className="h-6 bg-[#F6FF6B] rounded-full overflow-hidden">
                            <StyledView 
                                className="h-full bg-[#58C5C7] rounded-full"
                                style={{ width: '50%' }}
                            />
                        </StyledView>
                        <StyledView className="flex-row justify-between mt-2">
                            <StyledText className="text-white text-sm">Physical: 50%</StyledText>
                            <StyledText className="text-white text-sm">Mental: 50%</StyledText>
                        </StyledView>
                    </StyledView>

                    <StyledView className="space-y-3">
                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('LineGraph', { trend: 'Focus' })}
                            className="bg-[#3D3D3E] rounded-lg p-4"
                        >
                            <StyledView className="flex-row justify-between items-center">
                                <StyledView className="flex-row items-center">
                                    <Image source={Focus} className="w-6 h-6 mr-3" />
                                    <StyledText className="text-white text-xl font-semibold">Focus</StyledText>
                                </StyledView>
                                <StyledText className="text-white text-2xl font-bold">
                                    {isLoading ? "..." : Math.round(performanceAverages?.average_focus || 0)}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>

                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('LineGraph', { trend: 'Performance Anxiety' })}
                            className="bg-[#3D3D3E] rounded-lg p-4"
                        >
                            <StyledView className="flex-row justify-between items-center">
                                <StyledView className="flex-row items-center">
                                    <Image source={PerformanceAnxiety} className="w-6 h-6 mr-3" />
                                    <StyledText className="text-white text-xl font-semibold">Performance Anxiety</StyledText>
                                </StyledView>
                                <StyledText className="text-white text-2xl font-bold">
                                    {isLoading ? "..." : Math.round(performanceAverages?.average_anxiety || 0)}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>

                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('LineGraph', { trend: 'Enjoyment' })}
                            className="bg-[#3D3D3E] rounded-lg p-4"
                        >
                            <StyledView className="flex-row justify-between items-center">
                                <StyledView className="flex-row items-center">
                                    <Image source={Enjoyment} className="w-6 h-6 mr-3" />
                                    <StyledText className="text-white text-xl font-bold">Enjoyment</StyledText>
                                </StyledView>
                                <StyledText className="text-white text-2xl font-bold">
                                    {isLoading ? "..." : Math.round(performanceAverages?.average_enjoyment || 0)}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>

                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('LineGraph', { trend: 'Burnout' })}
                            className="bg-[#3D3D3E] rounded-lg p-4"
                        >
                            <StyledView className="flex-row justify-between items-center">
                                <StyledView className="flex-row items-center">
                                    <Image source={Stress} className="w-6 h-6 mr-3" />
                                    <StyledText className="text-white text-xl font-semibold">Burnout</StyledText>
                                </StyledView>
                                <StyledText className="text-white text-2xl font-bold">
                                    {isLoading ? "..." : Math.round(performanceAverages?.average_burnout || 0)}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>

                        <StyledTouchableOpacity
                            onPress={() => navigation.navigate('LineGraph', { trend: 'Confidence' })}
                            className="bg-[#3D3D3E] rounded-lg p-4"
                        >
                            <StyledView className="flex-row justify-between items-center">
                                <StyledView className="flex-row items-center">
                                    <Image source={Confidence} className="w-6 h-6 mr-3" />
                                    <StyledText className="text-white text-xl font-semibold">Confidence</StyledText>
                                </StyledView>
                                <StyledText className="text-white text-2xl font-bold">
                                    {isLoading ? "..." : Math.round(performanceAverages?.average_confidence || 0)}
                                </StyledText>
                            </StyledView>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </ScrollView>
            {/* Bottom Navigation Bar */}
            <StyledView className="bg-[#1C1C1D] flex-row justify-around py-4 px-5">
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="home" size={24} color="#FFFFFF" />
                    <StyledText className="text-white mt-1">Home</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Performance')}>
                    <Ionicons name="stats-chart" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">Performance</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Journal')}>
                    <Ionicons name="journal" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">Journaling</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="time" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">History</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
            <FloatingActionButton navigation={navigation} />
        </SafeAreaView>
    );
};

export default Home; 