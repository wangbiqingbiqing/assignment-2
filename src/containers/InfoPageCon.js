import connect from "react-redux/es/connect/connect";
import InfoPage from "../components/InfoPage";

let InfoPageCon = connect(
  state =>({
    isLoggedIn:state.isLoggedIn
  })
)(InfoPage);
export default InfoPageCon;