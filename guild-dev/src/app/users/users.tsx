'use client';

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/store/userSlice';
import { RootState, AppDispatch } from '@/store/store';
import { User } from '@/types/users';
import styles from './users.module.css';
import Link from 'next/link';
import Image from 'next/image';

const UsersPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const { users, loading, error } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; 

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []); 

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedUsers = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil((users?.length || 0) / pageSize); 

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!users || users.length === 0) {
    return <p>Нет пользователей для отображения</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Пользователи</h1>
      <ul className={styles.list}>
        {displayedUsers.map((user: User) => {
          const imageUrl = `https://i.pravatar.cc/150?img=${user.id}`; 
          return (
            <li className={styles.item} key={user.id}>
              <Image 
                className={styles.image}
                src={imageUrl}
                alt={user.name}
                width={60}
                height={60}
              />
              <p className={styles.name}>{user.name}</p>
              <p>{user.email}</p>
              <Link href={`/users/user/${user.id}`}> 
                <button className={styles.button}>Подробнее</button>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};

export default UsersPage;