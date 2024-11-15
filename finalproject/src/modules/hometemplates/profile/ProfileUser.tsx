import { useLocalStorage } from "@uidotdev/usehooks";
import { NotificationType, UserLogin } from "../../../types/type";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Row,
  Upload,
} from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  FormChangePass,
  FormDateUpdateAvatar,
  FormLogOutAll,
  logOutAllBrowser,
  ParamUpdatAvatar,
  updateAvatarByUserId,
} from "../../../apis/callapiuser";
import { useNavigate } from "react-router-dom";
import CartsByUserId from "./CartsByUserId";

type InputChangePass= {
  oldPass: string;
  password: string;
};
export default function ProfileUser() {
  const navigate = useNavigate();
  const [user,setUser] = useLocalStorage<UserLogin>("user");
  if(!user){
    navigate("/")
  }
 
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCheckModal, setIsCheckModal] = useState<number>(1);
  const [newPass,setNewPass] = useState<string>("");
  const { handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      avatar: undefined,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const options = [
    { label: "Yes", value: true },
    { label: "No", value: false },
    
  ];
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

 
  const { mutate: updateAvatar } = useMutation({
    mutationKey: ["update-avatar"],
    mutationFn: (param: ParamUpdatAvatar) => updateAvatarByUserId(param),
    onSuccess: (data) => {
      if (data.data.statusCode === 200) {
        const newUser = {...user}
        newUser.avatar = data.data.content
        setUser(newUser)
        openNotificationWithIcon("success", "Update avatar success");
        setIsOpenModal(false);
       
      } else {
        openNotificationWithIcon("error", data.data.content);
      }
    },
    onError: (error) => {
      openNotificationWithIcon("error", error.message);
    },
  });
  const {mutate:logOutAll} = useMutation({
    mutationKey:['log-out-all'],
    mutationFn:(pram:FormLogOutAll)=>{return logOutAllBrowser(pram)},
    onSuccess:(data)=>{
      if(data.data.statusCode===200){
        const newUser = {...user}
        newUser.token = data.data.content.token 
        setUser(newUser)
        openNotificationWithIcon("success","Success");
        
        
        setIsOpenModal(false)
      }else{
        openNotificationWithIcon("error",data.data.content)
      }
    },
    onError:(error)=>{
      openNotificationWithIcon("error",error.message)
    }
  })
  const {mutate:changePasswordUser} = useMutation({
    mutationKey:['change-pass'],
    mutationFn:(param:FormChangePass)=>{
      return changePassword(param)
    },
    onSuccess:(data)=>{
     
      if(data.data.statusCode===200){
       
        openNotificationWithIcon("success","Thay đổi thành công")
        setIsCheckModal(3)
      }else{
        openNotificationWithIcon("error",data.data.content)
      }
    },
    onError:(error)=>{
      openNotificationWithIcon("error",error.message)
    }
  })
  const imageAvatar = watch("avatar");

  const previewImage = (file: File) => {
    return URL.createObjectURL(file);
  };
  const onSubmit = (e: any) => {
    const formData: FormDateUpdateAvatar = new FormData();
    formData.append("file", e.avatar);
    const param: ParamUpdatAvatar = {
      idUsser: user.id,
      formData,
    };
    updateAvatar(param);
  };
  const onFinish = (values:InputChangePass)=>{
    const formData :FormChangePass = new FormData();
    formData.append("id",user.id)
    formData.append("email",user.email)
    formData.append("oldPass",values.oldPass)
    formData.append("newPass",values.password)
    changePasswordUser(formData)
    setNewPass(values.password)
    form.resetFields();

  }

  const renderTitle =():string=>{
    let title = "";
       if(isCheckModal===1){
        title= "Change Avatar"
       }else if(isCheckModal ===2){
        title= "Change Password"
       }
       return title;
  }
  const renderModal = ()=>{
      if(isCheckModal===1){
        return (
          <Form onFinish={handleSubmit(onSubmit)}>
          <Row>
            <Col span={24}>
              <label className="text-sm block" htmlFor="">
                Image
              </label>
              <Controller
                name="avatar"
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
                      <Button icon={<UploadOutlined />}>
                        Upload hình
                      </Button>
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
                    onClick={() => setValue("avatar", undefined)}
                  >
                    <DeleteOutlined />
                  </span>
                </div>
              )}
            </Col>

            <Col span={24} className="text-end">
              <Button htmlType="submit" size="large" type="primary">
                Update avatar
              </Button>
            </Col>
          </Row>
        </Form>
        )
      }else if(isCheckModal ===2){
        return (
          <Form
          form={form}
      name="register"
      onFinish={onFinish}
      
      scrollToFirstError
          >
            <Row>
            <Col span={24}>
                <label className="text-sm" htmlFor="">
                  Old Password
                </label>
                <Form.Item
                  name="oldPass"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                  
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={24}>
                <label className="text-sm" htmlFor="">
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                      min: 6,
                      max: 52,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={24}>
                <label className="text-sm" htmlFor="">
                  Confirm password
                </label>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                      min: 6,
                      max: 52,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={24} className="text-end">
                <Button htmlType="submit" size="large" type="primary">
                  Update password
                </Button>
              </Col>
            </Row>
          </Form>
        )
      }else{
        return (
         <Row>
          <Col span={24}>
          <span>Bạn có muốn đăng xuất tài khoản trên các thiết bị khác hay không </span>
          <Radio.Group
          onChange={(e)=>{
           
            if(e.target.value){
         
            const formData :FormLogOutAll =  new FormData();
            formData.append("id",user.id)
            formData.append("newPass",newPass)
            logOutAll(formData)
          }else{
            setIsOpenModal(false)
          }}}
          options={options}
          
          optionType="button"
          buttonStyle="solid"
        />
          </Col>
          
         </Row>
        )
      }
  }
  return (
    <div className="bg-white">
      {contextHolder}
      <Row className="container mx-auto py-5 my-10">
        <Col span={6} className="flex flex-col items-center gap-5">
          <img
            src={user?.avatar}
            alt="avatar"
            style={{
              width: 170,
              height: 170,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Button
            className="bg-[#ffa834] font-[500]"
            onClick={() => {
              setIsOpenModal(true);
              setIsCheckModal(1);
            }}
          >
            Change Avatar
          </Button>
          <Modal
            title={renderTitle()}
            centered
            open={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
            footer={false}
          >
            {renderModal()}
          </Modal>
          <p>
            <span className="font-[500]">Full name: </span>
            {user?.nameUser}
          </p>
          <p>
            <span className="font-[500]">Email: </span>
            {user?.email}
          </p>
          <Button
            className="bg-[#52c41a] font-[500]"
            onClick={() => {
              setIsOpenModal(true);
              setIsCheckModal(2);
            }}
          >
            Change Password
          </Button>
        </Col>
        <Col span={18}>
        <CartsByUserId/>
        </Col>
      </Row>
    </div>
  );
}
