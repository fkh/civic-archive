var options = [];
var urls = [];

var request = require("request");

module.exports = function(grunt) {

require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
  pageres: {
    google: {
      options: {
        url: '<%= pics %>',
        sizes: ['1200x800'],
        dest: 'dist'
      }
    }
  }
});

grunt.registerTask('run', 'Get some screenshots!', function() {

  var pages = { 
    google: {
      options: {
        url: 'google.com',
        sizes: ['1200x800'],
        dest: 'dist'
        }
      }
  }
    
  var done = this.async();

  var url = "http://projects.betanyc.us/projects"

  request({
    url: url,
    headers: {
      'User-Agent': 'request' 
    }
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        all = JSON.parse(body);
        
        // get the projects with a listed homepage only
        var projects = all.filter(function(n){ return n.homepage});
        console.log(projects.length);
        
        // set up config for pageres
        for (var page = 0; page < 5; page++) {
          // options[page] = { url: projects[page]["homepage"], sizes: ['1200x800'], dest: 'dist' };
          urls[page] = projects[page]["homepage"];
        };  
        
        done();

      }

    })

    // make that the config for pageres
      grunt.config.set('pics', urls);
      grunt.task.run(['pageres']);

});

};