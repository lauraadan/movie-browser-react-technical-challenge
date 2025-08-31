import { useAlert } from "../hooks/useAlert";

export default function Alert() {
  const { message } = useAlert();

  if (!message) return null;

  return <div className="alert">{message}</div>;
}
