import React,{useState} from "react";
import {SafeAreaView,TextInput,StyleSheet,Button,Text,View,Alert} from 'react-native'
import { signInUser} from "../Firebase/firebase"

const SignIn =({navigation})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function Validate(){
      console.log("validating");
      if(email.length>0){
          if(password.length>0){
              if(email.includes("@")&&email.includes(".")){
                  if(password.length>6){
                      return true;
                  }
                  else{
                      Alert.alert("Password is too short");
                  }
              }
              else{
                  Alert.alert("Enter a proper mail address");
              }
          }
          else{
              Alert.alert("Enter the Password");
          }
      }
      else{
          Alert.alert("Enter the email address");
      }
      return false;
  }
    const login=async()=>{
      console.log("Button pressed");
      if(Validate()){
        signInUser(email,password,navigation)
      }
    }


    return (
        <SafeAreaView style={styles.component}>
      <Text style={styles.text}>
          Email
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Enter the  Email"
        value={email}
      />
      <Text style={styles.text}>
          Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter the Password"
        
        secureTextEntry
      />
      <View style={styles.fixToText}>
        <View style={styles.button}>
          <Button
            title="Login"
            onPress={login}
            color="#000000"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={()=>{navigation.navigate('Register')}}
            color="#000000"
          />
        </View>
      </View>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    component:{
        alignContent:"center",
    },
    text:{
      fontFamily:"sans-serif",
      margin:5,
      fontSize:18,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      margin:30,
    },
    button: {width:130,
    }
  })

export default SignIn;
