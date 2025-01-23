import dynamic from "next/dynamic";
import styles from "./HeroSection.module.scss";
import { FileDown } from "lucide-react";

const UiButton = dynamic(() => import("../ui/UiButton"));

interface Props {
  title: string;
  subtitle: string;
  btnActionText: string;
  btnUrl: string;
  isActionExternal?: boolean;
}
export default function HeroSection({
  title,
  subtitle,
  btnActionText,
  btnUrl,
}: Props) {
  return (
    <section className={styles.hero_section}>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{subtitle}</p>
      <a href={`${btnUrl}`}>
        <UiButton>{btnActionText} </UiButton>
      </a>
    </section>
  );
}
