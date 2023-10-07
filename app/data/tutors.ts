import { QueryConstraint, collection, getDocs, query, where } from "firebase/firestore";
import Filters from "../types/filter";
import User from "../types/user";
import { db } from "../firebase/init";

export async function getTutors(filters: Filters) {
    const tutors: User[] = [];
    const queryConstraints: QueryConstraint[] = [where('accountType', '==', 'tutor')];

    if (filters.subjects && !filters.subjects.any) {
        const subjects = filters.subjects.subjects;
        queryConstraints.push(where('subjects', 'array-contains-any', subjects));
    }

    const tutorsRef = query(collection(db, 'users'), ...queryConstraints);
    const tutorsSnapshot = await getDocs(tutorsRef);
    tutorsSnapshot.forEach((doc) => {
        const tutor = doc.data() as User;
        tutors.push(tutor);
    });

    return tutors;
}