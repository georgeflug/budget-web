import {CircularProgress} from "@material-ui/core";
import React from "react";
import {SaveState} from "./saveState";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import EditIcon from '@material-ui/icons/Edit';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

export function InlineSaveState(props: { saveState: SaveState }) {
  const saveState = props.saveState;

  return (
    <React.Fragment>
      {saveState === SaveState.Changed && (<EditIcon/>)}
      {saveState === SaveState.Saving && (<CircularProgress/>)}
      {saveState === SaveState.Saved && (<CheckCircleOutlinedIcon/>)}
      {saveState === SaveState.Error && (<ReportOutlinedIcon/>)}
    </React.Fragment>
  )
}
