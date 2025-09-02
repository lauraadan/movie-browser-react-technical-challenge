import { CommonProps } from "../../../types/interfaces";
import { useAlert } from "../hooks/useAlert";

export default function Alert({ message }: CommonProps): JSX.Element | null {
  const { message: alertMessage } = useAlert();

  if (!alertMessage) return null;

  return <div className="alert">{alertMessage}</div>;
}
