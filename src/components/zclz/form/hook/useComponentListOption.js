import { reactive, watch, ref, watchEffect } from 'vue';
import { queryListOptions } from '@/api/online/online-component';

export function useComponentListOption(props) {
  const innerOptions = ref([]);
  const optionIdMap = ref({});
  const optionValueMap = ref({});

  watchEffect(() => {
    if (Array.isArray(props.options)) {
      innerOptions.value = props.options;
    } else {
      if (props.params) {
        loadOptions();
      }
    }
  });

  watch(innerOptions, () => {
    optionValueMap.value = getOptionValueMap();
    optionIdMap.value = getOptionIdMap();
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

  function getOptionIdMap() {
    const map = new Map();
    for (const item of innerOptions.value) {
      map.set(item.id, item);
    }
    return map;
  }

  /** 选项数据值映射，key为value */
  function getOptionValueMap() {
    const map = new Map();
    for (const item of innerOptions.value) {
      map.set(item.value, item);
    }
    return map;
  }

  return { innerOptions, optionIdMap, optionValueMap };
}
