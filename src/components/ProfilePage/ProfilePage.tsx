import React from 'react';
import { Header } from './ProfilePage.Header';

interface ProfilePageProps {
  name: string;
}

export const ProfilePage = (props: ProfilePageProps) => (
  <div>
    <Header name={props.name} />
  </div>
);
