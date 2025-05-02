import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingActionButton from '../components/FloatingActionButton';
import { userService } from '../api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const NavigationBar = ({ navigation }) => (
    <StyledView className="absolute bottom-0 left-0 right-0 bg-[#1C1C1D] flex-row justify-around py-4 px-5 border-t border-[#2D2D2E]">
        <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={24} color="#89898A" />
            <StyledText className="text-[#89898A] mt-1">Home</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Performance')}>
            <Ionicons name="stats-chart" size={24} color="#89898A" />
            <StyledText className="text-[#89898A] mt-1">Performance</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Journal')}>
            <Ionicons name="journal" size={24} color="white" />
            <StyledText className="text-white mt-1">Journaling</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="items-center">
            <Ionicons name="time" size={24} color="#89898A" />
            <StyledText className="text-[#89898A] mt-1">History</StyledText>
        </StyledTouchableOpacity>
    </StyledView>
);

const PerformanceAnxiety = ({ navigation }) => {
    const [userInput, setUserInput] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        try {
            const response = await userService.generate(userInput);
            setAiResponse(response.data.formatted_response || response.data.response || 'No response received');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert(
                'Error',
                'Failed to get AI response. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 bg-[#1C1C1D]"
            >
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
                            <StyledText className="text-white text-xl font-semibold">AI Psychology Coach</StyledText>
                            <StyledView className="w-10" />
                        </StyledView>

                        {/* AI Response */}
                        {aiResponse ? (
                            <StyledView className="bg-[#2D2D2E] rounded-xl p-4 mb-4">
                                <StyledText className="text-white text-base">{aiResponse}</StyledText>
                            </StyledView>
                        ) : null}

                        {/* User Input */}
                        <StyledView className="mt-4">
                            <StyledTextInput
                                className="h-32 bg-[#2D2D2E] rounded-xl p-4 text-white text-base"
                                placeholder="Share your thoughts and feelings about performance anxiety..."
                                placeholderTextColor="#89898A"
                                multiline
                                value={userInput}
                                onChangeText={setUserInput}
                                textAlignVertical="top"
                            />
                            <StyledTouchableOpacity
                                className="h-[50px] rounded-full overflow-hidden mt-4"
                                onPress={handleSubmit}
                                disabled={isLoading}
                            >
                                <LinearGradient
                                    colors={['#58C5C7', '#5996C8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="flex-1 justify-center items-center"
                                >
                                    <StyledText className="text-white text-base font-semibold">
                                        {isLoading ? 'Thinking...' : 'Send'}
                                    </StyledText>
                                </LinearGradient>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
            <NavigationBar navigation={navigation} />
            <FloatingActionButton navigation={navigation} />
        </SafeAreaView>
    );
};

export default PerformanceAnxiety; 