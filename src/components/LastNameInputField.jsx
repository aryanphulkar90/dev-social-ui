const LastNameInputField = ({lastName, setLastName}) => {
  return (
    <>
      <label className="input validator my-1">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          type="text"
          defaultValue={lastName}
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </label>
    </>
  );
};

export default LastNameInputField;
