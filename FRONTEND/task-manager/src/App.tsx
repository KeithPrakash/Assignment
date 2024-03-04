import Login from "./Pages/Login"
import CreateUser from "./Pages/CreateUser"
import EditUser from "./Pages/EditUser"

import { Route ,Routes } from 'react-router-dom'

import AdminHome from "./Pages/AdminHome";
import AdminLayout from "./Layout/AdminLayout"
import Home from "./Pages/Home"
import ProtectedRoute from "./ProtectedRoute"
import ProtectedAdmin from "./ProtectAdmin"
import TaskCreate from "./Pages/TaskCreate"
import Approve from "./Pages/Approve"
function App() {

  return (
 
 <Routes>
  <Route  path="/"  element={<Login/>} />
  <Route path="/home" element={    <ProtectedRoute><Home/></ProtectedRoute> }/>
  <Route path="/admin" element= { <ProtectedAdmin><AdminLayout/></ProtectedAdmin>     }   >
    <Route path="/admin/create-task" element={<TaskCreate/>}  />
  <Route  path="/admin/create-user"  element= {<CreateUser/>} />
  <Route  path="/admin/edit-user"  element={<EditUser/>} />

  
  <Route  path="/admin/approve"  element={<Approve/>} />
   <Route index element ={<AdminHome/> } />
   </Route>

 </Routes>
  
  )
}

export default App
