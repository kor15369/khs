"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[632972],{827611:function(e,t,n){n.d(t,{Z:function(){return c}});n(747313);var s=n(837490),r=n(307360),a=n(346417);function c(e){var t=e.buttonLabels,n=e.onClick,c=e.buttonDisableStates;return(0,a.jsx)("div",{className:s.Z.popup_btn_wrap,children:t.map((function(e,t){var o=!!c&&c[t];return(0,a.jsx)("button",{className:"".concat(s.Z.p_btn," ").concat(s.Z.normal),onClick:function(){return n(t)},disabled:o,children:(0,a.jsx)(r.Z,{label:e})},t)}))})}},632972:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});var s=n(601413),r=n(870885),a=n(747313),c=n(837490),o=n(735622),l=n(827611),u=n(700936),i=n(981142),d=n(346417);function f(e){var t=e.dialogId,n=e.tabs[0].buttons,f=(0,u.Z)().formatMessage,b=(0,a.useState)(""),h=(0,r.Z)(b,2),p=h[0],x=h[1],j=(0,a.useRef)(null);(0,a.useEffect)((function(){j.current&&j.current.focus()}),[]);var Z=(0,a.useCallback)((function(e){var t=e.currentTarget.value;x(t)}),[]),v={buttonLabels:n,onClick:(0,a.useCallback)((function(e){if(0===e){var n=i.o.getSheetProtection();n.bSheet=!1,n.szPassword=p,i.o.setSheetProtection(n)}o.Z.hideDialog(t)}),[t,p])};return(0,d.jsxs)(a.Fragment,{children:[(0,d.jsx)("div",{className:c.Z.popup_contents,children:(0,d.jsxs)("table",{className:c.Z.form_table,children:[(0,d.jsx)("colgroup",{children:(0,d.jsx)("col",{style:{width:"auto"}})}),(0,d.jsxs)("tbody",{children:[(0,d.jsx)("tr",{children:(0,d.jsx)("th",{children:f({id:"DLG_WORKSHEET_UNPROTECT_PASSWORD"})})}),(0,d.jsx)("tr",{children:(0,d.jsx)("td",{children:(0,d.jsx)("input",{ref:j,className:c.Z.f_txt,type:"password",value:p,onChange:Z})})})]})]})}),(0,d.jsx)(l.Z,(0,s.Z)({},v))]})}}}]);