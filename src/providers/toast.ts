import { toast } from 'react-toastify';

interface AlertMessageProps {
  message: string;
  type?: 'success' | 'error' | 'warn' | 'info';
  className?: string;
}

export const ShowAlert = ({ message, type, className }: AlertMessageProps) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className,
      });
      break;
    case 'error':
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className,
      });
      break;
    case 'warn':
      toast.warn(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className,
      });
      break;
    case 'info':
      toast.info(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className,
      });
      break;

    default:
      toast.info(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        className,
      });
      break;
  }

  //   toast('Custom Style Notification with css class!', {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     className: 'foo-bar',
  //   });
};
