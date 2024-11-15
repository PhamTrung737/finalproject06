import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  Tag,

  notification,
  PopconfirmProps,
} from "antd";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import {
  deleteUserById,
  FormDataUpdatUser,
  getListUser,
  updateUserById,
} from "../../../apis/callapiuser";
import { iconUser, NotificationType } from "../../../types/type";

import { getListRoles } from "../../../apis/callapiroles";

type Roles = {
  id: number;
  roles: string;
};

export default function AdminUser() {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      id: 0,
      nameUser: "",
      email: "",
      roles: {
        id: 0,
        roles: "",
      },
      avatar: undefined,
    },
  });
  

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
    queryKey: ["get-list-user-admin"],
    queryFn: getListUser,
  });
  const listRoles = useQuery({
    queryKey: ["list-role"],
    queryFn: getListRoles,
  });

  const { mutate: upDateUser } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (param: FormDataUpdatUser) => {
      return updateUserById(param);
    },
    onSuccess(data) {
      if (data.data.statusCode === 200) {
        openNotificationWithIcon("success", data.data.content);
        queryClient.invalidateQueries({ queryKey: ["get-list-user-admin"] });
        setIsOpenModal(false);
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError(error) {
      openNotificationWithIcon("error", error.message);
    }
  });

  const {mutate:deleteUser} = useMutation({
    mutationKey:["delete-user"],
    mutationFn:(id:number)=>{return deleteUserById(id)},
    onSuccess:(data)=>{
        if(data.data.statusCode===200){
          openNotificationWithIcon("success","Delete user success")
          queryClient.invalidateQueries({ queryKey: ["get-list-user-admin"] });
        }else{
          openNotificationWithIcon("error",data.data.content)
        }
    },
    onError:(error)=>{
      openNotificationWithIcon("error",error.message)
    }
  })

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    if(e){
      deleteUser(Number(e))
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar: string) => {
        return avatar ? (
          <img src={avatar} alt="avatar" className="logo-avatar" />
        ) : (
          iconUser()
        );
      },
    },
    {
      title: "Name",
      dataIndex: "nameUser",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "roles",
      render: (roles: { id: number; roles: string }) => {
        return roles.roles === "ROLE_USER" ? (
          <Tag color="default">Khách hàng</Tag>
        ) : (
          <Tag color="success">Quản Trị</Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user?"
            okText={<span>OK</span>}
            cancelText="Cancel"
            onConfirm={()=>{confirm(record.id)}}
          >
            <Button danger >Delete</Button>
          </Popconfirm>
          <Button
            type="default"
            onClick={() => {
              setIsOpenModal(true);
              setValue("avatar", record.avatar);
              setValue("id", record.id);
              setValue("nameUser", record.nameUser);
              setValue("email", record.email);
              setValue("roles", record.roles);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const onSubmit = (formValues: any) => {
    const formData: FormDataUpdatUser = new FormData();
    formData.append("id", formValues.id),
      formData.append("fullName", formValues.nameUser);
    formData.append("idRole", formValues.roles.id);
    upDateUser(formData) 

  };

  return (
    <>
      <div className="flex items-center justify-between">
        {contextHolder}
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
              path: "/admin",
            },
            {
              title: "Quản lý người dùng",
            },
          ]}
        />
      </div>
      <div className="mt-4 text-2xl">
        <h4>Danh sách người dùng</h4>
        <Table
          className="mt-2"
          columns={columns}
          dataSource={data?.data.content}
         
        />
       
      </div>
      <Modal
        title={"Update user"}
        centered
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={false}
      >
        <Form className="mt-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[18, 18]}>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Full name
              </label>
              <Controller
                name="nameUser"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      className="mt-1"
                      placeholder="full name ..."
                      {...field}
                    />
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    size="large"
                    className="mt-1"
                    placeholder="Email"
                    disabled={field.value ? true : false}
                    {...field}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <label className="text-sm" htmlFor="">
                Role
              </label>
              <Controller
                name="roles"
                control={control}
                render={({ field }) => {
                  return (
                    <select
                      style={{ display: "block" }}
                      className="admin-user-select-roles"
                    >
                      {listRoles.data?.data.content.map((items: Roles) => {
                        return (
                          <option
                            value={items.id}
                            selected={
                              items.id === field.value.id ? true : false
                            }
                          >
                            {items.roles}
                          </option>
                        );
                      })}
                    </select>
                  );
                }}
              />
            </Col>
            

            <Col span={24} className="text-end">
              <Button htmlType="submit" size="large" type="primary">
                Update user
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
