"use client"; // Ensures this is a client component

import { useGetSingleMutation } from '@/state/orderApi';
import { order_type_form, Post_Response } from '@/types/order_type';
import React, { useEffect, memo, useMemo } from 'react';
import { Order_form } from '../order-form/Order_form';
import { CircularProgress } from '@nextui-org/react';

interface UpdateOrderProps {
    id: string;
}

const UpdateOrder: React.FC<UpdateOrderProps> = memo(({ id }) => {
    const [getSingle, { data, isLoading, error }] = useGetSingleMutation();

    useEffect(() => {
        if (id) {
            getSingle(id); // Fetch the data for the given order ID
        }
    }, [id]); // Only re-run the effect when `id` changes

    if (error) return <p>Error: {error instanceof Error ? error.message : 'Something went wrong'}</p>;

    // Ensure type safety by checking if `data` is of the expected type `Post_Response`
    const response: Post_Response | undefined = data as Post_Response | undefined;

    const order = response?.order; // Access the `order` field from the response if it exists



    return (
        <div>
            {isLoading ? (
                <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <CircularProgress />
                </div>
            ) :
                <Order_form data={order} edit={true} />
            }
        </div>
    );
});

export default UpdateOrder;
