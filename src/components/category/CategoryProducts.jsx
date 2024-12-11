import { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

import {
  useGetCategoryQuery,
  useGetCategoryProductsQuery,
} from "@/providers/store/services/categories";
import ProductsList from "../product/ProductsList";

const CategoryProducts = () => {
  const [page, setPage] = useState(1);

  const { categoryId } = useParams();

  const { data: categoryData } = useGetCategoryQuery(categoryId);
  const category = categoryData?.category;
  const { data: categoryProductsData } = useGetCategoryProductsQuery({
    id: categoryId,
    page: page - 1,
  });
  const categoryProducts = categoryProductsData?.products;
  const categoryProductsTotalCount = categoryProductsData?.totalCount;

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box>
      {category && categoryProductsData && (
        <ProductsList
          header={`${category.name} category`}
          products={categoryProducts}
          page={page}
          handlePageChange={handlePageChange}
          totalCount={categoryProductsTotalCount}
          productsPerPage={12}
        />
      )}
    </Box>
  );
};

export default CategoryProducts;
