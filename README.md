# Mobile Photo Viewer

It's photo viewer for mobile like smart phone. It has scrolled thumbnail and lazy loading also provide full screen mode. 
Gracias.

## Dependencies

* [Jindo Framework](http://jindo.nhncorp.com/jindo_home/JindoJS.html) which is made by NHN
* [Jindo Mobile Component](http://jindo.nhncorp.com/jindo_home/Mobile.html) which is made by NHN also

## Be used for

* [Naver Auto Mobile Site.](http://m.auto.naver.com/car/image.nhn?yearsId=18591&selectIndex=1)

## Mobile Supported Plaforms
* iOS : 3.0, 4.3.3, 5.0, 6.0
* Android : 2.2, 2.3, 3.1, 4.0

## Data Protocol

It's JSON. The first depth is the index of images and second depth are thumbnail and image's url.
```json
{
	"1" : {
			"sThumb" : "thumbnail image url",
			"sImg" : "full sized image url"
		},
	"2" : {
			"sThumb" : "thumbnail image url",
			"sImg" : "full sized image url"
		}
}
```

MPV(Mobile Photo Viewer) send 'sNoDataIndex' parameter to the server to get json data.
```
http://example/index.nhn?sNoDataIndex=55,56,57,1,2,3,4,5,6,7
```
The indexed are not consecutive numbers. It's depend on user's control. Think about thumbail scrolling. It's not load all the images. This smart MPV will load what user want to see.

## How to use

Common js files you need to include. The current version of Jindo is 2.5.0 and JMC(Jindo Mobile Component) is 1.6.0
```html
<link rel="stylesheet" type="text/css" href="./css/jindo.m.PhotoViewer.css" />
<script type="text/javascript" charset="utf-8" src="./lib/jindo.mobile.min.ns.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/jindo.m.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/jindo.m.Component.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/jindo.m.UIComponent.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/jindo.m.Touch.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/jindo.m.Scroll.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/jindo.m.Flicking.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/flicking/jindo.m.FlickingAnimation.js"></script>
```

if you want big scale of scroll, include below js file
```html
<script type="text/javascript" charset="utf-8" src="./lib/scroll/jindo.m.DynamicPlugin.js"></script>
```

Choose a js file that you want for flicking, normally jindo.m.SlideFlicking.js is fine.
```html
<script type="text/javascript" charset="utf-8" src="./lib/flicking/jindo.m.AlignFlipFlicking.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/flicking/jindo.m.CoverFlicking.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/flicking/jindo.m.FlipFlicking.js"></script>
<script type="text/javascript" charset="utf-8" src="./lib/flicking/jindo.m.SlideFlicking.js"></script>
```

### Example 1 : just html file with data

example001.html
```html
<div id="_mpv">
</div>
<script type="text/javascript" charset="utf-8" src="./src/jindo.m.PhotoViewer.js"></script>
<script type="text/javascript">
	var htData = {/* data */};
	var woMpv = new jindo.m.PhotoViewer({
		sViewerId : '_mpv',
		nMaxImageCount : 20,
		htThumbSize : { nWidth : 70, nHeight: 50 },
		htPhotoSize : { nWidth : 600, nHeight: 399 },
		htData : htData
	});
</script>
```

### Example 2 : html file with just Ajax

example002.html
```html
<div id="_mpv">
</div>
<script type="text/javascript" charset="utf-8" src="./src/jindo.m.PhotoViewer.js"></script>
<script type="text/javascript">
	var woMpv = new jindo.m.PhotoViewer({
		sViewerId : '_mpv',
		nMaxImageCount : 145, 
		htThumbSize : { nWidth : 70, nHeight: 50 },
		htPhotoSize : { nWidth : 600, nHeight: 399 },
		sAjaxUrl : 'http://m.auto.naver.com/api/car/yearsCarImg.nhn'
	});
</script>
```

### Example 3 : html file with some data and Ajax

example003.html : this case is much faster than others.
```html
<div id="_mpv">
</div>
<script type="text/javascript" charset="utf-8" src="./src/jindo.m.PhotoViewer.js"></script>
<script type="text/javascript">
	var htData = {/* part of data */};
	var woMpv = new jindo.m.PhotoViewer({
		sViewerId : '_mpv',
		nMaxImageCount : 145,
		htThumbSize : { nWidth : 70, nHeight: 50 },
		htPhotoSize : { nWidth : 600, nHeight: 399 },
		sAjaxUrl : 'http://m.auto.naver.com/api/car/yearsCarImg.nhn',
		htData : htData
	});
</script>
```

## Options

These are all the options for MPV. You can utilize it.
```javascript
{
	sViewerId : '', // MPV Element Id
	sCurrentPageId : '', // Current Page Element Id, it's depend on bUseTitleAndPaging option.
	bUseTitleAndPaging : true, // if you want to use and show up the number of current page.
	nMaxImageCount : 0, // Max image count, it's important. 
	htThumbSize : { nWidth : 0, nHeight : 0 }, // Thumbail size, it's important.
	nPreLoadDataLeftRight : 5, // when using ajax, load data more, for example, |oooooooooo| here 10 thumbnails(browser width) will be load ooooo|oooooooooo|ooooo
	htPhotoSize : { nWidth : 0, nHeight : 0 }, // Image size, it's important.
	sAjaxUrl : '', // Ajax url if you don't need, just ignore.
	htAjaxParam : {}, // It's ajax parameters. It should be hash table.
	htData : {}, // It's data of MPV, see the protocol above.
	nStartIndex : 1, // Starting index you can change.
	sEmptyTemplate : '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjI3NTM5NkVENjBBQjExRTJCRkI1OEY5MkIzMEJDRkZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjI3NTM5NkVFNjBBQjExRTJCRkI1OEY5MkIzMEJDRkZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mjc1Mzk2RUI2MEFCMTFFMkJGQjU4RjkyQjMwQkNGRkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mjc1Mzk2RUM2MEFCMTFFMkJGQjU4RjkyQjMwQkNGRkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAAAQABAAACAkQBADs=" alt="" width="{=nWidth}" height="{=nHeight}">', // It's just 1x1 empty image. you can change it to image url.
	sThumbTemplate : '<img src="{=sThumb}" alt="{=sTitie}">', // thumbail template, you don't need to change this.
	sThumbLoadingTemplate : '<img src="../images/thumb-loading.gif" alt="" style="padding-top:15px;padding-left:27px;">', // loading image
	sPhotoTemplate : '<img src="{=sImg}" alt="{=sTitle}">', // photo template, you don't need to chagne this.
	sPhotoLoadingTemplate : '<img src="../images/photo-loading.gif" alt="">', // loading image
	sPrefix : 'mpv_', // prefix for css
	htThumbOption : { // thumbnail scroll options
		bUseHScroll : true,
	    bUseVScroll : false,
	    bUseMomentum : true,
	    bUseScrollbar : false,
	    bAutoResize : true,
	    nDeceleration : 0.0005	
	},
	htPhotoOption : { // photo flicking options
		bHorizontal : true,
		nDuration : 100,
		sAnimation :'slide',
		bAutoResize : true,
		bUseCircular : true,
		bUseCss3d : false
	}
}
```

## Etc

MPV utilize [Hungarian Notation](http://en.wikipedia.org/wiki/Hungarian_notation) for all the javascript code and even json typed data commucation.

There are many kind of methodologies out there such as TDD, BDD, XP, SCRUM and etc. I know that they are good to develop and maintenance. but I would like to use much easier and faster methodology. so found out different methodology which is Readme Driven Development. RDD is from Document Driven Development. It has awesome advantages, see below.

* Most importantly, you're giving yourself a chance to think through the project without the overhead of having to change code every time you change your mind about how something should be organized or what should be included in the Public API. Remember that feeling when you first started writing automated code tests and realized that you caught all kinds of errors that would have otherwise snuck into your codebase? That's the exact same feeling you'll have if you write the Readme for your project before you write the actual code.
* As a byproduct of writing a Readme in order to know what you need to implement, you'll have a very nice piece of documentation sitting in front of you. You'll also find that it's much easier to write this document at the beginning of the project when your excitement and motivation are at their highest. Retroactively writing a Readme is an absolute drag, and you're sure to miss all kinds of important details when you do so.
* If you're working with a team of developers you get even more mileage out of your Readme. If everyone else on the team has access to this information before you've completed the project, then they can confidently start work on other projects that will interface with your code. Without any sort of defined interface, you have to code in serial or face reimplementing large portions of code.
* It's a lot simpler to have a discussion based on something written down. It's easy to talk endlessly and in circles about a problem if nothing is ever put to text. The simple act of writing down a proposed solution means everyone has a concrete idea that can be argued about and iterated upon.

If you want to read RDD more [visit it](http://goo.gl/QfV9R)

License : [LGPV v2](http://www.gnu.org/licenses/lgpl-2.1.html)