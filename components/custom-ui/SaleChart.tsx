'use client';

import { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
interface SaleItem {
    name: string;
    sales: number;
}

const SalesChart = ({ data }: { data: any[] }) => {
    const [orders, setOrders] = useState<any[]>([]);

    const getOrders = async () => {
        try {
            const res = await fetch('/api/orders', {
                method: 'GET',
            });
            const data = await res.json();
            setOrders(data.data);
        } catch (err) {
            console.log('[orders_GET', err);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);
    const salesData = orders.reduce((result: any[], order: any) => {
        const dateCreated = new Date(order.dateCreated);
        const name = dateCreated.toLocaleDateString(); // Chuyển đổi thành ngày/tháng/năm

        // Kiểm tra xem ngày đã tồn tại trong mảng result chưa
        const existingDay = result.find((item) => item.name === name);

        if (existingDay) {
            // Nếu ngày đã tồn tại, cộng tổng doanh thu vào ngày đó
            existingDay.sales += order.total;
        } else {
            // Nếu ngày chưa tồn tại, thêm một mục mới vào mảng result
            result.push({
                name: name,
                sales: order.total,
            });
        }

        return result;
    }, []);

    return (
        <ResponsiveContainer width='100%' height={300}>
            <LineChart
                className='w-full h-full'
                data={salesData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line type='monotone' dataKey='sales' stroke='#8884d8' />
                <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesChart;
