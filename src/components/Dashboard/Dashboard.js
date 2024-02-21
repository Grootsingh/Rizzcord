"use client";
import React from "react";
import UserDashboard from "./UserDashboard";
import { selectedBtn } from "@/components/RootRecoilProvider/RecoilStates";
import { useRecoilValue } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import SelectedUserDashboard from "./SelectedUserDashboard";
function Dashboard() {
  const isSelected = useRecoilValue(selectedBtn);
  const selectedUser = isSelected !== "Friends" ? isSelected : undefined;

  return (
    <>
      <AnimatePresence initial="false" mode="popLayout">
        {selectedUser ? (
          <motion.div
            key={"selectedUser"}
            className="flex grow min-w-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ type: "tween", ease: "backInOut", duration: 0.6 }}
          >
            <SelectedUserDashboard />
          </motion.div>
        ) : (
          <motion.div
            key="DefaultDashboard"
            className="flex grow min-w-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ type: "tween", ease: "backInOut", duration: 0.6 }}
          >
            <UserDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Dashboard;
