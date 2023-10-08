'use client'

import { auth } from "@/app/firebase/init";
import User from "@/app/types/user";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getUser } from "@/app/firebase/auth";
import Link from "next/link";
import Image from "next/image";
import styles from './page.module.scss';
import HouseSVG from "@/app/svg/house";
import DashboardMainHome from "./pages/main/home";
import DashboardMainOutgoingRequests from "./pages/main/outgoing";
import RequestSVG from "@/app/svg/request";
import DashboardMainIncomingRequests from "./pages/main/incoming";

export default function DashboardPage() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [validated, setValidated] = useState(false);
    const [selectedItem, setSelectedItem] = useState('main.home');
    const [isStudent, setIsStudent] = useState(false);
    const pageUi: { [page: string]: React.ReactNode } = {
        'main.home': <DashboardMainHome user={currentUser} />,
        'main.outgoing': <DashboardMainOutgoingRequests user={currentUser} />,
        'main.incoming': <DashboardMainIncomingRequests user={currentUser} />
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        } else if (user) {
            (async () => {
                const u = await getUser(user.uid);
                if (!u) return router.push('/signin');

                setCurrentUser(u);
                setIsStudent(u.accountType == 'student');
                setValidated(true);
            })();
        }
    }, [loading]);

    function SidebarItem({ title, icon, href }: { title: string, icon: React.ReactNode, href: string }) {
        return (
            <div className={`flex items-center ml-3 cursor-pointer rounded-md p-2 transition-all bg-transparent ${href == selectedItem && 'bg-zinc-300'}`} onClick={() => {
                setSelectedItem(href);
            }}>
                {icon}
                <h1 className='text-lg font-normal'>{title}</h1>
            </div>
        );
    }

    if (!validated) return;
    return (
        <div className='flex w-screen h-screen p-1.5'>
            <div className='w-1/6 h-full rounded-xl flex flex-col'>
                <Link href='/' className='flex items-center ml-4 mt-4 mb-12'>
                    <Image src='/images/icons/icon128.png' alt='icon' width={45} height={45} />
                    <h1 className='text-2xl h-fit mx-2 flex'>tutor<div className='mr-0.5' /><strong className='font-bold'>time</strong></h1>
                </Link>

                <h1 className='text-xl font-normal text-gray-600 ml-5 mb-4'>Main</h1>
                <div className='w-11/12 h-0.5 bg-gray-300 ml-5 mb-2' />
                <SidebarItem title='Home' icon={<HouseSVG className={styles.sidebar_icon} />} href='main.home' />
                {isStudent && <SidebarItem title='Outgoing Requests' icon={<RequestSVG className={`${styles.sidebar_icon} ${styles.request_icon}`} />} href='main.outgoing' />}
                {!isStudent && <SidebarItem title='Incoming Requests' icon={<RequestSVG className={`${styles.sidebar_icon} ${styles.request_icon}`} />} href='main.incoming' />}
            </div>

            <div className='w-5/6 h-full p-4'>
                <div className='w-full h-full rounded-xl flex flex-col bg-white border-2 border-gray-300 shadow-2xl'>
                    {pageUi[selectedItem]}
                </div>
            </div>
        </div>
    );
}