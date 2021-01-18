import React, { createContext, useEffect, useMemo, useState } from "react";

import { SnackbarCloseReason } from "@material-ui/core";

import { delay } from "../../logic/util/async.util";
import { throttle } from "../../logic/util/throttle.util";
import { SnackbarData, SnackbarKind } from "../../types";
import { ContextProps } from "../../types/context.component.props";
import { AppSnackbar } from "../generic/snackbar/AppSnackbar";

export const SnackbarContext = createContext(
  (type: SnackbarKind, text: string) => {}
);

export const WithSnackbar: React.FC<ContextProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<SnackbarData>({
    type: SnackbarKind.Info,
    text: "",
  });
  const [nextMessages, setNextMessages] = useState<Array<SnackbarData>>([]);

  useEffect(() => {
    const display = async () => {
      if (nextMessages.length === 0) return;

      setIsOpen(false);
      await delay(300);
      setCurrentMessage(nextMessages[0]);
      setNextMessages((prev) => prev.slice(1));
      setIsOpen(true);
    };
    display();
  }, [nextMessages]);

  const showSnackbar = useMemo(
    () =>
      throttle(
        (type: SnackbarKind, text: string) => {
          setNextMessages((prev) => [...prev, { type, text }]);
        },
        1,
        1500
      ),
    []
  );

  const closeSnackbar = (
    event: React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setIsOpen(false);
  };

  return (
    <>
      <SnackbarContext.Provider value={showSnackbar}>
        {children}
      </SnackbarContext.Provider>
      <AppSnackbar
        isOpen={isOpen}
        message={currentMessage}
        onClose={closeSnackbar}
      />
    </>
  );
};
