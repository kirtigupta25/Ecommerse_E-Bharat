import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
function myState(props) {
   const [mode,setMode]=useState('light');
  
   const toggleMode=()=>{
    if(mode=='light'){
        setMode('dark');
        document.body.style.backgroundColor='rgb(17, 24, 39)'; 
    }
    else{
        setMode('light');
            document.body.style.backgroundColor = 'white';
    }
   }

   const [loading,setLoading]=useState(false);
//************************************Add product section**************************** */
   const [products,setproducts]=useState({
    title:null,
    price:null,
    imageUrl:null,
    category:null,
    description:null,
    time:Timestamp.now(),
    date:new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
   })

   const addProduct=async()=>{
    if(products.title==null||products.price==null||products.imageUrl==null||products.category==null||products.description==null)
    {
      return toast.error("All fields are required")
    }
    //ab firestore me collection bnayge usse reference denge aur usme data bhejenge 
    const productRef=collection(fireDB,"products");
    setLoading(true) 
    try{
       await addDoc(productRef,products) ;//addDoc do parameter leta hai jo refence create kiya hai aur jo data add krvana chate hai 
       toast.success("Product Add Successfully")
       setTimeout(()=>{
        window.location.href="/dashboard"
       },800); //set timeout function kissi ko function ko delay krnvane ke liye use hota hai 
       getProductData() //product add krte hi render ho jay web par 
       closeModal()
       setLoading(false)
    }
    catch(error){
      console.log(error);
      setLoading(false)
    }
    setproducts("")
   }     //yhan tak ke steps sirf data database me store krne ke liye 

   //ab agge stored data ko nikalo aur web pr display krvao  

   const [product,setProduct]=useState([]);  //yeh ek array hoga jo sare product contain krega aur web pae show krega

   //get product 
   const getProductData=async()=>
   {
    setLoading(true)
    try{
      const q=query(collection(fireDB,"products"),orderBy("time"))  //query firebase function ahi jo collection mangta ha aur addition parameter agr dene ho to 
       const data=onSnapshot(q,(QuerySnapshot)=>
      {
        let productArray=[];
        QuerySnapshot.forEach((doc)=>{
          productArray.push({...doc.data(),id:doc.id});
        });
        setProduct(productArray)
        setLoading(false);
      });
      return ()=>data;
    }
    catch(error)
    {
      console.log(error)
      setLoading(false)
    }
   }

   const edithandle=(item)=>{
    setproducts(item)
   }
   //update product 
   const updateProduct =async(item)=>{
    setLoading(true)
    try {
      await setDoc(doc(fireDB,"products",products.id),products);
      toast.success("Product Updated Successfully");
      getProductData();
      setLoading(false);
      setTimeout(()=>{
        window.location.href='/dashboard'
      },800)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setproducts("")
   }

   const deleteProduct =async(item)=>{
    try{
      setLoading(true)
      await deleteDoc(doc(fireDB,"products",item.id));
      toast.success('Product Deleted Successfully')
      setLoading(false)
      getProductData()
    }catch(error)
    {
      console.log(error)
      setLoading(false)
    }
   }
   //*****************getting the order section ***************************/
   const [order, setOrder] = useState([]);

   const getOrderData = async () => {
     setLoading(true)
     try {
       const result = await getDocs(collection(fireDB, "orders"))
       const ordersArray = [];
       result.forEach((doc) => {
         ordersArray.push(doc.data());
         setLoading(false)
       });
       setOrder(ordersArray);
       console.log(ordersArray)
       setLoading(false);
     } catch (error) {
       console.log(error)
       setLoading(false)
     }
   }
 
   const [user,setUser]=useState([]);
   const getUserData =async()=>{
    setLoading(true)
    try{
      const result=await getDocs(collection(fireDB,"users"))
      const usersArray=[];
      result.forEach((doc)=>{
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    }
    catch(error)
    {
      console.log(error)
      setLoading(false)
    }
   }

   useEffect(()=>{
    getProductData();
    getOrderData();
    getUserData();
   },[]);  //render only once that why empty array is given

   //************filter logic here *************/
   const [searchkey, setSearchKey] = useState('')
   const [filterType, setFilterType] = useState('')
   const [filterPrice, setFilterPrice] = useState('')
  return (
    <MyContext.Provider value={{mode,toggleMode,loading,setLoading,products,setproducts,addProduct,product,edithandle,updateProduct,deleteProduct,order,user,searchkey, setSearchKey,filterType, setFilterType,
      filterPrice, setFilterPrice}}>
       {props.children}
    </MyContext.Provider>
  )
}

export default myState