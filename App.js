import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/inter_bold.ttf'),
    'Inter-Regular': require('./assets/fonts/inter_regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />

      <Text style={{ fontFamily: 'Inter-Bold', fontSize: 29, marginTop: 30, marginBottom: 1 }}>
        Расписание
      </Text>
      <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14, marginBottom: 20, color: '#B8B8B8' }}>
        13 марта - 19 марта (текущая) {'>'} 
      </Text>

      <View style={styles.dateContainer}>
        <View style={styles.dateElem}>
          <Text>Пн</Text>
        </View>
      </View>
    
      <View style={styles.container}>
        <View style={{ height: 200, backgroundColor: '#aa0000' }}>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 22,
    height: '100%',
    backgroundColor: '#000',
  },
  dateContainer: {
    backgroundColor: '#ffffff',
    padding: 5
  },
  dateElem: {
    backgroundColor: '#181818',
    padding: 5
  },
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
