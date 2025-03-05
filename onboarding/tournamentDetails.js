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
import ProgressIcon4 from '../assets/progress_icon4.png';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const TournamentDetails = () => {
    const [milestone, setMilestone] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [tempDate, setTempDate] = useState(new Date());
    const [course, setCourse] = useState('');
    const [location, setLocation] = useState('');
    const navigation = useNavigation();

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setTempDate(selectedDate);
        }
    };

    const handleDateConfirm = () => {
        setDate(tempDate);
        setShowDatePicker(false);
    };

    const handleDateCancel = () => {
        setTempDate(date);
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleNext = () => {
        // TODO: Implement login logic
        console.log('Next pressed:', { milestone, date, course, location });
        Keyboard.dismiss();
        navigation.navigate('');
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
                                source={ProgressIcon4} 
                                className="w-48 h-48"
                                resizeMode="contain"
                            />
                            <StyledView className="w-8" />
                        </StyledView>
                        
                        <StyledView className="flex-row items-center mb-6 -mt-10">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Your Next Milestone</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    MILESTONE NAME (OPTIONAL)
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#FFFFFF"
                                    value={milestone}
                                    onChangeText={setMilestone}
                                    autoCapitalize="words"
                                />
                            </StyledView>

                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    MILESTONE DATE
                                </StyledText>
                                <StyledTouchableOpacity
                                    onPress={() => {
                                        setTempDate(date);
                                        setShowDatePicker(true);
                                    }}
                                    className="h-[50px] rounded-lg px-4 justify-center bg-[#2D2D2E]"
                                >
                                    <StyledText className="text-white text-base">
                                        {formatDate(date)}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>

                            <Modal
                                visible={showDatePicker}
                                transparent={true}
                                animationType="fade"
                                onRequestClose={handleDateCancel}
                            >
                                <StyledTouchableOpacity 
                                    className="flex-1 bg-black/75 justify-center items-center"
                                    activeOpacity={1}
                                    onPress={handleDateCancel}
                                >
                                    <StyledView className="w-[90%] bg-[#2D2D2E] rounded-lg p-4">
                                        <DateTimePicker
                                            value={tempDate}
                                            mode="date"
                                            display="spinner"
                                            onChange={handleDateChange}
                                            textColor="#FFFFFF"
                                            minimumDate={new Date()}
                                        />
                                        <StyledView className="flex-row justify-end mt-4">
                                            <StyledTouchableOpacity
                                                onPress={handleDateCancel}
                                                className="mr-4"
                                            >
                                                <StyledText className="text-[#9BBBC6] text-base font-semibold">
                                                    Cancel
                                                </StyledText>
                                            </StyledTouchableOpacity>
                                            <StyledTouchableOpacity
                                                onPress={handleDateConfirm}
                                            >
                                                <StyledText className="text-white text-base font-semibold">
                                                    OK
                                                </StyledText>
                                            </StyledTouchableOpacity>
                                        </StyledView>
                                    </StyledView>
                                </StyledTouchableOpacity>
                            </Modal>

                            <StyledView className="mb-2">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    COURSE NAME (OPTIONAL)
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#FFFFFF"
                                    value={course}
                                    onChangeText={setCourse}
                                    autoCapitalize="words"
                                />
                            </StyledView>

                            <StyledView className="mb-10">
                                <StyledText className="text-sm text-[#89898A] mb-2">
                                    LOCATION (OPTIONAL)
                                </StyledText>
                                <StyledTextInput
                                    className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                                    placeholder="Enter your name"
                                    placeholderTextColor="#FFFFFF"
                                    value={location}
                                    onChangeText={setLocation}
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
    )
}

export default TournamentDetails;

