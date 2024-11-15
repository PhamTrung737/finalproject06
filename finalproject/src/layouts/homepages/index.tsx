import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";

import ChatBox from "../../components/chatai";
import { useWindowScroll } from "@uidotdev/usehooks";
import { UpOutlined } from "@ant-design/icons";

export default function HomePages() {
  const [{ y },scrollTo] = useWindowScroll();
  const rederBackToTop = ()=>{
    if(y){
      if(y>100){
        return (
          <button
          className="backtotop"
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
          <UpOutlined />
        </button>
        )
      }
    }
  }
  return (
    <>
      <Header />
      <Outlet />
      {rederBackToTop()}
      <ChatBox />
      <Footer />
    </>
  );
}
