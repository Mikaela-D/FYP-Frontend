import Link from "next/link";
import classes from "./MainNavigation.module.css";

function HomeIcon() {
  return (
    <div className={classes.homeIcon}>
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
        </svg>
      </Link>
    </div>
  );
}

export default HomeIcon;
