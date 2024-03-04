
import {Outlet} from "react-router-dom"
import AdminHeader from "../components/AdminHeader";
const AdminLayout = () => {
  return (

    <main> 
        <section>
            <AdminHeader/>
        </section>

       <main  className="">
         <Outlet/>
       </main>
    </main>
  )
}

export default AdminLayout;