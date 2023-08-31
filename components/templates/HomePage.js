import React from "react";

import Task from "../modules/Task";
import AddTaskBtn from "../modules/AddTaskBtn";

function HomePage() {
  const [tasksList, setTasksList] = React.useState({});

  React.useEffect(() => {
    fetchTasksList();
  }, []);

  const fetchTasksList = async () => {
    fetch("/api/tasks-list")
      .then((res) => res.json())
      .then(({ sortedTasksList }) => setTasksList(sortedTasksList));
  };

  const { toDo, inProgress, review, done } = tasksList || {};

  return (
    <section className="w-full h-full">
      <div className="w-full h-full grid gap-5 text-white sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4">
        <div className="home-task">
          <h4 className="bg-orange-500">To-Do</h4>
          {toDo ? (
            <ul>
              {toDo.map((item) => (
                <li key={item._id}>
                  <Task
                    taskData={item}
                    nextBtn="inProgress"
                    fetchTasksList={fetchTasksList}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <AddTaskBtn textColor="text-orange-500" bgColor="bg-orange-500" />
          )}
        </div>
        <div className="home-task">
          <h4 className="bg-emerald-500">In Progress</h4>
          {inProgress ? (
            <ul>
              {inProgress.map((item) => (
                <li key={item._id}>
                  <Task
                    taskData={item}
                    backBtn="toDo"
                    nextBtn="review"
                    fetchTasksList={fetchTasksList}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <AddTaskBtn textColor="text-emerald-500" bgColor="bg-emerald-500" />
          )}
        </div>
        <div className="home-task">
          <h4 className="bg-blue-500">Review</h4>
          {review ? (
            <ul>
              {review.map((item) => (
                <li key={item._id}>
                  <Task
                    taskData={item}
                    backBtn="inProgress"
                    nextBtn="done"
                    fetchTasksList={fetchTasksList}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <AddTaskBtn textColor="text-blue-500" bgColor="bg-blue-500" />
          )}
        </div>
        <div className="home-task">
          <h4 className="bg-cyan-500">Done</h4>
          {done ? (
            <ul>
              {done.map((item) => (
                <li key={item._id}>
                  <Task
                    taskData={item}
                    backBtn="review"
                    fetchTasksList={fetchTasksList}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <AddTaskBtn textColor="text-cyan-500" bgColor="bg-cyan-500" />
          )}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
