'use client'

import { auth } from "@/app/firebase/init";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SettingsAccountGeneral from "./pages/account/general";
import UserSVG from "@/app/svg/user";
import styles from './page.module.scss';
import WarningSVG from "@/app/svg/warning";
import SettingsAccountDanger from "./pages/account/danger";
import User from "@/app/types/user";
import { getUser } from "@/app/firebase/auth";

export default function SettingsPage() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [validated, setValidated] = useState(false);
    const [selectedItem, setSelectedItem] = useState('account.general');
    const pageUi: { [page: string]: React.ReactNode } = {
        'account.general': <SettingsAccountGeneral user={currentUser} />,
        'account.danger': <SettingsAccountDanger />
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/signin');
        } else if (user) {
            (async () => {
                setCurrentUser(await getUser(user.uid));
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

                <h1 className='text-xl font-normal text-gray-600 ml-5 mb-4'>Account</h1>
                <div className='w-11/12 h-0.5 bg-gray-300 ml-5 mb-2' />
                <SidebarItem title='General' icon={<UserSVG className={styles.sidebar_icon} />} href='account.general' />
                <SidebarItem title='Danger Zone' icon={<WarningSVG className={styles.sidebar_icon} />} href='account.danger' />
            </div>

            <div className='w-5/6 h-full p-4'>
                <div className='w-full h-full rounded-xl flex flex-col bg-white border-2 border-gray-300 shadow-2xl'>
                    {pageUi[selectedItem]}
                </div>
            </div>
        </div>
    );
}