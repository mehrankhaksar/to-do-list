import { getSession } from "next-auth/react";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import sortTasksList from "@/utils/sortTasksList";

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

  if (!user)
    return res
      .status(404)
      .json({ status: "failed", message: "User does not exist!" });

  if (req.method === "GET") {
    const sortedTasksList = sortTasksList(user.tasksList);

    return res.status(200).json({ status: "success", sortedTasksList });
  } else if (req.method === "POST") {
    const { title, text, status } = req.body;

    if (!title || !status)
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });

    try {
      user.tasksList.push({ title, text, status });
      user.save();

      return res
        .status(201)
        .json({ status: "success", message: "Task created successfully!" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "failed", message: "Error in storing data in DB!" });
    }
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status)
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });

    try {
      await User.updateOne(
        { "tasksList._id": id },
        { $set: { "tasksList.$.status": status } }
      );

      return res
        .status(200)
        .json({ status: "success", message: "Task updated successfully!" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "failed", message: "Error in updating data in DB!" });
    }
  }
}
