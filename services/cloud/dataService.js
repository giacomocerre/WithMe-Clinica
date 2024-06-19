import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB, getAuth } from "../../FirebaseConfig";

// Retrieves the current user's email
const getEmail = () => {
  const user = getAuth().currentUser;
  return user ? user.email : null;
};

// Retrieves the current user's UID
const getUID = () => {
  const user = getAuth().currentUser;
  return user ? user.uid : null;
}

// Checks if a user exists in the database
const userExist = async () => {
  const querySnap = await getDocs(
    query(
      collection(FIREBASE_DB, "users"),
      where("email", "==", getEmail()),
      limit(1)
    )
  );
  return !querySnap.empty;
};

// Checks if a token exists for the current user
const tokenExist = async (token) => {
  const querySnap = await getDocs(
    query(
      collection(FIREBASE_DB, "users"),
      where("email", "==", getEmail()),
      limit(1)
    )
  );
  return !querySnap.empty && querySnap.docs[0].data().token === token;
};

// Retrieves data of the current user from the database
const getUserData = async () => {
  const userDoc = await getDoc(doc(collection(FIREBASE_DB, "users"), getUID()));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    return null;
  }
};

// Adds a new document to a specified collection
const newDoc = async (collection, data, id) => {
  await setDoc(doc(FIREBASE_DB, collection, (id ? id : getUID())), data);
};

// fetch data in a specific document
const fetchDocument = async (collectionName, id) => {
  const docRef = doc(collection(FIREBASE_DB, collectionName), id);
  const snapshot = await getDoc(docRef);

  if(snapshot.exists()){
    return snapshot.data();
  } else {
    throw new Error("Document '" + id + "' in collection '" + collectionName + "' does not exist");
  }
}

//fetch all data in a specific collection
const fetchCollection = async (db) => {
  const collectionRef = collection(FIREBASE_DB, db);
  const querySnapshot = await getDocs(collectionRef);
  const documentsData = [];

  querySnapshot.forEach((doc) => {
    documentsData.push(doc.data());
  });

  return documentsData;
};


// const addAnimation = async (animationData) => {
//   const randomUID = Math.floor(Math.random() * 1000000).toString();
//   await setDoc(doc(FIREBASE_DB, "animations", randomUID), animationData);
// };

export const CLOUD = {
  newDoc,
  getUID,
  getEmail,
  userExist,
  getUserData,
  fetchDocument,
  fetchCollection,
  tokenExist,
};
