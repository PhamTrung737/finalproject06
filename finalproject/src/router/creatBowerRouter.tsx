import { createBrowserRouter } from "react-router-dom";
import HomePages from "../layouts/homepages";
import HomeTemplates from "../modules/hometemplates/AzurLane";
import Arknights from "../modules/hometemplates/Arknights";
import MahjongSoul from "../modules/hometemplates/MahjongSoul";
import AllProduct from "../modules/hometemplates/AllProduct";
import AllConection from "../modules/hometemplates/AllConection";
import Announcement from "../modules/hometemplates/Announcement";
import AnnouncementPages from "../modules/hometemplates/Announcement/AnnouncementPages";
import ProductDetail from "../modules/hometemplates/ProductDetail";
import Signin from "../modules/authens/signin";
import SignUp from "../modules/authens/signup";
import AdminLayout from "../layouts/adminpages";
import AdminUser from "../modules/admintemplates/adminuser";
import AdminChart from "../modules/admintemplates/adminchart";
import AdminProduct from "../modules/admintemplates/adminproduct";
import Carts from "../modules/hometemplates/Carts";
import ConnectionDetail from "../modules/hometemplates/AllConection/ConnectionDetail";
import AdminImage from "../modules/admintemplates/adminimage/AdminImage";
import ProfileUser from "../modules/hometemplates/profile/ProfileUser";
import AdminConnection from "../modules/admintemplates/adminconnection";
import AdminType from "../modules/admintemplates/admintype/AdminType";
import AdminMaterial from "../modules/admintemplates/adminmaterial/AdminMaterial";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<HomePages/> ,
      children:[
        {path:"/",element:<HomeTemplates/>},
        {path:"/arknights",element:<Arknights/>},
        {path:"/sahjongsoul",element:<MahjongSoul/>},
        {path:"/allproduct",element:<AllProduct/>},
        {path:"/allconection",element:<AllConection/>},
        {path:"/announcement",element:<Announcement/>},
        {path:"/announcement/:id",element:<AnnouncementPages/>},
        {path:"/product-detail/:id",element:<ProductDetail/>},
        {path:"/login/:param",element:<Signin/>},
        {path:"/sign-up",element:<SignUp/>},
        {path:"/cart",element:<Carts/>},
        {path:"/allconection/:id",element:<ConnectionDetail/>},
        {path:"/profile",element:<ProfileUser/>}
      ]
    },
    {
      path:"/admin",
      element:<AdminLayout/>,
      children:[
        {path:"/admin/user",element:<AdminUser/>},
        {path:"/admin/product-in-cart",element:<AdminChart/>},
        {path:"/admin/product",element:<AdminProduct/>},
        {path:"/admin/connection",element:<AdminConnection/>},
        {path:"/admin/type",element:<AdminType/>},
        {path:"/admin/material",element:<AdminMaterial/>},
        {path:"/admin/image",element:<AdminImage/>}
      ]
    }
    
  ]);