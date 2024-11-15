export type Param ={
    type?:string,
    page:number,
    pageSize:number,
    id?:number
}

export type ItemBanner = {
    id:number,
    image:string
  }

export type ItemSelectMoney = {
    id:number,
    money:string;
  }

 export type ContactItems = {
    key:number,
    value:string,
    href:string
}
export type CategoryItems = {
    key:number,
    name:string,
    detail:ContactItems[],
}
export type SelectMoney = {
    key:number,
    value:string
}

export type NavBarHeader = {
    key:number,
    name:string,
    href:string
}
export type State = {
    found:boolean
}
export type Action = {
    setFoundModal:(found:State["found"])=>void;
}

export type ListProduct = {
    content:string,
    id:number,
    image:string,
    imageHover:string,
    price:number
  }

  export type PropsDataProduct = {
    page:number,
    totalProduct:number,
    listProduct:ListProduct[]
  }
export  type ProductProps={
    data:PropsDataProduct,
    getPage:(page:number)=>void;
  }

export type ConnectionItem = {
    id:number,
    image:string,
    desc:string
}

export interface DataType {
    key: number;
    product: {
      id: number;
      image: string;
      content: string;
      price: number;
    };
    quantity: {
      quantity: number;
      index: number;
    };
    total: number;
  }

export type ImageItem={
    id:number,
    image:string
}



export type UserSignIn = {
    email:string,
    password:string,
}

 export type Roles = {
  id:number;
  roles:string;
}
export type UserLogin = {
  id:number,
  nameUser:string;
  token:string;
  avatar:string;
  email:string,
  listRoles:Roles[];
}

export type ProductCarts = ListProduct&{
  quantity:number
}


export type UserSignUp = {
    fullname:string,
    email:string,
    password:string
}

export type NotificationType = 'success'  | 'error';

export const iconUser = ()=>{
  return (
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
  )
}

export type ApiError = {
  response?: {
     data?: {
        message?: string;
     };
     status?: number;
  };
  message?: string;
};


export const  isApiError=(error: unknown): error is ApiError=> {
  return (
     typeof error === "object" &&
     error !== null &&
     'response' in error 
     
  );
}