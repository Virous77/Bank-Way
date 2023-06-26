import React, { useState } from "react";
import { User } from "../../Interface/interface";
import { Img, Main, UserImage, Form, Wrap, Input, Label } from "./user.style";
import { useAuthContext } from "../../Store/AuthContext";
import { TbEdit } from "react-icons/tb";
import { displayAllCenter } from "../Common/variable.style";

type EditUserData = {
  editData: User | undefined;
};

const EditUser: React.FC<EditUserData> = ({ editData }) => {
  const [image, setImage] = useState("");
  const { formData, setFormData } = useAuthContext();

  return (
    <Main>
      <UserImage>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Wrap>
            <Img src={image || editData?.image} />

            <Label htmlFor="edit" $style={displayAllCenter}>
              <TbEdit size={22} />
            </Label>

            <Input
              type="file"
              id="edit"
              onChange={(e) => {
                if (!e.target.files) return;
                setFormData({ ...formData, image: e.target.files[0] });
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
              style={{ display: "none" }}
            />
          </Wrap>
        </Form>
      </UserImage>
    </Main>
  );
};

export default EditUser;
