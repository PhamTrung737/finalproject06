
import { Col } from "antd"
import { Link } from "react-router-dom"
import { CategoryItems, ContactItems } from "../../../types/type"


const listContact :CategoryItems[]=[
    {key:0,name:"Menu",detail:[
        {key:1,value:"Azur Lane",href:""},
        {key:2,value:"Arknights",href:""},
        {key:3,value:"Mahjong Soul",href:""},
        {key:4,value:"All Products",href:""},
        {key:5,value:"All Collections",href:""},
        {key:6,value:"Announcement",href:""},
    ]},
    {key:7,name:"Follow Us",detail:[
        {key:8,value:"Twitter",href:""}
    ]},
    {key:9,name:"Contact Us",detail:[
        {key:10,value:"store.cs@yostar.app",href:""},
        {key:11,value:"About Us",href:""}
    ]},
    {key:12,name:"Policy",detail:[
        {key:13,value:"Terms & Conditions",href:""},
        {key:14,value:"Shipping Policy",href:""},
        {key:15,value:"Exchange and Return",href:""},
        {key:16,value:"VAT Policy",href:""}
    ]},
]



export const handelContact = ()=>{
    return listContact.map((item:CategoryItems)=>{
        return (
            <Col span={4} key={item.key}>
                <h3 className="font-bold text-lg mb-3">{item.name}</h3>
                <ul>
                    {item.detail.map((element:ContactItems)=>{
                        return (
                            <li className="mb-3 text-md font-[450]" key={element.key}>
                                <Link to={element.href}>{element.value}</Link>
                            </li>
                        )
                    })}
                </ul>
            </Col>
        )
    })
}

