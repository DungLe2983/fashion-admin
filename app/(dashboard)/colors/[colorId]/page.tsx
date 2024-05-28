'use client';
import ColorForm from '@/components/colors/ColorForm';
import Loader from '@/components/custom-ui/Loader';
import { useEffect, useState } from 'react';

const ColorDetails = ({ params }: { params: { colorId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [colorDetails, setColorDetails] = useState<ColorType | null>(null);
    const getColorDetails = async () => {
        try {
            const res = await fetch(`/api/colors/${params.colorId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setColorDetails(data);
            setLoading(false);
        } catch (err) {
            console.log('[colorId_GET]', err);
        }
    };

    useEffect(() => {
        getColorDetails();
    }, []);

    return loading ? <Loader /> : <ColorForm initialData={colorDetails} />;
};

export default ColorDetails;
