export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

let counter = 0;

export const useToast = () => {
  const toasts = useState<Toast[]>("toasts", () => []);

  const dismiss = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const show = (message: string, variant: ToastVariant = "info") => {
    const id = `toast-${counter++}`;
    toasts.value = [...toasts.value, { id, message, variant }];
    return id;
  };

  return {
    toasts,
    dismiss,
    toast: show,
    success: (message: string) => show(message, "success"),
    error: (message: string) => show(message, "error"),
    info: (message: string) => show(message, "info"),
  };
};