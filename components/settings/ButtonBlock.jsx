import { Text, View } from "react-native";

// Fixed

const ButtonBlock = (props) => {
  const title = props.title || "No title";
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Text style={{ fontFamily: "lalezar", fontSize: 32, color: "#FCFBFC" }}>
        {title}
      </Text>
      <View style={{ width: "100%" }}>{props.children}</View>
    </View>
  );
};

export default ButtonBlock;
