import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getAuth } from "firebase/auth";

const BackgroundLetterAvatars: React.FC = () => {
  const auth = getAuth();
  let username = JSON.stringify(auth.currentUser?.email);
  if (auth.currentUser) {
    username = username.split(" ")[0][1].toUpperCase();
  }
  return (
    <Stack className="me-auto" direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: "Purple" }}>{username}</Avatar>
    </Stack>
  );
};
export default BackgroundLetterAvatars;
