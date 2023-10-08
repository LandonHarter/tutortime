import { collection, doc, getDoc } from "firebase/firestore";
import SessionRequest from "../types/request";
import { db } from "./init";

export async function getRequests(req: string[]) {
    const requests: SessionRequest[] = [];
    for (let i = 0; i < req.length; i++) {
        const request = await getDoc(doc(collection(db, 'requests'), req[i]));
        if (request.id === 'empty') continue;
        requests.push(request.data() as SessionRequest);
    }

    return requests;
}