import Image from 'next/image';
import Link from 'next/link';
import SignUpForm from './form';

export default function SignUpPage() {
    return (
        <>
            <Link href='/' className='absolute left-4 top-4 flex items-center'>
                <Image src='/images/icons/icon128.png' alt='icon' width={45} height={45} />
                <h1 className='text-2xl h-fit mx-2 flex'>tutor<div className='mr-0.5' /><strong className='font-bold'>time</strong></h1>
            </Link>
            <div className='w-screen h-screen flex'>
                <div className='w-3/6 h-screen flex flex-col justify-center items-center'>
                    <SignUpForm />
                </div>
                <div className='w-3/6 h-screen bg-blue-500'>

                </div>
            </div>
        </>
    );
}