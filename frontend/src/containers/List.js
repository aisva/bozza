import { connect } from "react-redux";
import { toggleItem } from "../actions";
import List from "../components/list/List";

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  toggleItem: id => dispatch(toggleItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
