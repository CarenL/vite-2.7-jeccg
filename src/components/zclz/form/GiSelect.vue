<template>
  <div class="gi-select" :class="{ readonly }">
    <el-select
      v-model="innerValue"
      :multiple="multiple"
      :disabled="disabled || readonly"
      :title="title"
      v-bind="$attrs"
      v-on="{ ...$listeners }"
    >
      <el-option
        v-for="(item, index) in innerOptions"
        :key="index"
        :disabled="item.disabled"
        :value="item.value"
        :label="item.label"
        :title="item.title"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useComponentListOption } from './hook/useComponentListOption';
defineOptions({
  name: 'GiSelect',
  inheritAttrs: false, //属性透传自定义
});

// 定义props(已定义不会透传，disabled,multiple为了响应赋值)
const props = defineProps({
  /** v-model 绑定值 */
  value: {
    type: [String, Number, Array],
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /* 多选 */
  multiple: {
    type: [Boolean, String],
    default: false,
  },
  /** 选项数据 */
  options: {
    type: Array,
    default: null,
  },
  /** 选项数据的参数 */
  params: {
    type: [String, Object],
    default: null,
  },
});

// v-model处理 v2.7默认绑定value
const emit = defineEmits(['update:value']);
const innerValue = computed({
  get() {
    if (props.multiple === '' || props.multiple) {
      //多选情况下值以,连接
      if (typeof props.value === 'string') {
        return props.value ? props.value.split(',') : [];
      } else {
        return Array.isArray(props.value) ? props.value : [];
      }
    } else {
      return props.value ? props.value : null;
    }
  },
  set(value) {
    emit('update:value', value);
  },
});

const { innerOptions, optionValueMap } = useComponentListOption(props);

const title = computed(() => {
  if (!innerValue.value) {
    return '';
  }
  let selectOption = null;
  if (Array.isArray(innerValue.value)) {
    selectOption = innerValue.value.map((item) => optionValueMap.value.get(item));
  } else {
    selectOption = [optionValueMap.value.get(innerValue.value)];
  }
  return selectOption.map((item) => (item ? item.title : '')).join(',');
});

//选项值
</script>

<style lang="scss" scoped>
.gi-select {
  display: inline-block;
  &.readonly {
    :deep(.el-select__tags-text) {
      color: #909399;
    }
    :deep(.el-input.is-disabled .el-input__inner) {
      color: #606266;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      cursor: not-allowed;
    }
  }
}
</style>
