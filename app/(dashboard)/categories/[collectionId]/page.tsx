'use client';
import CollectionForm from '@/components/collections/CollectionForm';
import Loader from '@/components/custom-ui/Loader';
import { useEffect, useState } from 'react';

const CollectionDetails = ({
    params,
}: {
    params: { collectionId: string };
}) => {
    const [loading, setLoading] = useState(true);
    const [collectionDetails, setCollectionDetails] =
        useState<CategoryType | null>(null);
    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/categories/${params.collectionId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setCollectionDetails(data);
            setLoading(false);
        } catch (err) {
            console.log('[collectionId_GET]', err);
        }
    };

    useEffect(() => {
        getCollectionDetails();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <CollectionForm initialData={collectionDetails} />
    );
};

export default CollectionDetails;
