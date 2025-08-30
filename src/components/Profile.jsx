import { useSelector } from "react-redux"
import UserCard from "./UserCard"
import ProfileShimmerUI from "./ProfileShimmerUI"

const Profile = () => {
  const user = useSelector((store)=>store.user)
  if(!user) return <ProfileShimmerUI/>
  return <UserCard user={user}/>
    
}

export default Profile