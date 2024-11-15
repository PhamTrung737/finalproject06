import { useLocalStorage } from '@uidotdev/usehooks';
import { Col, Input, notification, Pagination, PaginationProps, Rate, Row, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import { iconUser, NotificationType, UserLogin } from '../../../../types/type';
import { addCommentByIdUser, FormDataComment, getLitsCommentByIdProduct } from '../../../../apis/callapicoment';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { renderCommentItems } from './CommentItems';
type Props = {
  idProduct:number
}

export default function Comment(props:Props) {
    const [value,setValue] = useState<number>(0);
    const [user] = useLocalStorage<UserLogin>("user")
    const { TextArea } = Input;
    const [comment , setComment] = useState<string>("")
    const [api, contextHolder] = notification.useNotification();
    
    const queryClient = useQueryClient();
    const [pageNumber, setPageNumber] = useState<number>(1);
  const onChangePage: PaginationProps["onChange"] = (pageNumber) => {
    setPageNumber(+pageNumber);
  };
 
  const { data, isError, isPending } = useQuery({
    queryKey: [`comment-detail-${props.idProduct}`],
    queryFn: () => getLitsCommentByIdProduct(props.idProduct),
  });
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     
      setComment(e.target.value)
    };

    const {mutate:addComment} = useMutation({
      mutationKey:[`comment-${props.idProduct}`],
      mutationFn:(param:FormDataComment)=>{
        return addCommentByIdUser(param);
      },
      retry:3,
      retryDelay:5000,
      onSuccess:(data)=>{
         if(data.data.statusCode===200){
          queryClient.invalidateQueries({queryKey:[`comment-detail-${props.idProduct}`]})
          openNotificationWithIcon("success","comment successfully");
          setComment("");
          setValue(0);
         }else{
          openNotificationWithIcon("error",data.data.content)
         }
      },
      onError:(error)=>{
         openNotificationWithIcon("error",error.message)
      }
    })
    const handelComment = () => {
      if(isError|| isPending){
        return <Spin className='container mx-auto'/>
      }else{
        const newList = [...data?.data.content].reverse();
        if(newList&& newList.length<4){
           return renderCommentItems(newList);
        }else{
           return renderCommentItems(newList.slice((pageNumber-1)*4,(pageNumber-1)*4+4))
        }
        
      }
    };
      
  return (
   <div>
     <form className="DetailComment__formre">
      {contextHolder}
    <Row className="justify-between items-center">
      <Col xs={24} sm={8} className="mb-3">
      {user && (
        <div className="flex items-center">
       
        {user.avatar ? (
          <img className='logo-avatar' src={user.avatar} alt="avatar" />
        ):(
          <div className='logo-avatar'>
            {iconUser()}
          </div>
        )}
        
        <span className="font-bold text-lg pl-3">
            {user.nameUser}
            </span>
      </div>
      )}
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
     
     const formData :FormDataComment = new FormData()
     formData.append("content",comment)
     formData.append("idUser",user.id)
     formData.append("idProduct",props.idProduct)
     formData.append("evaluate",value)
     formData.append("createDay",dayjs().format("YYYY-MM-DD HH:mm:ss"));
     addComment(formData)
     
    }} type="submit" className="btn DetailComment__buttonasb">
     <i data-visualcompletion="css-img" className="x1b0d499 xi3auck" style={{backgroundImage: 'url("https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/1HG5L7xfiLP.png?_nc_eui2=AeFltjGKF6ea2RXGdMFyp7xUudzagti6q4a53NqC2Lqrhtjdh79_5VLOuaeg81vDo_iUFmlvQ7_ZuRXFVP8Pf37p")', backgroundPosition: '0px -381px', backgroundSize: '25px 544px', width: 16, height: 16, backgroundRepeat: 'no-repeat', display: 'inline-block'}} />



    </button>
  </form>
    <div>
    {handelComment()}
      {data&& data?.data.content.length > 4 && (
        <Pagination
          defaultCurrent={1}
          total={data?.data.content.length %4 >0 ? (Math.floor(data.data.content.length/4)+1)*10:Math.floor(data.data.content.length/4)*10}
          onChange={onChangePage}
        />
      )}
    </div>
   </div>
  )
}
