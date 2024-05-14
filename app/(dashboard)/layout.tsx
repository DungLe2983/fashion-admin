import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import '../globals.css';
import LeftSideBar from '@/components/layout/LeftSideBar';
import TopBar from '@/components/layout/TopBar';
import { ToasterProvider } from '@/lib/ToasterProvider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body>
                    <ToasterProvider/>
                    <div className='flex max-lg:flex-col'>
                        <LeftSideBar />
                        <TopBar/>
                        <main className='flex-1'>{children}</main>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
