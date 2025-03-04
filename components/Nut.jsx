import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Nut({ backgroundColor, content, textColor, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    paddingHorizontal: 150,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
