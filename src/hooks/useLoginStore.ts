import { create } from "zustand";

type TProps = {
    isModalOpen: boolean;
    closeModal: () => void;
    openModal: () => void;
};

const useLoginStore = create<TProps>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
}));

export default useLoginStore;
