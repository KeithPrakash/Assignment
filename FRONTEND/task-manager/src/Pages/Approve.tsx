import { useEffect,useState } from "react"
import axios from "../axios/instants"
import { ToastContainer, toast } from "react-toastify";


const Approve = () => {
const [tasks , setTasks] = useState<Array>([])



useEffect(() => {
  const getTasks = async () => {
    try {
      const response = await axios.get('/task/get-tasks');
      if (response) {
        console.log(response);
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  // Call the function directly without a return statement
  getTasks();
}, []);

const handleUpdateStatus = async (taskId:any) => {
  try {
  
    const updatedStatus = 'approved';
    await axios.patch(`/task/update/${taskId}`, { status: updatedStatus});
  toast('Task status updated to completed successfully')
    console.log('Task status updated to completed successfully');
  } catch (error) {
    console.error('Error updating task status:', error);
  }




}
 





  return (
    <div className='h-screen w-full  flex items-center flex-col p-10 '>
             <ToastContainer/>

             <div className="mx-auto font-semibold text-2xl my-10"> On Going tasks</div>
        <div className='flex flex-wrap justify-center gap-5 rounded-md   d'>
             {
              tasks?
                tasks.map((item:any,index)=>( 
                  <div>
<div key={index} className="rounded-md border p-5 flex flex-col gap-5 shadow-lg"> 
<div>
<div className="font-semibold"> User Id</div>
<div>{item.assignedUserId}</div>
</div>
<div>
<div className="font-semibold">Description</div>
<div>{item.taskName}</div>
</div>

<div className=" flex w-full  justify-center  "> 


{
  item.completed === true ?(
    <div 

   className="flex items-center justify-center bg-blue-500 text-white p-1 px-3 rounded-sm"> { item.approved ? (   <div> resolved</div> ):(<div     onClick={()=>handleUpdateStatus(item._id)}>Approve</div> )}  
 </div>
  ):  <div> Not Completed Yet</div>
}

</div>
</div>
</div>
                ))
:null            } 
        </div>
       
       </div>
  )
}

export default Approve;