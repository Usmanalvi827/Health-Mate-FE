// api/family-members.api.js
import { api } from "../../../lib/apiClient";

export async function addFamilyMember({
  firstname,
  lastname,
  relation,
  dob,
  gender,
}) {
  const response = await api.post("/api/family-members", {
    firstName: firstname,
    lastName: lastname,
    relation: relation,
    dateOfBirth: dob,
    gender: gender,
  });

  return response.data;
}

export async function getFamilyMemberAPI() {
    const response = await api.get("/api/family-members");
    return response.data;
}