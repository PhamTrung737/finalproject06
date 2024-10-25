import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import BackToTop from "../../components/backtotop";
import ChatBox from "../../components/chatai";



export default function HomePages() {
  return (
    <>
    <Header/>
    <Outlet/>
    <BackToTop/>
    <ChatBox/>
    <Footer/>
    </>
  )
}
