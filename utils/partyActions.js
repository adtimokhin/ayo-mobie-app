import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import {
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  where,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

export async function checkPartyExists(partyId) {
  const partyRef = doc(FIREBASE_DB, "parties", partyId);
  const partyDoc = await getDoc(partyRef);
  return partyDoc.exists();
}

export async function checkPartyActiveByPartyId(partyId) {
  // Step 1: Check if the party exists
  const partyRef = doc(FIREBASE_DB, "parties", partyId);
  const partyDoc = await getDoc(partyRef);

  if (!partyDoc.exists()) {
    console.log("Party does not exist");
    return false;
  }

  // Step 2: Check if the party is active currently
  const partyData = partyDoc.data();
  const untilDT = new Date(partyData.untilDT.seconds * 1000);
  const fromDT = new Date(partyData.fromDT.seconds * 1000);
  const now = new Date();

  return fromDT <= now && now < untilDT;
}

export function checkPartyActiveByPartyData(partyData) {
  const untilDT = partyData.untilDT;
  const fromDT = partyData.fromDT;
  const now = Timestamp.now();

  return fromDT <= now && now < untilDT;
}

export async function getPatyDataById(partyUID) {
  const partyRef = doc(FIREBASE_DB, "parties", partyUID);
  const partyDoc = await getDoc(partyRef);

  if (!partyDoc.exists()) {
    return {};
  }

  return partyDoc.data();
}

export async function getAllPartyData() {
  const dataToReturn = [];
  const querySnapshot = await getDocs(collection(FIREBASE_DB, "parties"));

  querySnapshot.forEach((doc) => {
    const dataToPush = doc.data();
    dataToPush.uid = doc.id;
    dataToReturn.push(dataToPush);
  });

  return dataToReturn;
}

export async function getAllActivePartiesData() {
  const dataToReturn = [];
  const querySnapshot = await getDocs(collection(FIREBASE_DB, "parties"));

  querySnapshot.forEach((doc) => {
    const dataToPush = doc.data();
    dataToPush.uid = doc.id;
    if (checkPartyActiveByPartyData(dataToPush)) {
      dataToReturn.push(dataToPush);
    }
  });

  return dataToReturn;
}
