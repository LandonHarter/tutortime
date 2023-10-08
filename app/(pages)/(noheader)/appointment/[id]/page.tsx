'use client'

import Loading from "@/app/components/loading/loading";
import { db } from "@/app/firebase/init";
import Apps from "@/app/types/apps";
import SessionRequest from "@/app/types/request";
import User from "@/app/types/user";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { collection, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function AppointmentPage() {
    const router = useRouter();
    const appointmentId = usePathname().split('/')[2];
    const [tutor, setTutor] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        (async () => {
            const appointmentRef = doc(collection(db, 'appointments'), appointmentId);
            const appointment = await getDoc(appointmentRef);
            if (!appointment.exists()) return;

            const appointmentData = appointment.data() as SessionRequest;
            if (!appointmentData) {
                router.push('/');
                return;
            }

            const tutorId = appointmentData.to;
            const tutorRef = doc(collection(db, 'users'), tutorId);
            const t = await getDoc(tutorRef);
            if (!t.exists()) {
                router.push('/');
                return;
            }

            setTutor(t.data() as User);
            setLoading(false);
        })();
    })

    if (loading || !tutor) return <Loading visible={loading} />;
    return (
        <>
            <Link href='/' className='absolute left-4 top-4 flex items-center z-10'>
                <Image src='/images/icons/icon128.png' alt='icon' width={45} height={45} />
                <h1 className='text-2xl h-fit mx-2 flex'>tutor<div className='mr-0.5' /><strong className='font-bold'>time</strong></h1>
            </Link>

            <div className='absolute left-0 top-0 w-screen h-screen flex flex-col items-center justify-center'>
                {tutor.apps?.zoomEnabled &&
                    <Button className='bg-[#2D8CFF] py-8 px-6 font-medium text-2xl w-[300px] text-white mb-2' startContent={<Image src='/images/providers/zoom.webp' alt='zoom' width={32} height={32} />} onPress={onOpen}>Join Zoom Meeting</Button>
                }
                {tutor.apps?.googleMeetEnabled &&
                    <Link href={tutor.apps?.googleMeet?.googleMeetLink || ''} target='_blank'>
                        <Button className='w-[300px] py-8 px-6 font-medium text-2xl mt-2' startContent={<Image src='/images/providers/google-meet.png' alt='zoom' width={32} height={32} />} onPress={onOpen}>Join Google Meet</Button>
                    </Link>
                }
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-8 overflow-hidden'>
                <ModalContent className='w-full flex flex-col items-center'>
                    <ModalHeader className='flex flex-col gap-1 text-3xl font-medium'>Zoom Meeting Details</ModalHeader>
                    <ModalBody>
                        <Link href={tutor.apps?.zoom?.zoomLink || ''} target='_blank' className='text-lg text-center text-blue-500 mb-8'>{tutor.apps?.zoom?.zoomLink}</Link>
                        <p className='text-lg text-center'>Meeting ID: {tutor.apps?.zoom?.zoomId}</p>
                        <p className='text-lg text-center'>Password: {tutor.apps?.zoom?.zoomPassword}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}