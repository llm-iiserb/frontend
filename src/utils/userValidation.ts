export enum UserType {
  STUDENT = "student",
  FACULTY = "faculty",
  // TODO Change this to "external" in production
  EXTERNAL = "student",
}

/**
 * Determines whether the current user is a student
 *
 * @param name The user's name
 * @param email The user's email
 * @returns Whether the user is a student
 */
/*
export const userIsStudent = (name: string): boolean => {
  return /\D+\d{5,7}$/.test(name);
};
*/
/**
 * Determines whether the current user is a faculty
 *
 * @param name The user's name
 * @param email The user's email
 * @returns Whether the user is a faculty
 */

/*
export const userIsFaculty = (name: string): boolean => {
  return /^\D+$/.test(name);
};
*/
/*
const isEmailIISERB = (email: string) =>
  
  /^[a-z]+\d{0,2}@iiserb\.ac\.in$/gm.test(email);

/**
 * Determines whether the user is STUDENT, FACULTY or EXTERNAL
 *
 * @param name name of user
 * @param email email of user
 * @returns UserType of user
 */
/*name: string, email: string */
export const getUserType = (name: string, email: string): UserType =>{
  if(name.includes('student'))
    return UserType.STUDENT
  else if(email.includes('iiserb'))
    return UserType.STUDENT
  else
    return UserType.STUDENT
}/*
  isEmailIISERB(email)
    ? userIsStudent(name)
      ? UserType.STUDENT
      : userIsFaculty(name)
      ? UserType.FACULTY
      : UserType.EXTERNAL
    : UserType.EXTERNAL;
*/