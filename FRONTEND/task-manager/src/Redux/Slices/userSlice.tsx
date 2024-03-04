import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string;
  email: string;
  name:string
  role:string
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      console.log(action);
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;
export default userSlice.reducer;