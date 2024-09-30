"use client";

import { useGetSingleProductsQuery } from "@/redux/api/endpoints/product.api";
import { useParams } from "next/navigation";

const Page = () => {
  const productId = useParams();
  console.log(productId);

  // const {data:singleProduct} = useGetSingleProductsQuery()
  return <div>This is page</div>;
};
export default Page;
