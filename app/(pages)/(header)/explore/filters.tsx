'use client'

import AllSubjects from "@/app/data/subjects";
import Filters from "@/app/types/filter";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function ExploreFilters({ filters, setFilters }: { filters: Filters, setFilters: Dispatch<SetStateAction<Filters>> }) {
    return (
        <>
            <div className='flex flex-col'>
                <h1 className='font-medium text-xl mb-2'>Subjects</h1>
                <div className='flex flex-wrap' style={{ transform: 'translateX(-4px)' }}>
                    {AllSubjects.map((subject, index) => {
                        const selected = filters.subjects ? filters.subjects.subjects.includes(subject) : false;

                        return (
                            <div key={index} className={`rounded-xl ${!selected && 'border-gray-400'} ${selected && 'bg-[#baddfe] border-[#baddfe]'} transition-all border-2 px-2 py-1 m-1 flex items-center cursor-pointer`} onClick={(e) => {
                                const subjectFilter: string[] = filters.subjects ? filters.subjects.subjects : [];
                                if (subjectFilter.includes(subject)) {
                                    subjectFilter.splice(subjectFilter.indexOf(subject), 1);
                                } else {
                                    subjectFilter.push(subject);
                                }

                                setFilters({
                                    ...filters,
                                    subjects: {
                                        any: subjectFilter.length === 0,
                                        subjects: subjectFilter
                                    }
                                });
                            }}>
                                <Image src={`/images/subjects/${subject.toLowerCase()}.png`} alt={subject} width={16} height={16} className='mr-1' />
                                <p className='font-medium text-md'>{subject}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}