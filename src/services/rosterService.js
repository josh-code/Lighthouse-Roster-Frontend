import http from "./httpService";
// import { apiConfig } from "../config.json";
// const apiEndpoint = apiConfig + "/users";
const apiEndpoint = "/roster";

export function getAllRosters() {
  return http.get(apiEndpoint);
}

export function getRoster(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function getUpcomingSunday() {
  return http.get(`${apiEndpoint}/upcomingSunday`);
}

export function getUserRosters(userId) {
  return http.get(`${apiEndpoint}/myRosters/${userId}`);
}

export function createRoster(date, data) {
  return http.post(apiEndpoint, { date, data });
}

export function updateRoster(roster) {
  return http.put(`${apiEndpoint}/${roster._id}`, { ...roster });
}

export function updateUserRoster(userId, roster) {
  return http.put(`${apiEndpoint}/updateUserRoster/${userId}`, { ...roster });
}

export function deleteRoster(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}

export function getRoles() {
  return [
    "worshipLeader",
    "keys",
    "acoustic",
    "bass",
    "drums",
    "backingVocals",
    "sound",
    "hosting",
    "hospitality",
    "breadAndWine",
    "projection"
  ];
}
