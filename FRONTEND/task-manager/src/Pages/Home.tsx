 import { useSelector ,useDispatch } from "react-redux";
 import { selectUser ,setUser } from "../Redux/Slices/userSlice";
 import { RootState } from "../Redux/Store/Store";
import {Link} from "react-router-dom"
import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "../axios/instants"
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate =useNavigate()
const dispatch: AppDispatch = useDispatch();

const Logout =()=>{
localStorage.clear()
dispatch(setUser(null))
navigate('/')

}
  const user = useSelector((state:RootState) =>selectUser(state));

  const [userTasks, setUserTasks] = useState([]);
  const[taskId,setTaskId] = useState(0) 

  useEffect(() => {
    const fetchTasksByUser = async () => {
      try {
        const response = await axios.get(`/task/getTasksByUser/${userId}`);
        setUserTasks(response.data.tasks);
        console.log(userTasks[0]._id)
        setTaskId(userTasks[0]._id)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    
const userId = user?.userId
    fetchTasksByUser();
  }, [user]);

  
  const handleUpdateStatus = async () => {
    try {
    
      const updatedStatus = 'completed';
      await axios.patch(`/task/update/${taskId}`, { status: updatedStatus });
     alert('Task status updated to completed successfully')
      console.log('Task status updated to completed successfully');
    } catch (error) {
      console.error('Error updating task status:', error);
    }




  }

  return (
    <main className=" flex flex-col   h-screen w-full = p-10 ">
      <ToastContainer/>
        <div className=" flex flex-col mx-auto w-[70%]  gap-10">

        <div className="flex  justify-between   mx-auto h-[60px] p-1 border px-10 rounded-lg  shadow-lg w-full"> <div className="font-semibold text-4xl text-blue-500">  Task Manager</div>   <div className="flex gap-10"><div className=" px-4 rounded-xl border  shadow-sm  flex justify-center items-center bg-blue-500 text-white hover:bg-blue-400"> <Link to="/admin">Admin Manager</Link> </div> <div onClick={Logout} className="font-semibold  text-blue-500 flex justify-center items-center p-1 border shadow-md rounded-md text-lg px-3"><div>logOut</div></div></div>      </div>
   
   <div className="text-xl  text-gray-500 font-semibold"> HI ,{user?.name}</div>

        </div>
        
         { userTasks ? (
            <div className="w-[500px] mx-auto  p-6 rounded-xl flex flex-col border gap-10 shadow-md">
              <div className="font semibold text-xl p-3 w-full  bg-blue-500 text-white rounded-md"> <div>Your Task</div>  </div>
           
           <div className="flex flex-col gap-1">
           <div className="font-semibold">Description</div>
            <div>
                {userTasks[0]?.taskName}
            </div>
            </div> 
            <div>
            <div>Due Date</div>
            <div>{userTasks[0]?.date} </div>

            </div>
              <div className="flex justify-end">
{
              userTasks[0]?.completed ===true ? null :
              <button 
              
              onClick={handleUpdateStatus}
              
              className="p-2 rounded-md bg-blue-500 text-white font-semibold"> Done</button>  
      }
              </div>
                
            </div>) : <div>No task</div>} 
 

    </main>
  )
}

export default Home;