'use client'
import { navLinks } from '@/lib/constants';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const LeftSideBar = () => {
    const pathname = usePathname();

    return (
        <div className='h-screen top-0 left-0 sticky p-10 flex flex-col gap-16 bg-blue-50 shadow-xl max-lg:hidden items-center'>
            <Image src={'/logo.png'} width={70} height={70} alt='logo' />
            <div className='flex flex-col gap-11'>
                {navLinks.map((link) => (
                    <Link
                        href={link.url}
                        key={link.label}
                        className={`flex gap-4 text-body-medium  ${
                            pathname === link.url
                                ? ' text-blue-1'
                                : 'text-grey-1'
                        }`}
                    >
                        {link.icon} <p>{link.label}</p>
                    </Link>
                ))}
            </div>
            {/* <div className='flex gap-4 items-center '>
                <UserButton />
                <p>Edit Profile</p>
            </div> */}
        </div>
    );
};

export default LeftSideBar;
