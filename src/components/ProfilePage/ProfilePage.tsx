import React, { useEffect } from 'react';
import { Item } from './ProfilePage.Item';
import { Header } from './ProfilePage.Header';

interface ProfilePageProps {
  goToChat: (arg0: number) => void;
  allChatsArray: any | undefined;
  index: number | undefined;
  currentAvatar: string | undefined;
  setCurrentAvatar: (arg0: string) => void;
  name: string | undefined;
}
export const ProfilePage = (props: ProfilePageProps) => {
  useEffect(() => {
    if (props.currentAvatar === undefined) {
      props.setCurrentAvatar(
        process.env.PUBLIC_URL + './img/student_avatars/student1.png'
      );
    }
  }, [props]);

  console.log(props);

  const items = props.allChatsArray?.map((post, index) => (
    <Item
      key={index}
      index={index}
      checkmark={post.checkmark}
      text={post.text}
      imgURL={post.imgURL}
      goToChat={props.goToChat}
    />
  ));

  return (
    <div>
      <Header
        name={props.name}
        level={19}
        currentAvatar={props.currentAvatar}
        setCurrentAvatar={props.setCurrentAvatar}
      />
      <div id="profile-wrapper">{items}</div>
    </div>
  );
};
