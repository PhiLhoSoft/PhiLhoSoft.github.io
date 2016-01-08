/* global hexo */

'use strict';

var deactivated = true;

var posthtml = require('posthtml');
var inlineAssets = require('posthtml-inline-assets');

//~ hexo.config.inlineSvg = Object.assign(
//~ {
//~ 	exclude: [ '*.min.html' ]
//~ }, hexo.config.inlineSvg);

hexo.extend.filter.register('after_render:html', inlineSvg);


function inlineSvg(str, data)
{
	if (deactivated) return str;

	var options = hexo.config.inlineSvg;
//~ 	var path = data.path;
//~ 	var exclude = options.exclude;
//~ 	if (exclude && !Array.isArray(exclude)) exclude = [exclude];

//~ 	if (path && exclude && exclude.length)
//~ 	{
//~ 	for (var i = 0, len = exclude.length; i < len; i++)
//~ 	{
//~ 	if (minimatch(path, exclude[i])) return str;
//~ 	}
//~ 	}
//~ console.log('hexo', hexo);
//console.log('data.path', data.path); // { text: '', path: '', engine: undefined, toString: true, onRenderEnd: [Function: tagFilter] }
	var modifiedHTML = '';

	var result = posthtml(
	[
		inlineAssets(
			{
				from: hexo.public_dir + '/to-remove',
				inline:
				{
					script: { check: function (node) { return false; } },
					style: { check: function (node) { return false; } },
					image:
					{
						check: function (node)
						{
							if (node.tag !== 'img' || !node.attrs)
								return false;
							if (node.attrs.src && !node.attrs.src.endsWith('svg'))
								return false;
		//~ 					console.log('node', node);
							var isOK = node.attrs.class && node.attrs.class.includes('inline-svg');
							if (!isOK)
								return false;
							console.log('check', isOK);
							return node.attrs.src;
						},
						then: function (node, data)
						{
		//					console.log('buffer', data.buffer);
		//					console.log('originalPath', data.originalPath);
							console.log('resolvedPath', data.resolvedPath);
		//					console.log('mimeType', data.mimeType);
							node.tag = 'svg';
							delete node.attrs;
							node.content = data.buffer.toString('utf8').replace(/^.*?<svg/, '<svg');
							console.log('node', node);
		//~ 					node.attrs.src = 'data:' + data.mime + ';base64,' + data.buffer.toString('base64');
						}
					}
				}
			}
		)
	])
	.process(str);
//	.then(function (result)
//	{
		//console.log('result', result);
		modifiedHTML = result.html;
//	});

	return modifiedHTML;
}
