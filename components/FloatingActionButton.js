import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const FloatingActionButton = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuAnimation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1;
        Animated.spring(menuAnimation, {
            toValue,
            useNativeDriver: true,
        }).start();
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { icon: 'play', label: 'Start Practice', screen: 'StartPractice' },
        { icon: 'add-circle', label: 'Add Practice', screen: 'AddPractice' },
        { icon: 'clipboard', label: 'Baseline Questionnaire', screen: 'BaselineQuestionnaire' },
        { icon: 'journal', label: 'Add Journal Entry', screen: 'AddJournal' },
    ];

    return (
        <StyledView className="absolute bottom-32 right-5">
            {/* Dark Overlay */}
            {isOpen && (
                <StyledTouchableOpacity
                    activeOpacity={1}
                    onPress={toggleMenu}
                    className="absolute inset-0 bg-black/90 -z-10"
                />
            )}

            {/* Menu Items */}
            <Animated.View
                style={{
                    transform: [
                        {
                            translateY: menuAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -80],
                            }),
                        },
                    ],
                    opacity: menuAnimation,
                }}
                className="absolute bottom-0 right-0 bg-[#2D2D2E] rounded-lg p-2 w-48 shadow-lg z-50"
            >
                {menuItems.map((item, index) => (
                    <StyledTouchableOpacity
                        key={item.label}
                        onPress={() => {
                            navigation.navigate(item.screen);
                            toggleMenu();
                        }}
                        className="flex-row items-center py-3 px-0"
                    >
                        <StyledText className="text-white font-medium w-36">{item.label}</StyledText>
                        <StyledView className="w-8 h-8 bg-white rounded-full items-center justify-center">
                            <Ionicons name={`${item.icon}-outline`} size={20} color="black" />
                        </StyledView>
                    </StyledTouchableOpacity>
                ))}
            </Animated.View>

            {/* FAB Button */}
            <StyledTouchableOpacity
                onPress={toggleMenu}
                className="w-14 h-14 bg-white rounded-full items-center justify-center shadow-lg z-50"
            >
                <Ionicons name={isOpen ? 'close' : 'add'} size={32} color="black" />
            </StyledTouchableOpacity>
        </StyledView>
    );
};

export default FloatingActionButton; 