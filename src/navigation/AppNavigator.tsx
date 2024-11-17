import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { ErrorAPI } from '../components';
import { setErrorPopupHandler } from '../api/apiClient';

const AppNavigator = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  setErrorPopupHandler((status: number | null, message: string) => {
    setPopupMessage(message);
    setErrorStatus(status);
    setPopupVisible(true);
  });

  return (
    <NavigationContainer>
      <ErrorAPI
        visible={popupVisible}
        message={popupMessage}
        onClose={() => setPopupVisible(false)}
        status={errorStatus}
      />
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
