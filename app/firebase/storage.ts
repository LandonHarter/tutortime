import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./init";

export async function uploadFile(file: File, path: string) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}