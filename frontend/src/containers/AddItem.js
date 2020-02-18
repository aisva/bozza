import { connect } from "react-redux";
import { addItem } from "../actions";
import AddItem from "../components/addItem/AddItem";

const mapDispatchToProps = dispatch => ({
  addItem: id => dispatch(addItem(id))
});

export default connect(null, mapDispatchToProps)(AddItem);
