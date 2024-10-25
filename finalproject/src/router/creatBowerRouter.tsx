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
import AdminCategory from "../modules/admintemplates/admincategory";
import Carts from "../modules/hometemplates/Carts";
import ConnectionDetail from "../modules/hometemplates/AllConection/ConnectionDetail";

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
        {path:"/login",element:<Signin/>},
        {path:"/sign-up",element:<SignUp/>},
        {path:"/cart",element:<Carts/>},
        {path:"/allconection/:id",element:<ConnectionDetail/>}
      ]
    },
    {
      path:"/admin",
      element:<AdminLayout/>,
      children:[
        {path:"/admin/user",element:<AdminUser/>},
        {path:"/admin/product-in-cart",element:<AdminChart/>},
        {path:"/admin/product",element:<AdminProduct/>},
        {path:"/admin/category",element:<AdminCategory/>}
      ]
    }
    
  ]);