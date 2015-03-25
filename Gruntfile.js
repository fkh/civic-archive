var request = require("request");

module.exports = function(grunt) {

require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
  pageres: {}
});

grunt.registerTask('run', 'Get some screenshots!', function() {
  
  var pages = { 
    google: {
      options: {
        url: 'google.com',
        sizes: ['1200x800'],
        dest: 'dist'
        }
      },
    openplans: {
      options: {
        url: 'openplans.org',
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
        
        // set up config for pageres
        var options = [];
        for (var page = 0; page < 5; page++) {
          options[page] = { url: projects[page]["homepage"], sizes: '1200x800', dest: 'dist' };
        };  
        
        // report back what's in the options config
        for (var bar = 0; bar < options.length; bar++) {
        //  console.log(options[bar]);
        }
        
        // make that the config for pageres
        for (var i = 0; i < 1; i++) {
           grunt.config.set('pageres', {foo: {options: options[i]}});
        };
         
        console.log(grunt.config['pageres']);
        
        done();
      }
  
      grunt.task.run(['pageres']);

    })
});

};