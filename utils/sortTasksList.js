const sortTasksList = (tasksList) => {
  const sortedTasksList = {};

  tasksList.map((item) => {
    if (!sortedTasksList[item.status]) sortedTasksList[item.status] = [];

    sortedTasksList[item.status].push(item);
  });

  return sortedTasksList;
};

export default sortTasksList;
