import bcryptjs from 'bcryptjs';
//*--Hygraph don't automatically hash de password,
//*--so I'm using bcrypt to hash and compare the  password
export const encryptPassword = async (password: string): Promise<string> => {
  const salt: string = String(process.env.SALT);
  const saltRounds: number = parseInt(salt); // Convert salt to a number
  const hash = await bcryptjs.hash(password, saltRounds);
  // ---------------------------------------------------//
  return hash;
};

export const comparePassword = async (
  plainTextPassword: string,
  hashFromDb: string
): Promise<boolean> => {
  // const hash = await bcryptjs.hash(
  //   plainTextPassword,
  //   `${process.env.SALT}`
  // );

  // if (hashFromDb === hash) return true;

  return await bcryptjs.compare(plainTextPassword, hashFromDb);
};
