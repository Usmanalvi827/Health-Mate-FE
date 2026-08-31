// Static mock data for now. Once the backend is ready, this file goes away
// and Dashboard.jsx will fetch from the family members API instead.
export const familyMembers = [
  {
    id: 1,
    name: "Ahmed Raza",
    relationship: "Father",
    age: 52,
    bloodGroup: "O+",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    name: "Sana Ahmed",
    relationship: "Mother",
    age: 48,
    bloodGroup: "A+",
    lastUpdated: "5 days ago",
  },
  {
    id: 3,
    name: "Muhammad Ahmed",
    relationship: "Son",
    age: 21,
    bloodGroup: "B+",
    lastUpdated: "2 days ago",
  },
  {
    id: 4,
    name: "Zara Ahmed",
    relationship: "Daughter",
    age: 16,
    bloodGroup: "O+",
    lastUpdated: "1 week ago",
  },
];

export const recentActivity = [
  { id: 1, text: "Sana's profile updated", time: "2 hours ago" },
  { id: 2, text: "Ahmed's medical record added", time: "Yesterday" },
  { id: 3, text: "Zara's health information updated", time: "3 days ago" },
];