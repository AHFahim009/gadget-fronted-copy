import { create } from "zustand";

type TProps = {
    isSideBarOpen: boolean;
    closeSidebar: () => void;
    openSidebar: () => void;
};

const useDashboardSideBar = create<TProps>((set) => ({
    isSideBarOpen: false,
    openSidebar: () => set({ isSideBarOpen: true }),
    closeSidebar: () => set({ isSideBarOpen: false }),
}));

export default useDashboardSideBar;
