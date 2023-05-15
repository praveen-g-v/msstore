import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './Screens/Authentication/signIn';
import SignUp from './Screens/Authentication/signUp';
import HomeScreen from './Screens/HomeScreen';
const MyTheme = {
    dark: false,
    colors: {
      primary: '#191825',
      background: '#865DFF',
      card: '#E384FF',
      text: '#191825',
      border: 'ECF2FF',
      notification: 'rgb(255, 69, 58)',
    },
  };

  

const App=()=> {
    const Stack=createNativeStackNavigator();
    return (
        <NavigationContainer theme={MyTheme} >
        <HomeScreen/>
        </NavigationContainer>



        // <NavigationContainer theme={MyTheme}>
        //     <Stack.Navigator>
        //         <Stack.Group>
        //             <Stack.Screen name="Login" component={SignIn}/>
        //             <Stack.Screen name="Register" component={SignUp}/>
        //             <Stack.Screen name="Redirect" component={HomeScreen} options={{headerShown: false}}/>
        //         </Stack.Group>
        //     </Stack.Navigator>
        // </NavigationContainer>
        
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
