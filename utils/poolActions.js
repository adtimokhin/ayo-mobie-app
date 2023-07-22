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
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  Timestamp,
  collection, query, where, 
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

export async function removeUserFromActivePoolByUserUID(poolUID, userUID) {
  const partyPoolRef = doc(FIREBASE_DB, "pools", poolUID);
  const userRef = doc(FIREBASE_DB, "users", userUID);

  await updateDoc(partyPoolRef, {
    currentlyPresent: arrayRemove(userRef),
  });
}

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

export async function getPoolByPartyUID(partyUID){
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
