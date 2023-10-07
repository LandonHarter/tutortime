import { QueryConstraint, collection, getDocs, limit, query, where } from "firebase/firestore";
import Filters from "../types/filter";
import User from "../types/user";
import { db } from "../firebase/init";

export async function getTutors(filters: Filters) {
    const tutors: User[] = [];
    const queryConstraints: QueryConstraint[] = [where('accountType', '==', 'tutor'), limit(25)];

    const tutorsRef = query(collection(db, 'users'), ...queryConstraints);
    const tutorsSnapshot = await getDocs(tutorsRef);
    tutorsSnapshot.forEach((doc) => {
        const tutor = doc.data() as User;
        let push = true;
        if (filters.subjects && filters.subjects.subjects.length > 0) {
            filters.subjects.subjects.forEach((subject) => {
                if (!tutor.subjects?.includes(subject)) push = false;
            });
        }

        if (push) tutors.push(tutor);
    });

    return tutors;
}