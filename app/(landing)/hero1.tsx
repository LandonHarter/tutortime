'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import Balancer from "react-wrap-balancer";

export default function LandingHero1() {
    return (
        <>
            <h1 className='w-4/6 text-6xl font-semibold mb-8 text-center'>
                <Balancer>
                    Connect with others who <Typewriter
                        words={['care', 'want to help', 'share your interests']}
                        loop
                        typeSpeed={80}
                        deleteSpeed={60}
                        delaySpeed={2500}
                        cursor
                        cursorStyle='|'
                    />
                </Balancer>
            </h1>
            <p className='text-2xl font-regular text-gray-500 mb-5'>School is hard. Get help on difficult subjects or help others by volunteering.</p>
            <div className='flex justify-center'>
                <Link href='/signin'>
                    <Button color='primary' className='mr-2 text-lg font-medium px-6 h-14'>Get Started</Button>
                </Link>
                <Link href='/about'>
                    <Button variant='bordered' className='ml-2 text-lg font-medium px-6 h-14'>Learn More</Button>
                </Link>
            </div>
        </>
    );
}