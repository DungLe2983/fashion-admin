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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const formSchema = z.object({
    name: z.string().min(0).max(20),
    address: z.array(z.string()),
    phoneNumber: z.string().min(0).max(500).trim(),
    sex: z.string().min(0).max(10),
    birthday: z.string().min(0).max(500).trim(),
    email: z.string().min(0).max(500).trim(),
});
interface UserFormProps {
    initialData?: UserType | null; //Must have "?" to make it optional
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? initialData
            : {
                  name: '',
                  address: [],
                  phoneNumber: '',
                  sex: '',
                  birthday: '',
                  email: '',
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
                ? `/api/users/${initialData._id}`
                : '/api/users';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Size ${initialData ? 'updated' : 'created'}`);
                window.location.href = '/users';
                router.push('/users');
            }
        } catch (err) {
            console.log('[users_POST]', err);
            toast.error('Something went wrong. Please try again!');
        }
    };
    return (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'>Edit Users</p>
                    <Delete id={initialData._id} item='users' />
                </div>
            ) : (
                <p className='text-heading2-bold'>Create User</p>
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
                                        readOnly={true}
                                        className=' cursor-not-allowed focus:ring-transparent text-gray-400'
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
                                        className=' cursor-not-allowed focus:ring-transparent text-gray-400'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phoneNumber'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='PhoneNumber'
                                        {...field}
                                        readOnly={true}
                                        className=' cursor-not-allowed focus:ring-transparent text-gray-400'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='sex'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sex</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Sex'
                                        {...field}
                                        readOnly={true}
                                        className=' cursor-not-allowed focus:ring-transparent text-gray-400'
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='birthday'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Birthday</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        className='border rounded px-2 py-2 w-full focus:border-transparent focus:ring-transparent text-gray-400'
                                        selected={field.value}
                                        readOnly={true}
                                        onChange={(date) =>
                                            field.onChange(date)
                                        }
                                        onKeyDown={handleKeyPress}
                                        dateFormat='dd/MM/yyyy'
                                        placeholderText='birthday'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        readOnly={true}
                                        className=' cursor-not-allowed focus:ring-transparent text-gray-400'
                                        placeholder='email'
                                        {...field}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-2'>
                        <Button
                            type='button'
                            className=' bg-slate-300'
                            onClick={() => router.push('/users')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UserForm;
