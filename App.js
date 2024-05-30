import { StatusBar } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Navigation from "./Navigation";

export default function App(){
  return (
    <SafeAreaView style = {styles.container}>
      <Navigation />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(191, 201, 202)",
  },

});

