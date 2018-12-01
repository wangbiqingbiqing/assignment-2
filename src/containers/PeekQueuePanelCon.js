import connect from "react-redux/es/connect/connect";
import {changePeekNum, jumpToPlaySong, skipSongAction, resetPlayList} from "../actions/actions";
import PeekQueuePanel from "../components/PeekQueuePanel";

const PeekQueuePanelCon = connect(
  state => ({
    currentSong: state.currentSong,
    peekList: state.peekList,
    peekNum: state.peekNum,
    isLoggedIn: state.isLoggedIn,
    playlistName:state.playlistName,
  }),
  dispatch => ({
    skipSong: (queueIndex) => dispatch(skipSongAction(queueIndex)),
    jumpToPlay: (queueIndex) => dispatch(jumpToPlaySong(queueIndex)),
    changePeekNumber: (peekNum) => dispatch(changePeekNum(peekNum)),
    reshufflePlaylist:()=>dispatch(resetPlayList())
  })
)(PeekQueuePanel);
export default PeekQueuePanelCon