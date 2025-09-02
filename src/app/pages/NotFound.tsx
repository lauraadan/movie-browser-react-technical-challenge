import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../common/constants/constants";

export default function NotFound(): JSX.Element {
  return (
    <div className="center">
      <p className="muted">This page does not exist.</p>
      <Link className="btn btn--primary" to={ROUTES.HOME}>
        Back home
      </Link>
    </div>
  );
}
