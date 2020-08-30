/////
//Helper functions
/////
const isEmptyString = (string) => {
  if (!string || 0 === string.length) return true;
  else return false;
};

const isEmptyArray = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return true;
  else return false;
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

/////
// Order routes
/////
exports.validateOrderData = (data) => {
  let errors = {};

  if (isEmptyString(data.senderId))
    errors.senderId = 'Cannot verify the sender';
  if (isEmptyObject(data.contact)) errors.contact = 'Must not be empty';
  if (isEmptyArray(data.itemList)) errors.itemList = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.validateDineInOrderData = (data) => {
  let errors = {};

  if (isEmptyString(data.table)) errors.table = 'Must not be empty';
  if (isEmptyArray(data.itemList)) errors.itemList = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateContactData = (data) => {
  let errors = {};

  if (isEmptyString(data.firstName)) errors.firstName = 'Must not be empty';
  if (isEmptyString(data.lastName)) errors.lastName = 'Must not be empty';
  if (!isEmail(data.email)) errors.email = 'Must provide valid email address';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

/////
// User routes
/////
exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmptyString(data.email) || !isEmail(data.email))
    errors.signUpEmail = 'Must provide valid email address';
  if (isEmptyString(data.password)) errors.signUpPassword = 'Must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Password must match';
  if (isEmptyString(data.contact.firstName))
    errors.firstName = 'Must not be empty';
  if (isEmptyString(data.contact.lastName))
    errors.lastName = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignInData = (data) => {
  let errors = {};

  if (!isEmail(data.email)) errors.email = 'Must provide valid email address';
  if (isEmptyString(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
