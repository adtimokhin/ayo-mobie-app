import { Text, TouchableOpacity } from "react-native";

const SettingsButton = ({ text, onPress, contrast }) => {
  const buttonClasses = `${
    contrast ? "bg-bone" : "bg-[#C1ACE9]"
  } w-full rounded-[14px] items-center justify-center mb-3`;
  const textClasses = `${
    contrast ? "text-[#FE6244]" : "text-[#4E22A1]"
  } text-[34px]`;
  return (
    <TouchableOpacity onPress={onPress} className={buttonClasses}>
      <Text className={textClasses} style={{ fontFamily: "lalezar" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;
