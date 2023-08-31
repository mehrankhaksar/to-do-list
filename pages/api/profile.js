import { getSession } from "next-auth/react";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

import { verifyPassword } from "@/utils/auth";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session)
    return res
      .status(401)
      .json({ status: "failed", message: "You aren't logged in!" });

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
      .json({ status: "failed", message: "User doesn't exist!" });

  if (req.method === "POST") {
    const { firstName, lastName, password } = req.body;

    if (!password)
      return res
        .status(422)
        .json({ status: "failed", message: "Enter your password!" });

    const isValid = await verifyPassword(password, user.password);

    if (!isValid)
      return res
        .status(401)
        .json({ status: "failed", message: "Password is incorrect!" });

    try {
      user.firstName = firstName;
      user.lastName = lastName;
      user.save();

      return res.status(201).json({
        status: "success",
        message: "User information updated successfully!",
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "failed", message: "Error in updating data in DB!" });
    }
  }
}
