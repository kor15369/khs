"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[163630],{163630:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var a=t(601413),c=t(870885),l=t(747313),o=t(180252),r=t(837490),s=t(100457),i=t(448439),u=t(827611),d=t(735622),v=t(307360),f=t(59127),b=t(995124),g=t(53110),h=t(346417);function p(e){var n=e.dialogId,t=e.tabs,p=e.commandName,Z=t[0].buttons,x=i.Z.getCommandInstance(p),m=(0,l.useRef)(null),j=(0,o.v9)(s.Op),k=j.currentZoom,_=j.minZoom,C=j.maxZoom,N=(0,l.useState)(""),w=(0,c.Z)(N,2),I=w[0],S=w[1];(0,l.useEffect)((function(){var e=m.current;e&&(e.value="".concat(k,"%"),e.select(),S(e.value))}),[m,k]);var O=(0,l.useCallback)((function(e){return!!(0,g.wI)(parseInt(e),_,C)||(d.Z.showDialog({dialogId:b.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_OUT_OF_RANGE",values:{arg1:"".concat(_),arg2:"".concat(C)}},currentTabIndex:0}),!1)}),[_,C]),D=(0,l.useCallback)((function(e){if(Z.length-1===e)d.Z.clickButton(n,e),d.Z.hideDialog(n);else{var t=m.current;if(t){if(!O(t.value))return;if(t.value!==I){var a=parseInt(t.value);x.invoke({zoomValue:a})}d.Z.hideDialog(n)}}}),[Z,n,x,m,I,O]),y={buttonLabels:Z,onClick:D},E=(0,l.useCallback)((function(){var e=m.current;if(e){var n=parseInt(e.value);isNaN(n)?e.value=(_+1).toString().concat("%"):e.value=n>=C?C.toString().concat("%"):(n+1).toString().concat("%")}}),[m,_,C]),L=(0,l.useCallback)((function(){var e=m.current;if(e){var n=parseInt(e.value);isNaN(n)||n<=_?e.value=_.toString().concat("%"):e.value=n>C?C.toString().concat("%"):(n-1).toString().concat("%")}}),[m,_,C]),M=(0,l.useCallback)((function(e){if(e.keyCode===f.S.Enter){if(!O(e.currentTarget.value))return;if(e.currentTarget.value!==I){var t=parseInt(e.currentTarget.value);x.invoke({zoomValue:t})}d.Z.hideDialog(n)}}),[x,n,I,O]);return(0,h.jsxs)(l.Fragment,{children:[(0,h.jsx)("div",{className:r.Z.popup_contents,children:(0,h.jsxs)("table",{className:r.Z.form_table,children:[(0,h.jsxs)("colgroup",{children:[(0,h.jsx)("col",{style:{width:"50%"}}),(0,h.jsx)("col",{style:{width:"auto"}})]}),(0,h.jsx)("tbody",{children:(0,h.jsxs)("tr",{children:[(0,h.jsxs)("th",{children:[(0,h.jsx)(v.Z,{label:"DLG_ZOOM_LABEL"})," :"]}),(0,h.jsx)("td",{children:(0,h.jsx)("div",{className:"".concat(r.Z.spinner_select," ").concat(r.Z.medium," ").concat(r.Z.horizontal),children:(0,h.jsxs)("div",{className:r.Z.i_txt,children:[(0,h.jsx)("input",{type:"text",style:{width:"100px"},ref:m,onKeyDown:M,spellCheck:!1}),(0,h.jsx)("button",{className:"".concat(r.Z.toggle," ").concat(r.Z.up),onClick:E,children:(0,h.jsx)("span",{children:"toggle up"})}),(0,h.jsx)("button",{className:"".concat(r.Z.toggle," ").concat(r.Z.down),onClick:L,children:(0,h.jsx)("span",{children:"toggle down"})})]})})})]})})]})}),(0,h.jsx)(u.Z,(0,a.Z)({},y))]})}},827611:function(e,n,t){t.d(n,{Z:function(){return o}});t(747313);var a=t(837490),c=t(307360),l=t(346417);function o(e){var n=e.buttonLabels,t=e.onClick,o=e.buttonDisableStates;return(0,l.jsx)("div",{className:a.Z.popup_btn_wrap,children:n.map((function(e,n){var r=!!o&&o[n];return(0,l.jsx)("button",{className:"".concat(a.Z.p_btn," ").concat(a.Z.normal),onClick:function(){return t(n)},disabled:r,children:(0,l.jsx)(c.Z,{label:e})},n)}))})}}}]);