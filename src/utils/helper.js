import {isURL} from "validator";

export const validateUser = (user) => {
  const regexFirstName = /^[A-Za-z\s-]+$/;
  const regexLastName = /^[A-Za-z\s-]*$/;
  if (regexFirstName.test(user.firstName) === false) {
    throw new Error(
      "Invalid First Name, First Name can contain only alphabets, spaces and hypens\n"
    );
  }

  if (user.lastName && regexLastName.test(user.lastName) === false) {
    throw new Error(
      "Invalid Last Name, Last Name can contain only alphabets, spaces and hypens\n"
    );
  }
  if(user.age<18){
    console.log("Ok then err");
    throw new Error("Age should be 18 or above")
  }

  if(user.gender && !["male", "female", "other"].includes(user.gender.toLowerCase())){
    console.log(user.gender.toLowerCase())
    throw new Error("Gender should be Male, Female or Others")
  }

  if(isURL(user.photoURL)===false){
    throw new Error("Not a valid URL")
  }
};

export const capitalizeFirstLetter = (string) => {
  if (!string) {
    return "";
  }
  const firstLetter = string.charAt(0).toUpperCase();
  const restOfString = string.slice(1);
  return firstLetter + restOfString;
};