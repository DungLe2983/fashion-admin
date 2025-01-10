"use client";

import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";
import { columns } from "@/components/productitems/ProductItemColumn";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductItemPage = () => {
  const [loading, setLoading] = useState(false);
  const [productitems, setProductItems] = useState<ProductItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default 10 items per page
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  // Fetch product items
  const getProductItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/productitems", {
        method: "GET",
      });
      const data = await res.json();
      setProductItems(data.data);
      setTotalPages(Math.ceil(data.data.length / pageSize)); // Calculate total pages
      setLoading(false);
    } catch (err) {
      console.log("[productitems_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductItems();
  }, []);

  // Calculate current page data
  const currentData = productitems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Go to specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
      <div className='flex items-center justify-between'>
        <p className='text-heading2-bold'>Product Items</p>
        <Button
          className='bg-blue-1 text-white'
          onClick={() => router.push("/productitems/new")}
        >
          <Plus className='h-4 w-4 mr-2' />
          Create Product Item
        </Button>
      </div>
      <Separator className='bg-grey-1 my-4' />
      <DataTable
        columns={columns}
        data={currentData} // Display current page data
        searchKey='quantity'
      />

      {/* Pagination Controls */}
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

export default ProductItemPage;
