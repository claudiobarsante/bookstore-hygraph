import bcryptjs from 'bcryptjs';
//*--Hygraph don't automatically hash de password,
//*--so I'm using bcrypt to hash and compare the  password
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);

  return hash;
};

export const comparePassword = async (
  plainTextPassword: string,
  hashFromDb: string
): Promise<boolean> => {
  return await bcryptjs.compare(plainTextPassword, hashFromDb);
};
