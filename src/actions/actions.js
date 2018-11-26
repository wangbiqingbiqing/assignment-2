import {PLAYLIST_1} from "../constants/states";
import {getNext, setSong, getPeekQueue, skipSong,dynamicList} from "../logic/shufflePlayerLogic";

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export function setCurrent(song) {
  return {
    type: SET_CURRENT_SONG,
    song
  }
}

export const TURN_ON_PLAYER = "TURN_ON_PLAYER";

export function turnOnPlayer() {
  return {type: TURN_ON_PLAYER}
}

export const TURN_OFF_PLAYER = "TURN_OFF_PLAYER";

export function turnOffPlayer() {
  return {type: TURN_OFF_PLAYER}
}

export const SET_PLAYLIST = 'SET_PLAYLIST';

export function setPlaylist(playlist) {
  return {
    type: SET_PLAYLIST,
    playlist
  }
}

export const SET_PLAYLISTS = 'SET_PLAYLISTS';

export function setPlaylists(playlists) {
  return {
    type: SET_PLAYLISTS,
    playlists
  }
}

export const SET_PEEK_LIST = 'SET_PEEK_LIST';

export function setPeekList(peekList) {
  return {
    type: SET_PEEK_LIST,
    peekList,
  }
}

export const SET_PLAYING_QUEUE = 'SET_PLAYING_QUEUE';

export function setPlayingQueue(queue) {
  return {
    type: SET_PLAYING_QUEUE,
    queue,
  }
}

export const SET_PEEK_NUM = 'SET_PEEK_NUM';

export function setPeekNum(peekNum) {
  return {
    type:SET_PEEK_NUM,
    peekNum,
  }
}

// export const SET_DYNAMIC_LIST = 'SET_DYNAMIC_LIST';
//
// export function setDynamicList(list){
//   return{
//       type:SET_DYNAMIC_LIST,
//       list
//   }
// }

export function resetPlayList() {
  return (dispatch, getState) => {
    const data = getState();
    let queue = data.playingQueue;
    //TODO check current song is not equal to next round first
    queue = setSong(dynamicList, queue);
    dispatch(setPlayingQueue(queue));
    dispatch(setCurrent(queue[0]));
    dispatch(getPeekList());
  }
}

export function playNextSong() {
  return (dispatch, getState) => {
    const data = getState();
    const queue = data.playingQueue;
    const result = getNext(queue);
    dispatch(setCurrent(result.nextSong));
    dispatch(setPlayingQueue(result.playingQueue));
    if (!data.isTurnedOn) {
      dispatch(turnOnPlayer());
    }
    dispatch(getPeekList());
  }
}

export function getPeekList() {
  return (dispatch, getState) => {
    const data = getState();
    const peekNum = data.peekNum;
    let queue = data.playingQueue;
    const result = getPeekQueue(queue, peekNum);
    dispatch(setPeekList(result.peekQueue));
    dispatch(setPlayingQueue(result.playingQueue));
  }
}

export function skipSongAction(skippedIndex) {
  return (dispatch, getState) => {
    const data = getState();
    let queue = data.playingQueue;
    queue = skipSong(skippedIndex, queue);
    dispatch(setPlayingQueue(queue));
    dispatch(getPeekList());
  }
}

export function changePeekNum(peekNum) {
  return (dispatch) => {
    dispatch(setPeekNum(peekNum));
    dispatch(getPeekList());
  }
}

export function getPlaylist() {
  return (dispatch) => {
    dispatch(setPlaylist(PLAYLIST_1));
  };
}

export const SET_LOG_IN = 'SET_LOG_IN';

export function setLogin() {
  return {
    type: SET_LOG_IN
  }
}

export const SET_LOG_OUT = 'SET_LOG_OUT';

export function setLogout() {
  return {
    type: SET_LOG_OUT
  }
}

export function login() {
  return (dispatch,getState) => {
      const data = getState();
      let queue = data.playingQueue;
    dispatch(setLogin());
    dispatch(getPlaylist());
    dispatch(resetPlayList());
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(setLogout());
    //TODO set to initial value
  }
}

