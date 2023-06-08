<template>
  <el-main>
    <gi-select v-model="selectValue" :params="params" filterable placeholder="测试" @change="changeValue"></gi-select>
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
  methods: {
    changeValue(value) {
      console.log(value);
    },
  },
};
</script>

<style></style>
