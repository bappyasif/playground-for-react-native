import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Greet } from './components/Greet';
import RnStyles from './components/RnStyles';
import BoxModel from './components/BoxModel';
import BoxShadow from './components/BoxShadow';
import StylesInheritence from './components/StylesInheritence';
import FlexLayout from './components/FlexLayout';
import RelativeAndAbsoluteLayout from './components/RelativeAndAbsoluteLayout';
const logoImgSrc = require("./assets/adaptive-icon.png")

export default function App() {
  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(true)

  return (
    <View style={styles.container}>
      {/* in react njative overflown items are clipped to scroll though them we need to enclose them  in a ScrollView component with a bounded a height to effectively scroll effect to take place */}
      <ScrollView>

        {/* niet mogelijk !! */}

        <Text style={{ color: "plum" }}>Hello World<Text style={{ color: "red" }}>!!</Text></Text>
        <View style={{ backgroundColor: "lime", width: 200, height: 20 }}></View>
        <Button title='Press' onPress={() => console.log("button pressed view it in terminal....")}
          color="midnightblue"
        // disabled 
        />
        <Image source={logoImgSrc} style={{ width: 450, height: 450 }} />
        <View style={{ backgroundColor: "cyan", width: 200, height: 20 }}></View>
        {/* <Image source={"https://picsum.photos/200"} style={{width: 450, height: 450}} /> */}
        <Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 450, height: 450 }} />
        <ImageBackground source={logoImgSrc} style={{ flex: 1 }}>
          <Text>Overlay Text</Text>
        </ImageBackground>

        <Button title='Toggle Modal' onPress={() => setShow(true)} />

        <Button title='Toggle Statusbar' onPress={() => setHide(prev => !prev)} />
        {/* <Button title='Toggle Statusbar' onPress={() => setHide(true)} /> */}

        <ActivityIndicator size={"large"} />
        <ActivityIndicator />
        <ActivityIndicator size={"large"} color={"midnightblue"} />
        <ActivityIndicator size={"large"} color={"darkred"} animating={hide} />
        <Button title='Alert' onPress={() => Alert.alert("Invalid data!!")} />
        <Button title='Alert 2' onPress={() => Alert.alert("Invalid data!!", "DOB incorrect....")} />
        <Button title='Alert 3' onPress={() => Alert.alert("Invalid data!!", "DOB incorrect....", [{ text: "Cancel", onPress: () => console.log("Cancel pressed!!") }, { text: "Ok", onPress: () => console.log("Ok pressed!!") }])} />

        <Greet name={"AB"} />
        <Greet name={"ab"} />
        <RnStyles />
        <BoxModel />
        <BoxShadow />
        <StylesInheritence />
        <FlexLayout />
        <RelativeAndAbsoluteLayout />

        <Modal
          visible={show}
          onRequestClose={() => setShow(false)}
          animationType='slide'
          // presentationStyle only works in ios
          presentationStyle='pageSheet'
        >
          <View style={{ flex: 1, backgroundColor: "lightblue", padding: 9 }}>
            <Text>Modal content</Text>
            <Button title='Close' color={"darkblue"} onPress={() => setShow(false)} />
          </View>
        </Modal>

        <Pressable onPress={() => console.log("image pressed!!")} onPressIn={() => console.log("pressed in from imgae")} onPressOut={() => console.log("pressed out from imgae")} onLongPress={() => console.log("long pressed from imgae")}>
          <Image source={logoImgSrc} style={{ width: 150, height: 150 }} />
        </Pressable>

        <Pressable onPress={() => console.log("text pressed!!")} onPressIn={() => console.log("pressed in from text")} onPressOut={() => console.log("pressed out from text")} onLongPress={() => console.log("long pressed from text")}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </Text>
        </Pressable>
      </ScrollView>
      {/* status bar all styles only affects androids and not ios */}
      {/* <Button title='Toggle Modal' onPress={() => setHide(false)} /> */}
      <StatusBar style="auto" backgroundColor='lightgreen' hidden={hide} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
