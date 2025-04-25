import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PuttingReflection = ({ navigation, route }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [easinessRating, setEasinessRating] = useState(5);

    const handleOptionSelect = (option) => {
        setSelectedOptions(prev => {
            if (prev.includes(option)) {
                return prev.filter(opt => opt !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const handleNext = () => {
        if (selectedOptions.length > 0) {
            const remainingShotTypes = route.params?.shotTypes || [];
            
            if (remainingShotTypes.length > 0) {
                // Navigate to the next reflection screen
                const nextShotType = remainingShotTypes[0];
                const nextRemainingShotTypes = remainingShotTypes.slice(1);
                
                let nextScreen = '';
                switch (nextShotType) {
                    case 'tee':
                        nextScreen = 'TeeShotsReflection';
                        break;
                    case 'approach':
                        nextScreen = 'ApproachShotsReflection';
                        break;
                    case 'short':
                        nextScreen = 'ShortGameReflection';
                        break;
                }

                navigation.navigate(nextScreen, {
                    ...route.params,
                    puttingReflection: {
                        selectedOptions,
                        easinessRating
                    },
                    shotTypes: nextRemainingShotTypes,
                    currentShotType: nextShotType
                });
            } else {
                // No more shot types, navigate to PhysicalPractice
                navigation.navigate('SessionFeedback', {
                    ...route.params,
                    puttingReflection: {
                        selectedOptions,
                        easinessRating
                    }
                });
            }
        }
    };

    const renderSlider = (label, value, onValueChange) => (
        <StyledView className="mb-6">
            <StyledText className="text-white text-lg font-semibold mb-2">{label}</StyledText>
            <StyledView className="flex-row justify-between items-center">
                <Slider
                    style={{ flex: 1, height: 40 }}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={value}
                    onValueChange={onValueChange}
                    minimumTrackTintColor="#58C5C7"
                    maximumTrackTintColor="#2D2D2E"
                    thumbTintColor="#58C5C7"
                />
                <StyledText className="text-white text-lg ml-4 w-8 text-center">{value}</StyledText>
            </StyledView>
        </StyledView>
    );

    const reflectionOptions = [
        {
            id: 'distance',
            title: 'Distance Control',
            description: 'Focus on controlling putt distances'
        },
        {
            id: 'block',
            title: 'Block Putting',
            description: 'Practice with specific distance blocks'
        },
        {
            id: 'direction',
            title: 'Direction Control',
            description: 'Focus on putt direction and alignment'
        },
        {
            id: 'fundamentals',
            title: 'Stroke Fundamentals',
            description: 'Basic putting stroke technique work'
        },
        {
            id: 'competitive',
            title: 'Competitive Practice',
            description: 'Game-like putting scenarios'
        },
        {
            id: 'tempo',
            title: 'Tempo',
            description: 'Working on putting stroke tempo'
        },
        {
            id: 'routine',
            title: 'Practice Using Your Routine',
            description: 'Following your pre-putt routine'
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1E]">
            <StyledView className="flex-1">
                {/* Header */}
                <StyledView className="flex-row items-center justify-between py-4 px-4">
                    <StyledTouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </StyledTouchableOpacity>
                    <StyledText className="text-white text-xl font-semibold">Putting Reflection</StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Scrollable Content */}
                <ScrollView 
                    className="flex-1 px-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {/* Easiness Slider */}
                    <StyledView className="mb-6">
                        <StyledText className="text-white text-xl font-semibold mb-4">Rate Your Experience</StyledText>
                        {renderSlider('How easy was the practice?', easinessRating, setEasinessRating)}
                    </StyledView>

                    {/* Options List */}
                    <StyledView className="space-y-4">
                        {reflectionOptions.map((option) => (
                            <StyledTouchableOpacity
                                key={option.id}
                                onPress={() => handleOptionSelect(option.id)}
                                className={`bg-[#2D2D2E] rounded-xl p-4 flex-row items-center justify-between ${
                                    selectedOptions.includes(option.id) ? 'border-2 border-[#58C5C7]' : ''
                                }`}
                            >
                                <StyledView className="flex-1">
                                    <StyledText className="text-white text-lg font-semibold">{option.title}</StyledText>
                                    <StyledText className="text-gray-400 text-sm">{option.description}</StyledText>
                                </StyledView>
                                {selectedOptions.includes(option.id) && (
                                    <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                                )}
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>
                </ScrollView>

                {/* Next Button */}
                <StyledTouchableOpacity
                    className={`h-[50px] rounded-full overflow-hidden mx-4 mb-5 ${
                        selectedOptions.length === 0 ? 'opacity-50' : ''
                    }`}
                    onPress={handleNext}
                >
                    <LinearGradient
                        colors={['#58C5C7', '#5996C8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="flex-1 justify-center items-center"
                    >
                        <StyledText className="text-white text-base font-semibold">
                            Next
                        </StyledText>
                    </LinearGradient>
                </StyledTouchableOpacity>
            </StyledView>
        </SafeAreaView>
    );
};

export default PuttingReflection; 