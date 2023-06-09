import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface Song {
  // Define the properties of a song
}

// console.log(JSON.parse(Cookies.get('currentSongs')));

interface PlayerState {
  currentSongs: [];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Song;
  genreListId: string;
  isModalOpen: boolean;
  likedSongs: [];
  isLiked: boolean;
}

const initialState: PlayerState = {
  // currentSongs: [],
  // currentIndex: 0,
  // isActive: false,
  // isPlaying: false,
  // activeSong: {},
  genreListId: '',
  isModalOpen: false,
  isLiked: false,
  currentSongs: Cookies.get('currentSongs') !== undefined ? JSON.parse(Cookies.get('currentSongs')) :[],
  currentIndex: Cookies.get('currentIndex') !== undefined ? +Cookies.get('currentIndex'): 0,
  isActive: Cookies.get('isActive') === 'true' ?? false,
  isPlaying: false,
  activeSong: Cookies.get('activeSong') !==undefined ? JSON.parse(Cookies.get('activeSong')) : {},
  likedSongs: Cookies.get('likedSongs') !== undefined ? JSON.parse(Cookies.get('likedSongs')) : [],
  // genreListId: '',
  // isModalOpen: false,
};
// else if(){

// }
console.log(initialState);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      Cookies.set('activeSong', JSON.stringify(action.payload.song));

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;

      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;

      } else {
        state.currentSongs = action.payload.data;
      }

      Cookies.set('currentSongs', JSON.stringify(state.currentSongs.slice(state.currentIndex,state.currentIndex+1)), { expires: 3});

      state.currentIndex = action.payload.i;
      Cookies.set('currentIndex', +action.payload.i);

      state.isActive = true;
      Cookies.set('isActive', 'true');
    },
    setSingleActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.currentSongs = [action.payload.song];
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    likeUnlike: (state, action) => {
      state.isLiked = action.payload;
      console.log(state.isLiked);
    }
    ,
    setLikedSongs: (state, action) => {
      console.log(action.payload.activeSong);
      console.log(state.isLiked);
      if(state.isLiked){
        state.likedSongs = state.likedSongs.filter((song: any) => song.key !== action.payload.activeSong.key);
        Cookies.set('likedSongs', JSON.stringify(state.likedSongs));
        console.log(state.likedSongs);
      }else{
        const songData = {
          key: action.payload.activeSong.key,
          title: action.payload.activeSong.title,
          subtitle: action.payload.activeSong.subtitle,
          image: action.payload.activeSong.images.coverart
        }
        state.likedSongs.push(songData);
        Cookies.set('likedSongs', JSON.stringify(state.likedSongs));
        console.log(state.likedSongs);

      }
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
    toggleModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
  setSingleActiveSong,
  toggleModal,
  setLikedSongs,
  likeUnlike,
} = playerSlice.actions;

export default playerSlice.reducer;

