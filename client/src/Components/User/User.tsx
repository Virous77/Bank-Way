import {
  ProfileSection,
  UserInformation,
  Img,
  Header,
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
import defaultUser from "../../assets/user.avif";

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
          <h1>Profile</h1>
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
          <div>
            {userData ? (
              <Img src={userData?.image || defaultUser} alt={userData?.name} />
            ) : (
              <CircleShimmer size={150} />
            )}
          </div>
          <UserInformation>
            {userData ? <h2>{userData?.name}</h2> : <HeadingShimmer />}
            {userData && <P>Email: {userData?.email}</P>}
            {userData?.bio && <P>Bio: {userData?.bio}</P>}
          </UserInformation>
        </ProfileWrap>
      </ProfileSection>

      {editUserData && (
        <Modal
          isOpen="isOpen"
          onClose={() => setEditUserData(undefined)}
          size="500px"
        >
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
