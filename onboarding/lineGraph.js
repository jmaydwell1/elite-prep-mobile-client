import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LineGraph = ({ navigation, route }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('Month');
    const trend = route.params?.trend || 'Performance Trends';

    // Mock data for different time periods
    const mockDataSets = {
        Month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                data: [5, 7, 6, 8]
            }]
        },
        Year: {
            labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
            datasets: [{
                data: [4, 6, 7, 8, 7, 9]
            }]
        },
        'All Time': {
            labels: ['2021', '2022', '2023', '2024'],
            datasets: [{
                data: [3, 5, 7, 8]
            }]
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1C1C1D]">
            <ScrollView className="flex-1">
                <StyledView className="px-5">
                    <StyledView className="flex-row items-center justify-center mt-4 mb-6 relative">
                        <StyledTouchableOpacity 
                            onPress={() => navigation.goBack()}
                            className="absolute left-0 p-2 z-10"
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </StyledTouchableOpacity>
                        <StyledText className="text-white text-xl font-semibold">
                            {trend}
                        </StyledText>
                    </StyledView>

                    {/* Time Period Toggle */}
                    <StyledView className="flex-row justify-center bg-[#2D2D2E] rounded-lg p-1 mb-4">
                        {['Month', 'Year', 'All Time'].map((period) => (
                            <StyledTouchableOpacity
                                key={period}
                                onPress={() => setSelectedPeriod(period)}
                                className={`flex-1 py-2 rounded-md ${
                                    selectedPeriod === period ? 'bg-[#3D3D3E]' : ''
                                }`}
                            >
                                <StyledText className={`text-center ${
                                    selectedPeriod === period ? 'text-white' : 'text-[#89898A]'
                                }`}>
                                    {period}
                                </StyledText>
                            </StyledTouchableOpacity>
                        ))}
                    </StyledView>

                    <StyledView className="bg-[#2D2D2E] rounded-lg p-2">
                        <LineChart
                            data={mockDataSets[selectedPeriod]}
                            width={Dimensions.get('window').width - 50}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#2D2D2E',
                                backgroundGradientFrom: '#2D2D2E',
                                backgroundGradientTo: '#2D2D2E',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(246, 255, 107, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(137, 137, 138, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "3",
                                    stroke: "#F6FF6B",
                                    fill: "#000000"
                                },
                                propsForBackgroundLines: {
                                    strokeDasharray: "", // Remove dotted lines
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
                            getDotProps={(value, index) => ({
                                r: "6",
                                strokeWidth: "3",
                                stroke: "#F6FF6B",
                                fill: "#000000"
                            })}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </StyledView>

                    <StyledView className="mt-6">
                        <StyledText className="text-white text-lg mb-4">
                            {selectedPeriod === 'Month' ? 'Last 30 Days' : 
                             selectedPeriod === 'Year' ? 'Past 12 Months' : 
                             'Overall Progress'}
                        </StyledText>
                        <StyledView className=" p-4">
                            <StyledText className="text-white text-lg leading-6">
                                {selectedPeriod === 'Month' ? 
                                    "Your levels have shown consistent improvement over the past month. Starting at 5, you've managed to increase your focus to 8, showing a strong upward trend. Keep maintaining your current practice routine to further enhance your performance." :
                                 selectedPeriod === 'Year' ? 
                                    "Throughout the year, you've demonstrated remarkable progress in maintaining focus. From an initial score of 4, you've achieved peaks of 9, indicating significant long-term improvement. Your dedication to regular practice is clearly paying off." :
                                    "Since you started tracking in 2021, your focus journey shows tremendous growth. Beginning at 3, you've steadily improved year over year, reaching a consistent level of 8. This long-term progress reflects your commitment to excellence."}
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LineGraph; 