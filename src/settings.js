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

  /**
   * @type {string} sidemenu | topmenu
   * @description nav menu position
   */
  layout: 'sidemenu',

  /**
   * @type {string} dark | light
   * @description theme for nav menu
   */
  navTheme: 'light',

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
