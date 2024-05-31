'use client';

import { DataTable } from '@/components/custom-ui/DataTable';
import Loader from '@/components/custom-ui/Loader';
import { columns } from '@/components/productitems/ProductItemColumn';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductItemPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [productitems, setProductItems] = useState<ProductItemType[]>([]);
    const getProductItems = async () => {
        try {
            const res = await fetch('/api/productitems', {
                method: 'GET',
            });
            const data = await res.json();
            setProductItems(data.data);
            console.log(data);
            setLoading(false);
        } catch (err) {
            console.log('[productitems_GET]', err);
        }
    };

    useEffect(() => {
        getProductItems();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className='px-10 py-5'>
            <div className='flex items-center justify-between'>
                <p className='text-heading2-bold'>Product Items</p>
                <Button
                    className='bg-blue-1 text-white'
                    onClick={() => router.push('/productitems/new')}
                >
                    <Plus className='h-4 w-4 mr-2' />
                    Create Product Item
                </Button>
            </div>
            <Separator className='bg-grey-1 my-4' />
            <DataTable
                columns={columns}
                data={productitems}
                searchKey='price'
            />
        </div>
    );
};

export default ProductItemPage;
