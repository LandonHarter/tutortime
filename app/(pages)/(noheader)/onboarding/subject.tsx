'use client'

import { Checkbox } from "@nextui-org/react";
import Image from "next/image";

export default function OnboardingSubject({ subjects, setSubjects, subject, icon }: { subjects: string[], setSubjects: (value: string[]) => void, subject: string, icon: string }) {
    return (
        <Checkbox
            className="inline-flex max-w-md border-gray-300 items-center justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 data-[selected=true]:border-primary m-2"
            isSelected={subjects.includes(subject)}
            onValueChange={(value) => {
                if (value) {
                    setSubjects([...subjects, subject]);
                } else {
                    const newSubjects = subjects.filter((s) => s !== subject);
                    setSubjects(newSubjects);
                }
            }}
        >
            <div className="w-fit flex justify-between items-center">
                <Image src={icon} alt={subject} width={24} height={24} className='mr-2' />
                <h1 className='font-medium text-xl'>{subject}</h1>
            </div>
        </Checkbox>
    );
}