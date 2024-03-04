import React, { useEffect, useState } from 'react';
import axios from '../axios/instants';

const TaskCreate= () => {
  const [fetched, setFetched] = useState<Array<any> | null>(null);
  const [taskName, setTaskName] = useState('');
  const [date, setTaskDate] = useState('');

  const [assignedUserId, setSelectedUser] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user/getUsers');
        setFetched(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        console.log(e, 'fetch error');
      }
    };

    fetchData();
  }, []);

 
  const handleCreateTask = async () => {
    try {
      const response = await axios.post('/task/create-task/', {
        taskName,
        date,
        assignedUserId,
      });
      console.log(response.status, 'created');
      alert('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error.response?.data || error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    

    await handleCreateTask();
  };
  return (
    <div className="bg-slate-100 w-full h-screen flex flex-col items-center justify-center">
      <div className='flex flex-col p-10 bg-white text-base  rounded sm  w-[500px] gap-10 border shadow-xl'>
        <p className=' font-semibold text-2xl'>Create Task</p>

       
        <form  onSubmit={onSubmit} >
        <div>
            <label>Select User:</label>
            <select
              value={assignedUserId}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select a user</option>
              {fetched?.map((user: any) => (
                <option key={user._id} value={user._id}>
                  {console.log(user._id)
                  }
                  {user.firstName}
                </option>
              ))}
            </select>
          </div>
          <div>
             <div>Task  description</div>
            <textarea className='h-[200px] border-2  border-gray-700 rounded-md w-full'
              placeholder='Task Name'
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>
          <div>
              <div> Select  Due Date </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setTaskDate(e.target.value)}
              required
            />
          </div>
          <div className='flex justify-end w-full'>
            <button type="submit" 
                    className='bg-blue-500  text-white p-2 rounded'                  
           >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreate;
