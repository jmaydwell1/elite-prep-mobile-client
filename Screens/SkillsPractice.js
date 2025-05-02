import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SkillsPractice = ({ navigation, route }) => {
    const location = route.params?.location || 'indoor';
    const practiceType = route.params?.type || 'intentional';
    const [selectedShotTypes, setSelectedShotTypes] = useState([]);

    const handleShotTypeSelect = (shotType) => {
        setSelectedShotTypes(prev => {
            if (prev.includes(shotType)) {
                return prev.filter(type => type !== shotType);
            } else {
                return [...prev, shotType];
            }
        });
    };

    const handleNext = () => {
        if (selectedShotTypes.length > 0) {
            // Navigate to the first selected shot type's reflection screen
            const firstShotType = selectedShotTypes[0];
            const remainingShotTypes = selectedShotTypes.slice(1);
            
            let nextScreen = '';
            switch (firstShotType) {
                case 'tee':
                    nextScreen = 'TeeShotsReflection';
                    break;
                case 'approach':
                    nextScreen = 'ApproachShotsReflection';
                    break;
                case 'short':
                    nextScreen = 'ShortGameReflection';
                    break;
                case 'putting':
                    nextScreen = 'PuttingReflection';
                    break;
            }

            navigation.navigate(nextScreen, {
                type: practiceType,
                location,
                shotTypes: remainingShotTypes, // Pass remaining shot types to be handled in reflection screens
                currentShotType: firstShotType
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
                    <StyledText className="text-white text-xl font-semibold">Skills Practice</StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Shot Type Options */}
                <StyledView className="flex-1 justify-center space-y-6">
                    {/* Tee Shots Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleShotTypeSelect('tee')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedShotTypes.includes('tee') ? 'border-2 border-[#58C5C7]' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Tee Shots</StyledText>
                                <StyledText className="text-gray-400">Driving and tee box shots</StyledText>
                            </StyledView>
                        </StyledView>
                        {selectedShotTypes.includes('tee') && (
                            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                        )}
                    </StyledTouchableOpacity>

                    {/* Approach Shots Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleShotTypeSelect('approach')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedShotTypes.includes('approach') ? 'border-2 border-[#58C5C7]' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Approach Shots</StyledText>
                                <StyledText className="text-gray-400">Fairway and approach shots</StyledText>
                            </StyledView>
                        </StyledView>
                        {selectedShotTypes.includes('approach') && (
                            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                        )}
                    </StyledTouchableOpacity>

                    {/* Short Game Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleShotTypeSelect('short')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedShotTypes.includes('short') ? 'border-2 border-[#58C5C7]' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Short Game</StyledText>
                                <StyledText className="text-gray-400">Chipping and pitching</StyledText>
                            </StyledView>
                        </StyledView>
                        {selectedShotTypes.includes('short') && (
                            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                        )}
                    </StyledTouchableOpacity>

                    {/* Putting Option */}
                    <StyledTouchableOpacity
                        onPress={() => handleShotTypeSelect('putting')}
                        className={`bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between ${
                            selectedShotTypes.includes('putting') ? 'border-2 border-[#58C5C7]' : ''
                        }`}
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Putting</StyledText>
                                <StyledText className="text-gray-400">Green and putting practice</StyledText>
                            </StyledView>
                        </StyledView>
                        {selectedShotTypes.includes('putting') && (
                            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                        )}
                    </StyledTouchableOpacity>
                </StyledView>

                {/* Next Button */}
                <StyledTouchableOpacity
                    className={`h-[50px] rounded-full overflow-hidden mb-5 ${
                        selectedShotTypes.length === 0 ? 'opacity-50' : ''
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

export default SkillsPractice; 