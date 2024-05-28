'use client';

import Loader from '@/components/custom-ui/Loader';
import SizeForm from '@/components/sizes/SizeForm';
import { useEffect, useState } from 'react';

const SizeDetails = ({ params }: { params: { sizeId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [sizeDetails, setSizeDetails] = useState<SizeType | null>(null);
    const getSizeDetails = async () => {
        try {
            const res = await fetch(`/api/sizes/${params.sizeId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setSizeDetails(data);
            setLoading(false);
        } catch (err) {
            console.log('[sizeId_GET]', err);
        }
    };

    useEffect(() => {
        getSizeDetails();
    }, []);

    return loading ? <Loader /> : <SizeForm initialData={sizeDetails} />;
};

export default SizeDetails;
