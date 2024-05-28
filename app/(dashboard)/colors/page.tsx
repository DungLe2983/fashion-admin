'use client';

import { columns } from '@/components/colors/ColorColumns';
import { DataTable } from '@/components/custom-ui/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Colors = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [colors, setColors] = useState([]);
    const getColors = async () => {
        try {
            const res = await fetch('/api/colors', {
                method: 'GET',
            });
            const data = await res.json();
            setColors(data);
            setLoading(false);
        } catch (err) {
            console.log('[colors_GET]', err);
        }
    };
    useEffect(() => {
        getColors();
    }, []);

    return (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className=' text-heading2-bold'>Colors</p>
                <Button
                    className='bg-blue-1 text-white'
                    onClick={() => router.push('/colors/new')}
                >
                    <Plus />
                    Create Color
                </Button>
            </div>
            <Separator className='my-6 bg-grey-1' />
            <DataTable columns={columns} data={colors} searchKey='title' />
        </div>
    );
};

export default Colors;
