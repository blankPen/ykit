var fs = require('fs')
var path = require('path')
var replaceStream = require('replacestream')

function CssEntryLoaderPlugin(options) {
	// Setup the plugin instance with options...
}

CssEntryLoaderPlugin.prototype.apply = function(compiler) {
	const entry = 'index.js',  // FIXME 应该为compiler.options.entry，是一个入口对象，需要解析和分析扩展名
		cmdPath = process.cwd(),
		entryFilePath = path.join(cmdPath, entry),
		cssRequiringStatement = 'require("./css/index.css")' // FIXME 应该为require( + css入口文件 + )

	compiler.plugin("compile", function(params) {
		if (typeof entry === 'string') {
			var logStream = fs.createWriteStream(entryFilePath, {'flags': 'a'});
			logStream.end(cssRequiringStatement);
		} else if (typeof entry === 'object') {
			// TODO parse object
			console.log('object');
		}
	});

    const tempFilePath = cmdPath + '/.temp'
	compiler.plugin("emit", function(params, callback) {
		var replaceStream = fs.createReadStream(entryFilePath)
                            .pipe(replaceStream(cssRequiringStatement, ''))
                            .pipe(fs.createWriteStream(tempFilePath))

        replaceStream.on('finish', function () {
            fs.createReadStream(c).pipe(fs.createWriteStream(entryFilePath))
            fs.unlinkSync(tempFilePath)
            callback()
        });
	})
};

module.exports = CssEntryLoaderPlugin;
