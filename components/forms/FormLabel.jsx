import { Text } from "react-native";

// Fixed
// TODO: I tweaked with the look of this component. May be not the best solution
const FormLabel = ({ label }) => {
  return (
    <Text
      style={{ fontFamily: "lalezar", letterSpacing: 0, fontSize: 32, color: "#FCFBFC", textAlign:"center" }}
    >
      {label}
    </Text>
  );
};

export default FormLabel;
