/** 初始化全局配置 */
import axios from 'axios';

import { pageParams } from '@/config/globalParams';

/** LOGO 路径的 KEY 数组，使用 _getLogoUrl 方法取值 */
const LOGO_URL_KEYS = ['LOGO_URL', 'LONG_LOGO_URL', 'DARK_LOGO_URL', 'DARK_LONG_LOGO_URL'];

for (const [k, v] of Object.entries(pageParams)) {
  if (LOGO_URL_KEYS.includes(k)) {
    window._CONFIG[k] = _getLogoUrl(v);
  } else {
    window._CONFIG[k] = v;
  }
}
/** TODO: @deprecated 后端静态文件路径 */
window._CONFIG['staticDomainURL'] = `${import.meta.env.VITE_APP_API_BASE_URL}/sys/common/static`;

/** 加载外部配置文件 */
export async function initConfig() {
  const instance = axios.create({
    baseURL: '/',
    timeout: 30000, // 请求超时时间
  });
  const getConfig = async (url) => {
    try {
      const res = await instance.get(url);
      return res.data || {};
    } catch (err) {
      return {};
    }
  };
  // 优先级从低到高
  let configs = [];
  configs.push(getConfig(`${import.meta.env.VITE_APP_PUBLIC_PATH}config.json`));
  configs.push(getConfig(`${import.meta.env.VITE_APP_CONFIG_PATH}vue_app_config.json`));
  try {
    configs = await Promise.all(configs);
    console.log('--- external config ---', configs);
    for (const config of configs) {
      for (const [k, v] of Object.entries(config)) {
        if (v != null) {
          if (LOGO_URL_KEYS.includes(k)) {
            window._CONFIG[k] = _getLogoUrl(`${v}`);
          } else {
            window._CONFIG[k] = `${v}`;
          }
        }
      }
    }
    // 更新 title
    document.title = window._CONFIG['TITLE'];
    // 更新 favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = window._CONFIG['LOGO_URL'];
    document.getElementsByTagName('head')[0].appendChild(link);
  } catch (err) {}
}

function _getLogoUrl(logoUrl) {
  if (
    ['http://', 'https://', import.meta.env.VITE_APP_PUBLIC_PATH, import.meta.env.VITE_APP_CONFIG_PATH].some((item) =>
      logoUrl.startsWith(item),
    )
  ) {
    return logoUrl;
  }
  return `${import.meta.env.VITE_APP_PUBLIC_PATH}${logoUrl}`;
}
