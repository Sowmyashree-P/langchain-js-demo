import React, { useState } from 'react'
import { EmojiHappyIcon, XIcon } from '@heroicons/react/solid'

import styled from 'styled-components'


function Chat(props) {
    // props
    const bot = props.bot
    const messages = props.messages ? props.messages : []

    // sender & bot message card
    const MessageCard = (props) => {
        return props.sender ? <div className=" sender  flex  mr-1  mb-4 items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs sm:text-s max-w-xs  mx-2 items-start">
                <div><p className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">{props.message}</p></div>
            </div>
            <img src={props.url} alt="My profile" className="w-6 h-6 rounded-full " />
        </div>

            : <div className="bot  flex  mb-4 items-end mb-4 ">
                <img src={props.url} alt="My profile" className="w-6 h-6 rounded-full " />
                <div className="flex flex-col space-y-2 text-xs sm:text-s max-w-xs  mx-2 items-start">
                    <div><p className="px-4 py-2 rounded-lg   bg-gray-300 text-gray-600">{props.message}</p></div>
                </div>
            </div>
    }

    // Input Message Submit Handler
    const submitHandler = (value) => {
        if (value) {
            props.setMessages([{ message: value, url: "me.JPG", sender: true }, ...messages], value)
            value = null
        }
    }

    return (
        <Wrapper className="chat  flex flex-col flex-1 h-full  bg-gray-100">
            {/*  Bot Profile and Cancel Button  */}
            <div class="flex sm:items-center justify-between p-3  border-b-2 border-gray-200">
                <div class="flex items-center space-x-4">
                    <img src={bot.url} alt="" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                    <div class="flex flex-col  leading-tight">
                        <div class="text-xl sm:text-2xl mt-1 flex items-center">
                            <span class="text-gray-700 mr-3">{bot.name}</span>
                            <span class="text-green-500">
                                <svg width="10" height="10">
                                    <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                                </svg>
                            </span>
                        </div>
                        <span class="text-base text-gray-600">{bot.profile}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button type="button" class="inline-flex items-center mr-2 justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none" onClick={() => {
                        props.closeMessage()
                    }}>
                        <XIcon className="p-1" />
                    </button>
                </div>
            </div>


            {/* message container  */}
            <div className="chat-message overflow-y-scroll overflow-x-hidden  pl-2 flex flex-col-reverse   flex-grow ">
                {messages.map((ele) => {
                    return <MessageCard url={ele.url} message={ele.message} sender={ele.sender} />
                })}
            </div>




            {/* message form */}
            <form className="flex-shrink border-t-4 border-gray-200  p-3 " onSubmit={(event) => { event.preventDefault(); submitHandler(event.target[1].value); event.target[1].value = "" }}>
                <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <EmojiHappyIcon className="outline h-6 w-6 text-gray-500" />
                        </button>
                    </span>
                    <input type="text" placeholder="Ask me a question" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-2 sm:py-3" />
                    <div className="absolute right-0 items-center inset-y-0  sm:flex">
                        <button type="submit" className="inline-flex items-center justify-center rounded-full h-10 w-10 sm:h-12 sm:w-12 transition duration-500 ease-in-out text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>

    )
}
//  Scroll Bar style
export default Chat
const Wrapper = styled.div`
     .chat-message::-webkit-scrollbar {
    width: 0.12rem;
  }
   
  .chat-message::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }
   
  .chat-message::-webkit-scrollbar-thumb {
    background-color: rgb(79,70,229);
    outline: 1px solid rgb(79,70,229);
  }
  
`