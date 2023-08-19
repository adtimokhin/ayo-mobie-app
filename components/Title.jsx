import { Text, View } from "react-native";

// Fixed

const Title = ({ content }) => {
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontFamily: "lalezar", letterSpacing: 0, color:"#FCFBFC", fontSize: 80 }}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Title;
