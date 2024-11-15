import { useQuery } from "@tanstack/react-query";
import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import { getListConnection } from "../../../apis/callapiconnection";
import { ConnectionItem, iconUser } from "../../../types/type";


export default function AllConection() {
  const {data,isError,isLoading} = useQuery({queryKey:["connection"],queryFn:getListConnection})

  
  const handelConnection = ()=>{
       return data?.data.content.map((item:ConnectionItem)=>{
        return (
          <Col span={8} >
          <div className="bg-white rounded-[15px] flex flex-col" >
          <img className="rounded-t-[15px]" style={{width:"100%"}} src={item.image} alt="conection1" />
          <Link to={`/allconection/${item.id}`} className="p-3 py-5 block grow">
          <p className=" text-[19px] font-[500]  text-center 	">{item.desc} 
          {iconUser()}
            </p>
          </Link>
          </div>
          </Col>
        )
       })
  }
    if(isError||isLoading) return <Spin className="container mx-auto"/>
  return (
    <div className="container mx-auto py-10">
        <Row gutter={[50,50]} className="justify-between">
        {handelConnection()}
    </Row>
    
    </div>
  )
}
