import { User } from '../models/user.model.js'
import { Message } from '../models/message.model.js'

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}})
    
        return res.status(200).json(filteredUsers)

    } catch (error) {
        console.log(`Error in getUsersForSidebar Controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server error'})
    }
}

export const getMessages = async (req, res) => {
    console.log('Inside getMessages Controller');
    console.log(`Req Users: ${req.user}`);
    
    
    try {
        const myId = req.user._id
        const { id: userToChatId } = req.params
        
        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
    
        return res.status(200).json(messages)

    } catch (error) {
        console.log(`Error in getMessages Controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server error'})
    }
}

export const sendMessages = async (req, res) => {
    try {
        const senderId = req.user._id
        const { id: receiverId } = req.params
        const { text } = req.body //'image' not extracted due to no Cloudinary setup
        //'image' default value is set to null instead when creating a doc. instance
        
        //(Maybe) TODO: Set up Cloudinary for uploading images to DB
        // let imageUrl
        // if(image) {
        //     const uploadResponse = await cloudinary.upload.uploader(image)
        //     const imageUrl = uploadResponse.secure_url
        // }
        
        //Change image: null to imageUrl if cloudinary is setup
        const newMessage = new Message({
            senderId, receiverId, text, image: null
        })
        await newMessage.save()

        //TODO: Socket.IO Real-Time Functionality
        return res.status(201).json(newMessage)
        
    } catch(error) {
        console.log(`Error in sendMessage Controller: ${error.message}`);
        return res.status(500).json({message: 'Internal Server error'})
    }
}