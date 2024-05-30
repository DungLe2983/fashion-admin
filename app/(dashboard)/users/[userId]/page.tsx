'use client';

import Loader from '@/components/custom-ui/Loader';
import UserForm from '@/components/customers/UserForm';
import { useEffect, useState } from 'react';

const UserDetails = ({ params }: { params: { userId: string } }) => {
    const [loading, setLoading] = useState(true);
    const [sizeDetails, setSizeDetails] = useState<UserType | null>(null);
    const getSizeDetails = async () => {
        try {
            const res = await fetch(`/api/users/${params.userId}`, {
                method: 'GET',
            });
            const data = await res.json();
            setSizeDetails(data);
            setLoading(false);
        } catch (err) {
            console.log('[userId_GET]', err);
        }
    };

    useEffect(() => {
        getSizeDetails();
    }, []);

    return loading ? <Loader /> : <UserForm initialData={sizeDetails} />;
};

export default UserDetails;
