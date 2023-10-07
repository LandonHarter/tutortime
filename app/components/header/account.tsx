'use client'

import { auth } from "@/app/firebase/init";
import LogoutSVG from "@/app/svg/logout";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from './header.module.scss';

export default function HeaderAccount() {
    const [user, loading, error] = useAuthState(auth);

    function noUserUi() {
        return (
            <>
                <Link href='/signin'>
                    <Button color="primary" className="font-medium text-md p-6">Get Started</Button>
                </Link>
            </>
        );
    }

    function userUi() {
        return (
            <>
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar icon={null} src={user?.photoURL ?? ''} showFallback className="cursor-pointer" />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key='signout' className={`text-danger ${styles.logout}`} startContent={<LogoutSVG className='w-5 h-5 stroke-danger-500 text-danger' />} onClick={() => {
                            auth.signOut();
                        }}>Sign Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    }

    if (loading) return (<Skeleton className="flex rounded-full w-10 h-10" />);
    else if (user) return userUi();
    else return noUserUi();
}