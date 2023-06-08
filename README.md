# ZCLZ-ROCKET V1.1

本项目采用vue2.7和vite技术，UI框架采用element-UI，使用pinia进行状态管理。

### 项目安装启动

```sh
npm install
```

### 本地启动

```sh
npm run dev
```

### 打包

```sh
npm run build
```

```
vue2.7-vite-admin
├─ .env.development
├─ .env.production
├─ .editorconfig   *** 书写规范配置及编辑器设置 ***
├─ .eslintignore
├─ .eslintrc.js
├─ .prettierignore
├─ .prettierrc.js
├─ .stylelintignore
├─ postcss.config.js
├─ jsconfig.json
├─ .stylelintrc.js *** 书写规范配置及编辑器设置 ***
├─ index.html
├─ mock   模拟数据
├─ package-lock.json
├─ package.json
├─ public  静态资源
├─ README.md
├─ src
│  ├─ api
│  ├─ App.vue
│  ├─ assets
│  ├─ cas  单点登录
│  ├─ components  公共组件
│  │  ├─ SvgIcon
│  │  ├─ ThemePicker
│  │  └─ zclz
│  │     └─ form  表单组件
│  ├─ config
│  │  ├─ globalParams.js  页面logo及版权配置
│  │  └─ index.js
│  ├─ icons  svg存放
│  ├─ layouts   页面布局组件
│  │  ├─ components
│  │  ├─ RouterView.vue  二级以上路由使用
│  │  └─ TabLayout.vue  主页面布局
│  ├─ main.js
│  ├─ permission.js  路由权限
│  ├─ piniaStores   pinia状态管理
│  ├─ router  路由
│  ├─ settings.js  页面设置
│  ├─ store  vuex暂不使用
│  ├─ styles  样式
│  ├─ utils  工具函数
│  └─ views  页面
└─ vite.config.js

```

### 书写规范
整体样式由prettier插件控制，详情请见文件prettierrc.js，开启保存自动格式化
+ 文件命名方式
  页面文件使用小写，js文件使用驼峰命名，组件使用大写字母开头
+ css
  使用sass编译，每写完一个类样式空一行，书写样式属性时，按照一定规律，大小-位置-边框-字体-背景，样式多个关键词命名样式时使用"-"连字符。
   ```css
   .test{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    border: 1px solid #fff;
    font-size: 14px;
    color: #000;
    background-color:#f00;
    //空一行写下一个样式
    .detail-des{
      ...
    }
   }
   ```

+ template
尽量不使用行内样式绑定，如有必要可使用vue3新特性，在template中绑定class，css中渲染实例中定义的样式属性，无子元素的标签采用自闭和写法。
  ```html
  <template>
    <div>
      <div :class="$style.test">css变量绑定</div>
    </div>
  </template>
  ```
  ```javascript
  <script>
  export default{
    data() {
      return {
        color: #fff;
      }
    }
  }
  </script>
  ```

  ```css
  <style module>
  .test {
    width: 100px;
    height: 100px;
    margin: 10px;
    color: v-bind(color);
    background: #f00;
  }
  </style>
  ```
  在SFC中使用v-bind做样式绑定时，注意兼容性，v-bind采用底层var语法，有些浏览器不支持，如果想用主题色，可使用以下兼容写法。
    ```css
  <style lang='scss'>
  @import '@/styles/variables.module.scss';
  $primary-color:$--color-primary;
  $primary-color:var(--primary-color,$--color-primary);

  .test {
    width: 100px;
    height: 100px;
    margin: 10px;
    color: $primary-color;
    background: #f00;
  }
  </style>
  ```

+ script
  使用vue3的新特性时，可选择两种方式。
  ```javascript
  <script>
    export defalt{
      name:'GiSelect'
      setup() {
        ...
        return {...};
      }
    }
  </script>
  ```

  ```javascript
  <script setup>
    defineOptions({
      name: 'GiSelect',
    });
  </script>
  ```

### 页面参数配置

+ logo及版权参数配置
  ```
  ├─ src
  ...
  │  ├─ config
  │  │  ├─ globalParams.js
  ```
  ```javascript
    TITLE: '一站式绿色金融服务平台',
    SHORT_TITLE: '中财绿指',
    OWNER: '中财绿指',
    COPYRIGHT: 'Copyright © 2023 中财绿指 版权所有',
    LOGO_URL: 'logo.svg',
    LONG_LOGO_URL: 'logo_long.svg',
    DARK_LOGO_URL: 'logo_dark.svg',
    DARK_LONG_LOGO_URL: 'logo_long_dark.svg',
    SSO: false,
  ```
+ 主题色及导航菜单栏设置
  ```
  ├─ src
  ...
  │  ├─ styles
  │  │  ├─ variables.module.scss
  ```  
可配置主题色及导航栏样式

+ 页面配置
```
├─ src
...
├─ settings.js
```   
可设置页面配置开关、导航栏布局、是否固定页头、是否展示tagsview

### git提交规范
dev分支作为主开发分支，master分支作为线上分支，所有新开发的功能先拉dev，在这个分支上新建新分支，开发自测完成之后再合并到dev上，合并前确认是否有冲突，解决冲突之后再合并,每次提交必须填写本次所涉及的修改信息，提交规范如下
```
<type>: <message>
```
type类型如下
+ feat：新功能（feature）。
+ fix：修复bug。
+ docs：文档。
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
+ perf：优化相关，比如提升性能、体验。
+ chore：构建过程或辅助工具的变动。
+ merge：代码合并。
+ sync：同步主线或分支的Bug。
  
message
本次提交信息描述，不超过50字。