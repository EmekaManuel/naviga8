import Image from "next/image";
import styles from "./UiAvatar.module.scss";

interface Props {
  avatar: any;
}
export default function UiAvatar({ avatar }: Props) {
  return <Image src={avatar} className={styles.avatar} alt=" image" />;
}
