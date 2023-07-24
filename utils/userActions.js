import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";
import {
  checkLikeExists,
  checkLikesExistsByUserData,
  getPoolDataById,
} from "./poolActions";

/**
 * Asynchronously fetches and returns data for a specific user from the Firebase database.
 *
 * @param {string} userUID - The unique identifier for the user.
 *
 * @returns {Promise<Object>} Returns a Promise that resolves to an Object containing user data, or an empty object if no such user exists.
 *
 * @throws {FirebaseError} Throws an error if the read operation fails.
 *
 * @example
 * const userUID = "abc123";
 * const userData = await getUserData(userUID);
 * // Output: {name: 'John Doe', email: 'johndoe@example.com', ...}
 */

export async function getUserData(userUID) {
  const docSnap = await getDoc(doc(FIREBASE_DB, "users", userUID));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return {}; // no such file exists
  }
}

/**
 * Asynchronously deletes the user account. This includes deleting the user's
 * image from Firebase Storage, their document from Firestore 'users' collection,
 * and finally, their authentication account. Before deleting, the function checks
 * whether the user is logged in, and whether the user exists in the database.
 *
 * @throws {Error} Throws an error if the user is not logged in or if the user does not exist.
 *
 * @throws {FirebaseError} Throws an error if any Firebase operation (delete image, delete document, delete user) fails.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to undefined when the user account deletion is successful.
 *
 * @example
 * try {
 *   await deleteUserAccount();
 *   console.log("User account deleted successfully");
 * } catch (error) {
 *   console.error("Failed to delete user account: " + error.message);
 * }
 */
export async function deleteUserAccount() {
  try {
    const user = FIREBASE_AUTH.currentUser;
    if (user === null) {
      throw new Error("User is not logged in");
    }
    const userId = user.uid;

    // TODO: Add deleting the user data about a party that they are on rn.

    // Deleting Image
    const userData = await getUserData(userId);
    if (userData === {}) {
      throw new Error("User does not exist.");
    } else {
      const userImageRef = ref(
        FIREBASE_STORAGE,
        `images/${userData.imageName}`
      );

      await deleteObject(userImageRef);
    }

    // Then, remove the user's document from the Firestore 'users' collection
    const userDocRef = doc(FIREBASE_DB, "users", userId);

    await deleteDoc(userDocRef);

    console.log("Deleted firestore data");

    // First, delete the user's authentication account

    // TODO: User must first relogin before their account can be deleted. We need to implement this
    await deleteUser(user);
  } catch (error) {
    console.error("Error deleting user: " + error.message);
    throw error;
  }
}

/**
 * Asynchronously updates the sex field of a user in the Firestore database.
 * It takes in the user's UID and the new value for the sex field.
 * Before making an update, the function validates that the new value is
 * one of the predefined values: "male", "female", or "other".
 * If the user is part of a party, they will be removed before the update.
 *
 * @param {string} userUID - The UID of the user.
 * @param {string} value - The new value for the sex field. It must be one of: "male", "female", "other".
 *
 * @throws {Error} Throws an error if the new value is not one of the predefined values.
 *
 * @throws {FirebaseError} Throws an error if the Firestore document update operation fails.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to undefined when the update operation is successful.
 *
 * @example
 * try {
 *   await changeUserSex("userUID1234", "female");
 *   console.log("User sex updated successfully");
 * } catch (error) {
 *   console.error("Failed to update user sex: " + error.message);
 * }
 */
export async function changeUserSex(userUID, value) {
  // value: that is the the new value of the field. Must be one of the predefined values

  // Step 0: Check that the update is valid.
  if (["male", "female", "other"].indexOf(value) === -1) {
    throw new Error(
      "Value error: Value must one of the following: male, female, other"
    );
  }

  // Step 1: Remove the user from the party if they are there.
  // TODO: Implement

  // Step 2: Get the user document
  const userDoc = doc(FIREBASE_DB, "users", userUID);

  // Step 3: Update the user document
  await updateDoc(userDoc, { sex: value });
}

/**
 * Asynchronously updates the 'sexOfInterest' field of a user in the Firestore database.
 * The function validates that the new value is one of the predefined values: "male", "female", or "other".
 * If the user is part of a party, they will be removed before the update.
 * It takes in the user's UID and the new value for the 'sexOfInterest' field.
 *
 * @param {string} userUID - The UID of the user.
 * @param {string} value - The new value for the 'sexOfInterest' field. It must be one of: "male", "female", "other".
 *
 * @throws {Error} Throws an error if the new value is not one of the predefined values.
 *
 * @throws {FirebaseError} Throws an error if the Firestore document update operation fails.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to undefined when the update operation is successful.
 *
 * @example
 * try {
 *   await changeUserSexOfInterest("userUID1234", "male");
 *   console.log("User 'sexOfInterest' updated successfully");
 * } catch (error) {
 *   console.error("Failed to update user 'sexOfInterest': " + error.message);
 * }
 */
export async function changeUserSexOfInterest(userUID, value) {
  // value: that is the the new value of the field. Must be one of the predefined values

  // Step 0: Check that the update is valid.
  if (["male", "female", "other"].indexOf(value) === -1) {
    throw new Error(
      "Value error: Value must one of the following: male, female, other"
    );
  }

  // Step 1: Remove the user from the party if they are there.
  // TODO: Implement

  // Step 2: Get the user document
  const userDoc = doc(FIREBASE_DB, "users", userUID);

  // Step 3: Update the user document
  await updateDoc(userDoc, { sexOfInterest: value });
}

/**
 * Asynchronously updates the 'partyUID' field of a user document in the Firestore database.
 * It takes in the user's UID and the new value for the 'partyUID' field.
 *
 * @param {string} userUID - The UID of the user.
 * @param {string} partyUID - The new value for the 'partyUID' field.
 *
 * @throws {FirebaseError} Throws an error if the Firestore document update operation fails.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to undefined when the update operation is successful.
 *
 * @example
 * try {
 *   await changeUserCurrentParty("userUID1234", "partyUID5678");
 *   console.log("User 'partyUID' updated successfully");
 * } catch (error) {
 *   console.error("Failed to update user 'partyUID': " + error.message);
 * }
 */
export async function changeUserCurrentParty(userUID, partyUID, poolUID) {
  const userDoc = doc(FIREBASE_DB, "users", userUID);
  await updateDoc(userDoc, {
    partyUID: partyUID,
    poolUID: poolUID,
  });
}

export function userWantsToSeeOtherUser(originalUserData, otherUserData) {
  if (originalUserData.sexOfInterest === "other") {
    return true;
  }

  if (otherUserData.sex === "other") {
    return true;
  }

  return originalUserData.sexOfInterest === otherUserData.sex;
}

export async function getAllPeopleUserWantsToSee(poolUID, userData) {
  // We will return a list of people's data of those that our user can match with.

  const partyData = await getPoolDataById(poolUID);
  const currentlyPresent = partyData.currentlyPresent || [];

  const resultArray = [];

  for (let i = 0; i < currentlyPresent.length; i++) {
    const user = currentlyPresent[i];
    if (userData.uid !== user.id) {
      const newUserData = await getUserData(user.id);
      if (
        userWantsToSeeOtherUser(userData, newUserData) &&
        userWantsToSeeOtherUser(newUserData, userData)
      ) {
        // TODO: Right now I will put this code into here, though code that checsks whether the user was liked or not should be in another place
        const liked = await checkLikesExistsByUserData(
          partyData,
          userData.uid,
          newUserData.uid
        );
        newUserData.liked = liked;
        // TODO: Modify the return object
        // Currently it looks like this:
        //
        // {"email": "adtimokhin@gmail.com",
        //  "imageName": "4UhdFVg8FtZWb1ukZP4IuhG5IYr2.jpg",
        //  "partyUID": "TTRfPsfobkJuKnE03UbM",
        //  "poolUID": "5GHvlwOkken2mnZRdNaV",
        //  "sex": "male",
        //  "sexOfInterest": "other",
        //  "uid": "4UhdFVg8FtZWb1ukZP4IuhG5IYr2"}
        //
        resultArray.push(newUserData);
      }
    }
  }

  return resultArray;
}
