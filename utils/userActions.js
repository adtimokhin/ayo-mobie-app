import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

export async function getUserData(userUID) {
  const docSnap = await getDoc(doc(FIREBASE_DB, "users", userUID));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return {}; //Error - no such file exists
  }
}

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

export async function changeUserCurrentParty(userUID, partyUID) {
  const userDoc = doc(FIREBASE_DB, "users", userUID);
  await updateDoc(userDoc, {
    partyUID: partyUID,
  });
}
