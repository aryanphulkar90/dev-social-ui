import UserCard from "./UserCard";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileShimmerUI from "./ProfileShimmerUI";

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
    if (!feed) {
      getFeed();
    }
  }, []);
  if (!feed) return <ProfileShimmerUI />;
  if (feed.length === 0)
    return (
      <p className="text-center">
        You have seen all your Feed. Come back after some time.
      </p>
    );

  return feed?.length > 0 && <UserCard user={feed[0]} />;
};

export default Feed;
