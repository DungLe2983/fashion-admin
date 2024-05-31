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
    product_id: z.string().min(24).max(24),
    size_id: z.string().min(24).max(24),
    color_id: z.string().min(24).max(24),
    price: z.coerce.number().min(0),
    quantity: z.coerce.number().min(0),
    status: z.string().min(0).max(20),
});
interface ProductItemFormProps {
    initialData?: ProductItemType | null; //Must have "?" to make it optional
}

const ProductItemForm: React.FC<ProductItemFormProps> = ({ initialData }) => {
    const [loading, setLoading] = useState(true);
    const [colors, setColors] = useState<ColorType[]>([]);
    const [sizes, setSizes] = useState<SizeType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [formDataList, setFormDataList] = useState<FormData[]>([]);

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [formData, setFormData] = useState([]);

    const getColors = async () => {
        try {
            const res = await fetch('/api/colors', {
                method: 'GET',
            });
            const data = await res.json();
            setColors(data);
            setLoading(false);
        } catch (err) {
            console.log('[colors_GET]', err);
            toast.error('Something went wrong! Please try again.');
        }
    };
    const getSizes = async () => {
        try {
            const res = await fetch('/api/sizes', {
                method: 'GET',
            });
            const data = await res.json();
            setSizes(data);
            setLoading(false);
        } catch (err) {
            console.log('[sizes_GET]', err);
            toast.error('Something went wrong! Please try again.');
        }
    };
    const getProducts = async () => {
        try {
            const res = await fetch('/api/products', {
                method: 'GET',
            });
            const data = await res.json();
            setProducts(data.data);
            setLoading(false);
        } catch (err) {
            console.log('[products_GET]', err);
            toast.error('Something went wrong! Please try again.');
        }
    };

    useEffect(() => {
        getColors();
        getSizes();
        getProducts();
    }, []);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
                  // ,
                  // colors: initialData.color_id.map((color) => color._id),
                  product_id: initialData.product_id,
              }
            : {
                  status: '1',
                  price: 0,
                  quantity: 0,
                  size_id: '',
                  product_id: '',
                  color_id: '',
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
                ? `/api/productitems/${initialData._id}`
                : '/api/productitems';

            // let url = '/api/productitems';
            // const valueUpdate = [
            //     { price: values.price, quantity: values.quantity },
            // ];

            // if (initialData) {
            //     url = `/api/productitems/${initialData._id}`;
            //     const res = await fetch(url, {
            //         method: 'POST',
            //         body: JSON.stringify(valueUpdate),
            //     });
            //     if (res.ok) {
            //         setLoading(false);
            //         toast.success(
            //             `productitems ${initialData ? 'updated' : 'created'}`
            //         );
            //         window.location.href = '/productitems';
            //         router.push('/productitems');
            //     }
            // } else {
            //     const res = await fetch(url, {
            //         method: 'POST',
            //         body: JSON.stringify(values),
            //     });
            //     if (res.ok) {
            //         setLoading(false);
            //         toast.success(
            //             `productitems ${initialData ? 'updated' : 'created'}`
            //         );
            //         window.location.href = '/productitems';
            //         router.push('/productitems');
            //     }
            // }

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
            });
            if (res.ok) {
                setLoading(false);
                toast.success(
                    `productitems ${initialData ? 'updated' : 'created'}`
                );
                window.location.href = '/productitems';
                router.push('/productitems');
            }
        } catch (err) {
            console.log('[productitems_POST]', err);
            toast.error('Something went wrong. Please try again!');
        }
    };
    return loading ? (
        <Loader />
    ) : (
        <div className='p-10'>
            {initialData ? (
                <div className='flex items-center justify-between'>
                    <p className='text-heading2-bold'>Edit Product Item</p>
                    <Delete id={initialData._id} item='productitems' />
                </div>
            ) : (
                <p className='text-heading2-bold'>Create Product Item</p>
            )}

            <Separator className='mt-4 mb-7 bg-grey-1' />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <div className='grid gap-4 py-4'>
                        {products.length > 0 && (
                            <FormField
                                control={form.control}
                                name='product_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Products</FormLabel>
                                        <FormControl>
                                            <select
                                                id='products'
                                                className='col-span-3 w-full border-2 rounded px-2 py-2'
                                                disabled={
                                                    initialData ? true : false
                                                }
                                                {...field}
                                            >
                                                <option value='' disabled>
                                                    Select a product
                                                </option>
                                                {products.map((product) => (
                                                    <option
                                                        key={product._id}
                                                        value={product._id}
                                                    >
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <div className='items-center gap-4'>
                            {colors.length > 0 && (
                                <FormField
                                    control={form.control}
                                    name='color_id'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Colors</FormLabel>
                                            <FormControl>
                                                <select
                                                    id='colors'
                                                    className='col-span-3 w-full border-2 rounded px-2 py-2'
                                                    disabled={
                                                        initialData
                                                            ? true
                                                            : false
                                                    }
                                                    {...field}
                                                >
                                                    <option value='' disabled>
                                                        Select a color
                                                    </option>
                                                    {colors.map((color) => (
                                                        <option
                                                            key={color._id}
                                                            value={color._id}
                                                        >
                                                            {color.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                        <div>
                            {sizes.length > 0 && (
                                <FormField
                                    control={form.control}
                                    name='size_id'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Size</FormLabel>
                                            <FormControl>
                                                <select
                                                    id='sizes'
                                                    className='col-span-3 w-full border-2 rounded px-2 py-2'
                                                    disabled={
                                                        initialData
                                                            ? true
                                                            : false
                                                    }
                                                    {...field}
                                                >
                                                    <option value='' disabled>
                                                        Select a size
                                                    </option>
                                                    {sizes.map((size) => (
                                                        <option
                                                            key={size._id}
                                                            value={size._id}
                                                        >
                                                            {size.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <div className='grid grid-cols-2 items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Quantity'
                                                {...field}
                                                onKeyDown={handleKeyPress}
                                                disabled={
                                                    initialData ? true : false
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <FormField
                                    control={form.control}
                                    name='price'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Price'
                                                    {...field}
                                                    onKeyDown={handleKeyPress}
                                                    disabled={
                                                        initialData
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button
                            type='submit'
                            className={`bg-blue-1 text-white ${
                                initialData ? 'hidden' : ''
                            }`}
                        >
                            Submit
                        </Button>
                        <Button
                            type='button'
                            className=' bg-slate-300'
                            onClick={() => router.push('/productitems')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProductItemForm;
