const gulp = require("gulp");
const watch = require("gulp-watch");
const browserSync = require("browser-sync").create();

// Static server
gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("src/**/index.js").on("change", () => {
    browserSync.reload();
    console.log(`reloading ${new Date()}`);
  });
});
