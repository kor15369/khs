"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[464714],{464714:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var c=n(601413),a=n(870885),l=n(747313),i=n(180252),s=n(837490),_=n(827611),r=n(735622),u=n(700936),O=n(416031),o=n(981142),d=n(995124),T=n(307360),N=n(811861),E=n(588567),G=n(634077),m=n(53110),x=n(407604),R=n(346417),h=[{text:"DLG_GOTO_PAGE",value:E.mdN.BR_GOTO_PAGE},{text:"DLG_GOTO_SECTION",value:E.mdN.BR_GOTO_SECTION},{text:"DLG_GOTO_BOOKMARK",value:E.mdN.BR_GOTO_BOOKMARK},{text:"DLG_GOTO_COMMENT",value:E.mdN.BR_GOTO_MEMO},{text:"DLG_GOTO_TABLE",value:E.mdN.BR_GOTO_TABLE}],f=[{title:"DLG_GOTO_PAGE_EXPLAIN",description:"IDS_MSG_DLG_MOVE_ENTER_PAGE_NUMBER_DESCRIPTION"},{title:"DLG_GOTO_SECTION_EXPLAIN",description:"IDS_MSG_DLG_MOVE_ENTER_PAGE_NUMBER_DESCRIPTION"},{title:"DLG_GOTO_BOOKMARK_EXPLAIN",description:""},{title:"DLG_GOTO_COMMENT_EXPLAIN",description:"IDS_MSG_DLG_MOVE_ENTER_PAGE_NUMBER_DESCRIPTION"},{title:"DLG_GOTO_TABLE_EXPLAIN",description:"IDS_MSG_DLG_MOVE_ENTER_PAGE_NUMBER_DESCRIPTION"}],I=["DLG_GOTO_TITLE","DLG_GOTO_CLOSE"],M=["DLG_GOTO_PREVIOUS","DLG_GOTO_NEXT","DLG_GOTO_CLOSE"];function p(e){var t=(0,u.Z)().formatMessage,n=e.dialogId,p=e.dialogIndex,B=(0,l.useState)(0),C=(0,a.Z)(B,2),b=C[0],v=C[1],L=(0,l.useState)(""),A=(0,a.Z)(L,2),D=A[0],S=A[1],k=(0,l.useState)(!1),Z=(0,a.Z)(k,2),P=Z[0],j=Z[1],g=(0,l.useState)([]),y=(0,a.Z)(g,2),V=y[0],U=y[1],K=(0,l.useState)(0),w=(0,a.Z)(K,2),X=w[0],W=w[1],z=(0,l.useState)([]),F=(0,a.Z)(z,2),H=F[0],q=F[1],J=(0,l.useState)(0),Q=(0,a.Z)(J,2),Y=Q[0],$=Q[1],ee=(0,l.createRef)(),te=(0,l.createRef)(),ne=(0,i.v9)((0,x.R1)(p)).scrollTop,ce=t({id:"DLG_GOTO_ALL_REVIEWERS"});(0,l.useEffect)((function(){U(o.o.getBookmarks(!0));var e=[t({id:"DLG_GOTO_ALL_REVIEWERS"})].concat(o.o.getMemoAuthors());q(e)}),[t]);var ae=(0,l.useCallback)((function(){var e,t,n="";switch(h[b].value){case E.mdN.BR_GOTO_PAGE:case E.mdN.BR_GOTO_SECTION:case E.mdN.BR_GOTO_TABLE:n=D;break;case E.mdN.BR_GOTO_BOOKMARK:n=(null===(e=ee.current)||void 0===e?void 0:e.value)||"";break;case E.mdN.BR_GOTO_MEMO:n=(null===(t=te.current)||void 0===t?void 0:t.value)||""}return n}),[ee,te,b,D]),le=(0,l.useCallback)((function(e,t){var n=h[b].value;if((0,O.isEmpty)(e))return t?E.myP.BR_COUNT_PREV:E.myP.BR_COUNT_NEXT;var c=E.myP.BR_COUNT_NORMAL;switch(n){case E.mdN.BR_GOTO_PAGE:case E.mdN.BR_GOTO_SECTION:case E.mdN.BR_GOTO_TABLE:"+"===e.charAt(0)?c=e.length>1?E.myP.BR_COUNT_PLUS:E.myP.BR_COUNT_NEXT:"-"===e.charAt(0)&&(c=e.length>1?E.myP.BR_COUNT_MINUS:E.myP.BR_COUNT_PREV);break;case E.mdN.BR_GOTO_MEMO:c=t?E.myP.BR_COUNT_PREV:E.myP.BR_COUNT_NEXT;break;case E.mdN.BR_GOTO_BOOKMARK:c=E.myP.BR_COUNT_NORMAL}return c}),[b]),ie=(0,l.useCallback)((function(e){var t=h[b].value;if(b===E.mdN.BR_GOTO_BOOKMARK){if(V.includes(e))return!0}else if(b===E.mdN.BR_GOTO_MEMO){if(H.includes(e))return!0}else if((0,m.kE)(e))return!0;var n="";switch(t){case E.mdN.BR_GOTO_PAGE:n="IDS_MSG_DLG_MOVE_PAGE_MOVE_INVALID_INPUT";break;case E.mdN.BR_GOTO_SECTION:n="IDS_MSG_DLG_MOVE_AREA_MOVE_INVALID_INPUT";break;case E.mdN.BR_GOTO_BOOKMARK:n="IDS_MSG_DLG_MOVE_BOOKMARK_INPUT_NOT_LIST";break;case E.mdN.BR_GOTO_MEMO:n="IDS_MSG_DLG_MOVE_COMMENT_MOVE_INVALID_INPUT";break;case E.mdN.BR_GOTO_TABLE:n="IDS_MSG_DLG_MOVE_TABLE_MOVE_INVALID_INPUT"}return r.Z.showDialog({dialogId:d.O.COMMON_ALERT,bModal:!0,alertMsg:{label:n},currentTabIndex:0}),!1}),[V,H,b]),se=(0,l.useCallback)((function(e){var t=h[b].value,n=ae(),c=le(n,e);ie(n)&&o.o.wordGoTo(t,c,[E.myP.BR_COUNT_PREV,E.myP.BR_COUNT_NEXT].includes(c)||t===E.mdN.BR_GOTO_MEMO&&n===ce?"":n)}),[ie,ae,le,b,ce]),_e=(0,l.useCallback)((function(e){(P?I:M).length-1===e?(r.Z.clickButton(n,e),r.Z.hideDialog(n)):se(0===e)}),[n,P,se]),re={buttonLabels:P?I:M,onClick:_e},ue=(0,l.useCallback)((function(e){"Enter"===e.key&&se(!1)}),[se]),Oe=(0,l.useCallback)((function(e){S(e.target.value),j(e.target.value.length>0)}),[]),oe=(0,l.useCallback)((function(e){e!==b&&(v(e),j(h[e].value===E.mdN.BR_GOTO_BOOKMARK),S(""),W(0),$(0))}),[b]),de=(0,l.useMemo)((function(){var e=h.map((function(e){return{text:t({id:e.text})}}));return{currentIndex:b,list:e,onClickItem:oe,width:160}}),[t,b,oe]),Te=(0,l.useCallback)((function(e){e!==X&&W(e)}),[X]),Ne=(0,l.useMemo)((function(){return{currentIndex:X,list:V.map((function(e){return{text:e}})),onClickItem:Te,inputWidth:280,canEditInput:!0,scrollTop:ne}}),[X,V,ne,Te]),Ee=(0,l.useCallback)((function(e){e!==Y&&$(e)}),[Y]),Ge=(0,l.useMemo)((function(){return{currentIndex:Y,list:H.map((function(e){return{text:e}})),onClickItem:Ee,inputWidth:280,inputValue:H[Y],canEditInput:!0,scrollTop:ne}}),[Y,H,ne,Ee]);return(0,R.jsxs)(l.Fragment,{children:[(0,R.jsx)("div",{className:s.Z.popup_contents,onKeyDown:ue,children:(0,R.jsxs)("div",{className:"".concat(s.Z.flex_box," ").concat(s.Z.col),children:[(0,R.jsxs)("div",{className:s.Z.inner_box,style:{width:"160px"},children:[(0,R.jsx)("p",{className:s.Z.info_txt,children:t({id:"DLG_GOTO_WHAT"})}),(0,R.jsx)(N.h,(0,c.Z)({},de))]}),(0,R.jsx)("div",{className:"".concat(s.Z.inner_box),style:{width:"calc( 100% - 160px)"},children:(0,R.jsxs)("div",{style:{display:""},children:[(0,R.jsx)("p",{className:s.Z.info_txt,children:t({id:f[b].title})}),(0,R.jsxs)("table",{className:"".concat(s.Z.form_table),children:[(0,R.jsx)("colgroup",{children:(0,R.jsx)("col",{style:{width:"auto"}})}),(0,R.jsxs)("tbody",{children:[(0,R.jsx)("tr",{children:(0,R.jsxs)("td",{children:[[E.mdN.BR_GOTO_PAGE,E.mdN.BR_GOTO_SECTION,E.mdN.BR_GOTO_TABLE].includes(h[b].value)?(0,R.jsx)("input",{type:"text",className:s.Z.f_txt,value:D,onChange:Oe}):null,E.mdN.BR_GOTO_BOOKMARK===h[b].value?(0,R.jsx)(G.r,(0,c.Z)({ref:ee},Ne)):null,E.mdN.BR_GOTO_MEMO===h[b].value?(0,R.jsx)(G.r,(0,c.Z)({ref:te},Ge)):null]})}),(0,R.jsx)("tr",{children:(0,R.jsx)("td",{children:(0,O.isEmpty)(f[b].description)?null:(0,R.jsx)(T.Z,{label:f[b].description})})})]})]})]})})]})}),(0,R.jsx)(_.Z,(0,c.Z)({},re))]})}},827611:function(e,t,n){n.d(t,{Z:function(){return i}});n(747313);var c=n(837490),a=n(307360),l=n(346417);function i(e){var t=e.buttonLabels,n=e.onClick,i=e.buttonDisableStates;return(0,l.jsx)("div",{className:c.Z.popup_btn_wrap,children:t.map((function(e,t){var s=!!i&&i[t];return(0,l.jsx)("button",{className:"".concat(c.Z.p_btn," ").concat(c.Z.normal),onClick:function(){return n(t)},disabled:s,children:(0,l.jsx)(a.Z,{label:e})},t)}))})}},634077:function(e,t,n){n.d(t,{r:function(){return _}});var c=n(870885),a=n(747313),l=n(59199),i=n(837490),s=n(346417),_=(0,a.forwardRef)((function(e,t){var n=e.list,_=e.currentIndex,r=e.isDisable,u=e.inputWidth,O=e.canEditInput,o=void 0!==O&&O,d=e.scrollTop,T=(0,a.useState)(!1),N=(0,c.Z)(T,2),E=N[0],G=N[1],m=(0,a.useState)(""),x=(0,c.Z)(m,2),R=x[0],h=x[1];(0,a.useEffect)((function(){e.inputValue?h(e.inputValue||""):n[_]&&h(n[_].text)}),[_,n,e.inputValue]);var f=(0,a.useCallback)((function(){r||G(!E)}),[r,E]),I=(0,a.useCallback)((function(){G(!1)}),[]),M=(0,a.useCallback)((function(t){G(!1),h(n[t].text),e.onClickItem&&e.onClickItem(t)}),[n,e]),p=(0,a.useCallback)((function(t){var n=t.target.value;h(n),e.onChangeInput&&e.onChangeInput(n)}),[e]),B="".concat(i.Z.custom_select," ").concat(r?"".concat(i.Z.disabled):""),C="".concat(i.Z.current),b={},v={},L={display:E?"block":"none",marginTop:"".concat(2-(d||0),"px")};return u&&(b.minWidth="".concat(u,"px"),b.width="auto",o&&(v.minWidth="".concat(u,"px"),v.boxSizing="border-box"),L.minWidth="".concat(u,"px"),L.boxSizing="border-box"),(0,s.jsx)("div",{className:B,children:(0,s.jsxs)(l.default,{onOutsideClick:I,children:[o?(0,s.jsx)("div",{className:i.Z.multi_select,children:(0,s.jsxs)("div",{className:i.Z.i_txt,style:v,children:[(0,s.jsx)("input",{type:"text",ref:t,value:R,onChange:p}),(0,s.jsx)("button",{className:i.Z.toggle,onClick:f,children:(0,s.jsx)("span",{children:"toggle"})})]})}):(0,s.jsx)("button",{className:C,style:b,onClick:f,children:(0,s.jsx)("span",{children:R})}),!n||n.length<1?null:(0,s.jsx)("ul",{className:i.Z.list,style:L,children:n.map((function(e,t){var n=t===_?"".concat(i.Z.active):"";return(0,s.jsx)("li",{className:i.Z.list,onClick:function(){return M(t)},children:(0,s.jsx)("button",{className:n,children:(0,s.jsx)("span",{children:e.text})})},t)}))})]})})}))},811861:function(e,t,n){n.d(t,{h:function(){return i}});var c=n(747313),a=n(837490),l=n(346417);function i(e){var t=e.list,n=e.currentIndex,i=e.isDisable,s=e.width,_=e.height,r=(0,c.useCallback)((function(t){e.onClickItem&&e.onClickItem(t)}),[e]),u="".concat(a.Z.list_box," ").concat(i?"".concat(a.Z.disabled):""),O={};return s&&(O.width="".concat(s,"px")),_&&(O.height="".concat(_,"px")),t?(0,l.jsx)("div",{className:u,style:O,children:(0,l.jsx)("ul",{children:t.map((function(e,t){var c=t===n?"".concat(a.Z.active):"";return(0,l.jsx)("li",{onClick:function(){return r(t)},children:(0,l.jsx)("button",{className:c,children:(0,l.jsx)("span",{children:e.text})})},t)}))})}):null}}}]);