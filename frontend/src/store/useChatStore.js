import { create } from "zustand";
import { axiosInstance } from "../libs/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/getUsers")
            console.log(res.data.data)
            set({ users: res.data.data })
        } catch (error) {
            console.log("Error in get users", error?.response?.data?.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user })
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/sendMessages/${selectedUser._id}`, data);
            console.log(res.data.data)
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.log("Error in send messages", error)
        }
    },

    getMessages: async (selectedUserId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/getMessages/${selectedUserId}`);
            console.log("messages:", res.data.data)
            set({ messages: res.data.data })
        } catch (error) {
            console.log("Error in while fetching messages", error)
        } finally {
            set({ isMessagesLoading: false })
        }
    }
}))