import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
};

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenre = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenre.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenre.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};
export const getGenres = createAsyncThunk("cinflex/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});
export const getMovies = createAsyncThunk(
  "cinflex/trending",
  async ({ type }, thunkApi) => {
    const {
      cinflex: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);
export const getDataByGenre = createAsyncThunk(
  "cinflex/moviesbygenres",
  async ({ genre, type }, thunkApi) => {
    const {
      cinflex: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const getUserLikedMovies=createAsyncThunk("cinflex/getLiked",async(email)=>{
    const {data:{movies}}=await axios.get(`http://localhost:8000/api/user/liked/${email}`)
    return movies
})

const cinflexSlice = createSlice({
  name: "cinflex",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    },
      builder.addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      }),
      builder.addCase(getDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      }),
      builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
    )
  },
});

export default cinflexSlice.reducer;
