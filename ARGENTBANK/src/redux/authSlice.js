import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const login = createAsyncThunk('auth/login', async (Auth, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: Auth.email,
        password: Auth.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    console.log('API Response (login):', data);
    return data.body;  // L'objet body contenant le token et d'autres informations.
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
    console.log("Profil utilisateur récupéré:", data);

    return data.body;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,       
    token: null,      
    status: 'idle',   
    error: null,      
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de la connexion
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        console.log('Token après connexion:', action.payload.token);
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
        console.log('Profil utilisateur récupéré:', action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;