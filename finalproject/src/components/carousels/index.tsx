import { useQuery } from "@tanstack/react-query";
import { Carousel, Spin } from "antd";
import { getBanner } from "../../apis/callapibanner";
import { ItemBanner } from "../../types/type";


export default function HomeCarousels() {
   const {data,isError,isLoading} = useQuery({queryKey:["banner"],queryFn:getBanner})
  
    const contentStyle: React.CSSProperties = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
       
        width:"100%"
      };
  const handelBanner = ()=>{
       return data?.data.content.map((item:ItemBanner)=>{
           return(
            <div key={item.id}>
            <h3 >
              <img style={contentStyle} src={item.image} alt="..." />
            </h3>
          </div>
           )
       })
  }
  if(isError||isLoading) return <Spin className="container mx-auto"/>
  if(data?.data.statusCode===401) return
  return (
    <Carousel autoplay={true} dots={true}>
    {handelBanner()}
  </Carousel>
  )
}
