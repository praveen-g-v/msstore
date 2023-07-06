import React,{useState,useEffect} from "react";
import { TextInput,View,Text,StyleSheet,Button,Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

/**
 * Need to remove the console log statement and if possible try to minize the size of the code and work on it
 *  Need to add product data functionalities to add ategorie function
 * 
 */

const Createproduct=({productCategories,productData,setProductData})=>{
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
        else{

        
        let newData=productCategories.filter((data)=>{
            if(data.toLowerCase().trim().match(search.toLowerCase().trim())){
                return data;
            }
        });
        ////console.log(newData);
        setData(newData);
    }
    },[search,productCategories]);

    

    const dropdown=(val)=>{
        ////console.log(val);
        setDrop(val);
        setExpanded(true);
        setSearch("");
        setData(productCategories);
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
                        setData(productCategories);
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
    //console.log(productCategories)
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
        ////console.log(val);
        setDropCategories(val);
        setDropCategoriesExpanded(true);
        setSearchCategories("");
        setSearchCategoriesData(productCategories);
    }
    useEffect(()=>{
        setSearchCategoriesData(productCategories);
    },[productCategories])

    useEffect(()=>{
        ////console.log("/////////Search "+productCategories)
        if(searchCategoriesData.length<=0||searchCategoriesData===null||searchCategoriesData===undefined){
            setSearchCategoriesData(productCategories);
        }
        else{
            let newData=productCategories.filter((data)=>{
                if(data.toLowerCase().trim().match(searchCategories.toLowerCase().trim())){
                    return data;
                }
            });
            ////console.log(newData);
            setSearchCategoriesData(newData);
        }
        
    },[searchCategories,productCategories]);
//Product 
/**
 * 
 * Needn to update the search product data with only the names of product data with additional inpu tof categories choosing
 * Choose categories then after that update the product data so we car searc through the product data ojk
 * productdata.product will be the array to go throught then add filter aftrer that update the product data 
 * then add a submit button to finish the product dat a then after that complete the remove product
 */
    const dropdownPro=(val)=>{
        
            ////console.log( val);
            setDropProductName(val);
            setDropProductNameExpanded(true);
            setSearchProduct("");
            setSearchProductData(productData);
        
        
    }
    useEffect(()=>{
        setSearchProductData(productData);
    },[productData])

    useEffect(()=>{
        if(searchProductData.length<=0||searchProductData===null||searchProductData===undefined){
            setSearchProductData(productData);
        }
        else{
        let newData=productData.filter((data)=>{
            if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
            if(data.product.toLowerCase().trim().match(searchProduct.toLowerCase().trim())){
                return data;
            }
        }
        });
        //console.log(newData);
        setSearchProductData(newData);
    }
    },[searchProduct,dropCategories]);





    const checkProductExpanded=()=>{
        
        if(dropCategories.length<1){
            Alert.alert("Please Select the Categories");
        }
        else{
            setDropProductName("");
            setDropProductNameExpanded(!dropCategoriesExpanded)

        }
        

    }
    const removezProduct=()=>{
        if(dropCategories.length<1){
            Alert.alert("Please select the categorie");
        }
        else if(dropProductName.length<1){
            Alert.alert("Please select the Product Name");
        }
        else{
            let pdata=productData.filter((data)=>{
                let c=false;
                if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
                if(data.product.toLowerCase().trim()===(dropProductName.toLowerCase().trim())){
                    c=true;
                }
            }
            if(!c){
                return data;
            }
            });
            ////console.log(pdata);
            setProductData(pdata);
            setDropProductName("");
            setDropCategoriesExpanded(true);
            setDropProductNameExpanded(true);
            setSearchCategories("");
            setSearchProduct("");
            setSearchCategoriesData(productCategories);
            setSearchProductData(productData);
            setDropCategories("");
        }
    }


    return (
        <View>
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

                
            </View>
            <View>
                <Text style={styles.txt}>Product Name</Text>
                {
                    dropProductNameExpanded?(<TouchableOpacity onPress={()=>{checkProductExpanded()}} style={styles.drop}>
                    {dropProductName.length<1?<Text>Select</Text>:<Text>{dropProductName}</Text>}
                    </TouchableOpacity>):
                    (
                        <View style={styles.minDrop}>
                            <TextInput 
                                placeholder="Search Categorie"
                                value={searchProduct}
                                style={styles.input}
                                onChangeText={setSearchProduct}    
                            />
                            {
                                searchProductData.length<1?(<Text>No Result</Text>):(
                                    searchProductData.map((data)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{dropdownPro(data.product)}} style={styles.drop} value={data} key={data.product}>
                                            <Text>{data.product}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                )
                            }
                        </View>
                    )
                }
            </View>
            <View style={styles.btn}>
                <Button  title="Submit" onPress={removezProduct} />
            </View>
        </View>
    )
}
const AddCategorie=({productCategories,setProductCategories})=>{
    const [pCategorie,setPCategorie]=useState("");
    const addCategorie=()=>{
        if(pCategorie.length<1){
            Alert.alert("Enter the Product Categories to be added")
        }
        else{
            setProductCategories([...productCategories,pCategorie]);
            setPCategorie("");
            Alert.alert("Added Product Categorie")
        }
    }
    return (
        <View>
            <Text style={styles.txt}>Product Categorie</Text>
            <TextInput 
                keyboardType="default"
                placeholder="Enter Product Categorie"
                value={pCategorie}
                style={styles.input}
                onChangeText={setPCategorie}    
            />
            <View style={styles.btn}>
                <Button  title="Submit" onPress={addCategorie} />
            </View>

        </View>
    )
}
const RemoveCategorie=({productCategories,setProductCategories,productData,setProductData})=>{
    const [dropCategories,setDropCategories]=useState("");
    const [dropCategoriesExpanded,setDropCategoriesExpanded]=useState(true);
    const [searchCategories,setSearchCategories]=useState("");
    const [searchCategoriesData,setSearchCategoriesData]=useState([]);

    const dropdownCat=(val)=>{
        ////console.log(val);
        setDropCategories(val);
        setDropCategoriesExpanded(true);
        setSearchCategories("");
        setSearchCategoriesData(productCategories);
    }
   

    useEffect(()=>{
        ////console.log("/////////Search "+productCategories)
        if(searchCategoriesData.length<=0||searchCategoriesData===null||searchCategoriesData===undefined){
            setSearchCategoriesData(productCategories);
        }
        else{
            let newData=productCategories.filter((data)=>{
                if(data.toLowerCase().trim().match(searchCategories.toLowerCase().trim())){
                    return data;
                }
            });
            ////console.log(newData);
            setSearchCategoriesData(newData);
        }
        
    },[searchCategories,productCategories]);

    const removesCategorie=()=>{
        if(dropCategories.length<1){
            Alert.alert("Selet the Categories");
        }
        else{
            let newC=productCategories.filter((data)=>{
                if(data.toLowerCase().trim()===(dropCategories.toLowerCase().trim())){
                    
                }
                else{
                    return data;
                }
            });
            let newP=productData.filter((data)=>{
                if(data.categorie.toLowerCase().trim()===(dropCategories.toLowerCase().trim())){
                    
                }
                else{
                    return data;
                }
            });
            setProductData(newP)
            setProductCategories(newC);
            setDropCategories("");
            setDropCategoriesExpanded(true);
            setSearchCategories("");
            setSearchCategoriesData(newC)
        }
    }

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
                <View style={styles.btn}>
                    <Button  title="Submit" onPress={removesCategorie} />
                </View>

                
            </View>
    )
}

const AddPrice=({productCategories,productData,setProductCategories,setProductData})=>{
    const [dropCategories,setDropCategories]=useState("");
    const [dropProductName,setDropProductName]=useState("");
    const [dropCategoriesExpanded,setDropCategoriesExpanded]=useState(true);
    const [dropProductNameExpanded,setDropProductNameExpanded]=useState(true);
    const [searchCategories,setSearchCategories]=useState("");
    const [searchProduct,setSearchProduct]=useState("");
    const [searchCategoriesData,setSearchCategoriesData]=useState([]);
    const [searchProductData,setSearchProductData]=useState([]);
    const [productPrice,setProductPrice]=useState("");
    //Search Editing
    const dropdownCat=(val)=>{
        
        ////console.log(val);
        setDropCategories(val);
        setDropCategoriesExpanded(true);
        setSearchCategories("");
        setSearchCategoriesData(productCategories);
    }
    useEffect(()=>{
        setSearchCategoriesData(productCategories);
    },[productCategories])

    useEffect(()=>{
        ////console.log("/////////Search "+productCategories)
        if(searchCategoriesData.length<=0||searchCategoriesData===null||searchCategoriesData===undefined){
            setSearchCategoriesData(productCategories);
        }
        else{

        
        let newData=searchCategoriesData.filter((data)=>{
            if(data.toLowerCase().trim().match(searchCategories.toLowerCase().trim())){
                return data;
            }
        });
        //console.log(searchCategoriesData);
        setSearchCategoriesData(newData);
    }
    },[searchCategories,productCategories]);
    useEffect(()=>{
        if(searchProductData.length<=0||searchProductData===null||searchProductData===undefined){
            setSearchProductData(productData);
        }
        else{
        let newData=productData.filter((data)=>{
            if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
            if(data.product.toLowerCase().trim().match(searchProduct.toLowerCase().trim())){
                return data;
            }
        }
        });
        //console.log(newData);
        setSearchProductData(newData);
    }
    },[searchProduct,dropCategories]);
    const dropdownPro=(val)=>{        
        //console.log( val);
        setDropProductName(val);
        setDropProductNameExpanded(true);
        setSearchProduct("");
        //console.log(productData)
        setSearchProductData(productData);    
    }
    useEffect(()=>{
        setSearchProductData(productData);
    },[productData])

    useEffect(()=>{
        if(searchProductData.length<=0||searchProductData===null||searchProductData===undefined){
            setSearchProductData(productData);
        }
        else{
        let newData=productData.filter((data)=>{
            if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
            if(data.product.toLowerCase().trim().match(searchProduct.toLowerCase().trim())){
                return data;
            }
        }
        });
        //console.log(newData);
        setSearchProductData(newData);
    }
    },[searchProduct,productData]);
    const checkProductExpanded=()=>{
        
        if(dropCategories.length<1){
            Alert.alert("Please Select the Categories");
        }
        else{
            setDropProductName("");
            setDropProductNameExpanded(!dropCategoriesExpanded)

        }
        

    }
    const addPrice=()=>{
        if(dropCategories.length<1){
            Alert.alert("Please select the categorie");
        }
        else if(dropProductName.length<1){
            Alert.alert("Please select the Product Name");
        }
        else if(productPrice.length<1){
            Alert.alert("Please Enter the Product Price");
        }
        else{
            //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            //console.log(productData)
            let pdata=productData.map((data)=>{
                if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
                    if(data.product.toLowerCase().trim()===(dropProductName.toLowerCase().trim())){
                        data.prices=[...data.prices,productPrice];
                        //console.log(data)
                    }
                }
                return data;
            });
            //console.log(pdata);
            setProductData(pdata);
            setDropProductName("");
            setDropCategoriesExpanded(true);
            setDropProductNameExpanded(true);
            setSearchCategories("");
            setSearchProduct("");
            setProductPrice("");
            setSearchCategoriesData(productCategories);
            setSearchProductData(productData);
            setDropCategories("");
        }
    }


    return (
        <View>
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

                
            </View>
            <View>
                <Text style={styles.txt}>Product Name</Text>
                {
                    dropProductNameExpanded?(<TouchableOpacity onPress={()=>{checkProductExpanded()}} style={styles.drop}>
                    {dropProductName.length<1?<Text>Select</Text>:<Text>{dropProductName}</Text>}
                    </TouchableOpacity>):
                    (
                        <View style={styles.minDrop}>
                            <TextInput 
                                placeholder="Search Categorie"
                                value={searchProduct}
                                style={styles.input}
                                onChangeText={setSearchProduct}    
                            />
                            {
                                searchProductData.length<1?(<Text>No Result</Text>):(
                                    searchProductData.map((data)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{dropdownPro(data.product)}} style={styles.drop} value={data} key={data.product}>
                                            <Text>{data.product}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                )
                            }
                        </View>
                    )
                }
            </View>
            <Text style={styles.txt}>Product Price</Text>
            <TextInput 
            keyboardType="number-pad"
                placeholder="Enter Product Price"
                value={productPrice}
                style={styles.input}
                onChangeText={setProductPrice}    
            />
            <View style={styles.btn}>
                <Button  title="Submit" onPress={addPrice} />
            </View>
        </View>
    )
}


const RemovePrice=({productCategories,productData,setProductCategories,setProductData})=>{
    const [dropCategories,setDropCategories]=useState("");
    const [dropProductName,setDropProductName]=useState("");
    const [dropProductPrice,setDropProductPrice]=useState("");
    const [dropCategoriesExpanded,setDropCategoriesExpanded]=useState(true);
    const [dropProductNameExpanded,setDropProductNameExpanded]=useState(true);
    const [dropProductPriceExpanded,setDropProductPriceExpanded]=useState(true);
    const [searchCategories,setSearchCategories]=useState("");
    const [searchProduct,setSearchProduct]=useState("");
    const [searchCategoriesData,setSearchCategoriesData]=useState([]);
    const [searchProductData,setSearchProductData]=useState([]);
    const [searchProductPriceData,setSearchProductPriceData]=useState([]);
    //Search Editing
    const dropdownCat=(val)=>{
        //console.log(val);
        setDropCategories(val);
        setDropCategoriesExpanded(true);
        setSearchCategories("");
        setSearchCategoriesData(productCategories);
    }
    useEffect(()=>{
        setSearchCategoriesData(productCategories);
    },[productCategories])

    useEffect(()=>{
        //console.log("/////////Search "+productCategories)
        if(searchCategoriesData.length<=0||searchCategoriesData===null||searchCategoriesData===undefined){
            setSearchCategoriesData(productCategories);
        }
        else{

        
        let newData=searchCategoriesData.filter((data)=>{
            if(data.toLowerCase().trim().match(searchCategories.toLowerCase().trim())){
                return data;
            }
        });
        //console.log(newData);
        setSearchCategoriesData(newData);
    }
    },[searchCategories]);

    const dropdownPro=(val)=>{        
        //console.log("##############################"+ val.prices);
        setDropProductName(val.product);
        setDropProductNameExpanded(true);
        setSearchProduct("");
        setSearchProductData(productData);
        setSearchProductPriceData(val.prices);
    }

     const dropdownPrice =(val)=>{        
        setDropProductPrice(val);
        setDropProductPriceExpanded(true);
    }
    useEffect(()=>{
        setSearchProductData(productData);
    },[productData])

    

    useEffect(()=>{
        if(searchProductData.length<=0||searchProductData===null||searchProductData===undefined){
            setSearchProductData(productData);
        }
        else{
        let newData=productData.filter((data)=>{
            if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
            if(data.product.toLowerCase().trim().match(searchProduct.toLowerCase().trim())){
                return data;
            }
        }
        });
        //console.log(newData);
        setSearchProductData(newData);
    }
    },[searchProduct,dropCategories]);
    const checkProductExpanded=()=>{
        
        if(dropCategories.length<1){
            Alert.alert("Please Select the Categories");
        }
        else{
            setDropProductName("");
            setDropProductNameExpanded(!dropCategoriesExpanded)

        }
    }
    const checkProductPriceExpanded=()=>{
        if(dropProductName.length<1){
            Alert.alert("Please Select the Categories");
        }
        else{
            setDropProductPrice("");
            setDropProductPriceExpanded(!dropProductPriceExpanded)

        }
    }
    const removePrice=()=>{
        if(dropCategories.length<1){
            Alert.alert("Please select the categorie");
        }
        else if(dropProductName.length<1){
            Alert.alert("Please select the Product Name");
        }
        else if(dropProductPrice.length<1){
            Alert.alert("Please Enter the Product Price");
        }
        else if(searchProductPriceData.length<=1){
            Alert.alert("You cannot delete the last Price");
            setDropProductName("");
            setDropCategoriesExpanded(true);
            setDropProductNameExpanded(true);
            setSearchCategories("");
            setSearchProduct("");
            setSearchCategoriesData(productCategories);
            setSearchProductData(productData);
            setDropCategories("");
            setSearchProductPriceData([]);
            setDropProductPriceExpanded(true);
            setDropProductPrice("");
        }
        else{
            //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            let newPrice=searchProductPriceData.filter((data)=>{
                if(!(data===dropProductPrice)){
                    return data;
                }
            })
            let pdata=productData.map((data)=>{
                if(data.categorie.toLowerCase().trim().match(dropCategories.toLowerCase().trim())){
                    if(data.product.toLowerCase().trim()===(dropProductName.toLowerCase().trim())){
                        data.prices=newPrice;
                    }
                }
                return data;
            });
            //console.log(pdata);
            setProductData(pdata);
            setDropProductName("");
            setDropCategoriesExpanded(true);
            setDropProductNameExpanded(true);
            setSearchCategories("");
            setSearchProduct("");
            setSearchCategoriesData(productCategories);
            setSearchProductData(productData);
            setDropCategories("");
            setSearchProductPriceData([]);
            setDropProductPriceExpanded(true);
            setDropProductPrice("");
        }
    }


    return (
        <View>
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

                
            </View>
            <View>
                <Text style={styles.txt}>Product Name</Text>
                {
                    dropProductNameExpanded?(<TouchableOpacity onPress={()=>{checkProductExpanded()}} style={styles.drop}>
                    {dropProductName.length<1?<Text>Select</Text>:<Text>{dropProductName}</Text>}
                    </TouchableOpacity>):
                    (
                        <View style={styles.minDrop}>
                            <TextInput 
                                placeholder="Search Categorie"
                                value={searchProduct}
                                style={styles.input}
                                onChangeText={setSearchProduct}    
                            />
                            {
                                searchProductData.length<1?(<Text>No Result</Text>):(
                                    searchProductData.map((data)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{dropdownPro(data)}} style={styles.drop} value={data} key={data.product}>
                                            <Text>{data.product}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                )
                            }
                        </View>
                    )
                }
            </View>
            <View>
                <Text style={styles.txt}>Product Price</Text>
                {
                    dropProductPriceExpanded?(<TouchableOpacity onPress={()=>{checkProductPriceExpanded()}} style={styles.drop}>
                    {dropProductPrice.length<1?<Text>Select</Text>:<Text>{dropProductPrice}</Text>}
                    </TouchableOpacity>):
                    (
                        <View style={styles.minDrop}>
                            <View style={styles.input} > 
                            <Text>Select Product Price</Text>  
                            </View>
                            {
                                searchProductPriceData.length<1?(<Text>No Result</Text>):(
                                    searchProductPriceData.map((data)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>{dropdownPrice(data)}} style={styles.drop} value={data} key={data}>
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
            <View style={styles.btn}>
                <Button  title="Submit" onPress={removePrice} />
            </View>
        </View>
    )
}

const ProductEdit=({productCategories,productData,setProductCategories,setProductData})=>{
   //console.log(productData);
    return (<>
    {
        (productCategories.length<=0||productCategories===null||productCategories===undefined||productData.length<=0||productData===null||productData===undefined)?(<Text>Loading data</Text>):
    
        (<ScrollView>
        <View style={styles.cont}>
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Add Product</Text>
            </View>
            <Createproduct productCategories={productCategories} productData={productData} setProductCategories={setProductCategories} setProductData={setProductData} />
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Remove Product</Text>
            </View>
            <Removeproduct productCategories={productCategories} productData={productData} setProductCategories={setProductCategories} setProductData={setProductData} />
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Add Categorie</Text>
            </View>
            <AddCategorie productCategories={productCategories} setProductCategories={setProductCategories} />
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Remove Categorie</Text>
            </View>
            <RemoveCategorie productCategories={productCategories} setProductCategories={setProductCategories} productData={productData} setProductData={setProductData}/>
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Add Price</Text>
            </View>
            <AddPrice productCategories={productCategories} productData={productData}  setProductData={setProductData} />
            <View style={styles.head}>
                <Text style={styles.mainTxt}>Remove Price</Text>
            </View>
            <RemovePrice productCategories={productCategories} productData={productData}  setProductData={setProductData} />
        
        </View>
        </ScrollView>)}
        </>
        
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