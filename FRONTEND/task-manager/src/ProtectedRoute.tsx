import { Route, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/Store/Store';
import { PropsWithChildren, useEffect } from 'react';
import { selectUser } from './Redux/Slices/userSlice';

interface User {
  role: string;
}


type ProtectedRouteProps =PropsWithChildren;

export default function ProtectedRoute({children}:ProtectedRouteProps){

 
  const user = useSelector((state:RootState) =>selectUser(state));
  const navigate =useNavigate()

useEffect(()=>{
  if(user ===  null){
    navigate('/', {replace:true})
  }

} ,[navigate, user])
  
return children;

}
