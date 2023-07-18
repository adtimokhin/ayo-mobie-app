import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const RadioButton = ({ text, value, onPress, isActive }) => {

    const buttonClasses = `w-full ${isActive? "bg-[#4E22A1]":"bg-[#C1ACE9]"} rounded-[14px] px-4 mb-3`
    const textClasses = `${isActive? "text-[#C1ACE9]":"text-[#4E22A1]"} text-[32px]`

  return (
    <TouchableOpacity onPress={()=>{
        if(isActive){
            onPress("");
        }else{
            onPress(value);
        }
    }} className={buttonClasses}>
      <Text
        style={{ fontFamily: "lalezar" }}
        
        className={textClasses}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
