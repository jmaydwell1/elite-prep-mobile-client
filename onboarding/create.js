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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProgressIcon1 from '../assets/progress_icon1.png';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Create = () => {
    const [createEmail, setCreateEmail] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // TODO: Implement login logic
        console.log('Next pressed:', { createEmail, createPassword });
        Keyboard.dismiss();
        navigation.navigate('UserProfile');
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
                                />
                            </StyledView>

                            <StyledTouchableOpacity
                                className="h-[50px] rounded-full overflow-hidden mb-5"
                                onPress={handleLogin}
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
    );
}

export default Create;