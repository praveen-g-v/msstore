import React, { useEffect,useState } from "react";
import {Text,Button} from "react-native"
import { getDocs, collection, getFirestore } from "firebase/firestore"; 
import { initializeApp,getApps, getApp } from "firebase/app";
import { log } from "react-native-reanimated";
const firebaseConfig = {
    apiKey: "AIzaSyDUOGJwQCs53EQqiL5hgfX_oTrrmsTjtrE",
    authDomain: "ms-store-e58cf.firebaseapp.com",
    projectId: "ms-store-e58cf",
    storageBucket: "ms-store-e58cf.appspot.com",
    messagingSenderId: "1038425010642",
    appId: "1:1038425010642:web:475aec495efdbc25dc980b",
    measurementId: "G-W0GX9055RG"
};
const app=getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db=getFirestore(app);
const Report =()=>{
    const [data,setData]=useState([]);
    const [refresh,setRefreshed]= useState(true);
    useEffect(()=>{
        const getWeek=function(day){
            let week=Math.ceil(day/6);
            return week;
        }
        async function getData(){ 
            await getDocs(collection(db, "sample")).then((querySnapshot)=>{
                let sample=querySnapshot.docs.map(doc=>({
                    date:doc.data().date,
                    key:doc.data().key,
                    count:doc.data().count,
                    product:doc.data().product,
                }));
                let months=[];
                sample.map((d)=>{
                    if(months.length===0){
                        months=[{month:d.date.month,products:[{product:d.product,keys:[{key:d.key,count:d.count}]}]}];
                    }
                    else{
                        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Adding new month/////////////////////////////////");
                        console.log(months);
                        let nmonth=true;
                        let mon=months.map((mo)=>{
                            if(mo.month===d.date.month){
                                nmonth=true;
                                let nproduct=true;
                                console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Adding new Product/////////////////////////////////");
                                console.log(mo.products);
                                let pro=mo.products.map((pr)=>{
                                    if(pr.product===d.product){
                                        nproduct=false;
                                        let nkey=true;
                                        console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\Adding new Key/////////////////////////////////");
                                        console.log(pr.keys);
                                        let key=pr.keys.map((ke)=>{
                                            if(ke.key===d.key){
                                                nkey=false;
                                                return {key:ke.key,count:ke.count+d.count};   
                                            }
                                            return {key:ke.key,count:ke.count}
                                            
                                        })
                                        console.log("////////////////////////////////////////After Adding key\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                                        console.log(key);
                                        if(nkey){
                                            return [...key,{key:data.key,count:data.count}]
                                        }
                                    }
                                })
                                console.log("////////////////////////////////////////After Adding Product\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                                console.log(pro);
                                if(nproduct){
                                    return [...pro,{product:data.product,keys:[{key:data.key,count:data.count}]}]
                                }
                                
                            }
                        })
                        if(nmonth){
                            months=[...mon,{month:data.date.month,products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]
                        }
                        else{
                            months=mon;
                        }
                        console.log("////////////////////////////////////////After Adding Month\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
                        console.log(months);
                    }
                })
                
                








            // let year=[];
            // sample.map((data)=>{

            //     if(year.length===0){
            //         year=[{year:data.date.year,months:[{month:data.date.month,weeks:[{week:data.date.week,products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}]}]
            //     }
            //     else{
            //         let cyear=true;
            //         year=year.map((ye)=>{
            //             if(data.date.year===ye.year){
            //                 cyear=true;
            //                 //Year exist so checking for month
            //                 let cmonth=true;
                            
            //                 let mon=ye.months.map((mo)=>{
            //                     console.log(mo);
            //                     if(mo.month===data.date.month){
            //                         cmonth=true;
            //                         let cweek=true;
            //                         let week=mo.weeks.map((we)=>{
            //                             if(we.week===data.date.week){
            //                                 cweek=true;
            //                                 let cproduct=true;
            //                                 let product=we.products.map((pro)=>{
            //                                     if(pro.product===data.product){
            //                                         cproduct=true;
            //                                         let ckey=true;
            //                                         let key=pro.keys.map((ke)=>{
            //                                             if(ke.key===data.key){
            //                                                 ckey=true;
            //                                                 return {key:ke.key,count:ke.count+data.count};
            //                                             }
            //                                             else{
            //                                                 ckey=false;
            //                                             }
            //                                             return {key:ke.key,count:ke.count};
            //                                         })
            //                                         if(!ckey){
            //                                             return {keys:key,keys:[{key:data.key,count:data.count}]};
            //                                         }
            //                                         return {keys:key,product:pro.product};
            //                                     }
            //                                     else{
            //                                         cproduct=false;
            //                                     }
            //                                 })
            //                                 if(!cproduct){
            //                                     return {products:product,week:we.week};
            //                                 }
            //                                 return {products:product,products:[{product:data.product,keys:[{key:data.key,count:data.count}]}],week:we.week};
            //                             }
            //                             else{
            //                                 cweek=false;
            //                             }
            //                         })
            //                         if(!cweek){
            //                             return {weeks:[...week,{weeks:[{week:data.date.week,products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}],month:mo.month}
            //                         }
            //                         return {weeks:week,month:mo.month}
            //                     }
            //                     else{
            //                         cmonth=false;

            //                     }
                                
            //                 })
                            
            //                 if(!cmonth){
            //                     return {months:[...mon,{month:data.date.month,weeks:[{week:data.date.week,products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}],year:ye.year};
            //                 }
                            
            //                 return {months:mon,year:ye.year};
            //                 //return {months:mon};
            //                 //return ye;
            //             }
            //             else{
            //                 cyear=false;
            //             }
                        
            //         })
            //         if(!cyear){
            //             year=[...year,{year:data.date.year,months:[{month:data.date.month,weeks:[{week:data.date.week,products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}]}]
            //         }
            //     }
            //     console.log("//////////////////////////////////////////////////////////////////");
            //     console.log(year);







                // if(week.length===0){
                //     week=[{products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}];
                // }
                // else{
                //     console.log("Adding Week");
                //     console.log(week);
                //     let newWeek=false;


                //     week=week.map((al)=>{
                        
                //         console.log(al);
                //         al.products.map((val)=>{
                //             let pro=[];
                //         console.log("Adding Product");
                //         if(val.product===data.product){
                //             let AddAnoKey=[];
                //             let checkAddKey=false;
                //             pro=[{products:val.keys.map((newKey)=>{
                //                 console.log("Adding Key");
                //                 console.log(newKey)
                //                 let key=[];
                //                 if(newKey.key===data.key){
                //                     key=[{count:newKey.count+data.count,key:data.key}]
                //                 }
                //                 else{
                //                     checkAddKey=true;
                //                     AddAnoKey=[{count:data.count,key:data.key}]
                //                     return {keys:newKey,product:val.product}

                //                 }
                //                 console.log("After adding Key");
                //                 console.log(key)
                //                 return {keys:key,product:val.product}
                //             })}];
                //             if(checkAddKey){
                //                 console.log(pro.keys)
                //                // pro.keys=[...pro.keys,AddAnoKey]
                //             }
                            
                //         }
                //         else{

                //         }
                //         console.log("After adding Product");
                //         console.log(pro)
                //     })
                //     })
                //     console.log("After Adding Week")
                //     console.log(week);
                // }
                // if(month===[]||month===undefined||month==null){
                    
                // }
                // if(year===[]||year===undefined||year==null){
                    
                // }
            //})

            console.log(sample);
        })
    }
     getData();
     },[refresh])

    // useEffect(()=>{
    //     const weekDay=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    //     const date=new Date();
    //     // data.map((data)=>{
    //     //     console.log(date.getMonth()-data.date.toDate().getMonth());
    //     // })
        // const getWeek=function(day){
        //     let week=Math.ceil(day/6);
        //     return week;
        // }
    //     if(data.length!==0||data!==undefined){
    //         console.log(data);
    //         let newData=[];
    //         data.map((data)=>{
    //             //.date=data.date.getDate();
    //            // onsole.log(date.getMonth()-data.date.toDate().getMonth());
    //            console.log(newData===0);
    //            if(newData.length===0||newData===[]){
    //             console.log(data);
    //             console.log("adding newData");
    //             newData=[{years:[{year:data.date.year,months:[{month:data.date.month,weeks:[{week:getWeek(data.date.day),products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}]}]}]
    //             //setYear([{year:year,product:[{name:data.product,key:[{name:key,count:count}]}]}])
    //             console.log(newData)
    //            }
    //            else{
    //             console.log("///////////////////////////////////////////////////////////////");
    //             console.log(newData);
    //             newData.map((val)=>{
    //                 console.log(data);
    //                 console.log(val.years)
    //             val.years=val.years.map((newYear)=>{
    //                 let ye=[];
    //                 if(newYear.year===data.date.year){
    //                     ye.months=newYear.months.map((newMonth)=>{
    //                         let mon={"months":[],"month":newMonth.product}
    //                         if(newMonth.month===data.date.month){
    //                             mon.months=newMonth.weeks.map((newWeeks)=>{
    //                                 let we={"weeks":[],"week":newWeeks.week};
    //                                 if(newWeeks.week===getWeek(data.date.day)){
    //                                     we.weeks=newWeeks.products.map((newPro)=>{
    //                                         let pro={"products":[],"product":newPro.product};
    //                                         console.log(newPro)
    //                                         if(newPro.product===data.product){
    //                                             console.log(newPro.keys)
    //                                             pro.products=newPro.keys.map((newKey)=>{
    //                                                 let k={"keys":[]}
    //                                                 if(newKey.key===data.key){
    //                                                     newKey.count=newKey.count+data.count;
    //                                                     console.log("Updating Key New Key");
    //                                                     console.log(newKey);
    //                                                     k.keys=[{key:data.key,count:newKey.count+data.count}]
    //                                                     console.log(newKey);
    //                                                 }
    //                                                 else{
    //                                                     console.log("Adding New Key");
    //                                                     console.log(newKey);
    //                                                     k.keys=[...newKey,{key:data.key,count:data.count}]
    //                                                     console.log(newKey);
    //                                                 }
    //                                                 return k;
    //                                             })
    //                                             console.log("Keyyyyyyyyyyssss")
    //                                             console.log(pro)
                                                
    //                                         }
    //                                         else{
    //                                             pro.products=[...newPro,{product:data.product,keys:[{key:data.key,count:data.count}]}]
    //                                         }
    //                                         console.log("Product");
    //                                         console.log(pro);
    //                                         return pro;
    //                                     })

    //                                 }
    //                                 else{
    //                                     we.weeks=[...newWeeks,{week:getWeek(data.date.day),products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]
    //                                 }
    //                                 console.log(we);
    //                                 return we;
    //                             })

    //                         }
    //                         else{
    //                             mon=[...newMonth,{month:data.date.month,weeks:[{week:getWeek(data.date.day),products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}]
    //                         }
    //                         return mon;
    //                     })
    //                     console.log("Months/////////////")
    //                     console.log(newYear.months)

    //                 }
    //                 else{
    //                     ye=[...newYear,{year:data.date.year,months:[{month:data.date.month,weeks:[{week:getWeek(data.date.day),products:[{product:data.product,keys:[{key:data.key,count:data.count}]}]}]}]}]
    //                 }
    //                 return ye
    //             })
    //         })
    //         console.log("/////////////////////////////////////////////////////////////////[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
    //             console.log(newData)
                
    //            }

               
    //            console.log(date.toUTCString().substring(0,3))
    //         })
    //     }
        


    // },[data])
    return (
        <>
        <Text>
           Report
           <Button title={"Filter"}/>
        </Text>
        </>
    )
}

export default Report;