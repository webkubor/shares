/*
 * @Date: 2022-03-22 09:22:56
 * @LastEditTime: 2024-12-19 10:26:02
 */

  declare global {
    interface Window {
      $toast?: { success: (message: string) => void };
      $logger?: {
        info: (title: string, content: string) => void;
        error: (title: string, content: string) => void;
        warning: (title: string, content: string) => void;
        success: (title: string, content: string) => void;
        picture: (url: string, scale?: number) => void;
      };
      $message?: {
        success: (message: string | { content: string; color?: string }) => void;
        warning: (message: string | { content: string; color?: string }) => void;
        error: (message: string | { content: string; color?: string }) => void;
        info?: (message: string | { content: string; color?: string }) => void;
      };
    }
  }
  
