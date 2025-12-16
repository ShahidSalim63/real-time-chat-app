import toast from 'react-hot-toast'
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null, 
    isUsersLoading: false, 
    isMessagesLoading: false,
    
    getUsers: async () => {
        console.log('Inside getUsers Store');
        
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/messages/users')
            console.log(res);
            
            set({ users: res.data })

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isUsersLoading: false })   
        }
    },

    getMessages: async (userId) => {
        console.log(`Inside getMessages Store`);
        
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isMessagesLoading: false })
        }
    },

    // todo: optimize this later
    setSelectedUser: (selectedUser) => set({ selectedUser })

}))
