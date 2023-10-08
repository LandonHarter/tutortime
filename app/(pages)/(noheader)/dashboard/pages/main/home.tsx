'use client'

import { getUser } from "@/app/firebase/auth";
import { getAppointments } from "@/app/firebase/request";
import SessionRequest from "@/app/types/request";
import User from "@/app/types/user";
import { formatGrade } from "@/app/util/format";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardMainHome({ user }: { user: User | null }) {
    const [appointments, setAppointments] = useState<SessionRequest[]>([]);
    const [users, setUsers] = useState<{ [uid: string]: User }>({});

    useEffect(() => {
        (async () => {
            if (!user) return;

            const apps = await getAppointments(user.appointments || []);
            const users: { [uid: string]: User } = {};
            for (const app of apps) {
                const u = await getUser(app.from);
                if (!u) continue;
                users[app.from] = u;
            }

            setUsers(users);
            setAppointments(apps);
        })();
    }, []);

    if (!user) return;
    return (
        <div className='p-12 flex flex-col h-full'>
            <div className='flex items-center'>
                <Avatar src={user.picture} size='lg' className='mr-4' />
                <h1 className='font-medium text-4xl'>Welcome back, {user.name}!</h1>
            </div>
            <div className='w-full mx-[0.0833333333%] h-[3px] rounded-full bg-gray-200 my-4' />

            {appointments.map((app, index) => {
                const from = users[app.from];

                return (
                    <Link href={`/appointment/${app.id}`} key={index} className='w-full flex items-center justify-between p-6 bg-gray-100 rounded-lg mb-4'>
                        <div className='flex items-center'>
                            <Avatar src={from.picture} size='md' className='mr-4' />
                            <div className='flex flex-col'>
                                <h1 className='font-medium text-2xl'>{from.name}</h1>
                                <p>{formatGrade(from.grade || '')} Grade</p>
                            </div>
                        </div>

                        <div className='flex flex-col items-end'>
                            <p className='font-semibold text-xl'>{app.date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                            <p className='font-medium font-lg text-gray-500'>{app.date.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric'
                            })}</p>
                        </div>
                    </Link>
                );
            })}
            {appointments.length === 0 &&
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <h1 className='font-medium text-4xl'>You have no scheduled appointments.</h1>
                    {user.accountType === 'student' ? <Link href='/explore'><Button color='primary' className='mt-4 font-medium text-xl p-6'>Find a Tutor</Button></Link> :
                        <p className='text-2xl font-normal mt-4 text-gray-500'>Take a break! Relax!</p>
                    }
                </div>
            }
        </div>
    );
}