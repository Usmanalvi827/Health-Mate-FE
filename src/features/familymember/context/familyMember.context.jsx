import { createContext, useState } from "react";

export const FamilyMemberContext = createContext(null);

export function FamilyMemberProvider({ children }) {
  const [familyMembers, setFamilyMembers] = useState([]);

  return (
    <FamilyMemberContext.Provider value={{ familyMembers, setFamilyMembers }}>
      {children}
    </FamilyMemberContext.Provider>
  );
}

