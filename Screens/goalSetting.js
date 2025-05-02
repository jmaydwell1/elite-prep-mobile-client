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
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressIcon6 from '../assets/progress_icon6.png';
import { userService } from '../api';
import { useOnboarding } from '../context/OnboardingContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const GoalSetting = () => {
    const [goalOne, setGoalOne] = useState('');
    const [goalTwo, setGoalTwo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);
    const { onboardingData, updateOnboardingData } = useOnboarding();

    const validateForm = () => {
        const newErrors = {};
        
        if (!goalOne.trim()) {
            newErrors.goalOne = 'Short-term goal is required';
        }
        if (!goalTwo.trim()) {
            newErrors.goalTwo = 'Long-term goal is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateOnboardingData = () => {
        const requiredFields = [
            'email',
            'name',
            'birthdate',
            'gender',
            'city',
            'state',
            'sport',
            'athletic_status',
            'handicap'
        ];

        const missingFields = requiredFields.filter(field => {
            if (field === 'sport') {
                return !onboardingData[field] || onboardingData[field].length === 0;
            }
            return !onboardingData[field];
        });

        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            return false;
        }

        return true;
    };

    const handleNext = async () => {
        if (!validateForm()) return;
        if (!validateOnboardingData()) {
            Alert.alert(
                'Error',
                'Please complete all previous steps before setting goals.'
            );
            return;
        }

        setIsLoading(true);
        Keyboard.dismiss();

        try {
            // Update the onboarding context with goals
            updateOnboardingData({
                expectation: goalOne,
                goal: goalTwo
            });

            // Prepare the data for API
            const apiData = {
                ...onboardingData,
                expectation: goalOne,
                goal: goalTwo
            };

            // Debug log to see what we're sending
            console.log('Sending onboarding data:', JSON.stringify(apiData, null, 2));

            // Call the onboarding API with all collected data
            const response = await userService.updateOnboarding(apiData);

            // Onboarding successful
            Alert.alert(
                'Success',
                'Your profile has been saved!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('BaselineReminder')
                    }
                ]
            );
        } catch (error) {
            console.error('Onboarding API Error:', error);
            console.error('Error response:', error.response?.data);
            
            // Handle specific error cases
            if (error.response?.status === 422) {
                const validationErrors = error.response.data.detail;
                if (Array.isArray(validationErrors)) {
                    const errorMessages = validationErrors.map(err => err.msg).join('\n');
                    Alert.alert('Validation Error', errorMessages);
                } else {
                    Alert.alert('Validation Error', 'Please check your input and try again.');
                }
            } else {
                Alert.alert(
                    'Error', 
                    error.response?.data?.detail || 'Failed to save your profile. Please try again.'
                );
            }
        } finally {
            setIsLoading(false);
        }
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
                                {errors.goalOne && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.goalOne}</StyledText>
                                )}
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
                                {errors.goalTwo && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.goalTwo}</StyledText>
                                )}
                            </StyledView>

                            <StyledTouchableOpacity
                                className="h-[50px] rounded-full overflow-hidden mb-5"
                                onPress={handleNext}
                                disabled={isLoading}
                            >
                                <LinearGradient
                                    colors={['#58C5C7', '#5996C8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="flex-1 justify-center items-center"
                                >
                                    <StyledText className="text-white text-base font-semibold">
                                        {isLoading ? 'Saving...' : 'Next'}
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

