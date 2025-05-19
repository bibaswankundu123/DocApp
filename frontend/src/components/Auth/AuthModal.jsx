import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const AuthModal = ({ handleClose, open }) => {
  const location = useLocation();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {location.pathname === "/login" ? (
          <LoginForm onSuccess={handleClose} /> 
        ) : (
          <RegisterForm onSuccess={handleClose} /> 
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
