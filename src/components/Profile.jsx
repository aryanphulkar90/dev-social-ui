import { useSelector } from "react-redux"
import UserCard from "./UserCard"

const Profile = () => {
  const user = useSelector((store)=>store.user)
  return (
    user&&<>
      <UserCard user={user}/>
    </>
  )
}

export default Profile