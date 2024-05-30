'use client';
import { Separator } from '../ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import ImageUpload from '../custom-ui/ImageUpload';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Delete from '../custom-ui/Delete';
import MultiSelect from '../custom-ui/MultiSelect';
import MultiSelectColor from '../custom-ui/MultiSelectColor';
import Loader from '../custom-ui/Loader';
import MultiSelectSize from '../custom-ui/MultiSelectSize';
import { DataTable } from '../custom-ui/DataTable';

const formSchema = z.object({
    name: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.array(z.string()),
    categories: z.array(z.string()),
});
interface ProductFormProps {
    initialData?: ProductType | null; //Must have "?" to make it optional
}
// interface FormData {
//     quantity: string;
//     price: string;
//     colors: string;
//     sizes: string;
// }
const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    // const [selectedColor, setSelectedColor] = useState('');
    // const [selectedSize, setSelectedSize] = useState('');
    // const [formDataList, setFormDataList] = useState<FormData[]>([]);

    // const [quantity, setQuantity] = useState('');
    // const [price, setPrice] = useState('');
    // const [formData, setFormData] = useState([]);

    // const handleAddProductDetail = () => {
    //     const formData = {
    //         quantity,
    //         price,
    //         colors: selectedColor,
    //         sizes: selectedSize,
    //     };
    //     setFormDataList([...formDataList, formData]);
    //     setQuantity('');
    //     setPrice('');
    //     setSelectedColor('');
    //     setSelectedSize('');
    // };
    // useEffect(() => {
    //     console.log('FormDataList: ', formDataList);
    // }, [formDataList]);

    const getCollections = async () => {
        try {
            const res = await fetch('/api/categories', {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);
            setCategories(data);
            setLoading(false);
        } catch (err) {
            console.log('[collections_GET]', err);
            toast.error('Something went wrong! Please try again.');
        }
    };
    // const getColors = async () => {
    //     try {
    //         const res = await fetch('/api/colors', {
    //             method: 'GET',
    //         });
    //         const data = await res.json();
    //         setColors(data);
    //         setLoading(false);
    //     } catch (err) {
    //         console.log('[colors_GET]', err);
    //         toast.error('Something went wrong! Please try again.');
    //     }
    // };
    // const getSizes = async () => {
    //     try {
    //         const res = await fetch('/api/sizes', {
    //             method: 'GET',
    //         });
    //         const data = await res.json();
    //         setSizes(data);
    //         setLoading(false);
    //     } catch (err) {
    //         console.log('[sizes_GET]', err);
    //         toast.error('Something went wrong! Please try again.');
    //     }
    // };
    useEffect(() => {
        getCollections();
    }, []);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
                  categories: initialData.category_id.map(
                      (category) => category._id
                  ),
              }
            : {
                  name: '',
                  description: '',
                  image: [],
                  categories: [],
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
                ? `/api/products/${initialData._id}`
                : '/api/products';
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(`Product ${initialData ? 'updated' : 'created'}`);
                window.location.href = '/products';
                router.push('/products');
            }
        } catch (err) {
            console.log('[products_POST]', err);
            toast.error('Something went wrong. Please try again!');
        }
    };
    return loading ? (
        <Loader />
    ) : (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'>Edit Product</p>
                    <Delete id={initialData._id} item='product' />
                </div>
            ) : (
                <p className='text-heading2-bold'>Create Product</p>
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
                    <FormField
                        control={form.control}
                        name='image'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) =>
                                            field.onChange([
                                                ...field.value,
                                                url,
                                            ])
                                        }
                                        onRemove={(url) =>
                                            field.onChange([
                                                ...field.value.filter(
                                                    (image) => image !== url
                                                ),
                                            ])
                                        }
                                    />
                                </FormControl>
                                <FormMessage className='text-red-1' />
                            </FormItem>
                        )}
                    />
                    {categories.length > 0 && (
                        <FormField
                            control={form.control}
                            name='categories'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            placeholder='Categories'
                                            categories={categories}
                                            value={field.value}
                                            onChange={(_id) =>
                                                field.onChange([
                                                    ...field.value,
                                                    _id,
                                                ])
                                            }
                                            onRemove={(idToRemove) =>
                                                field.onChange([
                                                    ...field.value.filter(
                                                        (categoryId) =>
                                                            categoryId !==
                                                            idToRemove
                                                    ),
                                                ])
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage className='text-red-1' />
                                </FormItem>
                            )}
                        />
                    )}

                    <div className='flex items-center gap-2'>
                        <Button type='submit' className='bg-blue-1 text-white'>
                            Submit
                        </Button>
                        <Button
                            type='button'
                            className=' bg-slate-300'
                            onClick={() => router.push('/products')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProductForm;
