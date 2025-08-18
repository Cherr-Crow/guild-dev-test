'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import styles from './user.module.css';
import { useParams } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  description: string;
}

const UserDetailPage = () => {
  const params = useParams();
  const id: string | undefined = (Array.isArray(params?.id) ? params.id[0] : params?.id);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!id) {
      setError("ID пользователя не найден в URL");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
        setError("Некорректный ID пользователя");
        return;
      }

      const response = await fetch(`http://localhost:8080/users/${userId}`);

      if (!response.ok) {
        setError(response.status === 404 ? "Пользователь не найден." : `Ошибка HTTP: ${response.status}`);
        return;
      }

      const data: User = await response.json();
      setUser(data);

    } catch (e: any) {
      setError(e.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }, [id]); 

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); 


  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!user) {
    return <div>Данные пользователя не найдены.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Описание: {user.description}</p>
      <Link href="/users">
        <button className={styles.button}>Назад</button>
      </Link>
    </div>
  );
};

export default UserDetailPage;

