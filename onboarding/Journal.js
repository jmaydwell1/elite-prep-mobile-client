import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingActionButton from '../components/FloatingActionButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NavigationBar = ({ navigation }) => (
    <StyledView className="absolute bottom-0 left-0 right-0 bg-[#1C1C1D] flex-row justify-around py-4 px-5 border-t border-[#2D2D2E]">
        <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={24} color="#89898A" />
            <StyledText className="text-[#89898A] mt-1">Home</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Performance')}>
            <Ionicons name="stats-chart" size={24} color="#89898A" />
            <StyledText className="text-[#89898A] mt-1">Performance</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Journal')}>
            <Ionicons name="journal" size={24} color="white" />
            <StyledText className="text-white mt-1">Journaling</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="items-center">
            <Ionicons name="time" size={24} color="#89898A" />
            <StyledText className="text-[#89898A] mt-1">History</StyledText>
        </StyledTouchableOpacity>
    </StyledView>
);

const Journal = ({ navigation }) => {
    const renderJournalOption = (title, description, icon, onPress) => (
        <StyledTouchableOpacity
            onPress={onPress}
            className="bg-[#2D2D2E] rounded-xl p-4 mb-4"
        >
            <StyledView className="flex-row items-center justify-between">
                <StyledView className="flex-row items-center">
                    <StyledView className="w-10 h-10 bg-[#3D3D3E] rounded-full items-center justify-center mr-3">
                        <Ionicons name={icon} size={24} color="#58C5C7" />
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-white text-lg font-semibold">{title}</StyledText>
                        <StyledText className="text-[#89898A] text-sm">{description}</StyledText>
                    </StyledView>
                </StyledView>
                <Ionicons name="chevron-forward" size={24} color="white" />
            </StyledView>
        </StyledTouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 bg-[#1C1C1D]"
            >
                <ScrollView className="flex-1">
                    <StyledView className="px-5">
                        {/* Header */}
                        <StyledView className="flex-row items-center justify-between py-4">
                            <StyledTouchableOpacity
                                onPress={() => navigation.goBack()}
                                className="w-10 h-10 items-center justify-center"
                            >
                                <Ionicons name="chevron-back" size={24} color="white" />
                            </StyledTouchableOpacity>
                            <StyledText className="text-white text-xl font-semibold">Journal</StyledText>
                            <StyledView className="w-10" />
                        </StyledView>

                        {/* Journal Options */}
                        <StyledView className="mt-4">
                            {renderJournalOption(
                                'Game Day Journal',
                                'Record your thoughts',
                                'calendar',
                                () => navigation.navigate('GameDayJournal')
                            )}

                            {renderJournalOption(
                                'Technique Log',
                                'Track improvements',
                                'create',
                                () => navigation.navigate('TechniqueLog')
                            )}

                            {renderJournalOption(
                                'Highlights',
                                'Document best moments',
                                'star',
                                () => navigation.navigate('Highlights')
                            )}

                            {renderJournalOption(
                                'Performance Anxiety',
                                'Interact with AI Psychology Coach',
                                'heart',
                                () => navigation.navigate('PerformanceAnxiety')
                            )}
                        </StyledView>
                    </StyledView>
                </ScrollView>
            </KeyboardAvoidingView>
            <NavigationBar navigation={navigation} />
            <FloatingActionButton navigation={navigation} />
        </SafeAreaView>
    );
};

export default Journal; 