"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[945650],{827611:function(e,t,n){n.d(t,{Z:function(){return c}});n(747313);var a=n(837490),i=n(307360),l=n(346417);function c(e){var t=e.buttonLabels,n=e.onClick,c=e.buttonDisableStates;return(0,l.jsx)("div",{className:a.Z.popup_btn_wrap,children:t.map((function(e,t){var r=!!c&&c[t];return(0,l.jsx)("button",{className:"".concat(a.Z.p_btn," ").concat(a.Z.normal),onClick:function(){return n(t)},disabled:r,children:(0,l.jsx)(i.Z,{label:e})},t)}))})}},96001:function(e,t,n){n.d(t,{Z:function(){return c}});n(747313);var a=n(837490),i=n(307360),l=n(346417);function c(e){var t=e.tabs,n=e.onTabChange,c=e.tabIndex;return(0,l.jsx)("div",{className:a.Z.popup_tab,children:(0,l.jsx)("ul",{children:t.map((function(e,t){return(0,l.jsx)("li",{children:(0,l.jsx)("button",{className:c===t?a.Z.on:"",onClick:function(){return n(t)},children:(0,l.jsx)(i.Z,{label:e.label})})},t)}))})})}},634077:function(e,t,n){n.d(t,{r:function(){return s}});var a=n(870885),i=n(747313),l=n(59199),c=n(837490),r=n(346417),s=(0,i.forwardRef)((function(e,t){var n=e.list,s=e.currentIndex,o=e.isDisable,u=e.inputWidth,d=e.canEditInput,_=void 0!==d&&d,h=e.scrollTop,x=(0,i.useState)(!1),E=(0,a.Z)(x,2),p=E[0],T=E[1],f=(0,i.useState)(""),S=(0,a.Z)(f,2),P=S[0],G=S[1];(0,i.useEffect)((function(){e.inputValue?G(e.inputValue||""):n[s]&&G(n[s].text)}),[s,n,e.inputValue]);var m=(0,i.useCallback)((function(){o||T(!p)}),[o,p]),j=(0,i.useCallback)((function(){T(!1)}),[]),A=(0,i.useCallback)((function(t){T(!1),G(n[t].text),e.onClickItem&&e.onClickItem(t)}),[n,e]),I=(0,i.useCallback)((function(t){var n=t.target.value;G(n),e.onChangeInput&&e.onChangeInput(n)}),[e]),b="".concat(c.Z.custom_select," ").concat(o?"".concat(c.Z.disabled):""),v="".concat(c.Z.current),R={},N={},Z={display:p?"block":"none",marginTop:"".concat(2-(h||0),"px")};return u&&(R.minWidth="".concat(u,"px"),R.width="auto",_&&(N.minWidth="".concat(u,"px"),N.boxSizing="border-box"),Z.minWidth="".concat(u,"px"),Z.boxSizing="border-box"),(0,r.jsx)("div",{className:b,children:(0,r.jsxs)(l.default,{onOutsideClick:j,children:[_?(0,r.jsx)("div",{className:c.Z.multi_select,children:(0,r.jsxs)("div",{className:c.Z.i_txt,style:N,children:[(0,r.jsx)("input",{type:"text",ref:t,value:P,onChange:I}),(0,r.jsx)("button",{className:c.Z.toggle,onClick:m,children:(0,r.jsx)("span",{children:"toggle"})})]})}):(0,r.jsx)("button",{className:v,style:R,onClick:m,children:(0,r.jsx)("span",{children:P})}),!n||n.length<1?null:(0,r.jsx)("ul",{className:c.Z.list,style:Z,children:n.map((function(e,t){var n=t===s?"".concat(c.Z.active):"";return(0,r.jsx)("li",{className:c.Z.list,onClick:function(){return A(t)},children:(0,r.jsx)("button",{className:n,children:(0,r.jsx)("span",{children:e.text})})},t)}))})]})})}))},772217:function(e,t,n){n.d(t,{P:function(){return u}});var a=n(870885),i=n(416031),l=n(747313),c=n(837490),r=n(53110),s=n(346417),o=function(e,t,n,a){var l=isNaN(parseFloat(e))?0:parseFloat(e),c=e.replace(/[^0-9|.|-]/g,"").trim(),r="";return n||0!==l?(r=c,a&&l<0&&(r=Math.abs(parseFloat(r)).toString()),r+=(0,i.isEmpty)(t)?"":" ".concat(t)):r="",r},u=(0,l.forwardRef)((function(e,t){var n=e.min,i=e.max,u=e.changeUnit,d=e.isDisable,_=e.suffix,h=void 0===_?"":_,x=e.isDisplayZero,E=void 0===x||x,p=e.isDisplayAbs,T=void 0!==p&&p,f=e.isFontSpacingEvnet,S=void 0!==f&&f,P=(0,l.useRef)(null),G=(0,l.useState)(0),m=(0,a.Z)(G,2),j=m[0],A=m[1],I=(0,l.useState)(!1),b=(0,a.Z)(I,2),v=b[0],R=b[1];(0,l.useEffect)((function(){var n=t&&t.current,a=P.current;if(n&&a){if(e.inputWidth){var i=window.getComputedStyle(n),l=window.getComputedStyle(a),c=parseInt(i.paddingLeft),r=parseInt(i.paddingRight),s=parseInt(l.borderLeft)||0,u=parseInt(l.borderRight)||0;A(e.inputWidth-c-r-s-u)}"".concat(e.value," ").concat(h)===n.value||0===e.value&&n.value.trim()===h||(n.value=o("".concat(e.value),h,E,T),S&&R(e.value<0))}}),[T,E,e.inputWidth,e.value,t,h,S]);var N=(0,l.useCallback)((function(e){var a=t.current;if(!a)return 0;var l=(0,r.il)(u),c=Math.min(i,Math.max(n,isNaN(parseFloat(a.value))?0:parseFloat(a.value))),s=Math.floor(parseFloat((c/u).toFixed(1))),o=r.fb.round(s*u,l);return o=(0,r.wI)(c,n,i)?v?e?o-u:o+u:e?o+u:o-u:e?u+u:u,l>0?r.fb.round(o,l):o}),[u,i,n,t,v]),Z=(0,l.useCallback)((function(n){var a=t.current;if(a){var i=a.selectionStart||0,l=a.value.charAt(i-1),c=isNaN(parseFloat(a.value))?0:parseFloat(a.value);e.onChange&&e.onChange(c),a.value=o(a.value,h,E,T);var r=l.length>0&&!1===["."].includes(l)&&isNaN(parseInt(l))?i-1:i;a.selectionStart=r,a.selectionEnd=r}}),[T,E,e,t,h]),g=(0,l.useCallback)((function(e){var n=t.current;if(n&&!(h.length<1)){var a=n.selectionStart||0,i=n.value.length,l=h.length+1;"Backspace"===e.key?a>i-l&&e.preventDefault():"Delete"===e.key?a+1>i-l&&e.preventDefault():/[0-9]/.test(e.key)&&i>=l&&a>i-l&&e.preventDefault()}}),[t,h.length]),C=(0,l.useCallback)((function(){var a=t.current;if(a){var l=N(!0);(0,r.wI)(l,n,i)&&(e.onChange&&e.onChange(l,!0),a.value=o("".concat(l),h,E,T))}}),[N,T,E,i,n,e,t,h]),L=(0,l.useCallback)((function(){var a=t.current;if(a){var l=N(!1);(0,r.wI)(l,n,i)&&(e.onChange&&e.onChange(l,!1),a.value=o("".concat(l),h,E,T))}}),[N,T,E,i,n,e,t,h]),M="".concat(c.Z.spinner_select," ").concat(c.Z.medium," ").concat(c.Z.horizontal," ").concat(d?"".concat(c.Z.disabled):""),w={width:j?"".concat(j,"px"):""};return(0,s.jsx)("div",{className:M,children:(0,s.jsxs)("div",{className:c.Z.i_txt,ref:P,children:[(0,s.jsx)("input",{type:"text",ref:t,style:w,onChange:Z,onKeyDown:g}),(0,s.jsx)("button",{className:"".concat(c.Z.toggle," ").concat(c.Z.up),onClick:C,children:(0,s.jsx)("span",{children:"toggle up"})}),(0,s.jsx)("button",{className:"".concat(c.Z.toggle," ").concat(c.Z.down),onClick:L,children:(0,s.jsx)("span",{children:"toggle down"})})]})})}))},945650:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var a,i=n(601413),l=n(870885),c=n(747313),r=n(180252),s=n(837490),o=n(827611),u=n(735622),d=n(700936),_=n(307360),h=n(588567),x=n(634077),E=n(448439),p=n(96001),T=n(772217),f=n(981142),S=n(407604),P=n(53110),G=n(995124),m=n(346417),j=20,A=1187,I=0,b=558,v=1,R=12,N=[{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_PRINT",value:{width:335,height:279,paperSize:h.VMo.PAPER_PRINT}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_LETTER",value:{width:216,height:279,paperSize:h.VMo.PAPER_LETTER}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_B5",value:{width:182,height:257,paperSize:h.VMo.PAPER_B5}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_B4",value:{width:257,height:364,paperSize:h.VMo.PAPER_B4}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_A4",value:{width:210,height:297,paperSize:h.VMo.PAPER_A4}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_A3",value:{width:297,height:420,paperSize:h.VMo.PAPER_A3}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_LEGAL",value:{width:216,height:356,paperSize:h.VMo.PAPER_LEGAL}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_A6",value:{width:105,height:148,paperSize:h.VMo.PAPER_A6}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_A5",value:{width:148,height:210,paperSize:h.VMo.PAPER_A5}},{text:"DLG_PAGE_SETTINGS_PAPER_SIZE_EXECUTIVE",value:{width:184,height:267,paperSize:h.VMo.PAPER_EXECUTIVE}},{text:"DLG_PAGE_SETTINGS_PAGE_SIZE_DLENV",value:{width:110,height:220,paperSize:h.VMo.PAPER_DL}},{text:"DLG_PAGE_SETTINGS_PAGE_SIZE_C5ENV",value:{width:162,height:229,paperSize:h.VMo.PAPER_C5ENV}},{text:"DLG_PAGE_SETTINGS_PAGE_SIZE_B5ENV",value:{width:176,height:250,paperSize:h.VMo.PAPER_B5ENV}},{text:"DLG_PAGE_SETTINGS_PAGE_SIZE_MONARCHENV",value:{width:98,height:191,paperSize:h.VMo.PAPER_MONARCH}},{text:"DLG_PAGE_SETTINGS_PAGE_SIZE_CUSTOM",value:{width:0,height:0,paperSize:h.VMo.PAPER_USER}}],Z=[{text:"DLG_PAGE_SETTINGS_MARGINS_GUTTER_POSITION_LEFT",value:!1},{text:"DLG_PAGE_SETTINGS_MARGINS_GUTTER_POSITION_TOP",value:!0}];function g(e){var t=(0,d.Z)().formatMessage,n=e.dialogId,g=e.tabs,C=e.commandName,L=e.dialogIndex,M=(0,r.v9)((0,S.R1)(L)).currentTabIndex,w=g[0].buttons,D=(0,c.useState)(M||0),O=(0,l.Z)(D,2),k=O[0],y=O[1],U=E.Z.getCommandInstance(C),F=(0,c.useState)(a.Portrait),W=(0,l.Z)(F,2),B=W[0],V=W[1],z=(0,c.useState)(0),H=(0,l.Z)(z,2),Y=H[0],X=H[1],K=(0,c.useState)(20),q=(0,l.Z)(K,2),J=q[0],Q=q[1],$=(0,c.useState)(20),ee=(0,l.Z)($,2),te=ee[0],ne=ee[1],ae=(0,c.useState)(0),ie=(0,l.Z)(ae,2),le=ie[0],ce=ie[1],re=(0,c.useState)(0),se=(0,l.Z)(re,2),oe=se[0],ue=se[1],de=(0,c.useState)(0),_e=(0,l.Z)(de,2),he=_e[0],xe=_e[1],Ee=(0,c.useState)(0),pe=(0,l.Z)(Ee,2),Te=pe[0],fe=pe[1],Se=(0,c.useState)(0),Pe=(0,l.Z)(Se,2),Ge=Pe[0],me=Pe[1],je=(0,c.useState)(0),Ae=(0,l.Z)(je,2),Ie=Ae[0],be=Ae[1],ve=(0,c.useState)(0),Re=(0,l.Z)(ve,2),Ne=Re[0],Ze=Re[1],ge=(0,c.useState)(0),Ce=(0,l.Z)(ge,2),Le=Ce[0],Me=Ce[1],we=(0,c.useState)(h.sYF.BR_TEXTFLOW_GARO),De=(0,l.Z)(we,2),Oe=De[0],ke=De[1],ye=(0,c.useState)(0),Ue=(0,l.Z)(ye,2),Fe=Ue[0],We=Ue[1],Be=(0,r.v9)((0,S.R1)(L)).scrollTop,Ve=(0,c.createRef)(),ze=(0,c.createRef)(),He=(0,c.createRef)(),Ye=(0,c.createRef)(),Xe=(0,c.createRef)(),Ke=(0,c.createRef)(),qe=(0,c.createRef)(),Je=(0,c.createRef)(),Qe=(0,c.createRef)(),$e=(0,c.createRef)();(0,c.useEffect)((function(){var e=f.o.getPaperInfo(h.K29.BR_PAPER_D_MENU_PAGELAYOUT);V(0===e.nPageDirection?a.Portrait:a.Landscape),X(N.findIndex((function(t){return t.value.paperSize===e.nPaperSize}))),Q(P.fb.twipToMm(e.nPaperWidth,1)),ne(P.fb.twipToMm(e.nPaperHeight,1)),ce(P.fb.twipToMm(e.nTop,1)),ue(P.fb.twipToMm(e.nBottom,1)),xe(P.fb.twipToMm(e.nLeft,1)),fe(P.fb.twipToMm(e.nRight,1)),me(P.fb.twipToMm(e.nHeader,1)),be(P.fb.twipToMm(e.nFooter,1)),Ze(P.fb.twipToMm(e.nGutter,1)),Me(Z.findIndex((function(t){return t.value===e.bGutterAtTop}))),ke(e.eTextFlow),We(e.nColNum)}),[]);var et=(0,c.useCallback)((function(e,t,n,a){return!!(0,P.wI)(e,t,n)||(u.Z.showDialog({dialogId:G.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_OUT_OF_RANGE",values:{arg1:"".concat(t),arg2:"".concat(n)}},currentTabIndex:0},a),!1)}),[]),tt=(0,c.useCallback)((function(){return!!et(J,j,A,(function(){setTimeout((function(){var e;null===(e=Ve.current)||void 0===e||e.select()}),100)}))&&!!et(te,j,A,(function(){setTimeout((function(){var e;null===(e=ze.current)||void 0===e||e.select()}),100)}))}),[et,J,te,Ve,ze]),nt=(0,c.useCallback)((function(){if(tt()){var e=f.o.getPaperInfo(h.K29.BR_PAPER_D_MENU_PAGELAYOUT);switch(e.nPageDirection!==(B===a.Portrait?0:1)&&(e.nPaperMask|=h.EKC.BR_PAPER_LAYOUT_DIRECTION),e.nPaperSize===N[Y].value.paperSize&&e.nPaperWidth===J&&e.nPaperWidth===te||(e.nPaperMask|=h.EKC.BR_PAPER_LAYOUT_SIZE),e.nTop===le&&e.nBottom===oe&&e.nLeft===he&&e.nRight===Te&&e.nHeader===Ge&&e.nFooter===Ie&&e.nGutter===Ne&&e.bGutterAtTop===Z[Le].value||(e.nPaperMask|=h.EKC.BR_PAPER_LAYOUT_MARGIN,e.ePaperMargin=h.vyA.BR_PAPER_MARGIN_USER),e.eTextFlow!==Oe&&(e.nPaperMask|=h.EKC.BR_PAPER_LAYOUT_TEXT_DIRECTION),e.nColNum!==Fe&&(e.nPaperMask|=h.EKC.BR_PAPER_LAYOUT_COLUMN,e.bEqualWidth=!0),e.nPageDirection=B===a.Portrait?0:1,e.nPaperSize=N[Y].value.paperSize,e.nPaperWidth=P.fb.mmToTwip(J),e.nPaperHeight=P.fb.mmToTwip(te),e.nTop=P.fb.mmToTwip(le),e.nBottom=P.fb.mmToTwip(oe),e.nLeft=P.fb.mmToTwip(he),e.nRight=P.fb.mmToTwip(Te),e.nHeader=P.fb.mmToTwip(Ge),e.nFooter=P.fb.mmToTwip(Ie),e.nGutter=P.fb.mmToTwip(Ne),e.bGutterAtTop=Z[Le].value,e.eTextFlow=Oe,e.nColNum=Fe,Fe){case 1:e.eColumnType=h.HbI.BR_GUI_COLUMN_ONE;break;case 2:e.eColumnType=h.HbI.BR_GUI_COLUMN_TWO;break;case 3:e.eColumnType=h.HbI.BR_GUI_COLUMN_THREE;break;default:e.eColumnType=h.HbI.BR_GUI_COLUMN_USER}U.invoke(e),u.Z.hideDialog(n)}}),[oe,Fe,U,Ie,Ne,Le,Ge,he,B,te,Y,J,Te,Oe,le,tt,n]),at=(0,c.useCallback)((function(e){0===e?nt():u.Z.hideDialog(n)}),[n,nt]),it={tabIndex:k,tabs:g,onTabChange:(0,c.useCallback)((function(e){y(e)}),[])},lt={buttonLabels:w,onClick:at},ct=(0,c.useCallback)((function(e){"Enter"===e.key&&(nt(),u.Z.hideDialog(n))}),[n,nt]),rt=(0,c.useCallback)((function(){B!==a.Portrait&&V(a.Portrait)}),[B]),st=(0,c.useCallback)((function(){B!==a.Landscape&&V(a.Landscape)}),[B]),ot=(0,c.useCallback)((function(){Oe!==h.sYF.BR_TEXTFLOW_GARO&&ke(h.sYF.BR_TEXTFLOW_GARO)}),[Oe]),ut=(0,c.useCallback)((function(){Oe!==h.sYF.BR_TEXTFLOW_SERO&&ke(h.sYF.BR_TEXTFLOW_SERO)}),[Oe]),dt=(0,c.useCallback)((function(e){e!==Y&&(X(e),N[e].value.paperSize!==h.VMo.PAPER_USER&&(Q(N[e].value.width),ne(N[e].value.height)))}),[Y]),_t=(0,c.useMemo)((function(){return{currentIndex:Y,list:N.map((function(e){return{text:t({id:e.text})}})),onClickItem:dt,inputWidth:245,scrollTop:Be}}),[Y,dt,Be,t]),ht=(0,c.useMemo)((function(){return{value:J,min:j,max:A,changeUnit:1,onChange:function(e){var t=N.findIndex((function(t){return t.value.width===e&&t.value.height===te}));X(t>-1?t:N.length-1),Q(e)},inputWidth:144,suffix:"mm"}}),[te,J]),xt=(0,c.useMemo)((function(){return{value:te,min:j,max:A,changeUnit:1,onChange:function(e){var t=N.findIndex((function(t){return t.value.width===J&&t.value.height===e}));X(t>-1?t:N.length-1),ne(e)},inputWidth:144,suffix:"mm"}}),[te,J]),Et=(0,c.useMemo)((function(){return{value:le,min:I,max:b,changeUnit:1,onChange:function(e){ce(e)},inputWidth:144,suffix:"mm"}}),[le]),pt=(0,c.useMemo)((function(){return{value:oe,min:I,max:b,changeUnit:1,onChange:function(e){ue(e)},inputWidth:144,suffix:"mm"}}),[oe]),Tt=(0,c.useMemo)((function(){return{value:he,min:I,max:b,changeUnit:1,onChange:function(e){xe(e)},inputWidth:144,suffix:"mm"}}),[he]),ft=(0,c.useMemo)((function(){return{value:Te,min:I,max:b,changeUnit:1,onChange:function(e){fe(e)},inputWidth:144,suffix:"mm"}}),[Te]),St=(0,c.useMemo)((function(){return{value:Ge,min:I,max:b,changeUnit:1,onChange:function(e){me(e)},inputWidth:144,suffix:"mm"}}),[Ge]),Pt=(0,c.useMemo)((function(){return{value:Ie,min:I,max:b,changeUnit:1,onChange:function(e){be(e)},inputWidth:144,suffix:"mm"}}),[Ie]),Gt=(0,c.useMemo)((function(){return{value:Ne,min:I,max:b,changeUnit:1,onChange:function(e){Ze(e)},inputWidth:144,suffix:"mm"}}),[Ne]),mt=(0,c.useCallback)((function(e){e!==Le&&Me(e)}),[Le]),jt=(0,c.useMemo)((function(){return{currentIndex:Le,list:Z.map((function(e){return{text:t({id:e.text})}})),onClickItem:mt,inputWidth:144,scrollTop:Be}}),[Le,mt,Be,t]),At=(0,c.useMemo)((function(){return{value:Fe,min:v,max:R,changeUnit:1,onChange:function(e){We(e)},inputWidth:245,suffix:""}}),[Fe]);return(0,m.jsxs)(c.Fragment,{children:[(0,m.jsx)(p.Z,(0,i.Z)({},it)),(0,m.jsxs)("div",{className:s.Z.popup_contents,onKeyDown:ct,children:[0===k?(0,m.jsxs)("div",{style:{display:""},children:[(0,m.jsxs)("table",{className:s.Z.form_table,children:[(0,m.jsxs)("colgroup",{children:[(0,m.jsx)("col",{style:{width:"100px"}}),(0,m.jsx)("col",{style:{width:"auto"}}),(0,m.jsx)("col",{style:{width:"100px"}}),(0,m.jsx)("col",{style:{width:"auto"}})]}),(0,m.jsxs)("tbody",{children:[(0,m.jsx)("tr",{children:(0,m.jsx)("th",{colSpan:4,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE"})})}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{colSpan:2,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE_ORIENTATION"})}),(0,m.jsx)("td",{colSpan:2,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE_SIZE"})})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{colSpan:2,rowSpan:3,style:{verticalAlign:"top"},children:(0,m.jsx)("div",{className:s.Z.direction_layout,children:(0,m.jsxs)("ul",{children:[(0,m.jsx)("li",{children:(0,m.jsx)("button",{className:"".concat(s.Z.vertical," ").concat(B===a.Portrait?s.Z.active:""),onClick:rt,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE_PORTRAIT"})})}),(0,m.jsx)("li",{children:(0,m.jsx)("button",{className:"".concat(s.Z.horizontal," ").concat(B===a.Landscape?s.Z.active:""),onClick:st,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE_LANDSCAPE"})})})]})})}),(0,m.jsx)("td",{colSpan:2,children:(0,m.jsx)(x.r,(0,i.Z)({},_t))})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{style:{paddingLeft:"10px"},children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE_WIDTH"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:Ve},ht))})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{style:{paddingLeft:"10px"},children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_PAGE_HEIGHT"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:ze},xt))})]})]})]}),(0,m.jsxs)("table",{className:"".concat(s.Z.form_table," ").concat(s.Z.line),children:[(0,m.jsxs)("colgroup",{children:[(0,m.jsx)("col",{style:{width:"100px"}}),(0,m.jsx)("col",{style:{width:"auto"}}),(0,m.jsx)("col",{style:{width:"100px"}}),(0,m.jsx)("col",{style:{width:"auto"}})]}),(0,m.jsxs)("tbody",{children:[(0,m.jsx)("tr",{children:(0,m.jsx)("th",{colSpan:4,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS"})})}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_TOP"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:He},Et))}),(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_BOTTOM"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:Ye},pt))})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_LEFT"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:Xe},Tt))}),(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_RIGHT"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:Ke},ft))})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_HEADER"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:qe},St))}),(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_FOOTER"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:Je},Pt))})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_GUTTER"})}),(0,m.jsx)("td",{children:(0,m.jsx)(T.P,(0,i.Z)({ref:Qe},Gt))}),(0,m.jsx)("td",{children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_MARGINS_GUTTER_POSITION"})}),(0,m.jsx)("td",{children:(0,m.jsx)(x.r,(0,i.Z)({},jt))})]})]})]})]}):null,1===k?(0,m.jsx)("div",{style:{display:""},children:(0,m.jsxs)("table",{className:s.Z.form_table,children:[(0,m.jsxs)("colgroup",{children:[(0,m.jsx)("col",{style:{width:"100px"}}),(0,m.jsx)("col",{style:{width:"auto"}}),(0,m.jsx)("col",{style:{width:"100px"}}),(0,m.jsx)("col",{style:{width:"auto"}})]}),(0,m.jsxs)("tbody",{children:[(0,m.jsx)("tr",{children:(0,m.jsx)("th",{colSpan:4,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_TEXT_DIRECTION"})})}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{colSpan:2,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_DIRECTION"})}),(0,m.jsx)("td",{colSpan:2,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_NUMBER_OF_COLUMNS"})})]}),(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{colSpan:2,style:{verticalAlign:"top"},children:(0,m.jsx)("div",{className:s.Z.direction_layout,children:(0,m.jsxs)("ul",{children:[(0,m.jsx)("li",{children:(0,m.jsx)("button",{className:"".concat(s.Z.horizontal02," ").concat(Oe===h.sYF.BR_TEXTFLOW_GARO?s.Z.active:""),onClick:ot,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_DIRECTION_HORIZONTAL"})})}),(0,m.jsx)("li",{children:(0,m.jsx)("button",{className:"".concat(s.Z.vertical02," ").concat(Oe===h.sYF.BR_TEXTFLOW_SERO?s.Z.active:""),onClick:ut,children:(0,m.jsx)(_.Z,{label:"DLG_PAGE_SETTINGS_DIRECTION_VERTICAL"})})})]})})}),(0,m.jsx)("td",{colSpan:2,style:{verticalAlign:"top"},children:(0,m.jsx)(T.P,(0,i.Z)({ref:$e},At))})]})]})]})}):null]}),(0,m.jsx)(o.Z,(0,i.Z)({},lt))]})}!function(e){e.Portrait="portrait",e.Landscape="landscape"}(a||(a={}))}}]);