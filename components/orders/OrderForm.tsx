'use client';
import { Separator } from '../ui/separator';
import { number, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Delete from '../custom-ui/Delete';
import 'react-datepicker/dist/react-datepicker.css';
import { TurtleIcon } from 'lucide-react';

const formSchema = z.object({
    _id: z.string().min(24).max(24),
    user_id: z.string().min(0).max(24),
    detail_id: z.string().min(24).max(24),
    phone: z.string().min(0).max(500).trim(),
    address: z.string().min(0).max(500).trim(),
    note: z.string().min(0).max(500).trim(),
    total: number(),
    status: z.string().min(0).max(20),
});
interface OrderFormProps {
    initialData: OrderType; //Must have "?" to make it optional
}

const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });
    const handleKeyPress = (
        e:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const onSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
        values: z.infer<typeof formSchema>
    ) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện submit

        try {
            setLoading(true);
            const url = `/api/orders/${initialData._id}`;

            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                toast.error('Orders update failed');
            } else {
                toast.success('Orders updated successfully');
                router.push('/orders');
            }

            setLoading(false);
        } catch (err) {
            console.log('[orders_POST]', err);
            toast.error('Something went wrong. Please try again!');
        }
    };

    return (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'> Order Detail</p>
                </div>
            ) : (
                <p className='text-heading2-bold'>Create Order</p>
            )}
            <Separator className='mt-4 mb-7 bg-grey-1' />
            <Form {...form}>
                <form className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='_id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Order ID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='id'
                                        {...field}
                                        className=' focus:ring-transparent text-green-600'
                                        readOnly={true}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='user_id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='UserID'
                                        {...field}
                                        readOnly={true}
                                        className='focus:ring-transparent text-gray-400 cursor-not-allowed'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Phone Number'
                                        {...field}
                                        readOnly={true}
                                        className='focus:ring-transparent text-gray-400 cursor-not-allowed'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='address'
                                        {...field}
                                        readOnly={true}
                                        className='focus:ring-transparent text-gray-400 cursor-not-allowed'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='note'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Note</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Note'
                                        {...field}
                                        readOnly={true}
                                        className='focus:ring-transparent text-gray-400 cursor-not-allowed'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Status'
                                        {...field}
                                        className='focus:ring-transparent cursor-not-allowed text-gray-400 '
                                        readOnly={true}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-2'>
                        {initialData.status === 0 ? (
                            <Button
                                onClick={onSubmit}
                                className='bg-blue-1 text-white'
                            >
                                Completed Delivery
                            </Button>
                        ) : (
                            <Button className='bg-blue-1 text-white hidden'>
                                Completed Delivery
                            </Button>
                        )}

                        <Button
                            type='button'
                            className=' bg-slate-300'
                            onClick={() => router.push('/orders')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
            <Separator className='mt-4 mb-7 bg-grey-1' />
            <p className=' text-heading3-bold'>Products</p>

            {/* Table */}
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-8'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Thông tin sản phẩm
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Số lượng
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Đơn giá
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Thành tiền
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {initialData.detail_id.map((item) => {
                            return (
                                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                    <td className='p-4'>
                                        <div className='flex gap-2'>
                                            <img
                                                className='w-32 h-32 object-cover'
                                                src={
                                                    item.product_item_id
                                                        ?.product_id.image
                                                }
                                                alt='productInCartImg'
                                            />
                                            <div className='flex flex-col gap-2 justify-center text-sm'>
                                                <p className=' cursor-pointer hover:text-primary font-semibold'>
                                                    {
                                                        item.product_item_id
                                                            ?.product_id.name
                                                    }
                                                </p>
                                                <p>
                                                    {
                                                        item.product_item_id
                                                            ?.color_id.name
                                                    }{' '}
                                                    /{' '}
                                                    {
                                                        item.product_item_id
                                                            ?.size_id.name
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <p className='text-center'>
                                            {item.quantity}
                                        </p>
                                    </td>
                                    <td className='px-6 py-4 font-semibold text-gray-900'>
                                        {item.product_item_id?.price.toLocaleString()}{' '}
                                        đ
                                    </td>
                                    <td className='px-6 py-4 font-semibold text-gray-900'>
                                        {item.price.toLocaleString()} đ
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Table */}
            <div className='mt-6 flex justify-end'>
                <div className='text-right flex flex-col gap-4 '>
                    <div className=' flex items-baseline gap-60 text-sm'>
                        <p className=' text-gray-500 font-semibold '>
                            Tạm tính:
                        </p>
                        <span className='text-gray-500 font-semibold text-sm'>
                            {initialData.total.toLocaleString()} đ
                        </span>
                    </div>
                    {/* <div className=' flex items-baseline justify-between'>
                        <p className='text-sm text-gray-500 font-semibold  '>
                            Giảm giá:
                        </p>
                        <span className='text-gray-500 font-semibold text-sm'>
                            0%
                        </span>
                    </div> */}
                    <div className=' flex items-baseline justify-between'>
                        <p className='font-semibold text-gray-900 '>
                            Tổng tiền:
                        </p>
                        <span className='text-red-500 font-semibold '>
                            {initialData.total.toLocaleString()} đ
                        </span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm text-gray-500 font-semibold  '>
                            Tình trạng:
                        </p>
                        <div className='bg-slate-200 px-4 py-1 rounded'>
                            {initialData.status === 0 ? (
                                <p className='text-sm text-orange-500 font-semibold'>
                                    Pending
                                </p>
                            ) : (
                                <p className='text-sm text-green-500 font-semibold'>
                                    Complete
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;
