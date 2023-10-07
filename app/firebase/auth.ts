import { GoogleAuthProvider, OAuthProvider, UserCredential, getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "./init";
import User from "../types/user";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function signInWithEmail(email: string, password: string): Promise<User> {
    const uc = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUser(uc.user.uid);
    if (!user) {
        throw new Error('User not found in database');
    }

    return user;
}

export async function signInWithProvider(providerName: 'google' | 'microsoft'): Promise<User> {
    const provider = providerName === 'google' ? new GoogleAuthProvider() : new OAuthProvider('microsoft.com');
    const uc = await signInWithPopup(auth, provider);
    const additionalUserInfo = getAdditionalUserInfo(uc);

    if (additionalUserInfo?.isNewUser) {
        await createUserDocument(uc);
    }

    const user = await getUser(uc.user.uid);
    if (!user) {
        throw new Error('User not found in database');
    }

    return user;
}

export async function getUser(uid: string): Promise<User | null> {
    const userDoc = doc(collection(db, 'users'), uid);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
        return userSnap.data() as User;
    }

    return null;
}

async function createUserDocument(user: UserCredential) {
    const userDoc = doc(collection(db, 'users'), user.user.uid);
    const userObj: User = {
        id: user.user.uid,
        name: user.user.displayName ?? '',
        email: user.user.email ?? '',
        picture: user.user.photoURL ?? '',
        createdAt: Timestamp.now()
    };
    await setDoc(userDoc, userObj);
}