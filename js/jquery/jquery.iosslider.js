!function(le){var ne=0,se=0,oe=0,ae=0,de="ontouchstart"in window,ce="onorientationchange"in window,s=!1,fe=!1,he=!1,ue=!1,Se="pointer",ge="pointer",ve=new Array,p=new Array,be=new Array,pe=new Array,me=new Array,we=new Array,ye=new Array,Oe=new Array,ke=new Array,Ce=new Array,xe=new Array,Ae=new Array,Ne=new Array,Te={showScrollbar:function(e,t){e.scrollbarHide&&le("."+t).css({opacity:e.scrollbarOpacity,filter:"alpha(opacity:"+100*e.scrollbarOpacity+")"})},hideScrollbar:function(e,t,i,r,l,n,s,o,a,d){if(e.scrollbar&&e.scrollbarHide)for(var c=i;c<i+25;c++)t[t.length]=Te.hideScrollbarIntervalTimer(10*c,r[i],(i+24-c)/24,l,n,s,o,a,d,e)},hideScrollbarInterval:function(e,t,i,r,l,n,s,o,a){ae=-1*e/xe[o]*(l-n-s-r),Te.setSliderOffset("."+i,ae),le("."+i).css({opacity:a.scrollbarOpacity*t,filter:"alpha(opacity:"+a.scrollbarOpacity*t*100+")"})},slowScrollHorizontalInterval:function(e,t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b,p){if(p.infiniteSlider){if(i<=-1*xe[g]){var m=le(e).width();if(i<=-1*Ae[g]){var w=-1*c[0];le(t).each(function(e){Te.setSliderOffset(le(t)[e],w+v),e<f.length&&(f[e]=-1*w),w+=S[e]}),i+=-1*f[0],Ce[g]=-1*f[0]+v,xe[g]=Ce[g]+m-n,ke[g]=0}else{var y=0,O=Te.getSliderOffset(le(t[0]),"x");le(t).each(function(e){Te.getSliderOffset(this,"x")<O&&(O=Te.getSliderOffset(this,"x"),y=e)});var k=Ce[g]+m;Te.setSliderOffset(le(t)[y],k),Ce[g]=-1*f[1]+v,xe[g]=Ce[g]+m-n,f.splice(0,1),f.splice(f.length,0,-1*k+v),ke[g]++}}if(i>=-1*Ce[g]||0<=i){m=le(e).width();if(0<=i){w=-1*c[0];for(le(t).each(function(e){Te.setSliderOffset(le(t)[e],w+v),e<f.length&&(f[e]=-1*w),w+=S[e]}),i-=-1*f[0],Ce[g]=-1*f[0]+v,xe[g]=Ce[g]+m-n,ke[g]=u;0<-1*f[0]-m+v;){var C=0,x=Te.getSliderOffset(le(t[0]),"x");le(t).each(function(e){Te.getSliderOffset(this,"x")>x&&(x=Te.getSliderOffset(this,"x"),C=e)});k=Ce[g]-S[C];Te.setSliderOffset(le(t)[C],k),f.splice(0,0,-1*k+v),f.splice(f.length-1,1),Ce[g]=-1*f[0]+v,xe[g]=Ce[g]+m-n,ke[g]--,ye[g]++}}if(i<0){C=0,x=Te.getSliderOffset(le(t[0]),"x");le(t).each(function(e){Te.getSliderOffset(this,"x")>x&&(x=Te.getSliderOffset(this,"x"),C=e)});k=Ce[g]-S[C];Te.setSliderOffset(le(t)[C],k),f.splice(0,0,-1*k+v),f.splice(f.length-1,1),Ce[g]=-1*f[0]+v,xe[g]=Ce[g]+m-n,ke[g]--}}}var A=!1,N=Te.calcActiveOffset(p,i,f,n,ke[g],u,d,g);k=(N+ke[g]+u)%u;if(p.infiniteSlider?k!=Oe[g]&&(A=!0):N!=ye[g]&&(A=!0),A){var T=new Te.args("change",p,e,le(e).children(":eq("+k+")"),k,b);le(e).parent().data("args",T),""!=p.onSlideChange&&p.onSlideChange(T)}if(ye[g]=N,Oe[g]=k,i=Math.floor(i),Te.setSliderOffset(e,i),p.scrollbar){ae=Math.floor((-1*i-Ce[g]+v)/(xe[g]-Ce[g]+v)*(s-o-l));var E=l-a;i>=-1*Ce[g]+v?(E=l-a- -1*ae,Te.setSliderOffset(le("."+r),0)):(i<=-1*xe[g]+1&&(E=s-o-a-ae),Te.setSliderOffset(le("."+r),ae)),le("."+r).css({width:E+"px"})}},slowScrollHorizontal:function(e,t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b,p,m,w){var y=new Array,O=new Array,k=Te.getSliderOffset(e,"x"),C=0,x=25/1024*o;frictionCoefficient=w.frictionCoefficient,elasticFrictionCoefficient=w.elasticFrictionCoefficient,snapFrictionCoefficient=w.snapFrictionCoefficient,l>w.snapVelocityThreshold&&w.snapToChildren&&!p?C=1:l<-1*w.snapVelocityThreshold&&w.snapToChildren&&!p&&(C=-1),l<-1*x?l=-1*x:x<l&&(l=x),le(e)[0]!==le(b)[0]&&(C*=-1,l*=-2);var A=ke[S];if(w.infiniteSlider)var N=Ce[S],T=xe[S];for(var E=new Array,M=new Array,z=0;z<h.length;z++)E[z]=h[z],z<t.length&&(M[z]=Te.getSliderOffset(le(t[z]),"x"));for(;1<l||l<-1;){if(((k+=l*=frictionCoefficient)>-1*Ce[S]||k<-1*xe[S])&&!w.infiniteSlider&&(k+=l*=elasticFrictionCoefficient),w.infiniteSlider){if(k<=-1*T){var I=le(e).width(),P=0,W=M[0];for(z=0;z<M.length;z++)M[z]<W&&(W=M[z],P=z);var X=N+I;M[P]=X,T=(N=-1*E[1]+m)+I-o,E.splice(0,1),E.splice(E.length,0,-1*X+m),A++}if(-1*N<=k){I=le(e).width();var D=0,B=M[0];for(z=0;z<M.length;z++)M[z]>B&&(B=M[z],D=z);X=N-u[D];M[D]=X,E.splice(0,0,-1*X+m),E.splice(E.length-1,1),T=(N=-1*E[0]+m)+I-o,A--}}y[y.length]=k,O[O.length]=l}var H=!1,q=Te.calcActiveOffset(w,k,E,o,A,v,ye[S],S),R=(q+A+v)%v;if(w.snapToChildren&&(w.infiniteSlider?R!=Oe[S]&&(H=!0):q!=ye[S]&&(H=!0),C<0&&!H?++q>=h.length&&!w.infinteSlider&&(q=h.length-1):0<C&&!H&&--q<0&&!w.infinteSlider&&(q=0)),w.snapToChildren||(k>-1*Ce[S]||k<-1*xe[S])&&!w.infiniteSlider){for(k=Te.getSliderOffset(e,"x"),y.splice(0,y.length);k<E[q]-.5||k>E[q]+.5;)k=(k-E[q])*snapFrictionCoefficient+E[q],y[y.length]=k;y[y.length]=E[q]}var L=1;y.length%2!=0&&(L=0);for(var Y=0;Y<i.length;Y++)clearTimeout(i[Y]);var j=(q+A+v)%v,F=0;for(Y=L;Y<y.length;Y+=2)(Y==L||1<Math.abs(y[Y]-F)||Y>=y.length-2)&&(F=y[Y],i[i.length]=Te.slowScrollHorizontalIntervalTimer(10*Y,e,t,y[Y],r,s,o,a,d,c,q,f,h,g,v,u,S,m,j,w));H=!1,R=(q+ke[S]+v)%v;w.infiniteSlider?R!=Oe[S]&&(H=!0):q!=ye[S]&&(H=!0),""!=w.onSlideComplete&&(i[i.length]=Te.onSlideCompleteTimer(10*(Y+1),w,e,le(e).children(":eq("+R+")"),R,S)),we[S]=i,Te.hideScrollbar(w,i,Y,y,r,s,o,d,c,S)},onSlideComplete:function(e,t,i,r,l){ve[l];var n=new Te.args("complete",e,le(t),i,r,r);le(t).parent().data("args",n),""!=e.onSlideComplete&&e.onSlideComplete(n),ve[l]=r},getSliderOffset:function(e,t){var i=0;if(t="x"==t?4:5,!s||fe||he)i=parseInt(le(e).css("left"),10);else{for(var r=new Array("-webkit-transform","-moz-transform","transform"),l=0;l<r.length;l++)if(null!=le(e).css(r[l])&&0<le(e).css(r[l]).length){var n=le(e).css(r[l]).split(",");break}i=parseInt(n[t],10)}return i},setSliderOffset:function(e,t){!s||fe||he?le(e).css({left:t+"px"}):le(e).css({webkitTransform:"matrix(1,0,0,1,"+t+",0)",MozTransform:"matrix(1,0,0,1,"+t+",0)",transform:"matrix(1,0,0,1,"+t+",0)"})},setBrowserInfo:function(){null!=navigator.userAgent.match("WebKit")?(!0,Se="-webkit-grab",ge="-webkit-grabbing"):null!=navigator.userAgent.match("Gecko")?(!0,Se="move",ge="-moz-grabbing"):null!=navigator.userAgent.match("MSIE 7")?ue=fe=!0:null!=navigator.userAgent.match("MSIE 8")?ue=he=!0:null!=navigator.userAgent.match("MSIE 9")&&(ue=!0)},has3DTransform:function(){var e=!1,t=le("<div />").css({webkitTransform:"matrix(1,1,1,1,1,1)",MozTransform:"matrix(1,1,1,1,1,1)",transform:"matrix(1,1,1,1,1,1)"});return""==t.attr("style")?e=!1:null!=t.attr("style")&&(e=!0),e},getSlideNumber:function(e,t,i){return(e-ke[t]+i)%i},calcActiveOffset:function(e,t,i,r,l,n,s,o){for(var a,d=!1,c=new Array,f=0;f<i.length;f++)i[f]<=t&&i[f]>t-r&&(d||i[f]==t||(c[c.length]=i[f-1]),c[c.length]=i[f],d=!0);0==c.length&&(c[0]=i[i.length-1]);var h=r,u=0;for(f=0;f<c.length;f++){var S=Math.abs(t-c[f]);S<h&&(u=c[f],h=S)}for(f=0;f<i.length;f++)u==i[f]&&(a=f);return a},changeSlide:function(e,t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b){Te.autoSlidePause(u);for(var p=0;p<r.length;p++)clearTimeout(r[p]);var m=Math.ceil(b.autoSlideTransTimer/10)+1,w=Te.getSliderOffset(t,"x"),y=f[e],O=y-w;if(b.infiniteSlider){var k=!1;0==(e=(e-ke[u]+2*g)%g)&&2==g&&(f[e=g]=f[e-1]-le(i).eq(0).outerWidth(!0),k=!0),O=(y=f[e])-w;var C=new Array(f[e]-le(t).width(),f[e]+le(t).width());k&&f.splice(f.length-1,1);for(var x=0;x<C.length;x++)Math.abs(C[x]-w)<Math.abs(O)&&(O=C[x]-w)}var A,N,T=new Array;Te.showScrollbar(b,l);for(x=0;x<=m;x++)A=x,A/=m,A--,N=w+O*(Math.pow(A,5)+1),T[T.length]=N;var E=0;for(x=0;x<T.length;x++)if((0==x||1<Math.abs(T[x]-E)||x>=T.length-2)&&(E=T[x],r[x]=Te.slowScrollHorizontalIntervalTimer(10*(x+1),t,i,T[x],l,n,s,o,a,d,e,c,f,S,g,h,u,v,e,b)),0==x&&""!=b.onSlideStart){var M=(ye[u]+ke[u]+g)%g;b.onSlideStart(new Te.args("start",b,t,le(t).children(":eq("+M+")"),M,e))}var z=!1;M=(e+ke[u]+g)%g;b.infiniteSlider?M!=Oe[u]&&(z=!0):e!=ye[u]&&(z=!0),z&&""!=b.onSlideComplete&&(r[r.length]=Te.onSlideCompleteTimer(10*(x+1),b,t,le(t).children(":eq("+M+")"),M,u)),we[u]=r,Te.hideScrollbar(b,r,x,T,l,n,s,a,d,u),Te.autoSlide(t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b)},autoSlide:function(t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b){if(!pe[u].autoSlide)return!1;Te.autoSlidePause(u),p[u]=setTimeout(function(){!b.infiniteSlider&&ye[u]>f.length-1&&(ye[u]=ye[u]-g);var e=(ye[u]+ke[u]+g+1)%g;Te.changeSlide(e,t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b),Te.autoSlide(t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b)},b.autoSlideTimer+b.autoSlideTransTimer)},autoSlidePause:function(e){clearTimeout(p[e])},isUnselectable:function(e,t){return""!=t.unselectableSelector&&1==le(e).closest(t.unselectableSelector).size()},slowScrollHorizontalIntervalTimer:function(e,t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b,p,m){return setTimeout(function(){Te.slowScrollHorizontalInterval(t,i,r,l,n,s,o,a,d,c,f,h,u,S,g,v,b,p,m)},e)},onSlideCompleteTimer:function(e,t,i,r,l,n){return setTimeout(function(){Te.onSlideComplete(t,i,r,l,n)},e)},hideScrollbarIntervalTimer:function(e,t,i,r,l,n,s,o,a,d){return setTimeout(function(){Te.hideScrollbarInterval(t,i,r,l,n,s,o,a,d)},e)},args:function(e,t,i,r,l,n){this.prevSlideNumber=null==le(i).parent().data("args")?void 0:le(i).parent().data("args").prevSlideNumber,this.prevSlideObject=null==le(i).parent().data("args")?void 0:le(i).parent().data("args").prevSlideObject,this.targetSlideNumber=void 0,this.targetSlideObject=void 0,this.slideChanged=!1,"load"==e||"start"==e||("change"==e?(this.slideChanged=!0,this.prevSlideNumber=null==le(i).parent().data("args")?t.startAtSlide:le(i).parent().data("args").currentSlideNumber,this.prevSlideObject=le(i).children(":eq("+this.prevSlideNumber+")")):"complete"==e&&(this.slideChanged=le(i).parent().data("args").slideChanged)),this.settings=t,this.data=le(i).parent().data("iosslider"),this.sliderObject=i,this.sliderContainerObject=le(i).parent(),this.currentSlideObject=r,this.currentSlideNumber=l+1,this.currentSliderOffset=-1*Te.getSliderOffset(i,"x")},preventDrag:function(e){e.preventDefault()},preventClick:function(e){return e.stopImmediatePropagation(),!1},enableClick:function(){return!0}};Te.setBrowserInfo();var l={init:function(t,i){s=Te.has3DTransform();var re=le.extend(!0,{elasticPullResistance:.6,frictionCoefficient:.92,elasticFrictionCoefficient:.6,snapFrictionCoefficient:.92,snapToChildren:!1,snapSlideCenter:!1,startAtSlide:1,scrollbar:!1,scrollbarDrag:!1,scrollbarHide:!0,scrollbarLocation:"top",scrollbarContainer:"",scrollbarOpacity:.4,scrollbarHeight:"4px",scrollbarBorder:"0",scrollbarMargin:"5px",scrollbarBackground:"#000",scrollbarBorderRadius:"100px",scrollbarShadow:"0 0 0 #000",scrollbarElasticPullResistance:.9,desktopClickDrag:!1,keyboardControls:!1,tabToAdvance:!1,responsiveSlideContainer:!0,responsiveSlides:!0,navSlideSelector:"",navPrevSelector:"",navNextSelector:"",autoSlideToggleSelector:"",autoSlide:!1,autoSlideTimer:5e3,autoSlideTransTimer:750,infiniteSlider:!1,snapVelocityThreshold:5,slideStartVelocityThreshold:0,horizontalSlideLockThreshold:5,verticalSlideLockThreshold:3,stageCSS:{position:"relative",top:"0",left:"0",overflow:"hidden",zIndex:1},unselectableSelector:"",onSliderLoaded:"",onSliderUpdate:"",onSliderResize:"",onSlideStart:"",onSlideChange:"",onSlideComplete:""},t);return null==i&&(i=this),le(i).each(function(t){var y=++ne,f=new Array;pe[y]=re,Ce[y]=0;xe[y]=0;var h,O,k,C,u,S,x,g,A,N,T,E,M,v,z,b,I=new Array(0,0),P=new Array(0,0),p="scrollbarBlock"+ne,W="scrollbar"+ne,X=0,D=le(this),m=!0,B=(new Array,new Array),w=0,H=0,q=0,R=le(this).children(":first-child"),L=le(R).children().not("script").size(),Y=!1,j=0,F=!1,l=void 0;ke[y]=0;var n,V=!1,U=!(ve[y]=-1);be[y]=D;var _,G,K,Q,J=me[y]=!1,Z=!1,$="touchstart.iosSliderEvent click.iosSliderEvent";Ne[y]=!1,we[y]=new Array,re.scrollbarDrag&&(re.scrollbar=!0,re.scrollbarHide=!1);var ee=le(this);if(null!=ee.data("iosslider"))return!0;if(le(this).find("img").bind("dragstart.iosSliderEvent",function(e){e.preventDefault()}),re.infiniteSlider&&(re.scrollbar=!1),re.scrollbar&&(""!=re.scrollbarContainer?le(re.scrollbarContainer).append("<div class = '"+p+"'><div class = '"+W+"'></div></div>"):le(R).parent().append("<div class = '"+p+"'><div class = '"+W+"'></div></div>")),!s())return!0;le(this).find("a").bind("mousedown",Te.preventDrag),le(this).find("[onclick]").bind("click",Te.preventDrag).each(function(){le(this).data("onclick",this.onclick)});var i=(Te.calcActiveOffset(re,Te.getSliderOffset(le(R),"x"),E,x,ke[y],L,void 0,y)+ke[y]+L)%L,r=new Te.args("load",re,R,le(R).children(":eq("+i+")"),i,i);function s(){Te.autoSlidePause(y),G=le(R).find("a"),K=le(R).find("[onclick]"),Q=le(R).find("*"),le(D).css("width",""),le(D).css("height",""),le(R).css("width",""),M=le(R).children().not("script").get(),v=new Array,z=new Array,le(M).css("width",""),xe[y]=0,E=new Array,u=le(D).parent().width(),x=le(D).outerWidth(!0),re.responsiveSlideContainer&&(x=le(D).outerWidth(!0)>u?u:le(D).outerWidth(!0)),le(D).css({position:re.stageCSS.position,top:re.stageCSS.top,left:re.stageCSS.left,overflow:re.stageCSS.overflow,zIndex:re.stageCSS.zIndex,webkitPerspective:1e3,webkitBackfaceVisibility:"hidden","-ms-touch-action":"pan-y",width:x}),le(re.unselectableSelector).css({cursor:"default"});for(var t=0;t<M.length;t++){v[t]=le(M[t]).width(),z[t]=le(M[t]).outerWidth(!0);var i=z[t];re.responsiveSlides&&(i=z[t]>x?x+-1*(z[t]-v[t]):v[t],le(M[t]).css({width:i})),le(M[t]).css({webkitBackfaceVisibility:"hidden",position:"absolute",top:0}),E[t]=-1*xe[y],xe[y]=xe[y]+i+(z[t]-v[t])}re.snapSlideCenter&&(X=.5*(x-z[0]),re.responsiveSlides&&z[0]>x&&(X=0)),Ae[y]=2*xe[y];for(t=0;t<M.length;t++)Te.setSliderOffset(le(M[t]),-1*E[t]+xe[y]+X),E[t]=E[t]-xe[y];if(!re.infiniteSlider&&!re.snapSlideCenter){for(var r=0;r<E.length&&!(E[r]<=-1*(2*xe[y]-x));r++)j=r;E.splice(j+1,E.length),E[E.length]=-1*(2*xe[y]-x)}for(r=0;r<E.length;r++)B[r]=E[r];if(m&&(re.startAtSlide=pe[y].startAtSlide>E.length?E.length:pe[y].startAtSlide,re.infiniteSlider?(re.startAtSlide=(pe[y].startAtSlide-1+L)%L,ye[y]=pe[y].startAtSlide):(re.startAtSlide=pe[y].startAtSlide-1<0?E.length-1:pe[y].startAtSlide,ye[y]=pe[y].startAtSlide-1),Oe[y]=ye[y]),Ce[y]=xe[y]+X,le(R).css({position:"relative",cursor:Se,webkitPerspective:"0",webkitBackfaceVisibility:"hidden",width:xe[y]+"px"}),_=xe[y],xe[y]=2*xe[y]-x+2*X,(V=_<x)&&le(R).css({cursor:"default"}),S=le(D).parent().outerHeight(!0),g=le(D).height(),re.responsiveSlideContainer&&(g=S<g?S:g),le(D).css({height:g}),Te.setSliderOffset(R,E[ye[y]]),re.infiniteSlider&&!V){for(var l=Te.getSliderOffset(le(R),"x"),n=(ke[y]+L)%L*-1;n<0;){var s=0,o=Te.getSliderOffset(le(M[0]),"x");le(M).each(function(e){Te.getSliderOffset(this,"x")<o&&(o=Te.getSliderOffset(this,"x"),s=e)});var a=Ce[y]+_;Te.setSliderOffset(le(M)[s],a),Ce[y]=-1*E[1]+X,xe[y]=Ce[y]+_-x,E.splice(0,1),E.splice(E.length,0,-1*a+X),n++}for(;0<-1*E[0]-_+X&&re.snapSlideCenter&&m;){var d=0,c=Te.getSliderOffset(le(M[0]),"x");le(M).each(function(e){Te.getSliderOffset(this,"x")>c&&(c=Te.getSliderOffset(this,"x"),d=e)});a=Ce[y]-z[d];Te.setSliderOffset(le(M)[d],a),E.splice(0,0,-1*a+X),E.splice(E.length-1,1),Ce[y]=-1*E[0]+X,xe[y]=Ce[y]+_-x,ke[y]--,ye[y]++}for(;l<=-1*xe[y];){s=0,o=Te.getSliderOffset(le(M[0]),"x");le(M).each(function(e){Te.getSliderOffset(this,"x")<o&&(o=Te.getSliderOffset(this,"x"),s=e)});a=Ce[y]+_;Te.setSliderOffset(le(M)[s],a),Ce[y]=-1*E[1]+X,xe[y]=Ce[y]+_-x,E.splice(0,1),E.splice(E.length,0,-1*a+X),ke[y]++,ye[y]--}}return Te.setSliderOffset(R,E[ye[y]]),re.desktopClickDrag||le(R).css({cursor:"default"}),re.scrollbar&&(le("."+p).css({margin:re.scrollbarMargin,overflow:"hidden",display:"none"}),le("."+p+" ."+W).css({border:re.scrollbarBorder}),A=parseInt(le("."+p).css("marginLeft"))+parseInt(le("."+p).css("marginRight")),N=parseInt(le("."+p+" ."+W).css("borderLeftWidth"),10)+parseInt(le("."+p+" ."+W).css("borderRightWidth"),10),k=""!=re.scrollbarContainer?le(re.scrollbarContainer).width():x,C=(k-A)/L,re.scrollbarHide||(w=re.scrollbarOpacity),le("."+p).css({position:"absolute",left:0,width:k-A+"px",margin:re.scrollbarMargin}),"top"==re.scrollbarLocation?le("."+p).css("top","0"):le("."+p).css("bottom","0"),le("."+p+" ."+W).css({borderRadius:re.scrollbarBorderRadius,background:re.scrollbarBackground,height:re.scrollbarHeight,width:C-N+"px",minWidth:re.scrollbarHeight,border:re.scrollbarBorder,webkitPerspective:1e3,webkitBackfaceVisibility:"hidden",position:"relative",opacity:w,filter:"alpha(opacity:"+100*w+")",boxShadow:re.scrollbarShadow}),Te.setSliderOffset(le("."+p+" ."+W),Math.floor((-1*E[ye[y]]-Ce[y]+X)/(xe[y]-Ce[y]+X)*(k-A-C))),le("."+p).css({display:"block"}),h=le("."+p+" ."+W),O=le("."+p)),re.scrollbarDrag&&!V&&le("."+p+" ."+W).css({cursor:Se}),re.infiniteSlider&&(b=(xe[y]+x)/3),""!=re.navSlideSelector&&le(re.navSlideSelector).each(function(t){le(this).css({cursor:"pointer"}),le(this).unbind($).bind($,function(e){"touchstart"==e.type?le(this).unbind("click.iosSliderEvent"):le(this).unbind("touchstart.iosSliderEvent"),$=e.type+".iosSliderEvent",Te.changeSlide(t,R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re)})}),""!=re.navPrevSelector&&(le(re.navPrevSelector).css({cursor:"pointer"}),le(re.navPrevSelector).unbind($).bind($,function(e){"touchstart"==e.type?le(this).unbind("click.iosSliderEvent"):le(this).unbind("touchstart.iosSliderEvent"),$=e.type+".iosSliderEvent";var t=(ye[y]+ke[y]+L)%L;(0<t||re.infiniteSlider)&&Te.changeSlide(t-1,R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re)})),""!=re.navNextSelector&&(le(re.navNextSelector).css({cursor:"pointer"}),le(re.navNextSelector).unbind($).bind($,function(e){"touchstart"==e.type?le(this).unbind("click.iosSliderEvent"):le(this).unbind("touchstart.iosSliderEvent"),$=e.type+".iosSliderEvent";var t=(ye[y]+ke[y]+L)%L;(t<E.length-1||re.infiniteSlider)&&Te.changeSlide(t+1,R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re)})),re.autoSlide&&!V&&(""!=re.autoSlideToggleSelector&&(le(re.autoSlideToggleSelector).css({cursor:"pointer"}),le(re.autoSlideToggleSelector).unbind($).bind($,function(){"touchstart"==e.type?le(this).unbind("click.iosSliderEvent"):le(this).unbind("touchstart.iosSliderEvent"),$=e.type+".iosSliderEvent",U?(Te.autoSlide(R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re),U=!1,le(re.autoSlideToggleSelector).removeClass("on")):(Te.autoSlidePause(y),U=!0,le(re.autoSlideToggleSelector).addClass("on"))})),U||V||Te.autoSlide(R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re),le(D).bind("mouseenter.iosSliderEvent",function(){Te.autoSlidePause(y)}),le(D).bind("mouseleave.iosSliderEvent",function(){U||V||Te.autoSlide(R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re)}),le(D).bind("touchend.iosSliderEvent",function(){U||V||Te.autoSlide(R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re)})),le(D).data("iosslider",{obj:ee,settings:re,scrollerNode:R,slideNodes:M,numberOfSlides:L,centeredSlideOffset:X,sliderNumber:y,originalOffsets:B,childrenOffsets:E,sliderMax:xe[y],scrollbarClass:W,scrollbarWidth:C,scrollbarStageWidth:k,stageWidth:x,scrollMargin:A,scrollBorder:N,infiniteSliderOffset:ke[y],infiniteSliderWidth:b,slideNodeOuterWidths:z}),!(m=!1)}if(le(D).data("args",r),""!=re.onSliderLoaded&&re.onSliderLoaded(r),ve[y]=i,pe[y].responsiveSlides||pe[y].responsiveSlideContainer){var o=ce?"orientationchange":"resize";le(window).bind(o+".iosSliderEvent",function(){if(!s())return!0;var e=le(D).data("args");""!=re.onSliderResize&&re.onSliderResize(e)})}if(!re.keyboardControls&&!re.tabToAdvance||V||le(document).bind("keydown.iosSliderEvent",function(e){if(!fe&&!he)e=e.originalEvent;if(37==e.keyCode&&re.keyboardControls)e.preventDefault(),(0<(t=(ye[y]+ke[y]+L)%L)||re.infiniteSlider)&&Te.changeSlide(t-1,R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re);else if(39==e.keyCode&&re.keyboardControls||9==e.keyCode&&re.tabToAdvance){var t;e.preventDefault(),((t=(ye[y]+ke[y]+L)%L)<E.length-1||re.infiniteSlider)&&Te.changeSlide(t+1,R,M,f,W,C,x,k,A,N,B,E,z,y,b,L,X,re)}}),de||re.desktopClickDrag){var te=!1,a=le(R),d=le(R),ie=!1;re.scrollbarDrag&&(a=a.add(h),d=d.add(O)),le(a).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent",function(e){if(te)return!0;if(te=!0,"touchstart"==e.type?le(d).unbind("mousedown.iosSliderEvent"):le(d).unbind("touchstart.iosSliderEvent"),Ne[y]||V)return!0;if(ie=Te.isUnselectable(e.target,re))return!(Y=te=!1);if(n=le(this)[0]===le(h)[0]?h:R,!fe&&!he)e=e.originalEvent;if(Te.autoSlidePause(y),Q.unbind(".disableClick"),"touchstart"==e.type)eventX=e.touches[0].pageX,eventY=e.touches[0].pageY;else{if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if(he)try{document.selection.empty()}catch(e){}else document.selection.empty();eventX=e.pageX,eventY=e.pageY,F=!0,l=R,le(this).css({cursor:ge})}I=new Array(0,0),P=new Array(0,0),Y=!1;for(var t=se=0;t<f.length;t++)clearTimeout(f[t]);var i=Te.getSliderOffset(R,"x");i>-1*Ce[y]+X+_?(i=-1*Ce[y]+X+_,Te.setSliderOffset(le("."+W),i),le("."+W).css({width:C-N+"px"})):i<-1*xe[y]&&(i=-1*xe[y],Te.setSliderOffset(le("."+W),k-A-C),le("."+W).css({width:C-N+"px"}));var r=le(this)[0]===le(h)[0]?Ce[y]:0;H=-1*(Te.getSliderOffset(this,"x")-eventX-r),-1*(Te.getSliderOffset(this,"y")-eventY),I[1]=eventX,P[1]=eventY,Z=!1}),le(d).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent",function(e){if(!fe&&!he)e=e.originalEvent;if(Ne[y]||V)return!0;if(ie)return!0;var t=0;if("touchmove"==e.type)eventX=e.touches[0].pageX,eventY=e.touches[0].pageY;else{if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if(he)try{document.selection.empty()}catch(e){}else document.selection.empty();if(eventX=e.pageX,eventY=e.pageY,!F)return!0;if(!ue&&(void 0!==e.webkitMovementX||void 0!==e.webkitMovementY)&&0===e.webkitMovementY&&0===e.webkitMovementX)return!0}if(I[0]=I[1],I[1]=eventX,se=(I[1]-I[0])/2,P[0]=P[1],P[1]=eventY,oe=(P[1]-P[0])/2,!Y){var i=(ye[y]+ke[y]+L)%L,r=new Te.args("start",re,R,le(R).children(":eq("+i+")"),i,i);le(D).data("args",r),""!=re.onSlideStart&&re.onSlideStart(r)}if((oe>re.verticalSlideLockThreshold||oe<-1*re.verticalSlideLockThreshold)&&"touchmove"==e.type&&!Y&&(J=!0),(se>re.horizontalSlideLockThreshold||se<-1*re.horizontalSlideLockThreshold)&&"touchmove"==e.type&&e.preventDefault(),(se>re.slideStartVelocityThreshold||se<-1*re.slideStartVelocityThreshold)&&(Y=!0),Y&&!J){var l=Te.getSliderOffset(R,"x"),n=le(this)[0]===le(O)[0]?Ce[y]:X,s=le(this)[0]===le(O)[0]?(Ce[y]-xe[y]-X)/(k-A-C):1,o=le(this)[0]===le(O)[0]?re.scrollbarElasticPullResistance:re.elasticPullResistance,a=re.snapSlideCenter&&le(this)[0]===le(O)[0]?0:X,d=re.snapSlideCenter&&le(this)[0]===le(O)[0]?X:0;if("touchmove"==e.type&&(q!=e.touches.length&&(H=-1*l+eventX),q=e.touches.length),re.infiniteSlider){if(l<=-1*xe[y]){var c=le(R).width();if(l<=-1*Ae[y]){var f=-1*B[0];le(M).each(function(e){Te.setSliderOffset(le(M)[e],f+X),e<E.length&&(E[e]=-1*f),f+=z[e]}),H-=-1*E[0],Ce[y]=-1*E[0]+X,xe[y]=Ce[y]+c-x,ke[y]=0}else{var h=0,u=Te.getSliderOffset(le(M[0]),"x");le(M).each(function(e){Te.getSliderOffset(this,"x")<u&&(u=Te.getSliderOffset(this,"x"),h=e)});var S=Ce[y]+c;Te.setSliderOffset(le(M)[h],S),Ce[y]=-1*E[1]+X,xe[y]=Ce[y]+c-x,E.splice(0,1),E.splice(E.length,0,-1*S+X),ke[y]++}}if(l>=-1*Ce[y]||0<=l){c=le(R).width();if(0<=l){f=-1*B[0];for(le(M).each(function(e){Te.setSliderOffset(le(M)[e],f+X),e<E.length&&(E[e]=-1*f),f+=z[e]}),H+=-1*E[0],Ce[y]=-1*E[0]+X,xe[y]=Ce[y]+c-x,ke[y]=L;0<-1*E[0]-c+X;){var g=0,v=Te.getSliderOffset(le(M[0]),"x");le(M).each(function(e){Te.getSliderOffset(this,"x")>v&&(v=Te.getSliderOffset(this,"x"),g=e)});S=Ce[y]-z[g];Te.setSliderOffset(le(M)[g],S),E.splice(0,0,-1*S+X),E.splice(E.length-1,1),Ce[y]=-1*E[0]+X,xe[y]=Ce[y]+c-x,ke[y]--,ye[y]++}}else{g=0,v=Te.getSliderOffset(le(M[0]),"x");le(M).each(function(e){Te.getSliderOffset(this,"x")>v&&(v=Te.getSliderOffset(this,"x"),g=e)});S=Ce[y]-z[g];Te.setSliderOffset(le(M)[g],S),E.splice(0,0,-1*S+X),E.splice(E.length-1,1),Ce[y]=-1*E[0]+X,xe[y]=Ce[y]+c-x,ke[y]--}}}else{c=le(R).width();l>-1*Ce[y]+X&&(t=(Ce[y]+-1*(H-n-eventX+a)*s-n)*o*-1/s),l<-1*xe[y]&&(t=(xe[y]+d+-1*(H-n-eventX)*s-n)*o*-1/s)}if(Te.setSliderOffset(R,-1*(H-n-eventX-t)*s-n+d),re.scrollbar){Te.showScrollbar(re,W),ae=Math.floor((H-eventX-t-Ce[y]+a)/(xe[y]-Ce[y]+X)*(k-A-C)*s);var b=C;l>=-1*Ce[y]+a+c?(b=C-N- -1*ae,Te.setSliderOffset(le("."+W),0),le("."+W).css({width:b+"px"})):l<=-1*xe[y]+1?(b=k-A-N-ae,Te.setSliderOffset(le("."+W),ae),le("."+W).css({width:b+"px"})):Te.setSliderOffset(le("."+W),ae)}"touchmove"==e.type&&(T=e.touches[0].pageX);var p=!1,m=Te.calcActiveOffset(re,-1*(H-eventX-t),E,x,ke[y],L,void 0,y),w=(m+ke[y]+L)%L;if(re.infiniteSlider?w!=Oe[y]&&(p=!0):m!=ye[y]&&(p=!0),p){ye[y]=m,Oe[y]=w,Z=!0;r=new Te.args("change",re,R,le(R).children(":eq("+w+")"),w,w);le(D).data("args",r),""!=re.onSlideChange&&re.onSlideChange(r)}}te=!1});var c=le(window);if(he||fe)c=le(document);le(a).bind("touchend.iosSliderEvent",function(e){e=e.originalEvent;if(Ne[y]||V)return!0;if(ie)return!0;if(0!=e.touches.length)for(var t=0;t<e.touches.length;t++)e.touches[t].pageX==T&&Te.slowScrollHorizontal(R,M,f,W,se,oe,C,x,k,A,N,B,E,z,y,b,L,n,Z,X,re);else Te.slowScrollHorizontal(R,M,f,W,se,oe,C,x,k,A,N,B,E,z,y,b,L,n,Z,X,re);te=J=!1}),le(c).bind("mouseup.iosSliderEvent"+y,function(e){if(Y?G.unbind("click.disableClick").bind("click.disableClick",Te.preventClick):G.unbind("click.disableClick").bind("click.disableClick",Te.enableClick),K.each(function(){this.onclick=function(e){if(Y)return!1;le(this).data("onclick").call(this,e||window.event)}}),1.8<=parseFloat(le().jquery)?Q.each(function(){var e=le._data(this,"events");if(null!=e&&null!=e.click&&"iosSliderEvent"!=e.click[0].namespace){if(!Y)return!1;le(this).one("click.disableClick",Te.preventClick);var t=le._data(this,"events").click,i=t.pop();t.splice(0,0,i)}}):1.6<=parseFloat(le().jquery)&&Q.each(function(){var e=le(this).data("events");if(null!=e&&null!=e.click&&"iosSliderEvent"!=e.click[0].namespace){if(!Y)return!1;le(this).one("click.disableClick",Te.preventClick);var t=le(this).data("events").click,i=t.pop();t.splice(0,0,i)}}),!me[y]){if(V)return!0;if(le(a).css({cursor:Se}),F=!1,null==l)return!0;Te.slowScrollHorizontal(l,M,f,W,se,oe,C,x,k,A,N,B,E,z,y,b,L,n,Z,X,re),l=void 0}te=J=!1})}})},destroy:function(l,e){return null==e&&(e=this),le(e).each(function(){var e=le(this),t=e.data("iosslider");if(null==t)return!1;null==l&&(l=!0),Te.autoSlidePause(t.sliderNumber),me[t.sliderNumber]=!0,le(window).unbind(".iosSliderEvent-"+t.sliderNumber),le(window).unbind(".iosSliderEvent"),le(document).unbind(".iosSliderEvent-"+t.sliderNumber),le(document).unbind("keydown.iosSliderEvent"),le(this).unbind(".iosSliderEvent"),le(this).children(":first-child").unbind(".iosSliderEvent"),le(this).children(":first-child").children().unbind(".iosSliderEvent"),l&&(le(this).attr("style",""),le(this).children(":first-child").attr("style",""),le(this).children(":first-child").children().attr("style",""),le(t.settings.navSlideSelector).attr("style",""),le(t.settings.navPrevSelector).attr("style",""),le(t.settings.navNextSelector).attr("style",""),le(t.settings.autoSlideToggleSelector).attr("style",""),le(t.settings.unselectableSelector).attr("style","")),t.settings.scrollbar&&le(".scrollbarBlock"+t.sliderNumber).remove();for(var i=we[t.sliderNumber],r=0;r<i.length;r++)clearTimeout(i[r]);e.removeData("iosslider"),e.removeData("args")})},update:function(e){return null==e&&(e=this),le(e).each(function(){var e=le(this),t=e.data("iosslider");if(null==t)return!1;t.settings.startAtSlide=e.data("args").currentSlideNumber,l.destroy(!1,this),1!=t.numberOfSlides&&t.settings.infiniteSlider&&(t.settings.startAtSlide=(ye[t.sliderNumber]+1+ke[t.sliderNumber]+t.numberOfSlides)%t.numberOfSlides),l.init(t.settings,this);var i=new Te.args("update",t.settings,t.scrollerNode,le(t.scrollerNode).children(":eq("+(t.settings.startAtSlide-1)+")"),t.settings.startAtSlide-1,t.settings.startAtSlide-1);le(t.stageNode).data("args",i),""!=t.settings.onSliderUpdate&&t.settings.onSliderUpdate(i)})},addSlide:function(i,r){return this.each(function(){var e=le(this),t=e.data("iosslider");if(null==t)return!1;0==le(t.scrollerNode).children().size()?(le(t.scrollerNode).append(i),e.data("args").currentSlideNumber=1):t.settings.infiniteSlider?(1==r?le(t.scrollerNode).children(":eq(0)").before(i):le(t.scrollerNode).children(":eq("+(r-2)+")").after(i),ke[t.sliderNumber]<-1&&ye[t.sliderNumber]--,e.data("args").currentSlideNumber>=r&&ye[t.sliderNumber]++):(r<=t.numberOfSlides?le(t.scrollerNode).children(":eq("+(r-1)+")").before(i):le(t.scrollerNode).children(":eq("+(r-2)+")").after(i),e.data("args").currentSlideNumber>=r&&e.data("args").currentSlideNumber++),e.data("iosslider").numberOfSlides++,l.update(this)})},removeSlide:function(t){return this.each(function(){var e=le(this).data("iosslider");if(null==e)return!1;le(e.scrollerNode).children(":eq("+(t-1)+")").remove(),ye[e.sliderNumber]>t-1&&ye[e.sliderNumber]--,l.update(this)})},goToSlide:function(t,e){return null==e&&(e=this),le(e).each(function(){var e=le(this).data("iosslider");if(null==e)return!1;t=t>e.childrenOffsets.length?e.childrenOffsets.length-1:t-1,Te.changeSlide(t,le(e.scrollerNode),le(e.slideNodes),we[e.sliderNumber],e.scrollbarClass,e.scrollbarWidth,e.stageWidth,e.scrollbarStageWidth,e.scrollMargin,e.scrollBorder,e.originalOffsets,e.childrenOffsets,e.slideNodeOuterWidths,e.sliderNumber,e.infiniteSliderWidth,e.numberOfSlides,e.centeredSlideOffset,e.settings),ye[e.sliderNumber]=t})},lock:function(){return this.each(function(){var e=le(this).data("iosslider");if(null==e)return!1;Ne[e.sliderNumber]=!0})},unlock:function(){return this.each(function(){var e=le(this).data("iosslider");if(null==e)return!1;Ne[e.sliderNumber]=!1})},getData:function(){return this.each(function(){var e=le(this).data("iosslider");return null!=e&&e})},autoSlidePause:function(){return this.each(function(){var e=le(this).data("iosslider");return null!=e&&(Te.autoSlidePause(e.sliderNumber),e)})},autoSlidePlay:function(){return this.each(function(){var e=le(this).data("iosslider");return null!=e&&(pe[e.sliderNumber].autoSlide=!0,Te.autoSlide(le(e.scrollerNode),le(e.slideNodes),we[e.sliderNumber],e.scrollbarClass,e.scrollbarWidth,e.stageWidth,e.scrollbarStageWidth,e.scrollMargin,e.scrollBorder,e.originalOffsets,e.childrenOffsets,e.slideNodeOuterWidths,e.sliderNumber,e.infiniteSliderWidth,e.numberOfSlides,e.centeredSlideOffset,e.settings),e)})}};le.fn.iosSlider=function(e){return l[e]?l[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void le.error("invalid method call!"):l.init.apply(this,arguments)}}(jQuery);