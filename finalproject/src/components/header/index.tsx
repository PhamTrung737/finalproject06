import { SearchOutlined } from "@ant-design/icons";
import { Row, Spin } from "antd";
import { Link } from "react-router-dom";
import { handelNavBar, productPersonStore } from "./Root";
import Search from "./Search";
import { useQuery } from "@tanstack/react-query";

import { useLocalStorage } from "@uidotdev/usehooks";
import IconUser from "./loginuser/IconUser";
import { iconUser, ProductCarts, UserLogin } from "../../types/type";

import { getLogoHome } from "../../apis/callapiimage";

export default function Header() {
  const found = productPersonStore((state) => state.found);
  const setFound = productPersonStore((state) => state.setFoundModal);
  const [user,setUser] = useLocalStorage<UserLogin|null>("user",null);
  const {data,isError,isLoading} = useQuery({queryKey:["logo-home"],queryFn:getLogoHome,retry:3,retryDelay:5000})
  const [drawing] = useLocalStorage<ProductCarts[]|null>("carts", null);
  if(data?.data.statusCode===401){
    setUser(null)
  }

  if(isError||isLoading) return <Spin className="container mx-auto"/>
  return (
    <div>
      <div className="py-3 bg-[#ffe656]">
        <Link to={"/announcement"} className="flex items-center justify-center">
          <span className="mr-3 font-[500] text-sm">Announcement </span>
          <svg
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden="true"
            focusable="false"
            role="presentation"
            style={{ width: "1.25rem" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
        
      </div>
      <div className="container mx-auto">
        {!found && (
          <div>
            <div className="flex justify-between items-center py-7">
              <div>
                <button
                  onClick={() => {
                    setFound(true);
                  }}
                >
                  <SearchOutlined style={{ fontSize: "23px" }} />
                </button>
              </div>
              <Link to={"/"}>
              <img
                width={250}
                src={data?.data.content}
                alt="logo"
              />
              </Link>
              <div className="flex items-center gap-3">
                {user?(<IconUser/>):(
                  <Link to={"/login/home"}>
                  {iconUser()}
                </Link>
                )}
                <Link to={"/cart"} className="header__carts">
                  <svg
                    style={{ width: "3.25rem" }}
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <span>{drawing?.length ? drawing.length:0}</span>
                </Link>
                
              </div>
            </div>
            <Row className="justify-center gap-5">{handelNavBar()}</Row>
          </div>
        )}
        {found && <Search />}
      </div>
    </div>
  );
}
