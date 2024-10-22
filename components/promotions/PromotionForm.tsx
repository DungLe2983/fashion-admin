'use client';
import { Separator } from '../ui/separator';
import { z } from 'zod';
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
import { Textarea } from '../ui/textarea';
import ImageUpload from '../custom-ui/ImageUpload';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Delete from '../custom-ui/Delete';

const formSchema = z.object({
    code: z.string().min(2).max(20),
    name: z.string().min(2).max(20),
    count: z.coerce.number().min(0),
    percent: z.coerce.number().min(0),
    price_promotion: z.coerce.number().min(0),
});
interface PromotionFormProps {
    initialData?: PromotionType | null; //Must have "?" to make it optional
}

const PromotionForm: React.FC<PromotionFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                  code: '',
                  name: '',
                  count: 0,
                  percent: 0,
                  price_promotion: 0,
              },
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
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const url = initialData
                ? `/api/promotions/${initialData._id}`
                : '/api/promotions';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(
                    `Promotion ${initialData ? 'updated' : 'created'}`
                );
                window.location.href = '/promotions';
                router.push('/promotions');
            }
        } catch (err) {
            console.log('[promotions_POST]', err);
            toast.error('Something went wrong. Please try again!');
        }
    };
    return (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'>Edit Promotion</p>
         
                </div>
            ) : (
                <p className='text-heading2-bold'>Create Promotion</p>
            )}

            <Separator className='mt-4 mb-7 bg-grey-1' />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='code'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Code'
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='name'
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='count'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Count</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='percent'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Percent</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='price_promotion'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price Promotion</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-2'>
                        <Button type='submit' className='bg-blue-1 text-white'>
                            Submit
                        </Button>
                        <Button
                            type='button'
                            className=' bg-slate-300'
                            onClick={() => router.push('/promotions')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PromotionForm;
