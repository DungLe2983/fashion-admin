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
const generateFakeData = (): SaleItem[] => {
    const data: SaleItem[] = [];
    const months = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];
    for (let i = 0; i < 12; i++) {
        data.push({
            name: months[i],
            sales: Math.floor(Math.random() * 100),
        });
    }
    return data;
};

const SalesChart = ({ data }: { data: any[] }) => {
    const [chartData, setChartData] = useState<SaleItem[]>([]);

    useEffect(() => {
        // Tạo dữ liệu giả
        const data = generateFakeData();
        setChartData(data);
    }, []);

    return (
        <ResponsiveContainer width='100%' height={300}>
            <LineChart
                className='w-full h-full'
                data={chartData}
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
