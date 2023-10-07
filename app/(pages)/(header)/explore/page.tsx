'use client'

import { useEffect, useState } from "react";
import ExploreFilters from "./filters";
import Filters from "@/app/types/filter";
import User from "@/app/types/user";
import LoadingTutors from "./loading";
import { getTutors } from "@/app/data/tutors";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@nextui-org/react";

export default function ExplorePage() {
    const [filters, setFilters] = useState<Filters>({
        any: true
    });
    const [tutors, setTutors] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setTutors(await getTutors(filters));
            setLoading(false);
        })();
    }, [filters]);

    return (
        <div className='flex flex-col items-center w-full h-full'>
            <div className='mb-32' />

            <div className='flex justify-center w-full h-full'>
                <div className='w-1/6 h-full flex flex-col items-start mr-6'>
                    <h1 className='font-semibold text-3xl'>Filter</h1>
                    <div className='w-full h-0.5 bg-gray-300 rounded-full mt-2 mb-6' />
                    <ExploreFilters filters={filters} setFilters={setFilters} />
                </div>
                <div className='w-5/12 h-full ml-6 flex flex-col'>
                    {loading ? <LoadingTutors /> :
                        <>
                            {tutors.length == 0 ?
                                <div className='w-full h-[300px] flex flex-col items-center justify-center'>
                                    <h1 className='font-medium text-4xl mb-4'>No Tutors Found</h1>
                                    <p className='text-gray-400 text-xl'>Try putting on less filters.</p>
                                </div>
                                :
                                <>
                                    {tutors.map((tutor, index) => {
                                        return (
                                            <Link href={`/tutor/${tutor.id}`} key={index} className='flex justify-between items-center w-full py-4 mb-4 border-b-2 border-gray-200'>
                                                <div className='flex items-center'>
                                                    <Image src={tutor.portrait || '/images/misc/noportrait.jpg'} alt='portrait' width={256} height={256} className='mr-4 rounded-md w-20 h-20' />
                                                    <div className='flex flex-col'>
                                                        <h1 className='font-semibold text-2xl'>{tutor.name}</h1>
                                                        <div className='flex items-center overflow-x-hidden'>
                                                            {tutor.subjects?.map((subject, index) => {
                                                                return (
                                                                    <Chip variant='faded' key={index} className='m-1 p-4' startContent={<Image src={`/images/subjects/${subject.toLowerCase()}.png`} alt={subject} width={16} height={16} className='ml-[2px]' />}>
                                                                        {subject}
                                                                    </Chip>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}