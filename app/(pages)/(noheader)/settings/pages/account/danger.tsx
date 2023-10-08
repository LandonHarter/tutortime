'use client'

import { deleteAccount } from "@/app/firebase/auth";
import User from "@/app/types/user";
import { Button, Modal, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsAccountDanger({ user }: { user: User | null }) {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);

    return (
        <div className='p-12 flex flex-col'>
            <h1 className='font-semibold text-4xl mt-12 mb-8'>Danger Zone</h1>
            <Button variant='bordered' color='danger' className='w-fit p-6 hover:bg-danger hover:text-white' onPress={onOpen}>Delete Account</Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className='w-full flex flex-col items-center p-6'>
                    <ModalHeader className='text-3xl'>Delete Account</ModalHeader>
                    <p className='text-center mb-4 text-gray-500'>Are you sure you want to delete your account? This action is irreversible.</p>

                    <div className='flex items-center'>
                        <Button variant='ghost' className='mt-4 mr-4' onPress={onOpenChange}>Cancel</Button>
                        <Button color='danger' className='mt-4' onPress={async () => {
                            setLoading(true);

                            try {
                                await deleteAccount();
                                toast.success('Successfully deleted your account!');
                                router.push('/');
                            } catch (e: any) {
                                toast.error(e.message);
                                setLoading(false);
                            }
                        }} isLoading={loading}>Delete Account</Button>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}