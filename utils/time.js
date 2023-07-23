import { Timestamp } from "firebase/firestore";

/**
 * Converts a Firebase Timestamp object into a human-readable date string.
 *
 * @param {Object} timestampData - An object containing "seconds" and "nanoseconds" properties that represent a Firebase Timestamp.
 *
 * @returns {string} A string representation of the date derived from the input Timestamp.
 * The string is in the format: "Month Day, hh:mm AM/PM".
 *
 * @example
 * const timestampData = { nanoseconds: 569000000, seconds: 1688320800 };
 * const readableTime = convertFirebaseTimeToString(timestampData);
 * // Output: 'April 1, 8:00 PM' (the output depends on the timestamp)
 */
export const convertFirebaseTimeToString = function (timestampData) {
  const timestamp = new Timestamp(
    timestampData.seconds,
    timestampData.nanoseconds
  );
  const date = timestamp.toDate();
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const dateStr = date.toLocaleString("en-US", options);

  return dateStr;
};
