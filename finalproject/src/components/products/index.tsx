import { DownOutlined } from "@ant-design/icons";
import { Checkbox } from "@mui/joy";
import { Col, Pagination, PaginationProps, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { useHover, useLocalStorage } from "@uidotdev/usehooks";
import { ListProduct, ProductProps } from "../../types/type";


export default function Products(props:ProductProps) {
  const [found, setFound] = useState(false);
  const [drawing, saveDrawing] = useLocalStorage("carts", null);
  const [stock,setStock] = useState<boolean>(false)
  const listProductToCart:any = drawing ? drawing : [];
  const addToCart = (item:ListProduct)=>{
    
    let found = true;
    listProductToCart.forEach((element:any) => {
         if(element.id === item.id){
              element.quantity++;
              found= false;
         }
    });
    if(listProductToCart.length===0 || found){
      listProductToCart.push({...item,quantity:1})
 }
   saveDrawing(listProductToCart)
  }
  
  const { Text } = Typography;
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    props.getPage(pageNumber);
  };
  const handelProduct = ()=>{
    return props?.data?.listProduct.map((item:ListProduct)=>{
      const [ref, hovering] = useHover();
      const href = hovering ? item.image:item.imageHover
      if(item.image && item.imageHover){
        return (
          <Col span={6} key={item.id}>
          <div className="flex flex-col items-center gap-5 bg-[#f3eee7] rounded-[20px]">
            <img ref={ref} className="rounded-t-[20px]" style={{height:"350px" ,width:"100%"}}
              src={href}
              alt="product"
            />
            <Link className="flex " to={`/product-detail/${item.id}`}>
              <Text className="text-center font-[600] custom-p">{item.content}</Text>
            </Link>
            <Text className="font-[450]">{(item.price*25000).toLocaleString()}₫</Text>
            <button onClick={()=>{addToCart(item)}} className="py-2.5 mb-3 text-[#c5ac95] text-[17px] rounded-[20px] w-[90%] bg-white font-[450] border-[1.5px] border-[#c5ac95]">Add to cart</button>
          </div>
        </Col>
        )
      }
      
    })
  }
  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between">
        <div className="flex gap-5">
          <span>Filter : </span>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                setFound(!found);
              }}
            >
              <span className="mr-2">Availability</span>
              <DownOutlined style={{ fontSize: "11px" }} />
            </button>
            {found && (
              <div className="box-modal-product w-[300px] bg-white p-4  rounded-[15px]">
                <div className="flex justify-between pb-5 border-b-[1px]">
                  <span>0 selected</span>
                  <button>Reset</button>
                </div>
                <div className="flex flex-col gap-5 mt-5">
                  <Checkbox label="In stock (64)" />
                  <Checkbox label="Out of stock (56)" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <span>{props.data.totalProduct} product</span>
        </div>
      </div>
      <div className="mt-10">
        <Row gutter={[50,50]}>
          {props.data.listProduct && handelProduct()}
        </Row>
        <div className="mt-10 flex justify-center">
        {props.data.page>1&&(<Pagination defaultCurrent={1} total={props.data.page*10} onChange={onChange}/>)}
        
        </div>
      </div>
    </div>
  );
}
