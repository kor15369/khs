"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[424866],{827611:function(e,t,n){n.d(t,{Z:function(){return s}});n(747313);var l=n(837490),a=n(307360),c=n(346417);function s(e){var t=e.buttonLabels,n=e.onClick,s=e.buttonDisableStates;return(0,c.jsx)("div",{className:l.Z.popup_btn_wrap,children:t.map((function(e,t){var u=!!s&&s[t];return(0,c.jsx)("button",{className:"".concat(l.Z.p_btn," ").concat(l.Z.normal),onClick:function(){return n(t)},disabled:u,children:(0,c.jsx)(a.Z,{label:e})},t)}))})}},634077:function(e,t,n){n.d(t,{r:function(){return i}});var l=n(870885),a=n(747313),c=n(59199),s=n(837490),u=n(346417),i=(0,a.forwardRef)((function(e,t){var n=e.list,i=e.currentIndex,r=e.isDisable,o=e.inputWidth,x=e.canEditInput,_=void 0!==x&&x,d=e.scrollTop,A=(0,a.useState)(!1),v=(0,l.Z)(A,2),R=v[0],h=v[1],O=(0,a.useState)(""),f=(0,l.Z)(O,2),L=f[0],m=f[1];(0,a.useEffect)((function(){e.inputValue?m(e.inputValue||""):n[i]&&m(n[i].text)}),[i,n,e.inputValue]);var T=(0,a.useCallback)((function(){r||h(!R)}),[r,R]),b=(0,a.useCallback)((function(){h(!1)}),[]),p=(0,a.useCallback)((function(t){h(!1),m(n[t].text),e.onClickItem&&e.onClickItem(t)}),[n,e]),j=(0,a.useCallback)((function(t){var n=t.target.value;m(n),e.onChangeInput&&e.onChangeInput(n)}),[e]),C="".concat(s.Z.custom_select," ").concat(r?"".concat(s.Z.disabled):""),N="".concat(s.Z.current),M={},E={},F={display:R?"block":"none",marginTop:"".concat(2-(d||0),"px")};return o&&(M.minWidth="".concat(o,"px"),M.width="auto",_&&(E.minWidth="".concat(o,"px"),E.boxSizing="border-box"),F.minWidth="".concat(o,"px"),F.boxSizing="border-box"),(0,u.jsx)("div",{className:C,children:(0,u.jsxs)(c.default,{onOutsideClick:b,children:[_?(0,u.jsx)("div",{className:s.Z.multi_select,children:(0,u.jsxs)("div",{className:s.Z.i_txt,style:E,children:[(0,u.jsx)("input",{type:"text",ref:t,value:L,onChange:j}),(0,u.jsx)("button",{className:s.Z.toggle,onClick:T,children:(0,u.jsx)("span",{children:"toggle"})})]})}):(0,u.jsx)("button",{className:N,style:M,onClick:T,children:(0,u.jsx)("span",{children:L})}),!n||n.length<1?null:(0,u.jsx)("ul",{className:s.Z.list,style:F,children:n.map((function(e,t){var n=t===i?"".concat(s.Z.active):"";return(0,u.jsx)("li",{className:s.Z.list,onClick:function(){return p(t)},children:(0,u.jsx)("button",{className:n,children:(0,u.jsx)("span",{children:e.text})})},t)}))})]})})}))},424866:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var l=n(601413),a=n(870885),c=n(747313),s=n(180252),u=n(837490),i=n(827611),r=n(735622),o=n(700936),x=n(981142),_=n(307360),d=n(634077),A=n(448439),v=n(407604),R=n(588567),h=n(346417),O=[{text:"SUM(..)",value:"SUM()"},{text:"AVG(..) AVERAGE(..)",value:"AVG()"},{text:"PRODUCT(..)",value:"PRODUCT()"},{text:"MIN(..)",value:"MIN()"},{text:"MAX(..)",value:"MAX()"},{text:"COUNT(..)",value:"COUNT()"},{text:"ROUND(..)",value:"ROUND()"},{text:"MOD(..)",value:"MOD()"},{text:"SQRT(..)",value:"SQRT()"},{text:"DEGTORAD(x) RADIAN(x)",value:"DEGTORAD()"},{text:"RADTODEG(x)",value:"RADTODEG()"},{text:"COS(x)",value:"COS()"},{text:"SIN(x)",value:"SIN()"},{text:"TAN(x)",value:"TAN()"},{text:"ACOS(x)",value:"ACOS()"},{text:"ASIN(x)",value:"ASIN()"},{text:"ATAN(x)",value:"ATAN()"},{text:"ABS(x)",value:"ABS()"},{text:"INT(x)",value:"INT()"},{text:"SIGN(x)",value:"SIGN()"},{text:"CEILING(x)",value:"CEILING()"},{text:"FLOOR(x)",value:"FLOOR()"},{text:"EXP(x)",value:"EXP()"},{text:"LN(x)",value:"LN()"},{text:"LOG(x)",value:"LOG()"}],f=[{text:"DLG_HWP_FORMULA_RANGE_LEFT",value:"LEFT"},{text:"DLG_HWP_FORMULA_RANGE_RIGHT",value:"RIGHT"},{text:"DLG_HWP_FORMULA_RANGE_ABOVE",value:"ABOVE"},{text:"DLG_HWP_FORMULA_RANGE_BELOW",value:"BELOW"}],L=[{text:"DLG_HWP_FORMULA_FORMAT_DEFAULT",value:R.mP1.BR_HWP_SET_FORMULA_FORMAT_DEFAULT},{text:"DLG_HWP_FORMULA_FORMAT_INTEGER",value:R.mP1.BR_HWP_SET_FORMULA_FORMAT_INTEGER},{text:"DLG_HWP_FORMULA_FORMAT_ONE_DECIMAL",value:R.mP1.BR_HWP_SET_FORMULA_FORMAT_FRACTIONAL_1},{text:"DLG_HWP_FORMULA_FORMAT_TWO_DECIMAL",value:R.mP1.BR_HWP_SET_FORMULA_FORMAT_FRACTIONAL_2},{text:"DLG_HWP_FORMULA_FORMAT_THREE_DECIMAL",value:R.mP1.BR_HWP_SET_FORMULA_FORMAT_FRACTIONAL_3},{text:"DLG_HWP_FORMULA_FORMAT_FOUR_DECIMAL",value:R.mP1.BR_HWP_SET_FORMULA_FORMAT_FRACTIONAL_4}];function m(e){var t=(0,o.Z)().formatMessage,n=e.dialogId,m=e.dialogIndex,T=e.tabs,b=e.commandName,p=T[0].buttons,j=A.Z.getCommandInstance(b),C=(0,c.useState)(-1),N=(0,a.Z)(C,2),M=N[0],E=N[1],F=(0,c.useState)(-1),I=(0,a.Z)(F,2),D=I[0],Z=I[1],S=(0,c.useState)(0),g=(0,a.Z)(S,2),G=g[0],k=g[1],U=(0,c.useState)(!0),P=(0,a.Z)(U,2),W=P[0],H=P[1],y=(0,s.v9)((0,v.R1)(m)).scrollTop,B=(0,c.useRef)(null);(0,c.useEffect)((function(){var e=B.current;if(e){e.value="=",e.focus();var t=x.o.getHwpFormulaInfo(),n=t.data;t.result&&(e.value=n.szCommand,k(L.findIndex((function(e){return e.value===n.nRangeType}))),H(n.bCommaSeperator)),e.selectionStart=0,e.selectionEnd=e.value.length,e.focus()}}),[]);var w=(0,c.useCallback)((function(e){H(e.currentTarget.checked)}),[]),V=(0,c.useCallback)((function(){var e=B.current;if(e){var t=e.value;j.invoke({nRangeType:R.jxf.BR_HWP_SET_FORMULA_NONE,szCommand:"="===t.charAt(0)?t.substring(1,t.length):t,eResultFormat:L[G].value,bCommaSeperator:W}),r.Z.hideDialog(n)}}),[j,n,G,W]),z=(0,c.useCallback)((function(e){p.length-1===e?r.Z.clickButton(n,e):V(),r.Z.hideDialog(n)}),[V,p.length,n]),X={buttonLabels:p,onClick:z},Q=(0,c.useCallback)((function(e){"Enter"===e.key&&(V(),r.Z.hideDialog(n))}),[V,n]),K=(0,c.useCallback)((function(e){var t=B.current;if(t&&e!==M){var n=t.value,l=t.selectionStart||0,a=t.selectionEnd||0,c=O[e].value,s=n.substring(0,l)+c+n.substring(a),u=l+O[e].value.length-1;t.value=s,t.focus(),t.selectionStart=u,t.selectionEnd=u,E(e)}}),[M]),q=(0,c.useMemo)((function(){return{currentIndex:M,list:O.map((function(e){return{text:e.text}})),onClickItem:K,inputWidth:222,scrollTop:y}}),[M,K,y]),J=(0,c.useCallback)((function(e){var t=B.current;if(t&&e!==D){var n=t.value,l=t.selectionStart||0,a=t.selectionEnd||0,c=n.substring(0,l)+f[e].value+n.substring(a),s=l+f[e].value.length;t.value=c,t.focus(),t.selectionStart=s,t.selectionEnd=s,Z(e)}}),[D]),Y=(0,c.useMemo)((function(){return{currentIndex:D,list:f.map((function(e){return{text:t({id:e.text})}})),onClickItem:J,inputWidth:222,scrollTop:y}}),[D,J,y,t]),$=(0,c.useCallback)((function(e){e!==G&&k(e)}),[G]),ee=(0,c.useMemo)((function(){return{currentIndex:G,list:L.map((function(e){return{text:t({id:e.text})}})),onClickItem:$,inputWidth:222,scrollTop:y}}),[G,t,$,y]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:u.Z.popup_contents,onKeyDown:Q,children:[(0,h.jsxs)("table",{className:u.Z.form_table,children:[(0,h.jsxs)("colgroup",{children:[(0,h.jsx)("col",{style:{width:"80px"}}),(0,h.jsx)("col",{style:{width:"auto"}})]}),(0,h.jsxs)("tbody",{children:[(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:(0,h.jsx)(_.Z,{label:"DLG_HWP_FORMULA_FORMULA"})}),(0,h.jsx)("td",{children:(0,h.jsx)("input",{type:"text",ref:B,spellCheck:!1,className:u.Z.f_txt,maxLength:42})})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:(0,h.jsx)(_.Z,{label:"DLG_HWP_FORMULA_FUNCTION"})}),(0,h.jsx)("td",{children:(0,h.jsx)(d.r,(0,l.Z)({},q))})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:(0,h.jsx)(_.Z,{label:"DLG_HWP_FORMULA_RANGE"})}),(0,h.jsx)("td",{children:(0,h.jsx)(d.r,(0,l.Z)({},Y))})]}),(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:(0,h.jsx)(_.Z,{label:"DLG_HWP_FORMULA_FORMAT"})}),(0,h.jsx)("td",{children:(0,h.jsx)(d.r,(0,l.Z)({},ee))})]})]})]}),(0,h.jsxs)("table",{className:"".concat(u.Z.form_table,"  ").concat(u.Z.mt10),children:[(0,h.jsx)("colgroup",{children:(0,h.jsx)("col",{style:{width:"auto"}})}),(0,h.jsx)("tbody",{children:(0,h.jsx)("tr",{children:(0,h.jsx)("td",{children:(0,h.jsx)("div",{children:(0,h.jsxs)("label",{className:"".concat(u.Z.chk_label),children:[(0,h.jsx)("input",{type:"checkbox",checked:W,onChange:w}),(0,h.jsx)("span",{children:(0,h.jsx)(_.Z,{label:"DLG_HWP_FORMULA_THREE_DIGITS_COMMA"})})]})})})})})]})]}),(0,h.jsx)(i.Z,(0,l.Z)({},X))]})}}}]);