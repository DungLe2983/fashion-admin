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
    name: z.string().min(0).max(20),
    description: z.string().min(2).max(500).trim(),
});
interface SizeFormProps {
    initialData?: SizeType | null; //Must have "?" to make it optional
}

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                  name: '',
                  description: '',
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
                ? `/api/sizes/${initialData._id}`
                : '/api/sizes';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Size ${initialData ? 'updated' : 'created'}`);
                window.location.href = '/sizes';
                router.push('/sizes');
            }
        } catch (err) {
            console.log('[sizes_POST]', err);
            toast.error('Something went wrong. Please try again!');
        }
    };
    return (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'>Edit Sizes</p>
                    <Delete id={initialData._id} item='color' />
                </div>
            ) : (
                <p className='text-heading2-bold'>Create Size</p>
            )}

            <Separator className='mt-4 mb-7 bg-grey-1' />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Name'
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
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder='Description'
                                        rows={5}
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
                            onClick={() => router.push('/sizes')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SizeForm;
