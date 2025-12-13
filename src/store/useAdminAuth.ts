import { create } from "zustand";
import { AdminAuthStoreType } from "../types/stores/useAdminAuth";

const useAdminAuth = create<AdminAuthStoreType>((set) => ({
	isAdminAuthed: false,

	loginAdmin: () => {
		localStorage.setItem("isLogged", "true");
		set({ isAdminAuthed: true });
	},

	logoutAdmin: () => {
		localStorage.removeItem("isLogged");
		set({ isAdminAuthed: false });
	},
}));

export default useAdminAuth;
