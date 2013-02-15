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
```json
{
	"0" : {
			"sThumb" : "",
			"sImg" : ""
		},
	"1" : {

		},
}
```

## How to use

Common js files you need to include. The current version of Jindo is 2.5.0 and JMC(Jindo Mobile Component) is 1.6.0
```html
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

### Example 1 : just html file

example001.html
```html
<div id="_mpv">
</div>
<script type="text/javascript" charset="utf-8" src="./src/jindo.m.PhotoViewer.js"></script>
<script type="text/javascript">
	var woMpv = new jindo.m.PhotoViewer({
		sId : '_mpv'
	});
</script>
```

### Example 2 : html file with Ajax

example002.html
```html
<div id="_mpv">
</div>
<script type="text/javascript" charset="utf-8" src="./src/jindo.m.PhotoViewer.js"></script>
<script type="text/javascript">
	var woMpv = new jindo.m.PhotoViewer({

	});
</script>
```