import { create } from 'zustand'
import { axiosInstance } from '../libs/axios'
import { toast } from 'react-toastify'

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    isCheckingAuth: true, // this is used to show a loading spinner while we check if the user is logged in

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/getCurrentUser")

            set({ authUser: res.data.data })

        } catch (error) {
            console.log("Error in check auth", error?.response?.data?.message)

            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        let isSignedUp = false
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/register", data)

            toast.success("Signup successful, Please login")

            isSignedUp = true

            console.log(res.data)
        } catch (error) {
            toast.error("Registration Failed")

            console.log("Error in signup", error?.response?.data?.message)
        } finally {
            set({ isSigningUp: false })
        }
        return isSignedUp
    },

    login: async (data) => {
        set({ isLogingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            toast.success("Logged In Successfully")
            set({ authUser: res?.data?.data })
            console.log(res)
        } catch (error) {
            console.log("Error in login", error?.response?.data?.message)
            toast.error("Login operation failed")
        } finally {
            set({ isLogingIn: false })
        }
    },
}))
