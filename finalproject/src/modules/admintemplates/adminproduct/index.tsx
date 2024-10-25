
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
    Tag,
  } from "antd";
   
  import { useState } from "react";
  
  import { Controller, useForm } from "react-hook-form";
  
  
  
  export default function AdminProduct() {
    
   
    const {handleSubmit,control,setValue,reset}=useForm({
      defaultValues: {
        taiKhoan:        "",
        hoTen:           "",
        email:           "",
        soDt:            "",
        maNhom:         "GP01",
        maLoaiNguoiDung: "",
        matKhau: "",
      },
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [isupDate,setIsUpdate]=useState(false);
   
    const [isOpenModal, setIsOpenModal] = useState(false);
  
  
    
    const columns = [
      {
        title: "Avatar",
        dataIndex: "taiKhoan",
      },
      {
        title: "Name",
        dataIndex: "hoTen",
      },
      {
        title: "Price",
        dataIndex: "email",
      },
      {
        title: "Mô tả",
        dataIndex: "soDt",
      },
     
      {
        title: "Thao tác",
        key: "action",
        render: (_: any, record: any) => (
          <Space size="middle">
            <Popconfirm
              title="Xoá người dùng"
              description="Bạn có chắc chắn sẽ xoá người dùng này?"
             
              okText={<span>OK</span>}
              cancelText="Huỷ"
            >
              <Button danger>Xoá</Button>
            </Popconfirm>
            <Button type="default"
            onClick={()=>{
              setIsOpenModal(true);
              setIsUpdate(true);
              setValue("taiKhoan",record.taiKhoan);
              setValue("matKhau",record.matKhau);
              setValue("hoTen",record.hoTen);
              setValue("email",record.email);
              setValue("soDt",record.soDt);
              setValue("maLoaiNguoiDung",record.maLoaiNguoiDung)
            }}
            >Cập nhật</Button>
          </Space>
        ),
      },
    ];
    
    
    
    const onSubmit=(formValues: any)=>{
      const formData={
        taiKhoan: formValues.taiKhoan,
        matKhau: formValues.matKhau,
        email: formValues.email,
        soDt: formValues.soDt,
        maNhom: "GP01",
        maLoaiNguoiDung: formValues.maLoaiNguoiDung,
        hoTen: formValues.hoTen
      }
   
    };
  
    
    return (
      <>
        <div className="flex items-center justify-between">
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
          <Button type="primary" size="large"
          onClick={()=>{
            setIsOpenModal(true);
            reset();
            setIsUpdate(false);
          }}
          >
            Thêm
          </Button>
        </div>
        <div className="mt-4 text-2xl">
          <h4>Danh sách người dùng</h4>
          <Table
            className="mt-2"
            columns={columns}
            rowKey={"taiKhoan"}
           
            pagination={false}
            
          />
          <div className="flex float-end mt-4 pb-4">
            <Pagination defaultCurrent={currentPage}  
            onChange={(page:number)=>{setCurrentPage(page)}}
            />
          </div>
        </div>
        <Modal
        title={isupDate===true? 'Update User' : 'Add User'}
        centered
        open={isOpenModal}
        onCancel={()=>setIsOpenModal(false)}
        footer={false}
        >
          <Form className="mt-4" onFinish={handleSubmit(onSubmit)} >
            <Row  gutter={[18, 18]}>
              
              <Col span={24}>
              <label className="text-sm" htmlFor="">
                  Full Name
                </label>
                <Controller
                  name="hoTen"
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
              <label className="text-sm" htmlFor="">
                  Password
                </label>
                <Controller
                  name="matKhau"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      className="mt-1"
                      placeholder="password..."
                      {...field}
                    />
                  )}
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
                      {...field}
                    />
                  )}
                />
              </Col>
              
              
              <Col span={24} className="text-end">
                <Button
                 
                  htmlType="submit"
                  size="large"
                  type="primary"
                >
                  {isupDate===true?"Cập Nhật":"Thêm Mới"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>
  
      </>
      
    );
  }