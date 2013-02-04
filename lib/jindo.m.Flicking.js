/**
    @fileOverview 여러개의 콘텐츠 영역을 사용자 터치의 움직임을 통해 좌/우, 상/하 로 슬라이드하여 보여주는 컴포넌트
    @author oyang2
    @version 1.6.0
    @since 2012-06-16
**/
/**
    여러개의 콘텐츠 영역을 사용자 터치의 움직임을 통해 좌/우, 상/하 로 슬라이드하여 보여주는 컴포넌트

    @class jindo.m.Flicking
    @extends jindo.m.UIComponent
    @uses jindo.m.Touch
    @keyword flicking, 플리킹
    @group Component
    @update
	
	@history 1.6.0 Upate 구조개선
	@history 1.6.0 Bug [bUseDiagonalTouch] 옵션 버그 수정
    @history 1.5.0 Support Window Phone8 지원
    @history 1.5.0 Update [bSetNextPanelPos] 옵션 추가
    @history 1.5.0 Update [bUseDiagonalTouch] 옵션 추가
    @history 1.5.0 Update [sroll] 커스텀 이벤트 추가
    @history 1.5.0 Update [rotate] 커스텀 이벤트 추가
    @history 1.4.0 Support iOS 6 지원
    @history 1.4.0 Upate [sAnimation] alignFlip 효과 지원
    @history 1.4.0 Bug 슬라이드 플리킹에서 모멘텀이 발생하는 문제 수정
    @history 1.3.5 Support Android 4.1(젤리빈) 대응
    @history 1.3.5 Update [sAnimation] flip 효과 지원<br />
                        [beforeFlicking] slide 타입에서 stop() 호출하면 다시 제자리로 돌아가는 bounce 기능 추가
    @history 1.3.5 Bug slide 타입에서 ios에서 afterFlicking에서 패널의 마크업을 바꿀 경우 잔상이 보이는 버그 해결
    @history 1.3.0 Support 갤럭시 S3 4.0.3 업데이트 지원, 갤럭시노트 4.0.3 업데이트 지원, 갤럭시S2 LTE 4.0.3 지원
    @history 1.3.0 Update sAnimation, bUseCiarcular 옵션에 따라 플리킹 애니메이션을 지정 할 수 있도록 구조 개선<br />
                        [sAnimation] Option 추가<br />
                        [bUseTranslate] Option 추가<br />
                        [bUseTimingFunction] Option 추가
    @history 1.2.0 Support Chrome for Android 지원<br />갤럭시 S2 4.0.3 업데이트 지원
    @history 1.2.0 Update [nFlickDistanceOffset] Option 추가<br />
                        [bUseCss3d] Option 추가<br />
                        [bAutoSize] Option 추가
    @history 1.1.0 Support Android 3.0/4.0 지원<br />jindo 2.0.0 mobile 버전 지원
    @history 0.9.0 Release 최초 릴리즈
**/

jindo.m.Flicking = jindo.$Class({
    /*  @lends jindo.m.Flicking.prototype */
    /**
        초기화 함수

        @constructor
        @param {String|HTMLElement} el 플리킹 기준 Element (필수)
        @param {Object} [htOption] 초기화 옵션 객체
            @param {Boolean} [htOption.bHorizontal=true] 가로여부
            @param {Number} [htOption.nDefaultIndex=0] 초기 로드시의 화면에 보이는 콘텐츠의 인덱스
            @param {String} [htOption.sClassPrefix='flick-'] Class의 prefix명
            @param {String} [htOption.sContentClass='ct'] 컨텐츠 영역의 class suffix명
            @param {Number} [htOption.nDuration=100] 슬라이드 애니메이션 지속 시간
            @param {Number} [htOption.nFlickThreshold=40] 콘텐츠가 바뀌기 위한 최소한의 터치 드래그한 거리 (pixel)
            @param {Boolean} [htOption.bUseCircular=false] 순환플리킹여부를 지정한다. true로 설정할 경우 3판이 연속으로 플리킹된다.
            @param {String} [htOption.sAnimation='slide'] 플리킹 애니메이션을 지정한다. "slide"와 "cover", "flip", "alignFlip" 만 현재 지정가능
            @param {Number} [htOption.nFlickDistanceOffset=null] 각 컨텐츠의 위치에서 상대적인 위치 값을 설정하여
플리킹 이동을 이 위치만큼 이동하게 수정가능한 옵션
            @param {Boolean} [htOption.bAutoResize=true] 화면전환시에 리사이즈에 대한 처리 여부
            @param {Boolean} [htOption.bAutoSize=true] iew 영역에 맞게 패널및 컨테이너의 사이즈를 지정할지 여부
            @param {Number} [htOption.nBounceDuration=100] nFlickThreshold 이하로 움직여서 다시 제자리로 돌아갈때 애니메이션 시간
            @param {Boolean} [htOption.bUseCss3d=jindo.m._isUseCss3d(true)] css3d(translate3d) 사용여부<br />
                모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
            @param {Boolean} [htOption.bUseTimingFunction=jindo.m._isUseTimingFunction()] 애니메이션 동작방식을 css의 TimingFunction을 사용할지 여부<br />false일 경우 setTimeout을 이용하여 애니메이션 실행.<br />
            모바일 단말기별로 다르게 설정된다. 상세내역은 <auidoc:see content="jindo.m">[jindo.m]</auidoc:see>을 참조하기 바란다.
            @param {Boolean} [htOption.bUseTranslate=true] css의 translate 속성을 사용할지 여부<br /> false일 경우 "left", "top" 속성을 이용함.
            @param {Boolean} [htOption.bUseDiagonalTouch=true] 대각선스크롤 방향으 터치도 플리킹으로 사용할지 여부
            @param {Boolean} [htOption.bSetNextPanelPos=false] 플리킹할때 다음 패널의 top위치를 항상 맨 위로 사용할지 여부
            @param {Boolean} [htOption.bActivateOnload=true] 컴포넌트 로드시 activate 여부
    **/
    $init : function(sId, htUserOption){
         this.option({
           bHorizontal : true,
           nDefaultIndex : 0,
           sClassPrefix : 'flick-',
           sContentClass : 'ct',
           nDuration : 100,
           nFlickThreshold : 40,
           bUseCircular : false,
           sAnimation : 'slide',
           nFlickDistanceOffset :  null,
           bAutoResize : true,
           bAutoSize : true,
           nBounceDuration : 100,
           bSetNextPanelPos :  false, //플리킹시에 다음판에 대해서 현재 스크롤 위치에 높이값을 맞출지 여부
           bUseCss3d : jindo.m._isUseCss3d(true), //css3d사용여부 bUseTranslate가 true 일때만 사
           bUseTimingFunction : jindo.m._isUseTimingFunction(true), //스크립트방식으로 애니메이션을 사용할지 csstimingfunction을 사용할지 여부
           bUseTranslate : true, //css의 translate를 사용할지 style 속성의 top, left속성 사용할지 여부
           bActivateOnload : true,
           bUseDiagonalTouch : false, //대각선스크롤을 플리킹에 사용할지 여부
           nDefaultScale : 0.94 //cover효과에서 사용되는 scale 사이즈 
        });
        
        this._el = jindo.$(sId);
        var htInfo = jindo.m.getDeviceInfo();

        //cover관련 코드 분기
        if((typeof htUserOption !== 'undefined') && (typeof htUserOption["sAnimation"] !== 'undefined') && (htUserOption["sAnimation"] === "cover")){
             if((htInfo.android && !htInfo.bChrome) && (parseInt(htInfo.version,10) >= 4 ) && ( htInfo.galaxyS2|| htInfo.galaxyNote)){
                  this.option('bUseCss3d', true);
             }

        }

        this.option(htUserOption || {});

        this._initVar();


        if(this.option("bActivateOnload")) {
             this.activate();
        }
    },


     $static : {
        _htAnimation : {
            'circular-slide' : 'SlideFlicking',
            'slide' : 'SlideFlicking',
            'cover' : 'CoverFlicking',
            'circular-cover' : 'CoverFlicking',
            'flip' : 'FlipFlicking',
            'circular-flip' : 'FlipFlicking',
            'alignFlip' : 'AlignFlipFlicking',
            'circular-alignFlip' : 'AlignFlipFlicking'
        }
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 인스턴스 변수를 초기화한다.
    **/
    _initVar: function() {
        this._oFlickingAnimation = null; //animation plugin
    },


    /**
        sType으로 플리킹 애니메이션을 설정한다.

        @method setFlickingAnimation
        @param {String} sType "slide" 또는 "cover" 중에 설정가능
    **/
    setFlickingAnimation : function(sType){
        if(typeof sType === 'undefined'){
            sType = this.option('sAnimation');
            if(this.option('bUseCircular')){
                sType  = 'circular-' + sType;
            }
        }

        if(!jindo.m.Flicking._htAnimation[sType]) {
            return false;
        }

        if(!this._oFlickingAnimation || (this.option('sAnimation') !== sType)){
             this._createAnimation(sType);
        }
    },
    
     /**
        animation 인스턴스 생성한다.
    **/
    _createAnimation : function(sType){
        if(jindo.m.Flicking._htAnimation[sType]) {
            if(this._oFlickingAnimation){
                this._oFlickingAnimation.detachAll();
                this._oFlickingAnimation = null;
            }
                       
            try{
               //this._oFlickingAnimation = eval("new " + jindo.m.Flicking._htAnimation[sType] + "("+);
               this._oFlickingAnimation = new jindo.m[jindo.m.Flicking._htAnimation[sType]](this._el, this.option());
               //this._attachFlicking();
            }catch(e){
                console.log('ERROR ! ' + e);
            }

        }
    },

  
    /**
        n이 중앙에 오도록 panel을 다시 좌우 배열해서 배치한다.

        @method refresh
        @param {Number} n 현재 화면에 보여져야할 content의 인덱스
        @param {Boolean} bResize 화면 크기가 변화되어 다시 사이즈를 업데이트 해야 할경우
        @param {Boolean} bFireEvent 커스텀이벤트 발생여부
    **/
    refresh : function(n, bResize, bFireEvent){
        if( this._oFlickingAnimation){
             this._oFlickingAnimation.refresh(n,bResize, bFireEvent);
        }
    },

  

    /**
        el엘리먼트가 몇번째 인덱스인지 리턴한다.

        @method getIndexByElement
        @param {HTMLElement} el
        @return {Number} index
    */
   getIndexByElement : function(el){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getIndexByElement(el);
        }else{
            return -1;
        }
   },

    /**
        현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다.

        @method getElement
        @return {jindo.$Element} el
    **/
    getElement : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getElement();
        }else{
            return null;
        }
    },

    /**
        현재 화면에 중앙에 보이는 컨텐츠 혹은 패널의 래핑된 엘리먼트를 리턴한다. (deprecated 예정)

        @method getContentElement
        @return {jindo.$Element} el
    **/
    getContentElement: function(){
        return this.getElement();
    },


    /**
        현재 플리킹 화면에 보이는 컨텐츠의 인덱스를 리턴한다.
        @method getContentIndex
        @return {Number} n
    **/
    getContentIndex : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getContentIndex();
        }else{
            return null;
        }
    },


    /**
        이후 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.

        @method getNextElement
        @return {jindo.$Element} el
        @history 1.1.0 Update Method 추가
    **/
    getNextElement : function(){
       if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getNextElement();
        }else{
            return null;
        }
    },

    /**
        이전 컨텐츠의 패널 엘리먼트의 래핑된 엘리먼트를 리턴한다.

        @method getPrevElement
        @return {jindo.$Element} el
        @history 1.1.0 Update Method 추가
    **/
    getPrevElement : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getPrevElement();
        }else{
            return null;
        }
    },

    /**
        전체 컨텐츠의 개수를 리턴한다.

        @method getTotalContents
        @return {Number} n
        @history 1.1.0 Update Method 추가
    **/
    getTotalContents : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getTotalContents();
        }else{
            return null;
        }
    },

    /**
        전체 패널의 개수를 리턴한다.

        @method getTotalPanels
        @return {Number} n
    **/
    getTotalPanels : function(){
        if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getTotalPanels();
        }else{
            return null;
        }
    },


    /**
        이전 컨텐츠의 인덱스를 리턴한다.

        @method getPrevIndex
        @return {Number} n
    **/
    getPrevIndex : function(){
       if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getPrevIndex();
        }else{
            return null;
        }
    },


    /**
        이후 컨텐츠의 인덱스를 리턴한다.

        @method getNextIndex
        @return {Number} n
    **/
    getNextIndex : function(){
       if(this._oFlickingAnimation){
            return this._oFlickingAnimation.getNextIndex();
        }else{
            return null;
        }
    },

    /**
        다음 플리킹화면으로 이동한다.

        @method moveNext
        @param {Number} nDuration 플리킹 애니메이션 시간
    **/
    moveNext : function(nDuration){
        if(!this.isActivating()){
            return;
        }
        if(this._oFlickingAnimation){
            this._oFlickingAnimation.moveNext(nDuration);
        }
    },

    /**
        이전  플리킹화면으로 이동한다.

        @method movePrev
        @param {Number} nDuration 플리킹 애니메이션 시간
    **/
    movePrev : function(nDuration){
       if(!this.isActivating()){
            return;
        }
        if(typeof nDuration === 'undefined'){
            nDuration = this.option('nDuration');
        }

        if(this._oFlickingAnimation){
            this._oFlickingAnimation.movePrev(nDuration);
        }
    },


    /**
        n 번째 컨텐츠로 현재 플리킹화면을 이동한다.

        @method moveTo
        @param {Number} n 이동해야하는 컨텐츠 인덱스
        @param {Number} nDuration 애니메이션 시간
        @param {Number} bFireEvent 커스텀 이벤트 발생여부
    **/
    moveTo : function(nIndex, nDuration, bFireEvent){
        if((typeof nIndex === 'undefined') || (nIndex == this.getContentIndex()) ){
            return;
        }
        if(nIndex < 0 || nIndex >= this.getTotalContents() ){
            return;
        }
        
        if(this._oFlickingAnimation){
            this._oFlickingAnimation.moveTo(nIndex, nDuration, bFireEvent);
        }

    },


    /**
        현재 애니메이션중인지 여부를 리턴한다.

        @method isAnimating
        @return {Boolean}  bAnimation
    **/
    isAnimating : function(){
        return this._doFlicking;
    },

    /**
        화면전환시에 리사이즈처리 및 위치 처리를 한다.
    **/
    _onResize : function(evt){
        if(this.option('bAutoResize')){
            var n = this.getIndexByElement(this.getElement().$value());
            this.refresh(n, true, false);
        }
        /**
            단말기가 회전될 때 발생한다

            @event rotate
            @param {String} sType 커스텀 이벤트명
            @param {Boolean} isVertical 수직여부
            @param {Function} stop 수행시 영향을 받는것은 없다
            @history 1.5.0 Update Custom Event 추가
        **/
        this.fireEvent("rotate",{
            isVertical : evt.isVertical
        });
    },


        /**
        jindo.m.Flicking 컴포넌트를 활성화한다.
        activate 실행시 호출됨
        */
     _onActivate : function() {
         if(this._oFlickingAnimation){
             
         }else{
             this.setFlickingAnimation();
         }
         
         this._oFlickingAnimation.activate();
         this._attachEvent();
         this.refresh(this.getContentIndex(), true, false);
         
     },

    /**
        jindo.m.Flicking 컴포넌트를 비활성화한다.
        deactivate 실행시 호출됨
        */
     _onDeactivate : function() {
         this._detachEvent();
     },

    /**
        jindo.m.Flicking 에서 사용하는 모든 이벤트를 바인드한다.
    **/
    _attachEvent : function() {
        this._htEvent = {};
        /* rotate */
       this._htEvent["rotate"] = jindo.$Fn(this._onResize, this).bind();
       jindo.m.bindRotate(this._htEvent["rotate"]);

       /* pageshow 이벤트 처리 */
       this._htEvent["pageshow"] = jindo.$Fn(this._onResize, this).bind();
       //jindo.m.bindPageshow(this._htEvent["pageshow"]);
        
      this._attachFlicking();
    },
    
    _attachFlicking : function(){
        /* custom event 처리 */
       if(this._oFlickingAnimation){
           this._oFlickingAnimation.detachAll();
           var self = this;
           
           this._oFlickingAnimation.attach({
                /**
            플리킹영역에 터치가 시작되었을 때 발생한다

            @event touchStart
            @param {String} sType 커스텀 이벤트명
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치 영역 X좌표
            @param {Number} nY 터치 영역 Y좌표
            @param {object} oEvent jindo.$Event object
            @param {Function} stop 플리킹 액션이 수행되지 않는다
            @history 1.2.0 Update Custom Event 추가
        **/
               'touchStart' : function(oCustomEvent){
                   if(!self.fireEvent('touchStart', oCustomEvent)){
                       oCustomEvent.stop();
                   }
                   
               },
                /**
            플리킹영역에 터치 움직임이 있을 때 발생한다. Touch이벤트의 'touchMove'와 동일하다

            @event touchMove
            @param {String} sType 커스텀 이벤트명
            @param {String} sMoveType 현재 분석된 움직임
            @param {HTMLElement} stopelement 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop수행시 영향 받는것 없다.
            @history 1.2.0 Update Custom Event 추가
        **/
               'touchMove' : function(oCustomEvent){
                   self.fireEvent('touchMove', oCustomEvent);
               },
               /**
            플리킹영역에 터치가 끝났을 때 발생한다. Touch이벤트의 'touchEnd'와 동일하다.

            @event touchEnd
            @param {String} sType 커스텀 이벤트명
            @param {String} sMoveType 현재 분석된 움직임
            @param {HTMLElement} element 현재 터치된 영역의 Element
            @param {Number} nX 터치영역의 X좌표
            @param {Number} nY 터치 영역의 Y좌표
            @param {Number} nVectorX 이전 touchMove(혹은 touchStart)의 X좌표와의 상대적인 거리.(직전 좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nVectorY 이전 touchMove(혹은 touchStart)의 Y좌표와의 상대적인 거리.(직전 좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nDistanceX touchStart의 X좌표와의 상대적인 거리.(touchStart좌표에서 오른쪽방향이면 양수, 왼쪽 방향이면 음수)
            @param {Number} nDistanceY touchStart의 Y좌표와의 상대적인 거리.(touchStart좌표에서 위쪽방향이면 음수, 아래쪽 방향이면 양수)
            @param {Number} nStartX touchStart의 X좌표
            @param {Number} nStartY touchStart의 Y좌표
            @param {Object} oEvent jindo.$Event object
            @param {Function} stop수행시 영향 받는것 없다.
        **/
               'touchEnd' : function(oCustomEvent){
                    self.fireEvent('touchEnd', oCustomEvent);
                   
               },
               
               /**
                플리킹되기 전에 발생한다

                @event beforeFlicking
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Number} nContentsNextIndex (Number) :플리킹될 다음 콘텐츠의 인덱스
                @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부 (세로 플리킹일 경우 이 값은 없다)
                @param {Boolean} bTop 플리킹 방향이 위쪽인지에 대한 여부 (가로 플리킹일 경우 이 값은 없다)
                @param {Function} stop 플리킹되지 않는다.
            **/
               'beforeFlicking' : function(oCustomEvent){
                   if(!self.fireEvent('beforeFlicking', oCustomEvent)){
                       oCustomEvent.stop();
                   }
               },
               
                /**
                현재 화면에 보이는 콘텐츠가 플리킹액션을 통해 바뀔경우 수행된다.

                @event afterFlicking
                @param {String} sType 커스텀 이벤트명
                @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                @param {Boolean} bLeft 플리킹 방향이 왼쪽인지에 대한 여부 (세로 플리킹일 경우 이 값은 없다)
                @param {Boolean} bTop 플리킹 방향이 위쪽인지에 대한 여부 (가로 플리킹일 경우 이 값은 없다)
                @param {Function} stop 수행시 영향을 받는것은 없다.
            **/
               'afterFlicking' : function(oCustomEvent){
                   self.fireEvent('afterFlicking', oCustomEvent);
               },
               
               /**
                    현재 화면에 보이는 콘텐츠가 바꾸기 직전에  수행된다.

                    @event beforeMove
                    @param {String} sType 커스텀 이벤트명
                    @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                    @param {Number} nContentsNextIndex (Number) :이동 할 콘텐츠의 인덱스
                    @param {Function} stop 이동하지 않는다.
                **/
               'beforeMove' : function(oCustomEvent){
                   if(!self.fireEvent('beforeMove', oCustomEvent)){
                       oCustomEvent.stop();
                   }
               },
                /**
                        현재 화면에 보이는 콘텐츠가 바뀔경우 수행된다

                        @event move
                        @param {String} sType 커스텀 이벤트명
                        @param {Number} nContentsIndex 현재 콘텐츠의 인덱스
                        @param {Function} stop 수행시 영향을 받는것은 없다
                    **/
               'move' : function(oCustomEvent){
                   self.fireEvent('move', oCustomEvent)
               },
                 /**
                플리킹 액션이 아닌 기본 스크롤 기능이 발생될 때

                @event scroll
                @param {String} sType 커스텀 이벤트명
                @param {Function} stop 수행시 영향 받는것 없다.
                @history 1.5.0 Update Custom Event 추가
            **/
               'scroll' : function(oCustomEvent){
                   self.fireEvent('scroll');
               }
           });
       }  
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 이벤트를 해제한다.
    **/
    _detachEvent : function() {
        /* rotate */
        jindo.m.unbindRotate(this._htEvent["rotate"]);

        /*그외*/
       for(var p in this._htEvent){
            var htTargetEvent = this._htEvent[p];
            if (typeof htTargetEvent.ref !== "undefined") {
                htTargetEvent.ref.detach(htTargetEvent.el, p);
            }
        }
        
        /* 커스텀 이벤트 */
        if(this._oFlickingAnimation){
            this._oFlickingAnimation.detachAll();
        }

        this._htEvent = null;
    },

    /**
        jindo.m.Flicking 에서 사용하는 모든 객체를 release 시킨다.
        @method destroy
    **/
    destroy: function() {
        this.deactivate();

        for(var p in this._htWElement) {
            this._htWElement[p] = null;
        }
        this._htWElement = null;

        this._oFlickingAnimation = null;
        for(var p1 in this._htIndexInfo){
            this._htIndexInfo[p] = null;
        }

        this._isIos = null;
        this._bAndroid = null;
        this._nVersion = null;
        this._fnDummyFnc = null;
        this._doFlicking = null;
        this._bClickBug = null;
        this._b3dExecption = null;
        this._bDummyTagException = null;

    }
}).extend(jindo.m.UIComponent);