/**
 * Validates if a given string is a valid email address.
 *
 * @param {string} email - The email address to be validated.
 *
 * @returns {boolean} Returns true if the email is valid, otherwise returns false.
 *
 * @example
 * const email = "test@email.com";
 * const isValid = validateEmail(email);
 * // Output: true
 */
export function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


/**
 * Validates if a given string meets the specified criteria for a valid password.
 *
 * @param {string} password - The password to be validated.
 *
 * @returns {boolean} Returns true if the password is valid, otherwise returns false.
 *
 * @example
 * const password = "Abc12345";
 * const isValid = validatePassword(password);
 * // Output: true
 *
 * @example
 * const password = "abcdefg";
 * const isValid = validatePassword(password);
 * // Output: false (no uppercase letter)
 *
 * @example
 * const password = "ABCDEFG";
 * const isValid = validatePassword(password);
 * // Output: false (no lowercase letter)
 *
 * @example
 * const password = "1234567";
 * const isValid = validatePassword(password);
 * // Output: false (no uppercase letter)
 *
 * @example
 * const password = "Abc123";
 * const isValid = validatePassword(password);
 * // Output: false (length is less than 7)
 */
export function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
  return passwordRegex.test(password);
}
