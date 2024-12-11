import { useState } from "react";

import { useGetProductsQuery } from "@/providers/store/services/products";
import ProductsList from "@/components/product/ProductsList";

const PRODUCTS_PER_PAGE = 12;

const ManageProducts = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (_, value) => setPage(value);

  const { data } = useGetProductsQuery({
    page: page - 1,
    perPage: PRODUCTS_PER_PAGE,
  });

  return (
    <ProductsList
      header="Products List"
      products={data?.products}
      page={page}
      onPageChange={handlePageChange}
      totalCount={data?.totalCount}
      productsPerPage={PRODUCTS_PER_PAGE}
    />
  );
};

export default ManageProducts;
