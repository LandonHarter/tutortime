'use client'

import User from "@/app/types/user";
import { Avatar } from "@nextui-org/react";

export default function DashboardMainHome({ user }: { user: User | null }) {
    if (!user) return;
    return (
        <div className='p-12 flex flex-col'>
            <div className='flex items-center'>
                <Avatar src={user.picture} size='lg' className='mr-4' />
                <h1 className='font-medium text-4xl'>Welcome back, {user.name}!</h1>
            </div>
            <div className='w-full mx-[0.0833333333%] h-[3px] rounded-full bg-gray-200 my-4' />
        </div>
    );
}