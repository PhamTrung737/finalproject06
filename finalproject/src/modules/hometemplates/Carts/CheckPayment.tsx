import { useQuery } from "@tanstack/react-query";
import { getListPayment } from "../../../apis/callapiproductincart";
import { Box } from "@mui/joy";
import Radio from "@mui/joy/Radio";
import { useState } from "react";
import { Spin } from "antd";

type DataPayment = {
  id: number;
  name: string;
  image: string;
};

type Props ={
    idPayment:(id:number)=>void
}
export default function CheckPayment(props:Props) {
  const [selectedValue, setSelectedValue] = useState<number>(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: getListPayment,
    retry: 3,
  });
  if (isError || isLoading) return <Spin className="container mx-auto" />;

  


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(+event.target.value);
    
  };
  const renderRadio = () => {
    return data?.data.content.map((item: DataPayment) => {
        return (
          <div className="flex gap-2" key={item.id}>
            <Radio
              checked={selectedValue === item.id}
              onChange={handleChange}
              value={item.id}
              name="radio-buttons"
            />
            <div className="mt-[-5px]">
              <span>{item.name}</span>
              <img
                style={{
                  width: 100,
                  height: 80,
                  objectFit: "cover",
                  marginTop: 2,
                }}
                src={item.image}
                alt=""
              />
            </div>
          </div>
        );
      });
  };
  props.idPayment(selectedValue);
  return <Box sx={{ display: "flex", gap: 2 }}>{renderRadio()}</Box>;
}
