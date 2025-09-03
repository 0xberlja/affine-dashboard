"use client";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";

import { store } from "@/store";
import Header from "@/components/global/Header";

const RootTemplate = ({ children }: PropsWithChildren) => {
  Modal.setAppElement("body");

  return (
    <>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            position: "top-right",
            className: "!text-14",
            duration: 5000,
          }}
        />
        <Header />
        {children}
      </Provider>
    </>
  );
};

export default RootTemplate;
