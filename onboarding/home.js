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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Home = () => {
    const navigation = useNavigation();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Mock data for baseline questionnaire results
    const baselineResults = {
        confidence: 7,
        focus: 8,
        anxiety: 3,
        enjoyment: 9,
        burnout: 2,
        effort: 8,
        motivation: 9,
        readiness: 7
    };

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
            {/* KeyboardAvoidingView also uses the same background */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 bg-[#1C1C1D]"
            >
                {/* ScrollView gets the same background to cover empty space */}
                <ScrollView
                    className="flex-1 bg-[#1C1C1D]"
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <StyledView className="flex-1 px-5 bg-[#1C1C1D]">
                        {/* Logo Section */}
                        <StyledView className="items-center -mt-12 -mb-16">
                            <Image
                                source={Logo}
                                className="w-60 h-60"
                                resizeMode="contain"
                            />
                        </StyledView>

                        {/* Countdown Section */}
                        <StyledText className="text-[#89898A] text-xl font-semibold mb-10 text-center">
                            Your Next Milestone
                        </StyledText>
                        <StyledView className="flex-row justify-center items-center gap-2 mb-8">
                            <StyledTouchableOpacity 
                                className="items-center"
                                onPress={() => navigation.navigate('LineGraph')}
                            >
                                <StyledText className="text-white text-6xl font-bold">
                                    12
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
                                    10
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
                                    24
                                </StyledText>
                                <StyledText className="text-[#89898A]">Minutes</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>

                        {/* Baseline Results Section */}
                        <StyledText className="text-white text-xl font-semibold mb-4">
                            Performance Trends
                        </StyledText>
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
                                    <StyledText className="text-white text-2xl font-bold">7</StyledText>
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
                                    <StyledText className="text-white text-2xl font-bold">5</StyledText>
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
                                    <StyledText className="text-white text-2xl font-bold">9</StyledText>
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
                                    <StyledText className="text-white text-2xl font-bold">4</StyledText>
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
                                    <StyledText className="text-white text-2xl font-bold">7</StyledText>
                                </StyledView>
                            </StyledTouchableOpacity>
                        </StyledView>

                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
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
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="journal" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">Journaling</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="time" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">History</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
};

export default Home; 