import UserCard from "./UserCard";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { useEffect, useState } from "react";

const Feed = () => {
  const [feed, setFeed] = useState([])
  const getFeed = async () => {
    try {
      const res = await axios.get(`${baseURL}/feed`, {
        withCredentials: true,
      });
      setFeed(res)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    getFeed()
  },[])
  return (
    (feed?.data?.length>0)&&<UserCard user={feed?.data[0]}/>
  )
};

export default Feed;
