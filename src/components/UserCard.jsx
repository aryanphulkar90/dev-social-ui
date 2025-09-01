import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { capitalizeFirstLetter } from "../utils/helper";
import { useState } from "react";
import ToastMessage from "./ToastMessage";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { baseURL } from "../utils/constansts";

const UserCard = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user);
  const { user } = props;
  const [showToastMessage, setShowToastMessage] = useState(false);
  const handleRequest = async (status, user_id) => {
    try {
      await axios.post(
        `${baseURL}/request/send/${status}/${user_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(user_id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex justify-center rounded-lg my-5">
        <div className="card bg-base-100 w-96 ">
          <img src={user.photoURL} className="w-96" alt="Shoes" />
          <div className="card-body bg-gray-200 rounded-b-lg">
            <div>
              <h2 className="card-title">{user.firstName}</h2>
              <h2 className="font-medium">
                {user.age}, {capitalizeFirstLetter(user.gender)}
              </h2>
            </div>
            <p className="py-2">{user.about}</p>
            {currentUser?._id.toString() === user?._id.toString() ? (
              <div className="card-actions justify-center">
                <EditProfile setShowToastMessage={setShowToastMessage} />
              </div>
            ) : (
              <div className="card-actions justify-between">
                <button
                  className="btn bg-red-400 rounded-lg"
                  onClick={() => {
                    handleRequest("ignored", user._id);
                  }}
                >
                  Ignore
                </button>
                <button
                  className="btn bg-green-400 rounded-lg"
                  onClick={() => {
                    handleRequest("interested", user._id);
                  }}
                >
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showToastMessage && <ToastMessage />}
    </>
  );
};

export default UserCard;
