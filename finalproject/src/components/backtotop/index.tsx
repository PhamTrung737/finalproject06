import { UpOutlined } from "@ant-design/icons";
import { useWindowScroll } from "@uidotdev/usehooks";

export default function BackToTop() {
    const [{  y }, scrollTo] = useWindowScroll();
   
  return (
    <>
      {y&&y>100&&(
        <button className="backtotop" onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}><UpOutlined /></button>
      )}
    </>
  )
}
