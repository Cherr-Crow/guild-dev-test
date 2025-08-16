'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setCurrentPage } from '@/store/userSlice';
import { RootState } from '@/store/store';
import { AppDispatch } from '@/store/store';
import { User } from '@/types/users';
import styles from './users.module.css';


const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { users, loading, error, currentPage, pageSize } = useSelector(
    (state: RootState) => state.user
  );

  
  useEffect(() => {
     console.log("Вызываем dispatch(fetchUsers())"); 
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / pageSize);

  console.log(displayedUsers)

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <ul className={styles.list}>
        {
        
        displayedUsers.map((user: User) => {
          const imageUrl = !!user.login.uuid ? `https://i.pravatar.cc/150?img=${user.login.uuid}` : 'https://via.placeholder.com/150';
           console.log("User ID:", user.login.uuid, "Image URL:", imageUrl); 

          return (
            <li key={user.login.uuid}>
              <img src={imageUrl} alt={user.name.first} width={50} height={50} />
              <p>{user.name.first}</p>
              <p>{user.email}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersPage;