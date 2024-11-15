import { useQuery } from "@tanstack/react-query";
import { useLocalStorage, useWindowScroll } from "@uidotdev/usehooks";
import { Pagination, PaginationProps, Spin, Table, TableProps, Tag } from "antd";
import { UserLogin } from "../../../types/type";
import { getProductInCartByIdUser } from "../../../apis/callapiproductincart";
import { Link } from "react-router-dom";
import { useState } from "react";

interface DataType {
  id: number;
  image: string;
  nameProduct: string;
  price: number;
  status: boolean;
}

export default function CartsByUserId() {
  const [user] = useLocalStorage<UserLogin>("user")
  const [current,setCurrent] = useState<number>(1)
  const [{y},scrollTo] = useWindowScroll();
  const {data,isError,isLoading} = useQuery({
    queryKey:['list-cart-by-id'],
    queryFn:()=> getProductInCartByIdUser(user.id)
  })
  const listProduct : DataType[] = data  ? [...data.data.content]:[];
  const newList :DataType[] = listProduct.reverse().slice((current-1)*8,(current-1)*8+8)
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render:(image)=><img src={image} width={100} alt="image" />
    },
    {
      title: 'Name',
      dataIndex: 'nameProduct',
      key: 'nameProduct',
      render:(name)=><span>{name}</span>
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
      render: (price)=><span>{price}</span>
    },
    {
      title: 'Status',
      dataIndex:"status",
      render:(status)=>{
        if(status){
          return <Tag color="#87d068"> Not purchased</Tag>
        }else{
          return <Tag color="#108ee9">Purchased</Tag>
        }
      } ,
    },
  ];
 
  const onChange: PaginationProps['onChange'] = (page) => {
   
    scrollTo({ left: 0, top: 0, behavior: "smooth" })
    setCurrent(page)
  };
  if(isError||isLoading) return <Spin className="container mx-auto"/>
  return (
    <div>
      
      {data?.data.statusCode===500?(
        <div className='flex flex-col justyfy-between items-center gap-2 my-32'>
        <h1 className='text-2xl font-[500]'>Your cart is empty</h1>
        <div className='text-lg'>
          <Link to={"/"} className='text-[#996d43] mr-1 underline'>Continue shopping</Link>
        
        </div>
      </div>
      ):(
        <div>
          <h2 className="text-xl font-[500] mb-5">History</h2>
        {
          listProduct.length>0 && (
            <div>
              <Table dataSource={newList} columns={columns} pagination={false}/>
              <Pagination align="end" onChange={onChange} className="mt-5" total={30} />
            </div>
          )
        }
        </div>
      )}
    </div>
  )
}
