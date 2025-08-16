import Image from "next/image";
import styles from "./page.module.css";
import RootLayout from "./layout";
import { store } from "@/store/store";
import UsersPage from "./users/users";

export default function Home() {
  return (
   <RootLayout>
    <UsersPage></UsersPage>
   </RootLayout>
  );
}
