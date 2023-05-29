export default {
  title: '一站式绿色金融服务平台',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  theme: '#18b1b1', //主题色

  /**
   * @type {string} sidemenu | topmenu
   * @description nav menu position
   */
  layout: 'sidemenu',

  /**
   * @type {string} Fluid | Fixed
   * @description layout of content, only works when layout is topmenu
   */
  contentWidth: 'Fixed',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description sticky siderbar
   */
  fixSiderbar: false,

  /**
   * @type {boolean} true | false
   * @description auto hide header
   */
  autoHideHeader: false,

  /**
   * @type {boolean} true | false
   * @description
   */
  colorWeak: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,

  /* 导航栏样式配置 */
  menu: {
    menuText: '#bfcbd9',
    menuActiveText: '#409EFF',
    subMenuActiveText: '#f4f4f5',
    menuBg: '#304156',
    menuHover: '#263445',
    subMenuBg: '#1f2d3d',
    subMenuHover: '#001528',
    sideBarWidth: 210,
  },

  /**
   * @type {object}
   * @description vue-ls options
   */
  localStorageOptions: {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
  },
  sessionStorageOptions: {
    namespace: 'vuejs__', // key prefix
    name: 'ss', // name variable Vue.[ss] or this.[$ss],
    storage: 'session', // storage name session, local, memory
  },
};
