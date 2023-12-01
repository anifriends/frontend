export const setItemToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItemFromStorage = (key: string) => {
  const value = localStorage.getItem(key);
  console.log(value);
  if (!value) {
    throw new Error('[Error] : 로컬 스토리지에 유저 정보가 없습니다');
  }
  return value;
};

export const removeItemFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
