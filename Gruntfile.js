// https://github.com/spatools/grunt-html-build
module.exports = function(grunt) {

  var path = require("path");


  // grunt tasks
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-sass');

  grunt.loadNpmTasks('grunt-protractor-runner');


  // setup grunt
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          port: 3001,
          base: "target",
          hostname: "localhost",
          open: false
        }
      }
    }, // connect

    karma: {
      options: {
        configFile: './config/karma-config.js'
      },

      // continuous with only test results and no coverage
      "dev": {
        reporters: ["progress"]
      },

      // single run with code coverage results and test results as html
      "prod": {
        reporters: [ 'mocha', 'specjson', 'htmlDetailed', 'coverage' ],

        coverageReporter: {
          reporters:[
            {type: 'text'},
            {type: 'html'}
          ],
          dir : 'target/test-output/coverage'
        },

        specjsonReporter: {
          outputFile: './target/test-output/test-results.json'
        },

        htmlDetailed: {
          dir : 'target/test-output/html',
          splitResults: false
        },

        singleRun: true
      }
    },

    protractor: {
      e2e: {
        options: {
          webdriverManagerUpdate: true,
          configFile: "./config/protractor-config.js",
          keepAlive: true,
          noColor: false,
          webdriverManagerUpdate: true,
          args: {
            verbose: true,
            includeStackTrace: true
          }
        }
      }
    },

    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      bundles: {
        files: [
          'target/js/**/*'
        ]
      },
      styles:  {
        files: [
          "app/*/scss/**/*"
        ],
        tasks: ["sass"]
      },
      indexHtml: {
        files: [
          "app/*/*.html"
        ],
        tasks: ["build-html"]
      }
    },

    eslint: {
      target: ['app/**/*.js', 'config/**/*.js', 'Grunfile.js']
    },

    clean: {
      target: ["target"]
    },

    htmlbuild: {
      files: {
        src: "./app/index.html",
        dest: "target/index.html"
      },
      options: {
        beautify: true,
        relative: true,
        data: {
          version: require("./package.json").version,
          build_time: new Date().getTime().toString()
        }
      }
    },

    sass: {
      files: { },
      options: {
        sourceMap: true
      }
    },

    browserify: {
      dist: {
        files: {
          'target/js/bundle.js': 'app/ts/main.ts'
        },
        options: {
          plugin: [["tsify"]],
          transform: ["stringify"],
          watch: true,
          browserifyOptions: {
            debug: true
          }
        }      
      }
    }
  });

  // -------------------------------------------------------------------------------------------
  // Default task for development | grunt
  // -------------------------------------------------------------------------------------------
  grunt.registerTask("default", function(){
    grunt.task.run(
      "clean:target",
      "eslint",
      "htmlbuild",
      "sass",
      "browserify",
      "connect",
      "watch"
    );
  });

  // -------------------------------------------------------------------------------------------
  // Test | grunt test | grunt test:dev
  // -------------------------------------------------------------------------------------------
  var testHelpText = "Run karma unit tests. Usage:";

  testHelpText+= "\n\n'grunt test' -> Single run of all unit tests with code coverage, html and json output saved at '[target]/test-results'";
  testHelpText+= "\n\n'grunt test:dev' -> Development mode, run the tests updating the result on every file modification.";
  testHelpText+= "\n   Options:";
  testHelpText+= "\n   -nobrowser -> Connect a real browser instead of using phantomjs. Open http://localhost:9876 to connect your browser.";
  testHelpText+= "\n   -singlerun -> Run all tests and exit.";

  grunt.registerTask("test", testHelpText,  function(arg1){
    grunt.log.writeln("----------------------------------------------------------------------------");
    grunt.log.writeln(testHelpText);
    grunt.log.writeln("----------------------------------------------------------------------------");

    setupDefaultOptions();

    if (arg1 === "dev"){
      var config = grunt.config.get("karma.dev");

      config.browsers = grunt.option('nobrowser') ? [] : ["PhantomJS"];
      config.singleRun = grunt.option('singlerun') && grunt.option('singlerun') != 'false';

      grunt.config.set("karma.custom_dev", config);
      grunt.task.run("karma:custom_dev");
    } else if( arg1 === "e2e" ) {
      grunt.task.run("test-e2e");
    } else {
      grunt.task.run("karma:prod");
      grunt.task.run("test-e2e");
    }
  });

  // -------------------------------------------------------------------------------------------
  // End-to-end testing task | grunt test:e2e
  // -------------------------------------------------------------------------------------------
  grunt.registerTask("test-e2e", function(){
    setupDefaultOptions();
    grunt.task.run(
      [ "clean:target",
    		"eslint",
    		"htmlbuild",
        "sass",
        "browserify",
    		"connect",
        "protractor:e2e"
       ]
    );
  });
};