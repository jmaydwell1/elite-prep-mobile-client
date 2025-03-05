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
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressIcon3 from '../assets/progress_icon3.png';
import GolfIcon from '../assets/Golf.png';
import BasketballIcon from '../assets/Basketball.png';
import TennisIcon from '../assets/Tennis.png';
import SwimmingIcon from '../assets/Swimming.png';
import RunningIcon from '../assets/Running.png';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SportsSelection = () => {
    const navigation = useNavigation();
    const [sport, setSport] = useState('');

    const handleNext = () => {
        // TODO: Implement login logic
        console.log('Next pressed:', { sport });
        Keyboard.dismiss();
        navigation.navigate('Notifications');
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
                    <StyledView className="flex-1 px-5 -mt-8">
                        <StyledView className="flex-row items-center justify-between">
                            <StyledTouchableOpacity 
                                onPress={() => navigation.goBack()}
                                className="mr-4"
                            >
                                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                            </StyledTouchableOpacity>
                            <Image 
                                source={ProgressIcon3} 
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                            <StyledView className="w-8" />
                        </StyledView>
                        
                        <StyledView className="flex-row items-center mb-6 -mt-10">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Choose your sport</StyledText>
                        </StyledView>

                        <StyledView className="w-full">

                            <StyledTouchableOpacity 
                                className={`h-[90px] rounded-lg ${sport === 'Golf' ? 'bg-[#58C5C7]' : 'bg-[#3C4245]'} mb-2`}
                                onPress={() => setSport('Golf')}
                            >
                                <StyledView className="flex-1 flex-row items-center">
                                    <Image 
                                        source={GolfIcon} 
                                        className="w-16 h-16 ml-6"
                                        resizeMode="contain"
                                    />
                                    <StyledView className="flex-1 flex-row items-center justify-between px-16">
                                        <StyledText className="text-white text-2xl font-normal">
                                            Golf
                                        </StyledText>

                                        {sport === 'Golf' && (
                                            <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                                        )}
                                    </StyledView>
                                    
                                </StyledView>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity className="h-[90px] rounded-lg bg-[#3C4245] mb-2">
                                <StyledView className="flex-1 flex-row items-center">
                                    <Image 
                                        source={RunningIcon} 
                                        className="w-16 h-16 ml-6"
                                        resizeMode="contain"
                                    />
                                    <StyledView className="flex-1 px-16">
                                        <StyledText className="text-white text-2xl font-normal">
                                            Running
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity className="h-[90px] rounded-lg bg-[#3C4245] mb-2">
                                <StyledView className="flex-1 flex-row items-center">
                                    <Image 
                                        source={BasketballIcon} 
                                        className="w-16 h-16 ml-6"
                                        resizeMode="contain"
                                    />
                                    <StyledView className="flex-1 px-16">
                                        <StyledText className="text-white text-2xl font-normal">
                                            Basketball
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity className="h-[90px] rounded-lg bg-[#3C4245] mb-2">
                                <StyledView className="flex-1 flex-row items-center">
                                    <Image 
                                        source={TennisIcon} 
                                        className="w-16 h-16 ml-6"
                                        resizeMode="contain"
                                    />
                                    <StyledView className="flex-1 px-16">
                                        <StyledText className="text-white text-2xl font-normal">
                                            Tennis
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledTouchableOpacity>

                            <StyledTouchableOpacity className="h-[90px] rounded-lg bg-[#3C4245] mb-5">
                                <StyledView className="flex-1 flex-row items-center">
                                    <Image 
                                        source={SwimmingIcon} 
                                        className="w-16 h-16 ml-6"
                                        resizeMode="contain"
                                    />
                                    <StyledView className="flex-1 px-16">
                                        <StyledText className="text-white text-2xl font-normal">
                                            Swimming
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledTouchableOpacity>

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

export default SportsSelection;


