
import { ListProduct, Param } from '../../../types/type'
import { useQuery } from '@tanstack/react-query'
import { getProductByParam } from '../../../apis/callapiproduct'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'

export default function RelatedProducts(props:{id:number}) {
    const param :Param={
        type:"",
        page:0,
        pageSize:8
      } 
      const {data,isError,isLoading} = useQuery({queryKey:["Related-Products"],queryFn:()=>getProductByParam(param)})
      console.log(data)
      const handelProduct = ()=>{
         return data?.data.content.listProduct.map((item:ListProduct)=>{
            if(item.id !== props.id){
                return(
                    <Row key={item.id} className='mb-5 RelatedProducts-box' >
                         <Col span={22} className='flex gap-3 '>
                         <img src={item.image} alt="image" width={50}/>
                         <Link to={`/product-detail/${item.id}`} className='truncate'>{item.content}</Link>
                         </Col>
                         <Col span={2}>{item.price} $</Col>
                    </Row>
                )
            }
         })
      }
      if(isError||isLoading) return;
  return (
    <div>
      {handelProduct()}
    </div>
  )
}
