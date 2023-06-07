<template>
  <el-main>
    <gi-select v-model="selectValue" :params="params"></gi-select>
  </el-main>
</template>

<script>
export default {
  name: 'DemoForm',
  data() {
    return {
      selectValue: 'table',
      params: 'test',
      options: [
        {
          value: 'test1',
          label: '测试',
        },
      ],
    };
  },
  watch: {
    selectValue(val) {
      console.log(val);
    },
  },
};
</script>

<style></style>
