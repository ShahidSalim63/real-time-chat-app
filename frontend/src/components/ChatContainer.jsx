import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore.js"
import { useAuthStore } from "../store/useAuthStore.js"

import { ChatHeader } from "./ChatHeader"
import { MessageInput } from "./MessageInput"
import { MessageSkeleton } from "./skeletons/MessageSkeleton.jsx"

// import Avatar_1, Avatar_7 from '../assets/Avatar_1.png'
import { avatars } from "../assets/index.js"

export const ChatContainer = () => {

    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()
    const { authUser } = useAuthStore()

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages]) //Don't understand why getMessages is included in the Array

    if(isMessagesLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )


    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img src={
                                        message.senderId === authUser._id 
                                        ? authUser.profilePic || avatars[1]
                                        : selectedUser.profilePic || avatars[7]
                                        }
                                        alt="Profile pic." />
                                </div>
                            </div>
                            <div className="chat-header mb-1 ">
                                <time className="text-xs opacity-50 ml-1">
                                    {message.createdAt}
                                </time>
                            </div>
                            <div className="chat-bubble flex">
                                {message.text && <p>{message.text}</p>}
                            </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    )
}