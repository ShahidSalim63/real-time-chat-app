import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'

import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components'
import { HomePage, SignupPage, LoginPage, ProfilePage, SettingsPage } from './pages'

/* React 18+ in development mode uses Strict Mode to intentionally double-invoke certain lifecycle methods (like useEffect) to help catch side effects and bugs - once for mount, and once for simulated unmount/remount.
Hence, the double log messages */
function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()
  const { theme, setTheme } = useThemeStore()

  useEffect(() => { //setTimeout to ensure checkAuth runs once per mount lifecycle even if React double invokes
    const timer = setTimeout(() => checkAuth(), 100) //Delay in ms
    //If useAuthStore() returns a new function reference on every render (which Zustand often does unless memoized), React sees it as a change — and re-runs the effect.
    return () => clearTimeout(timer) //Cleanup on unmount
   }, [checkAuth]) 
  console.log({ authUser });

  // if(isCheckingAuth && !authUser) {
  //   return (
  //     <div className='flex items-center justify-center h-screen'>
  //       <Loader className='size-10 animate-spin' />
  //     </div>
  //   )
  // }
  
  return (
    <div data-theme={localStorage.getItem('chat-theme')}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/signup' />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/login' />} /> 
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} /> 
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/signup' />} />
        <Route path='/settings' element={<SettingsPage />} /> 
      </Routes>

    </div>
  )
}



export default App;