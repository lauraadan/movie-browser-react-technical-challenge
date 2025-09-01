import { MESSAGES } from "../../common/constants/constants";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function Error() {
  return (
    <div className="page center">
      <p className="muted">{MESSAGES.ERROR_GENERIC}</p>
    </div>
  );
}
