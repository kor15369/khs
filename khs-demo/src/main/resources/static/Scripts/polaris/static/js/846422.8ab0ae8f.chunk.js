"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[846422],{846422:function(e,n,o){o.r(n),o.d(n,{default:function(){return _}});var t=o(747313),c=o(837490),a=o(307360),r=o(735622),i=o(780386),s=o(588567),l=o(625477),u=o(237683),d=o(981142),m=o(361688),f=o(628264),h=o(159366),p=o(459551),Z=o(53110),b=o(652928),x=o(346417);function _(e){e.dialogIndex;var n=e.dialogId,o=(e.tabs,function(e,n){return new Promise((function(o,t){var c=(0,h.mD)(e);u.Z.setListener("onOpenComplete",(function(){(0,l.Ce)((0,p.RY)(e)),(0,l.Ce)((0,p.Js)(c)),o(),u.Z.removeListener("onOpenComplete")})),u.Z.setListener("onLoadFail",(function(n){(0,l.Ce)((0,p.RY)(e)),(0,l.Ce)((0,p.Js)(c)),t({message:"Loading failed '".concat(e,"'."),errorCode:n,closeDialog:new Promise((function(e){u.Z.setListener("onCancelOpenDocument",(function(){e(),u.Z.removeListener("onCancelOpenDocument")}))}))}),u.Z.removeListener("onLoadFail")}));var a=new FileReader;a.onload=function(){a.readyState===FileReader.DONE&&a.result instanceof ArrayBuffer&&function(e){"hwpx"===c?i.Z.setOpenMode(s.ekp.ePRM_READ_ONLY_RECOMMENDED_READONLY):i.Z.setOpenMode(s.ekp.ePRM_COMMON),i.Z.setDocData(n,c);var o=(0,l.qm)(m.LG),t=(0,l.qm)(m.CI);(0,Z.Vq)()?d.o.memoryOpenForViewerSDK(".".concat(c),e,e.byteLength,o.width*t,o.height*t):d.o.memoryOpen(".".concat(c),e,e.byteLength,o.width*t,o.height*t),(0,l.Ce)((0,f._j)(!1))}(a.result)};var r=function(e){t({message:e,errorCode:-1,closeDialog:new Promise((function(e){u.Z.setListener("onCancelOpenDocument",(function(){e(),u.Z.removeListener("onCancelOpenDocument")}))}))})};a.onabort=function(){r("Reading the file is aborted. '".concat(a.error,"'."))},a.onerror=function(){r("Failed to read file. '".concat(a.error,"'."))},a.readAsArrayBuffer(n)}))}),_=(0,t.useCallback)((function(){r.Z.clickButton(n,0),r.Z.hideDialog(n)}),[n]),D=(0,t.useCallback)((function(){new Promise((function(e,n){var o=(0,l.qm)(p.hz),t=o.extension,c=o.docName;u.Z.setListener("onSaveDocument",(function(o,a){if(o===s.WbN.kPoProcessSucess&&a)if("hwpx"===t){var r="".concat(c.replace(new RegExp(".".concat(t,"$")),".hwp"));e({name:r,blob:a})}else e({name:c,blob:a});else n(new Error("Error ".concat(o)));u.Z.removeListener("onSaveDocument")}));var a=t;"hwpx"===t&&(a="hwp"),d.o.saveDocument(a)})).then((function(e){o(e.name,e.blob).then((function(){(0,l.Ce)((0,f.nk)(b.wO.edit))}))})),r.Z.clickButton(n,0),r.Z.hideDialog(n)}),[n]);return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:c.Z.popup_contents,children:[(0,x.jsx)("div",{className:"".concat(c.Z.flex_box," ").concat(c.Z.col),children:(0,x.jsx)("div",{className:"".concat(c.Z.inner_box),children:(0,x.jsx)("p",{className:c.Z.info_txt,children:(0,x.jsx)(a.Z,{label:"IDS_MSG_HWPX_READONLLY"})})})}),(0,x.jsx)("div",{className:"".concat(c.Z.flex_box),children:(0,x.jsx)("div",{className:"".concat(c.Z.inner_box),children:(0,x.jsxs)("div",{className:"".concat(c.Z.btn_wrap," ").concat(c.Z.horizontal),style:{marginTop:"15px"},children:[(0,x.jsx)("button",{className:c.Z.btn,onClick:_,children:(0,x.jsx)("span",{children:(0,x.jsx)(a.Z,{label:"IDS_MSG_HWPX_READONLLY_OPEN"})})}),(0,x.jsx)("button",{className:c.Z.btn,onClick:D,children:(0,x.jsx)("span",{children:(0,x.jsx)(a.Z,{label:"IDS_MSG_HWPX_READONLLY_CONVERT_HWP"})})})]})})})]})})}}}]);