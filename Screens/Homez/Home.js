import React, { useState,useEffect } from "react";
import {Text,View,FlatList,ListItem, TouchableOpacity,StyleSheet} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Entry from "./Entry";
/**
 * 
 * <TouchableOpacity  style={styles.addBtn}>
                        <View style={styles.cross}>
                            <View style={styles.crossUp} />
                            <View style={styles.crossFlat} />
                        </View>
                    </TouchableOpacity>

It is a add button on bigger size


 *  it should return from the FlatList
 */


const Home =({productCategories,productData,setMonthData,monthData})=>{
    const [search,setSearch]=useState("");
    const [data,setData]=useState([]);
    
    useEffect(()=>{
        if(search.length<=0||search===null||search===undefined){
            let newData=productCategories.map((ndata)=>{
                    return {
                        categorie:ndata,
                        key:ndata+"@123",
                        sub:productData.map((pData)=>{
                            
                                let r={
                                    categorie:pData.categorie,
                                    name:pData.product,
                                    price:pData.prices.map((it)=>{
                                        return {
                                            price:it,
                                            key:pData.product+"@"+it+"_"+pData.categorie,
                                        }
                                    })
                                }
                                return r;
                                
                            
                        }).filter((pData)=>{
                            if(pData.categorie.trim().toLowerCase()===ndata.trim().toLowerCase()){
                                return pData;
                            }
                        })
                    
                }
            });
            setData(newData);
        }
        else{        
        let newSData=data.filter((ndata)=>{
            if(ndata.categorie.trim().toLowerCase().match(search.trim().toLowerCase())){
                return ndata;                
            }
            else{
                return null
            }
        });
        
        setData(newSData);
    }
    },[search,productCategories,productData]);
    
    
    
        return (
            <View style={styles.background} >
                    <TextInput style={styles.input} placeholder="Search your item..." keyboardType="web-search" onChangeText={setSearch} value={search}/>
                    <FlatList
                        style={styles.background}
                        data={data}
                        renderItem={({item}) => {
                            return (
                                <Entry monthData={monthData} setMonthData={setMonthData} title={item.categorie} sub={item.sub}/>
                            
                        )}}
                    />
                    
            </View>
        )
    }
    const styles=StyleSheet.create({
        addBtn:{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 50,
            right: 30,
            height: 70,
            backgroundColor: '#0B2447',
            borderRadius: 100,
        },
        input:{
            height:50,
            backgroundColor:"#BFACE2",
            padding:10,
            borderRadius:5,
            margin:5,
            
        },
        background:{
            backgroundColor:"#865DFF",
            flex:1
        },
        cross: {},
        crossUp: {
            backgroundColor: "#A5D7E8",
            height: 50,
            width: 10,
        },
        crossFlat: {
            backgroundColor: "#A5D7E8",
            height: 10,
            width: 50,
            position: "absolute",
            left: -20,
            top: 20,
        },
        
    })
    

export default Home;




