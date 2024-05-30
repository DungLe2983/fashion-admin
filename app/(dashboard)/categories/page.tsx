'use client';
import { columns } from '@/components/collections/CollectionColumns';
import { DataTable } from '@/components/custom-ui/DataTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Collections = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [collections, setCollections] = useState([]);
    const getCollections = async () => {
        try {
            const res = await fetch('/api/categories', {
                method: 'GET',
            });
            const data = await res.json();
            setCollections(data);
            setLoading(false);
        } catch (err) {
            console.log('[collections_GET]', err);
        }
    };
    useEffect(() => {
        getCollections();
    }, []);

    return (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className=' text-heading2-bold'>Categories</p>
                <Button
                    className='bg-blue-1 text-white'
                    onClick={() => router.push('/categories/new')}
                >
                    <Plus />
                    Create Category
                </Button>
            </div>
            <Separator className='my-6 bg-grey-1' />
            <DataTable columns={columns} data={collections} searchKey='name' />
        </div>
    );
};

export default Collections;
