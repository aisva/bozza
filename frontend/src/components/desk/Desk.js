import React, { useEffect } from "react";
import "./Desk.css";
import { useDispatch, useSelector, useStore } from "react-redux";
import stateUtils from "../../utils/stateUtils";
import Reader from "../reader/Reader";
import Dialog from "../dialog/Dialog";
import List from "../list/List";
import MasterToolbar from "../masterToolbar/MasterToolbar";
import DetailToolbar from "../detailToolbar/DetailToolbar";
import FloatingActionButton from "../floatingActionButton/FloatingActionButton";
import { setCurrentItemId, setShowMaster, setShowDialog } from "../../actions";

const Desk = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    stateUtils.addItems(stateUtils.items, dispatch);
    dispatch(setCurrentItemId("3"));
  }, [dispatch]);
  useEffect(() => {
    dispatch(setCurrentItemId("6"));
  }, [dispatch]);
  const showMaster = useSelector(state => state.ui.showMaster);
  useEffect(() => {
    dispatch(setShowMaster(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(setShowDialog(false));
  }, [dispatch]);
  console.log(useStore().getState());
  return (
    <div className="Desk-root">
      <div className={"Desk-master" + (showMaster ? "" : " hide")}>
        <MasterToolbar />
        <List />
        <FloatingActionButton />
      </div>
      <div className={"Desk-detail" + (!showMaster ? "" : " hide")}>
        <DetailToolbar />
        <Reader />
      </div>
      <Dialog />
    </div>
  );
};

export default Desk;
