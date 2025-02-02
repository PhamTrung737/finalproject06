import { Spin } from "antd";
import HomeCarousels from "../../../components/carousels";
import Products from "../../../components/products";
import { useQuery } from "@tanstack/react-query";
import { getProductByParam } from "../../../apis/callapiproduct";
import { useState } from "react";
import { Param, PropsDataProduct } from "../../../types/type";

export default function HomeTemplates() {
  const [page, setPage] = useState<number>(1);
  const param: Param = {
    type: "/category/Azur-Lane",
    page: page - 1,
    pageSize: 16,
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["Azur-Lane", page],
    queryFn: () => getProductByParam(param),
    retry:3,
    retryDelay:5000
  });

  const listProduct: PropsDataProduct = data ? data.data.content : [];
  const getpage = (page: number) => {
    setPage(page);
  };
  if (isError || isLoading) return <Spin className="container mx-auto" />;
  return (
    <div>
      <HomeCarousels />
      <Products data={listProduct} getPage={getpage} />
    </div>
  );
}
