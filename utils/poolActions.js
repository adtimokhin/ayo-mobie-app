import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import {
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

export async function getPoolDataById(poolUID) {
  const poolRef = doc(FIREBASE_DB, "pools", poolUID);
  const poolDoc = await getDoc(poolRef);

  if (!poolDoc.exists()) {
    return {};
  }

  return poolDoc.data();
}
export async function addUserToActivePoolByUserUID(poolUID, userUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);
  const userRef = doc(FIREBASE_DB, "users", userUID);

  await updateDoc(partyPoolRef, {
    currentlyPresent: arrayUnion(userRef),
  });
}
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
        foundUser = true;
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
