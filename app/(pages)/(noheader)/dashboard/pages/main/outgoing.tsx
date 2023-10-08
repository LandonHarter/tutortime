'use client'

import User from "@/app/types/user";

export default function DashboardMainOutgoingRequests({ user }: { user: User | null }) {
    if (!user) return;
    return (
        <></>
    );
}