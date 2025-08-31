import { MESSAGES } from "../../common/constants/constants";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function Error({ onRetry }: Props) {
  return (
    <div className="page center">
      <p className="muted">{MESSAGES.ERROR_GENERIC}</p>
      {onRetry && (
        <button
          className="btn btn--primary"
          onClick={onRetry}
          style={{ marginTop: "16px" }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
