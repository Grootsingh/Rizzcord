"use client";
import React from "react";
import { RecoilRoot } from "recoil";

function RootRecoilProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RootRecoilProvider;
