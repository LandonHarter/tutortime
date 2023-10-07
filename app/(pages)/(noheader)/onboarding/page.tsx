'use client'

import { completeOnboarding, getUser } from '@/app/firebase/auth';
import styles from './page.module.scss';
import { Button, Progress, Select, SelectItem } from "@nextui-org/react";
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Balancer from 'react-wrap-balancer';
import { toast } from 'sonner';
import { AccountType } from '@/app/types/user';
import OnboardingSubject from './subject';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/init';
import AllSubjects from '@/app/data/subjects';

export default function OnboardingPage() {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [verified, setVerified] = useState(false);

    const [progress, setProgress] = useState(50);

    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [grade, setGrade] = useState<number | null>(null);
    const [subjects, setSubjects] = useState<string[]>([]);

    const [pushingChanges, setPushingChanges] = useState(false);

    useEffect(() => {
        (async () => {
            if (!user) return;

            const uid = user.uid;
            const userData = await getUser(uid);
            if (!userData) return;

            if (userData.finishedOnboarding) {
                router.push('/');
            } else {
                setVerified(true);
            }
        })();
    }, [user]);

    function getStepUi() {
        switch (progress) {
            case 50:
                return step1();
            case 100:
                return accountType === 'student' ? step2student() : step2tutor();
        }
    }

    function step1() {
        return (
            <div className='flex flex-col items-center'>
                <div className='flex items-center mb-8'>
                    <label htmlFor="radio-card-1" className={styles.radio_card}>
                        <input type="radio" name="radio-card" id="radio-card-1" checked={accountType === 'student'} onChange={(e) => {
                            setAccountType('student');
                        }} />
                        <div className={styles.card_content_wrapper}>
                            <span className={styles.check_icon}></span>
                            <div className={styles.card_content}>
                                <Image
                                    src="/images/vector/student.jpg"
                                    alt=""
                                    width={512}
                                    height={512}
                                />
                                <h4 className='font-medium text-xl'>Student</h4>
                                <h5 className='font-normal text-sm text-gray-500'>Are you seeking help?</h5>
                            </div>
                        </div>
                    </label>
                    <label htmlFor="radio-card-2" className={styles.radio_card}>
                        <input type="radio" name="radio-card" id="radio-card-2" checked={accountType === 'tutor'} onChange={(e) => {
                            setAccountType('tutor');
                        }} />
                        <div className={styles.card_content_wrapper}>
                            <span className={styles.check_icon}></span>
                            <div className={styles.card_content}>
                                <Image
                                    src="/images/vector/teacher.jpg"
                                    alt=""
                                    width={512}
                                    height={512}
                                />
                                <h4 className='font-medium text-xl'>Tutor</h4>
                                <h5 className='font-normal text-sm text-gray-500 w-5/6'><Balancer>Do you want to share your knowledge?</Balancer></h5>
                            </div>
                        </div>
                    </label>
                </div>

                <Button color='primary' className='font-medium text-xl p-6' onClick={() => {
                    if (!accountType) {
                        toast.error('Please select an account type.');
                        return;
                    }

                    setProgress(100);
                }}>Next</Button>
            </div>
        );
    }

    function step2student() {
        return (
            <div className='flex flex-col items-center'>
                <Select label='Select your grade' className='w-96 mb-8 font-semibold' onChange={(e) => {
                    setGrade(parseInt(e.target.value));
                }}>
                    <SelectItem key={6} value={'6'}>6th</SelectItem>
                    <SelectItem key={7} value={'7'}>7th</SelectItem>
                    <SelectItem key={8} value={'8'}>8th</SelectItem>
                    <SelectItem key={9} value={'9'}>9th</SelectItem>
                    <SelectItem key={10} value={'10'}>10th</SelectItem>
                    <SelectItem key={11} value={'11'}>11th</SelectItem>
                    <SelectItem key={12} value={'12'}>12th</SelectItem>
                    <SelectItem key={13} value={'13'}>College+</SelectItem>
                </Select>

                <Button color='primary' className='font-medium text-xl p-6' onClick={async () => {
                    if (!accountType) {
                        toast.error('Please select an account type.');
                        return;
                    }
                    if (!grade) {
                        toast.error('Please select your grade.');
                        return;
                    }

                    setPushingChanges(true);
                    await completeOnboarding(accountType, grade.toString());
                    router.push('/');
                }} isLoading={pushingChanges}>Complete</Button>
            </div>
        );
    }

    function step2tutor() {
        return (
            <div className='w-full flex flex-col items-center'>
                <div className='flex flex-row flex-wrap w-3/6 h-fit justify-center mb-14'>
                    {AllSubjects.map((subject: string) => {
                        return <OnboardingSubject key={subject} subjects={subjects} setSubjects={setSubjects} subject={subject} icon={`/images/subjects/${subject.toLowerCase()}.png`} />;
                    })}
                </div>

                <Button color='primary' className='font-medium text-xl p-6' onClick={async () => {
                    if (subjects.length === 0) {
                        toast.error('Please select one or more subjects.');
                        return;
                    }
                    if (!accountType) {
                        toast.error('Please select an account type.');
                        return;
                    }

                    setPushingChanges(true);
                    await completeOnboarding(accountType, undefined, subjects);
                    router.push('/');
                }} isLoading={pushingChanges}>Complete</Button>
            </div>
        );
    }

    if (!verified) return;
    return (
        <section className='w-screen h-screen flex flex-col justify-center items-center'>
            <div className='absolute top-0 w-2/6 mt-12 flex flex-col justify-center items-center'>
                <h1 className='mb-4 font-medium text-2xl'>Step {progress / 50}/2</h1>
                <Progress size='lg' aria-label='Onboarding Progress' value={progress} className='w-full' />
            </div>
            <div className='w-full'>
                {getStepUi()}
            </div>
        </section>
    );
}