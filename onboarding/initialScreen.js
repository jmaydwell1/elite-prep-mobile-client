import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import mailIcon from '../assets/mail_icon.png';
import googleIcon from '../assets/google_icon.png';
import appleIcon from '../assets/apple_icon.png';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const InitialScreen = () => {
    const navigation = useNavigation();
    

    return(
        <StyledView className="flex-1 bg-[#1C1C1D]">
            <StyledView className="flex-1 items-center justify-start pt-10">
                <Image 
                    source={require('../assets/logo.png')} 
                    className="w-80 h-80"
                    resizeMode="contain"
                />
                <StyledView className="w-full px-5">
                    <StyledTouchableOpacity 
                        className="h-[50px] bg-[#FFFFFF] rounded-full px-4 py-2 mb-5 items-center"
                        activeOpacity={0.3}
                    >
                        <StyledView className="absolute left-4 top-[30%] -translate-y-1/2">
                            <Image source={appleIcon} className="w-6 h-6" />
                        </StyledView>
                        <StyledText className="text-black text-lg font-semibold">
                            Sign up with Apple
                        </StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity 
                        className="h-[50px] border border-[#FFFFFF] rounded-full px-4 py-2 mb-5 items-center" 
                        activeOpacity={0.3}
                    >
                        <StyledView className="absolute left-4 top-[30%] -translate-y-1/2">
                            <Image source={googleIcon} className="w-6 h-6" />
                        </StyledView>
                        <StyledText className="text-white text-lg font-semibold">
                            Sign up with Google
                        </StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity className="h-[50px] bg-[#89898A] rounded-full px-4 py-2 items-center" onPress={() => navigation.navigate('Create')}>
                        <StyledView className="absolute left-4 top-[30%] -translate-y-1/2">
                            <Image source={mailIcon} className="w-6 h-6" />
                        </StyledView>
                        <StyledText className="text-white text-lg font-semibold">
                            Email and Password
                        </StyledText>
                    </StyledTouchableOpacity>
                    <StyledView className="w-full items-center mt-4">
                        <StyledText className="text-[#A9A9A9] text-sm text-center">
                            Please review our{' '}
                            <StyledText className="underline">Terms</StyledText>
                            {' '}and confirm you've read our{' '}
                            <StyledText className="underline">Privacy Policy</StyledText>
                            {' '}when signing up.
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
            <StyledView className="w-full px-5 pb-8">
                <StyledView className="flex-row justify-center items-center">
                    <StyledText className="text-[#A9A9A9] text-sm">
                        Already have an account?{' '}
                    </StyledText>
                    <StyledTouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <StyledText className="text-[#1DB2DF] text-sm font-semibold">
                            Login
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}

export default InitialScreen;