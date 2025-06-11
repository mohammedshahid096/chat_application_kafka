import bcrypt from "bcrypt";

/**
 * Verifies the user password against a hashed password
 * @param {string} password - User's plain text password
 * @param {string} hashPassword - Hashed password stored in the database
 * @returns {Promise<boolean>} - Returns true if passwords match, otherwise false
 */
export const verifyPasswordMethod = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const response: boolean = await bcrypt.compare(password, hashPassword);
  return response;
};
