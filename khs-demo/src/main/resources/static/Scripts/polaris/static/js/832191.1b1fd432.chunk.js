"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[832191,161308,846775,402533],{161308:function(e,n,t){t.r(n),t.d(n,{default:function(){return I}});var o=t(215671),r=t(143144),a=t(237683),i=t(977917),u=t(625477),c=t(361688),s=t(459551),l=t(981142),f=t(588567),m=t(628264),d=t(769071),v=t(735622),g=t(995124),p=t(815e3),h=t(780386),P=t(159366),y=t(305054),w=t(382800),I=function(){function e(){(0,o.Z)(this,e)}return(0,r.Z)(e,[{key:"saveDocument",value:function(){return C().catch((function(e){return i.ZP.api.reject("The document could not be saved.","[".concat(e.message,"]"))}))}},{key:"isModified",value:function(){return b()}},{key:"getDocContentRect",value:function(){return k()}},{key:"getTitleBarRect",value:function(){return D()}},{key:"getRibbonTabMenuRect",value:function(){return S()}},{key:"getRibbonBarRect",value:function(){return Z()}},{key:"getViewMode",value:function(){return R()}},{key:"activeInput",value:function(){_()}},{key:"isProtectedDocument",value:function(){return h.Z.isPasswordDocument}},{key:"insertImage",value:function(e,n){}},{key:"insertHtmlData",value:function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];l.o.insertHtmlData(n?f.vlz.CLIPDATA_HTML:f.vlz.CLIPDATA_STR,e),d.Z.focus("DocInputField"),w.Z.updateDrawCaret()}},{key:"insertString",value:function(e){l.o.insertString(e,f.v$l.BR_IME_COMPOSITING_RESULT)}},{key:"getMarkString",value:function(){return l.o.getMarkString()}},{key:"getCaretInfo",value:function(){var e=l.o.getCaretInfoFromJson().nCaretStatus;return{status:(f.Bn1[e]||"").replaceAll("BR_","").toLowerCase(),objectType:y.Z.getObjectType(),objectCount:y.Z.getObjectCount()}}},{key:"getFrameToImageBlob",value:function(e){return T(e)}},{key:"downloadSelectFrame",value:function(e,n){O(e,n)}},{key:"getHtmlTextContent",value:function(e){return L(e)}}]),e}(),C=function(){return new Promise((function(e,n){var t=(0,u.qm)(s.hz),o=t.extension,r=t.docName;if(a.Z.setListener("onSaveDocument",(function(t,i){if(t===f.WbN.kPoProcessSucess&&i)if("hwpx"===o){var u="".concat(r.replace(new RegExp(".".concat(o,"$")),".hwp"));e({name:u,blob:i})}else e({name:r,blob:i});else n(new Error("Error ".concat(t)));a.Z.removeListener("onSaveDocument")})),o&&"csv"===o.toLowerCase()&&!0===p.ZP.get("isShowAlertDialogForCSVSaving"))v.Z.showDialog({dialogId:g.O.CONFIRM_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_CSV_SAVE_INFO"},currentTabIndex:0},(function(e){0===e?l.o.saveDocument(o):n(new Error("Canceled by user."))}));else{var i=o;"hwpx"===o&&(i="hwp"),l.o.saveDocument(i)}}))},b=function(){return l.o.isDocumentModified()},k=function(){return(0,u.qm)(c.SV)},D=function(){return(0,u.qm)(c.IU)},S=function(){return(0,u.qm)(c.ms)},Z=function(){return(0,u.qm)(c.qr)},R=function(){return(0,u.qm)(m.p_).viewMode},_=function(){d.Z.focus("DocInputField")},T=function(e){if(y.Z.isImageObject()&&1===y.Z.getObjectCount()){var n=(0,P.km)(e);return l.o.frameToImageBuffer(n)}return null},O=function(e,n){var t=(0,P.km)(n),o=l.o.frameToImageBuffer(t),r=document.createElement("a");r.style.display="none",document.body.appendChild(r);var a=window.URL.createObjectURL(o);r.href=a,r.download="".concat(e,".").concat(n),r.click(),window.URL.revokeObjectURL(a),document.body.removeChild(r)},L=function(e){var n=document.createElement("div");n.innerHTML=e;for(var t=n.children,o="",r=0;r<t.length;r+=1){var a;"STYLE"!==t[r].tagName&&(o+=null===(a=t[r].textContent)||void 0===a?void 0:a.replace(/\s\s+/g,"\n"))}return o}},846775:function(e,n,t){t.r(n),t.d(n,{default:function(){return I}});var o=t(215671),r=t(143144),a=t(957112),i=t(815e3),u=t(237683),c=t(977917),s=t(625477),l=t(361688),f=t(459551),m=t(159366),d=t(981142),v=t(588567),g=t(780386),p=t(735622),h=t(995124),P=t(652928),y=t(53110),w=t(628264),I=function(){function e(){(0,o.Z)(this,e)}return(0,r.Z)(e,[{key:"openDocument",value:function(e){var n="The document could not be opened.";return e?e.name?(0,m.mD)(e.name)?e.blob?C(e.name,e.blob).catch((function(e){return c.ZP.api.rejectOpenDocument("".concat(n," [").concat(e.message,"]"),e.errorCode,e.closeDialog)})):c.ZP.api.reject(n,"[There is no 'blob' in the 'document'. Please set the 'blob' and try again.]"):c.ZP.api.reject(n,"[Please include an extension in the name.]"):c.ZP.api.reject(n,"[There is no 'name' in the 'document'. Please set the 'name' and try again.]"):c.ZP.api.reject(n,"[An argument for 'document' was not provided. Please set the 'document' and try again.]")}},{key:"getSDKInformation",value:function(){return b()}},{key:"movePage",value:function(e){D(e)}},{key:"isReadOnlyDocument",value:function(){return S()}},{key:"getDocumentExtension",value:function(){return Z()}}]),e}(),C=function(e,n){return new Promise((function(t,o){var r,a=(0,m.mD)(e);if(k(a)){u.Z.setListener("onOpenComplete",(function(){(0,s.Ce)((0,f.RY)(e)),(0,s.Ce)((0,f.Js)(a)),t(),r=null,u.Z.removeListener("onOpenComplete")})),u.Z.setListener("onLoadFail",(function(n){(0,s.Ce)((0,f.RY)(e)),(0,s.Ce)((0,f.Js)(a)),o({message:"Loading failed '".concat(e,"'."),errorCode:n,closeDialog:new Promise((function(e){u.Z.setListener("onCancelOpenDocument",(function(){e(),u.Z.removeListener("onCancelOpenDocument")}))}))}),r=null,u.Z.removeListener("onLoadFail")})),u.Z.setListener("onLoadForce",(function(){null!==r&&i(r,!0),r=null,u.Z.removeListener("onLoadForce")}));var i=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];"hwpx"===a?g.Z.setOpenMode(v.ekp.ePRM_READ_ONLY_RECOMMENDED_READONLY):g.Z.setOpenMode(v.ekp.ePRM_COMMON),g.Z.setDocData(n,a);var o=(0,s.qm)(l.LG),r=(0,s.qm)(l.CI);(0,y.Vq)()?d.o.memoryOpenForViewerSDK(".".concat(a),e,e.byteLength,o.width*r,o.height*r):d.o.memoryOpen(".".concat(a),e,e.byteLength,o.width*r,o.height*r,t),(0,s.Ce)((0,w._j)(!1))},c=new FileReader;c.onload=function(){c.readyState===FileReader.DONE&&c.result instanceof ArrayBuffer&&(r=c.result,i(c.result))};var P=function(e){o({message:e,errorCode:-1,closeDialog:new Promise((function(e){u.Z.setListener("onCancelOpenDocument",(function(){e(),u.Z.removeListener("onCancelOpenDocument")}))}))})};c.onabort=function(){P("Reading the file is aborted. '".concat(c.error,"'."))},c.onerror=function(){P("Failed to read file. '".concat(c.error,"'."))},c.readAsArrayBuffer(n)}else p.Z.showDialog({dialogId:h.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_NOTSUPPORT",values:{arg1:"(.".concat(a,")")}},currentTabIndex:0},(function(){o({message:"This document format is not supported. '(.".concat(a,")'"),closeDialog:new Promise((function(e){u.Z.setListener("onCancelOpenDocument",(function(){e(),u.Z.removeListener("onCancelOpenDocument")}))}))})}))}))},b=function(){return{version:i.i8,formats:i.bd,licenseKey:a.C}},k=function(e){var n=(0,s.qm)(f.hz).docType,t=e.toLowerCase();if(n===P.n_.hwp){if(["hwp","hwpx"].includes(t))return!0}else if(n===P.n_.word){if(["doc","docx"].includes(t))return!0}else if(n===P.n_.sheet){if(["xls","xlsx","csv"].includes(t))return!0}else if(n===P.n_.slide&&["ppt","pptx"].includes(t))return!0;return!1},D=function(e){var n=e,t=d.o.getConfig().nTotalPages;n<1&&(n=1),n>t&&(n=t),d.o.movePage(v.ZbX.eEV_MOVE_SETPAGE,n)},S=function(){return g.Z.isProtectDoc()||g.Z.isReadOnlyDoc()},Z=function(){return(0,s.qm)(f.hz).extension}},832191:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var o,r=t(601413),a=t(974165),i=t(115861),u=t(215671),c=t(143144),s=t(179340),l=t(432269),f=t(416031),m=t(237683),d=t(981142),v=t(588567),g=t(977917),p=t(780386),h=t(625477),P=t(459551),y=t(361688),w=t(402533),I=t(161308),C=t(628264),b=t(53110),k=t(815e3),D=t(995124),S=t(407604);!function(e){e.all="all",e.current_page="current_page",e.custom_range="custom_range"}(o||(o={}));var Z=function(e){(0,s.Z)(t,e);var n=(0,l.Z)(t);function t(){var e;return(0,u.Z)(this,t),(e=n.call(this)).commonAPI=void 0,e.commonAPI=new I.default,e}return(0,c.Z)(t,[{key:"saveDocument",value:function(){return this.commonAPI.saveDocument()}},{key:"isModified",value:function(){return this.commonAPI.isModified()}},{key:"getViewMode",value:function(){return this.commonAPI.getViewMode()}},{key:"activeInput",value:function(){return this.commonAPI.activeInput()}},{key:"getDocContentRect",value:function(){return this.commonAPI.getDocContentRect()}},{key:"getTitleBarRect",value:function(){return this.commonAPI.getTitleBarRect()}},{key:"getRibbonTabMenuRect",value:function(){return this.commonAPI.getRibbonTabMenuRect()}},{key:"getRibbonBarRect",value:function(){return this.commonAPI.getRibbonBarRect()}},{key:"isProtectedDocument",value:function(){return this.commonAPI.isProtectedDocument()}},{key:"insertHtmlData",value:function(e){return this.commonAPI.insertHtmlData(e)}},{key:"insertString",value:function(e){return this.commonAPI.insertString(e)}},{key:"getMarkString",value:function(){return this.commonAPI.getMarkString()}},{key:"getCaretInfo",value:function(){return this.commonAPI.getCaretInfo()}},{key:"getFrameToImageBlob",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"png";return this.commonAPI.getFrameToImageBlob(e)}},{key:"downloadSelectFrame",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"PoImage",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"png";this.commonAPI.downloadSelectFrame(e,n)}},{key:"openNewDocument",value:function(){return R().catch((function(e){return g.ZP.api.reject("The new document could not be opened.","[".concat(e.message,"]"))}))}},{key:"exportAsPDF",value:function(e){var n=e.target,t=e.isPdfAExport,r=e.customRange,a="The document could not be exported as pdf.";return(0,f.isNil)(n)||"string"!==typeof n||!(n in o)?g.ZP.api.reject(a,"['target' argument is invalid . Please set a valid 'target' argument and try again.]"):(0,f.isNil)(t)||"boolean"!==typeof t?g.ZP.api.reject(a,"['isPdfAExport' argument is invalid . Please set a valid 'target' argument and try again.]"):n!==o.custom_range||!(0,f.isNil)(r)&&"string"===typeof r?_(e).catch((function(e){return g.ZP.api.reject(a,"[".concat(e.message,"]"))})):g.ZP.api.reject(a,"['customRange' argument is invalid . Please set a valid 'customRange' argument and try again.]")}},{key:"setWatermarkInDocument",value:function(e){var n=e.text,t=e.textSize,o=e.textColor,r=e.fontName,a=e.isSemitransparent,i=e.isLayoutDiagonal,u=e.isFront;if(void 0!==n){var c=(0,v.q3T)();if(c.nSelector=v.B0D.BR_WATERMARK_TEXT,c.szText=n,void 0!==t&&(c.nTextSize=t),void 0!==o){var s=(0,v.WSJ)();s.nColor=b.Il.rgbToHex(o),c.nColor=s}void 0!==r&&(c.szFontName=r),void 0!==a&&(c.bSemitransparent=a),void 0!==i&&(c.bLayoutDiagonal=i),void 0!==u&&(c.bFront=u),d.o.setWatermark(c)}else g.ZP.error("text parameter is undefined. please set text parameter")}},{key:"insertImage",value:function(e,n){try{return T(e,n)}catch(t){return g.ZP.api.reject("","[".concat(t.message,"]"))}}},{key:"insertHyperlink",value:function(e,n){O(e,n)}},{key:"setActiveLinkDomainList",value:function(e){k.ZP.setActiveLinkDomainList(e)}},{key:"showOpenPasswordDialog",value:function(){L()}},{key:"showWritePasswordDialog",value:function(){A()}},{key:"setOpenPassword",value:function(e){E(e)}},{key:"setWritePassword",value:function(e){x(e)}},{key:"getHtmlTextContent",value:function(e){return this.commonAPI.getHtmlTextContent(e)}}]),t}(w.default),R=function(){return new Promise(function(){var e=(0,i.Z)((0,a.Z)().mark((function e(n,t){var o,r,i,u;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,h.Ce)((0,P.ge)("docx"));try{o=(0,h.qm)(P.hz),r=o.extension,i=(0,h.qm)(y.LG),u=(0,h.qm)(y.CI),m.Z.setListener("onOpenComplete",(function(){n(),m.Z.removeListener("onOpenComplete")})),p.Z.setOpenMode(v.ekp.ePRM_COMMON),d.o.newDocument(".".concat(r),i.width*u,i.height*u),(0,h.Ce)((0,C._j)(!0))}catch(a){t(a)}case 2:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}())},_=function(e){return new Promise((function(n,t){var r=e.target,a=e.isPdfAExport,i=e.customRange,u=(0,h.qm)(P.hz),c=u.docName,s=u.extension;m.Z.setListener("onSaveDocument",(function(e,o){if(e===v.WbN.kPoProcessSucess&&o){var r="".concat(c.replace(new RegExp(".".concat(s,"$")),".pdf"));n({name:r,blob:o})}else t(new Error("Error ".concat(e)));m.Z.removeListener("onSaveDocument")}));var l=0,f=[];switch(r){case o.all:break;case o.current_page:var g=d.o.getConfig().nCurPage;l=1,f.push(g);break;case o.custom_range:if(!i)return;i.split(",").forEach((function(e){if(e.indexOf("-")>0){var n=e.split("-");if(2!==n.length)return;var t=parseInt(n[0]),o=parseInt(n[1]);if(isNaN(t)||isNaN(o))return;for(var r=t;r<=o;r+=1)f.push(r)}else{var a=parseInt(e);if(isNaN(a))return;f.push(a)}})),l=(f=Array.from(new Set(f))).length}d.o.saveDocument("pdf",v.dLw.BR_SAVE_OPTION_TEMP_SAVE,a,!1,l,f,!1,400)}))},T=function(e,n){return new Promise(function(){var t=(0,i.Z)((0,a.Z)().mark((function t(o,r){var i,u,c,s,l;return(0,a.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,b.Cq)(e);case 3:if((i=t.sent)instanceof ArrayBuffer){t.next=6;break}return t.abrupt("return");case 6:u=(null===n||void 0===n?void 0:n.width)||0,c=(null===n||void 0===n?void 0:n.height)||0,0,s=(null===n||void 0===n?void 0:n.posX)||0,l=(null===n||void 0===n?void 0:n.posY)||0,d.o.imageInsert(i,u,c,0,s,l),o(),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(0),r(t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})));return function(e,n){return t.apply(this,arguments)}}())},O=function(e,n){if(!(0,f.isEmpty)(e)){var t=(0,r.Z)((0,r.Z)({},(0,v.Nuw)()),{},{nLinkType:v.QLl.EV_LINK_TO_URL,nRunType:v.Cuw.EV_LINK_RUNTYPE_MOUSE_CLICK,szHyperLink:e||"",szHyperText:n||""});d.o.setHyperLinkInfoFromJson(t)}},L=function(){var e=""===d.o.getPasswordStr().szOpenPassword?D.O.OPEN_PASSWORD_SETTING_DIALOG:D.O.OPEN_PASSWORD_CHANGE_DIALOG;(0,h.Ce)((0,S.vC)({dialogId:e,bModal:!0,currentTabIndex:0}))},A=function(){var e=""===d.o.getPasswordStr().szWritePassword?D.O.WRITE_PASSWORD_SETTING_DIALOG:D.O.WRITE_PASSWORD_CHANGE_DIALOG;(0,h.Ce)((0,S.vC)({dialogId:e,bModal:!0,currentTabIndex:0}))},E=function(e){var n=d.o.getPasswordStr(),t=d.o.isReadOnlyRecommendedDoc();d.o.setPasswordStr(e,n.szWritePassword,t)},x=function(e){var n=d.o.getPasswordStr(),t=d.o.isReadOnlyRecommendedDoc();d.o.setPasswordStr(n.szOpenPassword,e,t)}},402533:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var o=t(215671),r=t(143144),a=t(179340),i=t(432269),u=t(237683),c=t(846775),s=t(981142),l=t(588567),f=t(977917),m=function(e){(0,a.Z)(t,e);var n=(0,i.Z)(t);function t(){return(0,o.Z)(this,t),n.apply(this,arguments)}return(0,r.Z)(t,[{key:"getDocumentInformation",value:function(){return d()}},{key:"exportAsImage",value:function(){return v().catch((function(e){return f.ZP.api.reject("The document could not be printed.","[".concat(e.message,"]"))}))}}]),t}(c.default),d=function(){var e=s.o.getSummaryData(),n=e.szTitle,t=e.szAuthor,o=e.szModifiedBy,r=e.nWords,a=s.o.getWordCountStatistic(!0),i=a.nPageCnt,u=a.nWordCnt,c=a.nCharCnt,l=a.nCharWithoutSpaceCnt,f=a.nParaCnt,m=a.nLineCnt;return{title:n,author:t,modifiedBy:o,characters:l.toString(),characterBlank:c.toString(),words:r?null===r||void 0===r?void 0:r.toString():"",wordsSelection:u.toString(),lines:m.toString(),paragraphs:f.toString(),pages:i.toString(),manuscript:Math.ceil(u/200).toString()}},v=function(){return new Promise((function(e,n){var t=s.o.getConfig().nTotalPages,o=[],r=setTimeout((function(){o.length!==t&&n(new Error("\n                        The file is too large to print."))}),1e4);u.Z.setListener("onExportAsImage",(function(n,a){a&&(o[n-1]=a),o.length===t&&(e({blobs:o}),u.Z.removeListener("onExportAsImage"),clearTimeout(r))})),s.o.setPrint(l.e_4.BR_PRINT_PAGESIZE_A4,1,t,l.nXZ.PRINT_JPG_IMG,l.AJA.BR_PRINT_150)}))}}}]);