import { isURL, isEmail } from "validator";

export const validateUser = (user) => {
  const { firstName, lastName, age, gender, photoURL } = user;

  const regexFirstName = /^[A-Za-z\s-]+$/;
  const regexLastName = /^[A-Za-z\s-]*$/;

  if (regexFirstName.test(firstName) === false) {
    throw new Error(
      "Invalid First Name, First Name can contain only alphabets, spaces and hypens\n"
    );
  }

  if (lastName && regexLastName.test(lastName) === false) {
    throw new Error(
      "Invalid Last Name, Last Name can contain only alphabets, spaces and hypens\n"
    );
  }
  if (age < 18) {
    throw new Error("Age should be 18 or above");
  }

  if (!["male", "female", "other"].includes(gender.toLowerCase())) {
    console.log(gender.toLowerCase());
    throw new Error("Gender should be Male, Female or Others");
  }

  if (photoURL && isURL(photoURL) === false) {
    throw new Error("Not a valid URL");
  }
};

export const validatePassword = (password, passwordForConfirmation) =>{
  if(password!==passwordForConfirmation){
    throw new Error("Both Passwords don't match")
  }
}

export const validateEmail = (email) => {
  if (!isEmail(email)) {
    throw new Error("Email is not valid");
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
