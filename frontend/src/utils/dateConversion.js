const dateConversion = (date) => {
  const postDate = new Date(Date.parse(date));

  const currentDate = new Date();

  let newDate;
  if (currentDate.getFullYear === postDate.getFullYear) {
    newDate = postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else {
    newDate = postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return newDate;
};

export default dateConversion;
