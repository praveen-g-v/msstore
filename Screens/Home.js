import React, { useState,useEffect } from "react";
import {Text,View,FlatList,ListItem, TouchableOpacity,StyleSheet} from "react-native";
import Entry from "./Entry";
import { TextInput } from "react-native-gesture-handler";
const datas=[
    {
        data:"Biscuit",
        key:"@biscuit123",
        sub:[
            {
                name:"Parle G",
                price:[{price:10,key:"parle@10"},{price:20,key:"parle@20"},{price:30,key:"parle@30"}],
            },
            {
                name:"Marie Gold",
                price:[{price:10,key:"marie@10"},{price:20,key:"marie@20"},{price:30,key:"marie@30"}],
            },
            {
                name:"Oreo",
                price:[{price:10,key:"oreo@10"},{price:20,key:"oreo@20"},{price:30,key:"oreo@30"}],
            }
        ]
    },
    {
        data:"Tea Powder",
        key:"@teapowder123",
        sub:[
            {
                name:"Parle G",
                price:[10,20,30]
            },
            {
                name:"Marie Gold",
                price:[10,20,30]
            },
            {
                name:"Oreo",
                price:[10,20,30]
            }
        ]
    },
    {
        data:"Surf Powder",
        key:"@surfpowder123"
    },
    {
        data:"Bath Soap",
        key:"@bathsoap123"
    },
    {
        data:"Dish Soap(Vim)",
        key:"@dishsoap123"
    },
    {
        data:"Cloth Soap",
        key:"@clothsoap123"
    },
    {
        data:"Liquid",
        key:"@liquid123"
    },
    {
        data:"Comfort",
        key:"@comfort123"
    },
    {
        data:"Shampoo",
        key:"@shampoo123"
    },
    {
        data:"Vegetable Oil",
        key:"@vegetableoil123"
    },
    {
        data:"Deepam Oil",
        key:"@deepamoil123"
    },
    {
        data:"Hair Oil",
        key:"@hairoil123"
    },
    {
        data:"Cigratee",
        key:"@cigratee123"
    },
    {
        data:"Agarbatti",
        key:"@agarbatti123"
    }
    ,
    {
        data:"Tooth Paste(Collgate)",
        key:"@toothpaste123"
    },
    {
        data:"Tooth Brush(Collgate)",
        key:"@toothbrush123"
    },
    {
        data:"Chips (Lays)",
        key:"@chips123"
    },
    {
        data:"Sambar Powder",
        key:"@sambarpowder123"
    },
    {
        data:"Cool Drinks",
        key:"@cooldrinks123"
    },
    {
        data:"Egg (muttai)",
        key:"@egg123"
    },
    {
        data:"Milk (paal)",
        key:"@milk123"
    },
    {
        data:"Pakku DS",
        key:"@pakkuds123"
    },
    {
        data:"Salt",
        key:"@salt123"
    },
    {
        data:"Sugar",
        key:"@sugar123"
    },
    {
        data:"Pampars Whisper",
        key:"@whisper123"
    },
    {
        data:"Atta",
        key:"@atta123"
    }
]



const Home =()=>{
    console.log()
const [search,setSearch]=useState("");
const [data,setData]=useState([]);
useEffect(()=>{
        if(search.length<=0||search===null||search===undefined){
            setData(datas);
        }
        let newData=datas.filter((data)=>{
            if(data.data.trim().match(search.trim())){
                return data;
            }
        });
        console.log(newData);
        setData(newData);
    

    },[search]);

    return (
        <View style={styles.background} >
                <TextInput style={styles.input} placeholder="Search your item..." keyboardType="web-search" onChangeText={setSearch} value={search}/>
                <FlatList
                    style={styles.background}
                    data={data}
                    renderItem={({item}) => {
                        return (
                        <Entry title={item.data} sub={item.sub}/>
                    )}}
                />
                <TouchableOpacity style={styles.addBtn}>
                    <View style={styles.cross}>
                        <View style={styles.crossUp} />
                        <View style={styles.crossFlat} />
                    </View>
                </TouchableOpacity>
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
        bottom: 100,
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