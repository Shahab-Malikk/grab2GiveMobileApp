export const validatesimpleInput = (inputText) => {
  if (inputText == "") {
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  return validEmail.test(email);
};
export const validateMobileNumber = (mobileNumber) => {
  const validMobileNumber = new RegExp("^[0-9]{10}$");
  return validMobileNumber.test(mobileNumber);
};

export const validateIsNumber = (number) => {
  const validNumber = new RegExp("^[0-9]+$");
  return validNumber.test(number);
};

export const validatePassword = (password) => {
  // Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const validPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
  );
  return validPassword.test(password);
};
