import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PhysicalPractice = ({ navigation, route }) => {
    const [time, setTime] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(false);
    const practiceType = route.params?.type || 'play'; // Default to play if not specified
    const location = route.params?.location || 'indoor'; // Default to indoor if not specified
    const shotType = route.params?.shotType || null; // Shot type if specified

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => {
        console.log('Toggle timer called, current state:', isRunning);
        setIsRunning(prevState => !prevState);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    const getPracticeTypeTitle = () => {
        const typeTitle = (() => {
            switch(practiceType) {
                case 'play':
                    return 'Play';
                case 'intentional':
                    return 'Intentional Practice';
                case 'casual':
                    return 'Casual Practice';
                case 'equipment':
                    return 'Equipment Sessions';
                default:
                    return 'Physical Practice';
            }
        })();

        const locationText = location === 'indoor' ? 'Indoor' : 'Outdoor';
        const shotTypeText = shotType ? ` - ${(() => {
            switch(shotType) {
                case 'tee':
                    return 'Tee Shots';
                case 'approach':
                    return 'Approach Shots';
                case 'short':
                    return 'Short Game';
                case 'putting':
                    return 'Putting';
                default:
                    return '';
            }
        })()}` : '';

        return `${typeTitle} (${locationText})${shotTypeText}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1E]">
            <StyledView className="flex-1 px-4">
                {/* Header */}
                <StyledView className="flex-row items-center justify-between py-4">
                    <StyledTouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-white text-xl font-semibold">{getPracticeTypeTitle()}</StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Timer Display */}
                <StyledView className="flex-1 justify-center items-center">
                    <StyledText className="text-white text-6xl font-bold mb-8">
                        {formatTime(time)}
                    </StyledText>
                    
                    {/* Timer Controls */}
                    <StyledView className="flex-row space-x-6">
                        <StyledTouchableOpacity
                            onPress={toggleTimer}
                            className="w-16 h-16 bg-white rounded-full items-center justify-center"
                        >
                            <Ionicons 
                                name={isRunning ? "pause" : "play"} 
                                size={32} 
                                color="black" 
                            />
                        </StyledTouchableOpacity>
                        
                        <StyledTouchableOpacity
                            onPress={resetTimer}
                            className="w-16 h-16 bg-[#2D2D2E] rounded-full items-center justify-center"
                        >
                            <Ionicons name="refresh" size={32} color="white" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    {/* Complete Button */}
                    <StyledTouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        className="h-[50px] w-[200px] rounded-full overflow-hidden mt-10"
                    >
                        <LinearGradient
                            colors={['#58C5C7', '#5996C8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="flex-1 justify-center items-center"
                        >
                            <StyledText className="text-white text-base font-semibold">
                                Finish
                            </StyledText>
                        </LinearGradient>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
};

export default PhysicalPractice; 