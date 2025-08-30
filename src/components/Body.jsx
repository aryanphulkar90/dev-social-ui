import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const user = await axios.get(`${baseURL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(user.data.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      } else {
        console.error("Failed to fetch user:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100 justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
