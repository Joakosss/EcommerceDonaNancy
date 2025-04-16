function getDate() {
  const fullDate = new Date();
  const day = fullDate.getDay();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  return `${year}-${month}-${day}:`;
}

export default getDate