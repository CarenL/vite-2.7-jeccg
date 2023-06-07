<template>
  <div class="gi-select" :class="{ readonly }">
    <el-select
      v-model="innerValue"
      :placeholder="placeholder"
      :disabled="disabled || readonly"
      :multiple="multiple"
      :clearable="clearable"
      :multiple-limit="multipleLimit"
      :collapse-tags="collapseTags"
      :popper-append-to-body="false"
      v-bind="$attrs"
      v-on="{ ...$listeners }"
    >
      <el-option
        v-for="(item, index) in innerOptions"
        :key="index"
        :disabled="item.disabled"
        :value="item.value"
        :label="item.label"
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
});
// 定义props
const props = defineProps({
  /** v-model 绑定值 */
  value: {
    type: [String, Number, Array],
  },
  /** 占位符提示信息 */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 是否多选 */
  multiple: {
    type: Boolean,
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
  /** 是否允许清除 */
  clearable: {
    type: Boolean,
    default: true,
  },
  /** 最多选择的数量 */
  multipleLimit: {
    type: Number,
    default: 3,
  },
  /* 多选时是否折叠选中的多个值 */
  collapseTags: {
    type: Boolean,
    default: false,
  },
});

// v-model处理 v2.7默认绑定value
const emit = defineEmits(['update:value']);
const innerValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  },
});

const { innerOptions } = useComponentListOption(props);
console.log(innerOptions);

//选项值
</script>

<style></style>
