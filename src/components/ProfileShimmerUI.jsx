
const ProfileShimmerUI = () => {
  return (
    <div className="flex justify-center my-5">
      <div className="flex w-96 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
}

export default ProfileShimmerUI