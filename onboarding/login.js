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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login pressed:', { email, password });
    Keyboard.dismiss();
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
          <StyledView className="flex-1 px-5 justify-center">
            {/* Logo or App Name */}
            <StyledView className="items-center mb-10">
              <Image source={require('../assets/logo.png')} className=""/>
            </StyledView>

            {/* Login Form */}
            <StyledView className="w-full">
              <StyledView className="mb-5">
                <StyledText className="text-sm text-[#89898A] mb-2">
                  Email
                </StyledText>
                <StyledTextInput
                  className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                  placeholder="Enter your email"
                  placeholderTextColor="#FFFFFF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </StyledView>

              <StyledView className="mb-5">
                <StyledText className="text-sm text-[#89898A] mb-2">
                  Password
                </StyledText>
                <StyledTextInput
                  className="h-[50px] text-white rounded-lg px-4 text-base bg-[#2D2D2E]"
                  placeholder="Enter your password"
                  placeholderTextColor="#FFFFFF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </StyledView>

              <StyledTouchableOpacity
                className="self-end mb-5"
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <StyledText className="text-[#1DB2DF] text-sm">
                  Forgot Password?
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="h-[50px] rounded-full overflow-hidden mb-5"
                onPress={handleLogin}
              >
                <LinearGradient
                  colors={['#58C5C7', '#5996C8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="flex-1 justify-center items-center"
                >
                  <StyledText className="text-white text-base font-semibold">
                    Login
                  </StyledText>
                </LinearGradient>
              </StyledTouchableOpacity>

              <StyledView className="flex-row justify-center items-center">
                <StyledText className="text-[#A9A9A9] text-sm">
                  Don't have an account?{' '}
                </StyledText>
                <StyledTouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <StyledText className="text-[#1DB2DF] text-sm font-semibold">
                    Sign Up
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </StyledView>
          </StyledView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
