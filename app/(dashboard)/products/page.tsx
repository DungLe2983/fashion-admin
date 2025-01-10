"use client";

import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";
import { columns } from "@/components/products/ProductColumn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default 10 items per page
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  // Fetch product data
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data.data);
      setFilteredProducts(data.data); // Initially set filtered products to all products
      setTotalPages(Math.ceil(data.data.length / pageSize)); // Calculate total pages
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize)); // Recalculate total pages after search
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Calculate current page data
  const currentData = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Go to specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
      <div className='flex items-center justify-between'>
        <p className='text-heading2-bold'>Products</p>
        <Button
          className='bg-blue-1 text-white'
          onClick={() => router.push("/products/new")}
        >
          <Plus className='h-4 w-4 mr-2' />
          Create Product
        </Button>
      </div>
      <Separator className='bg-grey-1 my-4' />

      <DataTable columns={columns} data={currentData} searchKey='name' />

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

export default ProductPage;
