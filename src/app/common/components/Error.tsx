import { MESSAGES } from "../../common/constants/constants";

export default function Error(): JSX.Element {
  return (
    <div className="page center">
      <p className="muted">{MESSAGES.ERROR_GENERIC}</p>
    </div>
  );
}
