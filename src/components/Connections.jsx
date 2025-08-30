import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { addAllConnections } from "../utils/connectionSlice";
import { useEffect } from "react";
import List from "./List";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getAllConnections = async () => {
    try {
      const response = await axios.get(`${baseURL}/request/connections`, {
        withCredentials: true,
      });
      dispatch(addAllConnections(response.data.connections));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(!connections)
      getAllConnections();
  }, []);
  return <List title="Connections" />;
};

export default Connections;
