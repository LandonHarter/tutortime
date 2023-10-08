'use client'

import { db } from "@/app/firebase/init";
import { uploadFile } from "@/app/firebase/storage";
import User from "@/app/types/user";
import { generateId } from "@/app/util/id";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsAccountGeneral({ user }: { user: User | null }) {
    const [firstName, setFirstName] = useState(user?.name.split(' ')[0] || '');
    const [lastName, setLastName] = useState(user?.name.split(' ')[1] || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [portrait, setPortrait] = useState(user?.portrait || '/images/misc/noportrait.jpg');
    const [portraitFile, setPortraitFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    async function save() {
        if (!user) return;

        const ogFirstName = user.name.split(' ')[0];
        const ogLastName = user.name.split(' ')[1];
        const ogBio = user.bio;

        const userDoc = doc(collection(db, 'users'), user.id);
        if (firstName != ogFirstName || lastName != ogLastName || bio != ogBio) {
            await updateDoc(userDoc, {
                name: `${firstName} ${lastName}`,
                bio
            });
        }

        if (portraitFile) {
            const newUrl = await uploadFile(portraitFile!, `portraits/${generateId()}`);
            await updateDoc(userDoc, {
                portrait: newUrl
            });

            setPortrait(newUrl);
            setPortraitFile(null);
        }

        toast.success('Successfully saved your settings!');
    }

    return (
        <div className='p-12 flex justify-between items-center'>
            <div className='w-full flex flex-col'>
                <h1 className='font-semibold text-4xl mt-12 mb-8'>General</h1>

                <div className='w-7/12 flex items-center mb-4'>
                    <Input variant='faded' label='First Name' value={firstName} onChange={(e) => {
                        setFirstName(e.target.value);
                    }} className='w-3/6 mr-2' />
                    <Input variant='faded' label='Last Name' value={lastName} onChange={(e) => {
                        setLastName(e.target.value);
                    }} className='w-3/6 ml-2' />
                </div>
                <Input variant='faded' disabled label='Email' className='w-7/12 opacity-50' value={user?.email} />

                <Textarea variant='faded' label='Bio' value={bio} onChange={(e) => {
                    setBio(e.target.value);
                }} className='w-7/12 mt-4' maxLength={250} />

                <Button color='primary' className='mt-8 w-fit font-medium text-xl p-6' isLoading={saving} onClick={async () => {
                    setSaving(true);
                    await save();
                    setSaving(false);
                }}>Save</Button>
            </div>

            <label htmlFor='portrait' className='cursor-pointer flex flex-col items-center mr-16'>
                <input type='file' id='portrait' className='appearance-none' hidden onChange={(e) => {
                    if (!e.target.files) return;
                    setPortrait(URL.createObjectURL(e.target.files[0]));
                    setPortraitFile(e.target.files[0]);
                }} />
                <Image src={portrait} alt='portrait' width={512} height={512} className='aspect-square w-[20rem] mb-4 border-4 border-gray-400' style={{ borderRadius: '100%' }} />
            </label>
        </div>
    );
}