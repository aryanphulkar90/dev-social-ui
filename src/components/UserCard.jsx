import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { capitalizeFirstLetter } from "../utils/helper";
import { useState } from "react";
import ToastMessage from "./ToastMessage";

const UserCard = (props) => {
  const currentUser = useSelector((store) => store.user);
  const { user } = props;
  const [showToastMessage, setShowToastMessage] = useState(false)
  return (
    <>
      <div className="flex justify-center m-3 rounded-lg">
        <div className="card bg-base-100 w-96 ">
            <img src={user.photoURL} className="w-96" alt="Shoes" />
          <div className="card-body bg-gray-100 rounded-lg">
            <div>
              <h2 className="card-title">{user.firstName}</h2>
              <h2 className="font-medium">
                {user.age}, {capitalizeFirstLetter(user.gender)}
              </h2>
            </div>
            <p className="py-2">{user.about}</p>
            {currentUser?._id.toString() === user?._id.toString() ? (
              <div className="card-actions justify-center">
                <EditProfile setShowToastMessage={setShowToastMessage}/>
              </div>
            ) : (
              <div className="card-actions justify-between">
                <button className="btn bg-red-400 rounded-lg">Ignore</button>
                <button className="btn bg-green-400 rounded-lg">
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showToastMessage&&<ToastMessage/>}
    </>
  );
};

export default UserCard;
