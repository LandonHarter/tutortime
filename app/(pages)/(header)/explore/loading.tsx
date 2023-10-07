'use client'

import { Spinner } from "@nextui-org/react";

export default function LoadingTutors() {
    return (
        <div className='w-full h-[300px] flex items-center justify-center'>
            <Spinner size='lg' label='Finding tutors...' className='font-medium' style={{
                transform: 'scale(1.5)',
                fontSize: '1.5rem !important'
            }} />
        </div>
    );
}