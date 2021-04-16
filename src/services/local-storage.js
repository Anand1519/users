const saveToStorage = (key, data) => {
  try {
    let parseData = JSON.stringify(data);
    localStorage.setItem(key, parseData);
  } catch (err) {
    console.log("localStorage ERROR :", err);
  }
};

const getFromStorage = (key) => {
  try {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
  } catch (err) {
    console.log("localStorage ERROR :", err);
    return undefined;
  }
};

const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log("localStorage ERROR :", err);
  }
};

export { getFromStorage, saveToStorage, removeFromStorage };
