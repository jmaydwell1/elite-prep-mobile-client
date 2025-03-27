import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PracticeType = ({ navigation, route }) => {
    const location = route.params?.location || 'indoor';
    const [selectedType, setSelectedType] = useState('');

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        if (type === 'play') {
            navigation.navigate('RoundReflection', {
                type,
                location
            });
        } else {
            navigation.navigate('SkillsPractice', {
                type,
                location
            });
        }
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
                    <StyledText className="text-white text-xl font-semibold">
                        {location === 'indoor' ? 'Indoor Practice Type' : 'Outdoor Practice Type'}
                    </StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Practice Type Options */}
                <StyledView className="flex-1 justify-center space-y-6">
                    {/* Play Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleTypeSelect('play')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedType === 'play' ? 'border-2 border-yellow-500' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Play</StyledText>
                                <StyledText className="text-gray-400">Casual rounds or games</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>

                    {/* Intentional Practice Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleTypeSelect('intentional')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedType === 'intentional' ? 'border-2 border-yellow-500' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Intentional Practice</StyledText>
                                <StyledText className="text-gray-400">Focused skill development</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>

                    {/* Casual Practice Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleTypeSelect('casual')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedType === 'casual' ? 'border-2 border-yellow-500' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Casual Practice</StyledText>
                                <StyledText className="text-gray-400">Relaxed practice sessions</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>

                    {/* Equipment Sessions Option */}
                    <StyledTouchableOpacity
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedType === 'equipment' ? 'border-2 border-yellow-500' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Equipment Sessions</StyledText>
                                <StyledText className="text-gray-400">Training with specific equipment</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
};

export default PracticeType; 