import React from "react";
import { HistoryType } from "../utilities/historyUndoRedo";

const defaultHistory: HistoryType = {
    undo: () => undefined,
    redo: () => undefined,
}

export const HistoryContext: React.Context<HistoryType> = React.createContext(defaultHistory)