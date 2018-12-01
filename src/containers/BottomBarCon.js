import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import {getPeekList, playNextSong} from "../actions/actions";
import BottomBar from "../components/BottomBar";

const BottomBarCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    song: state.currentSong,
  }),
  dispatch => ({
    playNext: () => dispatch(playNextSong()),
    getPeekList: () => dispatch(getPeekList()),
  })
)(BottomBar);

export default withRouter(BottomBarCon)