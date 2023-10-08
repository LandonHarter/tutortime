import { Timestamp } from "firebase/firestore";
import Apps from "./apps";

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
    apps?: Apps;
};

export type { User, AccountType };
export default User;