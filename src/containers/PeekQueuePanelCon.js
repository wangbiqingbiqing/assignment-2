import connect from "react-redux/es/connect/connect";
import {getPeekList, skipSongAction, changePeekNum} from "../actions/actions";
import PeekQueuePanel from "../components/PeekQueuePanel";

const PeekQueuePanelCon = connect(
  state => ({
    currentSong: state.currentSong,
    peekList: state.peekList,
    peekNum: state.peekNum,
    isLoggedIn: state.isLoggedIn,
  }),
  dispatch => ({
    getPeekList: () => dispatch(getPeekList()),
    skipSong: (songId) => dispatch(skipSongAction(songId)),
    changePeekNumber:(peekNum) => dispatch(changePeekNum(peekNum)),
  })
)(PeekQueuePanel)
export default PeekQueuePanelCon