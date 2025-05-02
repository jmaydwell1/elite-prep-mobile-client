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
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProgressIcon5 from '../assets/progress_icon5.png';
import { useOnboarding } from '../context/OnboardingContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const athleticStatusOptions = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

const AthleticStatus = () => {
    const [athleticStatus, setAthleticStatus] = useState('');
    const [showAthleticStatusPicker, setShowAthleticStatusPicker] = useState(false);
    const [handicap, setHandicap] = useState('');
    const [showHandicapPicker, setShowHandicapPicker] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const { updateOnboardingData } = useOnboarding();

    const handleAthleticStatusSelect = (selectedAthleticStatus) => {
        setAthleticStatus(selectedAthleticStatus);
        setShowAthleticStatusPicker(false);
    };

    const handleHandicapSelect = (selectedHandicap) => {
        setHandicap(selectedHandicap);
        setShowHandicapPicker(false);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!athleticStatus) {
            newErrors.athleticStatus = 'Please select your athletic status';
        }
        if (!handicap) {
            newErrors.handicap = 'Please select your handicap';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateForm()) return;

        // Update onboarding context with athletic status and handicap
        updateOnboardingData({
            athletic_status: athleticStatus,
            handicap: parseInt(handicap, 10) // Convert to integer for API
        });

        Keyboard.dismiss();
        navigation.navigate('GoalSetting');
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
                                source={ProgressIcon5}
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                            <StyledView className="w-8" />
                        </StyledView>

                        <StyledView className="flex-row items-center mb-6 -mt-10">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Your Athletic Status</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    Athletic Status
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => setShowAthleticStatusPicker(true)}
                                    className="h-[50px] rounded-lg px-4 justify-center bg-[#2D2D2E]"
                                >
                                    <StyledText className="text-white text-base">
                                        {athleticStatus || "Select Athletic Status"}
                                    </StyledText>
                                </StyledTouchableOpacity>
                                {errors.athleticStatus && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.athleticStatus}</StyledText>
                                )}
                            </StyledView>

                            <Modal
                                visible={showAthleticStatusPicker}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={() => setShowAthleticStatusPicker(false)}
                            >
                                <StyledTouchableOpacity
                                    className="flex-1 bg-black/75 justify-center items-center"
                                    activeOpacity={1}
                                    onPress={() => setShowAthleticStatusPicker(false)}
                                >
                                    <StyledView className="w-[90%] bg-[#2D2D2E] rounded-lg p-4">
                                        <StyledText className="text-white text-lg mb-4">Select Athletic Status</StyledText>
                                        {athleticStatusOptions.map((status, index) => (
                                            <StyledTouchableOpacity
                                                key={index}
                                                onPress={() => handleAthleticStatusSelect(status)}
                                                className="py-4 border-b border-[#3D3D3E]"
                                            >
                                                <StyledText className="text-white text-base">{status}</StyledText>
                                            </StyledTouchableOpacity>
                                        ))}
                                    </StyledView>
                                </StyledTouchableOpacity>
                            </Modal>

                            <StyledView className="mb-10">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    YOUR HANDICAP
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => setShowHandicapPicker(true)}
                                    className="h-[50px] rounded-lg px-4 justify-center bg-[#2D2D2E]"
                                >
                                    <StyledText className="text-white text-base">
                                        {handicap || "Select Handicap"}
                                    </StyledText>
                                </StyledTouchableOpacity>
                                {errors.handicap && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.handicap}</StyledText>
                                )}
                            </StyledView>

                            <Modal
                                visible={showHandicapPicker}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={() => setShowHandicapPicker(false)}
                            >
                                <StyledTouchableOpacity
                                    className="flex-1 bg-black/75 justify-center items-center"
                                    activeOpacity={1}
                                    onPress={() => setShowHandicapPicker(false)}
                                >
                                    <StyledView className="w-[90%] bg-[#2D2D2E] rounded-lg p-4">
                                        <StyledText className="text-white text-lg mb-4">Select Handicap</StyledText>
                                        <ScrollView className="max-h-[400px]">
                                            {Array.from({ length: 55 }, (_, i) => i).map((num) => (
                                                <StyledTouchableOpacity
                                                    key={num}
                                                    onPress={() => handleHandicapSelect(num.toString())}
                                                    className="py-4 border-b border-[#3D3D3E]"
                                                >
                                                    <StyledText className="text-white text-base">{num}</StyledText>
                                                </StyledTouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </StyledView>
                                </StyledTouchableOpacity>
                            </Modal>

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
export default AthleticStatus;

