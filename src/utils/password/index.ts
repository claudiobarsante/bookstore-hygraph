import bcrypt from 'bcryptjs';
//*--Hygraph don't automatically hash de password,
//*--so I'm using bcrypt to hash and compare the  password
export const encryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  // ---------------------------------------------------//
  return hash;
};

export const comparePassword = (
  plainTextPassword: string,
  hash: string
): boolean => {
  return bcrypt.compareSync(plainTextPassword, hash);
};
