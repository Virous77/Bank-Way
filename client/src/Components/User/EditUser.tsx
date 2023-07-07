import React, { useState } from "react";
import { User } from "../../Interface/interface";
import { Img, Main, Form, Wrap, ImageInput, Label } from "./user.style";
import { useAuthContext } from "../../Store/AuthContext";
import { TbEdit } from "react-icons/tb";
import { displayAllCenter, displayCol } from "../Common/variable.style";
import { Button } from "../Layout/navbar.style";
import { Input } from "../Auth/auth.style";

type EditUserData = {
  editData: User | undefined;
};

const EditUser: React.FC<EditUserData> = ({ editData }) => {
  const [image, setImage] = useState("");
  const {
    formData,
    setFormData,
    handleUpdateUser,
    updateLoading: isLoading,
  } = useAuthContext();

  return (
    <Main>
      <div>
        <Form onSubmit={(e) => e.preventDefault()} $style={displayCol}>
          <Wrap>
            <Img src={image || editData?.image} />

            <Label htmlFor="edit" $style={displayAllCenter}>
              <TbEdit size={22} />
            </Label>

            <ImageInput
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

          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Input
            type="text"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />

          <Button
            $width="100%"
            $primary="var(--main-font-color)"
            $color="var(--body-color)"
            onClick={handleUpdateUser}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      </div>
    </Main>
  );
};

export default EditUser;
