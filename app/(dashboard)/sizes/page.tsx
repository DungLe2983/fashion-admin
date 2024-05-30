'use client';

import { DataTable } from '@/components/custom-ui/DataTable';
import { columns } from '@/components/sizes/SizeColumns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sizes = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sizes, SetSizes] = useState([]);
    const getSizes = async () => {
        try {
            const res = await fetch('/api/sizes', {
                method: 'GET',
            });
            const data = await res.json();
            SetSizes(data);
            setLoading(false);
        } catch (err) {
            console.log('[size_GET]', err);
        }
    };
    useEffect(() => {
        getSizes();
    }, []);

    return (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className=' text-heading2-bold'>Sizes</p>
                <Button
                    className='bg-blue-1 text-white'
                    onClick={() => router.push('/sizes/new')}
                >
                    <Plus />
                    Create Size
                </Button>
            </div>
            <Separator className='my-6 bg-grey-1' />
            <DataTable columns={columns} data={sizes} searchKey='name' />
        </div>
    );
};

export default Sizes;
