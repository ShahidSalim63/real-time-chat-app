import { create } from 'zustand'

import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    authUser: null,

    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => { //For the loading spinner
        try {
            console.log('Inside checkAuth in useAuthStore');
            
            const res = await axiosInstance.get('/auth/check-auth')            
            set({authUser: res.data})
            console.table([get().authUser]);
            
        } catch (error) {
            console.log(`Error in useAuthStore: ${error.message}`);
            set({authUser: null})

        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => { //For signup process
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success("Account created successfully")

        } catch (error) {
            console.log(`Error in signup store: ${error.message}`)
            toast.error(error.response.data.message)

        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success("Logged in successfully")

        } catch (error) {
            console.log(`Error in login store: ${error.message}`)
            toast.error(error.response.data.message)

        } finally{
            set({ isLoggingIn: false })
        }
    },

    logout: async (data) => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success("Logged out successfully")

        } catch (error) {
            console.log(`Error in logout store: ${error.message}`);
            toast.error(error.response.data.message)
        }
    }
}))