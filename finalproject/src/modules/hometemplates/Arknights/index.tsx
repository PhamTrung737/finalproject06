import { useQuery } from "@tanstack/react-query";
import Products from "../../../components/products";
import { getProductByParam } from "../../../apis/callapiproduct";
import { useState } from "react";
import { Spin } from "antd";
import { Param } from "../../../types/type";


export default function Arknights() {
  const [page,setPage] = useState(1)
  const param :Param={
    type:"/category/Arknights",
    page:page-1,
    pageSize:16
  }
  const {data,isError,isLoading} = useQuery({queryKey:["Arknights",page],queryFn:()=>getProductByParam(param)})
  const listProduct = data? data.data.content:[];
  const getpage = (page:number)=>{
    setPage(page)
  }
  if(isError||isLoading) return <Spin className="container mx-auto"/>
  return (
    <div>
      <Products data={listProduct} getPage={getpage} />
    </div>
  )
}
