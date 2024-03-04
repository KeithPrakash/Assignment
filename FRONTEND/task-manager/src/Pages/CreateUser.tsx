import { useState } from "react";
import axios from "../axios/instants";
import { ToastContainer, toast } from "react-toastify";
type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

const CreateUser = () => {
  const [payload, setPayload] = useState<User>({
    firstName: "", 
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPayload({
      ...payload,
      [event.target.name]: event.target.value,
    });
  };

  console.log(payload);

  const roles = ["admin", "user"] as const;

  // handle function
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("user/createUser", payload);
      console.log("payload", payload);
      toast("User created successfully:");
    } catch(error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="h-screen w-full bg-slate-400 flex justify-center items-center">

      <ToastContainer/>
      <div className="p-10 flex justify-center flex-col gap-5 bg-white rounded-lg">
        <p className="font-semibold text-2xl">Create User</p>
        <form onSubmit={createUser}>
          <div className="flex flex-col justify-center items-center gap-5">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={payload.firstName}
                onChange={handleChange}
                className="p-1 h-10 border-blue-800 border w-full"
              />
            </div>
            <div>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={payload.lastName}
                onChange={handleChange}
                className="p-1 h-10 border-blue-800 border w-full"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="email"
                value={payload.email}
                onChange={handleChange}
                className="p-1 h-10 border-blue-800 border w-full"
              />
            </div>
            <div className="w-full">
              <select
                name="role"
                value={payload.role}
                onChange={handleChange}
                className=" p-1 h-10 border-blue-800 border w-full"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                className="p-1 h-10 border-blue-800 border w-full"
              />
            </div>
            <div className="w-full">
              <button className="p-3 w-full bg-slate-500 text-white">
                Create User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
