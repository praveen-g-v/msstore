import { View, Text,Button,TouchableOpacity,StyleSheet,Image, Alert } from 'react-native'
import React,{useEffect, useState} from 'react';


const Price =({removeItem,categorie,product,UpdateCart,it,keys})=>{
    const [count, setCount]=useState(0);
    const AddCount =()=>{
        setCount(count+1);
        UpdateCart(keys,count+1,product,categorie)
    }
    const SubCount =()=>{
        if(count>1){
            setCount(count-1);
            UpdateCart(keys,count-1,product,categorie)
        }
        else if(count===1){
            removeItem(keys);
            setCount(count-1);
        }
        
    }
    return(
        <View key={keys} style={styles.textExpanded}>
                    <View style={styles.row}>
                            <View style={styles.twoFlex}><Text>{it}</Text></View>
                            <View style={styles.oneFlex}><TouchableOpacity onPress={AddCount} style={styles.addBtn}>
                                <View style={styles.cross}>
                                    <View style={styles.crossUp} />
                                    <View style={styles.crossFlat} />
                                </View></TouchableOpacity></View>
                            <View style={styles.oneFlex}><TouchableOpacity onPress={SubCount} style={styles.subBtn}>
                                <View style={styles.cross}>
                                    <View style={styles.crossFlatSub} />
                                </View></TouchableOpacity></View>
                            <View style={styles.oneFlex}><Text>{count}</Text></View>
                        </View>
        </View>
    )
}


const SubItem =({items,setOpen,open,monthData,setMonthData})=>{
    const [cart,setCart]=useState([]);
    const Submitted= (props)=>{
        setOpen(open?false:true);let productList=[];
        if(cart.length>0){
            //console.log("************************************************************")
            //console.log(cart) 
            //console.log(monthData) ; 
            let newMonthData=monthData;
            cart.map((cartData)=>{

                
                let addNewData=true;

                newMonthData=newMonthData.map((data)=>{
                    if(data.year===cartData.date.year){
                        //console.log("Similar Year");
                        if(data.month===cartData.date.month){
                            //console.log("Similar month");
                            if(data.week===cartData.date.week){
                                //console.log("Similar week");
                                if(data.day===cartData.date.day){
                                    //console.log("Similar day");
                                    if(cartData.key===data.key){
                                        //console.log("Similar key");
                                        addNewData=false;
                                        return{
                                            year:data.year,
                                            month:data.month,
                                            week:data.week,
                                            day:data.day,
                                            key:data.key,
                                            count:data.count+cartData.count
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return data;
                }).filter((data)=>{
                    if(!(data.key==="samle@1_Sample")){
                        return true;
                    }
                })
                if(addNewData){
                    newMonthData=[...newMonthData,{
                        year:cartData.date.year,
                        month:cartData.date.month,
                        week:cartData.date.week,
                        day:cartData.date.day,
                        key:cartData.key,
                        count:cartData.count,

                    }]
                }
                //console.log(newMonthData)
                setMonthData(newMonthData);
            })
            Alert.alert("Added the items");
        }
    }
    const removeItem=(key)=>{
        let data=cart;
        let idx=-1;
        data.map((val,index)=>{
            
            if(val.key===key){
                sap=val;
            }
            })
            data.splice(idx,1)
        setCart(data);
            
    }

    const upDateCart=(key,count,main,categorie)=>{
        let date={
            month:new Date().getMonth() +1,
            day:new Date().getDate(),
            week:1+Math.trunc((new Date().getDate())/7),
            year:new Date().getFullYear(),
        }
        if(cart.length===0){
            setCart([{key:key,date:date,product:main,count:count,categorie:categorie}]);
        }
        else{
            let newit=true;
            let data=cart;
            //console.log("OLD Data"+data)
            data.map((val)=>{
               // console.log(val);
                if(val.key===key){
                    newit=false;
                    val.count=count;
                    val.date=date;
                }
            })
            if(newit){
                
                setCart([...cart,{key:key,date:date,product:main,count:count,categorie:categorie}]);
            }
            else{
                setCart(data);
            }
        }
    }
    return (<>
        {items.map((value,idx)=>{
                return (
                    <View key={idx} style={styles.textExpanded}>
                        <Text>{value.name}</Text>
                        <View style={styles.row}>
                            <View style={styles.twoFlex}><Text>Price</Text></View>
                            <View style={styles.oneFlex}><Text>ADD</Text></View>
                            <View style={styles.oneFlex}><Text>SUB</Text></View>
                            <View style={styles.oneFlex}><Text>TOTAL</Text></View>
                        </View>
                        {value.price.map((it,idx)=>{
                            return (
                                <Price product={value.name} categorie={value.categorie} removeItem={removeItem} UpdateCart={upDateCart} key={it.key} cart={cart} setCart={setCart} keys={it.key} it={it.price} />
                            )
                        })}
                        
                    </View>
                )
            })
        }
        <Button title='Submit' onPress={Submitted} />
        </>
    )
}


const Entry = (props) => {
    const [open, setOpen] = useState(false);
    const touched=()=>{
       // console.log((props.sub));
        setOpen(open?false:true)
    }
    return(
        <View>
            <View style={styles.box}>
                <View style={styles.column}>
                    <View style={styles.rowCir}>
                        <View style={styles.circular}></View>
                    </View>
                    <View style={styles.rowTxt}>
                        <Text  >{props.title}</Text>
                    </View>
                    <TouchableOpacity onPress={touched} style={styles.rowArrow}>
                        {
                            !open?<Image  style={styles.img} source={require("../../assets/right-arrow.png")}/>:<Image  style={styles.img} source={require("../../assets/down-arrow.png")}/>
                        }  
                    </TouchableOpacity>
                </View>
                <View >
                    <Text>hidden</Text>
                    {
                        open?<View  style={styles.itemRight}>
                            <SubItem setMonthData={props.setMonthData} monthData={props.monthData} open={open} setOpen={setOpen} items={props.sub} />
                        </View>:null
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addBtn:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        position: 'absolute',
        height: 35,
        backgroundColor: '#39FF14',
        borderRadius: 50,
        padding:10
    },
    subBtn:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        position: 'absolute',
        height: 35,
        backgroundColor: '#EE4B2B',
        borderRadius: 50,
        padding:10
    },
    cross: {
    },
    crossUp: {
        backgroundColor: "#FFFFFF",
        height: 25,
        width: 5,
    },
    crossFlat: {
        backgroundColor: "#FFFFFF",
        height: 5,
        width: 25,
        position: "absolute",
        left: -10,
        top: 10,
    },
    crossFlatSub:{
        backgroundColor: "#FFFFFF",
        height: 5,
        width: 25,
        position: "absolute",
        left: -12,
        top:-3,
    },
    row:{
        flexDirection:"row",
        margin:10
    },
    oneFlex:{
        flex:1,
        marginLeft:10
    },
    twoFlex:{
        flex:2,
    },
    img:{
        width:30,
        height:30,
        padding:10
    },
    box:{
        backgroundColor:"#FFFFFF",
        padding:10,
        borderColor:"#00000",
        margin:5,
        borderRadius:5,
        flexDirection:'column',
    },
    column:{
        flex:1,
        flexDirection:"row"
    },
    rowCir:{
        flex:1,
    },
    rowTxt:{
        flex:4,
    },

    rowArrow:{
        flex:1,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 35,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "black",
      },
      triangleDown: {
        transform: [{ rotate: "180deg" }],
      },
    item:{
        backgroundColor:"#F6F1E9",
        padding:15,
        marginLeft:10,
        borderRadius:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:10,
    },
    itemRight:{
        flex:1,
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
        borderRadius:5,
        padding:10
    },
  
  
  })
export default Entry