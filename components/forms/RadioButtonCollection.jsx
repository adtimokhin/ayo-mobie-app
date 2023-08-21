import { View } from "react-native";
import RadioButton from "./RadioButton";

// Fixed

const RadioButtonCollection = ({ array, onPress, activeItem }) => {
  const items = [];
  for (let i = 0; i < array.length; i++) {
    const data = array[i];
    items.push(
      <RadioButton
        key={data.buttonValue}
        text={data.buttonText}
        onPress={onPress}
        value={data.buttonValue}
        isActive={activeItem === data.buttonValue}
      />
    );
  }

  return <View>{items}</View>;
};

export default RadioButtonCollection;
