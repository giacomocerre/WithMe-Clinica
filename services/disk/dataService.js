import * as FileSystem from "expo-file-system";
import { getJson, setJson } from "../../utils/utils";
import { CLOUD } from "../cloud/dataService";
import { shareAsync } from "expo-sharing";
import * as DocumentPicker from 'expo-document-picker';


// Constant defining the filename for user data storage.
const dataJSON = "userData.json";
const localDataDir = `${FileSystem.documentDirectory}localData/`

// Function to check if a directory exists at the given URI asynchronously.
const directoryExists = async (directoryUri) => {
  try {
    const { exists } = await FileSystem.getInfoAsync(directoryUri);
    return exists;
  } catch (error) {
    console.error("Error checking directory existence:", error);
    return false;
  }
};

// Function to check if the user data file exists locally.
const existLocalFile = async () => {
  const fileInfo = await FileSystem.getInfoAsync(getUserData());
  return fileInfo.exists;
};

// Function to create a directory for the logged-in user based on their email.
const createDirectory = async () => {
  const email = CLOUD.getEmail();
  if (!email) {
    return false;
  }
  const directoryUri = `${localDataDir}${email}/`;
  try {
    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
  } catch (error) {
    return false;
  }
};

// Function to get the full path of the user data file based on the user's email.
const getUserData = () => CLOUD.getEmail() ? `${localDataDir}${CLOUD.getEmail()}/${dataJSON}` : null;

// Function to get the full path of the user directory based on the user's email.
const getUserDirectory = () => CLOUD.getEmail() ? `${localDataDir}${CLOUD.getEmail()}` : null;

const initializeLocalData = async (data) => {
    try {
        if (getUserDirectory()) {
            await createDirectory();
        }
        await FileSystem.writeAsStringAsync(getUserData(), setJson(data));
    } catch (error) {
        console.error("Error initializing local data:", error);
        throw error; 
    }
};

// Function to read user data from the local file system if the file exists.
const readLocalData = async () => {
    const dataContents = await FileSystem.readAsStringAsync(getUserData());
    return (await existLocalFile()) ? getJson(dataContents) : null;
};

// Function to delete the directory for the logged-in user based on their email.
const deleteLocalData = async () => {
  const email = CLOUD.getEmail();
  if (!email) {
    return false;
  }
  const directoryUri = `${localDataDir}`;
  try {
    const exists = await directoryExists(directoryUri);
    if (exists) {
      await FileSystem.deleteAsync(directoryUri, { idempotent: true });
    }
  } catch (error) {
    console.error("Error deleting directory:", error);
    return false;
  }
};

// Function to create a local backup of the data
const downloadBackup = async () => {
  const filename = `BACKUP_${new Date().toISOString().slice(0, 10)}_${CLOUD.getEmail()}.json`;
  try {
    const response = await fetch(getUserData());
    if (!response.ok) {
      throw new Error("Failed to download file");
    }
    const fileUri = FileSystem.documentDirectory + filename;
    const fileUriResult = await FileSystem.writeAsStringAsync(fileUri, await response.text());
    save(fileUri);
  } catch (error) {
    console.error("Failed to download file:", error);
  }
};

// Function to upload a backup of the data
const uploadBackup = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });
    if (result.assets[0].uri) {
      const backupDate = result.assets[0].name.split('_')[1]
      const jsonContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
      const jsonData = JSON.parse(jsonContent);
      if(jsonData.email ===  CLOUD.getEmail()){
        await initializeLocalData(jsonData);
        return {type: "success", data: jsonData, backupDate: backupDate}
        
      }else{
        return {type: "error", message: "Questo Backup non è associato a questo account."}
      }
    }
  } catch (error) {
    throw new Error ("Failed to pick and upload file:", error);
  }
};

// Open share device menu for save files
const save = async (uri) => {
  try {
    await shareAsync(uri);
  } catch (error) {
    console.error("Failed to share file:", error);
  }
};


// Exported object containing local data manipulation functions for external use.
export const LOCAL = {
  initializeLocalData,
  readLocalData,
  existLocalFile,
  deleteLocalData,
  downloadBackup,
  uploadBackup
};
