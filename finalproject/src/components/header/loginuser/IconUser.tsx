import { useLocalStorage } from "@uidotdev/usehooks"
import { Roles, UserLogin } from "../../../types/type";
import { Button, Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";

export default function IconUser() {
    const [user,setUser] = useLocalStorage<UserLogin|null>("user",null)
    
    const checkRoleUser = ():MenuProps['items']=>{
         const litsRole:Roles[] = user ? user.listRoles : [];
         let found = false;
        litsRole.forEach((item:Roles)=>{
            if(item.roles === "ROLE_ADMIN"){
                found = true;
                
            }
        })

        const items: MenuProps['items'] = found ? [
            {
                key: '1',
                label: (
                  <Link to={"/profile"}>Profile</Link>
                ),
              },
              {
                key: '2',
                label: (
                  <Link to={"/"} onClick={()=>{setUser(null)}}>Log out</Link>
                ),
              },
              {
                key:"3",
                label:(
                    <Link to={"/admin/user"}>Admin page</Link>
                )
              }
        ]:[
            {
                key: '1',
                label: (
                  <Link to={"/profile"}>Profile</Link>
                ),
              },
              {
                key: '2',
                label: (
                  <Link to={"/"} onClick={()=>{setUser(null)}}>Log out</Link>
                ),
              }
        ]

        return items;
        
    }
    const items :MenuProps['items'] = checkRoleUser();
   
  return (
    <div className="flex items-center gap-1">
        {user?.avatar ? (
          <div>
            <img className="logo-avatar" src={user.avatar} alt="avatar" />
          </div>
        ):(
             <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    style={{ width: "1.5rem" }}
                    fill="none"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
                      fill="currentColor"
                    ></path>
                  </svg>
        )}
       
        <Dropdown menu={{items}} placement="bottomLeft" arrow>
        <Button>{user?.nameUser}</Button>
      </Dropdown>
    </div>
  )
}
