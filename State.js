import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Nut from "./components/Nut";

export default function State() {
  const [bgColor, setBgColor] = useState("#fff");

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}> 
      <Nut backgroundColor="green" content="Green" textColor="#fff" onPress={() => setBgColor("green")} />
      <Nut backgroundColor="blue" content="Blue" textColor="#fff" onPress={() => setBgColor("blue")} />
      <Nut backgroundColor="brown" content="Brown" textColor="#fff" onPress={() => setBgColor("brown")} />
      <Nut backgroundColor="yellow" content="Yellow" textColor="#000" onPress={() => setBgColor("yellow")} />
      <Nut backgroundColor="red" content="Red" textColor="#fff" onPress={() => setBgColor("red")} />
      <Nut backgroundColor="black" content="Black" textColor="#fff" onPress={() => setBgColor("black")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});