(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"7zBA":function(W,C,a){"use strict";a.r(C);var X=a("14J3"),L=a("BMrR"),Y=a("Znn+"),s=a("ZTPi"),Z=a("jCWc"),D=a("kPKH"),M=a("q1tI"),d=a.n(M),e=a("9kvl"),y=a("IzEo"),G=a("bx4M"),Q=a("+L6B"),H=a("2/Rp"),T=a("5NDa"),v=a("5rEg"),w=a("ODXe"),z=a("v83y"),I=a("71ry"),h=function U(){var t=d.a.useState(z.EditorState.createEmpty()),q=Object(w.a)(t,2),F=q[0],k=q[1],l=Object(e.ab)("uploadPost"),i=l.setTitle,c=l.setText,r=l.submitPost,u=Object(e.ab)("@@initialState"),n=u.initialState,b=n===null||n===void 0?void 0:n.currentUser,j=function o(m){return i(m.target.value)},f=function o(m){return c(m.target.value)},g=function o(){return r(b)};return d.a.createElement(G.a,{style:{textAlign:"center"}},d.a.createElement(v.a,{placeholder:Object(e.Z)().formatMessage({id:"misc.title"}),onChange:j,style:{marginBottom:24}}),d.a.createElement(v.a.TextArea,{allowClear:!0,placeholder:Object(e.Z)().formatMessage({id:"misc.optionalText",defaultMessage:"Text (Optional)"}),onChange:f}),d.a.createElement(z.Editor,{editorState:F,onChange:k}),d.a.createElement(H.default,{type:"primary",onClick:g},d.a.createElement(e.i,{id:"user.actions.publishPost",defaultMessage:"Publish post"})," ",d.a.createElement(I.ShareAltOutlined,null)))},N=h,O=a("yihf"),A=a("sqCN"),J=a("mpQp"),K=a("Fvcw"),E=a("Uw7j"),R=function U(){var t=d.a.useState(z.EditorState.createEmpty()),q=Object(w.a)(t,2),F=q[0],k=q[1],l=Object(e.ab)("uploadLink"),i=l.setUrl,c=l.setText,r=l.submitLink,u=Object(e.ab)("@@initialState"),n=u.initialState,b=n===null||n===void 0?void 0:n.currentUser,j=function o(m){return i(m.target.value)},f=function o(m){return c(m.target.value)},g=function o(){return r(b)};return d.a.createElement(G.a,{style:{textAlign:"center"}},d.a.createElement(v.a,{placeholder:Object(e.Z)().formatMessage({id:"misc.url"}),onChange:j,style:{marginBottom:24}}),d.a.createElement(v.a.TextArea,{allowClear:!0,placeholder:Object(e.Z)().formatMessage({id:"misc.optionalText",defaultMessage:"Text (Optional)"}),onChange:f}),d.a.createElement(z.Editor,{editorState:F,onChange:k}),d.a.createElement(H.default,{type:"primary",onClick:g},d.a.createElement(e.i,{id:"user.actions.publishLink",defaultMessage:"Publish link"})," ",d.a.createElement(I.ShareAltOutlined,null)))},x=R,P=function U(){var t=Object(e.ab)("upload"),q=t.currentTab,F=t.setTab,k=function l(i){return F(A.a[i])};return d.a.createElement(L.a,null,d.a.createElement(D.a,{xs:0,md:4,lg:6,xl:8}),d.a.createElement(D.a,{xs:24,md:16,lg:14,xl:10},d.a.createElement(s.a,{onChange:k,type:"card",activeKey:q},d.a.createElement(s.a.TabPane,{tab:d.a.createElement("span",null,d.a.createElement(J.a,null),d.a.createElement(e.i,{id:"user.photo",defaultMessage:"Photo"})),key:A.a.PHOTO},d.a.createElement(O.default,null)),d.a.createElement(s.a.TabPane,{tab:d.a.createElement("span",null,d.a.createElement(K.a,null),d.a.createElement(e.i,{id:"user.post",defaultMessage:"Post"})),key:A.a.POST},d.a.createElement(N,null)),d.a.createElement(s.a.TabPane,{tab:d.a.createElement("span",null,d.a.createElement(E.a,null),d.a.createElement(e.i,{id:"user.link",defaultMessage:"Link"})),key:A.a.LINK},d.a.createElement(x,null)))),d.a.createElement(D.a,{xs:0,md:4,lg:6,xl:8}))},S=C.default=P},oVF2:function(W,C,a){"use strict";var X=a("IzEo"),L=a("bx4M"),Y=a("+L6B"),s=a("2/Rp"),Z=a("tU7J"),D=a("wFql"),M=a("o0o1"),d=a.n(M),e=a("HaE+"),y=a("1OyB"),G=a("vuIU"),Q=a("Ji7U"),H=a("LK+K"),T=a("miYZ"),v=a("tsqr"),w=a("DZo9"),z=a("8z0m"),I=a("q1tI"),h=a.n(I),N=a("qQNu"),O=a.n(N),A=a("LtfV"),J=a("ycIM"),K=a("X72a"),E=a("hzVQ"),R=a.n(E),x=a("9kvl"),P=z.a.Dragger;function S(k){var l=k.type==="image/jpeg"||k.type==="image/png";l||v.b.error("You can only upload JPG/PNG file!");var i=k.size/1024/1024<20;return i||v.b.error("Image must smaller than 20MB!"),l&&i}function U(k){return new Promise(function(l,i){if(!k.originFileObj)return i(new Error("Origin file object undefined"));var c=new FileReader();return c.readAsDataURL(k.originFileObj),c.onload=function(){typeof c.result==="string"?l(c.result):i(new Error("Can not process ArrayBuffer"))},c.onerror=function(r){return i(r)},c})}var t="image/jpeg",q=.92,F=function(k){Object(Q.a)(i,k);var l=Object(H.a)(i);function i(){var c;Object(y.a)(this,i);for(var r=arguments.length,u=new Array(r),n=0;n<r;n++)u[n]=arguments[n];return c=l.call.apply(l,[this].concat(u)),c.state={sourceImage:void 0,crop:void 0},c.imageRef=void 0,c.croppedFileUrl=void 0,c.onUploadChange=function(){var b=Object(e.a)(d.a.mark(function j(f){var g,o;return d.a.wrap(function m(p){for(;;)switch(p.prev=p.next){case 0:g=f.file.status,g!=="uploading"&&console.log(f.file,f.fileList);if(!(g==="done")){p.next=10;break}return v.b.success("".concat(f.file.name," file uploaded successfully.")),p.next=6,U(f.file);case 6:o=p.sent,c.setState({sourceImage:o}),p.next=11;break;case 10:g==="error"&&v.b.error("".concat(f.file.name," file upload failed."));case 11:case"end":return p.stop()}},j)}));return function(j){return b.apply(this,arguments)}}(),c.onImageLoaded=function(b){c.imageRef=b;var j=b.width>b.height?b.height:b.width,f=b.height>b.width?b.width:b.height,g=j===b.width?0:(b.width-j)/2,o=f===b.height?0:(b.height-f)/2,m={unit:"px",aspect:1,width:j,height:f,x:g,y:o};return c.onCropChange(m),c.makeClientCrop(m),!1},c.onCropChange=function(b){return c.setState({crop:b})},c.getCroppedImgUrl=function(b){var j=c.imageRef,f=document.createElement("canvas"),g=j.naturalWidth/j.width,o=j.naturalHeight/j.height;if(!b.width||!b.height)throw new Error("crop width ".concat(b.width," and crop height ").concat(b.height," must be positive number"));f.width=Math.ceil(b.width*g),f.height=Math.ceil(b.height*o),c.props.maxSize&&(f.width=Math.min(c.props.maxSize,f.width),f.height=Math.min(c.props.maxSize,f.height));var m=f.getContext("2d");if(!m)throw new Error("Could not retrieve context");if(b.x===void 0||b.y===void 0)throw new Error("crop x: ".concat(b.x," and crop height ").concat(b.y," must be positive number"));return m.drawImage(j,b.x*g,b.y*o,b.width*g,b.height*o,0,0,c.props.maxSize?Math.min(c.props.maxSize,b.width*g):b.width*g,c.props.maxSize?Math.min(c.props.maxSize,b.height*g):b.height*g),new Promise(function(p){f.toBlob(function(V){if(!V){console.error("Canvas is empty");return}c.croppedFileUrl&&window.URL.revokeObjectURL(c.croppedFileUrl),c.croppedFileUrl=window.URL.createObjectURL(V);var B=b.width*g,_=b.height*o;p(Object.create({blob:V,width:B,height:_}))},t,q)})},c.makeClientCrop=function(){var b=Object(e.a)(d.a.mark(function j(f){var g,o,m,p;return d.a.wrap(function V(B){for(;;)switch(B.prev=B.next){case 0:if(!(c.imageRef&&f.width&&f.height)){B.next=8;break}return B.next=3,c.getCroppedImgUrl(f);case 3:g=B.sent,o=g.blob,m=g.width,p=g.height,c.props.onResizeImage&&c.props.onResizeImage(c.croppedFileUrl,o,m,p);case 8:case"end":return B.stop()}},j)}));return function(j){return b.apply(this,arguments)}}(),c.onResetSourceImage=function(){return c.setState({sourceImage:void 0})},c}return Object(G.a)(i,[{key:"render",value:function c(){var r=this.state,u=r.sourceImage,n=r.crop,b=this.props,j=b.uploadHintText,f=b.onConfirm;return h.a.createElement(h.a.Fragment,null,!u&&h.a.createElement(P,{name:"file",multiple:!1,onChange:this.onUploadChange,beforeUpload:S},h.a.createElement("p",{className:"ant-upload-drag-icon"},h.a.createElement(A.a,null)),h.a.createElement("p",{className:"ant-upload-text"},h.a.createElement(x.i,{id:"user.uploadPhoto.clickOrDrag",defaultMessage:"Click or drag file to this area to upload"})),h.a.createElement("p",{className:"ant-upload-hint"},j||h.a.createElement(D.default,null,"Please upload only vape related photos. Breaking those rules will result in account suspension."))),u&&h.a.createElement(L.a,{style:{textAlign:"center"}},h.a.createElement(O.a,{imageStyle:{maxHeight:"80vh"},src:u,crop:n,minHeight:100,minWidth:100,keepSelection:!0,onImageLoaded:this.onImageLoaded,onComplete:this.makeClientCrop,onChange:this.onCropChange}),h.a.createElement("div",{style:{marginTop:24}},h.a.createElement(s.default,{type:"default",onClick:this.onResetSourceImage,style:{marginRight:12}},h.a.createElement(J.a,null),h.a.createElement(x.i,{id:"user.uploadPhoto.uploadAgain",defaultMessage:"Upload again"})),f&&h.a.createElement(s.default,{type:"primary",onClick:f},h.a.createElement(x.i,{id:"misc.actions.continue",defaultMessage:"Continue"}),h.a.createElement(K.a,null)))))}}]),i}(h.a.PureComponent);C.a=F},yihf:function(W,C,a){"use strict";a.r(C);var X=a("IzEo"),L=a("bx4M"),Y=a("+L6B"),s=a("2/Rp"),Z=a("5NDa"),D=a("5rEg"),M=a("ODXe"),d=a("q1tI"),e=a.n(d),y=a("9kvl"),G=a("oVF2"),Q=a("ycIM"),H=a("aK7X"),T=function v(){var w=Object(y.ab)("uploadPhoto"),z=w.description,I=w.setDescription,h=w.submitPhoto,N=w.croppedImage,O=w.setCroppedImage,A=Object(d.useState)(!0),J=Object(M.a)(A,2),K=J[0],E=J[1],R=Object(y.ab)("@@initialState"),x=R.initialState,P=x===null||x===void 0?void 0:x.currentUser,S=function F(k,l,i,c){O({imageUrl:k,imageBlob:l,width:i,height:c})},U=function F(){h(P)},t=function F(k){I(k.target.value)},q=e.a.createElement(L.a,{style:{textAlign:"center"}},e.a.createElement(D.a,{style:{display:"block",outline:0,wordWrap:"break-word",boxSizing:"inherit",cursor:"text",minHeight:50,lineHeight:"37px",fontSize:28,fontFamily:"Proxima Nova Bold,Helvetica Neue,Helvetica,Arial,sans-serif",border:0},placeholder:Object(y.Z)().formatMessage({id:"user.uploadPhoto.saySomething",defaultMessage:"Say something about this photo"}),onChange:t,value:z}),e.a.createElement("img",{alt:"Crop",width:"100%",style:{maxWidth:"100%"},src:N.imageUrl,onClick:function F(){return E(!0)}}),e.a.createElement("div",{style:{marginTop:24}},e.a.createElement(s.default,{type:"default",onClick:function F(){return E(!0)},style:{marginRight:12}},e.a.createElement(Q.a,null),e.a.createElement(y.i,{id:"user.uploadPhoto.cropAgain",defaultMessage:"Crop again"})),e.a.createElement(s.default,{type:"primary",onClick:U},e.a.createElement(y.i,{id:"user.actions.publishPost",defaultMessage:"Publish post"}),e.a.createElement(H.a,null))));return e.a.createElement("div",{className:"App"},e.a.createElement("div",{style:{display:K?"block":"none"}},e.a.createElement(G.a,{onResizeImage:S,onConfirm:function F(){return E(!1)},maxSize:800})),!K&&q)};C.default=T}}]);
