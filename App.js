import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';

export default function App(){
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={() => console.log('Gesture detected!')}>
        <View style={styles.box}/>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    margin: 20,
  },
});

