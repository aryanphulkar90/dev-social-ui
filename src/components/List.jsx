import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../utils/constansts";
import axios from "axios";
import { removeRequest } from "../utils/requestSlice";
import { addConnection } from "../utils/connectionSlice";

const List = ({ title }) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    if (title === "Connections") {
      setUsers(connections);
    } else {
      const allSenders = requests?.map((request) => {
        console.log({ request_id: request._id, ...request.fromUserId });
        return { request_id: request._id, ...request.fromUserId };
      });
      setUsers(allSenders);
    }
  }, [connections, requests]);

  const handleRequest = async (status, user) => {
    try {
      await axios.post(
        `${baseURL}/request/review/${status}/${user.request_id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (status === "accepted") {
        const { firstName, lastName, age, gender, photoURL, about, _id } = user;
        dispatch(
          addConnection({
            _id,
            firstName,
            lastName,
            age,
            gender,
            photoURL,
            about,
          })
        );
      }
      dispatch(removeRequest(user.request_id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="m-3">
      <p className="font-bold text-3xl text-center">{title}</p>
      <div className="flex justify-center m-5">
        <ul className="list rounded-box shadow-md w-1/2 bg-gray-100">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-gray-200">
            Your {title}
          </li>
          {users?.map((user) => {
            return (
              <li key={user._id} className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={user.photoURL} />
                </div>
                <div>
                  <div>{user.firstName}</div>
                  <div className="text-xs font-semibold opacity-60">
                    {user.age}, {capitalizeFirstLetter(user.gender)}
                  </div>
                </div>
                <p className="list-col-wrap text-xs">{user.about}</p>
                {title === "Requests" && (
                  <>
                    <button
                      className="btn bg-red-400 rounded-lg"
                      onClick={() => {
                        handleRequest("rejected", user);
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="btn bg-green-400 rounded-lg"
                      onClick={() => {
                        handleRequest("accepted", user);
                      }}
                    >
                      Accept
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
