import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SessionFeedback = ({ navigation }) => {
    const [sessionQuality, setSessionQuality] = useState(5);
    const [focusLevel, setFocusLevel] = useState(5);
    const [goalProgress, setGoalProgress] = useState(5);

    const renderSlider = (label, value, onValueChange) => (
        <StyledView className="mb-8">
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
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <ScrollView className="flex-1">
                <StyledView className="px-5">
                    {/* Header */}
                    <StyledView className="flex-row items-center justify-between py-4">
                        <StyledTouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="w-10 h-10 items-center justify-center"
                        >
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-white text-xl font-semibold">Session Feedback</StyledText>
                        <StyledView className="w-10" />
                    </StyledView>

                    {/* Sliders Section */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mt-4">
                        {renderSlider('Overall Session Quality', sessionQuality, setSessionQuality)}
                        {renderSlider('Focus Level', focusLevel, setFocusLevel)}
                        {renderSlider('Did this session move you closer to your ultimate goal?', goalProgress, setGoalProgress)}
                    </StyledView>

                    {/* Submit Button */}
                    <StyledTouchableOpacity
                        className="h-[50px] rounded-full overflow-hidden mt-8"
                        onPress={() => {
                            // Handle submission
                            navigation.navigate('Takeaway');
                        }}
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default SessionFeedback; 