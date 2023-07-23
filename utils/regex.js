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
