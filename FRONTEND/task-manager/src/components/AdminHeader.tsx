import {NavLink ,useNavigate} from "react-router-dom"
import { AppDispatch } from "../Redux/Store/Store";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/userSlice";

const AdminHeader = () => {
  const navigate =useNavigate()
  const dispatch: AppDispatch = useDispatch();
  
  const Logout =()=>{
  localStorage.clear()
  dispatch(setUser(null))
  navigate('/')
  
  }
  return (
    <header className='  w-full flex gap-10 p-5 border text-lg shadow-md  justify-center items-center bg-blue-500 text-white'>
           <NavLink to="/admin" >Home</NavLink>
           <NavLink to ="/admin/create-user">Create User </NavLink>
           <NavLink to ="/admin/create-task">Create Task </NavLink>
           <NavLink to ="/admin/approve"> Approve tasks </NavLink>
   
           <div onClick={Logout} className="font-semibold  bg-white text-blue-500 flex justify-center items-center p-1 border shadow-md rounded-md text-lg px-3"><div>logOut</div></div>
    </header>
  )
}

export default AdminHeader