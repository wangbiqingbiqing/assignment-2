import connect from "react-redux/es/connect/connect";
import {changePeekNum, getPeekList, junmpToPlaySong, skipSongAction} from "../actions/actions";
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
    skipSong: (queueIndex) => dispatch(skipSongAction(queueIndex)),
    jumpToPlay: (queueIndex) => dispatch(junmpToPlaySong(queueIndex)),
    changePeekNumber: (peekNum) => dispatch(changePeekNum(peekNum)),
  })
)(PeekQueuePanel)
export default PeekQueuePanelCon