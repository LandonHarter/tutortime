'use client'

import { signInWithProvider } from "@/app/firebase/auth";
import { auth } from "@/app/firebase/init";
import { Avatar, Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

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
                <Avatar icon={null} src={user?.photoURL ?? ''} showFallback className="cursor-pointer" />
            </>
        );
    }

    if (loading) return (<Skeleton className="flex rounded-full w-10 h-10" />);
    else if (user) return userUi();
    else return noUserUi();
}