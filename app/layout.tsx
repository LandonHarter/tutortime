import { Toaster } from 'sonner';
import Header from './components/header/header';
import './globals.css'
import basicMetadata from './util/metadata';
import Loading from './components/loading/loading';

export const metadata = basicMetadata();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position='bottom-right' />
        <Header />
        <main className='w-full flex flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  )
}
