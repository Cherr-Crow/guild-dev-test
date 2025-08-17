
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './user.module.css';

interface User {
  id: number;
  name: string;
  email: string;
  description: string;
}

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

const UserDetailPage = ({ params }: Props) => {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = parseInt(id);
        if (isNaN(userId)) {
          setError("Некорректный ID пользователя");
          return;
        }

        const response = await fetch(`http://localhost:8080/users/${userId}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError("Пользователь не найден.");
          } else {
            setError(`Ошибка HTTP: ${response.status}`);
          }
          return;
        }
        const data: User = await response.json();
        setUser(data);
      } catch (e: any) {
        setError(e.message || 'Не удалось загрузить данные пользователя.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!user) {
    return <p>Пользователь не найден.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>{user.description}</p>
      <Link href="/users">
         <button className={styles.button}>Назад</button>
      </Link>
    </div>
  );
};

export default UserDetailPage;

