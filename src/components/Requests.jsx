import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { useEffect } from "react";
import List from "./List";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const getRequests = async () => {
    try {
      const response = await axios.get(`${baseURL}/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.requests));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!requests) {
      getRequests();
    }
  }, []);
  return <List title="Requests" users={requests} />;
};

export default Requests;
