import { addFamilyMember, getFamilyMemberAPI } from "../api/api";

export async function handleRegisterFamilyMember({
  firstname,
  lastname,
  relation,
  dob,
  gender,
}) {
  const data = await addFamilyMember({
    firstname,
    lastname,
    relation,
    dob,
    gender,
  });
  return data;
}

export async function getFamilyMember() {
    const data = await getFamilyMemberAPI();
    return data;
}