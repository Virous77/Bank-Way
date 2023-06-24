import React from "react";
import { User } from "../../Interface/interface";
import { Img, Main, UserImage } from "./user.style";

type EditUserData = {
  editData: User | undefined;
};

const EditUser: React.FC<EditUserData> = ({ editData }) => {
  return (
    <Main>
      <UserImage>
        <Img src={editData?.image} />
      </UserImage>
    </Main>
  );
};

export default EditUser;
