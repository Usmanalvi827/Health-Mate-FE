// api/family-members.api.js
import { api } from "../../../lib/apiClient";

export async function addFamilyMember({
  firstname,
  lastname,
  relation,
  dob,
  gender,
  firstName,
  lastName,
  dateOfBirth,
}) {
  const response = await api.post("/api/family-members", {
    firstName: firstname ?? firstName,
    lastName: lastname ?? lastName,
    relation: relation,
    dateOfBirth: dob ?? dateOfBirth,
    gender: gender,
  });

  return response.data;
}

export async function getFamilyMemberAPI() {
  const response = await api.get("/api/family-members");
  return response.data;
}

export async function updateFamilyMemberAPI(
  id,
  {
    firstname,
    lastname,
    relation,
    dob,
    gender,
    firstName,
    lastName,
    dateOfBirth,
  }
) {
  const response = await api.put(`/api/family-members/${id}`, {
    firstName: firstname ?? firstName,
    lastName: lastname ?? lastName,
    relation: relation,
    dateOfBirth: dob ?? dateOfBirth,
    gender: gender,
  });

  return response.data;
}

export async function deleteFamilyMemberAPI(id) {
  const response = await api.delete(`/api/family-members/${id}`);
  return response.data;
}