"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[289379],{827611:function(e,n,s){s.d(n,{Z:function(){return c}});s(747313);var l=s(837490),t=s(307360),a=s(346417);function c(e){var n=e.buttonLabels,s=e.onClick,c=e.buttonDisableStates;return(0,a.jsx)("div",{className:l.Z.popup_btn_wrap,children:n.map((function(e,n){var i=!!c&&c[n];return(0,a.jsx)("button",{className:"".concat(l.Z.p_btn," ").concat(l.Z.normal),onClick:function(){return s(n)},disabled:i,children:(0,a.jsx)(t.Z,{label:e})},n)}))})}},289379:function(e,n,s){s.r(n),s.d(n,{default:function(){return h}});var l=s(601413),t=s(870885),a=s(747313),c=s(837490),i=s(827611),r=s(307360),o=s(735622),u=s(995124),d=s(981142),x=s(346417);function h(e){var n=e.dialogId,s=e.tabs[0].buttons,h=(0,a.useRef)(null),_=(0,a.useState)(""),j=(0,t.Z)(_,2),b=j[0],C=j[1],f=(0,a.useState)(""),p=(0,t.Z)(f,2),Z=p[0],v=p[1],N=(0,a.useCallback)((function(){return b!==Z?(o.Z.showDialog({dialogId:u.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_TRACKING_LOCK_PASSWORD_CHK_ERROR",values:void 0},currentTabIndex:0},(function(){var e;C(""),v(""),null===(e=h.current)||void 0===e||e.focus()})),!1):(d.o.setTrackChangesLockPassword(b),!0)}),[Z,b]),R=(0,a.useCallback)((function(e){(0!==e||N())&&o.Z.hideDialog(n)}),[n,N]),k=(0,a.useCallback)((function(e){if("Enter"===e.key){if(!N())return;o.Z.hideDialog(n)}}),[N,n]),m={buttonLabels:s,onClick:R};return(0,x.jsxs)(a.Fragment,{children:[(0,x.jsx)("div",{className:c.Z.popup_contents,children:(0,x.jsxs)("table",{className:"".concat(c.Z.form_table,"  ").concat(c.Z.mt5),children:[(0,x.jsxs)("colgroup",{children:[(0,x.jsx)("col",{style:{width:"190px"}}),(0,x.jsx)("col",{style:{width:"auto"}})]}),(0,x.jsxs)("tbody",{children:[(0,x.jsx)("tr",{children:(0,x.jsx)("td",{colSpan:2,children:(0,x.jsx)(r.Z,{label:"DLG_LOCK_TRACKING_DESCRIPTION"})})}),(0,x.jsxs)("tr",{children:[(0,x.jsxs)("td",{children:[(0,x.jsx)(r.Z,{label:"DLG_LOCK_TRACKING_ENTER_PASSWORD"})," :"]}),(0,x.jsx)("td",{children:(0,x.jsx)("div",{className:"".concat(c.Z.multi_select),children:(0,x.jsx)("div",{className:c.Z.i_txt,children:(0,x.jsx)("input",{type:"password",ref:h,value:b,onChange:function(e){C(e.target.value)},onKeyDown:k,spellCheck:!1})})})})]}),(0,x.jsxs)("tr",{children:[(0,x.jsxs)("td",{children:[(0,x.jsx)(r.Z,{label:"DLG_LOCK_TRACKING_CONFIRM_PASSWORD"})," :"]}),(0,x.jsx)("td",{children:(0,x.jsx)("div",{className:"".concat(c.Z.multi_select),children:(0,x.jsx)("div",{className:c.Z.i_txt,children:(0,x.jsx)("input",{type:"password",value:Z,onChange:function(e){v(e.target.value)},onKeyDown:k,spellCheck:!1})})})})]}),(0,x.jsx)("tr",{children:(0,x.jsx)("td",{colSpan:2,children:(0,x.jsx)(r.Z,{label:"DLG_LOCK_TRACKING_NOT_SECURITY"})})})]})]})}),(0,x.jsx)(i.Z,(0,l.Z)({},m))]})}}}]);