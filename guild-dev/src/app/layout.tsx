'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Inter } from 'next/font/google';
import LayoutServer from './users/layout-server';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>users</title>
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <LayoutServer>{children}</LayoutServer>
        </Provider>
      </body>
    </html>
  );
}

