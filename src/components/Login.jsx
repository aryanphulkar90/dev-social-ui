import { useState } from "react";
import EmailInputField from "./EmailInputField";
import PasswordInputField from "./PasswordInputField";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { baseURL } from "../utils/constansts";
import { useNavigate } from "react-router-dom";
import FirstNameInputField from "./FirstNameInputField";
import LastNameInputField from "./LastNameInputField";
import AgeInput from "./AgeInput";
import GenderInput from "./GenderInput";
import { validateEmail, validatePassword, validateUser } from "../utils/helper";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignIn = async () => {
    try {
      validateUser({
        firstName,
        lastName,
        age,
        gender,
      });
      validateEmail(email);
      validatePassword(password, confirmPassword);
      const res = await axios.post(
        `${baseURL}/auth/signup`,
        {
          firstName,
          lastName,
          age,
          password,
          gender,
          emailID: email,
        },
        {
          withCredentials: true
        }
      );
      console.log(res)
      dispatch(addUser(res.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || err?.message || "Something went wrong");
    }
  };
  const handleLogin = async () => {
    try {
      validateEmail(email);
      const res = await axios.post(
        `${baseURL}/auth/login`,
        {
          emailID: email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };
  const handleSubmit = async () => {
    try {
      isLogin ? handleLogin() : handleSignIn();
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div className="card w-96 shadow-sm bg-gray-200">
        <div className="card-body">
          <div className="card-title justify-center my-4">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          </div>
          {!isLogin && (
            <>
              <FirstNameInputField
                firstName={firstName}
                setFirstName={setFirstName}
              />
              <LastNameInputField
                lastName={lastName}
                setLastName={setLastName}
              />
              <AgeInput age={age} setAge={setAge} />
              <GenderInput gender={gender} setGender={setGender} />
            </>
          )}
          <EmailInputField setEmail={setEmail} />
          <PasswordInputField
            setPassword={setPassword}
            placeholder="Password"
          />
          {!isLogin && (
            <PasswordInputField
              setPassword={setConfirmPassword}
              placeholder="Confirm Password"
            />
          )}
          <div className="flex justify-center py-1">
            <h4 className="text-red-500 text-center">{error}</h4>
          </div>
          {isLogin ? (
            <p
              className="text-center font-medium"
              onClick={() => setIsLogin(false)}
            >
              New User? Register Now
            </p>
          ) : (
            <p
              className="text-center font-medium"
              onClick={() => setIsLogin(true)}
            >
              Already have an account? SignIn Now
            </p>
          )}
          <div className="card-actions justify-center py-1">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
