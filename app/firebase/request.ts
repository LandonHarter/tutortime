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

export async function getAppointments(apps: string[]) {
    const appointments: SessionRequest[] = [];
    for (let i = 0; i < apps.length; i++) {
        const appointment = await getDoc(doc(collection(db, 'appointments'), apps[i]));
        if (appointment.id === 'empty') continue;
        const app = appointment.data() as SessionRequest;
        app.date = new Date((app.date as any).seconds * 1000);
        appointments.push(app);
    }

    return appointments;
}