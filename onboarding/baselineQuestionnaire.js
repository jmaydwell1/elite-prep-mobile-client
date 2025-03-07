import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProgressIcon6 from '../assets/progress_icon6.png';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const BaselineQuestionnaire = () => {
    const [questionOne, setQuestionOne] = useState(5);
    const [questionTwo, setQuestionTwo] = useState(5);
    const [questionThree, setQuestionThree] = useState(5);
    const [questionFour, setQuestionFour] = useState(5);
    const [questionFive, setQuestionFive] = useState(5);
    const [questionSix, setQuestionSix] = useState(5);
    const [questionSeven, setQuestionSeven] = useState(5);
    const [questionEight, setQuestionEight] = useState(5);
    
    const navigation = useNavigation();

    const handleNext = () => {
        console.log('Next pressed:', { questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven, questionEight });
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <StyledView className="flex-1 px-5 mt-5">
                        <StyledView className="flex-row items-center justify-between mb-10">
                            <StyledTouchableOpacity
                                onPress={() => navigation.goBack()}
                                className="mr-4"
                            >
                                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                            </StyledTouchableOpacity>
                            <StyledView className="w-8" />
                        </StyledView>

                        <StyledView className="flex-row items-center mb-6">
                            <StyledText className="text-[#9BBBC6] text-4xl font-light">Baseline Questionnaire</StyledText>
                        </StyledView>

                        <StyledView className="w-full">
                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    What is your overall confidence level
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Confident</StyledText>
                                    <StyledText className="text-[#89898A]">Very Confident</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionOne}
                                    onValueChange={setQuestionOne}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionOne}
                                </StyledText>
                            </StyledView>

                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    What is your overall focus level
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Focused</StyledText>
                                    <StyledText className="text-[#89898A]">Very Focused</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionTwo}
                                    onValueChange={setQuestionTwo}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionTwo}
                                </StyledText>
                            </StyledView>

                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    What is your Performance Anxiety level for next event
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Anxious</StyledText>
                                    <StyledText className="text-[#89898A]">Very Anxious</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionThree}
                                    onValueChange={setQuestionThree}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionThree}
                                </StyledText>
                            </StyledView>

                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    How much do you enjoy competing and preparing
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Much</StyledText>
                                    <StyledText className="text-[#89898A]">Very Much</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionFour}
                                    onValueChange={setQuestionFour}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionFour}
                                </StyledText>
                            </StyledView>

                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    How High is your Burnout level
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Burned Out
                                    </StyledText>
                                    <StyledText className="text-[#89898A]">Very Burned Out</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionFive}
                                    onValueChange={setQuestionFive}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionFive}
                                </StyledText>
                            </StyledView>


                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    What is your overall effort level
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Much Effort</StyledText>
                                    <StyledText className="text-[#89898A]">Very Much Effort</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionSix}
                                    onValueChange={setQuestionSix}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionSix}
                                </StyledText>
                            </StyledView>


                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    What is your Motivation level to Prepare and Compete
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Motivated</StyledText>
                                    <StyledText className="text-[#89898A]">Very Motivated</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionSeven}
                                    onValueChange={setQuestionSeven}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionSeven}
                                </StyledText>
                            </StyledView>


                            <StyledView className="mb-12">
                                <StyledText className="text-white text-lg mb-4">
                                    How Ready are you to compete if the tournament was tomorrow
                                </StyledText>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Not Ready</StyledText>
                                    <StyledText className="text-[#89898A]">Very Ready</StyledText>
                                </StyledView>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    step={1}
                                    value={questionEight}
                                    onValueChange={setQuestionEight}
                                    minimumTrackTintColor="#58C5C7"
                                    maximumTrackTintColor="#3D3D3E"
                                    thumbTintColor="#58C5C7"
                                />
                                <StyledText className="text-white text-center text-xl mt-2">
                                    {questionEight}
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
                                        Finish
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

export default BaselineQuestionnaire;
