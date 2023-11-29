"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[235790],{827611:function(n,t,e){e.d(t,{Z:function(){return s}});e(747313);var c=e(837490),a=e(307360),l=e(346417);function s(n){var t=n.buttonLabels,e=n.onClick,s=n.buttonDisableStates;return(0,l.jsx)("div",{className:c.Z.popup_btn_wrap,children:t.map((function(n,t){var i=!!s&&s[t];return(0,l.jsx)("button",{className:"".concat(c.Z.p_btn," ").concat(c.Z.normal),onClick:function(){return e(t)},disabled:i,children:(0,l.jsx)(a.Z,{label:n})},t)}))})}},811861:function(n,t,e){e.d(t,{h:function(){return s}});var c=e(747313),a=e(837490),l=e(346417);function s(n){var t=n.list,e=n.currentIndex,s=n.isDisable,i=n.width,o=n.height,r=(0,c.useCallback)((function(t){n.onClickItem&&n.onClickItem(t)}),[n]),u="".concat(a.Z.list_box," ").concat(s?"".concat(a.Z.disabled):""),d={};return i&&(d.width="".concat(i,"px")),o&&(d.height="".concat(o,"px")),t?(0,l.jsx)("div",{className:u,style:d,children:(0,l.jsx)("ul",{children:t.map((function(n,t){var c=t===e?"".concat(a.Z.active):"";return(0,l.jsx)("li",{onClick:function(){return r(t)},children:(0,l.jsx)("button",{className:c,children:(0,l.jsx)("span",{children:n.text})})},t)}))})}):null}},235790:function(n,t,e){e.r(t),e.d(t,{default:function(){return Z}});var c=e(601413),a=e(870885),l=e(747313),s=e(837490),i=e(827611),o=e(735622),r=e(700936),u=e(981142),d=e(307360),b=e(811861),h=e(588567),x=e(995124),f=e(416031),m=e(346417);function Z(n){var t=(0,r.Z)().formatMessage,e=n.dialogId,Z=n.tabs[0].buttons,p=(0,l.useState)(""),j=(0,a.Z)(p,2),_=j[0],k=j[1],v=(0,l.useState)([]),g=(0,a.Z)(v,2),C=g[0],D=g[1],M=(0,l.useState)(-1),E=(0,a.Z)(M,2),N=E[0],O=E[1];(0,l.useEffect)((function(){var n=u.o.getBookmarks(!0);D(n.filter((function(n){return!n.startsWith("_")})))}),[t]);var w=(0,l.useCallback)((function(n){Z.length-1===n&&(o.Z.clickButton(e,n),o.Z.hideDialog(e))}),[Z.length,e]),A={buttonLabels:Z,onClick:w},R=(0,l.useCallback)((function(n){k(n.target.value)}),[]),y=(0,l.useCallback)((function(n){n!==N&&O(n)}),[N]),K=(0,l.useCallback)((function(){var n=_.trim();C.find((function(t){return t===n}))?o.Z.showDialog({dialogId:x.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_HWP_BOOKMARK_EXIST_NAME"},currentTabIndex:0}):(u.o.bookmarkEditor(h.fAm.BR_BOOKMARK_ADD,n),o.Z.hideDialog(e))}),[C,e,_]),B=(0,l.useCallback)((function(){if(!(u.o.bookmarkEditor(h.fAm.BR_BOOKMARK_DELETE,C[N])<1)){var n=(0,f.cloneDeep)(C);n.splice(N,1),D(n),O(-1)}}),[C,N]),I=(0,l.useCallback)((function(){u.o.bookmarkEditor(h.fAm.BR_BOOKMARK_MOVE,C[N])}),[C,N]),L=(0,l.useMemo)((function(){return{currentIndex:N,list:C.map((function(n){return{text:n}})),onClickItem:y,width:212,height:200}}),[N,C,y]),S=(0,l.useCallback)((function(n){"Enter"===n.key&&(_.length>0?K():o.Z.hideDialog(e))}),[e,_.length,K]),T=(0,l.useMemo)((function(){return"".concat(s.Z.btn," ").concat(_.trim().length<1?s.Z.disabled:"")}),[_]),G=(0,l.useMemo)((function(){return"".concat(s.Z.btn," ").concat(N<0?s.Z.disabled:"")}),[N]),V=(0,l.useMemo)((function(){return"".concat(s.Z.btn," ").concat(N<0?s.Z.disabled:"")}),[N]);return(0,m.jsxs)(l.Fragment,{children:[(0,m.jsx)("div",{className:s.Z.popup_contents,onKeyDown:S,children:(0,m.jsxs)("div",{className:"".concat(s.Z.flex_box," ").concat(s.Z.col),children:[(0,m.jsxs)("div",{className:s.Z.inner_box,style:{width:"220px"},children:[(0,m.jsx)("p",{className:s.Z.info_txt,children:(0,m.jsx)(d.Z,{label:"DLG_BOOKMARK_NAME"})}),(0,m.jsxs)("table",{className:"".concat(s.Z.form_table),children:[(0,m.jsx)("colgroup",{children:(0,m.jsx)("col",{style:{width:"auto"}})}),(0,m.jsx)("tbody",{children:(0,m.jsx)("tr",{children:(0,m.jsx)("td",{children:(0,m.jsx)("input",{type:"text",className:s.Z.f_txt,style:{width:"214px"},value:_,onChange:R})})})})]}),(0,m.jsx)("div",{style:{marginTop:"5px"},children:(0,m.jsx)(b.h,(0,c.Z)({},L))})]}),(0,m.jsx)("div",{className:"".concat(s.Z.inner_box),style:{width:"calc(100% - 220px)"},children:(0,m.jsxs)("div",{className:"".concat(s.Z.btn_wrap," ").concat(s.Z.vertical),style:{marginTop:"37px"},children:[(0,m.jsx)("button",{className:T,onClick:K,children:(0,m.jsx)("span",{children:(0,m.jsx)(d.Z,{label:"DLG_ADD"})})}),(0,m.jsx)("button",{className:G,onClick:B,children:(0,m.jsx)("span",{children:(0,m.jsx)(d.Z,{label:"DLG_DELETE"})})}),(0,m.jsx)("button",{className:V,onClick:I,children:(0,m.jsx)("span",{children:(0,m.jsx)(d.Z,{label:"DLG_MOVE"})})})]})})]})}),(0,m.jsx)(i.Z,(0,c.Z)({},A))]})}}}]);