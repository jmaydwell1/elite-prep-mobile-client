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
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import notificationIcon from '../assets/notifications_icon.png';
import * as Notifications from 'expo-notifications';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const NotificationsScreen = () => {
    const navigation = useNavigation();

    const handleNext = async () => {
        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }

            // Get the token that uniquely identifies this device
            const token = await Notifications.getExpoPushTokenAsync();
            console.log('Push token:', token);
            
            // TODO: Send this token to your backend server
            
            Keyboard.dismiss();
            // Navigate to next screen after successful notification setup
            navigation.navigate('Home'); // Replace 'Home' with your next screen name
        } catch (error) {
            console.error('Error setting up notifications:', error);
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
                    <StyledView className="flex-1 px-5 mt-14">
                        <StyledView className="flex-row items-center justify-center mb-6">
                            <StyledText className="w-52 text-[#9BBBC6] text-center text-4xl font-light">Stay on Track, Stay Ahead</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledText className=" text-[#A9A9A9] text-center text-base font-medium mb-5">
                                Consistency is key to progress. Enable notifications, and we'll remind you when it's
                                time for your weekly check-in -- Helping you track improvements, adjust your plan, and stay in
                                peak conditiion.
                            </StyledText>

                            <StyledView className="flex-row items-center justify-center mb-2">
                                <Image source={notificationIcon} className="w-60 h-60" />
                            </StyledView>

                            <StyledText className=" text-white text-center text-base font-bold mb-6">
                                A quick nudge otday keeps your performing at your best tomorrow.
                            </StyledText>

                            <StyledTouchableOpacity
                                className="h-[50px] rounded-full overflow-hidden mb-10"
                                onPress={() => navigation.navigate('TournamentDetails')}
                            >
                                <LinearGradient
                                    colors={['#58C5C7', '#5996C8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="flex-1 justify-center items-center"
                                >
                                    <StyledText className="text-white text-base font-semibold">
                                        Turn on notifications
                                    </StyledText>
                                </LinearGradient>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity onPress={() => navigation.navigate('TournamentDetails')}>
                                <StyledText className="text-[#1DB2DF] text-sm font-semibold text-center">
                                    Not now
                                </StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

export default NotificationsScreen;