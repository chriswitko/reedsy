/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled.
   */
  build_dir: 'src/client/build',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests. 'locale' is containing location to translations
   */
  app_files: {
    js: [ 'src/client/src/**/*.js', '!src/client/src/**/*.spec.js', '!src/client/src/assets/**/*.js' ],
    jsunit: [ 'src/client/src/**/*.spec.js' ],

    atpl: [ 'src/client/src/app/**/*.tpl.html' ],
    ctpl: [ 'src/client/src/common/**/*.tpl.html' ],

    html: [ 'src/client/src/index.html' ],
    sass: 'src/client/src/sass/main.scss'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'node_modules/angular/angular.js',
      'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
      'node_modules/boostrap/dist/js/bootstrap.min.js',
      'node_modules/angular-toastr/dist/angular-toastr.tpls.js'
    ],
    css: [
      'node_modules/angular-toastr/dist/angular-toastr.css'
    ],
    assets: [
      'images/**/*.png'
    ]
  },
};
