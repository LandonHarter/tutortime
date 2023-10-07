import { Timestamp } from "firebase/firestore";

type AccountType = 'student' | 'tutor';
type User = {
    id: string;
    name: string;
    email: string;
    picture: string;
    createdAt: Timestamp;
    finishedOnboarding: boolean;
    accountType: AccountType;
    grade?: string;
    subjects?: string[];
    portrait?: string;
    bio?: string;
};

export type { User, AccountType };
export default User;