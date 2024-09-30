"use client";
import { useGetAllProductsQuery } from "@/redux/api/endpoints/product.api";
import ProductCard from "./ProductCard";
import { toast } from "sonner";
import { TProductRes } from "@/applicationTypes/applicationTypes";

const Products = () => {
  const { data: allProducts, isLoading, isError } = useGetAllProductsQuery("");

  if (isError) {
    return toast.warning("failed to load or fetch data");
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }
  const Products = allProducts.data || [];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 ">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Products.map((singleProduct: TProductRes) => (
            <ProductCard
              key={singleProduct._id}
              singleProduct={singleProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Products;
