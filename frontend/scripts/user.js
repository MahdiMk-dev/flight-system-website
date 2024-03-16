const addToLocalStorage = (key, newData) => {
  const existingData = JSON.parse(localStorage.getItem(key)) || [];
  const lastId =
    existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
  newData.id = lastId + 1;
  existingData.push(newData);
  localStorage.setItem(key, JSON.stringify(existingData));
};

const getFromLocalStorage = (key) =>
JSON.parse(localStorage.getItem(key)) || [];

const addUser = (user) => {
  const newUser = {
      ...user,
  };
  addToLocalStorage("users", newUser);
  return newUser;
};

const getUsers = () => getFromLocalStorage("users");
