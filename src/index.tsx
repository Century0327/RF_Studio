import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import App from "./app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, marginBottom: 16 }}>页面出错了</h1>
            <p style={{ color: '#666', marginBottom: 16 }}>{error?.message || '未知错误'}</p>
            <button
              onClick={resetErrorBoundary}
              style={{ padding: '8px 24px', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer', background: '#fff' }}
            >
              重新加载
            </button>
          </div>
        )}
      >
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);