import { useQuery } from "@tanstack/react-query";
import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import { getListConnection } from "../../../apis/callapiconnection";
import { ConnectionItem } from "../../../types/type";


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
          <svg
              viewBox="0 0 14 10"
              fill="none"
              aria-hidden="true"
              focusable="false"
              role="presentation"
              style={{ width: "1.5rem",display:"inline",marginLeft:"10px"}}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                fill="currentColor"
              ></path>
            </svg>
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
