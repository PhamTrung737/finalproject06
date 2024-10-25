import  { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getImageLogo } from "../../apis/callapilogo";


const { Header, Sider, Content } = Layout;

export default function AdminLayout() {

 

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

   const {data,isLoading,isError} = useQuery({queryKey:["logo"],queryFn:getImageLogo});
   

  const items = [
    {
      key: "1",
      label: <span> Cài đặt tài khoản </span>,
    },
    {
      key: "2",
      label: <span>Đăng xuất</span>,
    },
  ];

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {!isLoading&&!isError&&(
          <Link to={"/admin"} className="flex justify-center">
          <img className="rounded-[50%]" src={data?.data.content} alt="logo" width={70} />
        </Link>
        )}
        <Menu
          theme="dark"
          mode="inline"
          className="pt-1"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/admin/user",
              icon: <UserOutlined />,
              label: "Quản lý người dùng",
            },
            {
              key: "/admin/product",
              icon: <UploadOutlined />,
              label: "Quản lý sản phẩm",
            },
            {
              key: "/admin/category",
              icon: <SettingOutlined />,
              label: "Quản lý category",
            },
            {
                key:"/admin/product-in-cart",
                icon:<AreaChartOutlined />,
                label:"chart "
            },
            
          ]}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex items-center justify-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="h-[64px] w-[64px]"
            />
            <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
              <div className="pr-4">
                <Avatar
                  size={"large"}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}