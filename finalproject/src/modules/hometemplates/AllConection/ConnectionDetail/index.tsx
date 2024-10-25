import { useParams } from "react-router-dom"
import { getProductByIdConnection } from "../../../../apis/callapiproduct";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Products from "../../../../components/products";
import { Param } from "../../../../types/type";


export default function ConnectionDetail() {
    const {id} = useParams();
    const [page,setPage] = useState(0);
    const param:Param = {
        id:Number(id),
        page:page,
        pageSize:16
    }
    const {data,isError,isLoading}= useQuery({queryKey:["product-connection",id],queryFn:()=>getProductByIdConnection(param)})
    
    const listProduct = data? data.data.content:[];
    
    const getpage = (page:number)=>{
        setPage(page)
      }
    
    if(isError||isLoading) return <Spin className="container mx-auto"/>
  return (
    <Products data={listProduct} getPage={getpage}/>
  )
}
