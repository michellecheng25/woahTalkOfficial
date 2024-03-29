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

export const dateConversionNums = (date) => {
  const postDate = new Date(Date.parse(date));

  const currentDate = new Date();

  const newDate = postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return newDate;
};

export const dateTimeConversion = (date) => {
  const postDate = new Date(Date.parse(date));

  const currentDate = new Date();

  const newDate = postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return newDate;
};

export default dateConversion;
