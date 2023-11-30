/*
화면명 : 랜딩페이지_브릿지_팝업_외부 사이트 조회
화면ID : LandingBridgePopExternalUrlLaylncl
작성일 : 2023.02.09
작성자 : 강훈성
설명   : 외부 사이트 조회 팝업 Layout
======================================================================
수정 :
2023.02.09 강훈성 : [IT200061-49064] 최초작성
=======================================================================
*/

const oExternalUrlPop = {
   // Combo Filter Array
   uniqueFilterData: [],
   
   // 기준정보 중 사용할 항목 정의 (Selectbox)
   aItem: [
      {name: "카테고리", target: $("#cboCategory")},
      {name: "발행주체", target: $("#cboAgent")},
      {name: "유/무료", target: $("#cboCharge")},
      {name: "언어", target: $("#cboLanguage")}
   ],
   
   openDailog() {
      $("#landing_bridge_pop_external_url_area").dialog({
         title: '외부 사이트 조회',
         autoOpen: true,
         resizable: true,
         height: window.innerHeight * 0.70,
         width: window.innerWidth * 0.70,         
         dialogClass: 'dialog-full-button-row',
         modal: true,
         position: {
            my: "center", at: "center" , of: window 
         },
         buttons: [
            {
               id: "cancelPopupButton",
               text: "닫기",
               'class': 'float-right-only',
               click: function () {
                  $(this).dialog("close");
                  $(this).hide();
               }
            }
         ],
         close: function () {
            
         },
         open: function () {
            $("#externalUrlSearch").val('');
            $(this).parent().css('position', 'fixed');
            $("#externalUrlSearch").keyup(function() {
               oExternalUrlPop.tableFilter($(this).val());
            });
            
            oExternalUrlPop.getExternalUrList();
            oExternalUrlPop.addComboFilter();
         }
      });
   },
   
   // 외부 사이트 조회 
   getExternalUrList() {
      // 사용자 정보의 extendedFields API 호출
      const sExtendedFields = '/api/v2/administration/users/GetRequestorInfo?$expand=ExtendedFields,AccessGroups&$select=AccessGroups/Id,AccessGroups/AccessLevel,ExtendedFields/DataType,ExtendedFields/Name,ExtendedFields/Value';
      $.get(sExtendedFields).done(function (oUserInfo) {
         let sUserDepartmentExtValue = '';
         let sUserCompanyExtValue = '';
         
         if (oUserInfo != undefined) {
            if (oUserInfo.extendedFields != undefined && oUserInfo.extendedFields.length > 0) {
               let aoDepartment = $.grep(oUserInfo.extendedFields, function (oUserExtDetails) {
                  return oUserExtDetails.dataType === "List" && oUserExtDetails.name === "Division";
               });
               
               if (aoDepartment != undefined && aoDepartment.length > 0) {
                  sUserDepartmentExtValue = aoDepartment[0].value;
               }
               
               let aoCompany = $.grep(oUserInfo.extendedFields, function (oUserExtDetails) {
                  return oUserExtDetails.dataType === "List" && oUserExtDetails.name === "Company";
               });
               
               if (aoCompany != undefined && aoCompany.length > 0) {
                  sUserCompanyExtValue = aoCompany[0].value;
               }
               
               // '외부 사이트 조회' 화면에서 사용되는 기준정보 항목 조회 후 Selectbox option Set (카테고리, 발행주체, 유/무료, 언어)
               CS_ExtensionAPI.CallExtension({
                  storedProcName: 'CSP_EXT_ExecuteCommand',
                  storedProcParameters: _SetExecQueryParam(['QT_COM_GetCodeInfoByItem', sUserCompanyExtValue, 'EXTERNAL_SITE_ITEM_LV2', '']),
                  returnData: true,
                  headerFormat: CS_ExtensionAPI.nameCases.CAMEL 
               }, function(aoRefData) {
                     if(aoRefData !== undefined && aoRefData.length > 0) {
                        for(let i=0; i<oExternalUrlPop.aItem.length; i++) {
                           oExternalUrlPop.aItem[i].target.empty(); // 초기화
                           oExternalUrlPop.aItem[i].target.append($('<option>', {value: '', text : '전체'})); // 빈값 push
                           aoRefData.forEach(function(item){
                              if(item.parentDisplayName === oExternalUrlPop.aItem[i].name) {
                                 oExternalUrlPop.aItem[i].target.append($('<option>', {value: item.displayName, text : item.displayName}));   
                              }
                           });
                        }
                     }
               });
               
               CS_ExtensionAPI.CallExtension({
                  storedProcName: 'CSP_EXT_ExecuteCommand',
                  storedProcParameters: _SetExecQueryParam(['QT_COM_GetExternalUrlPopList', sUserCompanyExtValue, sUserDepartmentExtValue]),
                  returnData:true
               }, function(aoReturnData) {
                  let sHtmlRows = '';
                  let sMessage = '';
                  
                  if(aoReturnData !== undefined && aoReturnData.length > 0) {
                     if (aoReturnData[0].ExtensionError != undefined && aoReturnData[0].ExtensionError.length > 0) {
                        sMessage = aoReturnData[0].ExtensionError; //This is an error from SQL or Extensions API
                        console.log(`Error Message : ${sMessage}`);
                     } else {
                        for(let i=0; i<aoReturnData.length; i++) {
                        
                           let sUrl = aoReturnData[i].siteUrl;
                           // url에 protocol 정보 미존재 시 Add
                           if(!/^(http:|https)/i.test(sUrl)) {
                              sUrl = "http://" + sUrl;
                           }
                           
                           if(aoReturnData[i].lev == 0) continue;
                           sHtmlRows +=   `<tr>
                                             <td class="align_left">
                                                <a href="${sUrl}" target="_blank">${aoReturnData[i].masterName}</a>
                                             </td>
                                             <td class="align_left">${aoReturnData[i].description}</td>
                                             <td class="align_left">
                                                <a href="${sUrl}" target="_blank">${aoReturnData[i].siteUrl}</a>
                                             </td>
                                             <td class="align_left">${aoReturnData[i].categoryName}</td>
                                             <td>${aoReturnData[i].mainAgentName}</td>
                                             <td>${aoReturnData[i].chargeName}</td>
                                             <td>${aoReturnData[i].languageName}</td>
                                             <td>
                                                <span class="bookmark ${aoReturnData[i].registrationStatus}" data-deliverableId="${aoReturnData[i].code}" onclick="oExternalUrlPop.setDeliverableBookmark(this)"></span>
                                             </td>
                                          </tr>`;
                        }
                        $('#externalUrlList').find('table > tbody:last').html(sHtmlRows);
                     }
                  }
               });
            }
         }
      });    
   },
   
   // 즐겨찾기 추가/삭제 처리
   setDeliverableBookmark(obj) {
      const oThis = $(obj);
      const sDeliverable = oThis.attr('data-deliverableId');
      const sSPName = (oThis.hasClass('booked')) ? 'CSP_EXT_DELETE_DELIVERABLE_BOOKMARK' : 'CSP_EXT_CREATE_DELIVERABLE_BOOKMARK';
      
      CS_ExtensionAPI.CallExtension({
         debug: false,
         storedProcName: sSPName,
         storedProcParameters: [sDeliverable, 2],
         useTransaction: true,
         returnData: true,
         dataFormat: CS_ExtensionAPI.dataFormats.ARRAY_2D,
      }, function(aoReturnMessage) {
         if (aoReturnMessage !== undefined && aoReturnMessage.length > 0) {
            let sMessage;
            if (aoReturnMessage[0].ExtensionError !== undefined && aoReturnMessage[0].ExtensionError.length > 0) {
               sMessage = aoReturnMessage[0].ExtensionError; //This is an error from SQL or Extensions API
            } else {
               sMessage = aoReturnMessage[0]; //This would return if the file you select isn't a related file on the project
            }
            console.log('ExtensionAPI Error Message : ', sMessage);
         } else {
            oThis.toggleClass("booked");
         }
      });
   },
   
   // 검색어 이벤트
   tableFilter(sSearchText) {
      // SelectBox가 선택된 경우
      if(oExternalUrlPop.uniqueFilterData.length > 0) {
         $("#external_url_wrap select").first().trigger('change'); // SelectBox, 검색어 Multi 필터 처리
         return;
      }
      // Visible Rows 처리
      let rows = $('#externalUrlList').find('table > tbody > tr');
      oExternalUrlPop.setRowsDisplay(rows, sSearchText);
   },
   
   // SelectBox 이벤트 
   addComboFilter() {
      const ohCombos = $("#external_url_wrap select");
      ohCombos.on('change', function() {
         let uniqueData = new Set();
         ohCombos.each(function() {
            let sSelectedData = $(':selected', this).val();
            if(sSelectedData !== '') {
               uniqueData.add(sSelectedData);
            }
         });
         oExternalUrlPop.uniqueFilterData = [...uniqueData];
         
         // first filter : SelectBox를 선택하여 필터를 사용하는 경우
         if(oExternalUrlPop.uniqueFilterData.length > 0) {
            let ohAllRows = $('#externalUrlList').find('table > tbody:last > tr');
            for(let i=0; i<ohAllRows.length; i++) { // tr loop
               let isDisplay = false;
               let nEqualCnt = 0; // SelectBox의 '전체'를 제외한 Selected 수
               
               for(let j=0; j<$(ohAllRows[i]).find('td').length; j++) { // td loop
                  let cell = $(ohAllRows[i]).find('td')[j];
                  txtValue = cell.textContent || cell.innerText;
                  
                  for(let k=0; k<oExternalUrlPop.uniqueFilterData.length; k++) { // td의 Text 값과 선택된 n개 SelectBox 값 비교 loop
                     if(oExternalUrlPop.uniqueFilterData[k] === txtValue) {
                        nEqualCnt++;
                        break;
                     }
                  }
                  
                  if(nEqualCnt === oExternalUrlPop.uniqueFilterData.length) { // n개 SelectBox 선택에 따른 교집합 데이터 Visible 처리
                     isDisplay = true;
                     break;
                  }
               }
               
               if(isDisplay) {
                  $(ohAllRows[i]).show();
               } else{
                  $(ohAllRows[i]).hide();
               }
            }
         } else {
            $('#externalUrlList').find('table > tbody:last > tr').show();
         }
         
         // second filter : 검색어 필터를 사용하는 경우
         const sSearchText = $('#externalUrlSearch').val();
         if(sSearchText !== '') {
            // Visible Rows 처리
            const ohCurrentRows = $('#externalUrlList').find('table > tbody > tr').not(":hidden"); // 현재 Visible Rows
            oExternalUrlPop.setRowsDisplay(ohCurrentRows, sSearchText);
         }
      });
   },
   
   // Visible Rows 처리
   setRowsDisplay(ohRows, sSearchText) {
      const ohCurrRows = ohRows;
      for(let i=0; i<ohCurrRows.length; i++) {
         let isDisplay = false;
         
         for(let j=0; j<$(ohCurrRows[i]).find('td').length; j++) {
            
            if(j === 2 || j === 7) continue; // URL, 즐겨찾기 검색어 기능 제외
            
            let cell = $(ohCurrRows[i]).find('td')[j];
            txtValue = cell.textContent || cell.innerText;
            if (txtValue.toUpperCase().indexOf(sSearchText.toUpperCase()) > -1) {
               isDisplay = true;
               break;
            }
         }
         
         if(isDisplay) {
            $(ohCurrRows[i]).show();
         } else{
            $(ohCurrRows[i]).hide();
         }
      }
   }
}















