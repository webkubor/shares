/*
 * @Date: 2022-03-22 09:22:56
 * @LastEditTime: 2022-03-30 10:18:27
 */

import type {
    LoadingBarProviderInst,
    DialogProviderInst,
    MessageProviderInst,
    NotificationProviderInst
  } from 'naive-ui';
  
  declare global {
    interface Window {
      $loadingBar?: LoadingBarProviderInst;
      $dialog?: DialogProviderInst;
      $message?: MessageProviderInst;
      $notification?: NotificationProviderInst;
    }
  }
  