export function getInitials(fullname: string) {
  const [firstname, lastname] = fullname.split(' ');
  if (!lastname) {
    return firstname.slice(0, 2);
  }
  return `${firstname[0]}${lastname[0]}`;
}
