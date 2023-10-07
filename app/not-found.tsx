'use client'

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter();

    return (
        <section className='w-full h-full flex flex-col justify-center items-center' style={{ height: 'calc(0.75 * (100vh - 88px))' }}>
            <h3 className='text-2xl font-bold mb-4 text-purple-500' style={{ color: 'hsl(var(--nextui-primary-700))' }}>404</h3>
            <h1 className='text-5xl font-semibold mb-6'>We couldn&apos;t find this page 🤷</h1>
            <p className='text-3xl font-normal text-gray-500 mb-6'>We looked all over for this page and couldn&apos;t find it. Try another place.</p>
            <div className='flex justify-center'>
                <Button variant='bordered' className='text-xl font-semibold mr-3 px-6 h-12' onClick={() => {
                    router.back();
                }}>← Go Back</Button>
                <Button color='primary' className='text-xl font-semibold ml-3 px-6 h-12' onClick={() => router.push('/')}>Continue Home</Button>
            </div>
        </section>
    );
}