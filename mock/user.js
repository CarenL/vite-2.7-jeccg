import Mock from 'mockjs';
const tokens = {
  admin: {
    token: 'admin-token',
    userInfo: {
      realname: '管理员',
      username: 'admin',
    },
    sysAllDictItems: {},
  },
  editor: {
    token: 'editor-token',
    userInfo: {
      realname: '普通成员',
      username: 'editor',
    },
    sysAllDictItems: {},
  },
};

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    allAuth: [
      {
        action: 'gld:greenLoan:keyword',
        describe: '设置关键词',
        status: '1',
        type: '1',
      },
    ],
    auth: [
      {
        action: 'gld:greenLoan:review',
        describe: '审核关键词',
        type: '1',
      },
    ],
    menu: [
      {
        path: '/',
        component: 'layouts',
        redirect: '/home',
        meta: {
          title: '主页',
        },
        children: [
          {
            path: '/home',
            name: 'Home',
            component: 'home/index',
            meta: {
              title: '主页',
              icon: 'nested',
            },
          },
        ],
      },
      {
        name: 'Form',
        path: '/from',
        component: 'layouts',
        meta: {
          title: '表单',
        },
        children: [
          {
            path: 'form1',
            name: 'Form1',
            component: 'form/form1',
            meta: {
              title: '表单1',
              icon: 'form',
              internalOrExternal: false,
              keepAlive: false,
            },
          },
          {
            path: 'form2',
            name: 'Form2',
            component: 'form/form2',
            meta: {
              title: '表单2',
              icon: 'form',
              internalOrExternal: false,
              keepAlive: false,
            },
          },
        ],
      },
    ],
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    allAuth: [
      {
        action: 'gld:greenLoan:keyword',
        describe: '设置关键词',
        status: '1',
        type: '1',
      },
    ],
    auth: [
      {
        action: 'gld:greenLoan:review',
        describe: '审核关键词',
        type: '1',
      },
    ],
    menu: [
      {
        path: '/',
        component: 'layouts',
        redirect: '/home',
        meta: {
          title: '主页',
        },
        children: [
          {
            path: '/home',
            name: 'Home',
            component: 'home/index',
            meta: {
              title: '主页',
              icon: 'nested',
            },
          },
        ],
      },
      {
        name: 'Chart',
        path: '/chart',
        component: 'layouts',
        meta: {
          title: '图表',
        },
        children: [
          {
            path: 'bar',
            name: 'Bar',
            component: 'echart/bar',
            meta: {
              title: '柱状图',
              icon: 'el-icon-s-data',
              internalOrExternal: false,
              keepAlive: false,
            },
          },
          {
            path: 'pie',
            name: 'Pie',
            component: 'echart/pie',
            meta: {
              title: '饼状图',
              icon: 'el-icon-s-help',
              internalOrExternal: false,
              keepAlive: false,
            },
          },
        ],
      },
    ],
  },
};

const randomImage = Mock.mock('@image(140x50)');

export default [
  {
    url: `/sys/randomImage`,
    method: 'get',
    response: (config) => {
      // mock error
      if (!config) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
        };
      }
      return {
        code: 200,
        result: randomImage,
      };
    },
  },
  // user login
  {
    url: `/sys/login`,
    method: 'post',
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
        };
      }

      return {
        code: 200,
        result: token,
      };
    },
  },

  // get user info
  {
    url: `/sys/permission/getUserPermissionByToken`,
    method: 'get',
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
        };
      }

      return {
        code: 200,
        result: info,
      };
    },
  },

  // user logout
  {
    url: `/sys/logout`,
    method: 'post',
    response: (_) => {
      return {
        code: 200,
        result: 'success',
      };
    },
  },
];
