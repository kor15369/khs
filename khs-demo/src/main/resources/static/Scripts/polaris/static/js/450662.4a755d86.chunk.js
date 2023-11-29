"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[450662],{782345:function(e,t,a){a.d(t,{U:function(){return A},j:function(){return n}});var n,i=a(974165),o=a(115861),r=a(215671),l=a(143144),E=a(625477),c=a(500811),s=a(628264),u=a(652928),_=a(735622),d=a(995124),D=a(769071),T=a(981142),O=a(588567),R=a(416031),C=a(815e3),M=a(53110);!function(e){e[e.NATIVE_CLIPBOARD=0]="NATIVE_CLIPBOARD",e[e.EXTERNAL_CLIPBOARD=1]="EXTERNAL_CLIPBOARD"}(n||(n={}));var S=/<!--\[if gte vml 1\]>/g,m=/<!\[endif\]-->/g,v=/<!--\[PO\]\[if gte vml 1\]>/g,I=/<!\[endif\]\[PO\]-->/g,A=function(){function e(){(0,r.Z)(this,e),this.clipboardDataTransfer=null,this.nativeCopyIdAttrName="nativecopyid",this.nativeCopyIdValue="",this.isNativeMode=!1,this.isCopyFormatMode=!1}return(0,l.Z)(e,[{key:"setNativeMode",value:function(e){return this.isNativeMode!==e&&(this.isNativeMode=e,(0,E.Ce)((0,c.vQ)(e)),this.isNativeMode||(this.nativeCopyIdValue=""),!0)}},{key:"getNavtiveMode",value:function(){return this.isNativeMode}},{key:"setCopyFormatMode",value:function(e){return this.isCopyFormatMode!==e&&(this.isCopyFormatMode=e,(0,E.Ce)((0,c.$A)(this.isCopyFormatMode)),!0)}},{key:"getCopyFormatMode",value:function(){return this.isCopyFormatMode}},{key:"showAlert",value:function(e,t){e===d.O.COMMON_CLIPBOARD?_.Z.showDialog({dialogId:e,bModal:!0,currentTabIndex:0}):_.Z.showDialog({dialogId:e,bModal:!0,alertMsg:{label:t},currentTabIndex:0})}},{key:"canEdit",value:function(){return(0,E.qm)(s.p_).viewMode===u.wO.edit}},{key:"copy",value:function(e){this.clipboardDataTransfer=e,T.o.editDocument(O.OjI.BR_EDITMODE_COPY,O.vlz.CLIPDATA_FAVORITE_DATA,null,n.NATIVE_CLIPBOARD)}},{key:"cut",value:function(e){this.canEdit()&&(this.clipboardDataTransfer=e,T.o.editDocument(O.OjI.BR_EDITMODE_CUT,O.vlz.CLIPDATA_STR,null,n.NATIVE_CLIPBOARD))}},{key:"nativePaste",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O.OjI.BR_EDITMODE_PASTE,t=C.ZP.get("preventPasteFromExternal");this.isNativeMode||t?T.o.editDocument(e,O.vlz.CLIPDATA_STR,null,n.NATIVE_CLIPBOARD):this.showAlert(d.O.COMMON_CLIPBOARD,"")}},{key:"externalPaste",value:function(e,t){T.o.editDocument(O.OjI.BR_EDITMODE_ORIGINAL_FORMAT,t,t===O.vlz.CLIPDATA_HTML?this.excludeImgElements(e):e,n.EXTERNAL_CLIPBOARD),this.setNativeMode(!1)}},{key:"appendClipboardImage",value:function(e){for(var t=function(){var t=e[0];if(t){var a=new FileReader;a.onload=function(){if(a.readyState===FileReader.DONE){var e=a.result,t=new Image;e&&(t.src=e.toString(),t.onload=function(){for(var e=640,a=360,n=t.width,r=t.height;n>e||r>a;)n>e?(r*=e/n,n=e):r>a&&(n*=a/r,r=a);var l=document.createElement("canvas");l.width=n,l.height=r;var E=l.getContext("2d");E&&(E.drawImage(t,0,0,n,r),l.toBlob(function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t){var a;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=5;break}return e.next=3,(0,M.Cq)(t);case 3:(a=e.sent)instanceof ArrayBuffer&&T.o.imageInsert(a,0,0,0,0,0);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))})}},a.readAsDataURL(t)}},a=0;a<e.length;a+=1)t()}},{key:"clipboardPaste",value:function(e){if(this.canEdit()){var t=e.getData&&e.getData("text/plain"),a=e.getData&&e.getData("text/html"),n=!(0,R.isEmpty)(a),i=!(0,R.isEmpty)(t),o=n&&a.includes("".concat(this.nativeCopyIdAttrName,'="').concat(this.nativeCopyIdValue,'"')),r=e.files&&e.files.length>0,l=C.ZP.get("preventPasteFromExternal");o||l?this.nativePaste():r&&!i?this.appendClipboardImage(e.files):n&&this.htmlDataTagCount(a)>0?this.externalPaste(a,O.vlz.CLIPDATA_HTML):i&&this.externalPaste(t,O.vlz.CLIPDATA_STR)}}},{key:"htmlDataTagCount",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"*",a=document.createElement("div");a.innerHTML=e;var n=a.getElementsByTagName(t).length;return a.remove(),n}},{key:"createClipboardElement",value:function(e){var t=document.createElement("div");return t.innerHTML=this.excludeVML(e),document.body.appendChild(t),t.children[0]&&(this.nativeCopyIdValue="".concat(Math.floor(1e5*Math.random())+1),t.children[0].setAttribute(this.nativeCopyIdAttrName,this.nativeCopyIdValue)),t}},{key:"copyToClipboard",value:function(e,t){var a=null;if(t===O.vlz.CLIPDATA_STR)(a=document.createElement("textarea")).value=e,document.body.appendChild(a),a.select(),document.execCommand("copy");else{a=this.createClipboardElement(e);var n=document.createRange();n.selectNodeContents(a);var i=window.getSelection();if(i){var o,r,l=[];if(i.rangeCount>0)for(var E=0;E<i.rangeCount;E+=1){var c=i.getRangeAt(E);l.push(c)}if(i.removeAllRanges(),i.addRange(n),document.execCommand("copy"),i.removeAllRanges(),l&&l.length>0)for(var s=0;s<l.length;s+=1)i.addRange(l[s]);var u=null===(o=D.Z.getForcusRef("DocInputField"))||void 0===o||null===(r=o.elementRef)||void 0===r?void 0:r.current;u&&u instanceof HTMLInputElement&&u.select()}}a.remove(),D.Z.focus("DocInputField")}},{key:"isDuplicatedShape",value:function(e){var t=document.createElement("div");t.innerHTML=e.replace(S,"").replace(m,"");for(var a=t.getElementsByTagName("img"),n=0;n<a.length;n+=1){var i=a[n].getAttribute("v:shapes");if(!(0,R.isEmpty)(i)){var o=t.querySelector('[id="'.concat(i,'"]'));if(!o||!o.tagName||!o.tagName.toLowerCase().startsWith("v:"))return!1}}return!0}},{key:"excludeVML",value:function(e){if(!this.isDuplicatedShape(e))return e;var t=e;return t=(t=t.replace(S,"\x3c!--[PO][if gte vml 1]>")).replace(m,"<![endif][PO]--\x3e")}},{key:"excludeImgElements",value:function(e){if(!v.test(e)||!I.test(e))return e;var t=document.createElement("div");t.innerHTML=e.replace(v,"").replace(I,"");var a=document.createElement("div");a.innerHTML=e.replace(v,"\x3c!--[if gte vml 1]>").replace(I,"<![endif]--\x3e");for(var n=a.getElementsByTagName("img"),i=n.length-1;i>=0;i-=1){var o=n[i],r=o.getAttribute("v:shapes");if(!(0,R.isEmpty)(r)){var l=t.querySelector('[id="'.concat(r,'"]'));l&&l.tagName&&l.tagName.toLowerCase().startsWith("v:")&&o.remove()}}return a.innerHTML}}]),e}()},382299:function(e,t,a){a.r(t);var n=a(416031),i=a(625477),o=a(6087),r=a(519370),l=a(412574),E=a(448439),c=a(735622),s=a(649861),u=a(588567),_=a(981142),d=a(202265),D=a(995124),T=a(642507),O=a(631724),R=a(311501),C=a(465055),M=a(815e3),S=a(237683),m=a(732094),v=a(260861),I=a(137521),A=a(782048),N=a(347806),f=a(342114),h=a(53110),p=a(652928),L=a(780386),g=a(459551),P=a(842306),b={OnInitComplete:function(e){d.Z.initFilterIcon()},OnNewDoc:function(){(0,i.Ce)((0,f.eT)())},OnOpenComplete:function(){E.Z.commandInitvalue(),(0,i.Ce)((0,r.qY)()),N.Z.hideContextMenu(),(0,i.Ce)((0,O.wx)()),(0,i.Ce)((0,s.th)()),(0,i.Ce)((0,C.vc)()),(0,i.Ce)((0,v.kp)()),(0,i.Ce)((0,o.iv)()),(0,i.Ce)((0,P.px)())},OnLoadComplete:function(){(0,i.Ce)((0,f.eT)())},OnShapeDrawModeEnd:function(){m.Z.endShapeDraw()},OnLoadFail:function(e){var t=function(){S.Z.apply("onLoadFail",[e]),c.Z.showDialog({dialogId:D.O.COMMON_NO_CLOSE_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_OPEN_INTERNAL"}},(function(){S.Z.apply("onCancelOpenDocument")}))};switch((0,i.Ce)((0,r.wX)([])),e){case u.v6t.kPoErrWritePasswordDoc:case u.v6t.kPoErrReadPasswordDoc:case u.v6t.kPoErrWrongWritePassword:case u.v6t.kPoErrWrongReadPassword:var a=M.ZP.get("viewMode"),n=M.ZP.get("preventEditPasswordDocument");if(((0,h.Vq)()||a!==p.wO.edit||!0===n)&&e===u.v6t.kPoErrWritePasswordDoc)return L.Z.setOpenMode(u.ekp.ePRM_PASSWORD_WRITE_READ_ONLY),void L.Z.openDocumentWithPassword();c.Z.showDialog({dialogId:D.O.COMMON_DOC_PASSWORD_CONFIRM,bModal:!0,data:e},(function(){t()}));break;case u.v6t.kPoErrFileContentsMismatched:var o=(0,i.qm)(g.hz).docName;c.Z.showDialog({dialogId:D.O.CONFIRM_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_OPEN_FILETYPE_FILEEXTENSION_NOT_MATCHED",values:{arg1:"".concat(o)}},currentTabIndex:0},(function(e){0===e?S.Z.apply("onLoadForce"):t()}));break;case u.v6t.kPoErrUnsupportedEncryptionType:S.Z.apply("onLoadFail",[e]),c.Z.showDialog({dialogId:D.O.COMMON_NO_CLOSE_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_ERROR_OPEN_ENCRYPTION_TYPE"}},(function(){S.Z.apply("onCancelOpenDocument")}));break;default:t()}},OnMouseHovering:function(e){var t=e.hoveringType;e.guideType;I.Z.setMouseHoveringType(t)},OnSheetCellStartEdit:function(){(0,i.Ce)((0,o.Wg)(!0))},OnSheetCellEndEdit:function(){(0,i.Ce)((0,o.Wg)(!1)),(0,i.Ce)((0,s.th)()),(0,i.Ce)((0,O.wx)())},OnSetFormulaFieldText:function(e){(0,i.Ce)((0,o.P7)(e))},OnSetFormulaFieldSelection:function(e){var t=e.start,a=e.end;t>a?(0,i.Ce)((0,o.rb)({start:a,end:t,direction:"backward"})):(0,i.Ce)((0,o.rb)({start:t,end:a,direction:"forward"}))},OnSearchMode:function(){},OnSheetTabChanged:function(){var e=_.o.getCurrentSheetIndex();(0,i.Ce)((0,r.Lw)(e)),M.ZP.applyCallback("onSheetTabChanged",[e])},OnSheetPrevCommentSearchFinish:function(){var e={dialogId:D.O.SHEET_MEMO_SEARCH_END,bModal:!0,alertMsg:{label:"IDS_MSG_SHEET_MEMO_SEARCH_END"},currentTabIndex:0};c.Z.showDialog(e,(function(e){0===e&&_.o.getLastCommentText()}))},OnSheetNextCommentSearchFinish:function(){var e={dialogId:D.O.SHEET_MEMO_SEARCH_END,bModal:!0,alertMsg:{label:"IDS_MSG_SHEET_MEMO_SEARCH_END"},currentTabIndex:0};c.Z.showDialog(e,(function(e){0===e&&_.o.getFirstCommentText()}))},OnSheetAutoFilterMenu:function(e){d.Z.onSheetAutoFilterMenu(e)},OnSheetFunction:function(e){var t=e.nSheetEditorStatus,a=e.nSheetFunctionError,n=e.bIsMessage;T.Z.onSheetFunctionCallback(t,a,n)},OnTotalLoadComplete:function(){if(!(0,h.Vq)()){var e=R.Z.calculateProctctedSheet(),t=_.o.getSheetProtection();e&&R.Z.initSheetProtectListMap(t)}},OnDrawBitmap:function(e){var t=R.Z.calculateProctctedSheet();switch(e.callEvent){case u.m8D.eDRAWMODE_FIRSTPAGE:case u.m8D.eDRAWMODE_PREVPAGE:case u.m8D.eDRAWMODE_PREVPAGEEX:case u.m8D.eDRAWMODE_NEXTPAGE:case u.m8D.eDRAWMODE_NEXTPAGEEX:case u.m8D.eDRAWMODE_LASTPAGE:case u.m8D.eDRAWMODE_SETPAGE:case u.m8D.eDRAWMODE_SHEETRANGEINPUTEVENT:var a=_.o.getSheetProtection();t&&R.Z.initSheetProtectListMap(a);break;case u.m8D.eDRAWMODE_SHEET_EDIT:case u.m8D.eDRAWMODE_SHEETHIDESHOWEVENT:case u.m8D.eDRAWMODE_SHEETGOTOCELLEVENT:case u.m8D.eDRAWMODE_IMEINSERT:case u.m8D.eDRAWMODE_UNDO:case u.m8D.eDRAWMODE_REDO:var n=_.o.getSheetProtection();t&&R.Z.initSheetProtectListMap(n);var o=_.o.getCurrentSheetIndex();o!==(0,i.qm)(r.u9).current&&((0,i.Ce)((0,r.Lw)(o)),M.ZP.applyCallback("onSheetTabChanged",[o]))}e.callEvent!==u.m8D.eDRAWMODE_UNDO&&e.callEvent!==u.m8D.eDRAWMODE_REDO&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_DELETE_ALL&&e.callEvent!==u.m8D.eDRAWMODE_EDIT_PASTE&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_MERGE&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_INSERT_COMMENT&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_DIRECT_INSERT_COMMENT&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_DELETE_COMMENT&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_INSERT_CELL&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_INSERT_COL&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_INSERT_ROW&&e.callEvent!==u.m8D.eDRAWMODE_SHEET_EDIT||M.ZP.applyCallback("onUpdateMemoList")},OnSheetProtectPasswordCheck:function(e){e===u.g8i.kPoErrWrongReadPassword&&c.Z.showDialog({dialogId:D.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_SHEET_UNPROTECT_PASSWORD_ERROR"}})},OnSheetCellCannotEdit:function(e){var t=e.nCellCannotEditType;e.bMouseDblClk;switch(t){case u.B6I.BR_SHEET_CELL_CANNOT_EDIT_PROTECTION:c.Z.showDialog({dialogId:D.O.COMMON_ALERT,bModal:!0,alertMsg:{label:"IDS_MSG_CANT_SHEET_EDIT"}});case u.B6I.BR_SHEET_CELL_CANNOT_EDIT_VIEW_MODE:case u.B6I.BR_SHEET_CELL_CANNOT_EDIT_PENDRAW_MODE:case u.B6I.BR_SHEET_CELL_CANNOT_EDIT_RANGE_INPUT:}},OnSheetProtectionSheetCannotEdit:function(e){var t="";switch(e){case u.Lpp.BR_SHEET_CELL_CANNOT_EDIT_ROW_BY_CELLLOCK:case u.Lpp.BR_SHEET_CELL_CANNOT_EDIT_COL_BY_CELLLOCK:t="IDS_MSG_CANT_SHEET_EDIT_LOCK_CELL";break;case u.Lpp.BR_SHEET_CANNOT_EDIT_PROTECTION_WORKBOOK:t="IDS_MSG_SHEET_TAB_WORKBOOK_PROTECTED";break;case u.Lpp.BR_SHEET_CELL_CANNOT_EDIT_DEFAULT:t="IDS_MSG_CANT_SHEET_EDIT"}""!==t&&c.Z.showDialog({dialogId:D.O.COMMON_ALERT,bModal:!0,alertMsg:{label:t}})},OnSheetDataValidationMenu:function(e){var t=e.left,a=(e.top,e.right),n=e.bottom,o=e.itemCount,r=e.selectedIndex,l=e.titles;(0,i.Ce)((0,C.k8)({left:t,top:n,width:a-t,itemCount:o,selectedIndex:r,titles:l}))},OnSheetDataValidationError:function(e){var t,a=e.errorStyle,n=e.errorTitle,i={errorTitle:n,errorMessage:e.errorMessage,errorStyle:a};switch(a){case u.FEq.eDV_information:t=D.O.SHEET_DATA_VALIDATION_INFORMATION;break;case u.FEq.eDV_warning:t=D.O.SHEET_DATA_VALIDATION_WARRING;break;case u.FEq.eDV_stop:t=D.O.SHEET_DATA_VALIDATION_STOP}t&&c.Z.showDialog({dialogId:t,bModal:!0,dynamicTitle:n,dataValidationState:i},(function(e){e<0&&(t===D.O.SHEET_DATA_VALIDATION_INFORMATION?_.o.sheetDataValidationAnswerError(u.n9C.eDV_ErrorStyle_Information_Cancel):t===D.O.SHEET_DATA_VALIDATION_WARRING?_.o.sheetDataValidationAnswerError(u.n9C.eDV_ErrorStyle_Warning_Cancel):t===D.O.SHEET_DATA_VALIDATION_STOP&&_.o.sheetDataValidationAnswerError(u.n9C.eDV_ErrorStyle_Stop_Cancel))}))},OnSheetStatusBarFuncData:(0,n.debounce)((function(e){var t=e.average,a=e.count,n=e.numerical,o=e.min,r=e.max,E=e.sum,c=a>1,s=c&&n>0;(0,i.Ce)((0,l.$k)({average:s?t:"",count:c?a.toString():"",numerical:s?n.toString():"",min:s?o:"",max:s?r:"",sum:s?E:""}))})),OnClipboardResult:function(e){var t=e.nEventType,a=e.nResult,n=e.textData,i=e.htmlData;A.Z.onClipboardResult(t,a,n,i)},BOnSheetClipboardClear:function(e){A.Z.onSheetClipboardClearResult(e)},BOnSheetFilterCommandResult:function(e){if(e!==u.NP.BR_FILTER_COMMAND_RESULT_SUCCESS){var t="IDS_DLG_SHEET_NEW_NAME_ERROR_INTERNAL";switch(e){case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_INTERNAL:t="IDS_DLG_SHEET_NEW_NAME_ERROR_INTERNAL";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_SORTING_MULTISELECTION:t="IDS_MSG_SHEET_MULTISELECTION_ERROR";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_SORTING_PROTECTION:t="IDS_MSG_SHEET_FIND_REPLACE_SHEET_PROTECT";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_SORTING_MERGEDCELL:t="IDS_MSG_ERROR_SHEET_CELL_MOVE_MERGE";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_SORTING_FEASIBILITY:t="IDS_SEHET_TABLE_CONVERT_RANGE_ERROR_MEMORY";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_SORTING_DATA_RANGE:t="IDS_DLG_EDIT_ERROR_SORT_RANGE";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_FILTER_RANGE:t="";break;case u.NP.BR_FILTER_COMMAND_RESULT_ERROR_SORTING_PIVOTTABLE:t="IDS_MSG_ERROR_SHEET_PIVOTTABLE_ERROR_CANT_CHANGE"}""!==t&&c.Z.showDialog({dialogId:D.O.COMMON_ALERT,bModal:!0,alertMsg:{label:t}})}}};t.default=b},412574:function(e,t,a){a.d(t,{$k:function(){return E},uT:function(){return c}});var n=a(426373),i=a(135323),o=a(416031),r=(0,n.oM)({name:"cellStatus",initialState:{average:{isVisible:!0,value:""},count:{isVisible:!0,value:""},numerical:{isVisible:!0,value:""},min:{isVisible:!0,value:""},max:{isVisible:!0,value:""},sum:{isVisible:!0,value:""}},reducers:{setCellStatusVisibles:function(e,t){var a=t.payload,n=a.average,i=a.count,r=a.numerical,l=a.min,E=a.max,c=a.sum;!(0,o.isNil)(n)&&(e.average.isVisible=n),!(0,o.isNil)(i)&&(e.count.isVisible=i),!(0,o.isNil)(r)&&(e.numerical.isVisible=r),!(0,o.isNil)(l)&&(e.min.isVisible=l),!(0,o.isNil)(E)&&(e.max.isVisible=E),!(0,o.isNil)(c)&&(e.sum.isVisible=c)},setCellStatusValues:function(e,t){var a=t.payload,n=a.average,i=a.count,o=a.numerical,r=a.min,l=a.max,E=a.sum;e.average.value=n,e.count.value=i,e.numerical.value=o,e.min.value=r,e.max.value=l,e.sum.value=E}}}),l=r.actions,E=(l.setCellStatusVisibles,l.setCellStatusValues);t.ZP=r.reducer;var c=(0,i.P1)((function(e){return e.cellStatus}),(function(e){return e}))},342114:function(e,t,a){a.d(t,{a9:function(){return _},eT:function(){return d}});var n=a(426373),i=a(135323),o=a(981142),r=a(101922),l=a(625477),E=a(815e3),c=a(652928),s=a(588567),u=(0,n.oM)({name:"showAndHideMemo",initialState:{isDisabled:!1},reducers:{},extraReducers:function(e){e.addCase(r.He,(function(e){e.isDisabled=!o.o.isExistComment()}))}}),_=(0,i.P1)((function(e){return e.command.memo.showAndHideMemo}),(function(e){return e})),d=function(){return(0,l.RU)("setMemoDrawingModeThunk",(function(){switch(E.ZP.get("memoDrawingMode")){case c.Cm.pc:o.o.setCommentDrawingMode(s.pwb.MEMO_DRAWING_MODE_PC);break;case c.Cm.mobile:o.o.setCommentDrawingMode(s.pwb.MEMO_DRAWING_MODE_MOBILE);break;case c.Cm.combine:o.o.setCommentDrawingMode(s.pwb.MEMO_DRAWING_MODE_COMBINE)}}))};t.ZP=u.reducer},842306:function(e,t,a){a.d(t,{C2:function(){return _},d7:function(){return T},px:function(){return D}});var n=a(426373),i=a(135323),o=a(371266),r=a(311501),l=a(101922),E=a(705233),c=a(625477),s=a(981142),u=(0,n.oM)({name:"ribbonEquationCalculate",initialState:{isDisabled:!1,isDisabledSubmenu:!1},reducers:{},extraReducers:function(e){e.addCase(l.He,(function(e){var t=r.Z.isDisable(o.NFu);e.isDisabled=t,e.isDisabledSubmenu=t}))}}),_=(0,i.P1)((function(e){return e.command.others}),(function(e){return e.ribbonEquationCalculate}));t.ZP=u.reducer;var d=function(e){s.o.sheetSetCalculationMode(e,!0)},D=function(){return(0,c.RU)("initCalculateOptionThunk",(function(){var e=function(){var e=(0,E.le)(E.Fe.SHEET_CALC_MODE_KEY);return e?parseInt(e):s.o.sheetGetCalculationMode().nCalcMode}();d(e)}))},T=function(e){return(0,c.RU)("setCalculateOption",(function(t){d(e),function(e){(0,E.D$)(E.Fe.SHEET_CALC_MODE_KEY,e.toString())}(e)}))}},465055:function(e,t,a){a.d(t,{k8:function(){return E},pl:function(){return s},vc:function(){return c}});var n=a(426373),i=a(135323),o={left:0,top:0,width:0,itemCount:0,selectedIndex:0,titles:[],isShow:!1},r=(0,n.oM)({name:"dataValidationDropdown",initialState:o,reducers:{showDataValidationDropdown:function(e,t){var a=t.payload,n=a.left,i=a.top,o=a.width,r=a.itemCount,l=a.selectedIndex,E=a.titles;e.left=n,e.width=o,e.top=i,e.itemCount=r,e.selectedIndex=l,e.titles=E,e.isShow=!0},hideDataValidationDropdown:function(){return o}}}),l=r.actions,E=l.showDataValidationDropdown,c=l.hideDataValidationDropdown;t.ZP=r.reducer;var s=(0,i.P1)((function(e){return e.dataValidationDropdown}),(function(e){return e}))}}]);