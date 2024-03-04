import { Route, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/Store/Store';
import { PropsWithChildren, useEffect } from 'react';
import { selectUser } from './Redux/Slices/userSlice';

interface User {
  role: string;
}
type ProtectedRouteProps =PropsWithChildren;

export default function ProtectedAdmin({children}:ProtectedRouteProps){
    
  const user = useSelector((state:RootState) =>selectUser(state));
  const navigate =useNavigate()

useEffect(()=>{
  if(user.role !== 'admin'){
    navigate('/home', {replace:true})
  }

} ,[navigate, user])
  
return children;

}
