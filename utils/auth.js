import { hash, compare } from "bcryptjs";

const hashPassword = async (password) => {
  return await hash(password, 12);
};

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
