const UserCard = (props) => {
  const {user} = props 
  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={user.photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex justify-center">{user.firstName}</h2>
          <p className="py-2">{user.about}</p>
          <div className="card-actions justify-between">
            <button className="btn bg-red-400 rounded-lg">Ignore</button>
            <button className="btn bg-green-400 rounded-lg">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard