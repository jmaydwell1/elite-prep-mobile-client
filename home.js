import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Logo from './assets/logo.png';

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
        <View className="flex-1">
            <SafeAreaView className="flex-1">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                >
                    <StyledView className="flex-1 px-5">
                        <StyledView className="items-center mt-8 mb-8">
                            <Image
                                source={Logo}
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                        </StyledView>

                        <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mb-8">
                            <StyledText className="text-white text-lg mb-2">Next Event In:</StyledText>
                            <StyledView className="flex-row justify-between">
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">{timeLeft.days}</StyledText>
                                    <StyledText className="text-[#89898A]">Days</StyledText>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">{timeLeft.hours}</StyledText>
                                    <StyledText className="text-[#89898A]">Hours</StyledText>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">{timeLeft.minutes}</StyledText>
                                    <StyledText className="text-[#89898A]">Minutes</StyledText>
                                </StyledView>
                                <StyledView className="items-center">
                                    <StyledText className="text-[#58C5C7] text-2xl font-bold">{timeLeft.seconds}</StyledText>
                                    <StyledText className="text-[#89898A]">Seconds</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>

                        <StyledView className="bg-[#2D2D2E] rounded-lg p-4">
                            <StyledText className="text-white text-lg mb-4">Your Baseline Results:</StyledText>
                            <StyledView className="space-y-3">
                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Confidence Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.confidence}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Focus Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.focus}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Performance Anxiety</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.anxiety}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Enjoyment Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.enjoyment}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Burnout Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.burnout}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Effort Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.effort}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Motivation Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.motivation}/10</StyledText>
                                    </StyledView>
                                </StyledView>

                                <StyledView className="bg-[#3D3D3E] rounded-lg p-4">
                                    <StyledView className="flex-row justify-between items-center">
                                        <StyledText className="text-[#89898A]">Readiness Level</StyledText>
                                        <StyledText className="text-[#58C5C7] text-xl font-bold">{baselineResults.readiness}/10</StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default Home; 