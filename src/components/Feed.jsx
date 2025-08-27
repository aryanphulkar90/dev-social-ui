import UserCard from "./UserCard";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(`${baseURL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return feed?.length > 0 && <UserCard user={feed[0]} />;
};

export default Feed;
