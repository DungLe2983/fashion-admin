"use client";
import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";
import { columns } from "@/components/orders/OrderColumn";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", { method: "GET" });
      const data = await res.json();

      setOrders(data.data); // Dữ liệu toàn bộ
      setTotalPages(Math.ceil(data.data.length / pageSize)); // Tổng số trang
      setLoading(false);
    } catch (err) {
      console.log("[orders_GET", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Tính toán dữ liệu của trang hiện tại
  const currentData = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Chuyển đến trang cụ thể
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Orders</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable
        columns={columns}
        data={currentData} // Hiển thị dữ liệu của trang hiện tại
        searchKey='_id'
      />
      <div className='flex justify-center items-center mt-6 space-x-2'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
              } transition`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
