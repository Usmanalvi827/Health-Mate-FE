import {
  addFamilyMember,
  getFamilyMemberAPI,
  updateFamilyMemberAPI,
  deleteFamilyMemberAPI,
} from "../api/api";

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

export async function handleUpdateFamilyMember(
  id,
  { firstname, lastname, relation, dob, gender }
) {
  const data = await updateFamilyMemberAPI(id, {
    firstname,
    lastname,
    relation,
    dob,
    gender,
  });
  return data;
}

export async function handleDeleteFamilyMember(id) {
  const data = await deleteFamilyMemberAPI(id);
  return data;
}