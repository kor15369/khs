"use strict";(self.webpackChunkpolaris_weboffice=self.webpackChunkpolaris_weboffice||[]).push([[544477],{544477:function(e,n,t){t.d(n,{Z:function(){return L}});var i=t(601413),c=t(747313),a=t(494638),o=t(870885),l=t(180252),s=t(700936),r=t(416031),d=t(837490),u=t(260861),h=t(53110),m=t(769071),p=t(448439),x=t(392457),f=t(145729),v=t(748738),b=t(346417);function g(e){var n=e.iconName,i=e.width,a=e.height,l=e.displayType,s=(0,c.useState)(""),r=(0,o.Z)(s,2),u=r[0],m=r[1],p=(0,c.useState)(""),x=(0,o.Z)(p,2),f=x[0],g=x[1],I=(0,v.XM)();(0,c.useEffect)((function(){if(n){t(624099)("./".concat(n)).then((function(e){!0===I.current&&m(e.default)}));var e=(0,h.AN)(n);t(624099)("./".concat(e)).then((function(e){!0===I.current&&g(e.default)}))}}),[n,I]);var Z={backgroundImage:"-webkit-image-set(url(".concat(u,") 1x, url(").concat(f,") 2x)"),width:0===i?"":i,height:0===a?"":a},j="".concat(d.Z.icon," ").concat(d.Z[l]);return(0,b.jsx)("div",{className:j,children:(0,b.jsx)("i",{className:d.Z[l],style:Z})})}function I(e){var n=e.label,t=e.type;return(0,b.jsx)("span",{className:d.Z.label,style:t===x.jt.SubitemTextIcon?{paddingLeft:8,paddingRight:7}:void 0,children:n})}function Z(e){var n=null;switch(e.type){case x.jt.SubitemIconText:case x.jt.SubitemText:case x.jt.SubitemIcon:n=(0,b.jsx)(N,(0,i.Z)({},e));break;case x.jt.SubitemCheckIconText:n=(0,b.jsx)(k,(0,i.Z)({},e));break;case x.jt.SubitemOtherColor:n=(0,b.jsx)(y,(0,i.Z)({},e));break;case x.jt.SubitemTextIcon:n=(0,b.jsx)(C,(0,i.Z)({},e));break;case x.jt.SubitemPicture:n=(0,b.jsx)(j,(0,i.Z)({},e))}return n}function j(e){var n=e.type,t=e.displayType,a=e.largeIcon,o=e.smallIcon,s=e.label,r=e.isActived,h=e.isDisabled,x=e.commandName,f=e.iconWidth,v=e.iconHeight,Z=p.Z.getCommandInstance(x),j=(0,c.useRef)(null),y=(0,l.I0)(),N=(0,c.useCallback)((function(e){var n=j.current,t=e.currentTarget.files,i=t&&t[0];n&&i&&(Z.invoke(i),n.value="",y((0,u.kp)()),m.Z.focus("DocInputField"))}),[Z,y]),k=(0,c.useCallback)((function(e){e.stopPropagation()}),[]),C="".concat(d.Z.icon_box);!h&&r&&(C+=" ".concat(d.Z.active));var S={iconName:o||a,width:f,height:v,displayType:t},w={label:s,type:n};return(0,b.jsx)("div",{className:d.Z.hidden_color_picker,children:(0,b.jsxs)("button",{className:C,children:[(0,b.jsx)(g,(0,i.Z)({},S)),(0,b.jsx)(I,(0,i.Z)({},w)),(0,b.jsx)("input",{ref:j,type:"file",onChange:N,onClick:k,accept:"image/*"})]})})}function y(e){var n=e.type,t=e.displayType,a=e.largeIcon,o=e.smallIcon,s=e.label,u=e.isActived,h=e.isDisabled,m=e.commandName,x=e.iconWidth,v=e.iconHeight,Z=p.Z.getCommandInstance(m),j=Z.storeSelector,y=(0,l.v9)(j||function(){return null}),N=y&&y.currentColor&&"no-color"!==y.currentColor?y.currentColor:"#000000",k=(0,c.useMemo)((function(){return(0,r.debounce)((function(e){Z instanceof f.vD&&Z.selectColor(e)}),300)}),[Z]),C=(0,c.useCallback)((function(e){k(e.currentTarget.value)}),[k]),S=(0,c.useCallback)((function(e){e.stopPropagation()}),[]),w="".concat(d.Z.icon_box);!h&&u&&(w+=" ".concat(d.Z.active));var T={iconName:o||a,width:x,height:v,displayType:t},_={label:s,type:n};return(0,b.jsx)("div",{className:d.Z.hidden_color_picker,children:(0,b.jsxs)("button",{className:w,children:[(0,b.jsx)(g,(0,i.Z)({},T)),(0,b.jsx)(I,(0,i.Z)({},_)),(0,b.jsx)("input",{type:"color",onChange:C,onClick:S,value:N})]})})}function N(e){var n=e.type,t=e.displayType,a=e.largeIcon,o=e.smallIcon,l=e.label,s=e.hasSubmenus,r=e.isActived,u=e.isDisabled,h=e.iconWidth,m=e.iconHeight,p=n!==x.jt.SubitemText,f="".concat(d.Z.icon_box);!u&&r&&(f+=" ".concat(d.Z.active)),s&&(f+=" ".concat(d.Z.has_sub));var v={iconName:o||a,width:h,height:m,displayType:t},Z={label:l,type:n};return(0,b.jsx)(c.Fragment,{children:(0,b.jsxs)("button",{className:f,children:[p?(0,b.jsx)(g,(0,i.Z)({},v)):null,""===l?null:(0,b.jsx)(I,(0,i.Z)({},Z))]})})}function k(e){var n=e.type,t=e.displayType,a=e.label,o=e.isActived,l=e.iconWidth,s=e.iconHeight,r="".concat(d.Z.icon_box),u={iconName:"ctr_check.png",width:l,height:s,displayType:t},h={label:a,type:n};return(0,b.jsx)(c.Fragment,{children:(0,b.jsxs)("button",{className:r,children:[o?(0,b.jsx)(g,(0,i.Z)({},u)):null,""===a?null:(0,b.jsx)(I,(0,i.Z)({},h))]})})}function C(e){var n=e.type,t=e.largeIcon,a=e.smallIcon,o=e.displayType,l=e.label,s=e.hasSubmenus,r=e.isActived,u=e.isDisabled,h=e.iconWidth,m=e.iconHeight,p="".concat(d.Z.icon_box);!u&&r&&(p+=" ".concat(d.Z.active)),s&&(p+=" ".concat(d.Z.has_sub));var x={iconName:a||t,width:h,height:m,displayType:o},f={label:l,type:n};return(0,b.jsx)(c.Fragment,{children:(0,b.jsxs)("button",{className:p,children:[(0,b.jsx)(I,(0,i.Z)({},f)),(0,b.jsx)(g,(0,i.Z)({},x))]})})}var S=function(e){var n=e.unitId,t=e.dropdownUnitId,a=e.commandName,o=e.parentUnitId,f=e.displayType,v=e.hasDivider,g=e.currentIndex,I=e.isActived,j=e.label,y=(0,c.useRef)(null),N=p.Z.getCommandInstance(a),k=N.storeSelector,C=t.length>0,S=(0,l.I0)(),w=(0,l.v9)(u.vd),T=w.isShow,_=w.menuList,D=(0,l.v9)(k||function(){return null}),L=!!D&&D.isDisabled,A=!!D&&D.isHidden,H=D?D.dynamicLabelResId:void 0,U=D?D.dynamicLargeIconResName:void 0,M=D?D.dynamicSmallIconResName:void 0,W=!!D&&D.currentIndex===g,F=(0,r.findIndex)(_,(function(e){return e.id===o}));F<0&&(F=_.length);var R=(0,c.useMemo)((function(){return I||W||C&&T&&(0,r.some)(_,["id",t])}),[I,W,C,T,_,t]),E=(0,s.Z)().formatMessage,P=j?E({id:j}):"",G=H?E({id:H}):"",O=(0,c.useCallback)((function(){L||(N.invoke({currentIndex:g,unitId:n,currentValue:P}),S((0,u.kp)()),m.Z.focus("DocInputField"))}),[L,N,g,n,P,S]),X=(0,c.useCallback)((function(){if(!L){var e=y.current;if(e){!function(){var n=h.UL.getAppBoundingClientRect(e),i=n.top,c=n.right;S((0,u.SP)({id:t,commandName:a,top:i,left:c,depth:F+1}))}()}}}),[L,S,t,a,F]);if(A)return null;var z=(0,i.Z)((0,i.Z)({},e),{},{largeIcon:U||e.largeIcon,smallIcon:M||e.smallIcon,label:G||P,hasSubMenus:C,isActived:R,isDisabled:L}),B="".concat(C?d.Z.has_sub:"");return L&&(B+=" ".concat(d.Z.disabled)),f===x.np.Large&&(B+=" ".concat(d.Z.large)),v&&(B+=" ".concat(d.Z.sub_divider)),(0,b.jsx)(c.Fragment,{children:(0,b.jsx)("li",{ref:y,className:B,onClick:C?X:O,children:(0,b.jsx)(Z,(0,i.Z)({},z))})})};function w(e){var n=e.label,t=(0,s.Z)().formatMessage;return(0,b.jsx)("span",{className:d.Z.label,children:t({id:n})})}function T(e){var n=e.iconName,i=e.iconWidth,a=e.iconHeight,l=e.iconLabel,r=(0,s.Z)().formatMessage,u=(0,c.useState)(""),m=(0,o.Z)(u,2),p=m[0],x=m[1],f=(0,c.useState)(""),g=(0,o.Z)(f,2),I=g[0],Z=g[1],j=(0,v.XM)(),y=/([^\s]+(?=\.(png))\.\2)/.exec(n),N=/(blob):(http|https):\/\/([\w+?\\.\w+])+([a-zA-Z0-9\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)_\-\\=\\+\\\\/\\?\\.\\:\\;\\'\\,]*)?/.exec(n);(0,c.useEffect)((function(){if(y){t(624099)("./".concat(n)).then((function(e){!0===j.current&&x(e.default)}));var e=(0,h.AN)(n);t(624099)("./".concat(e)).then((function(e){!0===j.current&&Z(e.default)}))}else if(N)x(n);else{var i=r({id:n,defaultMessage:n});x(i)}}),[r,n,N,y,j]);var k={display:"flex",width:"".concat(i,"px"),height:"".concat(a,"px")};l.length>0&&(k.display="block");var C={width:"".concat(i-4,"px"),height:"".concat(a-4,"px")},S=(0,c.useCallback)((function(){N&&URL.revokeObjectURL(n)}),[n,N]);return(0,b.jsxs)("div",{className:d.Z.icon,style:k,children:[y||N?(0,b.jsx)("img",{src:p,alt:"",style:C,onLoad:S,srcSet:"".concat(p," 1x, ").concat(I," 2x")}):(0,b.jsx)("span",{children:p}),l.length>0?(0,b.jsx)(w,{label:l}):null]})}function _(e){var n=e.commandName,t=e.sectionIndex,a=e.currentIndex,o=e.iconName,s=e.iconWidth,r=e.iconHeight,h=e.iconLabel,x=p.Z.getCommandInstance(n),f=(0,l.v9)(x.storeSelector?x.storeSelector:function(){return null}),v=void 0!==(null===f||void 0===f?void 0:f.selectedSectionIndex)?f.selectedSectionIndex:0,g=void 0!==(null===f||void 0===f?void 0:f.selectedIndex)?f.selectedIndex:-1,I=(0,l.I0)(),Z=(0,c.useCallback)((function(){var e={sectionIndex:t,itemIndex:a};x.invoke(e),I((0,u.kp)()),m.Z.focus("DocInputField")}),[t,a,x,I]),j={iconName:o,iconWidth:s,iconHeight:r,iconLabel:h},y=v===t&&g===a?d.Z.active:"";return(0,b.jsx)(c.Fragment,{children:(0,b.jsx)("button",{className:y,onClick:Z,children:(0,b.jsx)(T,(0,i.Z)({},j))})})}var D=function(e){var n=(0,s.Z)().formatMessage,t=e.unitId,l=e.currentIndex,r=a.M.getDropdownUnitConfig(e.unitId),u=(0,c.useState)([]),h=(0,o.Z)(u,2),m=h[0],x=h[1],v=r&&r.title||"",g=r&&r.commandName||"",I=r&&r.iconWidth||0,Z=r&&r.iconHeight||0,j=r&&r.gridIconLabels?r.gridIconLabels:null,y=p.Z.getCommandInstance(g||"");return(0,c.useEffect)((function(){y instanceof f.Zp&&y.loadGridIcons().then((function(e){e.length>0&&x(e)})),r&&x(r.gridIcons)}),[y,r,t]),m.length<1?null:(0,b.jsxs)(c.Fragment,{children:[v?(0,b.jsx)("strong",{className:d.Z.sub_tit,children:(0,b.jsx)("span",{children:n({id:v})})}):null,(0,b.jsx)("div",{className:d.Z.icon_list,children:m.map((function(e,n){var c={unitId:t,commandName:g,iconName:e,sectionIndex:l,currentIndex:n,iconWidth:I,iconHeight:Z,iconLabel:j?j[n]:""};return(0,b.jsx)(_,(0,i.Z)({},c),n)}))})]})};function L(e){var n=e.unitList,t=e.parentUnitId;return(0,b.jsx)(c.Fragment,{children:(0,b.jsx)("ul",{children:n.map((function(e,n){var o=e.itemUnitId,l=e.displayType,s=e.innerType,r=e.isActivate,d=a.M.getDropdownUnitConfig(o),u=null;if(d)if(s===x.eE.Grid){var h={unitId:d.unitId,parentUnitId:t,currentIndex:n};u=(0,b.jsx)(D,(0,i.Z)({},h))}else{var m={unitId:d.unitId,commandName:d.commandName,label:d.title,largeIcon:d.large,smallIcon:d.small,type:d.type,displayType:l,hasDivider:!!e.hasDivider&&e.hasDivider,parentUnitId:t,currentIndex:n,iconWidth:d.iconWidth,iconHeight:d.iconHeight,dropdownUnitId:d.dropdownUnitId,isActived:r};u=(0,b.jsx)(S,(0,i.Z)({},m))}return(0,b.jsx)(c.Fragment,{children:u},n)}))})})}}}]);