'use client'

import { auth, db } from "@/app/firebase/init";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useAuthState } from "react-firebase-hooks/auth";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Button } from "@nextui-org/react";
import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getUser, updateUser } from "@/app/firebase/auth";
import { toast } from "sonner";

export default function BookPage() {
    const params = useSearchParams();
    const router = useRouter();
    const tutorId = params.get('tutorId');
    const [user, loading, error] = useAuthState(auth);
    const [validated, setValidated] = useState(false);
    const [sending, setSending] = useState(false);

    type ValuePiece = Date | null;
    const [sessionDate, setSessionDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());

    async function createRequest() {
        const requestRef = doc(collection(db, 'requests'));
        await setDoc(requestRef, {
            from: user?.uid,
            to: tutorId,
            date: sessionDate,
            id: requestRef.id
        });
        await updateDoc(doc(collection(db, 'users'), user?.uid), {
            outgoingRequests: arrayUnion(requestRef.id)
        });
        await updateDoc(doc(collection(db, 'users'), tutorId || ''), {
            incomingRequests: arrayUnion(requestRef.id)
        });
        router.push('/dashboard');
    }

    useEffect(() => {
        if (loading) return;
        if (!loading && !user) {
            router.push('/signin');
            return;
        } else if (user) {
            setValidated(true);
        }
    }, [loading]);

    if (!validated) return;
    return (
        <div className='w-full h-full mt-40 flex flex-col items-center'>
            <h1 className='font-semibold text-4xl mb-8'>Book a Session</h1>
            <DateTimePicker onChange={setSessionDate} value={sessionDate} className='mb-6' />
            <Button color='primary' className='font-medium text-xl p-6' isLoading={sending} onPress={async () => {
                const u = await getUser(user?.uid || '');
                if (u?.accountType === 'tutor') {
                    toast.error('Tutors cannot book sessions.');
                    return;
                }

                setSending(true);
                await createRequest();
                await updateUser(user?.uid || '');
                setSending(false);
            }}>Send Session Request</Button>
        </div>
    );
}