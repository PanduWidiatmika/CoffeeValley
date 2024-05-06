type User = {
  id: string;
  name: string;
  age: number;
  address: string;
  photo: string;
};

let users: User[] = [];

export const getUser = () => users;

export const addUser = (user: User) => {
  users.push(user);
};

export const deleteUser = (id: string) => {
  users = users.filter((user) => user.id !== id);
};

export const updateUser = (id: string, name: string, age: number, address: string, photo: string) => {
  const user = users.find((user) => user.id === id);

  if (user) {
    user.name = name;
    user.age = age;
    user.address = address;
    user.photo = photo;
  } else {
    throw new Error("User not found");
  }
};

export const getById = (id: string) => {
  return users.find((user) => user.id === id);
};
