import { Mail, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'
import Avatar_1 from '../assets/Avatar_1.png'

export const ProfilePage = () => {
    const { authUser } = useAuthStore()

    return (
        <div className='h-screen pt-20'>
            <div className='max-w-2xl mx-auto p-4 py-8'>
                <div className='bg-base-300 rounded-xl p-6 space-y-8'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Profile</h1>
                    </div>

                    {/*Avatar section*/}
                    <div className='flex flex-col items-center gap-4'>
                        <div className='relative'>
                            {/*<img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="Profile"*/}
                            <img src={Avatar_1}
                            className='size-32 rounded-full object-cover border border-teal-100'/>
                        </div>

                        <div className='space-y-6'>
                            <div className='space-y-1.5'>
                                <div className='text-sm text-zinc-400 flex items-center gap-2'>
                                    <User className='size-4' />
                                    Full Name
                                </div>
                                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
                            </div>

                            <div className='space-y-1.5'>
                                <div className='text-sm text-zinc-400 flex items-center gap-2'>
                                    <Mail className='size-4'/>
                                    Email Address
                                </div>
                                <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
                            </div>
                        </div>

                        <div className='mt-6 bg-base-300 rounded-xl p-6'>
                            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
                            <div className='space-y-3 text-sm'>
                                <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                                    <span>Member since</span>
                                    <span>{authUser.createdAt?.split("T")[0]}</span>
                                </div>
                                <div className='flex items-center justify-between py-2'>
                                    <span>Account Status</span>
                                    <span className='text-green-500'>Active</span>
                                </div>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}