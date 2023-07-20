import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

async function getUserData(userUID) {
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
