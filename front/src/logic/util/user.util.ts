export const getInitials = (name: string) => {
  const initials = name.replace(/[^a-zA-Z- 0-9]/g, "").match(/\b\w/g);
  if (!initials) return "";

  return initials.join("").toUpperCase();
};
