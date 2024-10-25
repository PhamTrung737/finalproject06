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
export  type ProductProps={
    data:{
      page:number,
      totalProduct:number,
      listProduct:ListProduct[]
    },
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