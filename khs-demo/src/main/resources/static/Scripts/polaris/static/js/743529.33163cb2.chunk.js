"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[743529],{827611:function(e,n,l){l.d(n,{Z:function(){return r}});l(747313);var a=l(837490),s=l(307360),t=l(346417);function r(e){var n=e.buttonLabels,l=e.onClick,r=e.buttonDisableStates;return(0,t.jsx)("div",{className:a.Z.popup_btn_wrap,children:n.map((function(e,n){var c=!!r&&r[n];return(0,t.jsx)("button",{className:"".concat(a.Z.p_btn," ").concat(a.Z.normal),onClick:function(){return l(n)},disabled:c,children:(0,t.jsx)(s.Z,{label:e})},n)}))})}},743529:function(e,n,l){l.r(n),l.d(n,{default:function(){return b}});var a=l(601413),s=l(747313),t=l(837490),r=l(448439),c=l(827611),i=l(735622),o=l(307360),d=l(995124),u=l(346417);function b(e){var n=e.dialogId,l=e.tabs,o=e.commandName,d=l[0].buttons,b=r.Z.getCommandInstance(o),x=(0,s.useRef)(0),h=(0,s.useCallback)((function(e){d.length-1===e?(i.Z.clickButton(n,e),i.Z.hideDialog(n)):(b.invoke({dialogId:n,selectType:x.current}),i.Z.hideDialog(n))}),[d,n,b]),_={buttonLabels:d,onClick:h};return(0,u.jsxs)(s.Fragment,{children:[(0,u.jsx)("div",{className:t.Z.popup_contents,children:(0,u.jsxs)("table",{className:t.Z.form_table,children:[(0,u.jsx)("colgroup",{children:(0,u.jsx)("col",{style:{width:"auto"}})}),(0,u.jsx)("tbody",{children:(0,u.jsx)(j,{dialogId:n,selectTypeRef:x})})]})}),(0,u.jsx)(c.Z,(0,a.Z)({},_))]})}function j(e){var n=e.dialogId,l=e.selectTypeRef,a=n===d.O.SHEET_INSERT_CELL,r=(0,s.useCallback)((function(e){l.current=e}),[l]);return(0,u.jsxs)(s.Fragment,{children:[(0,u.jsx)("tr",{children:(0,u.jsx)("td",{children:(0,u.jsx)(o.Z,{label:a?"INSERT":"DELETE"})})}),(0,u.jsx)("tr",{children:(0,u.jsxs)("td",{children:[(0,u.jsx)("div",{children:(0,u.jsxs)("label",{className:t.Z.rdo_label,children:[(0,u.jsx)("input",{type:"radio",name:"rdo",defaultChecked:!0,onChange:function(){return r(0)},value:0}),(0,u.jsx)(o.Z,{label:a?"DLG_CELL_PUSH_RIGHT":"DLG_CELL_PUSH_LEFT"})]})}),(0,u.jsx)("div",{children:(0,u.jsxs)("label",{className:t.Z.rdo_label,children:[(0,u.jsx)("input",{type:"radio",name:"rdo",onChange:function(){return r(1)},value:1}),(0,u.jsx)(o.Z,{label:a?"DLG_CELL_PUSH_DOWN":"DLG_CELL_PUSH_UP"})]})}),(0,u.jsx)("div",{children:(0,u.jsxs)("label",{className:t.Z.rdo_label,children:[(0,u.jsx)("input",{type:"radio",name:"rdo",onChange:function(){return r(2)},value:2}),(0,u.jsx)(o.Z,{label:"DLG_CELL_ROW"})]})}),(0,u.jsx)("div",{children:(0,u.jsxs)("label",{className:t.Z.rdo_label,children:[(0,u.jsx)("input",{type:"radio",name:"rdo",onChange:function(){return r(3)},value:3}),(0,u.jsx)(o.Z,{label:"DLG_CELL_COL"})]})})]})})]})}}}]);