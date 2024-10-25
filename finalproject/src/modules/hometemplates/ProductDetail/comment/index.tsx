import { Col, Input, Rate, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'

export default function Comment() {
    const [value,setValue] = useState(0);
    const { TextArea } = Input;
    const [comment , setComment] = useState("")
    const toDay  = dayjs().format("DD/MM/YYYY")
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     
      setComment(e.target.value)
    };
  return (
    <form className="DetailComment__formre">
      
    <Row className="justify-between items-center">
      <Col xs={24} sm={8} className="mb-3">
      <div className="flex items-center">
            {/* <img
              className="comment__logo"
              src={user?.avatar ? (user.avatar):(logouser)}
              alt="trump"
            /> */}
            <span className="font-bold text-lg pl-3">
                {/* {user?.name} */}DonalTrump
                </span>
          </div>
      </Col>
      <Col >
      <div>
     <span className="font-bold text-lg pr-3">Evaluate :</span>
     <Rate value={value} onChange={setValue}  />
     </div>
      </Col>
    </Row>
    <TextArea
    className="mt-3"
    value={comment}
    onChange={onChange}
    
    style={{ height: 120, resize: 'none' ,borderColor:"#62646a"}}
  />
    <button disabled={comment?false:true} onClick={(e)=>{e.preventDefault()
      const formData = {
        id:0,
        
        ngayBinhLuan:toDay,
        noiDung:comment,
        saoBinhLuan:value
  }
    
     setComment("");
     setValue(0);
    }} type="submit" className="btn DetailComment__buttonasb">
     <i data-visualcompletion="css-img" className="x1b0d499 xi3auck" style={{backgroundImage: 'url("https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/1HG5L7xfiLP.png?_nc_eui2=AeFltjGKF6ea2RXGdMFyp7xUudzagti6q4a53NqC2Lqrhtjdh79_5VLOuaeg81vDo_iUFmlvQ7_ZuRXFVP8Pf37p")', backgroundPosition: '0px -381px', backgroundSize: '25px 544px', width: 16, height: 16, backgroundRepeat: 'no-repeat', display: 'inline-block'}} />



    </button>
  </form>
  )
}
