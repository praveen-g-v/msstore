import React from "react";
import {Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "./Home";
import Report from "./Report";
import About from "./About";
import ProductEdit from "./ProductScreen/ProductEdit"



const HomeScreen =()=>{
    const Drawer=createDrawerNavigator();
    return (<>
        <Drawer.Navigator initialRouteName='ProductEdit'>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="ProductEdit" component={ProductEdit}/>
            <Drawer.Screen name="Report" component={Report}/>
            <Drawer.Screen name="About" component={About}/>
        </Drawer.Navigator>
      </>
    )
}

export default HomeScreen;