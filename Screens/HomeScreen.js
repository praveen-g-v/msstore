import React,{useState,useEffect} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from "react-native-elements";
import Home from "./Homez/Home";
import Report from "./Reportz/Report";
import About from "./About";
import ProductEdit from "./ProductScreen/ProductEdit"
import {updateMonthProducts,getMonthProducts,getProduct,getCategories,updateProductCategories,updateProductData} from "./Firebase/firebase"



const HomeScreen =()=>{
    const Drawer=createDrawerNavigator();
    const [productData,setProductData]=useState([]);
    const [productCategories,setProductCategories]=useState([]);
    const [checkData,setCheckData]=useState(false);
    const [monthData,setMonthData]=useState([]);

    useEffect(()=>{
        if(monthData.length<1){
            getMonthProducts().then((data)=>{
                setMonthData(data.months);
            })
        }
        else{
            updateMonthProducts(monthData);
        }
    },[monthData]);

    useEffect(()=>{
        if(productData.length<1){
            getProduct().then((data)=>{
                setProductData(data.products);
            })
        }
        else{
            updateProductData(productData);
        }
    },[productData]);
    useEffect(()=>{
        if(productCategories.length<1){
            getCategories().then((data)=>{
                setProductCategories(data.categories)
            })
        }
        else{
            updateProductCategories(productCategories)
        }
    },[productCategories])
    
    useEffect(()=>{
        
        if(productCategories.length<=0||productCategories===null||productCategories===undefined||productData.length<=0||productData===null||productData===undefined||monthData.length<1||monthData===undefined||monthData===null){
            setCheckData(false);
        }
        else{
            setCheckData(true);
        }console.log(productCategories.length);
    },[productCategories,productData]);
    const ProductEditZ=()=>(<ProductEdit productData={productData} productCategories={productCategories} setProductData={setProductData} setProductCategories={setProductCategories}/>)
    const Homez=()=>(<Home monthData={monthData} setMonthData={setMonthData} productData={productData} productCategories={productCategories} setProductData={setProductData} setProductCategories={setProductCategories} />)
    const ReportZ=() =>(<Report monthData={monthData}/>)
    return (<>
    {   
        checkData?(
            <Drawer.Navigator initialRouteName='Report'>
            <Drawer.Screen name="Home" productData component={Homez}/>
            <Drawer.Screen name="ProductEdit"  component={ProductEditZ}/>
            <Drawer.Screen name="Report" component={ReportZ}/>
            <Drawer.Screen name="About" component={About}/>
        </Drawer.Navigator>
        ):<Text>Loading Datas...</Text>
    }
        
      </>
    )
}

export default HomeScreen;