(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"8+s/":function(e,t,n){"use strict";function r(e){return e&&"object"===typeof e&&"default"in e?e["default"]:e}var o=n("q1tI"),a=r(o),i=r(n("Gytx"));function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var l=!("undefined"===typeof window||!window.document||!window.document.createElement);function s(e,t,n){if("function"!==typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!==typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if("undefined"!==typeof n&&"function"!==typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");function r(e){return e.displayName||e.name||"Component"}return function(s){if("function"!==typeof s)throw new Error("Expected WrappedComponent to be a React component.");var f,T=[];function d(){f=e(T.map(function(e){return e.props})),p.canUseDOM?t(f):n&&(f=n(f))}var p=function(e){function t(){return e.apply(this,arguments)||this}c(t,e),t.peek=function(){return f},t.rewind=function(){if(t.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=f;return f=void 0,T=[],e};var n=t.prototype;return n.shouldComponentUpdate=function(e){return!i(e,this.props)},n.componentWillMount=function(){T.push(this),d()},n.componentDidUpdate=function(){d()},n.componentWillUnmount=function(){var e=T.indexOf(this);T.splice(e,1),d()},n.render=function(){return a.createElement(s,this.props)},t}(o.Component);return u(p,"displayName","SideEffect("+r(s)+")"),u(p,"canUseDOM",l),p}}e.exports=s},BOD2:function(e,t,n){e.exports={container:"antd-pro-layouts-user-layout-container",lang:"antd-pro-layouts-user-layout-lang",content:"antd-pro-layouts-user-layout-content",top:"antd-pro-layouts-user-layout-top",header:"antd-pro-layouts-user-layout-header",logo:"antd-pro-layouts-user-layout-logo",title:"antd-pro-layouts-user-layout-title",desc:"antd-pro-layouts-user-layout-desc"}},TJpk:function(e,t,n){t.__esModule=!0,t.Helmet=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n("q1tI"),i=E(a),u=n("17x9"),c=E(u),l=n("8+s/"),s=E(l),f=n("bmMU"),T=E(f),d=n("v1p5"),p=n("hFT/");function E(e){return e&&e.__esModule?e:{default:e}}function A(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function h(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var S=function(e){var t,n;return n=t=function(t){function n(){return m(this,n),y(this,t.apply(this,arguments))}return h(n,t),n.prototype.shouldComponentUpdate=function(e){return!(0,T.default)(this.props,e)},n.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case p.TAG_NAMES.SCRIPT:case p.TAG_NAMES.NOSCRIPT:return{innerHTML:t};case p.TAG_NAMES.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},n.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,o=e.arrayTypeChildren,a=e.newChildProps,i=e.nestedChildren;return r({},o,(t={},t[n.type]=[].concat(o[n.type]||[],[r({},a,this.mapNestedChildrenToProps(n,i))]),t))},n.prototype.mapObjectTypeChildren=function(e){var t,n,o=e.child,a=e.newProps,i=e.newChildProps,u=e.nestedChildren;switch(o.type){case p.TAG_NAMES.TITLE:return r({},a,(t={},t[o.type]=u,t.titleAttributes=r({},i),t));case p.TAG_NAMES.BODY:return r({},a,{bodyAttributes:r({},i)});case p.TAG_NAMES.HTML:return r({},a,{htmlAttributes:r({},i)})}return r({},a,(n={},n[o.type]=r({},i),n))},n.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=r({},t);return Object.keys(e).forEach(function(t){var o;n=r({},n,(o={},o[t]=e[t],o))}),n},n.prototype.warnOnInvalidChildren=function(e,t){return!0},n.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return i.default.Children.forEach(e,function(e){if(e&&e.props){var o=e.props,a=o.children,i=A(o,["children"]),u=(0,d.convertReactPropstoHtmlAttributes)(i);switch(n.warnOnInvalidChildren(e,a),e.type){case p.TAG_NAMES.LINK:case p.TAG_NAMES.META:case p.TAG_NAMES.NOSCRIPT:case p.TAG_NAMES.SCRIPT:case p.TAG_NAMES.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:u,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:u,nestedChildren:a});break}}}),t=this.mapArrayTypeChildrenToProps(r,t),t},n.prototype.render=function(){var t=this.props,n=t.children,o=A(t,["children"]),a=r({},o);return n&&(a=this.mapChildrenToProps(n,a)),i.default.createElement(e,a)},o(n,null,[{key:"canUseDOM",set:function(t){e.canUseDOM=t}}]),n}(i.default.Component),t.propTypes={base:c.default.object,bodyAttributes:c.default.object,children:c.default.oneOfType([c.default.arrayOf(c.default.node),c.default.node]),defaultTitle:c.default.string,defer:c.default.bool,encodeSpecialCharacters:c.default.bool,htmlAttributes:c.default.object,link:c.default.arrayOf(c.default.object),meta:c.default.arrayOf(c.default.object),noscript:c.default.arrayOf(c.default.object),onChangeClientState:c.default.func,script:c.default.arrayOf(c.default.object),style:c.default.arrayOf(c.default.object),title:c.default.string,titleAttributes:c.default.object,titleTemplate:c.default.string},t.defaultProps={defer:!0,encodeSpecialCharacters:!0},t.peek=e.peek,t.rewind=function(){var t=e.rewind();return t||(t=(0,d.mapStateOnServer)({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),t},n},_=function(){return null},b=(0,s.default)(d.reducePropsToState,d.handleClientStateChange,d.mapStateOnServer)(_),g=S(b);g.renderStatic=g.rewind,t.Helmet=g,t.default=g},bmMU:function(e,t,n){"use strict";var r=Array.isArray,o=Object.keys,a=Object.prototype.hasOwnProperty,i="undefined"!==typeof Element;function u(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var n,c,l,s=r(e),f=r(t);if(s&&f){if(c=e.length,c!=t.length)return!1;for(n=c;0!==n--;)if(!u(e[n],t[n]))return!1;return!0}if(s!=f)return!1;var T=e instanceof Date,d=t instanceof Date;if(T!=d)return!1;if(T&&d)return e.getTime()==t.getTime();var p=e instanceof RegExp,E=t instanceof RegExp;if(p!=E)return!1;if(p&&E)return e.toString()==t.toString();var A=o(e);if(c=A.length,c!==o(t).length)return!1;for(n=c;0!==n--;)if(!a.call(t,A[n]))return!1;if(i&&e instanceof Element&&t instanceof Element)return e===t;for(n=c;0!==n--;)if(l=A[n],("_owner"!==l||!e.$$typeof)&&!u(e[l],t[l]))return!1;return!0}return e!==e&&t!==t}e.exports=function(e,t){try{return u(e,t)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}}},"hFT/":function(e,t){t.__esModule=!0;t.ATTRIBUTE_NAMES={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"};var n=t.TAG_NAMES={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},r=(t.VALID_TAG_NAMES=Object.keys(n).map(function(e){return n[e]}),t.TAG_PROPERTIES={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src"},t.REACT_TAG_MAP={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"});t.HELMET_PROPS={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},t.HTML_TAG_MAP=Object.keys(r).reduce(function(e,t){return e[r[t]]=t,e},{}),t.SELF_CLOSING_TAGS=[n.NOSCRIPT,n.SCRIPT,n.STYLE],t.HELMET_ATTRIBUTE="data-react-helmet"},v1p5:function(e,t,n){(function(e){t.__esModule=!0,t.warn=t.requestAnimationFrame=t.reducePropsToState=t.mapStateOnServer=t.handleClientStateChange=t.convertReactPropstoHtmlAttributes=void 0;var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=n("q1tI"),i=s(a),u=n("MgzW"),c=s(u),l=n("hFT/");function s(e){return e&&e.__esModule?e:{default:e}}var f=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},T=function(e){var t=m(e,l.TAG_NAMES.TITLE),n=m(e,l.HELMET_PROPS.TITLE_TEMPLATE);if(n&&t)return n.replace(/%s/g,function(){return t});var r=m(e,l.HELMET_PROPS.DEFAULT_TITLE);return t||r||void 0},d=function(e){return m(e,l.HELMET_PROPS.ON_CHANGE_CLIENT_STATE)||function(){}},p=function(e,t){return t.filter(function(t){return"undefined"!==typeof t[e]}).map(function(t){return t[e]}).reduce(function(e,t){return o({},e,t)},{})},E=function(e,t){return t.filter(function(e){return"undefined"!==typeof e[l.TAG_NAMES.BASE]}).map(function(e){return e[l.TAG_NAMES.BASE]}).reverse().reduce(function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o],i=a.toLowerCase();if(-1!==e.indexOf(i)&&n[i])return t.concat(n)}return t},[])},A=function(e,t,n){var o={};return n.filter(function(t){return!!Array.isArray(t[e])||("undefined"!==typeof t[e]&&g("Helmet: "+e+' should be of type "Array". Instead found type "'+r(t[e])+'"'),!1)}).map(function(t){return t[e]}).reverse().reduce(function(e,n){var r={};n.filter(function(e){for(var n=void 0,a=Object.keys(e),i=0;i<a.length;i++){var u=a[i],c=u.toLowerCase();-1===t.indexOf(c)||n===l.TAG_PROPERTIES.REL&&"canonical"===e[n].toLowerCase()||c===l.TAG_PROPERTIES.REL&&"stylesheet"===e[c].toLowerCase()||(n=c),-1===t.indexOf(u)||u!==l.TAG_PROPERTIES.INNER_HTML&&u!==l.TAG_PROPERTIES.CSS_TEXT&&u!==l.TAG_PROPERTIES.ITEM_PROP||(n=u)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return o[n]||(o[n]={}),r[n]||(r[n]={}),!o[n][s]&&(r[n][s]=!0,!0)}).reverse().forEach(function(t){return e.push(t)});for(var a=Object.keys(r),i=0;i<a.length;i++){var u=a[i],s=(0,c.default)({},o[u],r[u]);o[u]=s}return e},[]).reverse()},m=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},y=function(e){return{baseTag:E([l.TAG_PROPERTIES.HREF],e),bodyAttributes:p(l.ATTRIBUTE_NAMES.BODY,e),defer:m(e,l.HELMET_PROPS.DEFER),encode:m(e,l.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:p(l.ATTRIBUTE_NAMES.HTML,e),linkTags:A(l.TAG_NAMES.LINK,[l.TAG_PROPERTIES.REL,l.TAG_PROPERTIES.HREF],e),metaTags:A(l.TAG_NAMES.META,[l.TAG_PROPERTIES.NAME,l.TAG_PROPERTIES.CHARSET,l.TAG_PROPERTIES.HTTPEQUIV,l.TAG_PROPERTIES.PROPERTY,l.TAG_PROPERTIES.ITEM_PROP],e),noscriptTags:A(l.TAG_NAMES.NOSCRIPT,[l.TAG_PROPERTIES.INNER_HTML],e),onChangeClientState:d(e),scriptTags:A(l.TAG_NAMES.SCRIPT,[l.TAG_PROPERTIES.SRC,l.TAG_PROPERTIES.INNER_HTML],e),styleTags:A(l.TAG_NAMES.STYLE,[l.TAG_PROPERTIES.CSS_TEXT],e),title:T(e),titleAttributes:p(l.ATTRIBUTE_NAMES.TITLE,e)}},h=function(){var e=Date.now();return function(t){var n=Date.now();n-e>16?(e=n,t(n)):setTimeout(function(){h(t)},0)}}(),S=function(e){return clearTimeout(e)},_="undefined"!==typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||h:e.requestAnimationFrame||h,b="undefined"!==typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||S:e.cancelAnimationFrame||S,g=function(e){return console&&"function"===typeof console.warn&&console.warn(e)},v=null,M=function(e){v&&b(v),e.defer?v=_(function(){R(e,function(){v=null})}):(R(e),v=null)},R=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,u=e.noscriptTags,c=e.onChangeClientState,s=e.scriptTags,f=e.styleTags,T=e.title,d=e.titleAttributes;C(l.TAG_NAMES.BODY,r),C(l.TAG_NAMES.HTML,o),O(T,d);var p={baseTag:I(l.TAG_NAMES.BASE,n),linkTags:I(l.TAG_NAMES.LINK,a),metaTags:I(l.TAG_NAMES.META,i),noscriptTags:I(l.TAG_NAMES.NOSCRIPT,u),scriptTags:I(l.TAG_NAMES.SCRIPT,s),styleTags:I(l.TAG_NAMES.STYLE,f)},E={},A={};Object.keys(p).forEach(function(e){var t=p[e],n=t.newTags,r=t.oldTags;n.length&&(E[e]=n),r.length&&(A[e]=p[e].oldTags)}),t&&t(),c(e,E,A)},P=function(e){return Array.isArray(e)?e.join(""):e},O=function(e,t){"undefined"!==typeof e&&document.title!==e&&(document.title=P(e)),C(l.TAG_NAMES.TITLE,t)},C=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(l.HELMET_ATTRIBUTE),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(t),u=0;u<i.length;u++){var c=i[u],s=t[c]||"";n.getAttribute(c)!==s&&n.setAttribute(c,s),-1===o.indexOf(c)&&o.push(c);var f=a.indexOf(c);-1!==f&&a.splice(f,1)}for(var T=a.length-1;T>=0;T--)n.removeAttribute(a[T]);o.length===a.length?n.removeAttribute(l.HELMET_ATTRIBUTE):n.getAttribute(l.HELMET_ATTRIBUTE)!==i.join(",")&&n.setAttribute(l.HELMET_ATTRIBUTE,i.join(","))}},I=function(e,t){var n=document.head||document.querySelector(l.TAG_NAMES.HEAD),r=n.querySelectorAll(e+"["+l.HELMET_ATTRIBUTE+"]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return t&&t.length&&t.forEach(function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===l.TAG_PROPERTIES.INNER_HTML)n.innerHTML=t.innerHTML;else if(r===l.TAG_PROPERTIES.CSS_TEXT)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var u="undefined"===typeof t[r]?"":t[r];n.setAttribute(r,u)}n.setAttribute(l.HELMET_ATTRIBUTE,"true"),o.some(function(e,t){return i=t,n.isEqualNode(e)})?o.splice(i,1):a.push(n)}),o.forEach(function(e){return e.parentNode.removeChild(e)}),a.forEach(function(e){return n.appendChild(e)}),{oldTags:o,newTags:a}},N=function(e){return Object.keys(e).reduce(function(t,n){var r="undefined"!==typeof e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r},"")},w=function(e,t,n,r){var o=N(n),a=P(t);return o?"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+">"+f(a,r)+"</"+e+">":"<"+e+" "+l.HELMET_ATTRIBUTE+'="true">'+f(a,r)+"</"+e+">"},L=function(e,t,n){return t.reduce(function(t,r){var o=Object.keys(r).filter(function(e){return!(e===l.TAG_PROPERTIES.INNER_HTML||e===l.TAG_PROPERTIES.CSS_TEXT)}).reduce(function(e,t){var o="undefined"===typeof r[t]?t:t+'="'+f(r[t],n)+'"';return e?e+" "+o:o},""),a=r.innerHTML||r.cssText||"",i=-1===l.SELF_CLOSING_TAGS.indexOf(e);return t+"<"+e+" "+l.HELMET_ATTRIBUTE+'="true" '+o+(i?"/>":">"+a+"</"+e+">")},"")},G=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.REACT_TAG_MAP[n]||n]=e[n],t},t)},H=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce(function(t,n){return t[l.HTML_TAG_MAP[n]||n]=e[n],t},t)},k=function(e,t,n){var r,o=(r={key:t},r[l.HELMET_ATTRIBUTE]=!0,r),a=G(n,o);return[i.default.createElement(l.TAG_NAMES.TITLE,a,t)]},j=function(e,t){return t.map(function(t,n){var r,o=(r={key:n},r[l.HELMET_ATTRIBUTE]=!0,r);return Object.keys(t).forEach(function(e){var n=l.REACT_TAG_MAP[e]||e;if(n===l.TAG_PROPERTIES.INNER_HTML||n===l.TAG_PROPERTIES.CSS_TEXT){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]}),i.default.createElement(e,o)})},U=function(e,t,n){switch(e){case l.TAG_NAMES.TITLE:return{toComponent:function(){return k(e,t.title,t.titleAttributes,n)},toString:function(){return w(e,t.title,t.titleAttributes,n)}};case l.ATTRIBUTE_NAMES.BODY:case l.ATTRIBUTE_NAMES.HTML:return{toComponent:function(){return G(t)},toString:function(){return N(t)}};default:return{toComponent:function(){return j(e,t)},toString:function(){return L(e,t,n)}}}},x=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,u=e.noscriptTags,c=e.scriptTags,s=e.styleTags,f=e.title,T=void 0===f?"":f,d=e.titleAttributes;return{base:U(l.TAG_NAMES.BASE,t,r),bodyAttributes:U(l.ATTRIBUTE_NAMES.BODY,n,r),htmlAttributes:U(l.ATTRIBUTE_NAMES.HTML,o,r),link:U(l.TAG_NAMES.LINK,a,r),meta:U(l.TAG_NAMES.META,i,r),noscript:U(l.TAG_NAMES.NOSCRIPT,u,r),script:U(l.TAG_NAMES.SCRIPT,c,r),style:U(l.TAG_NAMES.STYLE,s,r),title:U(l.TAG_NAMES.TITLE,{title:T,titleAttributes:d},r)}};t.convertReactPropstoHtmlAttributes=H,t.handleClientStateChange=M,t.mapStateOnServer=x,t.reducePropsToState=y,t.requestAnimationFrame=_,t.warn=g}).call(this,n("yLpj"))},yAkm:function(e,t,n){"use strict";var r=n("tAuX"),o=n("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("p0pE")),i=o(n("qIgq")),u=n("Hx5s"),c=n("TJpk"),l=n("ArA+"),s=r(n("q1tI")),f=n("Hg0r"),T=n("Y2fQ"),d=o(n("trCS")),p=n("RBnf"),E=n("Oxmv"),A=n("K7Wh"),m=o(n("mxmt")),y=o(n("BOD2")),h=o(n("bIAK")),S=function(e){var t=(0,s.useState)(!1),n=(0,i.default)(t,2),r=n[0],o=n[1],f=(0,s.useState)(null),S=(0,i.default)(f,2),_=S[0],b=S[1],g=function(){(0,E.getCurrentUser)().then(function(e){o(!0),b(e)})};if((0,s.useEffect)(function(){return g()},[_]),!r)return s.default.createElement(h.default,null);_&&e.dispatch&&(0,A.dispatchSuccessLogin)(e.dispatch);var v=e.route,M=void 0===v?{routes:[]}:v,R=M.routes,P=void 0===R?[]:R,O=e.children,C=e.location,I=void 0===C?{pathname:""}:C,N=(0,u.getMenuData)(P),w=N.breadcrumb,L=(0,u.getPageTitle)((0,a.default)({pathname:I.pathname,breadcrumb:w,formatMessage:T.formatMessage},e));return s.default.createElement(s.default.Fragment,null,s.default.createElement(c.Helmet,null,s.default.createElement("title",null,L),s.default.createElement("meta",{name:"description",content:L})),s.default.createElement("div",{className:y.default.container},s.default.createElement("div",{className:y.default.lang},s.default.createElement(d.default,null)),s.default.createElement("div",{className:y.default.content},s.default.createElement("div",{className:y.default.top},s.default.createElement("div",{className:y.default.header},s.default.createElement(l.Link,{to:"/"},s.default.createElement("img",{alt:"logo",className:y.default.logo,src:m.default}),s.default.createElement("span",{className:y.default.title},"Vape Tool"))),s.default.createElement("div",{className:y.default.desc},s.default.createElement(T.FormattedMessage,{id:"signIn.chooseMethod",defaultMessage:"Sign in using your favorite method"}))),O),s.default.createElement(u.DefaultFooter,{copyright:(0,T.formatMessage)({id:"misc.copyrights",defaultMessage:"2019 Created with \u2764\ufe0f for Vapers"}),links:[{key:"android",title:s.default.createElement(T.FormattedMessage,{id:"menu.vapeToolOnAndroid",defaultMessage:"VapeTool on Android"}),href:"https://play.google.com/store/apps/details?id=com.stasbar.vape_tool",blankTarget:!0},{key:"github",title:s.default.createElement(p.GithubOutlined,null),href:"https://github.com/vape-tool/VapeTool-Webapp",blankTarget:!0},{key:"privacy policy",title:s.default.createElement(T.FormattedMessage,{id:"menu.privacyPolicy",defaultMessage:"Privacy Policy"}),href:"https://vapetool.app/privacy_policy",blankTarget:!0}]})))},_=(0,f.connect)(function(e){var t=e.settings,n=e.user;return(0,a.default)({},t,{firebaseUser:n.firebaseUser})})(S);t.default=_}}]);