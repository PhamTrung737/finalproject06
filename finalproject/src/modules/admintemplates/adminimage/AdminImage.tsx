import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Col, Form, Input, Modal, notification, Popconfirm, Row, Space, Table, TableProps, Tag, Upload } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NotificationType } from "../../../types/type";
import { addImageBanner, addImageProduct, deleteImageById, FormDataAddImageBanner, FormDataAddImageProduct, getListImage } from "../../../apis/callapiimage";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";



interface DataType {
   id:number,
   image:string,
   type:string
  }

export default function AdminImage() {

  const {setValue,handleSubmit,control,reset,watch} = useForm({
    defaultValues:{
     
      image:undefined,
      
      idProduct:0
    }
  })
  const [isOpenModal , setIsOpenModal] = useState<boolean>(false);
  const [typeOption ,setTypeOption] = useState<number>(0);
 
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
  
  const {data} = useQuery({
    queryKey:["list-image"],
    queryFn:getListImage
  })
  
  const {mutate:deleteImage} = useMutation({
    mutationKey:['delete-image'],
    mutationFn:(id:number)=>{return deleteImageById(id)},
    onSuccess(data) {
      if(data.data.statusCode===200){
        openNotificationWithIcon("success","Delete image success"),
        queryClient.invalidateQueries({queryKey:["list-image"]})
      }else{
        openNotificationWithIcon("error",data.data.content)
      }
    },
    onError:(error)=>{
       openNotificationWithIcon("error",error.message)
    }
  })
   
  const {mutate:addImage} = useMutation({
    mutationKey:["add-image"],
    mutationFn:(param:any)=>{
       if(typeOption===1){
        return addImageBanner(param)
       }else{
        return addImageProduct(param)
       }
    },
    onSuccess(data) {
      if(data.data.statusCode===200){
        openNotificationWithIcon("success","Add image success"),
        queryClient.invalidateQueries({queryKey:["list-image"]})
        setIsOpenModal(false)
      }else{
        openNotificationWithIcon("error",data.data.content)
      }
    },
    onError:(error)=>{
      openNotificationWithIcon("error",error.message)
    }
  })
   const imageAvatar = watch("image");
  
  const previewImage = (file: File) => {
    return URL.createObjectURL(file);
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render:(image)=>{
         return <img src={image} width={100} alt="..." />
      }
    },
    {
      title: "Category",
      dataIndex: 'type',
      key: 'type',
      render:(type)=>{
        
        if(type === "BANNER"){
           return <Tag color="processing">{type}</Tag>
        }else if(type==="LOGO"){
          return <Tag color="success">{type}</Tag>
        }
        return <p>{type}</p>
      }
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete image"
            description="Are you sure you want to delete this image?"
            okText={<span>OK</span>}
            cancelText="cancel"
            onConfirm={()=>{
              deleteImage(record.id)
            }}
          >
            <Button danger >Xoá</Button>
          </Popconfirm>
         
        </Space>
      ),
    },
  ];
  
  
  const onSubmit = (formValues: any) => {
    const formDataBanner : FormDataAddImageBanner = new FormData()
    formDataBanner.append("image",formValues.image)
    const formDataProduct :FormDataAddImageProduct = new FormData()
    formDataProduct.append("image",formValues.image);
    formDataProduct.append("idProduct",formValues.idProduct)
    
    if(typeOption===1){
        addImage(formDataBanner)
    }
    if(typeOption===2){
      addImage(formDataProduct)
    }
    
    
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
            title: "Quản lý hình ảnh",
          },
        ]}
      />
       <Button type="primary" size="large"
          onClick={()=>{
            setIsOpenModal(true);
            reset();
          
          }}
          >
            Add
          </Button>
    </div>
    <div className="mt-4 text-2xl">
      <h4>Danh sách hình ảnh</h4>
      <Table
        className="mt-2"
        columns={columns}
        dataSource={data?.data.content}
       
      />
     
    </div>
    <Modal
      title={"Add image"}
      centered
      open={isOpenModal}
      onCancel={() => setIsOpenModal(false)}
      footer={false}
    >
      <Form className="mt-4" onFinish={handleSubmit(onSubmit)} >
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
                Role
              </label>
              <select 
              onChange={(e)=>{setTypeOption(+e.target.value)}}
                      style={{ display: "block" }}
                      className="admin-user-select-roles"
                    >
                     <option value={1}>BANNER</option>
                     <option value={2}>PRODUCT</option>
                    </select>
            </Col>
            {typeOption===2&&(
                 <Col span={24}>
                 <label className="text-sm block" htmlFor="">
                    Product
                   </label>
                 <Controller
                 name="idProduct"
                 control={control}
                 render={({ field }) => {
                  return (
                    <Input
                      size="large"
                      type="number"
                      className="mt-1"
                      placeholder="id product ..."
                      {...field}
                    />
                  );
                }}
                 
                 />
     
                
                 </Col>
            )}
          

          <Col span={24} className="text-end">
            <Button htmlType="submit" size="large" type="primary">
              {"Add Image"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  </>
  )
}
