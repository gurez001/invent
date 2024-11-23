import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

type UseToastHandlerProps = {
  error: unknown;
  isSuccess: boolean;
  successMessage: string;
  redirectPath?: string;
};

export function useHandleNotifications({
  error,
  isSuccess,
  successMessage,
  redirectPath,
}: UseToastHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    }

    if (isSuccess) {
      toast.success(successMessage);
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
  }, [error, isSuccess, successMessage, redirectPath, router]);
}

