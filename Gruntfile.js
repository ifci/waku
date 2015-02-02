module.exports = function(grunt) {
    
    grunt.initConfig({
        
         pkg: grunt.file.readJSON('package.json'),
         
         transport : {
             waku : {
                 files : {
                     '.build' : ['./js/asyncbox.js','./js/jquery.SuperSlide.2.1.1.js','./js/jquery.imagezoom.min.js','./js/jquery.validate.min.js','./js/common.js']
                 }
             }
         },
         
         concat : {
             waku : {
                 files : {
                     'dist/plugins.js' : ['.build/js/asyncbox.js','.build/js/jquery.SuperSlide.2.1.1.js','.build/js/jquery.imagezoom.min.js','.build/js/jquery.validate.min.js','.build/js/common.js']
                 }
             }
         },
         uglify : {
             waku : {
                 files : {
                     'dist/plugins.min.js' : ['dist/plugins.js']
                 }
             }
         }
        
    });
    
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['transport','concat','uglify']);

    
};