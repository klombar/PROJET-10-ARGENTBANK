import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action pour vérifier l'authentification au démarrage
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  return token; // On retourne le token pour l'utiliser dans le state
});

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
      throw new Error('Failed to login');
    }

    const data = await response.json();
    console.log('API Response (login):', data);
    
    // Si rememberMe est coché, stocker le token dans le localStorage
    if (rememberMe) {
      localStorage.setItem('token', data.body.token);
    }

    return data.body; // L'objet body contenant le token et d'autres informations.
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'), // Charge le token au démarrage
    status: 'idle',
    error: null,
    userName: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload; 
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // Réinitialise le token dans le state
      localStorage.removeItem('token'); // Supprime le token du localStorage
      state.status = 'idle';
      state.userName = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.token = action.payload; 
        state.status = 'succeeded';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token; // Assigne le token à l'état
        // Note : Le stockage du token dans le localStorage se fait dans l'action login
        state.userName = action.payload.userName || '';
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