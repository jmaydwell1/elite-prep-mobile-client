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
                                className="w-80 h-80"
                                resizeMode="contain"
                            />
                        </StyledView>

                        {/* Countdown Section */}
                        <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mb-8">
                            <StyledText className="text-white text-lg mb-2">
                                Next Event In:
                            </StyledText>
                            <StyledView className="flex-row justify-between">
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">
                                        {timeLeft.days}
                                    </StyledText>
                                    <StyledText className="text-[#89898A]">Days</StyledText>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">
                                        {timeLeft.hours}
                                    </StyledText>
                                    <StyledText className="text-[#89898A]">Hours</StyledText>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">
                                        {timeLeft.minutes}
                                    </StyledText>
                                    <StyledText className="text-[#89898A]">Minutes</StyledText>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">
                                        {timeLeft.seconds}
                                    </StyledText>
                                    <StyledText className="text-[#89898A]">Seconds</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>

                        {/* Baseline Results Section */}

                        <StyledText className="text-white text-lg mb-4">
                            Performance Trends:
                        </StyledText>
                        <StyledView className="space-y-4">
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Confidence Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.confidence}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Focus Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.focus}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Performance Anxiety</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.anxiety}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Enjoyment Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.enjoyment}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Burnout Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.burnout}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Effort Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.effort}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Motivation Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.motivation}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                            <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                                <StyledView className="flex-row justify-between items-center">
                                    <StyledText className="text-white">Readiness Level</StyledText>
                                    <StyledText className="text-white text-xl font-bold">
                                        {baselineResults.readiness}
                                    </StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>

                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Home; 