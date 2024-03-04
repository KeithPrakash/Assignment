import React, { useEffect, useMemo, useState } from 'react'
import axios from '../axios/instants'

const AdminHome = () => {
  const [fetched, setFetched] =useState<Array | null> (null)
useEffect(()=>{

  const  fetchData = async() => {
  
    try{
         const response= await axios.get('/user/getUsers')
         console.log(response)
         setFetched(response.data.data);
         console.log(fetched)
    }
    catch(e){
      console.log(e,"fetch error")
    }
  }
  
   fetchData()
  
  },[])
  

  const filteredUsers = useMemo(() => {
    return fetched?.filter((item: any) => {
      return item.role === 'user';
    });
  }, [fetched]);


  const deleteUser = async (userId: string) => {
    try {
    
            const response= await axios.delete(`/user/deleteUser/${userId}`);
              
        console.log(response)    
        setFetched((prevUsers) => prevUsers?.filter((user) => user._id !== userId) || null);
    } catch (error) {
      console.error('Error deleting user:', error);
    
    }


  };
  return (
    <div className="bg-slate-100 w-full h-screen p-10"> 
                    <div className='font-semibold text-2xl  text-center mx-auto w-full '>Users</div>
<div className='container mx-auto  flex gap-4 grid-cols-3'>


{
  filteredUsers && filteredUsers.map((item,index)=>(
  <div key={index} className='p-10 rounded-md font-semibold  flex flex-col w-auto gap-4 shadow-xl bg-white  text-slate-700'>
    
    <div className=''> First Name: {item?.firstName}</div>
    <div className=''> Last Name: {item?.lastName}</div>
    <div className=''> Email: {item?.email}</div>
    <div className=''> Role: {item?.role}</div>
    <div className='flex justify-end'> <button className='bg-red-500 text-white text-medium p-2 rounded-sm' onClick={()=>deleteUser(item._id)}>Delete</button> </div>
    </div>
    
)
  
  ) 
}
</div>
    </div>
  
  )
}

export default AdminHome