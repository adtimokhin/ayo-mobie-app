import { Text } from "react-native";

const FormLabel = ({ label }) => {
  return (
    <Text
      style={{ fontFamily: "lalezar", letterSpacing: "-1%" }}
      className="text-[32px] text-bone"
    >
      {label}
    </Text>
  );
};

export default FormLabel;
