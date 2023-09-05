import { getSession } from "next-auth/react";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session)
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });

  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (req.method === "DELETE") {
    const { taskId } = req.query;

    user.tasksList.pull(taskId);
    user.save();

    res
      .status(200)
      .json({ status: "success", message: "Task deleted successfully!" });
  }
}
