import { Toaster } from 'sonner';
import './globals.css'
import basicMetadata from './util/metadata';

export const metadata = basicMetadata();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position='bottom-right' duration={4000} />
        <main className='w-full flex flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  )
}
