import { Spin } from "antd";
import Products from "../../../components/products";
import { getProductByParam } from "../../../apis/callapiproduct";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Param, PropsDataProduct } from "../../../types/type";

export default function MahjongSoul() {
  const [page, setPage] = useState<number>(1);
  const param: Param = {
    type: "/category/Mahjong-Soul",
    page: page - 1,
    pageSize: 16,
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["Mahjong-Soul", page],
    queryFn: () => getProductByParam(param),
    retry:3,
    retryDelay:5000
  });
  const listProduct:PropsDataProduct = data ? data.data.content : [];
  const getpage = (page: number) => {
    setPage(page);
  };
  if (isError || isLoading) return <Spin className="container mx-auto" />;
  return (
    <div>
      <Products data={listProduct} getPage={getpage} />
    </div>
  );
}
