import React, { createContext, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const PopUpContext = createContext();

export const usePopUp = () => {
  return useContext(PopUpContext);
};

const PopUpProvider = ({ children }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const showPopup = (content) => {
    setPopupContent(content);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setPopupContent(null);
  };

  return (
    <PopUpContext.Provider value={showPopup}>
      {children}
      <PopUp
        visible={popupVisible}
        content={popupContent}
        onClose={hidePopup}
      />
    </PopUpContext.Provider>
  );
};

const PopUp = ({ visible, content, onClose }) => {
  if (!visible) return null;

  const closeIcon = <Icon name="x" size={25} color="#fff" />;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <View style={styles.container}>
        <View style={styles.popup}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>{closeIcon}</Text>
          </TouchableOpacity>
          {content}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#FE6244",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
  },
});

export default PopUpProvider;
