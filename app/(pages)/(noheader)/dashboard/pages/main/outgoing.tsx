'use client'

import { getUser } from "@/app/firebase/auth";
import { getRequests } from "@/app/firebase/request";
import SessionRequest from "@/app/types/request";
import User from "@/app/types/user";
import { formatGrade } from "@/app/util/format";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DashboardMainOutgoingRequests({ user }: { user: User | null }) {
    const [requests, setRequests] = useState<SessionRequest[]>([]);
    const [users, setUsers] = useState<{ [uid: string]: User }>({});

    useEffect(() => {
        (async () => {
            if (!user) return;

            const reqs = await getRequests(user.outgoingRequests || []);
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

    if (!user) return;
    return (
        <div className='flex flex-col w-full p-6'>
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
                    </div>
                );
            })}
        </div>
    );
}