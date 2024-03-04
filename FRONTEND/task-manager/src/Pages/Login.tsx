import React from "react";
import axios from "../axios/instants";
import { useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../Redux/Store/Store";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/userSlice";


const Login = () => {

const dispatch: AppDispatch = useDispatch();
const [email, setEmail] = React.useState<string>("");
const [password, setPassword] = React.useState<string>("");
const navigate =useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };
    console.log();

    try {
      const response = await axios.post(
        "user/login",
        payload
      );

  const data = await response;

   const { token , user } =response.data
      toast("success");
      console.log(response.data.token);
      localStorage.setItem("token", token);
       dispatch(setUser(user));
      console.log(user)
      navigate("/home")
      
      console.log();
    } catch (error) {
      alert(error);
    }
  };

  console.log(localStorage.getItem("token"));

  return (
    <div className="h-screen w-full bg-slate-400 flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={handleLogin}>
        <div className="p-10 flex justify-center flex-col gap-5 bg-white rounded-lg">
          <p className="font-semibold  text-2xl"> Login</p>
          <div className="flex flex-col justify-center items-center gap-5">
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
                className="p-1 h-10 border-blue-800 border w-full"
                required
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type="password"
                className="p-1 h-10 border-blue-800 border w-full"
                required
              />
            </div>
            <div className="w-full">
              <button
                className=" p-3 w-full bg-slate-500 text-white "
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
