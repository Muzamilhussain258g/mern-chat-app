import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    isUserLoading: false,
    isMessagaLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosInstance.get("/getUsers")
            console.log(res.data.data)
            set({ users: res.data.data })
        } catch (error) {
            console.log("Error in get users", error?.response?.data?.message)
        } finally {
            set({ isUserLoading: false })
        }
    },
}))