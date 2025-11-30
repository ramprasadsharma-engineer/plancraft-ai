/// <reference types="vite/client" />

interface Window {
  $zoho?: {
    salesiq: {
      floatwindow: {
        visible: (state: "show" | "hide") => void;
      };
      visitor: {
        info: (data: Record<string, string>) => void;
      };
    };
  };
}
