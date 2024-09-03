import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [preferences, setPreferences] = React.useState({
    pushNotifications: false,
    emailMarketing: false,
    latestNews: false,
  });

  const updateState = (key) => () =>
    setPreferences((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));

   React.useEffect(() => { 
      (async () => { 
        // Use AsyncStorage.multiSet API to persist each preference under a separate key. 
        
        try{
          const stringfiedArr = Object.entries(preferences).map(([key, value]) => [key, value ? "true": "false"]);
          console.log("stringfiedArr .", stringfiedArr );
          await AsyncStorage.multiSet(stringfiedArr)
        }
        catch(e){
          Alert.alert(`An error occurred: ${e.message}`); 
        }

        console.log("Done.")
      })(); 
    }, [preferences]); 


    React.useEffect(() => { 
      (async () => { 
        // Populate preferences from storage using AsyncStorage.multiGet 
        try {
        const loadedPref = await AsyncStorage.multiGet(Object.keys(preferences));
        const parsedPref = Object.fromEntries(loadedPref.map(([key, value]) => [key, value == "true" ? true: false]));
        console.log("parsedPref .", parsedPref );
          setPreferences(parsedPref);
        }
        catch(e){
          Alert.alert(`An error occurred: ${e.message}`); 
        }

        console.log("load ok.")
      })(); 
    }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Preferences</Text>
      <View style={styles.row}>
        <Text>Push notifications</Text>
        <Switch
          value={preferences.pushNotifications}
          onValueChange={updateState('pushNotifications')}
        />
      </View>
      <View style={styles.row}>
        <Text>Marketing emails</Text>
        <Switch
          value={preferences.emailMarketing}
          onValueChange={updateState('emailMarketing')}
        />
      </View>
      <View style={styles.row}>
        <Text>Latest news</Text>
        <Switch
          value={preferences.latestNews}
          onValueChange={updateState('latestNews')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  header: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
