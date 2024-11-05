import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action pour gérer la connexion de l'utilisateur
export const login = createAsyncThunk('auth/login', async ({ email, password, rememberMe }, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid Fields'); 
    }

    const data = await response.json(); 
    console.log('API Response (login):', data);
    
   
    if (rememberMe) {
      localStorage.setItem('token', data.body.token);
    }

    return data.body; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message); 
  }
});

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, thunkAPI) => {
  const state = thunkAPI.getState(); 
  const token = state.auth.token;

  if (!token) {
    console.error('No token found'); 
    return thunkAPI.rejectWithValue('No token found'); 
  }

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
    });

   
    if (!response.ok) {
      throw new Error('Failed to fetch user profile'); 
    }

    const data = await response.json(); 
    return data.body;
  } catch (error) {
    console.error('Error fetching user profile:', error); 
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Slice pour la gestion de l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
    userName: localStorage.getItem("userName") || '', 
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userName = '';
      localStorage.removeItem("token");
      localStorage.removeItem("userName");  
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.userName = action.payload.userName || ''; 
        localStorage.setItem("userName", action.payload.userName || ''); 
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, setUserName } = authSlice.actions;
export default authSlice.reducer;