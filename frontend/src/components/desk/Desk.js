import React, { useEffect } from "react";
import "./Desk.css";
import { useDispatch, useSelector } from "react-redux";
import Reader from "../reader/Reader";
import Dialog from "../dialog/Dialog";
import List from "../list/List";
import AlertDialog from "../alertDialog/AlertDialog";
import MasterToolbar from "../masterToolbar/MasterToolbar";
import DetailToolbar from "../detailToolbar/DetailToolbar";
import FloatingActionButton from "../floatingActionButton/FloatingActionButton";
import { setShowMaster, setShowDialog } from "../../actions";
import itemApiUtils from "../../utils/api/itemApiUtils";

const Desk = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    itemApiUtils.getItems(dispatch);
  }, [dispatch]);
  const showMaster = useSelector(state => state.ui.showMaster);
  useEffect(() => {
    dispatch(setShowMaster(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(setShowDialog(false));
  }, [dispatch]);

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
      <AlertDialog />
    </div>
  );
};

export default Desk;
