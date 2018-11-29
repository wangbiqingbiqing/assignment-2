import connect from "react-redux/es/connect/connect";
import {getPlaylist} from "../actions/actions";
import SidePanel from "../components/SidePanel";

const SidePanelCon = connect(
  state => ({
    data: state.playLists,
  }),
  dispatch => ({
    openPlayList: (listName) => dispatch(getPlaylist(listName))
  })
)(SidePanel);

export default SidePanelCon