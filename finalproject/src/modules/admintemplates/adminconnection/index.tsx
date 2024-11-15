import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Form,
  Space,
  Table,
  TableProps,
  Upload,
  notification,
} from "antd";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import {
  addConnection,
  deleteConnetion,
  FormAddConnection,
  getListConnection,
  ParamUpdateConnection,
  updateConnection,
} from "../../../apis/callapiconnection";
import { NotificationType } from "../../../types/type";

interface DataType {
  id: number;
  image: string;
  desc: string;
}

export default function AdminConnection() {
  const { handleSubmit, control, setValue, reset, watch } = useForm({
    defaultValues: {
      id: 0,
      image: undefined,
      desc: "",
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isupDate, setIsUpdate] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
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
    queryKey: ["list-connection"],
    queryFn: getListConnection,
  });
  const { mutate: addConnectionAdmin } = useMutation({
    mutationKey: ["add-connection"],
    mutationFn: (param: FormAddConnection) => addConnection(param),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "Add connection success");
        queryClient.invalidateQueries({ queryKey: ["list-connection"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });
  const { mutate: deleteConnetionAdmin } = useMutation({
    mutationKey: ["delete-connection"],
    mutationFn: (id: number) => deleteConnetion(id),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "Delete connection success");
        queryClient.invalidateQueries({ queryKey: ["list-connection"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });

  const { mutate: updateConnectionAdmin } = useMutation({
    mutationKey: ["update-connection"],
    mutationFn: (param: ParamUpdateConnection) => updateConnection(param),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "Update connection success");
        queryClient.invalidateQueries({ queryKey: ["list-connection"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });
  const fetchImageAsFile = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Lỗi tải ảnh từ URL");

      const blob = await response.blob();

      const file = new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now(),
      });

      return file;
    } catch (error) {
      console.error("Lỗi khi lấy hình ảnh:", error);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} width={100} alt="image" />,
    },
    {
      title: "Name",
      dataIndex: "desc",
      render: (des) => <span>{des}</span>,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Delete connection"
            description="Are you sure you want to delete this connection?"
            onConfirm={() => {
              deleteConnetionAdmin(record.id);
            }}
            okText={<span>OK</span>}
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button
            type="default"
            onClick={() => {
              setIsOpenModal(true);
              setIsUpdate(true);
              setValue("image", record.image);
              setValue("desc", record.desc);
              setValue("id", record.id);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const imageAvatar = watch("image");

  const previewImage = (file: File) => {
    return URL.createObjectURL(file);
  };

  const onSubmit = (formValues: any) => {
    if (!isupDate) {
      const formData: FormAddConnection = new FormData();

      formData.append("file", formValues.image);
      formData.append("name", formValues.desc);
      addConnectionAdmin(formData);
    } else {
      if (typeof formValues.image === "string") {
        fetchImageAsFile(formValues.image, formValues.image.slice(28)).then(
          (file) => {
            if (file) {
              const formData: FormAddConnection = new FormData();

              formData.append("file", file);
              formData.append("name", formValues.desc);
              const param: ParamUpdateConnection = {
                id: formValues.id,
                formData,
              };
              updateConnectionAdmin(param);
            }
          }
        );
      } else {
        const formData: FormAddConnection = new FormData();

        formData.append("file", formValues.image);
        formData.append("name", formValues.desc);
        const param: ParamUpdateConnection = {
          id: formValues.id,
          formData,
        };
        updateConnectionAdmin(param);
      }
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
              title: "Quản lý connection",
            },
          ]}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setIsOpenModal(true);
            reset();
            setIsUpdate(false);
          }}
        >
          Add
        </Button>
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách connection</h4>
        <Table
          className="mt-2"
          columns={columns}
          dataSource={data?.data.content}
        />
        <div className="flex float-end mt-4 pb-4">
          <Pagination
            defaultCurrent={currentPage}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
      <Modal
        title={isupDate === true ? "Update connection" : "Add connection"}
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[18, 18]}>
            <Col span={24}>
              <label className="text-sm block" htmlFor="">
                Image
              </label>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, ...filed } }) => {
                  return (
                    <Upload
                      beforeUpload={() => {
                        return false;
                      }}
                      {...filed}
                      showUploadList={false}
                      multiple={false}
                      onChange={({ file }) => onChange(file)}
                    >
                      <Button icon={<UploadOutlined />}>Upload hình</Button>
                    </Upload>
                  );
                }}
              />
              {imageAvatar && (
                <div className="mt-2">
                  <img
                    src={
                      typeof imageAvatar === "string"
                        ? imageAvatar
                        : previewImage(imageAvatar)
                    }
                    className="w-[100px] h-[100px] object-cover rounded"
                  />
                  <span
                    className="inline-block ml-3 cursor-pointer"
                    onClick={() => setValue("image", undefined)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              )}
            </Col>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Full Name
              </label>
              <Controller
                name="desc"
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

            <Col span={24} className="text-end">
              <Button htmlType="submit" size="large" type="primary">
                {isupDate === true ? "Cập Nhật" : "Thêm Mới"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
