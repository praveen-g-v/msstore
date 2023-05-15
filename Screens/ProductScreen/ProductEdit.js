import React,{useState,useEffect} from "react";
import { TextInput,View,Text,StyleSheet,Button,Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {addNewProduct,getProduct,getCategories,updateProductCategories,updateProductData} from "../Firebase/firebase"
//Need to CRUD Create Update and delete operation for the List of Items
//creating createproduct

const Createproduct=({productCategories,productData,setProductCategories,setProductData})=>{
    const [pname,setPname]=useState("");
    const [price,setPrice]=useState("");
    const [expanded,setExpanded]=useState(true);
    const [search,setSearch]=useState("");
    const [data,setData]=useState([]);
    const [drop,setDrop]=useState("");
    
    

    useEffect(()=>{
        if(search.length<=0||search===null||search===undefined){
            setData(productCategories);
        }
        let newData=productCategories.filter((data)=>{
            if(data.toLowerCase().trim().match(search.toLowerCase().trim())){
                return data;
            }
        });
        console.log(newData);
        setData(newData);
    },[search,productCategories]);

    

    const dropdown=(val)=>{
        console.log(val);
        setDrop(val);
        setExpanded(true);
        setSearch("");
        setData(categories);
    }
    function addProduct(){
        if(pname.trim().length>0){
            if(price.length>0){
                if(price>0){
                    if(drop.length>0){
                        setProductData([...productData,{
                            
                                product:pname,
                                prices: [price],
                                categorie:drop
                              
                        }])
                        setDrop("");
                        setExpanded(true);
                        setSearch("");
                        setData(categories);
                        setPname("");
                        setPrice("");

                    }
                    else{
                        Alert.alert("Choose the categorie")
                    }

                }
                else{
                    Alert.alert("Enter a valid Price");
                }

            }
            else{
                Alert.alert("Enter price of the product");
            }
        }
        else{
            Alert.alert("Enter the Product name");
        }
        
    }
    return (
        <View>
            
            <Text style={styles.txt}>Product Name</Text>
            <TextInput 
                placeholder="Enter Product Name"
                value={pname}
                style={styles.input}
                onChangeText={setPname}    
            />
            <Text style={styles.txt}>Product Price</Text>
            <TextInput 
            keyboardType="number-pad"
                placeholder="Enter Product Price"
                value={price}
                style={styles.input}
                onChangeText={setPrice}    
            />
            <Text style={styles.txt}>Categories</Text>
            {
                expanded?
                (<TouchableOpacity onPress={()=>{setDrop("");setExpanded(!expanded)}} style={styles.drop}>
                {drop.length<1?<Text>Select</Text>:<Text>{drop}</Text>}
                </TouchableOpacity>):
                (
                    <View style={styles.minDrop}>
                        <TextInput 
                            placeholder="Search Categorie"
                            value={search}
                            style={styles.input}
                            onChangeText={setSearch}    
                        />
                        {
                            data.length<1?(<Text>No Result</Text>):(
                            data.map((data)=>{
                                return(
                                    <TouchableOpacity onPress={()=>{dropdown(data)}} style={styles.drop} value={data} key={data}>
                                        <Text>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            )
                        }
                    </View>
                )
            }
            <View style={styles.btn}>
                <Button  title="Submit" onPress={addProduct} />
            </View>
            
      
        </View>
    )
}

const Removeproduct=({productCategories,productData,setProductCategories,setProductData})=>{
    const [dropCategories,setDropCategories]=useState("");
    const [dropProductName,setDropProductName]=useState("");
    const [dropCategoriesExpanded,setDropCategoriesExpanded]=useState(true);
    const [dropProductNameExpanded,setDropProductNameExpanded]=useState(true);
    const [searchCategories,setSearchCategories]=useState("");
    const [searchProduct,setSearchProduct]=useState("");
    const [searchCategoriesData,setSearchCategoriesData]=useState([]);
    const [searchProductData,setSearchProductData]=useState([]);
    //Search Editing
    const dropdownCat=(val)=>{
        console.log(val);
        setDropCategories(val);
        setDropCategoriesExpanded(true);
        setSearchCategories("");
        setSearchCategoriesData(productCategories);
    }
    useEffect(()=>{
        setSearchCategoriesData(productCategories);
    },[productCategories])

    useEffect(()=>{
        console.log("/////////Search "+productCategories)
        if(searchCategoriesData.length<=0||searchCategoriesData===null||searchCategoriesData===undefined){
            setSearchCategoriesData(productCategories);
        }
        let newData=searchCategoriesData.filter((data)=>{
            if(data.toLowerCase().trim().match(searchCategories.toLowerCase().trim())){
                return data;
            }
        });
        console.log(newData);
        setSearchCategoriesData(newData);
    },[searchCategories]);
//Product 
/**
 * 
 * Needn to update the search product data with only the names of product data with additional inpu tof categories choosing
 * Choose categories then after that update the product data so we car searc through the product data ojk
 * productdata.product will be the array to go throught then add filter aftrer that update the product data 
 * then add a submit button to finish the product dat a then after that complete the remove product
 */
    const dropdownPro=(val)=>{
        if(dropCategories.length<1){
            Alert.alert("Choose Product Categorie");
        }
        else{
            console.log(val);
            setDropProductName(val);
            setDropProductNameExpanded(true);
            setSearchProduct("");
            setSearchProductData(productData);
        }
        
    }
    useEffect(()=>{
        setSearchProductData(productData);
    },[productData])

    useEffect(()=>{
        console.log("/////////Search "+productData)
        if(searchProductData.length<=0||searchProductData===null||searchProductData===undefined){
            setSearchProductData(productData);
        }
        let newData=searchProductData.filter((data)=>{
            if(data.toLowerCase().trim().match(searchProduct.toLowerCase().trim())){
                return data;
            }
        });
        console.log(newData);
        setSearchProductData(newData);
    },[searchProduct]);


    return (
        <View>
            <Text style={styles.txt}>Categories</Text>
            {
                dropCategoriesExpanded?(<TouchableOpacity onPress={()=>{setDropCategories("");setDropCategoriesExpanded(!dropCategoriesExpanded)}} style={styles.drop}>
                {dropCategories.length<1?<Text>Select</Text>:<Text>{dropCategories}</Text>}
                </TouchableOpacity>):
                (
                    <View style={styles.minDrop}>
                        <TextInput 
                            placeholder="Search Categorie"
                            value={searchCategories}
                            style={styles.input}
                            onChangeText={setSearchCategories}    
                        />
                        {
                            searchCategoriesData.length<1?(<Text>No Result</Text>):(
                                searchCategoriesData.map((data)=>{
                                return(
                                    <TouchableOpacity onPress={()=>{dropdownCat(data)}} style={styles.drop} value={data} key={data}>
                                        <Text>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            )
                        }
                    </View>
                )
            }

            <Text style={styles.txt}>Product</Text>
            {
                dropCategoriesExpanded?(<TouchableOpacity onPress={()=>{setDropCategories("");setDropCategoriesExpanded(!dropCategoriesExpanded)}} style={styles.drop}>
                {dropCategories.length<1?<Text>Select</Text>:<Text>{dropCategories}</Text>}
                </TouchableOpacity>):
                (
                    <View style={styles.minDrop}>
                        <TextInput 
                            placeholder="Search Categorie"
                            value={searchCategories}
                            style={styles.input}
                            onChangeText={setSearchCategories}    
                        />
                        {
                            searchCategoriesData.length<1?(<Text>No Result</Text>):(
                                searchCategoriesData.map((data)=>{
                                return(
                                    <TouchableOpacity onPress={()=>{dropdownPro(data)}} style={styles.drop} value={data} key={data}>
                                        <Text>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            )
                        }
                    </View>
                )
            }

        </View>
    )
}

const ProductEdit=()=>{
    /**
     * After Completeing the remove product then go to add categorie and remove categorie 
     * After  the remove categorie go to adding price then after adding price then remove price of product
     * 
     * After these steps we can stop
     */
    const [productData,setProductData]=useState([]);
    const [productCategories,setProductCategories]=useState([]);
    useEffect(()=>{
        console.log("Outside",productData)
       
        if(productData.length<1){
            //get the product Data through firebase
            getProduct().then((data)=>{
                console.log("Provided data :"+data.products);
                setProductData(data.products);
            })
        }
        else{console.log(productData)
            updateProductData(productData);
        }
    },[productData]);
    useEffect(()=>{
        console.log("Outside",productCategories)
        if(productCategories.length<1){
            getCategories().then((data)=>{
                            console.log("Provided data :"+data.categories);
                            setProductCategories(data.categories)
                        })
        }
        
        else{console.log(productCategories)
            updateProductCategories(productCategories)
        }
    },[productCategories])

    return (
        <ScrollView>
        <View style={styles.cont}>
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Add Product</Text>
            </View>
            <Createproduct productCategories={productCategories} productData={productData} setProductCategories={setProductCategories} setProductData={setProductData} />
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Remove Product</Text>
            </View>
            <Removeproduct productCategories={productCategories} productData={productData} setProductCategories={setProductCategories} setProductData={setProductData} />
        </View>
        </ScrollView>
    )
}




export default ProductEdit;


const styles=StyleSheet.create({
    head:{
        backgroundColor:"yellow"
    },
    mainTxt:{
        margin:5,
        fontWeight:"600",
        fontSize:18,
        backgroundColor:"yellow"
    },
    txt:{
        margin:5,
        fontWeight:"500",
        fontSize:15
    },
    btn:{
        margin:15,
    },
    cont:{
        backgroundColor:"#BFACE2",
        padding:3,
        height:5000

    },
    input:{
        height:35,
        backgroundColor:"#FFFFFF",
        padding:5,
        borderRadius:5,
        margin:5,
        
    },
    drop:{
        height:35,
        backgroundColor:"#FFFFFF",
        padding:7,
        marginLeft:3,
        marginRight:3,
        borderRadius:5,
        borderColor:"#sdfg",
        borderWidth:1,
    },
    minDrop:{
        backgroundColor:"#FFFFFF",
    }
})