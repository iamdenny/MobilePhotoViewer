# Mobile Photo Viewer

It's photo viewer for mobile like smart phone. it has scrolled thumbnail and lazy loading also provide full screen mode. 
Gracias.

## Dependencies

* [Jindo Framework](http://jindo.nhncorp.com/jindo_home/JindoJS.html) which is made by NHN
* [Jindo Mobile Component](http://jindo.nhncorp.com/jindo_home/Mobile.html) which is made by NHN also

## Be used for

* [Naver Auto Mobile Site.](http://m.auto.naver.com/car/image.nhn?yearsId=18591&selectIndex=1)

## How to use

### Case 1 : just html file

mobile-photo-viewer.html
```html
	<div id="_mpv">
	</div>
	<script type="text/javascript" charset="utf-8" src="./js/jindo.m.PhotoViewer.js"></script>
	<script type="text/javascript">
		var woMpv = new jindo.m.PhotoViewer({

		});
	</script>
```

### Case 2 : html file with Ajax

mobile-photo-viewer.html
```html
	<div id="_mpv">
	</div>
	<script type="text/javascript" charset="utf-8" src="./js/jindo.m.PhotoViewer.js"></script>
	<script type="text/javascript">
		var woMpv = new jindo.m.PhotoViewer({

		});
	</script>
```