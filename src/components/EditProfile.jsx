import { useState } from "react";
import FirstNameInputField from "./FirstNameInputField";
import LastNameInputField from "./LastNameInputField";
import GenderInput from "./GenderInput";
import URLInput from "./URLInput";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../utils/helper";
import { baseURL } from "../utils/constansts";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ setShowToastMessage }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");

  const handleEditProfile = async () => {
    try {
      const updatedUser = { ...user };
      if (firstName) updatedUser.firstName = firstName;
      if (lastName) updatedUser.lastName = lastName;
      if (age) updatedUser.age = age;
      if (gender) updatedUser.gender = gender;
      if (photoURL) updatedUser.photoURL = photoURL;
      if (about) updatedUser.about = about;
      validateUser(user);
      setError("");
      document.getElementById("my_modal_1").close();
      await axios.patch(
        `${baseURL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(updatedUser));
      setShowToastMessage(true);
      setTimeout(()=>{
        setShowToastMessage(false)
      },3000)
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <button
        className="btn bg-blue-400 rounded-lg"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Edit Profile
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex justify-center items-center my-10">
            <div className="card w-96 shadow-sm bg-base-300">
              <div className="card-body">
                <div className="card-title justify-center my-4">
                  <h2>Edit Profile</h2>
                </div>
                <div>
                  <FirstNameInputField
                    firstName={firstName}
                    setFirstName={setFirstName}
                  />
                  <LastNameInputField
                    lastName={lastName}
                    setLastName={setLastName}
                  />
                  <input
                    type="text"
                    placeholder="Age"
                    className="input my-2"
                    defaultValue={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <GenderInput gender={gender} setGender={setGender} />
                  <URLInput photoURL={photoURL} setPhotoURL={setPhotoURL} />
                  <textarea
                    className="textarea my-2"
                    placeholder="About"
                    defaultValue={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <div className="text-red-500 flex justify-center">
                    <h5>{error.message}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-between modal-action">
              <button
                className="btn bg-red-400 rounded-lg"
                onClick={() => {
                  document.getElementById("my_modal_1").close();
                }}
              >
                Cancel
              </button>
              <button
                className="btn bg-green-400 rounded-lg"
                onClick={() => {
                  handleEditProfile();
                }}
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditProfile;
