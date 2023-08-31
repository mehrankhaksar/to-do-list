import React from "react";

import { getSession } from "next-auth/react";

import HomePage from "@/components/templates/HomePage";

function Home() {
  return <HomePage />;
}

export default Home;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/sign-in", permanent: false },
    };

  return {
    props: {},
  };
}
