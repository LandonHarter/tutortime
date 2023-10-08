'use client'

import { getUser, updateUser } from "@/app/firebase/auth";
import { db } from "@/app/firebase/init";
import { getRequests } from "@/app/firebase/request";
import CheckSVG from "@/app/svg/check";
import CrossSVG from "@/app/svg/cross";
import SessionRequest from "@/app/types/request";
import User from "@/app/types/user";
import { formatGrade } from "@/app/util/format";
import { Avatar, Button } from "@nextui-org/react";
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function DashboardMainIncomingRequests({ user }: { user: User | null }) {
    const [requests, setRequests] = useState<SessionRequest[]>([]);
    const [users, setUsers] = useState<{ [uid: string]: User }>({});

    useEffect(() => {
        (async () => {
            if (!user) return;

            const reqs = await getRequests(user.incomingRequests || []);
            const users: { [uid: string]: User } = {};
            for (const req of reqs) {
                const u = await getUser(req.from);
                if (!u) continue;

                req.date = new Date((req.date as any).seconds * 1000);
                users[req.from] = u;
            }

            setUsers(users);
            setRequests(reqs);
        })();
    }, []);

    async function acceptRequest(request: SessionRequest) {
        const reqsCopy = [...requests];
        reqsCopy.splice(reqsCopy.indexOf(request), 1);
        setRequests(reqsCopy);

        const toDoc = doc(collection(db, 'users'), request.to);
        const fromDoc = doc(collection(db, 'users'), request.from);

        await updateDoc(toDoc, {
            incomingRequests: arrayRemove(request.id),
            appointments: arrayUnion(request.id)
        });
        await updateDoc(fromDoc, {
            outgoingRequests: arrayRemove(request.id),
            appointments: arrayUnion(request.id)
        });
        await deleteDoc(doc(collection(db, 'requests'), request.id));
        await setDoc(doc(collection(db, 'appointments'), request.id), {
            from: request.from,
            to: request.to,
            date: request.date,
            id: request.id,
        });

        await updateUser(request.from);
        await updateUser(request.to);
    }

    async function rejectRequest(request: SessionRequest) {
        const reqsCopy = [...requests];
        reqsCopy.splice(reqsCopy.indexOf(request), 1);
        setRequests(reqsCopy);

        const toDoc = doc(collection(db, 'users'), request.to);
        const fromDoc = doc(collection(db, 'users'), request.from);

        await updateDoc(toDoc, {
            incomingRequests: arrayRemove(request.id)
        });
        await updateDoc(fromDoc, {
            outgoingRequests: arrayRemove(request.id)
        });
        await deleteDoc(doc(collection(db, 'requests'), request.id));

        await updateUser(request.from);
        await updateUser(request.to);
    }

    if (!user) return;
    return (
        <div className='flex flex-col w-full h-full p-6'>
            {requests.map((request, index) => {
                const from = users[request.from];

                return (
                    <div key={index} className='w-full flex items-center justify-between p-6 bg-gray-100 rounded-lg mb-4'>
                        <div className='flex items-center'>
                            <Avatar src={from.picture} size='md' className='mr-4' />
                            <div className='flex flex-col'>
                                <h1 className='font-medium text-2xl'>{from.name}</h1>
                                <p>{formatGrade(from.grade || '')} Grade</p>
                            </div>
                            <p className='font-bold text-2xl mx-8'>@</p>
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold text-xl'>{request.date.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <p className='font-medium font-lg text-gray-500'>{request.date.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}</p>
                            </div>
                        </div>

                        <div className='flex items-center'>
                            <Button isIconOnly variant='light' color='success' className='!rounded-full p-8 mr-2' onPress={() => {
                                acceptRequest(request);
                            }}>
                                <CheckSVG className='aspect-square min-h-[2rem] min-w-[2rem]' />
                            </Button>
                            <Button isIconOnly variant='light' color='danger' className='!rounded-full p-8 ml-2' onPress={() => {
                                rejectRequest(request);
                            }}>
                                <CrossSVG className='aspect-square min-h-[1.5rem] min-w-[1.5rem]' />
                            </Button>
                        </div>
                    </div>
                );
            })}

            {requests.length === 0 &&
                <div className='flex flex-col w-full h-full justify-center items-center'>
                    <h1 className='font-medium text-4xl'>You have no incoming requests.</h1>
                </div>
            }
        </div>
    );
}