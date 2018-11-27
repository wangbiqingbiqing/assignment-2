import {
    TURN_ON_PLAYER,
    TURN_OFF_PLAYER,
    SET_PLAYLISTS,
    SET_PLAYLIST,
    SET_LOG_IN,
    SET_LOG_OUT,
    SET_PEEK_LIST,
    SET_CURRENT_SONG, SET_PLAYING_QUEUE, SET_PEEK_NUM,SET_DYNAMIC_LIST
} from "../actions/actions";
import {DEMO_AUDIO, DEFAULT_PLAYLISTS} from "../constants/states";

const defaultState = {
    playList: [DEMO_AUDIO],
    peekList: [],
    isTurnedOn: false,
    currentSong: DEMO_AUDIO,
    isLoggedIn: false,
    playLists: DEFAULT_PLAYLISTS,
    playingQueue: [],
    peekNum: 5
};

export default function shufflePlayerData(state = defaultState, action) {
    switch (action.type) {
        case SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.song,
            };
        case TURN_ON_PLAYER:
            return {
                ...state,
                isTurnedOn: true,
            };
        case TURN_OFF_PLAYER:
            return {
                ...state,
                isTurnedOn: false,
            };
        case SET_PLAYLISTS:
            return {
                ...state,
                playLists: action.playlists,
            };
        case SET_PLAYLIST:
            return {
                ...state,
                playList: action.playlist,
            };
        case SET_LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case SET_LOG_OUT:
            return {
                currentSong: DEMO_AUDIO,
                playList: [DEMO_AUDIO],
                isLoggedIn: false,
                peekList: [],
                playLists: DEFAULT_PLAYLISTS,
                isTurnedOn: false,
                playingQueue: [],
                peekNum: 5
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
        case SET_PEEK_NUM:
            return {
                ...state,
                peekNum: action.peekNum
            };
        default:
            return state
    }
}
