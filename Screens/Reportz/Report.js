import React,{useState,useEffect} from "react";
import { View,StyleSheet,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 /**
  * Need to complete this filter button in the nav menu.
  * Need to create the data as per to filter of the given button 
  */

 /**
  * Cpmpleted one
  * complete the data extracting part for the month and it is pending for year and week
  */
const Report =({monthData})=>{
    console.log(monthData);
    const [check,setCheck]=useState(true)
    const [monthFilter,setMonthFilter]=useState([]);
    useEffect(()=>{
        if(monthFilter.length<1){
            var nmonth=[];
            monthData.map((data)=>{
                if(nmonth.length<1){
                    nmonth=[{
                        month:data.month+" - "+data.year,
                        products:[
                            {
                                key:data.key,
                                count:data.count
                            }
                        ]
                    }]
                }
                else{
                    let addNew=true;
                    nmonth=nmonth.map((ndata)=>{
                        if(ndata.month===(data.month+" - "+data.year)){
                            addNew=false;
                        }
                        let addNewProduct=true;
                        let ndataProducts=ndata.products.map((pdata)=>{
                            if(pdata.key===data.key){
                                addNewProduct=false;
                                return {key:pdata.key,count:pdata.count+data.count}
                            }
                            else{
                                return pdata;
                            }
                        })
                        if(addNewProduct){
                            return {
                                month:ndata.month,
                                products:[...ndata.products,
                                    {
                                        key:data.key,
                                        count:data.count
                                    }
                                ]
                            }
                        }
                        else{
                            return {month:ndata.month,products:ndataProducts}
                        }

                    })

                    if(addNew){
                        nmonth=[...nmonth,{
                            month:data.month+" - "+data.year,
                            products:[
                                {
                                    key:data.key,
                                    count:data.count
                                }
                            ]
                        }]
                    }

                }
                
            })
            console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
            console.log(nmonth);
            
        }
    })
    return (
        <View>
            <View style={styles.navbar}>
                <View style={styles.container}>
                    {
                        check?(
                            <TouchableOpacity onPress={()=>{setCheck(!check)}} style={styles.choose}>
                                <Text>Choose Filter</Text>
                            </TouchableOpacity>
                        ):(
                            <View style={styles.chooseCnt}>

                                <TouchableOpacity onPress={()=>{setCheck(!check)}} style={styles.choose}>
                                    <Text>Select Filter</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <View></View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}>Apply</Text>
                    </TouchableOpacity>
                </View>
                    

                
            </View>
           
        </View>

    )
}

const styles=StyleSheet.create({
    chooseCnt:{
        flex:2,
        backgroundColor:"#00000",
        padding:7,
        marginLeft:3,
        marginRight:3,
        borderRadius:5,
        borderColor:"#sdfg",
        borderWidth:1,
        alignSelf:"center",
        width:windowWidth*0.7,
        height:windowHeight*0.5
    },
    txt:{
        color:"#FFFFFF",
        fontWeight:"500"
    },
    container:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
        width:windowWidth,

    },
    navbar:{
        flexDirection:"row",
        height:35,
        backgroundColor:"#FFFFFF"

    },
    rower:{
        flex:1,
        backgroundColor:"#000000"

    },
    choose:{
        flex:2,
        backgroundColor:"#00000",
        padding:7,
        marginLeft:3,
        marginRight:3,
        borderRadius:5,
        borderColor:"#sdfg",
        borderWidth:1,
        alignSelf:"center",
        width:windowWidth*0.7,
    },
    btn:{
        flex:1,
        backgroundColor:"#4169e1",
        margin:1,
        width:windowWidth*0.26, 
        height:windowHeight*0.0003,
        alignItems:"center",
        borderColor:"#FFFFFF",
        borderRadius:3
    }

})

export default Report;