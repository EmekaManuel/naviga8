import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import styles from "./TopNav.module.scss";

import { useRouter } from "next/router";

const UiButton = dynamic(() => import("../ui/UiButton"));
const UiModal = dynamic(() => import("../ui/UiModal"));

export default function TopNav() {
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <nav className={styles.top_nav}>
      <div className={styles.top_nav_inner}>
        <Link title="logo" href="/">
          <p className="text-[25px] font-bold tracking-wide">Naviga8</p>
        </Link>
        {/* <ul className={styles.hide_in_mobile}>
          {routes.map((route, index) => (
            <li
              key={index}
              className={router.pathname === route.link ? styles.active : ""}
            >
              <Link title={route.name} href={route.link}>
                {route.name}
              </Link>
            </li>
          ))}
        </ul> */}
        <div className={styles.hide_in_large}>
          <UiButton
            variant="neutral"
            ariaLabel="Toggle mobile menu"
            onClick={() => setIsSidebarVisible(true)}
          >
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="vuesax/linear/menu">
                <g id="menu">
                  <path
                    id="Vector (Stroke)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.25 1C0.25 0.585786 0.585786 0.25 1 0.25H19C19.4142 0.25 19.75 0.585786 19.75 1C19.75 1.41421 19.4142 1.75 19 1.75H1C0.585786 1.75 0.25 1.41421 0.25 1Z"
                  />
                  <path
                    id="Vector (Stroke)_2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.25 6C0.25 5.58579 0.585786 5.25 1 5.25H19C19.4142 5.25 19.75 5.58579 19.75 6C19.75 6.41421 19.4142 6.75 19 6.75H1C0.585786 6.75 0.25 6.41421 0.25 6Z"
                  />
                  <path
                    id="Vector (Stroke)_3"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.25 11C0.25 10.5858 0.585786 10.25 1 10.25H19C19.4142 10.25 19.75 10.5858 19.75 11C19.75 11.4142 19.4142 11.75 19 11.75H1C0.585786 11.75 0.25 11.4142 0.25 11Z"
                  />
                </g>
              </g>
            </svg>
          </UiButton>
        </div>
        <div className={`${styles.action_btns} ${styles.hide_in_mobile}`}>
          <Link title="" href="/">
            <UiButton variant="secondary" textCasing="capitalize">
              <b>Get Started</b> for free!
            </UiButton>
          </Link>
        </div>
      </div>
      <div className={styles.hide_in_large}>
        <UiModal
          position="right"
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        >
          <ul>
            <li></li>
            <li>
              <Link href="/">Get Started</Link>
            </li>
          </ul>
        </UiModal>
      </div>
    </nav>
  );
}
