function getInitials(fullName: string) {
  if (!fullName) {
    return "Nome inválido.";
  }

  const names = fullName.split(" ");
  const initials = names
    .map((name) => name.charAt(0).toUpperCase())
    .slice(0, 3)
    .join("");

  return initials.toUpperCase();
}

export { getInitials };
