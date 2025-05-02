import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Settings = ({ navigation }) => {
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
                    <StyledText className="text-white text-xl font-semibold">Settings</StyledText>
                    <StyledView className="w-10" />
                </StyledView>

                {/* Practice Location Options */}
                <StyledView className="flex-1 justify-center space-y-6">
                    {/* Indoor Option */}
                    <StyledTouchableOpacity
                        onPress={() => navigation.navigate('PracticeType', { location: 'indoor' })}
                        className="bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between"
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Indoor Practice</StyledText>
                                <StyledText className="text-gray-400">Range or indoor facility</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>

                    {/* Outdoor Option */}
                    <StyledTouchableOpacity
                        onPress={() => navigation.navigate('PracticeType', { location: 'outdoor' })}
                        className="bg-[#2D2D2E] rounded-xl p-6 flex-row items-center justify-between"
                    >
                        <StyledView className="flex-row items-center space-x-4">
                            <StyledView>
                                <StyledText className="text-white text-lg font-semibold">Outdoor Practice</StyledText>
                                <StyledText className="text-gray-400">On-course or outdoor range</StyledText>
                            </StyledView>
                        </StyledView>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
};

export default Settings; 