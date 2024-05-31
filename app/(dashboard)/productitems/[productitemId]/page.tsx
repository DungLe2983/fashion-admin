'use client';
import Loader from '@/components/custom-ui/Loader';
import ProductItemForm from '@/components/productitems/ProductItemForm';

import { useEffect, useState } from 'react';

const ProductItemDetails = ({
    params,
}: {
    params: { productitemId: string };
}) => {
    const [loading, setLoading] = useState(true);
    const [productitemDetails, setProductItemDetails] =
        useState<ProductItemType | null>(null);

    const getProductItemDetails = async () => {
        try {
            const res = await fetch(
                `/api/productitems/${params.productitemId}`,
                {
                    method: 'GET',
                }
            );
            const data = await res.json();
            setProductItemDetails(data);
            setLoading(false);
        } catch (err) {
            console.log('[productId_GET]', err);
        }
    };

    useEffect(() => {
        getProductItemDetails();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <ProductItemForm initialData={productitemDetails} />
    );
};

export default ProductItemDetails;
