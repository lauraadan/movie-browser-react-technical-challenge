import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./app/App";
import { InitialDataProvider } from "./app/common/context/initialData";

export async function render(url: string, initial: any) {
  const html = renderToString(
    <InitialDataProvider value={initial}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </InitialDataProvider>
  );
  return html;
}
