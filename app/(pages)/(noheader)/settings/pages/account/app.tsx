'use client'

import { db } from "@/app/firebase/init";
import Apps from "@/app/types/apps";
import User from "@/app/types/user";
import { Accordion, AccordionItem, Button, Checkbox, Input } from "@nextui-org/react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export default function SettingsAccountApps({ user }: { user: User | null }) {
    const [apps, setApps] = useState<Apps>(user?.apps || {
        zoomEnabled: false
    });
    const [saving, setSaving] = useState(false);

    async function save() {
        const userRef = doc(collection(db, 'users'), user?.id);
        await updateDoc(userRef, {
            apps: apps
        });
    }

    if (!user) return;

    const isStudent = user.accountType === 'student';
    return (
        <div className={`p-12 flex items-center ${isStudent ? 'justify-center h-5/6' : 'justify-between'}`}>
            {isStudent ?
                <div className='flex flex-col items-center'>
                    <h1 className='font-medium text-5xl mb-4'>Only tutors can manage their apps!</h1>
                    <p className='text-xl text-gray-500'>Tutors can manage their session applications such as video calls, whiteboards, or any other necessary tools here.</p>
                </div> :
                <div className='flex flex-col w-full h-full'>
                    <h1 className='font-semibold text-4xl mt-12 mb-8'>Session Apps</h1>

                    <Accordion variant='shadow' className='w-full'>
                        <AccordionItem key={0} title='Zoom' startContent={
                            <Checkbox color='primary' isSelected={apps.zoomEnabled} onValueChange={(e) => {
                                const appsCopy = {
                                    ...apps
                                };
                                appsCopy.zoomEnabled = e;
                                if (e) {
                                    appsCopy.zoom = {
                                        zoomLink: '',
                                        zoomPassword: '',
                                        zoomId: ''
                                    };
                                }

                                setApps(appsCopy);
                            }} />
                        } className='flex flex-col'>
                            <Input label='Zoom Link' placeholder='https://zoom.us/j/1234567890' className='mb-4' disabled={!apps.zoomEnabled} classNames={{ base: apps.zoomEnabled ? '' : 'opacity-70' }} value={apps.zoom?.zoomLink || ''} onChange={(e) => {
                                const appsCopy: any = {
                                    ...apps
                                };
                                appsCopy.zoom.zoomLink = e.target.value;
                                setApps(appsCopy);
                            }} />
                            <Input label='Zoom Password' placeholder='123456' className='mb-4' disabled={!apps.zoomEnabled} classNames={{ base: apps.zoomEnabled ? '' : 'opacity-70' }} value={apps.zoom?.zoomPassword || ''} onChange={(e) => {
                                const appsCopy: any = {
                                    ...apps
                                };
                                appsCopy.zoom.zoomPassword = e.target.value;
                                setApps(appsCopy);
                            }} />
                            <Input label='Zoom ID' placeholder='1234567890' className='mb-4' disabled={!apps.zoomEnabled} classNames={{ base: apps.zoomEnabled ? '' : 'opacity-70' }} value={apps.zoom?.zoomId || ''} onChange={(e) => {
                                const appsCopy: any = {
                                    ...apps
                                };
                                appsCopy.zoom.zoomId = e.target.value;
                                setApps(appsCopy);
                            }} />
                        </AccordionItem>

                        <AccordionItem key={1} title='Google Meet' startContent={
                            <Checkbox color='primary' isSelected={apps.googleMeetEnabled} onValueChange={(e) => {
                                const appsCopy = {
                                    ...apps
                                };
                                appsCopy.googleMeetEnabled = e;
                                if (e) {
                                    appsCopy.googleMeet = {
                                        googleMeetLink: '',
                                        code: ''
                                    };
                                }

                                setApps(appsCopy);
                            }} />
                        } className='flex flex-col'>
                            <Input label='Google Meet Link' placeholder='https://meet.google.com/xxx-xxxx-xxx' className='mb-4' disabled={!apps.googleMeetEnabled} classNames={{ base: apps.googleMeetEnabled ? '' : 'opacity-70' }} value={apps.googleMeet?.googleMeetLink || ''} onChange={(e) => {
                                const appsCopy: any = {
                                    ...apps
                                };
                                appsCopy.googleMeet.googleMeetLink = e.target.value;
                                setApps(appsCopy);
                            }} />
                            <Input label='Google Meet Code' placeholder='xxx-xxxx-xxx' className='mb-4' disabled={!apps.googleMeetEnabled} classNames={{ base: apps.googleMeetEnabled ? '' : 'opacity-70' }} value={apps.googleMeet?.code || ''} onChange={(e) => {
                                const appsCopy: any = {
                                    ...apps
                                };
                                appsCopy.googleMeet.code = e.target.value;
                                setApps(appsCopy);
                            }} />
                        </AccordionItem>
                    </Accordion>

                    <Button color='primary' className='mt-4 w-fit p-6 font-medium text-xl' onClick={async () => {
                        setSaving(true);
                        await save();
                        setSaving(false);
                    }} isLoading={saving}>Save</Button>
                </div>
            }
        </div>
    );
}