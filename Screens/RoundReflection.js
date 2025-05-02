import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const RoundReflection = ({ navigation, route }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [adaptationRating, setAdaptationRating] = useState(5);
    const [decisionMakingRating, setDecisionMakingRating] = useState(5);
    const [feelAndTouchRating, setFeelAndTouchRating] = useState(5);
    const [roundFocusRating, setRoundFocusRating] = useState(5);
    const [adversityRating, setAdversityRating] = useState(5);

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
        navigation.navigate('SessionFeedback', {
            ...route.params,
            roundReflection: {
                selectedOptions,
                adaptationRating,
                decisionMakingRating,
                feelAndTouchRating,
                roundFocusRating,
                adversityRating
            }
        });
    };

    const reflectionOptions = [
        {
            id: 'improving',
            title: 'Do you feel like you\'re improving?',
            description: 'Rate your overall progress'
        },
        {
            id: 'preparation',
            title: 'Are you proud of your preparation?',
            description: 'Evaluate your pre-round readiness'
        },
        {
            id: 'badShot',
            title: 'When you had a bad shot, do you know why?',
            description: 'Assess your shot analysis'
        },
        {
            id: 'calm',
            title: 'Did you feel calm?',
            description: 'Rate your emotional state'
        },
        {
            id: 'clutch',
            title: 'Did you perform well in clutch moments?',
            description: 'Evaluate pressure situations'
        },
        {
            id: 'confident',
            title: 'Were you confident?',
            description: 'Assess your self-belief'
        },
        {
            id: 'equipment',
            title: 'Do you feel your equipment is optimal?',
            description: 'Evaluate your gear setup'
        },
        {
            id: 'intimidated',
            title: 'Were you intimidated?',
            description: 'Rate your comfort level'
        },
        {
            id: 'awareness',
            title: 'Were you actually aware of details on the course?',
            description: 'Assess your course management'
        }
    ];

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
                    <StyledText className="text-white text-xl font-semibold">Round Reflection</StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Scrollable Content */}
                <ScrollView 
                    className="flex-1 px-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {/* Sliders Section */}
                    <StyledView className="mb-6">
                        <StyledText className="text-white text-xl font-semibold mb-4">Rate Your Performance</StyledText>
                        {renderSlider('Rate your adaptation', adaptationRating, setAdaptationRating)}
                        {renderSlider('Rate your decision making', decisionMakingRating, setDecisionMakingRating)}
                        {renderSlider('Rate your feel and touch', feelAndTouchRating, setFeelAndTouchRating)}
                        {renderSlider('Round focus', roundFocusRating, setRoundFocusRating)}
                        {renderSlider('How did you handle adversity during the round?', adversityRating, setAdversityRating)}
                    </StyledView>

                    {/* Clickable Options Section */}
                    <StyledView>
                        <StyledText className="text-white text-xl font-semibold mb-4">Reflection Questions</StyledText>
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

export default RoundReflection; 