import styles from './header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import HeaderAccount from './account';

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href='/' className='flex items-center'>
                <Image src='/images/icons/icon64.png' alt='EcoTrackr Logo' width={40} height={40} />
                <h1 className='text-2xl h-fit mx-2 flex'>tutor<div className='mr-0.5' /><strong className='font-bold'>time</strong></h1>
            </Link>
            <div className='flex items-center'>
                <nav className='flex items-center h-full mr-10'>
                    <ul className='flex flex-row items-center'>
                        <Link href='/'><li className='font-medium text-xl mx-6'>Dashboard</li></Link>
                        <Link href='/'><li className='font-medium text-xl mx-6'>About</li></Link>
                        <Link href='/'><li className='font-medium text-xl mx-6'>Explore</li></Link>
                    </ul>
                </nav>
                <HeaderAccount />
            </div>
        </header>
    );
}