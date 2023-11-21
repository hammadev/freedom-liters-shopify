export const hasUpperCase = str => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) {
      return true;
    }
  }
  return false;
};

export const hasLowerCase = str => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toLowerCase() && str[i] !== str[i].toUpperCase()) {
      return true;
    }
  }
  return false;
};

export const hasNumber = str => {
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i]))) {
      return true;
    }
  }
  return false;
};

export const hasSpecialCharacter = str => {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(str);
};

export const isEmailValid = email => {
  const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  return regex.test(email);
};
