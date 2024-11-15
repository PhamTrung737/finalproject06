import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Form,
  Space,
  Table,
  notification,
  PopconfirmProps,
} from "antd";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProductByRoleAdmin,
  deleteProductById,
  FormDataAddProduct,
  FormDataUpDateProduct,
  FormDataUpdateProductByIdConnection,
  getListProductByRoleAdmin,
  IdConnection,
  updateProductById,
  updateProductByIdConnection,
} from "../../../apis/callapiproduct";
import { getListMaterial } from "../../../apis/callapimaterial";
import { getListType } from "../../../apis/callapitype";
import { getListCategory } from "../../../apis/callapicategory";
import { getListConnection } from "../../../apis/callapiconnection";
import { NotificationType } from "../../../types/type";

export default function AdminProduct() {
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      size: "",
      idMaterial: 0,
      idCategory: 0,
      idType: 0,
      idConnection: 0,
      id: 0,
    },
  });

  const { TextArea } = Input;

  const [isupDate, setIsUpdate] = useState<number>(1);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  const queryClient = useQueryClient();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

  const { data } = useQuery({
    queryKey: ["get-list-product"],
    queryFn: getListProductByRoleAdmin,
  });
  const listMaterial = useQuery({
    queryKey: ["list-material"],
    queryFn: getListMaterial,
  });
  const listType = useQuery({
    queryKey: ["list-type"],
    queryFn: getListType,
  });
  const listCategory = useQuery({
    queryKey: ["list-category"],
    queryFn: getListCategory,
  });
  const listConnection = useQuery({
    queryKey: ["list-connection"],
    queryFn: getListConnection,
  });

  const { mutate: acctionProduct } = useMutation({
    mutationKey: ["acction-product", isupDate],
    mutationFn: (param: any) => {
      if (isupDate === 1) {
        return addProductByRoleAdmin(param);
      } else if (isupDate === 2) {
        return updateProductById(param);
      } else {
        return updateProductByIdConnection(param);
      }
    },
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "Successfully");
        setIsOpenModal(false);
        queryClient.invalidateQueries({
          queryKey: ["get-list-product"],
          exact: true,
        });
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: number) => {
      return deleteProductById(id);
    },
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "Delete product success"),
          queryClient.invalidateQueries({ queryKey: ["get-list-product"] });
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    if (e) {
      deleteProduct(+e);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image: string) => {
        return <img src={image} alt="image" width={100} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Delete product"
            description="Are you sure you want to delete this product?"
            okText={<span>OK</span>}
            cancelText="Cancel"
            onConfirm={() => {
              confirm(record.id);
            }}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button
            type="default"
            onClick={() => {
              setIsOpenModal(true);
              setIsUpdate(2);
              setValue("name", record.name);
              setValue("price", record.price);
              setValue("description", record.description);
              setValue("idCategory", record.idCategory);
              setValue("idMaterial", record.idMaterial);
              setValue("idType", record.idType);
              setValue("size", record.size);
              setValue("id", record.id);
            }}
          >
            Update
          </Button>
          <Button
            type="default"
            onClick={() => {
              setIsOpenModal(true);
              setIsUpdate(3);
              setValue("idConnection", record.idConnection);
            }}
          >
            Add connection
          </Button>
        </Space>
      ),
    },
  ];

  const onSubmit = (formValues: any) => {
    const value = { ...formValues };

    const formDataNotConnection: FormDataAddProduct = new FormData();
    formDataNotConnection.append("description", value.description);
    formDataNotConnection.append("idCategory", value.idCategory);
    formDataNotConnection.append("idMaterial", value.idMaterial);
    formDataNotConnection.append("idType", value.idType);
    formDataNotConnection.append("name", value.name);
    formDataNotConnection.append("price", value.price);
    formDataNotConnection.append("size", value.size);
    const formUpdate: FormDataUpDateProduct = {
      id: value.id,
      formData: formDataNotConnection,
    };
    const idConnection: IdConnection = new FormData();
    idConnection.append("idConnection", value.idConnection);
    const formUpdateConnection: FormDataUpdateProductByIdConnection = {
      id: value.id,
      formData: idConnection,
    };
    if (isupDate === 1) {
      acctionProduct(formDataNotConnection);
    } else if (isupDate === 2) {
      acctionProduct(formUpdate);
    } else {
      acctionProduct(formUpdateConnection);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
              path: "/admin",
            },
            {
              title: "Quản lý sản phẩm",
            },
          ]}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsOpenModal(true);
            reset();
            setIsUpdate(1);
          }}
        >
          Add
        </Button>
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách sản phẩm</h4>
        <Table
          className="mt-2"
          columns={columns}
          dataSource={data?.data.content}
        />
      </div>
      <Modal
        title={isupDate === 1 ? "Add Product" : "Update Product"}
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={18}>
            {isupDate === 2 || isupDate === 1 ? (
              <Row gutter={18} className="mb-5">
                <Col span={24}>
                  <label className="text-sm" htmlFor="">
                    Name Product
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        size="large"
                        className="mt-1"
                        placeholder="Name"
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <label className="text-sm">Price</label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        size="large"
                        className="mt-1"
                        placeholder="Price..."
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <label className="text-sm" htmlFor="">
                    Description
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextArea
                        size="large"
                        className="mt-1"
                        placeholder="description..."
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <label className="text-sm" htmlFor="">
                    Size
                  </label>
                  <Controller
                    name="size"
                    control={control}
                    render={({ field }) => (
                      <Input
                        size="large"
                        className="mt-1"
                        placeholder="size..."
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <label className="text-sm" htmlFor="">
                    Material
                  </label>
                  <Controller
                    name="idMaterial"
                    control={control}
                    render={({ field }) => {
                      console.log(123);
                      return (
                        <select
                          onChange={(e) => {
                            setValue("idMaterial", +e.target.value);
                          }}
                          className="admin-user-select-roles"
                        >
                          <option value={0}>Please select Material</option>
                          {listMaterial.data?.data.content.map(
                            (item: { id: number; name: string }) => {
                              return (
                                <option
                                  key={item.id}
                                  selected={
                                    field.value === item.id ? true : false
                                  }
                                  value={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      );
                    }}
                  />
                </Col>
                <Col span={24}>
                  <label className="text-sm" htmlFor="">
                    Type
                  </label>
                  <Controller
                    name="idType"
                    control={control}
                    render={({ field }) => {
                      return (
                        <select
                          onChange={(e) => {
                            setValue("idType", +e.target.value);
                          }}
                          className="admin-user-select-roles"
                        >
                          <option value={0}>Please select Type</option>
                          {listType.data?.data.content.map(
                            (item: { id: number; name: string }) => {
                              return (
                                <option
                                  key={item.id}
                                  selected={
                                    field.value === item.id ? true : false
                                  }
                                  value={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      );
                    }}
                  />
                </Col>
                <Col span={24}>
                  <label className="text-sm" htmlFor="">
                    Category
                  </label>
                  <Controller
                    name="idCategory"
                    control={control}
                    render={({ field }) => {
                      return (
                        <select
                          onChange={(e) => {
                            setValue("idCategory", +e.target.value);
                          }}
                          className="admin-user-select-roles"
                        >
                          <option value={0}>Please select Category</option>
                          {listCategory.data?.data.content.map(
                            (item: {
                              id: number;
                              content: string;
                              keySearch: string;
                            }) => {
                              return (
                                <option
                                  key={item.id}
                                  selected={
                                    field.value === item.id ? true : false
                                  }
                                  value={item.id}
                                >
                                  {item.content}
                                </option>
                              );
                            }
                          )}
                        </select>
                      );
                    }}
                  />
                </Col>
              </Row>
            ) : (
              ""
            )}
            {isupDate === 3 && (
              <Col span={24} className="mb-5">
                <label className="text-sm" htmlFor="">
                  Connection
                </label>
                <Controller
                  name="idConnection"
                  control={control}
                  render={({ field }) => {
                    return (
                      <select
                        onChange={(e) => {
                          setValue("idConnection", +e.target.value);
                        }}
                        className="admin-user-select-roles"
                      >
                        <option value={0}>Please select Connection</option>
                        {listConnection.data?.data.content.map(
                          (item: {
                            id: number;
                            image: string;
                            desc: string;
                          }) => {
                            return (
                              <option
                                key={item.id}
                                selected={
                                  field.value === item.id ? true : false
                                }
                                value={item.id}
                              >
                                {item.desc}
                              </option>
                            );
                          }
                        )}
                      </select>
                    );
                  }}
                />
              </Col>
            )}
            <Col span={24} className="text-end">
              <Button htmlType="submit" size="large" type="primary">
                {isupDate === 1 ? "Add Product" : "Update Product"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
