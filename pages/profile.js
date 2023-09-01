import React from "react";

import { getSession } from "next-auth/react";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import ProfilePage from "@/components/templates/ProfilePage";

function Profile({ user }) {
  return <ProfilePage {...user} />;
}

export default Profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
  }

  const user = await User.findOne({ email: session.user.email });

  if (!session)
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
}
