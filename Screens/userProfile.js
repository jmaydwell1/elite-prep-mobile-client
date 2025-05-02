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
import ProgressIcon2 from '../assets/progress_icon2.png';
import { useOnboarding } from '../context/OnboardingContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const UserProfile = () => {
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState(new Date());
    const [gender, setGender] = useState('');
    const [showGenderPicker, setShowGenderPicker] = useState(false);
    const [state, setState] = useState('');
    const [showStatePicker, setShowStatePicker] = useState(false);
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const { updateOnboardingData } = useOnboarding();

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setTempDate(selectedDate);
        }
    };

    const handleDateConfirm = () => {
        setBirthdate(tempDate);
        setShowDatePicker(false);
    };

    const handleDateCancel = () => {
        setTempDate(birthdate);
        setShowDatePicker(false);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setShowGenderPicker(false);
    };

    const handleStateSelect = (selectedState) => {
        setState(selectedState);
        setShowStatePicker(false);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!gender) {
            newErrors.gender = 'Gender is required';
        }
        if (!state) {
            newErrors.state = 'State is required';
        }
        if (!city.trim()) {
            newErrors.city = 'City is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateForm()) return;

        // Update onboarding context with user profile data
        updateOnboardingData({
            name,
            birthdate: birthdate.toISOString(),
            gender,
            state,
            city
        });

        Keyboard.dismiss();
        navigation.navigate('SportsSelection');
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
                                source={ProgressIcon2} 
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                            <StyledView className="w-8" />
                        </StyledView>
                        
                        <StyledView className="flex-row items-center mb-6 -mt-10">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Your Profile</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    YOUR NAME
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#FFFFFF"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                                {errors.name && (
                                    <StyledText className="text-red-500 text-sm mt-1">{errors.name}</StyledText>
                                )}
                            </StyledView>

                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    BIRTHDATE
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => {
                                        setTempDate(birthdate);
                                        setShowDatePicker(true);
                                    }}
                                    className="h-[50px] rounded-lg px-4 justify-center bg-[#2D2D2E]"
                                >
                                    <StyledText className="text-white text-base">
                                        {formatDate(birthdate)}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <Modal
                                visible={showDatePicker}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={handleDateCancel}
                            >
                                <StyledView
                                    className="flex-1 bg-black/75 justify-center items-center"
                                >
                                    <StyledView className="w-[90%] bg-[#2D2D2E] rounded-lg p-4">
                                        <DateTimePicker
                                            value={tempDate}
                                            mode="date"
                                            display="spinner"
                                            onChange={handleDateChange}
                                            maximumDate={new Date()}
                                            textColor="#FFFFFF"
                                        />
                                        <StyledView className="flex-row justify-between mt-4">
                                            <StyledTouchableOpacity
                                                onPress={handleDateCancel}
                                                className="px-8 py-2 mr-2"
                                            >
                                                <StyledText className="text-base text-[#9BBBC6]">Cancel</StyledText>
                                            </StyledTouchableOpacity>
                                            <StyledTouchableOpacity
                                                onPress={handleDateConfirm}
                                                className="px-8 py-2"
                                            >
                                                <StyledText className="text-white text-base font-semibold">OK</StyledText>
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    </StyledView>
                                </StyledView>
                            </Modal>

                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    GENDER
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => setShowGenderPicker(true)}
                                    className="h-[50px] rounded-lg px-4 justify-center bg-[#2D2D2E]"
                                >
                                    <StyledText className="text-white text-base">
                                        {gender || "Select gender"}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <Modal
                                visible={showGenderPicker}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={() => setShowGenderPicker(false)}
                            >
                                <StyledTouchableOpacity 
                                    className="flex-1 bg-black/75 justify-center items-center"
                                    activeOpacity={1}
                                    onPress={() => setShowGenderPicker(false)}
                                >
                                    <StyledView className="w-[90%] bg-[#2D2D2E] rounded-lg p-4">
                                        <StyledText className="text-white text-lg mb-4">Select Gender</StyledText>
                                        <StyledTouchableOpacity
                                            onPress={() => handleGenderSelect('Male')}
                                            className="py-4 border-b border-[#3D3D3E]"
                                        >
                                            <StyledText className="text-white text-base">Male</StyledText>
                                        </StyledTouchableOpacity>
                                        <StyledTouchableOpacity
                                            onPress={() => handleGenderSelect('Female')}
                                            className="py-4"
                                        >
                                            <StyledText className="text-white text-base">Female</StyledText>
                                        </StyledTouchableOpacity>
                                    </StyledView>
                                </StyledTouchableOpacity>
                            </Modal>

                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    STATE
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => setShowStatePicker(true)}
                                    className="h-[50px] rounded-lg px-4 justify-center bg-[#2D2D2E]"
                                >
                                    <StyledText className="text-white text-base">
                                        {state || "Select state"}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <Modal
                                visible={showStatePicker}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={() => setShowStatePicker(false)}
                            >
                                <StyledTouchableOpacity 
                                    className="flex-1 bg-black/75 justify-center items-center"
                                    activeOpacity={1}
                                    onPress={() => setShowStatePicker(false)}
                                >
                                    <StyledView className="w-[90%] bg-[#2D2D2E] rounded-lg p-4">
                                        <StyledText className="text-white text-lg mb-4">Select State</StyledText>
                                        <ScrollView className="max-h-[400px]">
                                            {US_STATES.map((stateName, index) => (
                                                <StyledTouchableOpacity
                                                    key={stateName}
                                                    onPress={() => handleStateSelect(stateName)}
                                                    className={`py-4 ${index < US_STATES.length - 1 ? 'border-b border-[#3D3D3E]' : ''}`}
                                                >
                                                    <StyledText className="text-white text-base">{stateName}</StyledText>
                                                </StyledTouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </StyledView>
                                </StyledTouchableOpacity>
                            </Modal>

                            <StyledView className="mb-10">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    CITY
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your city"
                                    placeholderTextColor="#FFFFFF"
                                    value={city}
                                    onChangeText={setCity}
                                    autoCapitalize="words"
                                />
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
    );
}

export default UserProfile;