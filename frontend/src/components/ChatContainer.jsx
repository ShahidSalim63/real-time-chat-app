import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"

export const ChatContainer = () => {

    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages]) //Don't understand why getMessages is included in the Array

    if(isMessagesLoading) return <div>Loading...</div>


    return (
        <div>
            <ChatHeader />

            <p>Messages...</p>

            <MessageInput />
        </div>
    )
}