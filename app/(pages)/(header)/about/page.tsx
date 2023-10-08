export default function AboutPage() {
    return (
        <div className='flex flex-col w-full' style={{
            height: 'calc(100vh - 88px)',
        }}>
            <div className='flex justify-center w-full h-3/6 items-center' style={{
                backgroundImage: 'url(https://wallpapercave.com/wp/wp4465114.jpg)'
            }}>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-8xl mb-4 text-center'>About</h1>
                    <p className='text-gray-600 text-xl text-center'>Bringing students and mentors in one pair at a time.</p>
                </div>
            </div>

            <h1 className='mt-12 text-4xl font-medium mx-8'>A little more about TutorTime...</h1>
            <p className='mt-4 text-xl text-gray-500 mx-8' style={{
                width: 'calc(100% - 64px)'
            }}>TutorTime is a website that connects low-income students with online tutors who volunteer their time and expertise. We believe that everyone deserves access to quality learning opportunities in various subjects and skills. Join us today and discover how TutorTime can help you learn at your own pace, schedule, and budget.</p>

            <div className='my-8' />

            <h1 className='text-4xl font-medium mx-8'>The Developers</h1>
            <p className='mt-4 text-xl text-gray-500 mx-8' style={{
                width: 'calc(100% - 64px)'
            }}>Landon Harter is the solo developer behind TutorTime. Complete in 48 hours, a result of 18 hours of coding had emerged. The website was built with NextJS, Firebase, and NextUI. Landon, a 16 year old full stack web developer, attends Gull Lake High School and is currently in 11th grade. He hopes to take his aspirations of becoming a software engineer and turn them into a reality.</p>
        </div>
    );
}