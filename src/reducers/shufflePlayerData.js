import {
  SET_CURRENT_SONG,
  SET_LOG_IN,
  SET_LOG_OUT,
  SET_PEEK_LIST,
  SET_PLAYING_QUEUE,
  SET_PLAYLIST_NAME,
  SET_PLAYLIST,
  SET_PLAYLISTS
} from "../actions/actions";
import {EMPTY_PLAYLISTS, DEMO_AUDIO} from "../constants/states";

/**
 * This is the default state in store
 *
 * playlist - an array of songs indicates the selected playlist
 * playlistName - a string of selected playlist name
 * peekList - an array of next playing songs with the number of peekNum
 * currentSong - an object Song indicates current playing song
 * isLoggedIn - a boolean of login state
 * playlists - an array of playlists' name
 * playingQueue - an array of songs indicates playing songs' order starting with the currentSong
 * peekNum - a number set by user indicates how many song they want to check
 */

const defaultState = {
  playlist: [],
  playlistName: '',
  peekList: [],
  currentSong: DEMO_AUDIO,
  isLoggedIn: false,
  playLists: EMPTY_PLAYLISTS,
  playingQueue: [DEMO_AUDIO],
  peekNum: 5
};

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how actions transform the state into the next state.
 *
 */

export default function shufflePlayerData(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.song,
      };
    case SET_PLAYLISTS:
      return {
        ...state,
        playLists: action.playlists,
      };
    case SET_PLAYLIST:
      return {
        ...state,
        playlist: [...action.playlist],
      };
    case SET_PLAYLIST_NAME:
      return {
        ...state,
        playlistName: action.listName,
      };
    case SET_PEEK_LIST:
      return {
        ...state,
        peekList: action.peekList
      };
    case SET_PLAYING_QUEUE:
      return {
        ...state,
        playingQueue: action.queue
      };
    case SET_LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SET_LOG_OUT:
    default:
      return defaultState
  }
}
