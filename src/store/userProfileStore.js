import { create } from "zustand";

const useUserProfileStore = create((set) => ({
	userProfile: null,
	setUserProfile: (userProfile) => set({ userProfile }),
    // next part its to coutn and show in profile pages
}))

export default useUserProfileStore

