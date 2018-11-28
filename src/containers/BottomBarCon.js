import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import {
  getPeekList,
  playNextSong, resetPlayList,
  turnOffPlayer,
  turnOnPlayer
} from "../actions/actions";
import BottomBar from "../components/BottomBar";

const BottomBarCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    song: state.currentSong,
    isPlayOn: state.isTurnedOn,
  }),
  dispatch => ({
    playNext: () => dispatch(playNextSong()),
    handleSwitchOn: () => dispatch(turnOnPlayer()),
    handleSwitchOff: () => dispatch(turnOffPlayer()),
    getPeekList: () => dispatch(getPeekList()),
    resetPlayQueue:()=>dispatch(resetPlayList()),
  })
)(BottomBar);

export default withRouter(BottomBarCon)