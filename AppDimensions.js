import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, useWindowDimensions } from "react-native";

export default function App() {
  // though this entire procxess seems a bit verbose but it does produce a dynamic responsive styles based on screen and orientation changes
  
  // we can do even better by using useDimension hook
  // const [dimension, setDiemension] = useState({window: Dimensions.get("window")})

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener("change", ({window}) => {
  //     setDiemension({window})
  //   })

  //   return () => subscription.remove()
  // })
  // const {window} = dimension
  // const windowWidth = window.width
  // const windowHeight = window.height

  // this is recommended approach to handle dynamic and responsive styles
  const windowWidth = useWindowDimensions().width
  const windowHeight = useWindowDimensions().height

  return (
    <View style={styles.container}>
      <View style={[styles.box, { width: windowWidth > 500 ? "70%" : "90%",
    height: windowHeight > 600 ? "60%" : "90%"}]}>
        <Text style={{fontSize: windowWidth > 500 ? "50" : 24}}>Welcome!</Text>
      </View>
    </View>
  );
}

// getting device size based various screen sizes
// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// Dimension api doesnt get updated width/height when orientation or screen sizes changes
// to mitigate this responsiveness issue we will make use of useState and useEffect hook to listen for window changes

// console.log(windowHeight, windowWidth)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "plum",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    // width: 301,
    // height: 301,
    // width: windowWidth > 500 ? "70%" : "90%",
    // height: windowHeight > 600 ? "60%" : "90%",
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center"
  },
  // text: {
  //   // fontSize: 24
  //   fontSize: windowWidth > 500 ? 50 : 24
  // }
});