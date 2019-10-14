import http from "./httpService";
import _ from "lodash";
const apiEndpoint = "/user";

// import { apiConfig } from "../config.json";
// const apiEndpoint = apiConfig + "/users";

export async function getAllUsers() {
  return await http.get(apiEndpoint);
}

export async function updateUserRoles(Users) {
  try {
    Users.map(async user => {
      await http.put(apiEndpoint + "/admin/" + user._id, user);
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function register(user) {
  let body = {
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    phoneNo: user.phoneNo,
    email: user.email,
    password: user.password
  };
  // return console.log(body);
  return await http.post(apiEndpoint, body);
}

export function filterByRole(users, role) {
  let users1 = [{ firstName: "blank", _id: "0", lastName: "_" }];
  let users2 = users.filter(user =>
    _.indexOf(user.roles, role) >= 0 ? true : false
  );
  users2.forEach(user => {
    users1.push(user);
  });
  return users1;
}
