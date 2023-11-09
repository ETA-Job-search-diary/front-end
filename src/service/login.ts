interface Storage {
  key: string;
  value?: string;
}

export const setStorage = ({ key, value }: Storage) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = ({ key }: Storage) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeStorage = ({ key }: Storage) => {
  sessionStorage.removeItem(key);
};
