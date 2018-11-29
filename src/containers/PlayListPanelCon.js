import connect from "react-redux/es/connect/connect";
import {resetPlayList} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    playlist: state.playlist,
  }),
  dispatch => ({

    shufflePlaylist: () => dispatch(resetPlayList()),
  })
)(PlayListPanel);
export default PlayListPanelCon