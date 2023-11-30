/*
화면명 : 랜딩페이지_브릿지_팝업_나의할일
화면ID : LandingBridgePopMyWorkLaylncl
작성일 : 2022.12.13
작성자 : 강훈성
설명   : 나의 할 일 Layout(최근작업이력, 담당 액티비티, 내 즐겨찾기 Tab 구성)
======================================================================
수정 :
2022.12.13 서비스업그레이드팀 : [SXCSS034-307] [내부SSR] 최초작성
2023.01.20 서비스업그레이드팀 : [] [내부SSR] 즐겨찾기 컬럼 추가
=======================================================================
*/

const oMyWork = {
   
   openDailog() {
      
      $("#landing_bridge_pop_my_work_area").dialog(
      {
         title: '나의 할 일',
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
            
            let selectedTabIndex = 0;
            oMyWork.getRecentOperationDetailList();
            $("#activity01").val('');
            
            $(this).parent().css('position', 'fixed');
            $("#my_work_tab").tabs({
               active: 0,
               beforeActivate: function( event, ui ) {
                  $("#activity01").val('');
                  selectedTabIndex = ui.newTab.index();
                  switch(selectedTabIndex) {
                     case 0:
                        oMyWork.getRecentOperationDetailList();
                        break;
                     case 1:
                        oMyWork.getChargeProjectList();
                        break;
                     case 2:
                        oMyWork.getMyBookmarkList();
                        break;
                    default:
                        oMyWork.getRecentOperationDetailList();
                  }
               }
            });
            
            $("#activity01").keyup(function() {
               oMyWork.tableFilter(selectedTabIndex, $(this).val());
            });
         },
      });
   },
   
   // 최근작업이력 Tab 조회
   getRecentOperationDetailList() {
      
      CS_ExtensionAPI.CallExtension({
         storedProcName: 'CSP_EXT_ExecuteCommand',
         storedProcParameters: _SetExecQueryParam(['QT_COM_GetRecentOperationDetailList', 20]), // second parameter : [row Count 설정]
         returnData:true
      }, function(aoReturnData) {
         let sHtmlRows = '';
         if(aoReturnData !== undefined && aoReturnData.length > 0) {
            for(let i=0; i<aoReturnData.length; i++) {
               sHtmlRows +=   `<tr>
                                 <td class="align_left"><span class="shortening"><a href="/?P=PH&PID=${aoReturnData[i].ProjectId}" target="_blank">${aoReturnData[i].ProjectName}</a></span></td>
                                 <td class="align_left"><span class="shortening"><a href="javascript:void(0)" onclick="stageTaskDetailDialog(\'/Project/StageTaskDetails?${aoReturnData[i].QueryString}\')">${aoReturnData[i].DeliverableName}</a></span></td>
                                 <td>${aoReturnData[i].UpdatedDate}</td>
                                 <td>
                                    <span class="bookmark ${aoReturnData[i].RegistrationStatus}" data-deliverableId="${aoReturnData[i].DeliverableID}" onclick="oMyWork.setDeliverableBookmark(this)"></span>
                                 </td>
                              </tr>`;
            }
         }
         
         $('#project01').find('table > tbody').html(sHtmlRows);   
      });
   },
   
   // 담당 액티비티 Tab 조회
   getChargeProjectList() {
      
      CS_ExtensionAPI.CallExtension({
         storedProcName: 'CSP_EXT_ExecuteCommand',
         storedProcParameters: _SetExecQueryParam(['QT_COM_GetChargeProjectList', 100]), // second parameter : [row Count 설정]
         returnData:true
      }, function(aoReturnData) {
         let sHtmlRows = '';
         if(aoReturnData !== undefined && aoReturnData.length > 0) {
            for(let i=0; i<aoReturnData.length; i++) {
               sHtmlRows +=   `<tr>
                                <td class="align_left"><span class="shortening"><a href="/?P=PH&PID=${aoReturnData[i].ProjectId}" target="_blank">${aoReturnData[i].ProjectName}</a></span></td>
                                <td class="align_left"><span class="shortening"><a href="javascript:void(0)" onclick="stageTaskDetailDialog(\'/Project/StageTaskDetails?${aoReturnData[i].QueryString}\')">${aoReturnData[i].DeliverableName}</a></span></td>
                                <td>${aoReturnData[i].OwnerUpdatedDate}</td>
                              </tr>`; 
            }
         }
         
         $('#project02').find('table > tbody').html(sHtmlRows);
      });
   },
   
   // 내 즐겨찾기 Tab 조회
   getMyBookmarkList() {
      
      CS_ExtensionAPI.CallExtension({
         storedProcName: 'CSP_EXT_ExecuteCommand',
         storedProcParameters: _SetExecQueryParam(['QT_COM_GetMyBookmarkList', 100]), // second parameter : [row Count 설정]
         returnData:true
      }, function(aoReturnData) {
         let sHtmlRows = '';
         if(aoReturnData !== undefined && aoReturnData.length > 0) {
            for(let i=0; i<aoReturnData.length; i++) {
               sHtmlRows +=   `<tr>
                                 <td class="align_left"><span class="shortening"><a href="/?P=PH&PID=${aoReturnData[i].ProjectId}" target="_blank">${aoReturnData[i].ProjectName}</a></span></td>
                                 <td class="align_left"><span class="shortening"><a href="javascript:void(0)" onclick="stageTaskDetailDialog(\'/Project/StageTaskDetails?${aoReturnData[i].QueryString}\')">${aoReturnData[i].DeliverableName}</a></span></td>
                              </tr>`;
            }
         }
         
         $('#project03').find('table > tbody').html(sHtmlRows);
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
         storedProcParameters: [sDeliverable, 1], // 2023.01.20 [] [내부SSR] 즐겨찾기 컬럼 추가
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
            chgClassProperty();
         }
         if(oThis.parents('div').eq(1).attr('id') === 'project03'){
            oMyWork.getMyBookmarkList();
         }
      });
      
      function chgClassProperty() {
         if(oThis.hasClass('booked')) {
            oThis.removeClass('booked').addClass('notbooked');
         } else {
            oThis.removeClass('notbooked').addClass('booked');
         }
      }
   },
   
   // 검색어 처리
   tableFilter(selectedTabIndex, searchText) {
      let $tbody = '';
      switch(selectedTabIndex) {
         case 0:
            $tbody = $('#project01').find('table > tbody');
            break;
         case 1:
            $tbody = $('#project02').find('table > tbody');
            break;
         case 2:
            $tbody = $('#project03').find('table > tbody');
            break;
      }
      
      let rows = $tbody.find('tr');
      
      for(let i=0; i<rows.length; i++) {
         let isDisplay = false;
         
         for(let j=0; j<$(rows[i]).find('td').length; j++) {
            let cell = $(rows[i]).find('td')[j];
            txtValue = cell.textContent || cell.innerText;
            if (txtValue.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
               isDisplay = true;
               break;
            }
         }
         
         if(isDisplay) {
            rows[i].style.display = ""; 
         } else{
            rows[i].style.display = "none";
         }
      }
   }
}