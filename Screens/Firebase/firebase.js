import { initializeApp } from "firebase/app";
import { Alert } from "react-native";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword   } from "firebase/auth";
import { setDoc, doc,onSnapshot,getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

var data={};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);
var uid="";

const updateProductData =async (data)=>{
  uid="Oe6yj03MwLTbOWgSNdxh5uMFKFh1";
  var pid=uid+"_products";
  const docRef = doc(db, uid, pid);
  await setDoc(docRef,
    {
      products:data
     }
  ).then(()=>{
    return true;
   })
  
}
const updateProductCategories =async (data)=>{
  uid="Oe6yj03MwLTbOWgSNdxh5uMFKFh1";
  var cid=uid+"_categories";
  const docRef = doc(db, uid, cid);
  await setDoc(docRef,{categories:["biscuit","shampoo"]}).then(()=>{
    return true;
   })
  
}

const getCategories=async ()=>{
  uid="Oe6yj03MwLTbOWgSNdxh5uMFKFh1";
  var cid=uid+"_categories";
  const docRef = doc(db, uid, cid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
     await setDoc(doc(db,uid,cid),{
      categories:["biscuit","shampoo"]
     })
  }
}

const getProduct= async ()=>{
  uid="Oe6yj03MwLTbOWgSNdxh5uMFKFh1";
  var pid=uid+"_products";
  const docRef = doc(db, uid, pid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } 
  else {
    console.log("//////////////////settting up product data")
     await setDoc(doc(db,uid,pid),{
      products:[{
        product:"ParleG",
        prices:[10,20],
        categorie:"biscuit"
      }]
     })
  }

}

const addNewProduct=async(categories,name,price)=>{
  uid="Oe6yj03MwLTbOWgSNdxh5uMFKFh1";
  const key=name+"@"+price;
  const uidb=uid+"_categories";
  var currData=null;
  onSnapshot(doc(db, uid,uidb), (doc) => {
    console.log("Current data: ", doc.data());
    currData=doc.data().product;
     data={product:[{
      key:key,
      product:name,
      price:price
    }]}
    
  }).then(()=>{
    console.log("data is finished")
  })
    


  Alert.alert("Adding new Product");
}

const createNewUser=async (email, password)=>{
  await createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
      uid=userCredential.user.uid;
      Alert.alert("registered Successfully  "+uid);
  
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode==="auth/email-already-in-use"){
      Alert.alert("Email Already registered");
    }
    else{
      Alert.alert("Unknown error");
    }
  });
}

const signInUser=async(email, password,navigation)=>{
  await signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
    uid=user.uid;
    console.log("Signed in");
    await setDoc(doc(db, uid, "LA"), {
      name:"name"
    }).then(()=>{
      console.log("Updated Dactabase")
      navigation.replace('Rediret',{screen:'Home'});
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode==="auth/wrong-password"){
      Alert.alert("Wrong Password");
    }
    if(errorCode==="auth/user-not-found"){
      Alert.alert("Email is not registered");
    }
    if(errorCode==="auth/too-many-requests"){
      Alert.alert("Try again Later");
    }
    console.log(errorCode)
    return {
      status:"failed",
      errorCode:errorCode,
      errorMessage:errorMessage
    }
  });
}


export {createNewUser,signInUser,addNewProduct,getProduct,getCategories,updateProductData,updateProductCategories}



