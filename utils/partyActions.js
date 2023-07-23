import { FIREBASE_DB } from "../firebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  Timestamp,
} from "firebase/firestore";

/**
 * Asynchronously checks if a party document exists in the Firestore 'parties' collection by its ID.
 *
 * @param {string} partyId - The unique identifier (UID) of the party to check.
 *
 * @returns {Promise<boolean>} Returns a Promise that resolves to a boolean indicating whether the party document exists.
 *
 * @example
 * const partyExists = await checkPartyExists('partyID1234');
 */
export async function checkPartyExists(partyId) {
  const partyRef = doc(FIREBASE_DB, "parties", partyId);
  const partyDoc = await getDoc(partyRef);
  return partyDoc.exists();
}

/**
 * Asynchronously checks if a party is currently active based on its Firestore document.
 * A party is considered active if the current date/time falls between its 'fromDT' and 'untilDT' fields.
 *
 * @param {string} partyId - The unique identifier (UID) of the party to check.
 *
 * @returns {Promise<boolean>} Returns a Promise that resolves to a boolean indicating whether the party is active.
 *
 * @example
 * const partyIsActive = await checkPartyActiveByPartyId('partyID1234');
 */
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

/**
 * Checks if a party is currently active based on provided party data.
 * A party is considered active if the current date/time falls between its 'fromDT' and 'untilDT' fields.
 *
 * @param {Object} partyData - An object containing the party data to check. Should include 'fromDT' and 'untilDT' fields.
 *
 * @returns {boolean} Returns a boolean indicating whether the party is active.
 *
 * @example
 * const partyIsActive = checkPartyActiveByPartyData(partyData);
 */
export function checkPartyActiveByPartyData(partyData) {
  const untilDT = partyData.untilDT;
  const fromDT = partyData.fromDT;
  const now = Timestamp.now();

  return fromDT <= now && now < untilDT;
}

/**
 * Asynchronously retrieves a party document from the Firestore 'parties' collection by its ID.
 *
 * @param {string} partyUID - The unique identifier (UID) of the party to retrieve.
 *
 * @returns {Promise<Object>} Returns a Promise that resolves to an object representing the party document.
 *
 * @example
 * const partyData = await getPatyDataById('partyID1234');
 */
export async function getPatyDataById(partyUID) {
  const partyRef = doc(FIREBASE_DB, "parties", partyUID);
  const partyDoc = await getDoc(partyRef);

  if (!partyDoc.exists()) {
    return {};
  }

  return partyDoc.data();
}

/**
 * Asynchronously retrieves all party documents from the Firestore 'parties' collection.
 *
 * @returns {Promise<Array>} Returns a Promise that resolves to an array of objects, each representing a party document.
 *
 * @example
 * const allPartyData = await getAllPartyData();
 */
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

/**
 * Asynchronously retrieves all currently active party documents from the Firestore 'parties' collection.
 * A party is considered active if the current date/time falls between its 'fromDT' and 'untilDT' fields.
 *
 * @returns {Promise<Array>} Returns a Promise that resolves to an array of objects, each representing an active party document.
 *
 * @example
 * const allActivePartyData = await getAllActivePartiesData();
 */
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
