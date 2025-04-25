import React, { createContext, useState, useContext } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
    const [onboardingData, setOnboardingData] = useState({
        // Required fields from OnboardingData model
        email: '',
        name: '',
        birthdate: null,
        gender: '',
        city: '',
        state: '',
        sport: [],
        athletic_status: '',
        handicap: 0,
        expectation: '',
        goal: '',

        // Additional fields for UI state
        isOnboardingComplete: false,
        currentStep: 0,
    });

    const updateOnboardingData = (newData) => {
        setOnboardingData(prevData => ({
            ...prevData,
            ...newData
        }));
    };

    const clearOnboardingData = () => {
        setOnboardingData({
            email: '',
            name: '',
            birthdate: null,
            gender: '',
            city: '',
            state: '',
            sport: [],
            athletic_status: '',
            handicap: 0,
            expectation: '',
            goal: '',
            isOnboardingComplete: false,
            currentStep: 0,
        });
    };

    // Helper function to validate required fields
    const validateRequiredFields = () => {
        const requiredFields = [
            'email',
            'name',
            'birthdate',
            'gender',
            'city',
            'state',
            'sport',
            'athletic_status',
            'handicap',
            'expectation',
            'goal'
        ];

        const missingFields = requiredFields.filter(field => {
            if (field === 'sport') {
                return !onboardingData[field] || onboardingData[field].length === 0;
            }
            return !onboardingData[field];
        });

        return {
            isValid: missingFields.length === 0,
            missingFields
        };
    };

    return (
        <OnboardingContext.Provider 
            value={{ 
                onboardingData, 
                updateOnboardingData, 
                clearOnboardingData,
                validateRequiredFields 
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
}; 