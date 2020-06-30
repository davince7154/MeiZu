let gulp = require("gulp")
let htmlmin = require("gulp-htmlmin")
let unglify = require("gulp-uglify")
let babel = require('gulp-babel')

gulp.task("allMin", async () => {

    gulp.watch("./src/MeiZu/**/*", async () => {
        // html文件压缩
        let options = {
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        gulp.src("./src/MeiZu/html/*.html")
            .pipe(htmlmin(options))
            .pipe(gulp.dest("./dite/MeiZu/html/"))

        // css文件压缩
        gulp.src("./src/MeiZu/html/css/*.min.css")
            .pipe(gulp.dest("./dite/MeiZu/html/css/"))

        // js文件压缩
        gulp.src("./src/MeiZu/html/js/*.js")
            .pipe(babel({
                presets: ["@babel/env"]
            }))
            .pipe(unglify())
            .pipe(gulp.dest("./dite/MeiZu/html/js"))


        // php
        gulp.src("./src/MeiZu/server/*.php")
            .pipe(gulp.dest("./dite/MeiZu/server/"))

        // 图片压缩
        gulp.src('./src/MeiZu/html/images/*.{jpg,png}')

            .pipe(gulp.dest("./dite/MeiZu/html/images/"))
    })

})