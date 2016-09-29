angular.module("ui.bootstrap",["ui.bootstrap.buttons","ui.bootstrap.isClass","ui.bootstrap.position","ui.bootstrap.debounce","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover"]),angular.module("ui.bootstrap.buttons",[]).constant("uibButtonConfig",{activeClass:"active",toggleEvent:"click"}).controller("UibButtonsController",["uibButtonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("uibBtnRadio",["$parse",function(a){return{require:["uibBtnRadio","ngModel"],controller:"UibButtonsController",controllerAs:"buttons",link:function(b,c,d,e){var f=e[0],g=e[1],h=a(d.uibUncheckable);c.find("input").css({display:"none"}),g.$render=function(){c.toggleClass(f.activeClass,angular.equals(g.$modelValue,b.$eval(d.uibBtnRadio)))},c.on(f.toggleEvent,function(){if(!d.disabled){var a=c.hasClass(f.activeClass);a&&!angular.isDefined(d.uncheckable)||b.$apply(function(){g.$setViewValue(a?null:b.$eval(d.uibBtnRadio)),g.$render()})}}),d.uibUncheckable&&b.$watch(h,function(a){d.$set("uncheckable",a?"":void 0)})}}}]).directive("uibBtnCheckbox",function(){return{require:["uibBtnCheckbox","ngModel"],controller:"UibButtonsController",controllerAs:"button",link:function(a,b,c,d){function g(){return i(c.btnCheckboxTrue,!0)}function h(){return i(c.btnCheckboxFalse,!1)}function i(b,c){return angular.isDefined(b)?a.$eval(b):c}var e=d[0],f=d[1];b.find("input").css({display:"none"}),f.$render=function(){b.toggleClass(e.activeClass,angular.equals(f.$modelValue,g()))},b.on(e.toggleEvent,function(){c.disabled||a.$apply(function(){f.$setViewValue(b.hasClass(e.activeClass)?h():g()),f.$render()})})}}}),angular.module("ui.bootstrap.isClass",[]).directive("uibIsClass",["$animate",function(a){var b=/^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/,c=/^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;return{restrict:"A",compile:function(d,e){function n(a,b,c){f.push(a),g.push({scope:a,element:b}),m.forEach(function(b,c){o(b,a)}),a.$on("$destroy",p)}function o(b,d){var e=b.match(c),f=d.$eval(e[1]),i=e[2],j=h[b];if(!j){var l=function(b){var c=null;g.some(function(a){var d=a.scope.$eval(k);if(d===b)return c=a,!0}),j.lastActivated!==c&&(j.lastActivated&&a.removeClass(j.lastActivated.element,f),c&&a.addClass(c.element,f),j.lastActivated=c)};h[b]=j={lastActivated:null,scope:d,watchFn:l,compareWithExp:i,watcher:d.$watch(i,l)}}j.watchFn(d.$eval(i))}function p(a){var b=a.targetScope,c=f.indexOf(b);if(f.splice(c,1),g.splice(c,1),f.length){var d=f[0];angular.forEach(h,function(a){a.scope===b&&(a.watcher=d.$watch(a.compareWithExp,a.watchFn),a.scope=d)})}else h={}}var f=[],g=[],h={},j=e.uibIsClass.match(b),k=j[2],l=j[1],m=l.split(",");return n}}}]),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(a,b){var c,d,e={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},f={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},g=/(HTML|BODY)/;return{getRawNode:function(a){return a.nodeName?a:a[0]||a},parseStyle:function(a){return a=parseFloat(a),isFinite(a)?a:0},offsetParent:function(c){function e(a){return"static"===(b.getComputedStyle(a).position||"static")}c=this.getRawNode(c);for(var d=c.offsetParent||a[0].documentElement;d&&d!==a[0].documentElement&&e(d);)d=d.offsetParent;return d||a[0].documentElement},scrollbarWidth:function(e){if(e){if(angular.isUndefined(d)){var f=a.find("body");f.addClass("uib-position-body-scrollbar-measure"),d=b.innerWidth-f[0].clientWidth,d=isFinite(d)?d:0,f.removeClass("uib-position-body-scrollbar-measure")}return d}if(angular.isUndefined(c)){var g=angular.element('<div class="uib-position-scrollbar-measure"></div>');a.find("body").append(g),c=g[0].offsetWidth-g[0].clientWidth,c=isFinite(c)?c:0,g.remove()}return c},scrollbarPadding:function(a){a=this.getRawNode(a);var c=b.getComputedStyle(a),d=this.parseStyle(c.paddingRight),e=this.parseStyle(c.paddingBottom),f=this.scrollParent(a,!1,!0),h=this.scrollbarWidth(f,g.test(f.tagName));return{scrollbarWidth:h,widthOverflow:f.scrollWidth>f.clientWidth,right:d+h,originalRight:d,heightOverflow:f.scrollHeight>f.clientHeight,bottom:e+h,originalBottom:e}},isScrollable:function(a,c){a=this.getRawNode(a);var d=c?e.hidden:e.normal,f=b.getComputedStyle(a);return d.test(f.overflow+f.overflowY+f.overflowX)},scrollParent:function(c,d,f){c=this.getRawNode(c);var g=d?e.hidden:e.normal,h=a[0].documentElement,i=b.getComputedStyle(c);if(f&&g.test(i.overflow+i.overflowY+i.overflowX))return c;var j="absolute"===i.position,k=c.parentElement||h;if(k===h||"fixed"===i.position)return h;for(;k.parentElement&&k!==h;){var l=b.getComputedStyle(k);if(j&&"static"!==l.position&&(j=!1),!j&&g.test(l.overflow+l.overflowY+l.overflowX))break;k=k.parentElement}return k},position:function(c,d){c=this.getRawNode(c);var e=this.offset(c);if(d){var f=b.getComputedStyle(c);e.top-=this.parseStyle(f.marginTop),e.left-=this.parseStyle(f.marginLeft)}var g=this.offsetParent(c),h={top:0,left:0};return g!==a[0].documentElement&&(h=this.offset(g),h.top+=g.clientTop-g.scrollTop,h.left+=g.clientLeft-g.scrollLeft),{width:Math.round(angular.isNumber(e.width)?e.width:c.offsetWidth),height:Math.round(angular.isNumber(e.height)?e.height:c.offsetHeight),top:Math.round(e.top-h.top),left:Math.round(e.left-h.left)}},offset:function(c){c=this.getRawNode(c);var d=c.getBoundingClientRect();return{width:Math.round(angular.isNumber(d.width)?d.width:c.offsetWidth),height:Math.round(angular.isNumber(d.height)?d.height:c.offsetHeight),top:Math.round(d.top+(b.pageYOffset||a[0].documentElement.scrollTop)),left:Math.round(d.left+(b.pageXOffset||a[0].documentElement.scrollLeft))}},viewportOffset:function(c,d,e){c=this.getRawNode(c),e=e!==!1;var f=c.getBoundingClientRect(),g={top:0,left:0,bottom:0,right:0},h=d?a[0].documentElement:this.scrollParent(c),i=h.getBoundingClientRect();if(g.top=i.top+h.clientTop,g.left=i.left+h.clientLeft,h===a[0].documentElement&&(g.top+=b.pageYOffset,g.left+=b.pageXOffset),g.bottom=g.top+h.clientHeight,g.right=g.left+h.clientWidth,e){var j=b.getComputedStyle(h);g.top+=this.parseStyle(j.paddingTop),g.bottom-=this.parseStyle(j.paddingBottom),g.left+=this.parseStyle(j.paddingLeft),g.right-=this.parseStyle(j.paddingRight)}return{top:Math.round(f.top-g.top),bottom:Math.round(g.bottom-f.bottom),left:Math.round(f.left-g.left),right:Math.round(g.right-f.right)}},parsePlacement:function(a){var b=f.auto.test(a);return b&&(a=a.replace(f.auto,"")),a=a.split("-"),a[0]=a[0]||"top",f.primary.test(a[0])||(a[0]="top"),a[1]=a[1]||"center",f.secondary.test(a[1])||(a[1]="center"),b?a[2]=!0:a[2]=!1,a},positionElements:function(a,c,d,e){a=this.getRawNode(a),c=this.getRawNode(c);var g=angular.isDefined(c.offsetWidth)?c.offsetWidth:c.prop("offsetWidth"),h=angular.isDefined(c.offsetHeight)?c.offsetHeight:c.prop("offsetHeight");d=this.parsePlacement(d);var i=e?this.offset(a):this.position(a),j={top:0,left:0,placement:""};if(d[2]){var k=this.viewportOffset(a,e),l=b.getComputedStyle(c),m={width:g+Math.round(Math.abs(this.parseStyle(l.marginLeft)+this.parseStyle(l.marginRight))),height:h+Math.round(Math.abs(this.parseStyle(l.marginTop)+this.parseStyle(l.marginBottom)))};if(d[0]="top"===d[0]&&m.height>k.top&&m.height<=k.bottom?"bottom":"bottom"===d[0]&&m.height>k.bottom&&m.height<=k.top?"top":"left"===d[0]&&m.width>k.left&&m.width<=k.right?"right":"right"===d[0]&&m.width>k.right&&m.width<=k.left?"left":d[0],d[1]="top"===d[1]&&m.height-i.height>k.bottom&&m.height-i.height<=k.top?"bottom":"bottom"===d[1]&&m.height-i.height>k.top&&m.height-i.height<=k.bottom?"top":"left"===d[1]&&m.width-i.width>k.right&&m.width-i.width<=k.left?"right":"right"===d[1]&&m.width-i.width>k.left&&m.width-i.width<=k.right?"left":d[1],"center"===d[1])if(f.vertical.test(d[0])){var n=i.width/2-g/2;k.left+n<0&&m.width-i.width<=k.right?d[1]="left":k.right+n<0&&m.width-i.width<=k.left&&(d[1]="right")}else{var o=i.height/2-m.height/2;k.top+o<0&&m.height-i.height<=k.bottom?d[1]="top":k.bottom+o<0&&m.height-i.height<=k.top&&(d[1]="bottom")}}switch(d[0]){case"top":j.top=i.top-h;break;case"bottom":j.top=i.top+i.height;break;case"left":j.left=i.left-g;break;case"right":j.left=i.left+i.width}switch(d[1]){case"top":j.top=i.top;break;case"bottom":j.top=i.top+i.height-h;break;case"left":j.left=i.left;break;case"right":j.left=i.left+i.width-g;break;case"center":f.vertical.test(d[0])?j.left=i.left+i.width/2-g/2:j.top=i.top+i.height/2-h/2}return j.top=Math.round(j.top),j.left=Math.round(j.left),j.placement="center"===d[1]?d[0]:d[0]+"-"+d[1],j},positionArrow:function(a,c){a=this.getRawNode(a);var d=a.querySelector(".tooltip-inner, .popover-inner");if(d){var e=angular.element(d).hasClass("tooltip-inner"),g=e?a.querySelector(".tooltip-arrow"):a.querySelector(".arrow");if(g){var h={top:"",bottom:"",left:"",right:""};if(c=this.parsePlacement(c),"center"===c[1])return void angular.element(g).css(h);var i="border-"+c[0]+"-width",j=b.getComputedStyle(g)[i],k="border-";k+=f.vertical.test(c[0])?c[0]+"-"+c[1]:c[1]+"-"+c[0],k+="-radius";var l=b.getComputedStyle(e?d:a)[k];switch(c[0]){case"top":h.bottom=e?"0":"-"+j;break;case"bottom":h.top=e?"0":"-"+j;break;case"left":h.right=e?"0":"-"+j;break;case"right":h.left=e?"0":"-"+j}h[c[1]]=l,angular.element(g).css(h)}}}}}]),angular.module("ui.bootstrap.debounce",[]).factory("$$debounce",["$timeout",function(a){return function(b,c){var d;return function(){var e=this,f=Array.prototype.slice.call(arguments);d&&a.cancel(d),d=a(function(){b.apply(e,f)},c)}}}]),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b===a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b===a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap","ui.bootstrap.position"]).factory("$$multiMap",function(){return{createNew:function(){var a={};return{entries:function(){return Object.keys(a).map(function(b){return{key:b,value:a[b]}})},get:function(b){return a[b]},hasKey:function(b){return!!a[b]},keys:function(){return Object.keys(a)},put:function(b,c){a[b]||(a[b]=[]),a[b].push(c)},remove:function(b,c){var d=a[b];if(d){var e=d.indexOf(c);e!==-1&&d.splice(e,1),d.length||delete a[b]}}}}}}).provider("$uibResolve",function(){var a=this;this.resolver=null,this.setResolver=function(a){this.resolver=a},this.$get=["$injector","$q",function(b,c){var d=a.resolver?b.get(a.resolver):null;return{resolve:function(a,e,f,g){if(d)return d.resolve(a,e,f,g);var h=[];return angular.forEach(a,function(a){angular.isFunction(a)||angular.isArray(a)?h.push(c.resolve(b.invoke(a))):angular.isString(a)?h.push(c.resolve(b.get(a))):h.push(c.resolve(a))}),c.all(h).then(function(b){var c={},d=0;return angular.forEach(a,function(a,e){c[e]=b[d++]}),c})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(a,b,c){function d(b,d,e){e.modalInClass&&(a.addClass(d,e.modalInClass),b.$on(c.NOW_CLOSING_EVENT,function(c,f){var g=f();b.modalOptions.animation?a.removeClass(d,e.modalInClass).then(g):g()}))}return{replace:!0,templateUrl:"uib/template/modal/backdrop.html",compile:function(a,b){return a.addClass(b.backdropClass),d}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(a,b,c,d){return{scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/modal/window.html"},link:function(e,f,g){f.addClass(g.windowClass||""),f.addClass(g.windowTopClass||""),e.size=g.size,e.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!==c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))},f.on("click",e.close),e.$isRendered=!0;var h=b.defer();g.$observe("modalRender",function(a){"true"===a&&h.resolve()}),h.promise.then(function(){var h=null;g.modalInClass&&(h=c(f,{addClass:g.modalInClass}).start(),e.$on(a.NOW_CLOSING_EVENT,function(a,b){var d=b();c(f,{removeClass:g.modalInClass}).start().then(d)})),b.when(h).then(function(){var b=a.getTop();if(b&&a.modalRendered(b.key),!d[0].activeElement||!f[0].contains(d[0].activeElement)){var c=f[0].querySelector("[autofocus]");c?c.focus():f[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(a,b){b.modalAnimation&&a.addClass(b.uibModalAnimationClass)}}}).directive("uibModalTransclude",function(){return{link:function(a,b,c,d,e){e(a.$parent,function(a){b.empty(),b.append(a)})}}}).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(a,b,c,d,e,f,g,h,i){function t(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)}function u(){for(var a=-1,b=m.keys(),c=0;c<b.length;c++)m.get(b[c]).value.backdrop&&(a=c);return a>-1&&a<p&&(a=p),a}function v(a,b){var c=m.get(a).value,d=c.appendTo;m.remove(a),q=m.top(),q&&(p=parseInt(q.value.modalDomEl.attr("index"),10)),y(c.modalDomEl,c.modalScope,function(){var b=c.openedClass||j;n.remove(b,a);var e=n.hasKey(b);d.toggleClass(b,e),!e&&s&&s.heightOverflow&&s.scrollbarWidth&&(s.originalRight?d.css({paddingRight:s.originalRight+"px"}):d.css({paddingRight:""}),s=null),w(!0)},c.closedDeferred),x(),b&&b.focus?b.focus():d.focus&&d.focus()}function w(a){var b;m.length()>0&&(b=m.top().value,b.modalDomEl.toggleClass(b.windowTopClass||"",a))}function x(){if(k&&u()===-1){var a=l;y(k,l,function(){a=null}),k=void 0,l=void 0}}function y(b,c,d,e){function j(){j.done||(j.done=!0,a.leave(b).then(function(){b.remove(),e&&e.resolve()}),c.$destroy(),d&&d())}var g,h=null,i=function(){return g||(g=f.defer(),h=g.promise),function(){g.resolve()}};return c.$broadcast(o.NOW_CLOSING_EVENT,i),f.when(h).then(j)}function z(a){if(a.isDefaultPrevented())return a;var b=m.top();if(b)switch(a.which){case 27:b.value.keyboard&&(a.preventDefault(),e.$apply(function(){o.dismiss(b.key,"escape key press")}));break;case 9:var c=o.loadFocusElementList(b),d=!1;a.shiftKey?(o.isFocusInFirstItem(a,c)||o.isModalFocused(a,b))&&(d=o.focusLastFocusableElement(c)):o.isFocusInLastItem(a,c)&&(d=o.focusFirstFocusableElement(c)),d&&(a.preventDefault(),a.stopPropagation())}}function A(a,b,c){return!a.value.modalScope.$broadcast("modal.closing",b,c).defaultPrevented}var k,l,s,j="modal-open",m=h.createNew(),n=g.createNew(),o={NOW_CLOSING_EVENT:"modal.stack.now-closing"},p=0,q=null,r="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";return e.$watch(u,function(a){l&&(l.index=a)}),c.on("keydown",z),e.$on("$destroy",function(){c.off("keydown",z)}),o.open=function(b,f){var g=c[0].activeElement,h=f.openedClass||j;w(!1),q=m.top(),m.add(b,{deferred:f.deferred,renderDeferred:f.renderDeferred,closedDeferred:f.closedDeferred,modalScope:f.scope,backdrop:f.backdrop,keyboard:f.keyboard,openedClass:f.openedClass,windowTopClass:f.windowTopClass,animation:f.animation,appendTo:f.appendTo}),n.put(h,b);var o=f.appendTo,r=u();if(!o.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");r>=0&&!k&&(l=e.$new(!0),l.modalOptions=f,l.index=r,k=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),k.attr("backdrop-class",f.backdropClass),f.animation&&k.attr("modal-animation","true"),d(k)(l),a.enter(k,o),s=i.scrollbarPadding(o),s.heightOverflow&&s.scrollbarWidth&&o.css({paddingRight:s.right+"px"})),p=q?parseInt(q.value.modalDomEl.attr("index"),10)+1:0;var t=angular.element('<div uib-modal-window="modal-window"></div>');t.attr({"template-url":f.windowTemplateUrl,"window-class":f.windowClass,"window-top-class":f.windowTopClass,size:f.size,index:p,animate:"animate"}).html(f.content),f.animation&&t.attr("modal-animation","true"),o.addClass(h),a.enter(d(t)(f.scope),o),m.top().value.modalDomEl=t,m.top().value.modalOpener=g},o.close=function(a,b){var c=m.get(a);return c&&A(c,b,!0)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.resolve(b),v(a,c.value.modalOpener),!0):!c},o.dismiss=function(a,b){var c=m.get(a);return c&&A(c,b,!1)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.reject(b),v(a,c.value.modalOpener),!0):!c},o.dismissAll=function(a){for(var b=this.getTop();b&&this.dismiss(b.key,a);)b=this.getTop()},o.getTop=function(){return m.top()},o.modalRendered=function(a){var b=m.get(a);b&&b.value.renderDeferred.resolve()},o.focusFirstFocusableElement=function(a){return a.length>0&&(a[0].focus(),!0)},o.focusLastFocusableElement=function(a){return a.length>0&&(a[a.length-1].focus(),!0)},o.isModalFocused=function(a,b){if(a&&b){var c=b.value.modalDomEl;if(c&&c.length)return(a.target||a.srcElement)===c[0]}return!1},o.isFocusInFirstItem=function(a,b){return b.length>0&&(a.target||a.srcElement)===b[0]},o.isFocusInLastItem=function(a,b){return b.length>0&&(a.target||a.srcElement)===b[b.length-1]},o.loadFocusElementList=function(a){if(a){var b=a.value.modalDomEl;if(b&&b.length){var c=b[0].querySelectorAll(r);return c?Array.prototype.filter.call(c,function(a){return t(a)}):c}}},o}]).provider("$uibModal",function(){var a={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(b,c,d,e,f,g,h){function j(a){return a.template?c.when(a.template):e(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl)}var i={},k=null;return i.getPromiseChain=function(){return k},i.open=function(e){function q(){return p}var i=c.defer(),l=c.defer(),m=c.defer(),n=c.defer(),o={result:i.promise,opened:l.promise,closed:m.promise,rendered:n.promise,close:function(a){return h.close(o,a)},dismiss:function(a){return h.dismiss(o,a)}};if(e=angular.extend({},a.options,e),e.resolve=e.resolve||{},e.appendTo=e.appendTo||d.find("body").eq(0),!e.template&&!e.templateUrl)throw new Error("One of template or templateUrl options is required.");var r,p=c.all([j(e),g.resolve(e.resolve,{},null,null)]);return r=k=c.all([k]).then(q,q).then(function(c){var d=e.scope||b,g=d.$new();g.$close=o.close,g.$dismiss=o.dismiss,g.$on("$destroy",function(){g.$$uibDestructionScheduled||g.$dismiss("$uibUnscheduledDestruction")});var j,k,p={};e.controller&&(p.$scope=g,p.$scope.$resolve={},p.$uibModalInstance=o,angular.forEach(c[1],function(a,b){p[b]=a,p.$scope.$resolve[b]=a}),k=f(e.controller,p,!0,e.controllerAs),e.controllerAs&&e.bindToController&&(j=k.instance,j.$close=g.$close,j.$dismiss=g.$dismiss,angular.extend(j,{$resolve:p.$scope.$resolve},d)),j=k(),angular.isFunction(j.$onInit)&&j.$onInit()),h.open(o,{scope:g,deferred:i,renderDeferred:n,closedDeferred:m,content:c[0],animation:e.animation,backdrop:e.backdrop,keyboard:e.keyboard,backdropClass:e.backdropClass,windowTopClass:e.windowTopClass,windowClass:e.windowClass,windowTemplateUrl:e.windowTemplateUrl,size:e.size,openedClass:e.openedClass,appendTo:e.appendTo}),l.resolve(!0)},function(b){l.reject(b),i.reject(b)}).finally(function(){k===r&&(k=null)}),o},i}]};return a}),angular.module("ui.bootstrap.paging",[]).factory("uibPaging",["$parse",function(a){return{create:function(b,c,d){b.setNumPages=d.numPages?a(d.numPages).assign:angular.noop,b.ngModelCtrl={$setViewValue:angular.noop},b._watchers=[],b.init=function(a,e){b.ngModelCtrl=a,b.config=e,a.$render=function(){b.render()},d.itemsPerPage?b._watchers.push(c.$parent.$watch(d.itemsPerPage,function(a){b.itemsPerPage=parseInt(a,10),c.totalPages=b.calculateTotalPages(),b.updatePage()})):b.itemsPerPage=e.itemsPerPage,c.$watch("totalItems",function(a,d){(angular.isDefined(a)||a!==d)&&(c.totalPages=b.calculateTotalPages(),b.updatePage())})},b.calculateTotalPages=function(){var a=b.itemsPerPage<1?1:Math.ceil(c.totalItems/b.itemsPerPage);return Math.max(a||0,1)},b.render=function(){c.page=parseInt(b.ngModelCtrl.$viewValue,10)||1},c.selectPage=function(a,d){d&&d.preventDefault();var e=!c.ngDisabled||!d;e&&c.page!==a&&a>0&&a<=c.totalPages&&(d&&d.target&&d.target.blur(),b.ngModelCtrl.$setViewValue(a),b.ngModelCtrl.$render())},c.getText=function(a){return c[a+"Text"]||b.config[a+"Text"]},c.noPrevious=function(){return 1===c.page},c.noNext=function(){return c.page===c.totalPages},b.updatePage=function(){b.setNumPages(c.$parent,c.totalPages),c.page>c.totalPages?c.selectPage(c.totalPages):b.ngModelCtrl.$render()},c.$on("$destroy",function(){for(;b._watchers.length;)b._watchers.shift()()})}}}]),angular.module("ui.bootstrap.pager",["ui.bootstrap.paging"]).controller("UibPagerController",["$scope","$attrs","uibPaging","uibPagerConfig",function(a,b,c,d){a.align=angular.isDefined(b.align)?a.$parent.$eval(b.align):d.align,c.create(this,a,b)}]).constant("uibPagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("uibPager",["uibPagerConfig",function(a){return{scope:{totalItems:"=",previousText:"@",nextText:"@",ngDisabled:"="},require:["uibPager","?ngModel"],controller:"UibPagerController",controllerAs:"pager",templateUrl:function(a,b){return b.templateUrl||"uib/template/pager/pager.html"},replace:!0,link:function(b,c,d,e){var f=e[0],g=e[1];g&&f.init(g,a)}}}]),angular.module("ui.bootstrap.pagination",["ui.bootstrap.paging"]).controller("UibPaginationController",["$scope","$attrs","$parse","uibPaging","uibPaginationConfig",function(a,b,c,d,e){function l(a,b,c){return{number:a,text:b,active:c}}function m(a,b){var c=[],d=1,e=b,f=angular.isDefined(g)&&g<b;f&&(h?(d=Math.max(a-Math.floor(g/2),1),e=d+g-1,e>b&&(e=b,d=e-g+1)):(d=(Math.ceil(a/g)-1)*g+1,e=Math.min(d+g-1,b)));for(var m=d;m<=e;m++){var n=l(m,k(m),m===a);c.push(n)}if(f&&g>0&&(!h||i||j)){if(d>1){if(!j||d>3){var o=l(d-1,"...",!1);c.unshift(o)}if(j){if(3===d){var p=l(2,"2",!1);c.unshift(p)}var q=l(1,"1",!1);c.unshift(q)}}if(e<b){if(!j||e<b-2){var r=l(e+1,"...",!1);c.push(r)}if(j){if(e===b-2){var s=l(b-1,b-1,!1);c.push(s)}var t=l(b,b,!1);c.push(t)}}}return c}var f=this,g=angular.isDefined(b.maxSize)?a.$parent.$eval(b.maxSize):e.maxSize,h=angular.isDefined(b.rotate)?a.$parent.$eval(b.rotate):e.rotate,i=angular.isDefined(b.forceEllipses)?a.$parent.$eval(b.forceEllipses):e.forceEllipses,j=angular.isDefined(b.boundaryLinkNumbers)?a.$parent.$eval(b.boundaryLinkNumbers):e.boundaryLinkNumbers,k=angular.isDefined(b.pageLabel)?function(c){return a.$parent.$eval(b.pageLabel,{$page:c})}:angular.identity;a.boundaryLinks=angular.isDefined(b.boundaryLinks)?a.$parent.$eval(b.boundaryLinks):e.boundaryLinks,a.directionLinks=angular.isDefined(b.directionLinks)?a.$parent.$eval(b.directionLinks):e.directionLinks,d.create(this,a,b),b.maxSize&&f._watchers.push(a.$parent.$watch(c(b.maxSize),function(a){g=parseInt(a,10),f.render()}));var n=this.render;this.render=function(){n(),a.page>0&&a.page<=a.totalPages&&(a.pages=m(a.page,a.totalPages))}}]).constant("uibPaginationConfig",{itemsPerPage:10,boundaryLinks:!1,boundaryLinkNumbers:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0,forceEllipses:!1}).directive("uibPagination",["$parse","uibPaginationConfig",function(a,b){return{scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["uibPagination","?ngModel"],controller:"UibPaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"uib/template/pagination/pagination.html"},replace:!0,link:function(a,c,d,e){var f=e[0],g=e[1];g&&f.init(g,b)}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.stackedMap"]).provider("$uibTooltip",function(){function d(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var a={placement:"top",placementClassPrefix:"",animation:!0,popupDelay:0,popupCloseDelay:0,useContentExp:!1},b={mouseenter:"mouseleave",click:"click",outsideClick:"outsideClick",focus:"blur",none:""},c={};this.options=function(a){angular.extend(c,a)},this.setTriggers=function(c){angular.extend(b,c)},this.$get=["$window","$compile","$timeout","$document","$uibPosition","$interpolate","$rootScope","$parse","$$stackedMap",function(e,f,g,h,i,j,k,l,m){function o(a){if(27===a.which){var b=n.top();b&&(b.value.close(),n.removeTop(),b=null)}}var n=m.createNew();return h.on("keypress",o),k.$on("$destroy",function(){h.off("keypress",o)}),function(k,m,o,p){function q(a){var c=(a||p.trigger||o).split(" "),d=c.map(function(a){return b[a]||a});return{show:c,hide:d}}p=angular.extend({},a,c,p);var r=d(k),s=j.startSymbol(),t=j.endSymbol(),u="<div "+r+'-popup uib-title="'+s+"title"+t+'" '+(p.useContentExp?'content-exp="contentExp()" ':'content="'+s+"content"+t+'" ')+'placement="'+s+"placement"+t+'" popup-class="'+s+"popupClass"+t+'" animation="animation" is-open="isOpen" origin-scope="origScope" class="uib-position-measure"></div>';return{compile:function(a,b){var c=f(u);return function(b,d,e,f){function F(){y.isOpen?H():G()}function G(){x&&!b.$eval(e[m+"Enable"])||(L(),O(),y.popupDelay?s||(s=g(I,y.popupDelay,!1)):I())}function H(){J(),y.popupCloseDelay?t||(t=g(K,y.popupCloseDelay,!1)):K()}function I(){return J(),L(),y.content?(M(),void y.$evalAsync(function(){y.isOpen=!0,P(!0),E()})):angular.noop}function J(){s&&(g.cancel(s),s=null),u&&(g.cancel(u),u=null)}function K(){y&&y.$evalAsync(function(){y&&(y.isOpen=!1,P(!1),y.animation?r||(r=g(N,150,!1)):N())})}function L(){t&&(g.cancel(t),t=null),r&&(g.cancel(r),r=null)}function M(){j||(o=y.$new(),j=c(o,function(a){v?h.find("body").append(a):d.after(a)}),Q())}function N(){J(),L(),R(),j&&(j.remove(),j=null),o&&(o.$destroy(),o=null)}function O(){y.title=e[m+"Title"],B?y.content=B(b):y.content=e[k],y.popupClass=e[m+"Class"],y.placement=angular.isDefined(e[m+"Placement"])?e[m+"Placement"]:p.placement;var a=i.parsePlacement(y.placement);D=a[1]?a[0]+"-"+a[1]:a[0];var c=parseInt(e[m+"PopupDelay"],10),d=parseInt(e[m+"PopupCloseDelay"],10);y.popupDelay=isNaN(c)?p.popupDelay:c,y.popupCloseDelay=isNaN(d)?p.popupCloseDelay:d}function P(a){A&&angular.isFunction(A.assign)&&A.assign(b,a)}function Q(){C.length=0,B?(C.push(b.$watch(B,function(a){y.content=a,!a&&y.isOpen&&K()})),C.push(o.$watch(function(){z||(z=!0,o.$$postDigest(function(){z=!1,y&&y.isOpen&&E()}))}))):C.push(e.$observe(k,function(a){y.content=a,!a&&y.isOpen?K():E()})),C.push(e.$observe(m+"Title",function(a){y.title=a,y.isOpen&&E()})),C.push(e.$observe(m+"Placement",function(a){y.placement=a?a:p.placement,y.isOpen&&E()}))}function R(){C.length&&(angular.forEach(C,function(a){a()}),C.length=0)}function S(a){y&&y.isOpen&&j&&(d[0].contains(a.target)||j[0].contains(a.target)||H())}function U(){var a=e[m+"Trigger"];T(),w=q(a),"none"!==w.show&&w.show.forEach(function(a,b){"outsideClick"===a?(d.on("click",F),h.on("click",S)):a===w.hide[b]?d.on(a,F):a&&(d.on(a,G),d.on(w.hide[b],H)),d.on("keypress",function(a){27===a.which&&H()})})}var j,o,r,s,t,u,D,v=!!angular.isDefined(p.appendToBody)&&p.appendToBody,w=q(void 0),x=angular.isDefined(e[m+"Enable"]),y=b.$new(!0),z=!1,A=!!angular.isDefined(e[m+"IsOpen"])&&l(e[m+"IsOpen"]),B=!!p.useContentExp&&l(e[k]),C=[],E=function(){j&&j.html()&&(u||(u=g(function(){var a=i.positionElements(d,j,y.placement,v);j.css({top:a.top+"px",left:a.left+"px"}),j.hasClass(a.placement.split("-")[0])||(j.removeClass(D.split("-")[0]),j.addClass(a.placement.split("-")[0])),j.hasClass(p.placementClassPrefix+a.placement)||(j.removeClass(p.placementClassPrefix+D),j.addClass(p.placementClassPrefix+a.placement)),j.hasClass("uib-position-measure")?(i.positionArrow(j,a.placement),j.removeClass("uib-position-measure")):D!==a.placement&&i.positionArrow(j,a.placement),D=a.placement,u=null},0,!1)))};y.origScope=b,y.isOpen=!1,n.add(y,{close:K}),y.contentExp=function(){return y.content},e.$observe("disabled",function(a){a&&J(),a&&y.isOpen&&K()}),A&&b.$watch(A,function(a){y&&!a===y.isOpen&&F()});var T=function(){w.show.forEach(function(a){"outsideClick"===a?d.off("click",F):(d.off(a,G),d.off(a,F))}),w.hide.forEach(function(a){"outsideClick"===a?h.off("click",S):d.off(a,H)})};U();var V=b.$eval(e[m+"Animation"]);y.animation=angular.isDefined(V)?!!V:p.animation;var W,X=m+"AppendToBody";W=X in e&&void 0===e[X]||b.$eval(e[X]),v=angular.isDefined(W)?W:v,b.$on("$destroy",function(){T(),N(),n.remove(y),y=null})}}}}}]}).directive("uibTooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest",function(a,b,c,d){return{link:function(e,f,g){var j,k,l,h=e.$eval(g.tooltipTemplateTranscludeScope),i=0,m=function(){k&&(k.remove(),k=null),j&&(j.$destroy(),j=null),l&&(a.leave(l).then(function(){k=null}),k=l,l=null)};e.$watch(b.parseAsResourceUrl(g.uibTooltipTemplateTransclude),function(b){var g=++i;b?(d(b,!0).then(function(d){if(g===i){var e=h.$new(),k=d,n=c(k)(e,function(b){m(),a.enter(b,f)});j=e,l=n,j.$emit("$includeContentLoaded",b)}},function(){g===i&&(m(),e.$emit("$includeContentError",b))}),e.$emit("$includeContentRequested",b)):m()}),e.$on("$destroy",m)}}}]).directive("uibTooltipClasses",["$uibPosition",function(a){return{restrict:"A",link:function(b,c,d){if(b.placement){var e=a.parsePlacement(b.placement);c.addClass(e[0])}b.popupClass&&c.addClass(b.popupClass),b.animation()&&c.addClass(d.tooltipAnimationClass)}}}]).directive("uibTooltipPopup",function(){return{replace:!0,scope:{content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/tooltip/tooltip-popup.html"}}).directive("uibTooltip",["$uibTooltip",function(a){return a("uibTooltip","tooltip","mouseenter")}]).directive("uibTooltipTemplatePopup",function(){return{replace:!0,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"uib/template/tooltip/tooltip-template-popup.html"}}).directive("uibTooltipTemplate",["$uibTooltip",function(a){return a("uibTooltipTemplate","tooltip","mouseenter",{useContentExp:!0})}]).directive("uibTooltipHtmlPopup",function(){return{replace:!0,scope:{contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/tooltip/tooltip-html-popup.html"}}).directive("uibTooltipHtml",["$uibTooltip",function(a){return a("uibTooltipHtml","tooltip","mouseenter",{useContentExp:!0})}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup",function(){return{replace:!0,scope:{uibTitle:"@",contentExp:"&",placement:"@",popupClass:"@",animation:"&",isOpen:"&",originScope:"&"},templateUrl:"uib/template/popover/popover-template.html"}}).directive("uibPopoverTemplate",["$uibTooltip",function(a){return a("uibPopoverTemplate","popover","click",{useContentExp:!0})}]).directive("uibPopoverHtmlPopup",function(){return{replace:!0,scope:{contentExp:"&",uibTitle:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/popover/popover-html.html"}}).directive("uibPopoverHtml",["$uibTooltip",function(a){return a("uibPopoverHtml","popover","click",{useContentExp:!0})}]).directive("uibPopoverPopup",function(){return{replace:!0,scope:{uibTitle:"@",content:"@",placement:"@",popupClass:"@",animation:"&",isOpen:"&"},templateUrl:"uib/template/popover/popover.html"}}).directive("uibPopover",["$uibTooltip",function(a){return a("uibPopover","popover","click")}]),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),
angular.$$uibPositionCss=!0}),angular.module("ui.bootstrap.tooltip").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTooltipCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'),angular.$$uibTooltipCss=!0});