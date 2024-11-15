

import  { useState } from 'react'
import {AiChat} from '@nlux/react';
import {useChatAdapter} from '@nlux/langchain-react';

import {  Popover } from 'antd';
import '@nlux/themes/nova.css';
export default function ChatBox() {
    
    const [open, setOpen] = useState<boolean>(false);

  

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
    const gptAdapter = useChatAdapter({
        url: 'https://pynlux.api.nlkit.com/pirate-speak'
    });
    
    const handelModal = ()=>{
        return (
            <div className='w-[300px] h-[400px]'>
            <AiChat
                  adapter={gptAdapter}
                  composerOptions={{
                      placeholder: 'How can I help you today?'
                  }}
                  conversationOptions={{
                      historyPayloadSize: 'max'
                  }}
              />
             
            </div>
        )
    }
  return (
    <div>
      
  <Popover
      
      title={handelModal}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <button className='w-[50px] h-[50px]  bg-[#03DAC5] flex justify-center items-center rounded-[20px]  z-10' style={{position:"fixed",bottom:"30px",right:"50px",border:"1px solid #2e2a39bf"}}>
      <img width={30} src="./img/boxchat.png" alt="boxchat" />
      </button>
    </Popover>
      
    </div>
  )
}