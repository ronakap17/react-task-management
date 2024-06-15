import { toast, ToastContent, ToastOptions, TypeOptions } from 'react-toastify';

export const notify = (content: ToastContent, type: TypeOptions = 'info', options: ToastOptions = {}) => {
  toast.dismiss();

  toast(content, { type, delay: 150, ...options });
};
