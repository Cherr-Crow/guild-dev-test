'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/store/userSlice';
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
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!users || users.length === 0) {
    return <p>No users to display</p>;
  }


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedUsers = users.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <h1>Пользователи</h1>
      <ul className={styles.list}>
        {displayedUsers.map((user: User) => {
          const imageUrl = `https://i.pravatar.cc/150?img=${user.id}`;

          return (
            <li className={styles.item} key={user.id}>

              <img className={styles.image} src={imageUrl} alt={user.name} width={60} height={60} />
              <p className={styles.name}>{user.name}</p>
              <p>{user.email}</p>

              {
                <Link href={`/users/user/${user.id}`}>
                  <button className={styles.button}>Подробнее</button>
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