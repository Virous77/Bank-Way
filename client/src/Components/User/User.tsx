import {
  ProfileSection,
  UserImage,
  UserInformation,
  Img,
  Header,
  H1,
  ProfileWrap,
  P,
} from "./user.style";
import { Button } from "../Layout/navbar.style";
import { displayFlex } from "../Common/variable.style";
import ModalHeader from "../Modal/ModalHeader";
import { Modal } from "../Modal/Modal";
import React from "react";
import { User } from "../../Interface/interface";
import EditUser from "./EditUser";
import { CircleShimmer, HeadingShimmer } from "../Shimmers/TextShimmer";
import { useAuthContext } from "../../Store/AuthContext";

const UserProfile = () => {
  const { userData } = useAuthContext();
  const { formData, setFormData, editUserData, setEditUserData } =
    useAuthContext();

  const handleEditUser = (user: User | undefined) => {
    if (!user) return;

    setFormData({
      ...formData,
      name: user?.name,
      email: user?.email,
      bio: user.bio,
    });
  };

  return (
    <React.Fragment>
      <ProfileSection>
        <Header $style={displayFlex}>
          <H1>Profile</H1>
          <Button
            onClick={() => {
              setEditUserData(userData);
              handleEditUser(userData);
            }}
          >
            Edit
          </Button>
        </Header>
        <ProfileWrap>
          <UserImage>
            {userData ? (
              <Img src={userData?.image} alt={userData?.name} />
            ) : (
              <CircleShimmer size={150} />
            )}
          </UserImage>
          <UserInformation>
            {userData ? (
              <H1 style={{ fontSize: "2rem" }}>{userData?.name}</H1>
            ) : (
              <HeadingShimmer />
            )}
            <P>Email: {userData?.email}</P>
            {userData && <P>Bio: {userData?.bio}</P>}
          </UserInformation>
        </ProfileWrap>
      </ProfileSection>

      {editUserData && (
        <Modal isOpen="isOpen" onClose={() => setEditUserData(undefined)}>
          <ModalHeader
            name="Edit Profile"
            onClose={() => setEditUserData(undefined)}
          />
          <EditUser editData={editUserData} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
