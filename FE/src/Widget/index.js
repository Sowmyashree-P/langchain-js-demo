import React, { useState } from 'react'
import Chat from "./Chat"

function Index(props) {
    const [chat, setChat] = useState(false)
    const closeMessage = () => { setChat(!chat) }

    return (
        <div style={{width: '100%'}}>
            {/* Chat Body */}
            <div className={"block "}>
                <div {...props} >
                    <Chat closeMessage={closeMessage} bot={props.bot} setMessages={props.setMessages} messages={props.messages} />
                </div>
            </div>
        </div>
    )
}

export default Index
