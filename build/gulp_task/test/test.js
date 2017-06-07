var gulp = require("gulp");
var exec = require('child_process').exec;

gulp.task("test", function (done) {
    exec("npm test", function (err, stdout, stderr) {
        if(err){
            throw err;
        }

        console.log(stdout, stderr);

        done();
    });
});
