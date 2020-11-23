/* eslint-disable */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require("xml-js");
exports.default = (function (ins) {
    var options = ins.options;
    var isAtom = false;
    var isContent = false;
    var base = {
        _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
        rss: {
            _attributes: { version: "2.0" },
            channel: {
                title: { _text: options.title },
                link: { _text: options.link },
                description: { _text: options.description },
                pubDate: { _text: options.updated ? options.updated.toUTCString() : new Date().toUTCString() }
            }
        }
    };
    if (options.language) {
        base.rss.channel.language = { _text: options.language };
    }
    if (options.image) {
        base.rss.channel.image = {
            title: { _text: options.title },
            url: { _text: options.image },
            link: { _text: options.link }
        };
        base.rss.channel["snf:logo"] = {
            url: { _text: options.image }
        };
    }
    if (options.copyright) {
        base.rss.channel.copyright = { _text: options.copyright };
    }
    ins.categories.map(function (category) {
        if (!base.rss.channel.category) {
            base.rss.channel.category = [];
        }
        base.rss.channel.category.push({ _text: category });
    });
    var atomLink = options.feed || (options.feedLinks && options.feedLinks.atom);
    if (atomLink) {
        isAtom = true;
        base.rss.channel["atom:link"] = [
            {
                _attributes: {
                    href: atomLink,
                    rel: "self",
                    type: "application/rss+xml"
                }
            }
        ];
    }
    if (options.hub) {
        isAtom = true;
        if (!base.rss.channel["atom:link"]) {
            base.rss.channel["atom:link"] = [];
        }
        base.rss.channel["atom:link"] = {
            _attributes: {
                href: options.hub,
                rel: "hub"
            }
        };
    }
    base.rss.channel.item = [];
    ins.items.map(function (entry) {
        var item = {};
        if (entry.title) {
            item.title = { _text: entry.title };
        }
        if (entry.link) {
            item.link = { _text: entry.link };
        }
        if (entry.guid) {
            item.guid = { _text: entry.guid };
        }
        else if (entry.link) {
            item.guid = { _text: entry.link };
        }
        if (entry.date) {
            item.pubDate = { _text: entry.date.toUTCString() };
        }
        if (entry.description) {
            item.description = { _cdata: entry.description };
        }
        if (entry.content) {
            isContent = true;
            item["content:encoded"] = { _cdata: entry.content };
        }
        if (Array.isArray(entry.author)) {
            item.author = [];
            entry.author.map(function (author) {
                if (author.email && author.name) {
                    item.author.push({ _text: author.email + " (" + author.name + ")" });
                }
            });
        }
        if (entry.image) {
            item.enclosure = { _attributes: { url: entry.image } };
        }
        if (entry.mediaThumbnail) {
            // item["media:thumbnail"] = { 
            //     _attributes: {
            //         url: entry.mediaThumbnail
            //     }
            // };
            item["content:encoded"] = {
                _cdata: '<img src="' + entry.mediaThumbnail + '"><br>' + entry.content
            };
        }
        if (entry.advertisement) {
            item["snf:advertisement"] = {
                "snf:adcontent": {
                    _cdata: entry.advertisement
                }
            };
        }
        base.rss.channel.item.push(item);
    });
    return convert.js2xml(base, { compact: true, ignoreComment: true, spaces: 4 });
});
//# sourceMappingURL=rss2.js.map
