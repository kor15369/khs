"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[271372,572193,928703,196650,375018,808721,399968,289773,556506,495791,649061],{827611:function(A,e,t){t.d(e,{Z:function(){return l}});t(747313);var n=t(837490),a=t(307360),c=t(346417);function l(A){var e=A.buttonLabels,t=A.onClick,l=A.buttonDisableStates;return(0,c.jsx)("div",{className:n.Z.popup_btn_wrap,children:e.map((function(A,e){var i=!!l&&l[e];return(0,c.jsx)("button",{className:"".concat(n.Z.p_btn," ").concat(n.Z.normal),onClick:function(){return t(e)},disabled:i,children:(0,c.jsx)(a.Z,{label:A})},e)}))})}},96001:function(A,e,t){t.d(e,{Z:function(){return l}});t(747313);var n=t(837490),a=t(307360),c=t(346417);function l(A){var e=A.tabs,t=A.onTabChange,l=A.tabIndex;return(0,c.jsx)("div",{className:n.Z.popup_tab,children:(0,c.jsx)("ul",{children:e.map((function(A,e){return(0,c.jsx)("li",{children:(0,c.jsx)("button",{className:l===e?n.Z.on:"",onClick:function(){return t(e)},children:(0,c.jsx)(a.Z,{label:A.label})})},e)}))})})}},634077:function(A,e,t){t.d(e,{r:function(){return s}});var n=t(870885),a=t(747313),c=t(59199),l=t(837490),i=t(346417),s=(0,a.forwardRef)((function(A,e){var t=A.list,s=A.currentIndex,o=A.isDisable,u=A.inputWidth,r=A.canEditInput,d=void 0!==r&&r,x=A.scrollTop,h=(0,a.useState)(!1),g=(0,n.Z)(h,2),E=g[0],f=g[1],b=(0,a.useState)(""),I=(0,n.Z)(b,2),p=I[0],_=I[1];(0,a.useEffect)((function(){A.inputValue?_(A.inputValue||""):t[s]&&_(t[s].text)}),[s,t,A.inputValue]);var v=(0,a.useCallback)((function(){o||f(!E)}),[o,E]),L=(0,a.useCallback)((function(){f(!1)}),[]),m=(0,a.useCallback)((function(e){f(!1),_(t[e].text),A.onClickItem&&A.onClickItem(e)}),[t,A]),C=(0,a.useCallback)((function(e){var t=e.target.value;_(t),A.onChangeInput&&A.onChangeInput(t)}),[A]),R="".concat(l.Z.custom_select," ").concat(o?"".concat(l.Z.disabled):""),N="".concat(l.Z.current),P={},j={},B={display:E?"block":"none",marginTop:"".concat(2-(x||0),"px")};return u&&(P.minWidth="".concat(u,"px"),P.width="auto",d&&(j.minWidth="".concat(u,"px"),j.boxSizing="border-box"),B.minWidth="".concat(u,"px"),B.boxSizing="border-box"),(0,i.jsx)("div",{className:R,children:(0,i.jsxs)(c.default,{onOutsideClick:L,children:[d?(0,i.jsx)("div",{className:l.Z.multi_select,children:(0,i.jsxs)("div",{className:l.Z.i_txt,style:j,children:[(0,i.jsx)("input",{type:"text",ref:e,value:p,onChange:C}),(0,i.jsx)("button",{className:l.Z.toggle,onClick:v,children:(0,i.jsx)("span",{children:"toggle"})})]})}):(0,i.jsx)("button",{className:N,style:P,onClick:v,children:(0,i.jsx)("span",{children:p})}),!t||t.length<1?null:(0,i.jsx)("ul",{className:l.Z.list,style:B,children:t.map((function(A,e){var t=e===s?"".concat(l.Z.active):"";return(0,i.jsx)("li",{className:l.Z.list,onClick:function(){return m(e)},children:(0,i.jsx)("button",{className:t,children:(0,i.jsx)("span",{children:A.text})})},e)}))})]})})}))},772217:function(A,e,t){t.d(e,{P:function(){return u}});var n=t(870885),a=t(416031),c=t(747313),l=t(837490),i=t(53110),s=t(346417),o=function(A,e,t,n){var c=isNaN(parseFloat(A))?0:parseFloat(A),l=A.replace(/[^0-9|.|-]/g,"").trim(),i="";return t||0!==c?(i=l,n&&c<0&&(i=Math.abs(parseFloat(i)).toString()),i+=(0,a.isEmpty)(e)?"":" ".concat(e)):i="",i},u=(0,c.forwardRef)((function(A,e){var t=A.min,a=A.max,u=A.changeUnit,r=A.isDisable,d=A.suffix,x=void 0===d?"":d,h=A.isDisplayZero,g=void 0===h||h,E=A.isDisplayAbs,f=void 0!==E&&E,b=A.isFontSpacingEvnet,I=void 0!==b&&b,p=(0,c.useRef)(null),_=(0,c.useState)(0),v=(0,n.Z)(_,2),L=v[0],m=v[1],C=(0,c.useState)(!1),R=(0,n.Z)(C,2),N=R[0],P=R[1];(0,c.useEffect)((function(){var t=e&&e.current,n=p.current;if(t&&n){if(A.inputWidth){var a=window.getComputedStyle(t),c=window.getComputedStyle(n),l=parseInt(a.paddingLeft),i=parseInt(a.paddingRight),s=parseInt(c.borderLeft)||0,u=parseInt(c.borderRight)||0;m(A.inputWidth-l-i-s-u)}"".concat(A.value," ").concat(x)===t.value||0===A.value&&t.value.trim()===x||(t.value=o("".concat(A.value),x,g,f),I&&P(A.value<0))}}),[f,g,A.inputWidth,A.value,e,x,I]);var j=(0,c.useCallback)((function(A){var n=e.current;if(!n)return 0;var c=(0,i.il)(u),l=Math.min(a,Math.max(t,isNaN(parseFloat(n.value))?0:parseFloat(n.value))),s=Math.floor(parseFloat((l/u).toFixed(1))),o=i.fb.round(s*u,c);return o=(0,i.wI)(l,t,a)?N?A?o-u:o+u:A?o+u:o-u:A?u+u:u,c>0?i.fb.round(o,c):o}),[u,a,t,e,N]),B=(0,c.useCallback)((function(t){var n=e.current;if(n){var a=n.selectionStart||0,c=n.value.charAt(a-1),l=isNaN(parseFloat(n.value))?0:parseFloat(n.value);A.onChange&&A.onChange(l),n.value=o(n.value,x,g,f);var i=c.length>0&&!1===["."].includes(c)&&isNaN(parseInt(c))?a-1:a;n.selectionStart=i,n.selectionEnd=i}}),[f,g,A,e,x]),S=(0,c.useCallback)((function(A){var t=e.current;if(t&&!(x.length<1)){var n=t.selectionStart||0,a=t.value.length,c=x.length+1;"Backspace"===A.key?n>a-c&&A.preventDefault():"Delete"===A.key?n+1>a-c&&A.preventDefault():/[0-9]/.test(A.key)&&a>=c&&n>a-c&&A.preventDefault()}}),[e,x.length]),T=(0,c.useCallback)((function(){var n=e.current;if(n){var c=j(!0);(0,i.wI)(c,t,a)&&(A.onChange&&A.onChange(c,!0),n.value=o("".concat(c),x,g,f))}}),[j,f,g,a,t,A,e,x]),G=(0,c.useCallback)((function(){var n=e.current;if(n){var c=j(!1);(0,i.wI)(c,t,a)&&(A.onChange&&A.onChange(c,!1),n.value=o("".concat(c),x,g,f))}}),[j,f,g,a,t,A,e,x]),k="".concat(l.Z.spinner_select," ").concat(l.Z.medium," ").concat(l.Z.horizontal," ").concat(r?"".concat(l.Z.disabled):""),Z={width:L?"".concat(L,"px"):""};return(0,s.jsx)("div",{className:k,children:(0,s.jsxs)("div",{className:l.Z.i_txt,ref:p,children:[(0,s.jsx)("input",{type:"text",ref:e,style:Z,onChange:B,onKeyDown:S}),(0,s.jsx)("button",{className:"".concat(l.Z.toggle," ").concat(l.Z.up),onClick:T,children:(0,s.jsx)("span",{children:"toggle up"})}),(0,s.jsx)("button",{className:"".concat(l.Z.toggle," ").concat(l.Z.down),onClick:G,children:(0,s.jsx)("span",{children:"toggle down"})})]})})}))},271372:function(A,e,t){t.r(e),t.d(e,{default:function(){return K}});var n=t(601413),a=t(870885),c=t(747313),l=t(180252),i=t(837490),s=t(572193),o=t(196650),u=t(808721),r=t(289773),d=t(495791),x=t(928703),h=t(375018),g=t(399968),E=t(556506),f=t(649061),b=t(307360),I=t(448439),p=t(827611),_=t(735622),v=t(700936),L=t(53110),m=t(634077),C=t(981142),R=t(588567),N=t(995124),P=t(772217),j=t(96001),B=t(407604),S=t(445252),T=t(442113),G=t(346417),k=-316,Z=316,U=0,V=316,w=-1,D=1584,Q=.06,M=130,y=[{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_NORMAL",value:0},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_1",value:1},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_2",value:2},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_3",value:3},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_4",value:4},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_5",value:5},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_6",value:6},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_7",value:7},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_8",value:8},{text:"DLG_PARAGRAPH_OUTLINE_LEVEL_LEVEL_9",value:9}],O=[{text:"DLG_PARAGRAPH_FIRST_LINE_NONE",value:0},{text:"DLG_PARAGRAPH_FIRST_LINE_FIRST_LINE",value:1},{text:"DLG_PARAGRAPH_FIRST_LINE_HANGING",value:2}],H=[{text:"DLG_PARAGRAPH_SPACING_SINGLE_LINE",value:{unit:R.at$.BR_LINESP_UNIT_MULTIPLE,value:1,min:Q,max:M,changeUnit:.25}},{text:"DLG_PARAGRAPH_SPACING_ONE_POINT_FIVE_LINE",value:{unit:R.at$.BR_LINESP_UNIT_MULTIPLE,value:1.5,min:Q,max:M,changeUnit:.25}},{text:"DLG_PARAGRAPH_SPACING_TWO_LINES",value:{unit:R.at$.BR_LINESP_UNIT_MULTIPLE,value:2,min:Q,max:M,changeUnit:.25}},{text:"DLG_PARAGRAPH_SPACING_MINIMUM",value:{unit:R.at$.BR_LINESP_UNIT_ATLEAST,value:12,min:w,max:D,changeUnit:1,suffix:"pt"}},{text:"DLG_PARAGRAPH_SPACING_FIXED",value:{unit:R.at$.BR_LINESP_UNIT_FIX,value:12,min:w,max:D,changeUnit:1,suffix:"pt"}},{text:"DLG_PARAGRAPH_SPACING_MULTIPLE",value:{unit:R.at$.BR_LINESP_UNIT_MULTIPLE,value:3,min:Q,max:M,changeUnit:.25}}];function K(A){var e=(0,v.Z)().formatMessage,t=A.dialogId,Q=A.dialogIndex,M=A.tabs,K=A.commandName,W=M[0].buttons,F=(0,c.useState)(0),Y=(0,a.Z)(F,2),X=Y[0],z=Y[1],J=(0,c.useState)(0),q=(0,a.Z)(J,2),$=q[0],AA=q[1],eA=(0,c.useState)(0),tA=(0,a.Z)(eA,2),nA=tA[0],aA=tA[1],cA=(0,c.useState)(0),lA=(0,a.Z)(cA,2),iA=lA[0],sA=lA[1],oA=(0,c.useState)(0),uA=(0,a.Z)(oA,2),rA=uA[0],dA=uA[1],xA=(0,c.useState)(0),hA=(0,a.Z)(xA,2),gA=hA[0],EA=hA[1],fA=(0,c.useState)(0),bA=(0,a.Z)(fA,2),IA=bA[0],pA=bA[1],_A=(0,c.useState)(!0),vA=(0,a.Z)(_A,2),LA=vA[0],mA=vA[1],CA=(0,c.useState)(0),RA=(0,a.Z)(CA,2),NA=RA[0],PA=RA[1],jA=(0,c.useState)(0),BA=(0,a.Z)(jA,2),SA=BA[0],TA=BA[1],GA=(0,c.useState)(0),kA=(0,a.Z)(GA,2),ZA=kA[0],UA=kA[1],VA=(0,c.useState)(0),wA=(0,a.Z)(VA,2),DA=wA[0],QA=wA[1],MA=(0,c.useState)(!1),yA=(0,a.Z)(MA,2),OA=yA[0],HA=yA[1],KA=(0,c.useState)(!1),WA=(0,a.Z)(KA,2),FA=WA[0],YA=WA[1],XA=(0,c.useState)(!1),zA=(0,a.Z)(XA,2),JA=zA[0],qA=zA[1],$A=(0,l.v9)(S.Ce).currentLocale,Ae=I.Z.getCommandInstance(K),ee=(0,c.createRef)(),te=(0,c.createRef)(),ne=(0,c.createRef)(),ae=(0,c.createRef)(),ce=(0,c.createRef)(),le=(0,c.createRef)(),ie=(0,l.v9)((0,B.R1)(Q)).scrollTop;(0,c.useEffect)((function(){var A=C.o.getParaAttribute();switch(AA(A.nHAlignType),aA(A.nOutlineLevel),sA(L.fb.twipToCm(L.fb.ptToTwip(A.nLeftMarginValue),1)),dA(L.fb.twipToCm(L.fb.ptToTwip(A.nRightMarginValue),1)),0===A.FirstLineValue?(EA(0),mA(!0)):A.FirstLineValue>0?(EA(1),mA(!1)):A.FirstLineValue<0&&(EA(2),mA(!1),A.FirstLineValue=-A.FirstLineValue),pA(Math.floor(100*L.fb.twipToCm(L.fb.ptToTwip(A.FirstLineValue),1)+.5)/100),PA(A.ParaTopValue),TA(A.ParaBottomValue),A.nLineSpace){case R.at$.BR_LINESP_UNIT_FIX:UA(4);break;case R.at$.BR_LINESP_UNIT_ATLEAST:UA(3);break;case R.at$.BR_LINESP_UNIT_PERCENTAGE:UA(0);break;default:switch(A.nLineSpaceValue){case 1:UA(0);break;case 1.5:UA(1);break;case 2:UA(2);break;default:UA(5)}}QA(L.fb.round(A.nLineSpaceValue,2));var e=C.o.getParaAsianInfo();HA(!!e.nEaLnBrk),YA(!!e.nAllowSplitHanWord),qA(!!e.nHangingPunct)}),[]);var se={tabIndex:X,tabs:M,onTabChange:(0,c.useCallback)((function(A){z(A)}),[])},oe=(0,c.useCallback)((function(A,e,t,n){return!!(0,L.wI)(A,e,t)||(_.Z.showDialog({dialogId:N.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_OUT_OF_RANGE",values:{arg1:"".concat(e),arg2:"".concat(t)}},currentTabIndex:0},n),!1)}),[]),ue=(0,c.useCallback)((function(){var A,e;return!!oe(iA,k,Z,(function(){setTimeout((function(){var A;null===(A=ee.current)||void 0===A||A.select()}),100)}))&&(!!oe(rA,k,Z,(function(){setTimeout((function(){var A;null===(A=te.current)||void 0===A||A.select()}),100)}))&&(!(!LA&&!oe(IA,U,V,(function(){setTimeout((function(){var A;null===(A=ne.current)||void 0===A||A.select()}),100)})))&&(!(!LA&&!oe(IA,U,V,(function(){setTimeout((function(){var A;null===(A=ne.current)||void 0===A||A.select()}),100)})))&&(!!oe(NA,w,D,(function(){setTimeout((function(){var A;null===(A=ae.current)||void 0===A||A.select()}),100)}))&&(!!oe(SA,w,D,(function(){setTimeout((function(){var A;null===(A=ce.current)||void 0===A||A.select()}),100)}))&&!!oe(DA,null===(A=H[ZA])||void 0===A?void 0:A.value.min,null===(e=H[ZA])||void 0===e?void 0:e.value.max,(function(){setTimeout((function(){var A;null===(A=le.current)||void 0===A||A.select()}),100)})))))))}),[oe,IA,ne,LA,SA,ce,NA,ae,ZA,DA,le,iA,ee,rA,te]),re=(0,c.useCallback)((function(){var A;if(ue()){var e={hAlignType:$,outlineLevel:y[nA].value,marginLeft:L.fb.cmToPt(iA),marginRight:L.fb.cmToPt(rA),firstLine:2===gA?-L.fb.cmToPt(IA):L.fb.cmToPt(IA),lineSpacingBefore:NA,lineSpacingAfter:SA,lineSpacing:null===(A=H[ZA])||void 0===A?void 0:A.value.unit,lineSpacingValue:DA,eaLnBrk:OA?1:0,allowSplitHanWord:FA?1:0,hangingPunct:JA?1:0};Ae.invoke(e),_.Z.hideDialog(t)}}),[ue,Ae,t,IA,gA,$,FA,OA,JA,SA,NA,ZA,DA,iA,rA,nA]),de=(0,c.useCallback)((function(A){W.length-1===A?(_.Z.clickButton(t,A),_.Z.hideDialog(t)):re()}),[re,W.length,t]),xe={buttonLabels:W,onClick:de},he=(0,c.useCallback)((function(A){"Enter"===A.key&&re()}),[re]),ge=(0,c.useCallback)((function(A){AA(A)}),[]),Ee=(0,c.useMemo)((function(){return{currentIndex:nA,list:y.map((function(A){return{text:e({id:A.text})}})),onClickItem:function(A){A!==nA&&aA(A)},inputWidth:160,scrollTop:ie}}),[nA,ie,e]),fe=(0,c.useMemo)((function(){return{value:iA,min:k,max:Z,changeUnit:.5,onChange:function(A){sA(A)},inputWidth:160,suffix:"cm"}}),[iA]),be=(0,c.useMemo)((function(){return{value:rA,min:k,max:Z,changeUnit:.5,onChange:function(A){dA(A)},inputWidth:160,suffix:"cm"}}),[rA]),Ie=(0,c.useMemo)((function(){return{currentIndex:gA,list:O.map((function(A){return{text:e({id:A.text})}})),onClickItem:function(A){if(A!==gA)switch(EA(A),A){case 0:mA(!0),pA(0);break;case 1:case 2:mA(!1),pA(1)}},inputWidth:160,scrollTop:ie}}),[gA,ie,e]),pe=(0,c.useMemo)((function(){return{value:IA,min:U,max:V,changeUnit:.5,onChange:function(A){pA(A)},inputWidth:160,isDisable:LA,suffix:"cm",isDisplayAbs:!0}}),[LA,IA]),_e=(0,c.useMemo)((function(){return{value:NA,min:w,max:D,changeUnit:1,onChange:function(A){PA(A)},inputWidth:160,suffix:"pt"}}),[NA]),ve=(0,c.useMemo)((function(){return{value:SA,min:w,max:D,changeUnit:1,onChange:function(A){TA(A)},inputWidth:160,suffix:"pt"}}),[SA]),Le=(0,c.useMemo)((function(){return{currentIndex:ZA,list:H.map((function(A){return{text:e({id:A.text})}})),onClickItem:function(A){A!==ZA&&(UA(A),QA(H[A].value.value))},inputWidth:160,scrollTop:ie}}),[ZA,ie,e]),me=(0,c.useMemo)((function(){var A,e,t,n;return{value:DA,min:null===(A=H[ZA])||void 0===A?void 0:A.value.min,max:null===(e=H[ZA])||void 0===e?void 0:e.value.max,changeUnit:null===(t=H[ZA])||void 0===t?void 0:t.value.changeUnit,onChange:function(A){var e;if((null===(e=H[ZA])||void 0===e?void 0:e.value.unit)===R.at$.BR_LINESP_UNIT_MULTIPLE)switch(A){case 1:UA(0);break;case 1.5:UA(1);break;case 2:UA(2);break;default:UA(5)}QA(A)},inputWidth:160,suffix:null===(n=H[ZA])||void 0===n?void 0:n.value.suffix}}),[ZA,DA]),Ce=(0,c.useCallback)((function(A){HA(A.currentTarget.checked)}),[]),Re=(0,c.useCallback)((function(A){YA(A.currentTarget.checked)}),[]),Ne=(0,c.useCallback)((function(A){qA(A.currentTarget.checked)}),[]);return(0,G.jsxs)(c.Fragment,{children:[(0,G.jsx)(j.Z,(0,n.Z)({},se)),(0,G.jsx)("div",{className:i.Z.popup_contents,onKeyDown:he,children:(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)("table",{className:"".concat(i.Z.form_table),children:[(0,G.jsxs)("colgroup",{children:[(0,G.jsx)("col",{style:{width:"18%"}}),(0,G.jsx)("col",{style:{width:"auto"}})]}),(0,G.jsxs)("tbody",{children:[(0,G.jsx)("tr",{children:(0,G.jsx)("th",{colSpan:4,children:e({id:"DLG_PARAGRAPH_GENERAL"})})}),(0,G.jsxs)("tr",{children:[(0,G.jsxs)("th",{children:[e({id:"DLG_PARAGRAPH_ALIGNMENT"})," :"]}),(0,G.jsx)("td",{colSpan:3,children:(0,G.jsxs)("div",{className:"".concat(i.Z.flex_box),children:[(0,G.jsx)("button",{className:"".concat(i.Z.normal_btn," ").concat(0===$?i.Z.checked:""),style:{backgroundImage:"-webkit-image-set(url(".concat(s,") 1x, url(").concat(x,") 2x)"),backgroundSize:"30px 30px"},onClick:function(){ge(0)}}),(0,G.jsx)("button",{className:"".concat(i.Z.normal_btn," ").concat(1===$?i.Z.checked:""),style:{backgroundImage:"-webkit-image-set(url(".concat(o,") 1x, url(").concat(h,") 2x)"),backgroundSize:"30px 30px"},onClick:function(){ge(1)}}),(0,G.jsx)("button",{className:"".concat(i.Z.normal_btn," ").concat(2===$?i.Z.checked:""),style:{backgroundImage:"-webkit-image-set(url(".concat(u,") 1x, url(").concat(g,") 2x)"),backgroundSize:"30px 30px"},onClick:function(){ge(2)}}),(0,G.jsx)("button",{className:"".concat(i.Z.normal_btn," ").concat(3===$?i.Z.checked:""),style:{backgroundImage:"-webkit-image-set(url(".concat(r,") 1x, url(").concat(E,") 2x)"),backgroundSize:"30px 30px"},onClick:function(){ge(3)}}),(0,G.jsx)("button",{className:"".concat(i.Z.normal_btn," ").concat(4===$?i.Z.checked:""),style:{backgroundImage:"-webkit-image-set(url(".concat(d,") 1x, url(").concat(f,") 2x)"),backgroundSize:"30px 30px"},onClick:function(){ge(4)}})]})})]}),(0,G.jsxs)("tr",{children:[(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_OUTLINE_LEVEL"})}),(0,G.jsx)("td",{colSpan:3,children:(0,G.jsx)(m.r,(0,n.Z)({},Ee))})]})]})]}),(0,G.jsxs)("table",{className:"".concat(i.Z.form_table," ").concat(i.Z.line),children:[(0,G.jsxs)("colgroup",{children:[(0,G.jsx)("col",{style:{width:"18%"}}),(0,G.jsx)("col",{style:{width:"32%"}}),(0,G.jsx)("col",{style:{width:"18%"}}),(0,G.jsx)("col",{style:{width:"32%"}})]}),(0,G.jsxs)("tbody",{children:[(0,G.jsx)("tr",{children:(0,G.jsx)("th",{colSpan:4,children:e({id:"DLG_PARAGRAPH_INDENT"})})}),(0,G.jsxs)("tr",{children:[(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_MARGIN_LEFT"})}),(0,G.jsx)("td",{children:(0,G.jsx)(P.P,(0,n.Z)({ref:ee},fe))}),(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_MARGIN_RIGHT"})}),(0,G.jsx)("td",{children:(0,G.jsx)(P.P,(0,n.Z)({ref:te},be))})]}),(0,G.jsxs)("tr",{children:[(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_FIRST_LINE"})}),(0,G.jsx)("td",{children:(0,G.jsx)(m.r,(0,n.Z)({},Ie))}),(0,G.jsx)("th",{children:e({id:"VALUE"})}),(0,G.jsx)("td",{children:(0,G.jsx)(P.P,(0,n.Z)({ref:ne},pe))})]})]})]}),(0,G.jsxs)("table",{className:"".concat(i.Z.form_table," ").concat(i.Z.line),children:[(0,G.jsxs)("colgroup",{children:[(0,G.jsx)("col",{style:{width:"18%"}}),(0,G.jsx)("col",{style:{width:"32%"}}),(0,G.jsx)("col",{style:{width:"18%"}}),(0,G.jsx)("col",{style:{width:"32%"}})]}),(0,G.jsxs)("tbody",{children:[(0,G.jsx)("tr",{children:(0,G.jsx)("th",{colSpan:4,children:e({id:"DLG_PARAGRAPH_SPACING"})})}),(0,G.jsxs)("tr",{children:[(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_SPACING_FRONT"})}),(0,G.jsx)("td",{children:(0,G.jsx)(P.P,(0,n.Z)({ref:ae},_e))}),(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_SPACING_BACK"})}),(0,G.jsx)("td",{children:(0,G.jsx)(P.P,(0,n.Z)({ref:ce},ve))})]}),(0,G.jsxs)("tr",{children:[(0,G.jsx)("th",{children:e({id:"DLG_PARAGRAPH_SPACING_SPACING"})}),(0,G.jsx)("td",{children:(0,G.jsx)(m.r,(0,n.Z)({},Le))}),(0,G.jsx)("th",{children:e({id:"VALUE"})}),(0,G.jsx)("td",{children:(0,G.jsx)(P.P,(0,n.Z)({ref:le},me))})]})]})]}),$A===T.Locale.ko?(0,G.jsxs)("table",{className:"".concat(i.Z.form_table," ").concat(i.Z.line),children:[(0,G.jsx)("colgroup",{children:(0,G.jsx)("col",{style:{width:"100%"}})}),(0,G.jsxs)("tbody",{children:[(0,G.jsx)("tr",{children:(0,G.jsx)("th",{children:(0,G.jsx)(b.Z,{label:"DLG_PARAGRAPH_HANGULE_INPUT_SYSTEM"})})}),(0,G.jsx)("tr",{children:(0,G.jsx)("th",{children:(0,G.jsx)("div",{children:(0,G.jsxs)("label",{className:"".concat(i.Z.chk_label),children:[(0,G.jsx)("input",{type:"checkbox",checked:OA,onChange:Ce}),(0,G.jsx)("span",{children:(0,G.jsx)(b.Z,{label:"DLG_PARAGRAPH_PENALTY_PROCESSING"})})]})})})}),(0,G.jsx)("tr",{children:(0,G.jsx)("th",{children:(0,G.jsxs)("label",{className:"".concat(i.Z.chk_label),children:[(0,G.jsx)("input",{type:"checkbox",checked:FA,onChange:Re}),(0,G.jsx)("span",{children:(0,G.jsx)(b.Z,{label:"DLG_PARAGRAPH_HANGULE_ALLOW_TRUNCATION"})})]})})}),(0,G.jsx)("tr",{children:(0,G.jsx)("th",{children:(0,G.jsxs)("label",{className:"".concat(i.Z.chk_label),children:[(0,G.jsx)("input",{type:"checkbox",checked:JA,onChange:Ne}),(0,G.jsx)("span",{children:(0,G.jsx)(b.Z,{label:"DLG_PARAGRAPH_FIT_PUNCTUATION"})})]})})})]})]}):null]})}),(0,G.jsx)(p.Z,(0,n.Z)({},xe))]})}},572193:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeAgMAAABGXkYxAAAACVBMVEUAAABAQEBAQEC542CNAAAAAnRSTlMA2hCV9vIAAAAhSURBVBjTYyATsK1atWolYTUTiDHHgaCaCYTdA3IOxQAA0KgKH/Jo7xYAAAAASUVORK5CYII="},928703:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAAAt0lEQVRoBe3VMQ7DIAxA0dCbsbbnbVaORk/AYCtBVvoyRgbBY/jH4SNAgAABAgQIECBAICPQoot679855zu67o751to5xvhE9n5FhgvOzoJnciQCBAgQSAuU6nCmq9GbV+uwrkZf0DwBAgQeJVCqwyvZK/tcrcOrO+vzSsZ/AgQIPEpga4ev7Gn2FXZ3WE+zL2UdAQIE/kJga4ejond0e3eHo3fW7aiYeQIECBAgQIAAAQIECKQEfq4JLQtmyXgrAAAAAElFTkSuQmCC"},196650:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeAgMAAABGXkYxAAAACVBMVEUAAABAQEBAQEC542CNAAAAAnRSTlMA2hCV9vIAAAAhSURBVBjTYyATsK1atWolQUWElTACzVlCWNES4syhFAAAzT0KnIkSi8EAAAAASUVORK5CYII="},375018:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAAAxElEQVRoBe3VQQ6DIBBAUenN2LbnbbccjZ7ATGawCTXPpaCOj8U/DhcBAgQIECBAgAABAhWBln2o9/6ecz6zz/1if2vtM8Z4Zd79yGzecO/ccCYjESBAgEBZIN3h6EtXdrrS2Wi+3Tuss9EJWidAgMCtBModvrK3WdGVPu/e4TMLfT6TcZ8AAQJ/LVDucPTXK51e6Ww0164d1tno5KwTIEDglgLlDq90dlVypdO7djgy0elIyDoBAgQIECBAgAABAgRSAl90NC0L+ljnZAAAAABJRU5ErkJggg=="},808721:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeAgMAAABGXkYxAAAACVBMVEUAAABAQEBAQEC542CNAAAAAnRSTlMA2hCV9vIAAAAiSURBVBjTYyATsK1atWolQVVZhNVIgcwhbBBBNWwgcygFAH7PCZhHt6fLAAAAAElFTkSuQmCC"},399968:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAAArUlEQVRoBe3VMQ6DMBBFQZybuSXnTVofzTRpKb6xJUcaSrQLZijecbgIECBAgAABAgQIEBgRKOlSrfXTez/TvRXzpZRva+2dPPuVDG842zc8kyMRIECAwLBA3OH0TSu7rcPp3zBPgAABApsJTOvwyt7emenwnYz7BAgQIPAnAtM6PPq9T/qtw6Pq9ggQIEBgE4HpHX7S1dREh1Mx8wQIECBAgAABAgQIECDwE7gANmctCzcy8qoAAAAASUVORK5CYII="},289773:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeAgMAAABGXkYxAAAACVBMVEUAAABAQEBAQEC542CNAAAAAnRSTlMA2hCV9vIAAAAVSURBVBjTYyATsK1atWrlEFNDGAAATCUNYrGUg4AAAAAASUVORK5CYII="},556506:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAAAoUlEQVRoBe3VMQ6AIAwFUPFmrHpeXTka3oBIkwaGx0pbmsfwj8MhQIAAAQIECBAgQCAiUGabaq1P7/2a7cuoL6W8rbV7ZvY5U7xhbd9wJysRIECAQFhADofp1jTK4TXuXiVAgECSgBxOgs0aK4ezZM0lQIDAEgE5vIQ9/qgcjtvpJECAwIYCcnjDTxmtJIdHOu4IECBAgAABAgQIECDwW+ADn9wtC7q0er8AAAAASUVORK5CYII="},495791:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeBAMAAADJHrORAAAAFVBMVEUAAAA+b8o+b8pAQEA+bspAQEA9bsldH+NIAAAABXRSTlMAPuva9LYvrfIAAAAxSURBVBjTYxgEIIBBSIABhAOgfEZFIAkkYHyWNBBIwZTHoR9qLk4+cygIBNNB/YADALOoEjR1acQvAAAAAElFTkSuQmCC"},649061:function(A){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAACL3+lcAAAB8UlEQVRoBe2Xv07DMBDGbVSEQEhMPEUHJBYG/ihhAyZeBGaegIWlT9KpILFEQmLowsZLlAUkYAHJ+FJKLcu4dn1WE/WLVNWxfXf+fmdfEiFwgQAIgAAIgAAIgAAIgAAIgAAIgICQuRicXD1tv39+96VQbw+9vbOYOEeXw4EScmtzo3N+d737EmM7a+7KrAn2eFEUin52v3n/K7YSSu3Tws2xkHZto201sIp8+WxC1mPaRws2jV1tQ2xXSPlMWXLN8/XVNtpWA+uGiPb5ssdYBTvElvNsSbLRoksCxi2aTTCX2ElGconuTAKk/lOBomzUfmgrfnyNDi+GSW61j6n9eHv3dcfBtDO+xZbh+NCLsWDLMBUaKjB1lsfFaq7za2JwHJPoAmj6ozZbhrnPnENsMkBWweSMS3QuseyC/xFNhSbq+iuATEfDDM62pU2nlOn11bVj/Rx91K+Wr+ZYSJteR8mWnsXkK8QmdA5b0bID3t/sjHTfXI+Q2HdvO7bvPkuGfQEXPbZ0gtm2dFmWA6XUac4MSilvq6qK+tS019O2DHs/S21xrnu2DKeSdy0uR1/bMpzMAIKTETbcAdsZRpXOk2lU6ViuKFqxxNo2f+kyjCrd8C2aXKUbrg/LAwEQAAEQAAEQAAEQAAEQAAEQAIEsBH4A2Tn7QMC9ovcAAAAASUVORK5CYII="}}]);