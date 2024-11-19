import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { ErrorAPI } from '../components';
import { setErrorPopupHandler } from '../api/apiClient';

const AppNavigator = () => {
  const [popupState, setPopupState] = useState({
    visible: false,
    message: '',
    status: null as number | null,
  });

  useEffect(() => {
    setErrorPopupHandler((status, message) => {
      setPopupState({
        visible: true,
        message,
        status,
      });
    });
  }, []);

  const _handleClosePopup = () =>
    setPopupState(prev => ({ ...prev, visible: false }));

  return (
    <NavigationContainer>
      <ErrorAPI
        visible={popupState.visible}
        message={popupState.message}
        onClose={_handleClosePopup}
        status={popupState.status}
      />
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
