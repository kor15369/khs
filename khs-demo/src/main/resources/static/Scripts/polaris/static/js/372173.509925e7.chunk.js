"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[372173],{827611:function(e,r,n){n.d(r,{Z:function(){return i}});n(747313);var a=n(837490),t=n(307360),o=n(346417);function i(e){var r=e.buttonLabels,n=e.onClick,i=e.buttonDisableStates;return(0,o.jsx)("div",{className:a.Z.popup_btn_wrap,children:r.map((function(e,r){var s=!!i&&i[r];return(0,o.jsx)("button",{className:"".concat(a.Z.p_btn," ").concat(a.Z.normal),onClick:function(){return n(r)},disabled:s,children:(0,o.jsx)(t.Z,{label:e})},r)}))})}},372173:function(e,r,n){n.r(r),n.d(r,{default:function(){return E}});var a=n(601413),t=n(747313),o=n(180252),i=n(700936),s=n(837490),_=n(407604),l=n(827611),c=n(995124),u=n(588567),D=n(981142),d=n(735622),A=n(346417);function E(e){var r,n=(0,i.Z)().formatMessage,E=e.dialogIndex,S=e.tabs,b=e.dialogId,f=S[0].buttons,p=(0,o.v9)((0,_.R1)(E)).dataValidationState,I=p&&p.errorStyle,V=p&&p.errorMessage,T=(0,t.useMemo)((function(){var e="";return e=V&&V.length>0?V:n({id:"IDS_MSG_DATA_VALIDATION_MSG_ERROR_ENTER_DEFAULT"}),I===u.FEq.eDV_warning&&(e+=n({id:"IDS_MSG_DATA_VALIDATION_MSG_ERROR_ENTER_DEFAULT_WARRING"})),e}),[n,V,I]),h={buttonLabels:f,onClick:(0,t.useCallback)((function(e){switch(b){case c.O.SHEET_DATA_VALIDATION_INFORMATION:var r;0===e?r=u.n9C.eDV_ErrorStyle_Information_Ok:1===e&&(r=u.n9C.eDV_ErrorStyle_Information_Cancel),void 0!==r&&D.o.sheetDataValidationAnswerError(r);break;case c.O.SHEET_DATA_VALIDATION_WARRING:var n;0===e?n=u.n9C.eDV_ErrorStyle_Warning_Yes:1===e?n=u.n9C.eDV_ErrorStyle_Warning_No:2===e&&(n=u.n9C.eDV_ErrorStyle_Warning_Cancel),void 0!==n&&D.o.sheetDataValidationAnswerError(n);break;case c.O.SHEET_DATA_VALIDATION_STOP:var a;0===e?a=u.n9C.eDV_ErrorStyle_Stop_Re:1===e&&(a=u.n9C.eDV_ErrorStyle_Stop_Cancel),void 0!==a&&D.o.sheetDataValidationAnswerError(a)}d.Z.hideDialog(b)}),[b])};switch(I){case u.FEq.eDV_information:r=s.Z.information;break;case u.FEq.eDV_warning:r=s.Z.warring;break;case u.FEq.eDV_stop:r=s.Z.stop}return(0,A.jsxs)(t.Fragment,{children:[(0,A.jsx)("div",{className:s.Z.popup_contents,children:(0,A.jsx)("div",{className:r,children:(0,A.jsx)("p",{style:{whiteSpace:"pre-wrap"},children:T})})}),(0,A.jsx)(l.Z,(0,a.Z)({},h))]})}}}]);