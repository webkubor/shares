/*
 * @Date: 2022-03-22 09:22:56
 * @LastEditTime: 2024-12-06 12:03:26
 */

import type {
    LoadingBarProviderInst,
    DialogProviderInst,
    MessageProviderInst,
    NotificationProviderInst
  } from 'naive-ui';
  
  declare global {
    interface Window {
      $logger?: {
        info: (title: string, content: string) => void;
        error: (title: string, content: string) => void;
        warning: (title: string, content: string) => void;
        success: (title: string, content: string) => void;
        picture: (url: string, scale?: number) => void;
      };
      $loadingBar?: LoadingBarProviderInst;
      $dialog?: DialogProviderInst;
      $message?: MessageProviderInst;
      $notification?: NotificationProviderInst;
    }
  }
  