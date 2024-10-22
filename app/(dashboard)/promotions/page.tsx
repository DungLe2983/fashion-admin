'use client';


import { DataTable } from '@/components/custom-ui/DataTable';
import { columns } from '@/components/promotions/PromotionColmns';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Promotions = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [promotions, setPromotions] = useState([]);
    const getPromotions = async () => {
        try {
            const res = await fetch('/api/promotions', {
                method: 'GET',
            });
            const data = await res.json();
            setPromotions(data);
            console.log(data);
            setLoading(false);
        } catch (err) {
            console.log('[promotions_GET]', err);
        }
    };
    useEffect(() => {
        getPromotions();
    }, []);

    return (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className=' text-heading2-bold'>Promotions</p>
                <Button
                    className='bg-blue-1 text-white'
                    onClick={() => router.push('/promotions/new')}
                >
                    <Plus />
                    Create Promotion
                </Button>
            </div>
            <Separator className='my-6 bg-grey-1' />
            <DataTable columns={columns} data={promotions} searchKey='code' />
        </div>
    );
};

export default Promotions;
