import { Link, useLocation } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useRef } from "react";
export default function NotFoundPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 PAGE NOT FOUND</h1>
      <p className={css.text}>
        Sorry, the page you were trying to access does not exist.
      </p>
      <Link to={backLinkRef.current}>
        <button> Go Home</button>
      </Link>
    </div>
  );
}
