import React from "react";

import { getSession } from "next-auth/react";

import AddTaskPage from "@/components/templates/AddTaskPage";

function AddTask() {
  return <AddTaskPage />;
}

export default AddTask;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
