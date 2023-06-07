import { get, post } from '@/utils/request';

/** 查询表单组件列表选项 */
export function queryListOptions(params) {
  return get('/online/component/options', params);
}
