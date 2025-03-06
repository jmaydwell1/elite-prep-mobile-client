import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
    Keyboard,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressIcon6 from '../assets/progress_icon6.png';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const GoalSetting = () => {
    const [goalOne, setGoalOne] = useState('');
    const [goalTwo, setGoalTwo] = useState('');
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);

    const handleNext = () => {
        // TODO: Implement login logic
        console.log('Next pressed:', { goalOne, goalTwo });
        Keyboard.dismiss();
        navigation.navigate('BaselineReminder');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView
                    className="flex-1"
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    ref={scrollViewRef}
                >
                    <StyledView className="flex-1 px-5 -mt-12">
                        <StyledView className="flex-row items-center justify-between">
                            <StyledTouchableOpacity
                                onPress={() => navigation.goBack()}
                                className="mr-4"
                            >
                                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                            </StyledTouchableOpacity>
                            <Image
                                source={ProgressIcon6}
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                            <StyledView className="w-8" />
                        </StyledView>

                        <StyledView className="flex-row items-center mb-6 -mt-10">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Set Your Goals</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledView className="mb-8">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    SET YOUR INTENTION FOR THE NEXT EVENT
                                </StyledText>
                                <StyledTextInput
                                    className="h-[150px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your goals (max 250 characters)"
                                    placeholderTextColor="#FFFFFF"
                                    value={goalOne}
                                    onChangeText={(text) => {
                                        if (text.length <= 250) {
                                            setGoalOne(text);
                                        }
                                    }}
                                    multiline
                                    textAlignVertical="top"
                                    numberOfLines={6}
                                    onFocus={() => {
                                        setTimeout(() => {
                                            scrollViewRef.current?.scrollTo({
                                                y: 150,
                                                animated: true
                                            });
                                        }, 100);
                                    }}
                                />
                                <StyledText className="text-sm text-[#89898A] text-right mt-1">
                                    {goalOne.length}/250
                                </StyledText>
                            </StyledView>

                            <StyledView className="mb-8">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    WHAT ARE YOU WORKING TOWARDS IN THE NEXT 1-5 YEARS? DREAM BIG!
                                </StyledText>
                                <StyledTextInput
                                    className="h-[150px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your goals (max 250 characters)"
                                    placeholderTextColor="#FFFFFF"
                                    value={goalTwo}
                                    onChangeText={(text) => {
                                        if (text.length <= 250) {
                                            setGoalTwo(text);
                                        }
                                    }}
                                    multiline
                                    textAlignVertical="top"
                                    numberOfLines={6}
                                    onFocus={() => {
                                        setTimeout(() => {
                                            scrollViewRef.current?.scrollTo({
                                                y: 300,
                                                animated: true
                                            });
                                        }, 100);
                                    }}
                                />
                                <StyledText className="text-sm text-[#89898A] text-right mt-1">
                                    {goalTwo.length}/250
                                </StyledText>
                            </StyledView>

                            

                            <StyledTouchableOpacity
                                className="h-[50px] rounded-full overflow-hidden mb-5"
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
                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default GoalSetting;

