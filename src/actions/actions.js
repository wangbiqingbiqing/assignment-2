import {SONGS_COLLECTION} from "../constants/states";
import {
  arraysWithSameElement,
  dynamicList,
  getNext,
  getPeekQueue,
  setDynamicList,
  setSong,
  skipSong,
  startPlayingWithSong
} from "../logic/shufflePlayerLogic";

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export function setCurrent(song) {
  return {
    type: SET_CURRENT_SONG,
    song
  }
}

export const SET_PLAYLIST = 'SET_PLAYLIST';

export function setPlaylist(playlist) {
  return {
    type: SET_PLAYLIST,
    playlist
  }
}

export const SET_PLAYLIST_NAME = 'SET_PLAYLIST_NAME';

export function setPlylistName(listName) {
  return {
    type: SET_PLAYLIST_NAME,
    listName,
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

/**
 * reset playlist playing order when users change a playlist or reshuffle current playing order
 *
 * when users change a playlist, set the temporary dynamicList with the selected playlist content and shuffle the playlist
 * generate new playing queue and playing the next song, the first song of new round, on the playing queue list
 * update playing queue's state
 */
export function resetPlayList() {
  return (dispatch, getState) => {
    const data = getState();
    let queue = data.playingQueue;
    let playlist = data.playlist;
    if (playlist.length !== 0) {
      if (!arraysWithSameElement(playlist, dynamicList)) {
        setDynamicList(playlist);
      }
    }
    queue.splice(1, queue.length - 1);
    queue = setSong(dynamicList, queue, true);
    dispatch(setPlayingQueue(queue));
    dispatch(playNextSong());
  }
}

/**
 * play next song on the playing queue
 * get next song and set to current playing, updated state of playing queue and peek list
 */
export function playNextSong() {
  return (dispatch, getState) => {
    const data = getState();
    const queue = data.playingQueue;
    const result = getNext(queue);
    dispatch(setCurrent(result.nextSong));
    dispatch(setPlayingQueue(result.playingQueue));
    dispatch(getPeekList());
  }
}

/**
 * get peek list
 * according to peek number and get songs from playing queue, update state of peek list and playing queue
 */
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

/**
 * skip song
 * skip the selecting song on the playing queue
 * update state of playing queue and peek list
 */
export function skipSongAction(skippedIndex) {
  return (dispatch, getState) => {
    const data = getState();
    let queue = data.playingQueue;
    queue = skipSong(skippedIndex, queue);
    dispatch(setPlayingQueue(queue));
    dispatch(getPeekList());
  }
}

/**
 * jump to selected song and start playing
 * set selected song as the current playing song and update state
 * update playing queue's state with selected song as start and following songs as previous order
 * update peek list's state
 */
export function jumpToPlaySong(playingIndex) {
  return (dispatch, getState) => {
    const data = getState();
    let queue = data.playingQueue;
    queue = startPlayingWithSong(playingIndex, queue);
    dispatch(setCurrent(queue[0]));
    dispatch(setPlayingQueue(queue));
    dispatch(getPeekList());
  }
}

/**
 * get playlists' name from collection and update state
 */
export function getPlaylists() {
  return (dispatch) => {
    dispatch(setPlaylists(Object.keys(SONGS_COLLECTION)));
  };
}

/**
 * get playlist according to name and update state
 */
export function getPlaylist(listName) {
  return (dispatch) => {
    let playlist = SONGS_COLLECTION[listName];
    dispatch(setPlylistName(listName));
    dispatch(setPlaylist(playlist));
  };
}

/**
 * login and get playlists' name, update state
 */
export function login() {
  return (dispatch) => {
    dispatch(setLogin());
    dispatch(getPlaylists());
  }
}

/**
 * logout and set to default state
 */
export function logout() {
  return (dispatch) => {
    dispatch(setLogout());
  }
}

