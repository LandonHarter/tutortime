'use client'

import { getUser } from "@/app/firebase/auth";
import User from "@/app/types/user";
import { formatTimestamp } from "@/app/util/format";
import { randomColor } from "@/app/util/random";
import { Avatar, Button, Chip, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

export default function TutorPage() {
    const uid = usePathname().split('/')[2];
    const [tutor, setTutor] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            setTutor(await getUser(uid));
        })();
    }, [uid]);

    if (!tutor) {
        return (
            <div className='w-full flex justify-center items-center' style={{ height: 'calc(75vh - 88px)' }}>
                <Spinner label='Loading...' className='font-semibold text-2xl scale-[1.75] text-center' />
            </div>
        );
    }
    return (
        <div className='w-full h-full'>
            <div className='w-full h-72' style={{
                backgroundColor: randomColor()
            }} />
            <Avatar src={tutor.portrait || '/images/misc/noportrait.jpg'} size='lg' name={tutor.name} className='absolute left-16 top-[360px] scale-[2.25]' />

            <div className='flex items-center justify-between'>
                <div className='flex flex-col ml-44 mt-2 mb-16'>
                    <h1 className='font-bold text-4xl'>{tutor.name}</h1>
                    <h2 className='font-medium text-gray-400'>Joined {formatTimestamp(tutor.createdAt)}</h2>
                </div>

                <div className='flex flex-col mr-8 mt-2 mb-16'>
                    <Link href={`/book?tutorId=${tutor.id}`}><Button className='font-medium text-xl p-6'>Book Session</Button></Link>
                </div>
            </div>

            <p className='ml-16 text-gray-500 font-normal text-lg' style={{
                width: 'calc(100vw - 128px)'
            }}>{tutor.bio || 'No bio.'}</p>

            <div className='flex flex-col mt-24 ml-16'>
                <h1 className='font-medium text-4xl mb-2'>Skills</h1>
                <div className='h-0.5 bg-gray-300 rounded-full mb-4' style={{ width: 'calc(100vw - 128px)' }} />

                <div className='flex flex-wrap items-center w-full'>
                    {tutor.subjects?.map((subject, index) => {
                        return (
                            <Chip variant='faded' key={index} size='lg' className='mx-1 mb-4 px-5 py-2' classNames={{
                                base: 'w-fit h-fit',
                                content: 'font-medium text-xl'
                            }} startContent={<Image src={`/images/subjects/${subject.toLowerCase()}.png`} alt={subject} width={22} height={22} className='mr-1' />}>
                                {subject}
                            </Chip>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}