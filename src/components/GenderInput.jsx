import { capitalizeFirstLetter } from "../utils/helper";

const GenderInput = ({gender, setGender}) => {
  return (
    <>
      <input
        type="text"
        className="input my-1"
        placeholder="Gender"
        list="genders"
        defaultValue={capitalizeFirstLetter(gender)}
        onChange={(e)=>{setGender(e.target.value)}}
      />
      <datalist id="genders">
        <option value="Male"></option>
        <option value="Female"></option>
        <option value="Other"></option>
      </datalist>
    </>
  );
}

export default GenderInput