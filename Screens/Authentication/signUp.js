import React,{useState} from "react";
import {SafeAreaView,TextInput,StyleSheet,Button,Text,View,Alert} from 'react-native'
import {createNewUser} from "../Firebase/firebase";

const SignUp =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    function Validate(){
        console.log("validating");
        if(email.length>0){
            if(password.length>0||confpassword.length>0){
                if(email.includes("@")&&email.includes(".")){
                    if(password.length>6){
                        if(password===confpassword){
                            return true;
                        }
                        else{
                            Alert.alert("Password doesn't Match")
                        }
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
    const register=()=>{
        if(Validate()){
          const r=createNewUser(email,password);


          //Alert.alert(r.status);

        }
        console.log("Button pressed");
      

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
      
      <Text style={styles.text}>
          Confirm Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfPassword}
        value={confpassword}
        placeholder="Re-Enter the Password"
        secureTextEntry
      />
      <View style={styles.fixToText}>
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={()=>{register()}}
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

export default SignUp;
