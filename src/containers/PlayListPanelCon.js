import connect from "react-redux/es/connect/connect";
import {resetPlayList} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    playList: state.playList,
  }),
  dispatch => ({

    playPlaylist: () => dispatch(resetPlayList()),
  })
)(PlayListPanel)
export default PlayListPanelCon