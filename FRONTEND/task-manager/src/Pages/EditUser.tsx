

const EditUser = () => {
  return (
    <div className='w-full h-screen'>
            <div className="p-10 flex justify-center flex-col gap-5 bg-white rounded-lg">
                     <p className="font-semibold  text-2xl">Edit user</p>
  
                     <div className="flex flex-col justify-center items-center gap-5">
                      <div>
                      <input type="text" placeholder="first name "  className="p-1 h-10 border-blue-800 border w-full"/>
                      </div>
                         <div>
                         <input  placeholder="Second Name"  type="text" className="p-1 h-10 border-blue-800 border w-full"/>
                         </div>
                         <div className="w-full">
                         <select id="userRole" name="userRole " className="p-1 h-10 border-blue-800 border w-full">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                         </select>
                         </div>
                         <div>
                         <input  placeholder="password"  type="password" className="p-1 h-10 border-blue-800 border w-full"/>
                         </div>
                       <div className="w-full">
                        <button className=" p-3 w-full bg-slate-500 text-white ">Save</button>
                       </div>
                    </div>
              </div>
d
    </div>
  )
}

export default EditUser