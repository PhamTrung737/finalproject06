import { Button, Card, Checkbox, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { singUp } from "../../../apis/callapiauthen";
import { NotificationType } from "../../../types/type";

type InputSignUP = {
  agreement:boolean,
  confirm:string,
  email:string,
  fullname:string,
  password:string
}

export default function SignUp() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType,message:string) => {
      api[type]({
        message: message,
        
      });
    };
    const {mutate:registerAccount} = useMutation({mutationKey:["sign-up"],
      mutationFn:(user:any)=>{return singUp(user)},
      onSuccess:(data)=>{
          if(data.data.statusCode===200){
             navigate("/login/home")
          }else{
            openNotificationWithIcon("error",data.data.content)
          }
      },
      onError(error) {
        openNotificationWithIcon("error",error.message)
      },

    })
    const onFinish = (values: InputSignUP) => {
       const user = new FormData();
       user.append("fullName",values.fullname);
       user.append("email",values.email);
       user.append("password",values.password);
       registerAccount(user)
    };
  return (
    <div className="flex flex-col justify-center items-center py-20">
       {contextHolder}
      <Card style={{ width: "400px" }}>
        <h2 className="font-[500] text-2xl mb-3">Create account</h2>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
             <span className='font-[500]'>Fullname</span>
          <Form.Item
            name="fullname"
            className='mb-3'
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <span className='font-[500]'>Email</span>
          <Form.Item
            name="email"
              className='mb-3'
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
            
          </Form.Item>
          <span className='font-[500]'>Password</span>
          <Form.Item
        name="password"
       
        rules={[
          {
            required: true,
            message: "Please input your password!",
            min:6,
            max:52
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <span className='font-[500]'>Confirm password</span>
      <Form.Item
        name="confirm"
       
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
            min:6,
            max:52,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


          <Form.Item
            name="agreement"
            className="mb-3"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
          <Button className='w-full bg-[#ffd814]'  htmlType="submit">
          Sign up
        </Button>
          </Form.Item>
        </Form>
       
        
        <p className="mt-5">Already have an account? <Link to={"/login/home"} className="font-[500]">Sign in</Link></p>
      </Card>
    </div>
  )
}
