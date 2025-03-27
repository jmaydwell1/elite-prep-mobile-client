import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const StartPractice = ({ navigation }) => {
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
                    <StyledText className="text-white text-xl font-semibold">Start Practice</StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Practice Options */}
                <StyledView className="flex-1 justify-center space-y-6">
                    {/* Physical Practice */}
                    <StyledTouchableOpacity
                        onPress={() => navigation.navigate('PhysicalPractice')}
                        className="bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between"
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Physical Practice</StyledText>
                                <StyledText className="text-gray-400">On-course or range practice</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>

                    {/* Mental Practice */}
                    <StyledTouchableOpacity
                        onPress={() => navigation.navigate('MentalPractice')}
                        className="bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between"
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Mental Practice</StyledText>
                                <StyledText className="text-gray-400">Visualization and mental training</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
};

export default StartPractice; 