import bcrypt from "bcrypt";

export const encrypt = (text) => {
  return bcrypt.hashSync(text, 10);
};

export const compare = (text, hash) => {
  return bcrypt.compareSync(text, hash);
};
