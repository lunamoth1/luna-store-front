export interface AdminAuthStoreType {
	isAdminAuthed: boolean;
	loginAdmin: () => void;
	logoutAdmin: () => void;
}
