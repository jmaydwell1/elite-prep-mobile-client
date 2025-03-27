import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PhysicalPractice = ({ navigation }) => {
    const [time, setTime] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(false);

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
                    <StyledText className="text-white text-xl font-semibold">Physical Practice</StyledText>
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
                            className="w-16 h-16 bg-yellow-500 rounded-full items-center justify-center"
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
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
};

export default PhysicalPractice; 