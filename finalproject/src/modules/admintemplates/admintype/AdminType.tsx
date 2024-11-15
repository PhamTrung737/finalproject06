import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Row,
  Space,
  Table,
  TableProps,
} from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NotificationType } from "../../../types/type";
import {
  addType,
  deleteType,
  FormAddType,
  FormUpdateType,
  getListType,
  updateType,
} from "../../../apis/callapitype";

interface DataType {
  id: number;
  name: string;
}
export default function AdminType() {
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      id: 0,
      name: "",
    },
  });

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
    queryKey: ["list-type"],
    queryFn: getListType,
  });
  const { mutate: addTypeAdmin } = useMutation({
    mutationKey: ["add-type"],
    mutationFn: (param: FormAddType) => addType(param),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "Add type success");
        queryClient.invalidateQueries({ queryKey: ["list-type"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });

  const { mutate: updateTypeAdmin } = useMutation({
    mutationKey: ["add-type"],
    mutationFn: (param: FormUpdateType) => updateType(param),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "update type success");
        queryClient.invalidateQueries({ queryKey: ["list-type"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });

  const { mutate: deleteTypeAdmin } = useMutation({
    mutationKey: ["add-type"],
    mutationFn: (id: number) => deleteType(id),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", "delete type success");
        queryClient.invalidateQueries({ queryKey: ["list-type"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
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
              deleteTypeAdmin(record.id);
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
              setValue("name", record.name);
              setValue("id", record.id);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const onSubmit = (formValues: any) => {
    const formData: FormAddType = new FormData();
    formData.append("desc", formValues.name);
    const formDataUpdate: FormUpdateType = new FormData();
    formDataUpdate.append("desc", formValues.name);
    formDataUpdate.append("id", formValues.id);
    if (!isupDate) {
      addTypeAdmin(formData);
    } else {
      updateTypeAdmin(formDataUpdate);
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
              title: "Quản lý type",
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
        <h4>Danh sách type</h4>
        <Table
          className="mt-2"
          columns={columns}
          dataSource={data?.data.content}
        />
      </div>
      <Modal
        title={isupDate === true ? "Update type" : "Add type"}
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[18, 18]}>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Name
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

            <Col span={24} className="text-end">
              <Button htmlType="submit" size="large" type="primary">
                {isupDate === true ? "Update type" : "Add type"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
