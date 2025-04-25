import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProgressIcon1 from '../assets/progress_icon1.png';
import { userService } from '../api';
import { useOnboarding } from '../context/OnboardingContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Create = () => {
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const { updateOnboardingData } = useOnboarding();

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        if (!createEmail) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(createEmail)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!createPassword) {
            newErrors.password = 'Password is required';
        } else if (createPassword.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        Keyboard.dismiss();

        try {
            const response = await userService.register({
                email: createEmail,
                password: createPassword
            });

            // Store email in onboarding context
            updateOnboardingData({
                email: createEmail
            });

            // Registration successful
            Alert.alert(
                'Success',
                'Registration successful!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('UserProfile')
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', error.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView 
                    className="flex-1"
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
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
                                source={ProgressIcon1} 
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                            <StyledView className="w-8" />
                        </StyledView>
                        
                        <StyledView className="flex-row items-center mb-6 -mt-8">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Create Account</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledView className="mb-4">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    Email
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your email"
                                    placeholderTextColor="#FFFFFF"
                                    value={createEmail}
                                    onChangeText={setCreateEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {errors.email && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.email}</StyledText>
                                )}
                            </StyledView>

                            <StyledView className="mb-6">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    Password
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter a password"
                                    placeholderTextColor="#FFFFFF"
                                    value={createPassword}
                                    onChangeText={setCreatePassword}
                                    secureTextEntry
                                />
                                {errors.password && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.password}</StyledText>
                                )}
                            </StyledView>

                            <StyledTouchableOpacity
                                className="h-[50px] rounded-full overflow-hidden mb-5"
                                onPress={handleRegister}
                                disabled={isLoading}
                            >
                                <LinearGradient
                                    colors={['#58C5C7', '#5996C8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="flex-1 justify-center items-center"
                                >
                                    <StyledText className="text-white text-base font-semibold">
                                        {isLoading ? 'Creating Account...' : 'Next'}
                                    </StyledText>
                                </LinearGradient>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Create;