import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Button, Input, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { getListProductInCartByUser } from "../../../apis/callapiproductincart";
import { DataType } from "../../../types/type";


export default function Carts() {
  const [drawing, setDrawing] = useLocalStorage("carts", null);
  const id = 1;
  const { data, isError, isLoading } = useQuery({
    queryKey: ["list-product-cart", id],
    queryFn: () => {
      return getListProductInCartByUser(id);
    },
    retry:3,
    retryDelay:1000
  });
  console.log(data?.data.content);
  const listProductToCart: any = drawing ? drawing : [];
  const setQuantity = (index: number, found: boolean) => {
    if (found) {
      listProductToCart[index].quantity++;
    } else {
      if (listProductToCart[index].quantity > 1) {
        listProductToCart[index].quantity--;
      } else {
        listProductToCart.splice(index, 1);
      }
    }
    setDrawing(listProductToCart);
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (item) => {
        return (
          <Link
            to={`/product-detail/${item.id}`}
            className="flex items-center gap-5"
          >
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
                listProductToCart.splice(item.index, 1);
                setDrawing(listProductToCart);
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
        return <>{(item * 25000).toLocaleString()}đ</>;
      },
    },
  ];
  const listItemTable: DataType[] = [];
  listProductToCart.forEach((element: any, index: number) => {
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
  });
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-7">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <Link className="underline text-[#996d43]" to={"/"}>
          continue shopping
        </Link>
      </div>
      {listProductToCart.length > 0 ? (
        <Table columns={columns} dataSource={listItemTable} />
      ) : (
        <div className="flex flex-col items-center my-36">
          <h2 className="text-3xl font-[500] mb-7">Your cart is empty</h2>
          <Link to={"/allproduct"}>Continue Shopping</Link>
        </div>
      )}
    </div>
  );
}
