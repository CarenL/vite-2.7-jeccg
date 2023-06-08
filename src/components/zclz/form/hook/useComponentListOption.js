import { reactive, watch, ref, watchEffect, computed } from 'vue';
import { queryListOptions } from '@/api/online/online-component';

export function useComponentListOption(props) {
  const innerOptions = ref([]);

  watchEffect(() => {
    if (Array.isArray(props.options)) {
      innerOptions.value = props.options;
    } else {
      if (props.params) {
        loadOptions();
      }
    }
  });

  /** 加载选项数据 */
  async function loadOptions() {
    const queryString = typeof props.params === 'string' ? { value: props.params } : props.params;
    try {
      const res = await queryListOptions(queryString);
      innerOptions.value = res.result;
    } catch {
      innerOptions.value = [];
    }
  }

  const optionIdMap = computed(() => {
    const map = new Map();
    for (const item of innerOptions.value) {
      map.set(item.id, item);
    }
    return map;
  });

  /** 选项数据值映射，key为value */
  const optionValueMap = computed(() => {
    const map = new Map();
    for (const item of innerOptions.value) {
      map.set(item.value, item);
    }
    return map;
  });

  return { innerOptions, optionIdMap, optionValueMap };
}
