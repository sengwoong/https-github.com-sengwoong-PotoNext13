"use client"




function getContainerStyle(Postion: boolean, highlight: boolean): string {

  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const PostionStyle = Postion 
  ? 'left-0'
  : 'right-0';

  return `${highlightStyle} ${PostionStyle}`;
}





import {  useContext, useEffect, useRef, useState } from "react";
import { Message } from "../../typings";
import { useUnderScrollerInChat } from '@/components/ChatList/useUnderScrollerInChat';
import { AuthUser } from "@/model/user";
import Avatar from "../LoginInput/Avatar";
import { usePathname } from "next/navigation";



type Props = {
  message: Message;
  user: AuthUser|undefined;
};

function Messagecomponents({ message ,user}: Props) {

  if (!user) {
    // 로그인으로 보내기
   return <div>로그인중</div>
  }
  const pathName = usePathname();


  console.log(pathName) //지금아이디

  const { image, username, name:SessionName, email } = user;

  //useState 에서 현재 보고있는 유저가 페스파람과 같은지 확인

  let isUser ;
  let isMe;
 
  const ParamUserId = pathName!.split('/')[2];
//   console.log(userId + "userId"); // "rje287573"
// console.log(message.userName   + "   "  +"message.userName"); // 닉네임
console.log()
//  user.filter((user)=>user.username === message.userName)
// console.log(name === username)

//로그인한유저랑 메세지보낸유저랑 같은지 확인
if (SessionName === message.nickName ) {
  isUser = true;
  
}else{
  isUser = false;
}
// 아이디와 닉네임이있는데 파람에 아이디가  메세지의 닉네임과 값과 같은지 확인 
if (ParamUserId === message.userName ) {
  isMe = true;
  
}else{
  isMe = false;
}







  const {counter } = useContext(useUnderScrollerInChat);




  const chatRef = useRef<null | HTMLDivElement>(null);

  //다른유저훅
  useEffect(() => {
    if (chatRef.current) {
      const chatContainer = chatRef.current.parentElement;
      
      // chatRef.current.parentElement; ref를 말함
      if (chatContainer) {
       // console.log(chatContainer.scrollTop+ (chatContainer.scrollTop/20),"scrollTop")
      //  console.log(chatContainer.scrollHeight , "scrollHeight")
        if (
         
          chatContainer.scrollTop+ (chatContainer.scrollTop/3)>chatContainer.scrollHeight||
          chatContainer.scrollTop === 0

          
        ) {
          chatRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

   
  }, [counter]);


  if (chatRef.current) {
    const chatContainer = chatRef.current.parentElement;


  if (chatContainer) {
  console.log(chatContainer.scrollTop+ (chatContainer.scrollTop/3))
  console.log(chatContainer.scrollHeight)
  }
}
  //나일떄훅
  // useEffect(() => {
  //   if (chatRef.current) {
  //     const chatContainer = chatRef.current.parentElement;
      
  //     // chatRef.current.parentElement; ref를 말함
  //     if (chatContainer) {
     
  //         chatRef.current.scrollIntoView({ behavior: "smooth" });
        
  //     }
  //   }
  // }, [counter]);
  

  
  

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault(); // 기본 동작을 막음
    event.stopPropagation(); // 이벤트 버블링을 중단시킴
  }
  

  return (
    
    <div
    onDragStart={handleDragStart} 
    className={`flex w-fit ${!isMe && "ml-auto"}`}
    ref={chatRef}
    >
      {/* //image, username, name, email */}


      <div className={`flex-shrink-0 ${!isMe &&  "order-2"}`}>


{/*         
        <Image
          className="rounded-full mx-2"
          height={10}
          width={50}
          src={message.profilePic}
          alt="profilePic"
        /> */}
{/* const { image, username, name, email } = user; */}
        

<Avatar image={message.profilePic} highlight size="medium"  ></Avatar>
      </div>

      <div>
        <p className="text-[0.65rem] px-[2px] pb-[2px]">
          {" "}
          {message.userName}
        </p>

        <div className="flex items-end">
        <div className={`px-3 py-2 rounded-lg w-fit text-white 
        
        ${isUser ?   "bg-blue-400":"bg-red-400"}`}>


            <p>{message.message}</p>
          </div>
          <p className="text-[0.3rem]">
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
   
    </div>
  );
}



export default Messagecomponents;
