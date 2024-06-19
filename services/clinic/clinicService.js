import { arrayUnion, updateDoc, doc, collection, getDoc, } from "firebase/firestore";
import { CLOUD } from "../cloud/dataService";
import { LOCAL } from "../disk/dataService";
import { emptyPatient } from "../../utils/utils";
import { FIREBASE_DB } from "../../FirebaseConfig";


const collectionName = 'clinics';

// Adds a patient to both cloud and local storage
const addPatient = async (data) => {
    delete data.localDataSave;
    const cloudResult = await CLOUD_addPatient(data.token);
    const localResult = await LOCAL_addPatient(data);
    if(cloudResult.success && localResult.success) {
        return {success:true}
    }else{
        return {success:false}
    }
}

const getPatient= async (patientToken) => {
    try {
        const cloudPatient = await CLOUD.fetchDocument("patients", patientToken);
        const localPatients = await LOCAL.readLocalData();
        const localPatient = localPatients && localPatients.patients.find(patient => patient.token === patientToken);
        
        if (localPatient) {
            return localPatient;
        } else if (cloudPatient) {
            return cloudPatient;
        } else {
            return null; // Patient not found
        }
    } catch (error) {
        console.error("Error getting patient by token:", error);
        return null;
    }
}

// Retrieves patients' data from both cloud and local storage
const getPatients = async () => {
    try {
        const cloudPatients = await CLOUD.fetchDocument(collectionName, CLOUD.getUID());
        const localPatients = await LOCAL.readLocalData();
        const patientsWithDetails = cloudPatients.patients.map(cloudPatient => {
            const localPatient = localPatients && localPatients.patients.find(localPatient => localPatient.token === cloudPatient);
            if (localPatient) {
                return localPatient;
            } else {
                return emptyPatient(cloudPatient);
            }
            
        });
        return patientsWithDetails;
    } catch (error) {
        console.error("Error getting patients:", error);
        return [];
    }
}

// Adds a patient token to the cloud database
const CLOUD_addPatient = async (dataToken) => {
    try {
        const collectionData = await CLOUD.fetchDocument(collectionName, CLOUD.getUID());
        const collectionRef = await CLOUD.fetchCollection(collectionName);
        if (!collectionData.patients.some(token => token === dataToken)) {
            await updateDoc(collectionRef, {patients: arrayUnion(dataToken)});
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        throw new Error("cloud error: " + error.message);
        return { success: false, message: error.message };
    }
}

// Adds or Update Data of a patient to local storage
const LOCAL_addPatient = async (data) => {
    try {
        const existingData = await LOCAL.readLocalData();
        
        if (!existingData) {
            throw new Error("Local data does not exist.");
        }
        
        const existingPatientIndex = existingData.patients.findIndex(patient => patient.token === data.token);
        
        if (existingPatientIndex === -1) {
            existingData.patients.push(data);
            await LOCAL.initializeLocalData(existingData);
            return { success: true };
        } else {
            existingData.patients[existingPatientIndex] = data;
            await LOCAL.initializeLocalData(existingData);
            return { success: true };
        }
    } catch (error) {
        console.error("Error updating field and synchronizing:", error);
        return { success: false, message: "Failed to update field and synchronize.", error: error };
    }
}


const assignActivity = async (patientToken, activity) => {
    const cloudResult = await CLOUD_assignActivity(patientToken, activity);
    const localResult = await LOCAL_assignActivity(patientToken, activity);
    if(cloudResult.success && localResult.success) {
        return {success:true}
    }else{
        return {success:false, message: "Si è verificato un problema durante l'asseganzione dell'attività"}
    }
}

const CLOUD_assignActivity = async (patientToken, activity) => {
    const patientRef = doc(collection(FIREBASE_DB, "patients"), patientToken);
    await updateDoc(patientRef, {
        games: arrayUnion(activity)
    });    
    return { success: true };
}

const LOCAL_assignActivity = async (patientToken, activity) => {
    const existingData = await LOCAL.readLocalData();

    if (!existingData) {
        throw new Error("Nessun Paziente trovato per assegnare questa attività.")
    }

    const existingPatientIndex = existingData.patients.findIndex(patient => patient.token === patientToken);

    if (existingPatientIndex !== -1) {
        existingData.patients[existingPatientIndex].games.push(activity);
        await LOCAL.initializeLocalData(existingData);
        return {success: true}
    }
}


const getPatientActivities = async (patientToken) => {
    try {
        const cloudActivities = await CLOUD_getPatientActivities(patientToken);
        const localActivities = await LOCAL_getPatientActivities(patientToken);
        
        const allActivities = [...localActivities, ...cloudActivities];
        const uniqueActivities = allActivities.filter((activity, index, self) =>
            index === self.findIndex((a) => (
                a.id === activity.id
            ))
        );
        return uniqueActivities;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

const CLOUD_getPatientActivities = async (patientToken) => {
    const patient = await CLOUD.fetchDocument("patients", patientToken);
    const CLOUD_ACTIVITIES = patient.games;
    return CLOUD_ACTIVITIES;
}

const LOCAL_getPatientActivities = async (patientToken) => {
    const existingData = await LOCAL.readLocalData();
    const existingPatientIndex = existingData.patients.findIndex(patient => patient.token === patientToken);
    const LOCAL_ACTIVITIES = existingData.patients[existingPatientIndex].games;
    return LOCAL_ACTIVITIES;
}

export const CLINICS =  {
    addPatient,
    getPatients,
    getPatient,
    assignActivity,
    getPatientActivities,
}
