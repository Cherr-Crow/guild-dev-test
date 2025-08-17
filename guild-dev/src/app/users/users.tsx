'use client'; 

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setCurrentPage } from '@/store/userSlice';
import { RootState } from '@/store/store';
import { AppDispatch } from '@/store/store';
import { User } from '@/types/users';
import styles from './users.module.css';
import Link from 'next/link';

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

  if (!users || users.length === 0) {
    return <p>No users to display.</p>; 
  }


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / pageSize);

  console.log("displayedUsers:", displayedUsers);  


  return (
    <div className={styles.container}>
      <h1>Users</h1>
      <ul className={styles.list}>
        {displayedUsers.map((user: User) => {
          const imageUrl = `https://i.pravatar.cc/150?img=${user.id}`;
          console.log("User ID:", user.id, "Image URL:", imageUrl);

          return (
            <li key={user.id}>
              {
                <Link href={`/users/user/${user.id}`}>
                  <img src={imageUrl} alt={user.name} width={50} height={50} />
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </Link>
              }

            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersPage;