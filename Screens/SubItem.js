import React from "react";
import {Text, View,StyleSheet} from "react-native"
import { Button } from "react-native-elements";

const styles = StyleSheet.create({
    item:{
        backgroundColor:"#FFF",
        padding:15,
        marginLeft:10,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20,
    },
    itemLeft:{
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap"
    },
    square:{
        width:24,
        height:24,
        backgroundColor:"#00FF00",
        marginRight:10,
        borderRadius:5, 
    },
    redSquare:{
      width:24,
      height:24,
      backgroundColor:"#FF0000",
      marginRight:10,
      borderRadius:5,
    },
    text:{
        maxWidth:"100%"
    },
    textExpanded:{
      padding:5, 
      maxWidth:"100%",
      color:"#c22b79"
  
    },
    circular:{
        marginRight:15,
        width:12,
        height:12,
        borderColor:"#55BCF6",
        borderWidth:2,
        borderRadius:5
    },
  
  
  })

export default SubItem;