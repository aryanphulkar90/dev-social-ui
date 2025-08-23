import { useState } from "react";
import EmailInputField from "./EmailInputField";
import PasswordInputField from "./PasswordInputField";
import axios from "axios";
import { isEmail } from "validator";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { baseURL } from "../utils/constansts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    try {
      if (!isEmail(email)) {
        throw new Error("Email is not valid");
      }
      const res = await axios.post(
        `${baseURL}/login`,
        {
          emailID: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      navigate("/feed")
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div className="card w-96 shadow-sm bg-base-300">
        <div className="card-body">
          <div className="card-title justify-center my-4">
            <h2>Login</h2>
          </div>
          <EmailInputField setEmail={setEmail} />
          <PasswordInputField setPassword={setPassword} />
          <div className="flex justify-center py-1">
            <h4 className="text-red-500">{error}</h4>
          </div>
          <div className="card-actions justify-center py-1">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
