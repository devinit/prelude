export interface IProcess {
    browser: boolean;
    env: any & { // add by webpack
      PORT?: number,
      NODE_ENV?: string;
    };
  }
export const isMobile = (process: IProcess) => {
    if (!process.browser) return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};
