import React from 'react';
import { NextPage } from 'next';
import { Page } from '../../layouts/Page';
import { Header } from '../../layouts/Header';
import { useAllUsers } from '../../features/users/queries';

const SearchPage: NextPage = () => {
  const [users] = useAllUsers();

  return (
    <Page>
      <Header title="Buscar amigos" />
      {users?.map((user) => (
        <div key={user.id} style={{ wordBreak: 'break-all' }}>
          <p>{JSON.stringify(user, null, 2)}</p>
        </div>
      ))}
    </Page>
  );
};

export default SearchPage;
