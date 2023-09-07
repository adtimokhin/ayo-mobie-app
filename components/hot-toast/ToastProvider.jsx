import React, { createContext, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (text) => {
    setMessage(text);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setMessage('');
    }, 3000); // Toast disappears after 3 seconds
  };

  const hideToast = () => {
    setToastVisible(false);
    setMessage('');
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast visible={toastVisible} message={message} onPress={hideToast} />
    </ToastContext.Provider>
  );
};

const Toast = ({ visible, message, onPress }) => {
  const translateY = new Animated.Value(100);

  Animated.timing(translateY, {
    toValue: visible ? 0 : 100,
    duration: 300,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <TouchableOpacity style={styles.toast} onPress={onPress}>
        <Text style={styles.toastText}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ToastProvider;
