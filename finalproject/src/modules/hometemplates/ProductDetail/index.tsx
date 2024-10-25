import { useQuery } from "@tanstack/react-query";
import {  Carousel, Col, Image, Row, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../../apis/callapiproduct";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useLocalStorage } from "@uidotdev/usehooks";

import Comment from "./comment";
import { ImageItem, ListProduct } from "../../../types/type";

export default function ProductDetail() {
    const [quantity,setQty] = useState(1)
    const {id} = useParams();
    const [drawing, saveDrawing] = useLocalStorage("carts", null);
    const listProductToCart:any = drawing ? drawing : [];
 

    const {data,isError,isLoading}= useQuery({queryKey:["product-detail",id],queryFn:()=>getProductDetail(Number(id))})
    const productDetail = data?.data.content
    const listImage:ImageItem[] = data?.data ? productDetail.image : []
    const handelImageProduct = ()=>{
        return listImage.map((item:ImageItem)=>{
            return (
                <div key={item.id}>
                   <Image src={item.image}></Image>
                </div>
            )
        })
    }
   
    const addToCart = ()=>{
        const item:ListProduct = {
            id:Number(id),
            content:productDetail?.name,
            image:productDetail.image[0]?.image,
            imageHover:productDetail.image[1]?.image,
            price:productDetail?.price
        }
        let found = true;
        listProductToCart.forEach((element:any) => {
             if(element.id === item.id){
                  element.quantity+=quantity;
                  found= false;
             }
        });
        if(listProductToCart.length===0 || found){
          listProductToCart.push({...item,quantity:quantity})
     }
       saveDrawing(listProductToCart)
      }

    if(isError||isLoading) return <Spin className="container mx-auto"/>
  return (
    <div className="container mx-auto py-10">
     <Row gutter={70}>
        <Col span={12}>
        <Carousel arrows infinite={true} >{handelImageProduct()}</Carousel>
        </Col>
        <Col span={12} className="text-[#5f5b65]">
        <h2 className="text-[45px] mb-5">{productDetail?.name}</h2>
        <span className="text-lg">RD$ {productDetail?.price.toLocaleString()}</span>
        <div className="mt-5">
            <span>Quantity</span>
            <div className="mt-3 flex py-2 px-4 justify-between bg-white rounded-[15px] border-[1px] border-[#888888] w-[150px]">
                <button onClick={()=>{setQty(quantity+1)}}><PlusOutlined /></button>
                <span>{quantity}</span>
                <button onClick={()=>{if(quantity>1)setQty(quantity-1)}}><MinusOutlined /></button>
            </div>
        </div>
        <button onClick={addToCart} className="w-full py-3 mt-5 rounded-[10px] bg-white text-[16px] text-[#c5ad96] border-[1.5px] border-[#c5ad96]">Add to cart</button>
        <h3 className="font-[500] text-[18px] mt-5">Description</h3>
        <p className="my-3 text-[16px]">{productDetail?.description}</p>
        <p className="text-[16px]">*Estimated time of shipment: From late Sep. 2024</p>
        <p className="my-3 text-[16px]">Box Contents: </p>
        <ul className="text-[16px]">
            <li>- 6th Anniversary Illustration Collection Vol.1</li>
            <li>- 6th Anniversary Illustration Collection Vol.2</li>
            <li>- 6th Anniversary Pin</li>
            <li>- Commemorative Ticket</li>
            <li>- Western Brochure </li>
            <li>- Stainless Steel Flask

</li>
            <li>- Fridge Magnet Set</li>
            <li>- ID Card Holder</li>
            <li>- Table Mat</li>
            <li>- Shawl</li>
        </ul>
        
        <p className="text-[16px] mt-3">
            <span className="font-[500]">Size : </span>
            <span>{productDetail?.size}</span>
        </p>
        <p className="text-[16px] mt-3">
            <span className="font-[500]">Material: </span>
            <span>{productDetail?.material}</span>
        </p>
        </Col>
     </Row>
      <Row className="mt-5">
        <Col span={12}><Comment/></Col>
      </Row>
    </div>
  )
}
