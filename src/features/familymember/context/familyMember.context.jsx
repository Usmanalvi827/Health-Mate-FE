import { createContext } from "react";

export const FamilyMemberContext = createContext();

export function familyMemberProvider({ children }) {

      const [familyMembers, setFamilyMembers] = useState([]);

  return (
    <FamilyMemberContext.Provider>{children}</FamilyMemberContext.Provider>
  );
}
