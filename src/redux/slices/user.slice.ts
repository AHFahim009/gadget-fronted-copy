import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TUser = {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    role: string;

}

type TInitialState = {
    user: TUser | null;
};

const initialState: TInitialState = {
    user: null,
};

// Create the user slice
const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    }
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice;
