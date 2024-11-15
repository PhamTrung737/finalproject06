import { DeleteOutlined } from "@ant-design/icons";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Button, Input, notification, Spin, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import {
  checkOutCartByIdUserAndIdCart,
  getListProductInCartByUser,
  ParamCheckOutCart,
  ParamUpdateCarts,
  UpdateCarts,
  updateProductInCartByIdUSer,
} from "../../../apis/callapiproductincart";
import {
  DataType,
  NotificationType,
  ProductCarts,
  UserLogin,
} from "../../../types/type";

import { useEffect, useState } from "react";
import CheckPayment from "./CheckPayment";
import CartsLogin from "./CartsLogin";
import dayjs from "dayjs";

export default function Carts() {
  const [drawing, setDrawing] = useLocalStorage<ProductCarts[] | null>(
    "carts",
    null
  );
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  })
  const [user] = useLocalStorage<UserLogin | null>("user", null);
  const [idPayment, setIdPayment] = useState<number>(1);
  const [checkPayment, setCheckPayment] = useState<boolean>(false);
  const [idMoney] = useLocalStorage<number>("money");
  const [api, contextHolder] = notification.useNotification();
  
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };
  const userId:number = user?.id ? user.id : 0;
  const { data, isError, isLoading } = useQuery({
    queryKey: [`list-product-cart ${userId}`],
    queryFn: () => {
      return getListProductInCartByUser(userId);
    },
  });
  const { mutate: checkOutCart } = useMutation({
    mutationKey: ["check-out", userId],
    mutationFn: (param: ParamUpdateCarts) => {
      return updateProductInCartByIdUSer(param);
    },
    onSuccess: () => {
      openNotificationWithIcon("success", "Update successfully ");
      queryClient.invalidateQueries({queryKey:[`list-product-cart ${user?.id}`],exact:true,refetchType:"all"})
      setCheckPayment(true);
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
    retry:3,
    retryDelay:5000
  });

  const { mutate: paymentCart } = useMutation({
    mutationKey: ["payment", userId],
    mutationFn:(param:ParamCheckOutCart)=>{
      return checkOutCartByIdUserAndIdCart(param);
    },
    onSuccess:(data)=>{
        if(data.data.statusCode===200){
           openNotificationWithIcon("success",data.data.content)
            setDrawing(null);
            queryClient.invalidateQueries({queryKey:[`list-product-cart ${user?.id}`]})

        }else{
          openNotificationWithIcon("error",data.data.content)
        }
    },
    onError:(error)=>{
        openNotificationWithIcon("error",error.message);
    },
    retry:3,
    retryDelay:5000
  });
  
  const dataCarts: ProductCarts[] = data?.data.content.listProduct ? data?.data.content.listProduct:[];

  

  
  let allExitd = false;
  if (dataCarts.length > 0&&drawing && drawing.length > 0) {
    dataCarts.forEach((item: ProductCarts) => {
      drawing.forEach((element: ProductCarts) => {
        if (item.id !== element.id) {
          allExitd = true;
        }
      });
    });
  }

  useEffect(()=>{
    if (!allExitd && dataCarts.length>0) {
      setDrawing(dataCarts);
    }
  },[])
  
  const setQuantity = (index: number, found: boolean) => {
    const newList = drawing ? [...drawing] :[];
    if (found) {
      newList[index].quantity++;
    } else {
      if (newList[index].quantity > 1) {
        newList[index].quantity--;
      } else {
        newList.splice(index, 1);
      }
    }
    setCheckPayment(false);
    setDrawing(newList);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (item) => {
        return (
          <Link to={`/product-detail/${item.id}`} className="flex  gap-5">
            <img
              className="rounded-md"
              width={150}
              src={item.image}
              alt={item.image}
            />
            <div>
              <p className="text-xl font-[500]">{item.content}</p>
              <p className="text-lg">RD$ {item.price}</p>
            </div>
          </Link>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (item) => {
        return (
          <div className="flex items-center carts__quantity">
            <div className="flex ">
              <Button
                onClick={() => {
                  setQuantity(item.index, true);
                }}
              >
                +
              </Button>
              <Input value={item.quantity} />
              <Button
                onClick={() => {
                  setQuantity(item.index, false);
                }}
              >
                -
              </Button>
            </div>
            <Button
              onClick={() => {
                const newlist = drawing ? [...drawing] :[];
                newlist.splice(item.index, 1);
                setDrawing(newlist);
              }}
              className="border-0"
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (item) => {
        return <>{item.toLocaleString()} $</>;
      },
    },
  ];
  const listItemTable: DataType[] = [];
  let totalAmuont = 0;
  if (drawing&&drawing.length > 0) {
    drawing.forEach((element: ProductCarts, index: number) => {
      listItemTable.push({
        key: element.id,

        product: {
          id: element.id,
          content: element.content,
          image: element.image,
          price: element.price,
        },
        quantity: {
          quantity: element.quantity,
          index: index,
        },
        total: element.quantity * element.price,
      });
      totalAmuont += element.quantity * element.price;
    });
  }

  const getIdPayment = (value: number) => {
    setIdPayment(value);
  };

  const onClickCheckOut = () => {
    const dataUpdate: UpdateCarts[] = [];
    if (drawing&&drawing.length > 0) {
      drawing.forEach((item: ProductCarts) => {
        dataUpdate.push({
          idProduct: item.id,
          quantity: item.quantity,
          createDay: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
        });
      });
    }
    const param: ParamUpdateCarts = {
      param: dataUpdate,
      id_user: userId,
      id_money: idMoney,
      id_payment: idPayment,
    };

    checkOutCart(param);
  };
  
  const onClickPaymentCart = ()=>{
      const formData:ParamCheckOutCart = new FormData();
      formData.append("idCart",data?.data.content.idCart)
      formData.append("idUser",userId)
      paymentCart(formData);
  }
  if(userId===0) return <CartsLogin/>
  if (isError || isLoading) return <Spin className="container mx-auto" />;
  return (
    <div className="container mx-auto">
      {contextHolder}
      <div className="flex justify-between items-center my-7">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <Link className="underline text-[#996d43]" to={"/"}>
          continue shopping
        </Link>
      </div>
      <Table columns={columns} dataSource={listItemTable} />
      <div className="my-5 p-2 bg-[#fff]">
        <CheckPayment idPayment={getIdPayment} />
      </div>
      <div className="flex justyfy-between items-center flex-col gap-3 p-5 bg-[white]">
        <h2 className="text-xl font-[500]">Tổng tiền thanh toán</h2>
        <p className="text-[red] font-[400]">{totalAmuont} $</p>
        {checkPayment ? (
          <Button className="bg-[#ffa834] font-[400]" onClick={onClickPaymentCart}>Thanh toán</Button>
        ) : (
          <Button className="bg-[#ffa834] font-[400]" onClick={onClickCheckOut}>
            Check out
          </Button>
        )}
      </div>
    </div>
  );
}
