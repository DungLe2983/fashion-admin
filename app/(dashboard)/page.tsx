import SalesChart from '@/components/custom-ui/SaleChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    getSalesPerMonth,
    getTotalCustomers,
    getTotalSales,
    getTotalProducts,
    getTotalCategories,
    getTotalColors,
    getTotalOrders,
} from '@/lib/actions/actions';
import {
    CircleDollarSign,
    Palette,
    Shapes,
    ShoppingBag,
    Tag,
    UserRound,
} from 'lucide-react';

export default async function Home() {
    const totalRevenue = await getTotalSales();
    const totalOrders = await getTotalOrders();
    const totalCustomers = await getTotalCustomers();
    const totalProducts = await getTotalProducts();
    const totalCategories = await getTotalCategories();
    const totalColors = await getTotalColors();

    const graphData = await getSalesPerMonth();

    return (
        <div className='px-8 py-10'>
            <p className='text-heading2-bold'>Dashboard</p>
            <Separator className='bg-grey-1 my-5' />

            <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>Total Revenue</CardTitle>
                        <CircleDollarSign className='max-sm:hidden' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-body-bold'>
                            {totalRevenue.toLocaleString()} VNĐ{' '}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>Total Orders</CardTitle>
                        <ShoppingBag className='max-sm:hidden' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-body-bold'>{totalOrders}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>Total Users</CardTitle>
                        <UserRound className='max-sm:hidden' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-body-bold'>{totalCustomers}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>Total Products</CardTitle>
                        <Tag className='max-sm:hidden' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-body-bold'>{totalProducts}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>Total Categories</CardTitle>
                        <Shapes className='max-sm:hidden' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-body-bold'>{totalCategories}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>Total Colors</CardTitle>
                        <Palette className='max-sm:hidden' />
                    </CardHeader>
                    <CardContent>
                        <p className='text-body-bold'>{totalColors}</p>
                    </CardContent>
                </Card>
            </div>

            
            <Card className='mt-10'>
                <CardHeader>
                    <CardTitle>Sales Chart (VNĐ)</CardTitle>
                </CardHeader>
                <CardContent>
                    <SalesChart data={graphData} />
                </CardContent>
            </Card>
        </div>
    );
}
