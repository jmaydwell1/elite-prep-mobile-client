import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Logo from '../assets/logo.png';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingActionButton from '../components/FloatingActionButton';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Performance = ({ navigation }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const periods = [
        { id: 'week', label: 'Week' },
        { id: 'month', label: 'Month' },
        { id: 'year', label: 'Year' },
        { id: 'all', label: 'All Time' }
    ];

    // Data for different time periods
    const timeData = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            sessionQuality: [7, 6, 8, 7, 9, 8, 7],
            focusLevel: [8, 7, 8, 9, 8, 7, 8],
            progress: [6, 6.5, 7, 7.2, 7.5, 7.8, 8],
            practiceTime: { physical: 65, mental: 35 },
            competitive: 40,
            indoor: 45,
            outdoor: 55,
            practiceType: { play: 25, casual: 20, intentional: 35, equipment: 20 },
            shotType: { tee: 20, short: 20, approach: 20, putting: 20, custom: 20 }
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            sessionQuality: [7.5, 7.8, 7.2, 7.9],
            focusLevel: [8.2, 8.5, 8.1, 8.3],
            progress: [6.5, 7.2, 7.8, 8.2],
            practiceTime: { physical: 70, mental: 30 },
            competitive: 45,
            indoor: 50,
            outdoor: 50,
            practiceType: { play: 30, casual: 15, intentional: 40, equipment: 15 },
            shotType: { tee: 25, short: 15, approach: 25, putting: 20, custom: 15 }
        },
        year: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            sessionQuality: [7.2, 7.5, 7.8, 7.4, 7.9, 7.6, 7.3, 7.7, 7.5, 7.8, 7.4, 7.6],
            focusLevel: [8.1, 8.3, 8.5, 8.2, 8.4, 8.1, 8.3, 8.5, 8.2, 8.4, 8.1, 8.3],
            progress: [6.8, 7.2, 7.5, 7.8, 8.1, 8.4, 8.7, 9.0, 9.3, 9.6, 9.9, 10.0],
            practiceTime: { physical: 75, mental: 25 },
            competitive: 50,
            indoor: 55,
            outdoor: 45,
            practiceType: { play: 35, casual: 10, intentional: 45, equipment: 10 },
            shotType: { tee: 30, short: 10, approach: 30, putting: 15, custom: 15 }
        },
        all: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            sessionQuality: [7.0, 7.3, 7.6, 7.8, 7.9],
            focusLevel: [7.8, 8.1, 8.3, 8.5, 8.6],
            progress: [6.0, 7.0, 8.0, 9.0, 10.0],
            practiceTime: { physical: 80, mental: 20 },
            competitive: 60,
            indoor: 60,
            outdoor: 40,
            practiceType: { play: 40, casual: 5, intentional: 50, equipment: 5 },
            shotType: { tee: 35, short: 5, approach: 35, putting: 10, custom: 15 }
        }
    };

    const currentData = timeData[selectedPeriod];

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <ScrollView className="flex-1">
                <StyledView className="px-5">
                    <StyledView className="items-center -mt-12 -mb-16">
                        <Image
                            source={Logo}
                            className="w-60 h-60"
                            resizeMode="contain"
                        />
                    </StyledView>

                    {/* Time Period Toggle */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-2 mb-6">
                        <StyledView className="flex-row justify-center">
                            {periods.map((period) => (
                                <StyledTouchableOpacity
                                    key={period.id}
                                    onPress={() => setSelectedPeriod(period.id)}
                                    className={`flex-1 py-2 px-4 rounded-lg mx-1 overflow-hidden relative ${
                                        selectedPeriod === period.id
                                            ? 'bg-transparent'
                                            : 'bg-transparent'
                                    }`}
                                >
                                    {selectedPeriod === period.id && (
                                        <LinearGradient
                                            colors={['#58C5C7', '#5996C8']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{
                                                position: 'absolute',
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                borderRadius: 8
                                            }}
                                        />
                                    )}
                                    <StyledText
                                        className={`text-center font-medium relative z-10 ${
                                            selectedPeriod === period.id
                                                ? 'text-white'
                                                : 'text-[#89898A]'
                                        }`}
                                    >
                                        {period.label}
                                    </StyledText>
                                </StyledTouchableOpacity>
                            ))}
                        </StyledView>
                    </StyledView>

                    {/* Total Practice Time Breakdown */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Total Practice Time
                        </StyledText>
                        <StyledView>
                            <StyledView className="flex-row justify-between mb-2">
                                <StyledText className="text-[#89898A]">Physical Practice</StyledText>
                                <StyledText className="text-[#89898A]">Mental Practice</StyledText>
                            </StyledView>
                            <StyledView className="h-4 bg-[#3D3D3E] rounded-full overflow-hidden flex-row">
                                <StyledView className={`h-full w-[${currentData.practiceTime.physical}%] bg-[#F6FF6B]`} />
                                <StyledView className={`h-full w-[${currentData.practiceTime.mental}%] bg-[#89898A]`} />
                            </StyledView>
                            <StyledView className="flex-row justify-between mt-2">
                                <StyledText className="text-[#89898A]">{currentData.practiceTime.physical}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.practiceTime.mental}%</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Physical Practice Breakdown */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Physical Practice Breakdown
                        </StyledText>
                        <StyledView className="space-y-4">
                            <StyledView>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Competitive Practice</StyledText>
                                    <StyledText className="text-[#89898A]">{currentData.competitive}%</StyledText>
                                </StyledView>
                                <StyledView className="h-4 bg-[#3D3D3E] rounded-full overflow-hidden">
                                    <StyledView className={`h-full w-[${currentData.competitive}%] bg-[#F6FF6B]`} />
                                </StyledView>
                            </StyledView>
                            <StyledView>
                                <StyledView className="flex-row justify-between mb-2">
                                    <StyledText className="text-[#89898A]">Indoor Practice</StyledText>
                                    <StyledText className="text-[#89898A]">Outdoor Practice</StyledText>
                                </StyledView>
                                <StyledView className="h-4 bg-[#3D3D3E] rounded-full overflow-hidden flex-row">
                                    <StyledView className={`h-full w-[${currentData.indoor}%] bg-[#F6FF6B]`} />
                                    <StyledView className={`h-full w-[${currentData.outdoor}%] bg-[#89898A]`} />
                                </StyledView>
                                <StyledView className="flex-row justify-between mt-2">
                                    <StyledText className="text-[#89898A]">{currentData.indoor}%</StyledText>
                                    <StyledText className="text-[#89898A]">{currentData.outdoor}%</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Practice Type Breakdown */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Practice Type
                        </StyledText>
                        <StyledView>
                            <StyledView className="flex-row justify-between mb-2">
                                <StyledText className="text-[#89898A]">Play</StyledText>
                                <StyledText className="text-[#89898A]">Casual Play</StyledText>
                                <StyledText className="text-[#89898A]">Intentional Practice</StyledText>
                                <StyledText className="text-[#89898A]">Equipment Sessions</StyledText>
                            </StyledView>
                            <StyledView className="h-4 bg-[#3D3D3E] rounded-full overflow-hidden flex-row">
                                <StyledView className={`h-full w-[${currentData.practiceType.play}%] bg-[#F6FF6B]`} />
                                <StyledView className={`h-full w-[${currentData.practiceType.casual}%] bg-[#89898A]`} />
                                <StyledView className={`h-full w-[${currentData.practiceType.intentional}%] bg-[#F6FF6B]`} />
                                <StyledView className={`h-full w-[${currentData.practiceType.equipment}%] bg-[#89898A]`} />
                            </StyledView>
                            <StyledView className="flex-row justify-between mt-2">
                                <StyledText className="text-[#89898A]">{currentData.practiceType.play}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.practiceType.casual}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.practiceType.intentional}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.practiceType.equipment}%</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Shot Type Breakdown */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-4 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Shot Type
                        </StyledText>
                        <StyledView>
                            <StyledView className="flex-row justify-between mb-2">
                                <StyledText className="text-[#89898A]">Tee Shots</StyledText>
                                <StyledText className="text-[#89898A]">Short Game</StyledText>
                                <StyledText className="text-[#89898A]">Approach</StyledText>
                                <StyledText className="text-[#89898A]">Putting</StyledText>
                                <StyledText className="text-[#89898A]">Custom</StyledText>
                            </StyledView>
                            <StyledView className="h-4 bg-[#3D3D3E] rounded-full overflow-hidden flex-row">
                                <StyledView className={`h-full w-[${currentData.shotType.tee}%] bg-[#F6FF6B]`} />
                                <StyledView className={`h-full w-[${currentData.shotType.short}%] bg-[#89898A]`} />
                                <StyledView className={`h-full w-[${currentData.shotType.approach}%] bg-[#F6FF6B]`} />
                                <StyledView className={`h-full w-[${currentData.shotType.putting}%] bg-[#89898A]`} />
                                <StyledView className={`h-full w-[${currentData.shotType.custom}%] bg-[#F6FF6B]`} />
                            </StyledView>
                            <StyledView className="flex-row justify-between mt-2">
                                <StyledText className="text-[#89898A]">{currentData.shotType.tee}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.shotType.short}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.shotType.approach}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.shotType.putting}%</StyledText>
                                <StyledText className="text-[#89898A]">{currentData.shotType.custom}%</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Session Quality Graph */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-2 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Session Quality
                        </StyledText>
                        <StyledView className="h-40">
                            <LineChart
                                data={{
                                    labels: currentData.labels,
                                    datasets: [{
                                        data: currentData.sessionQuality
                                    }]
                                }}
                                width={Dimensions.get('window').width - 50}
                                height={160}
                                chartConfig={{
                                    backgroundColor: '#2D2D2E',
                                    backgroundGradientFrom: '#2D2D2E',
                                    backgroundGradientTo: '#2D2D2E',
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(246, 255, 107, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(137, 137, 138, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: "#F6FF6B",
                                        fill: "#000000"
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: "",
                                        strokeWidth: 1,
                                        stroke: "rgba(137, 137, 138, 0.2)"
                                    }
                                }}
                                withVerticalLabels={true}
                                withVerticalLines={false}
                                bezier
                                fromZero
                                yAxisSuffix=""
                                yAxisMin={0}
                                yAxisMax={10}
                                segments={5}
                                yAxisInterval={2}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </StyledView>
                    </StyledView>

                    {/* Focus Level Graph */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-2 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Focus Level
                        </StyledText>
                        <StyledView className="h-40">
                            <LineChart
                                data={{
                                    labels: currentData.labels,
                                    datasets: [{
                                        data: currentData.focusLevel
                                    }]
                                }}
                                width={Dimensions.get('window').width - 50}
                                height={160}
                                chartConfig={{
                                    backgroundColor: '#2D2D2E',
                                    backgroundGradientFrom: '#2D2D2E',
                                    backgroundGradientTo: '#2D2D2E',
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(246, 255, 107, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(137, 137, 138, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: "#F6FF6B",
                                        fill: "#000000"
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: "",
                                        strokeWidth: 1,
                                        stroke: "rgba(137, 137, 138, 0.2)"
                                    }
                                }}
                                withVerticalLabels={true}
                                withVerticalLines={false}
                                bezier
                                fromZero
                                yAxisSuffix=""
                                yAxisMin={0}
                                yAxisMax={10}
                                segments={5}
                                yAxisInterval={2}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </StyledView>
                    </StyledView>

                    {/* Progress Towards Goal Graph */}
                    <StyledView className="bg-[#2D2D2E] rounded-lg p-2 mb-6">
                        <StyledText className="text-white text-lg font-semibold mb-4">
                            Progress Towards Goal
                        </StyledText>
                        <StyledView className="h-40">
                            <LineChart
                                data={{
                                    labels: currentData.labels,
                                    datasets: [{
                                        data: currentData.progress
                                    }]
                                }}
                                width={Dimensions.get('window').width - 50}
                                height={160}
                                chartConfig={{
                                    backgroundColor: '#2D2D2E',
                                    backgroundGradientFrom: '#2D2D2E',
                                    backgroundGradientTo: '#2D2D2E',
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(246, 255, 107, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(137, 137, 138, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "4",
                                        strokeWidth: "2",
                                        stroke: "#F6FF6B",
                                        fill: "#000000"
                                    },
                                    propsForBackgroundLines: {
                                        strokeDasharray: "",
                                        strokeWidth: 1,
                                        stroke: "rgba(137, 137, 138, 0.2)"
                                    }
                                }}
                                withVerticalLabels={true}
                                withVerticalLines={false}
                                bezier
                                fromZero
                                yAxisSuffix=""
                                yAxisMin={0}
                                yAxisMax={10}
                                segments={5}
                                yAxisInterval={2}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </StyledView>
                    </StyledView>
                </StyledView>
            </ScrollView>
            {/* Bottom Navigation Bar */}
            <StyledView className="bg-[#1C1C1D] flex-row justify-around py-4 px-5">
                <StyledTouchableOpacity className="items-center" onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">Home</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="stats-chart" size={24} color="#FFFFFF" />
                    <StyledText className="text-white mt-1">Performance</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="journal" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">Journaling</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity className="items-center">
                    <Ionicons name="time" size={24} color="#89898A" />
                    <StyledText className="text-[#89898A] mt-1">History</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
            <FloatingActionButton navigation={navigation} />
        </SafeAreaView>
    );
};

export default Performance; 