import { FIREBASE_DB } from "../firebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  Timestamp,
  collection,
  query,
  where,
} from "firebase/firestore";

/**
 * Asynchronously retrieves the data for a pool document from the Firestore database.
 * It takes in the UID of the pool, and returns the pool's document data if it exists.
 *
 * @param {string} poolUID - The UID of the pool.
 *
 * @throws {FirebaseError} Throws an error if the Firestore document retrieval operation fails.
 *
 * @returns {Promise<Object>} Returns a Promise that resolves to an Object containing the pool's document data if it exists.
 *                            If the pool document does not exist, it resolves to an empty object.
 *
 * @example
 * try {
 *   const poolData = await getPoolDataById("poolUID1234");
 *   console.log("Retrieved pool data: ", poolData);
 * } catch (error) {
 *   console.error("Failed to retrieve pool data: " + error.message);
 * }
 */
export async function getPoolDataById(poolUID) {
  const poolRef = doc(FIREBASE_DB, "pools", poolUID);
  const poolDoc = await getDoc(poolRef);

  if (!poolDoc.exists()) {
    return {};
  }

  return poolDoc.data();
}

/**
 * Asynchronously adds a user to an active pool in the Firestore database.
 * It takes in the UIDs of the pool and user, and updates the 'currentlyPresent' array field of the pool document by adding the user's document reference.
 *
 * @param {string} poolUID - The UID of the pool.
 * @param {string} userUID - The UID of the user.
 *
 * @throws {FirebaseError} Throws an error if the Firestore document update operation fails.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to void when the update operation is successful.
 *
 * @example
 * try {
 *   await addUserToActivePoolByUserUID("poolUID1234", "userUID5678");
 *   console.log("User successfully added to active pool");
 * } catch (error) {
 *   console.error("Failed to add user to active pool: " + error.message);
 * }
 */
export async function addUserToActivePoolByUserUID(poolUID, userUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);
  const userRef = doc(FIREBASE_DB, "users", userUID);

  await updateDoc(partyPoolRef, {
    currentlyPresent: arrayUnion(userRef),
  });
}
/**
 * Asynchronously updates the user's attended pools in the Firestore database.
 * It takes in the UIDs of the pool and user, and uses a transaction to safely read and update the 'attended' array field of the pool document.
 * Each element in the 'attended' array is an object containing a reference to the user's document, the timestamp when the user entered the pool, and the timestamp when the user left the pool.
 * If the user has not left the pool yet, the 'timeLeft' field is set to false.
 *
 * @param {string} poolUID - The UID of the pool.
 * @param {string} userUID - The UID of the user.
 *
 * @throws {FirebaseError} Throws an error if the Firestore transaction fails.
 * @throws {string} Throws an error message if the pool does not exist.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to void when the transaction is successful.
 *
 * @example
 * try {
 *   await updateUserAttendedPoolByUserUID("poolUID1234", "userUID5678");
 *   console.log("User's attended pools successfully updated");
 * } catch (error) {
 *   console.error("Failed to update user's attended pools: " + error.message);
 * }
 */
export async function updateUserAttendedPoolByUserUID(poolUID, userUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);
  const userRef = doc(FIREBASE_DB, "users", userUID);
  return runTransaction(FIREBASE_DB, async (transaction) => {
    const poolSnap = await transaction.get(partyPoolRef);
    if (!poolSnap.exists()) {
      throw "Pool does not exist";
    }

    let attended = poolSnap.data().attended || [];

    attended = attended.map((record) => {
      // Check if the record belongs to the user that we are trying to update
      if (record.userRef.path === userRef.path && !record.timeLeft) {
        const updatedUserRecord = { ...record };
        updatedUserRecord.timeLeft = Timestamp.now();
        return updatedUserRecord;
      }
      return record;
    });

    attended.push({
      userRef: userRef,
      timeEntered: Timestamp.now(),
      timeLeft: false,
    });

    // Updates are sent to the database
    transaction.update(partyPoolRef, { attended });
  });
}

/**
 * Asynchronously removes the specified user from the active pool in the Firestore database.
 * This function will modify the 'currentlyPresent' array field in the pool document,
 * by removing the reference to the specified user's document.
 *
 * @param {string} poolUID - The unique identifier (UID) of the pool from which the user will be removed.
 * @param {string} userUID - The unique identifier (UID) of the user to be removed from the pool.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to void when the update is successful.
 *
 * @throws {FirebaseError} Throws an error if the Firestore operation fails.
 *
 * @example
 * try {
 *   await removeUserFromActivePoolByUserUID("poolUID1234", "userUID5678");
 *   console.log("User successfully removed from the pool");
 * } catch (error) {
 *   console.error("Failed to remove user from the pool: " + error.message);
 * }
 */
export async function removeUserFromActivePoolByUserUID(poolUID, userUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);
  const userRef = doc(FIREBASE_DB, "users", userUID);

  await updateDoc(partyPoolRef, {
    currentlyPresent: arrayRemove(userRef),
  });
}

/**
 * Asynchronously updates the time a user left a pool in the Firestore database.
 * The function runs a Firestore transaction, during which it updates the 'attended' array
 * in the pool document, setting the 'timeLeft' property for the user's attendance record
 * to the current timestamp.
 *
 * @param {string} poolUID - The unique identifier (UID) of the pool where the user's attendance time will be updated.
 * @param {string} userUID - The unique identifier (UID) of the user whose attendance time is to be updated.
 *
 * @returns {Promise<void>} Returns a Promise that resolves to void when the update is successful.
 *
 * @throws {FirebaseError} Throws an error if the Firestore operation fails.
 * @throws {string} Throws a string error message if the specified pool does not exist.
 *
 * @example
 * try {
 *   await updateTimeUserLeft("poolUID1234", "userUID5678");
 *   console.log("User's left time successfully updated");
 * } catch (error) {
 *   console.error("Failed to update user's left time: " + error.message);
 * }
 */
export async function updateTimeUserLeft(poolUID, userUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);
  const userRef = doc(FIREBASE_DB, "users", userUID);
  return runTransaction(FIREBASE_DB, async (transaction) => {
    const poolSnap = await transaction.get(partyPoolRef);
    if (!poolSnap.exists()) {
      throw "Pool does not exist";
    }

    let attended = poolSnap.data().attended || [];
    let foundRecord = false;
    attended = attended.map((record) => {
      // Check if the record belongs to the user that we are trying to update
      if (!foundRecord) {
        if (record.userRef.path === userRef.path && !record.timeLeft) {
          const updatedUserRecord = { ...record };
          updatedUserRecord.timeLeft = Timestamp.now(); // set time left
          return updatedUserRecord;
        }
      }
      return record;
    });

    // Updates are sent to the database
    transaction.update(partyPoolRef, { attended });
  });
}

/**
 * Asynchronously retrieves a pool document from the Firestore 'pools' collection associated with a specified party UID.
 * This function creates a Firestore query that finds all pool documents where the 'partyRef' field matches the specified party's document reference.
 * Then, it executes the query and pushes the data of each resulting document into an array.
 * Given that there should only be one pool per party, the function returns the first (and presumably only) pool in the array.
 *
 * @param {string} partyUID - The unique identifier (UID) of the party whose associated pool is to be retrieved.
 *
 * @returns {Promise<Object>} Returns a Promise that resolves to an object representing the first pool associated with the specified party.
 * The object includes all fields from the pool document in the Firestore 'pools' collection, as well as an additional 'uid' field set to the document's ID.
 *
 * @throws {FirebaseError} Throws an error if the Firestore operation fails.
 *
 * @example
 * try {
 *   const poolData = await getPoolByPartyUID("partyUID1234");
 *   console.log("Retrieved pool data: ", poolData);
 * } catch (error) {
 *   console.error("Failed to retrieve pool data: " + error.message);
 * }
 */
export async function getPoolByPartyUID(partyUID) {
  const partyRef = doc(FIREBASE_DB, "parties", partyUID);
  const poolsRef = collection(FIREBASE_DB, "pools");

  const partyPoolQuery = query(poolsRef, where("partyRef", "==", partyRef));
  const partyPoolQuerySnapshot = await getDocs(partyPoolQuery);

  const data = [];

  partyPoolQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const partyPoolData = doc.data();
    partyPoolData.uid = doc.id;
    data.push(partyPoolData);
  });

  return data[0]; // returns the first found. Should be only one found anyway.
}

/**
 * Retrieve a user reference from the `currentlyPresent` field in the `partyPool` document on Firestore.
 * This method will throw an error if the user is not present in the pool.
 *
 * @param {string} poolUID - The UID of the party pool.
 * @param {string} userUID - The UID of the user.
 * @returns {Object} - The reference to the user if they are present at the party.
 * @throws Will throw an error if the party pool does not exist or if the user is not present in the pool.
 */
export function getUserRefFromPoolData(poolData, userUID) {
  // Get the currently present users array
  const currentlyPresent = poolData.currentlyPresent;

  // Find the user in the array
  const userRef = currentlyPresent.find((ref) => ref.id === userUID);

  if (!userRef) {
    throw new Error(`User with ID ${userUID} is not present in the pool.`);
  }

  // Return the user reference
  return userRef;
}

/**
 * Checks if a like with the given users exists in the likes array of a pool document in Firestore.
 *
 * @param {string} poolUID - The UID of the pool document to be checked.
 * @param {string} givingUserUID - The UID of the user who is giving the like.
 * @param {string} receivingUserUID - The UID of the user who is receiving the like.
 * @returns {Promise<boolean>} - A promise that resolves to true if a like with the given users exists, and false otherwise.
 * @throws Will throw an error if the pool document does not exist.
 */
export async function checkLikeExists(
  poolData,
  givingUserRef,
  receivingUserRef
) {
  const likes = poolData.likes;

  return likes.some(
    (like) =>
      like.giving.path === givingUserRef.path &&
      like.receiving.path === receivingUserRef.path
  );
}

export async function checkLikesExistsByUserData(
  poolData,
  givingUserUID,
  receivingUserUID
) {
  const likes = poolData.likes;

  return likes.some(
    (like) =>
      like.giving.id === givingUserUID && like.receiving.id === receivingUserUID
  );
}
/**
 * Adds a 'like' between two users in a party pool on Firestore.
 * A 'like' is an object that contains references to the giving and receiving users and the time the 'like' was made.
 * The 'like' object is added to the 'likes' array in the pool document.
 * This function will first check if the pool exists, then check if both users are currently present at the party,
 * and finally check if the 'like' already exists before adding the new 'like'.
 *
 * @param {string} poolUID - The UID of the pool document to be updated.
 * @param {string} givingUserUID - The UID of the user who is giving the like.
 * @param {string} receivingUserUID - The UID of the user who is receiving the like.
 * @returns {Promise<void>} - A promise that resolves when the pool document has been updated.
 * @throws Will print an error message and stop the function if the pool does not exist, one or both users are not present at the party, or the 'like' already exists.
 */
export async function addLike(poolUID, givingUserUID, receivingUserUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);

  // Getting the data from the pool.
  const poolData = await getPoolDataById(poolUID);
  if (poolData == {}) {
    console.log("Pool does not exist");
    return;
  }

  // Seeing if the two users are present at the given party in the pool.
  let givingUserRef;
  let receivingUserRef;
  try {
    givingUserRef = getUserRefFromPoolData(poolData, givingUserUID);
    receivingUserRef = getUserRefFromPoolData(poolData, receivingUserUID);
  } catch (error) {
    console.log("One or two users are not associated with this party pool.");
    return;
  }

  // We need to check if the given like already exists
  const likeAlreadyPresent = await checkLikeExists(
    poolData,
    givingUserRef,
    receivingUserRef
  );
  if (likeAlreadyPresent) {
    console.log("Like already exists");
    return;
  }

  // Adding the like data to the pool.
  const newLike = {
    giving: givingUserRef,
    receiving: receivingUserRef,
    time: Timestamp.now(),
  };

  await updateDoc(partyPoolRef, {
    likes: arrayUnion(newLike),
  });
}
