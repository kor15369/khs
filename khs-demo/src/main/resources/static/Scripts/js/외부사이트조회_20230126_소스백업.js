/*
화면명 : 랜딩페이지_브릿지_팝업_외부 사이트 조회
화면ID : LandingBridgePopExternalUrlLaylncl
작성일 : 2023.01.03
작성자 : 강훈성
설명   : 외부 사이트 조회 팝업 Layout
======================================================================
수정 :
2023.01.03 서비스업그레이드팀 : [내부SSR] 최초작성
=======================================================================
*/

// 삭제예정
const FILTER_DIALOG_WIDTH = 260;
const FILTER_DIALOG_HEIGHT = 'auto';   
const DIALOG_APPLY_BUTTON_TEXT = 'Apply';
const DIALOG_CANCEL_BUTTON_TEXT = 'Cancel';
const DESELECT_ALL_TEXT = 'Deselect All';
const SELECT_ALL_TEXT = "Select All";
const ICON_FILTER_INACTIVE_CLASS = 'coladvfilters';
const ICON_FILTER_ACTIVE_CLASS = 'coladvfilters_applied';

const oExternalUrlPop = {
   
   // Combo Filter Array
   uniqueFilterData: [],
   
   // 기준정보 중 사용할 항목 정의 (Selectbox)
   aItem: [
      { name: "카테고리", target: $("#cboCategory")},
      { name: "주체", target: $("#cboAgent")},
      { name: "요금", target: $("#cboCharge")},
      { name: "언어", target: $("#cboLanguage")}
   ],
   
   openDailog() {
      $("#landing_bridge_pop_external_url_area").dialog(
      {
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
            oExternalUrlPop.getExternalUrList();
            
            $("#externalUrlSearch").val('');
            $(this).parent().css('position', 'fixed');
            
            $("#externalUrlSearch").keyup(function() {
               oExternalUrlPop.tableFilter($(this).val());
            });
            
            // oExternalUrlPop.addTableFilterButtonEvent(); // 삭제예정
            oExternalUrlPop.addComboFilterEvent();
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
               
               // '외부 사이트 조회' 화면에서 사용되는 기준정보 항목 조회 후 Selectbox option Set (카테고리, 주체, 요금, 언어)
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
                  // storedProcParameters: _SetExecQueryParam(['QT_COM_GetExternalUrlList', sUserCompanyExtValue, sUserDepartmentExtValue, 'Y']),
                  storedProcParameters: _SetExecQueryParam(['QT_COM_GetExternalUrlPopList', sUserCompanyExtValue]),
                  returnData:true
               }, function(aoReturnData) {
                  let sHtmlRows = '';
                  let sMessage = '';
                  
                  if(aoReturnData !== undefined && aoReturnData.length > 0) {
                     if (aoReturnData[0].ExtensionError != undefined && aoReturnData[0].ExtensionError.length > 0) {
                        sMessage = aoReturnData[0].ExtensionError; //This is an error from SQL or Extensions API
                        console.log(`Error Message : ${sMessage}`);
                     } else {
                        //console.log('output : ' +  JSON.parse(JSON.stringify(aoReturnData)));
                        //sMessage = aoReturnData[0]; //This would return if the file you select isn't a related file on the project
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
            chgClassProperty();
         }
         // oExternalUrlPop.getExternalUrList(); 재조회 미처리
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
   tableFilter(sSearchText) {
      
      if(oExternalUrlPop.uniqueFilterData.length > 0) {
         oExternalUrlPop.addComboFilterEvent(); // 선 실행
      }
      
      let $tbody = $('#externalUrlList').find('table > tbody');
      let rows = $tbody.find('tr');
      
      for(let i=0; i<rows.length; i++) {
         let isDisplay = false;
         
         for(let j=0; j<$(rows[i]).find('td').length; j++) {
            let cell = $(rows[i]).find('td')[j];
            txtValue = cell.textContent || cell.innerText;
            if (txtValue.toUpperCase().indexOf(sSearchText.toUpperCase()) > -1) {
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
      /* Array 활용
      rows.each((idx, obj) => {
         rows.eq(idx).hide();
         
         if(Array.from(obj.cells).some(item => item.innerText.toUpperCase().indexOf(sSearchText.toUpperCase()) > -1)) {
            rows.eq(idx).show();
         }
         // 배열의 특정요소와 정확하게 일치해야 되므로 indexOf와 동일하게 사용불가
         // toUpperCase 적용하여 새로운 배열 생성
         // const aData = Array.from(obj.cells).reduce((aUpperCaseData, item) => {
         //   return [...aUpperCaseData, item.innerText.toUpperCase()];
         // }, []);
         
         // Array.includes로 검색어와 비교
         // if(aData.includes(searchText.toUpperCase(), 1)) {
         //   rows.eq(idx).show();
         //}
      });
      */
   },
   
   // SelectBox 이벤트 
   addComboFilterEvent() {
      const ohCbo = $("#external_url_wrap");
      ohCbo.find('select').on('change', function() {
         
         let uniqueData = new Set();
         let ohCboId = $(this).attr('id');
         let ohCboNm = $(this).siblings('label').text();
         
         // 선택된 SelectBox의 Index
         let nIdx = Array.from($("#externalUrlList th"))
            .map(item => $(item).text().trim())
            .findIndex(itemNm => itemNm === ohCboNm);
         
         ohCbo.find('select').each(function (idx, obj) {
            let selectedData = $(obj).find('option:selected').val();
            if(selectedData !== '') {
               uniqueData.add(selectedData);
            }
         });
         
         oExternalUrlPop.uniqueFilterData = [...uniqueData];
         let uniqueFilterData = [...uniqueData];
         let ohAllRows = $('#externalUrlList').find('table > tbody:last > tr');
         
         for(let i=0; i<ohAllRows.length; i++) {
            let isDisplay = false;
            let nEqualCnt = 0;
            
            for(let j=0; j<$(ohAllRows[i]).find('td').length; j++) {
               let cell = $(ohAllRows[i]).find('td')[j];
               txtValue = cell.textContent || cell.innerText;
               
               for(let y=0; y<oExternalUrlPop.uniqueFilterData.length; y++) {
                  if(oExternalUrlPop.uniqueFilterData[y] === txtValue) {
                     nEqualCnt++;
                     break;
                  }
               }
               
               if(nEqualCnt === oExternalUrlPop.uniqueFilterData.length) {
                  isDisplay = true;
                  break;
               }
            }
            
            if(isDisplay) {
               ohAllRows[i].style.display = "";
            } else{
               ohAllRows[i].style.display = "none";
            }
         }
      });
   },
   
   // 필터 이벤트 
   addTableFilterButtonEvent() {
      const ohTH = $("#externalUrlList").find(".sticky-thead01");
      
      ohTH.each(function (index, item) {
         let oHeaderFilterButton = $(item).find('.csTableFilterIcon');
         if(oHeaderFilterButton.length > 0) {
            oHeaderFilterButton.off().on('click', function(e) {                     
                ClickCustomTableFilterButton({
                   headerButton: this,
                   colIndex: index,
                   clickEvent: e,
                   headerTitle: $(item).text()
                });
            });
         }
      });
   }
}

function ClickCustomTableFilterButton(oHeaderInfo) {
   
   let oHeaderFilterButton = oHeaderInfo.headerButton;
   let iColumnIndex = oHeaderInfo.colIndex;
   let oFilterDialog;
   ////let sFilterName = 'TableFilter' + oTable.systemName + 'ColumnIndex' + iColumnIndex;
   let sFilterName = 'TableFilter' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex;
   let sToggleCheckedOptions = DESELECT_ALL_TEXT;
   
   ////let oHTMLTable = oMainTable.find('.csTableTableSelector');
   let oHTMLTable = $("#externalUrlList").find('.csTableTableSelector');
   let oTableBody = oHTMLTable.find('tbody');
   
   let oClickEvent = oHeaderInfo.clickEvent;
   ////console.log('oClickEvent: ', oClickEvent);

   if($('#' + sFilterName).is(":visible")) {
      return;
   }
 
   if($('#' + sFilterName).length == 0) {
      oFilterDialog = $(oHeaderFilterButton).siblings('.csColumnFilterSelector'); // 형제요소
      oFilterDialog.attr('id', sFilterName);
      ////let sColumnName = $(oHeaderFilterButton).siblings('.headerDisplayName').text();
      let sColumnName = oHeaderInfo.headerTitle;
      ////oFilterDialog.attr('title', LANGUAGES.CS_Tables_FilterColumn + ' ' + sColumnName);
      oFilterDialog.attr('title', '컬럼 필터 :' + ' ' + sColumnName);
   } else {
      oFilterDialog = $('#' + sFilterName);
   }
   
   let oFilterTable = oFilterDialog.find('.csTableFilterTable');
   let oFilterTableBody = oFilterTable.find('tbody');
   let oFilterSearchInput = oFilterDialog.find('.csTableFilterSearchInput');
   
   oFilterTableBody.find('.TableFilterRow').remove();
   
   ////var sUndefinedReplacement = oTable.undefinedReplacement == undefined ? '' : oTable.undefinedReplacement;
   var sUndefinedReplacement = '';
   
   ////let sNullValue = sUndefinedReplacement == undefined || sUndefinedReplacement == '' ? NO_VALUE : sUndefinedReplacement;
   let sNullValue = sUndefinedReplacement == undefined || sUndefinedReplacement == '' ? '(No Value)' : sUndefinedReplacement;
   
   //Compares against full source data to build excel like filter options
   //Loops through each filter option and breaks if hits current index
   ////let aTempFilteredData = JSON.parse(JSON.stringify(oTable.processedData));

   ////
   //if(oFilterOptions != undefined && oFilterOptions.columnFilters != undefined) {
   //for (var sFilterPropertyName in oFilterOptions.columnFilters) {
   //    let iColumnFilterIndex = $.isNumeric(sFilterPropertyName) ? sFilterPropertyName : oTable.columnNameMap.bySystemName[sFilterPropertyName];
   //    aTempFilteredData = aTempFilteredData.filter(function (aRow, iIndex) {
   //       let sCellValue = aRow.rowData[iColumnFilterIndex]; //Check if the filter column has html and if it does get the text instead of the full html string
   //       sCellValue = sCellValue != undefined && oTable.columnSettingsMap != undefined && oTable.columnSettingsMap[sFilterPropertyName] != undefined && oTable.columnSettingsMap[sFilterPropertyName].displayValuesMap != undefined && oTable.columnSettingsMap[sFilterPropertyName].displayValuesMap[sCellValue.toString().toLowerCase()] != undefined ? oTable.columnSettingsMap[sFilterPropertyName].displayValuesMap[sCellValue.toString().toLowerCase()] : sCellValue;
   //       return (iColumnIndex * 1) == (iColumnFilterIndex * 1) ? true : oFilterOptions.columnFilters[sFilterPropertyName].some(value => value == sCellValue) ? true : false;
   //    });
   //    if((iColumnIndex * 1) == (iColumnFilterIndex * 1)) {
   //       break;
   //    }
   //}
   //}

   ////
   // let aFilterValues = aTempFilteredData.map(function (aRow, iIndex) {
   //    return aRow.rowData[iColumnIndex];
   // }).filter(function (sValue, iIndex, aSelf) {
   //    return aSelf.indexOf(sValue) == iIndex;
   // });
   
   // 중복 제거된 필터 Data
   let $tbody = $('#externalUrlList').find('table > tbody:last > tr');
   let uniqueFilterData = new Set();
   $tbody.each((index, item) => {
      const itemText = $(item).find('td').eq(iColumnIndex).text();
      uniqueFilterData.add(itemText);
   });
   
   let aFilterValues = [...uniqueFilterData];
   console.log(`aFilterValues : ${aFilterValues}`);
   aFilterValues.sort(new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
   }).compare);
   
   // Add undefined values
   if(aFilterValues.indexOf(undefined) > -1) {
      aFilterValues.splice(aFilterValues.indexOf(undefined), 1);
      aFilterValues.unshift(sNullValue);
   } else if(aFilterValues.indexOf('') > -1) {
      aFilterValues.splice(aFilterValues.indexOf(''), 1);
      aFilterValues.unshift(sNullValue);
   } else if(aFilterValues.indexOf(null) > -1) {
      aFilterValues.splice(aFilterValues.indexOf(null), 1);
      aFilterValues.unshift(sNullValue);
   }
   
   ////let oColumnSettings = oTable.columnSettings[iColumnIndex];
   for (let i = 0; i < aFilterValues.length; i++) {
      let sFilterValue = aFilterValues[i];
      ////if(sFilterValue != undefined && oColumnSettings != undefined && oColumnSettings.displayValuesMap != undefined && oColumnSettings.displayValuesMap[sFilterValue.toString().toLowerCase()] != undefined) {
      ////    sFilterValue = oColumnSettings.displayValuesMap[sFilterValue.toString().toLowerCase()];
      ////}
   
      let oClonedRow = oFilterTable.find('.templateFilterDialogRow').clone();
      oClonedRow.removeClass('templateFilterDialogRow');
      oClonedRow.addClass('TableFilterRow');
      oClonedRow.find('.csTableFilterText').text(sFilterValue);
      let sToggleCheckedOptions = DESELECT_ALL_TEXT;
      
      //// 
      // if(oFilterOptions != undefined && oFilterOptions.columnFilters != undefined && oFilterOptions.columnFilters[iColumnIndex] != undefined) {
      //     let oCheckbox = oClonedRow.find('.csTableFilterCheckbox');
      //     let bMarkChecked = oFilterOptions.columnFilters[iColumnIndex].indexOf(sFilterValue.toString()) > -1 ? true : false;
      //     let bCurrentlyChecked = oCheckbox.is(':checked');
   
      //     if(!bMarkChecked && bCurrentlyChecked) {
      //        oCheckbox.trigger('click');
      //     } else if(bMarkChecked && !bCurrentlyChecked) {
      //        oCheckbox.trigger('click');
      //     }
   
      //     if(!bMarkChecked) {
      //        sToggleCheckedOptions = SELECT_ALL_TEXT;
      //     }
      // }
 
      oFilterTableBody.append(oClonedRow);
      oClonedRow.show();
   }
   
   let bDialogOpen = false;
   
   let oDetachedChildred = oFilterDialog.children().detach(); //detach child elements to make loading dialog faster - else it parses all the elements on load first
   
   oFilterDialog.dialog({
      autoOpen: false,
      closeOnEscape: true,
      resizable: false,
      draggable: true,
      height: FILTER_DIALOG_HEIGHT,
      width: FILTER_DIALOG_WIDTH,
      position: {
          my: "left top - 20px",
          at: "right bottom",
          of: $(oHeaderFilterButton),
          collision: 'flip fit' //shifts dialog if it would normally extend to the right past the window
      },
      buttons: [{
              text: DIALOG_APPLY_BUTTON_TEXT,
              ////id: 'btnFilterOkay' + oTable.systemName + 'ColumnIndex' + iColumnIndex,
              id: 'btnFilterOkay' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex,
              class: 'buttonPrimary',
              click: function (event) {
                 
                  let aSetFilterValues = [];
                  let oFilterRows = oFilterTableBody.find('tr.TableFilterRow');
                  let bFilterSet = false;
                  
                  for (let i = 0; i < oFilterRows.length; i++) {
                      let sOptionText = $(oFilterRows[i]).find('span.csTableFilterText').text();
                      let bChecked = $(oFilterRows[i]).find('.csTableFilterCheckbox').is(":checked");
                      if(bChecked) {
                        
                         if(sUndefinedReplacement == undefined && sOptionText == sNullValue) {
                              sOptionText = undefined;
                              console.log(`sOptionText1 : undefined`)
                         } else if(sUndefinedReplacement == '' && sOptionText == sNullValue) {
                              sOptionText = sNullValue;
                              console.log(`sOptionText2 : ${sOptionText}`)
                         }
                         
                         aSetFilterValues.push(sOptionText);
                      }
                     //// 
                     //  if(!bChecked || oFilterRows.length < aFilterValues.length) {
                     //     bFilterSet = true;
                     //  }
                  }
                  
                  ////
                  //if(oFilterOptions == undefined || oFilterOptions.columnFilters == undefined) {
                  //  oFilterOptions = {
                  //     columnFilters: {},
                  //  };
                  //}
                  
                  //// 
                  // if(bFilterSet) {
                  //     oHeaderFilterButton.classList.remove(ICON_FILTER_INACTIVE_CLASS);
                  //     oHeaderFilterButton.classList.add(ICON_FILTER_ACTIVE_CLASS);
                  //     oFilterOptions.columnFilters[iColumnIndex] = aSetFilterValues;
                  // } else {
                  //     oHeaderFilterButton.classList.remove(ICON_FILTER_ACTIVE_CLASS);
                  //     oHeaderFilterButton.classList.add(ICON_FILTER_INACTIVE_CLASS);
                  //     delete oFilterOptions.columnFilters[iColumnIndex];
                  // }
                  
                  ////ApplyFilterOptionsToData();
                  
                  //$('#externalUrlSearch').trigger('keyup'); // 검색어 필터 선실행
                  let $ohActiveRow = $('#externalUrlList').find('table > tbody:last > tr').not(":hidden");
            
                  // 필터 적용된 Row 처리
                  for(let i=0; i<$ohActiveRow.length; i++) {
                     let isDisplay = false;
                     let cell = $($ohActiveRow[i]).find('td')[iColumnIndex];
                     let txtValue = cell.textContent || cell.innerText;
                     
                     for(let j=0; j<aSetFilterValues.length; j++) {
                        if(aSetFilterValues[j] === txtValue) {
                           isDisplay = true;
                           break;
                        }
                     }
                     
                     if(isDisplay) {
                        $ohActiveRow[i].style.display = ""; 
                     } else{
                        $ohActiveRow[i].style.display = "none";
                     }
                  }
                  
                  $(this).dialog("close");
              }
         },
         {
            text: DIALOG_CANCEL_BUTTON_TEXT,
            class: 'buttonStandard',
            click: function (event) {
               $(this).dialog("close");
            }
         },
         {
            text: sToggleCheckedOptions,
            class: 'buttonStandard',
            ////id: 'btnSelectDeselectAll' + oTable.systemName + 'ColumnIndex' + iColumnIndex,
            id: 'btnSelectDeselectAll' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex,
            click: function (event) {
               ////let oButton = $('#btnSelectDeselectAll' + oTable.systemName + 'ColumnIndex' + iColumnIndex);
               let oButton = $('#btnSelectDeselectAll' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex);
               let sButtonText = oButton.button().text();
               if(sButtonText == DESELECT_ALL_TEXT) {
                  let aoCheckboxes = oFilterDialog.find('.csTableFilterCheckbox');
                  for(let i = 0; i < aoCheckboxes.length; i++) {
                     if($(aoCheckboxes[i]).is(":checked")) {
                        $(aoCheckboxes[i]).trigger('click');
                     }
                  }
                   oButton.button('option', 'label', SELECT_ALL_TEXT);
               } else {
                  let aoCheckboxes = oFilterDialog.find('.csTableFilterCheckbox');
                  for(let i = 0; i < aoCheckboxes.length; i++) {
                     if(!$(aoCheckboxes[i]).is(":checked")) {
                        $(aoCheckboxes[i]).trigger('click');
                     }
                  }
                  oButton.button('option', 'label', DESELECT_ALL_TEXT);
               }
            }
         }
      ],
      open: function () {
         oDetachedChildred.appendTo(oFilterDialog);
         
         ////oFilterSearchInput.val('');
   
         if(oFilterDialog.parent().find('.ui-dialog-buttonset').height() > 50) {
            oFilterDialog.css('overflow', 'hidden');
            oFilterDialog.find('.csTableFilterContainer').height(185);
         }
         
         //// 필터 팝업내 검색어 기능 미사용
         //Live search on options
         //  oFilterSearchInput.off().on('input', function () {
         //     oFilterTableBody.find('.TableFilterRow').remove();
         //     let sSearchValue = oFilterSearchInput.val().toLowerCase();
         //     let sColSysName = oTable.columnNameMap.byIndex[iColumnIndex].systemName;
         //     sSearchValue = sSearchValue != undefined && oTable.columnSettingsMap != undefined && oTable.columnSettingsMap[sColSysName] != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMapBack != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMapBack[sSearchValue.toString().toLowerCase()] != undefined ? oTable.columnSettingsMap[sColSysName].displayValuesMapBack[sSearchValue.toString().toLowerCase()] : sSearchValue;
   
         //     let aTempFilterValues = aFilterValues.filter(function (sOption, iIndex) {
         //          return sOption.toString().toLowerCase().indexOf(sSearchValue) > -1;
         //     });
   
         //     for (let i = 0; i < aTempFilterValues.length; i++) {
         //          let sDisplayVal = aTempFilterValues[i] != undefined && oTable.columnSettingsMap != undefined && oTable.columnSettingsMap[sColSysName] != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMap != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMap[aTempFilterValues[i].toString().toLowerCase()] != undefined ? oTable.columnSettingsMap[sColSysName].displayValuesMap[aTempFilterValues[i].toString().toLowerCase()] : aTempFilterValues[i];
         //          let oClonedRow = oFilterTable.find('.templateFilterDialogRow').clone();
         //          oClonedRow.removeClass('templateFilterDialogRow');
         //          oClonedRow.addClass('TableFilterRow');
         //          oClonedRow.find('.csTableFilterText').text(sDisplayVal);
   
         //          if(oFilterOptions != undefined && oFilterOptions.columnFilters != undefined && oFilterOptions.columnFilters[iColumnIndex] != undefined) {
         //              let bChecked = oFilterOptions.columnFilters[iColumnIndex].indexOf(aTempFilterValues[i]) > -1 ? true : false;
         //              oClonedRow.find('.csTableFilterCheckbox').attr('checked', bChecked);
   
   
         //              if(!bChecked) {
         //                 sToggleCheckedOptions = SELECT_ALL_TEXT;
         //              }
         //          }
                  
         //          oFilterTableBody.append(oClonedRow);
         //          oClonedRow.show();
         //     }
         //  });
         
         //  //Prevent WOE
         //  oFilterSearchInput.blur(function () {
         //     oFilterSearchInput.removeAttr('data-dirty');
         //  });
   
         oFilterDialog.find('tr').off().on('click', function (e) {
            if(e.target.type != 'checkbox') {
               let oCheckbox = $(this).find('.csTableFilterCheckbox');
               oCheckbox.trigger('click');
            }
         });
   
         let oFilterRows = oFilterDialog.find('tr.TableFilterRow');
         let sSelectButtonText = DESELECT_ALL_TEXT;
          
         //// 이전 선택된 체크박스 정보는 초기화로 변경되어 미사용
         //  for (let i = 0; i < oFilterRows.length; i++) {
         //     let oCheckbox = $(oFilterRows[i]).find('.csTableFilterCheckbox');
         //     let bChecked = oCheckbox.is(":checked");
   
         //     if(!bChecked) {
         //          sSelectButtonText = SELECT_ALL_TEXT;
         //          break;
         //     }
         //  }
          
         ////let oButton = $('#btnSelectDeselectAll' + oTable.systemName + 'ColumnIndex' + iColumnIndex);
         let oButton = $('#btnSelectDeselectAll' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex);
         oButton.button('option', 'label', sSelectButtonText);
   
         oFilterDialog.find('.csTableFilterCheckbox').off().on('change', function () {
            let oFilterRows = oFilterDialog.find('tr.TableFilterRow');
            let sSelectButtonText = DESELECT_ALL_TEXT;
            for (let i = 0; i < oFilterRows.length; i++) {
               let oCheckbox = $(oFilterRows[i]).find('.csTableFilterCheckbox');
               let bChecked = oCheckbox.is(":checked");
   
               if(!bChecked) {
                  sSelectButtonText = SELECT_ALL_TEXT;
                  break;
               }
            }
            ////let oButton = $('#btnSelectDeselectAll' + oTable.systemName + 'ColumnIndex' + iColumnIndex);
            let oButton = $('#btnSelectDeselectAll' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex);
            oButton.button('option', 'label', sSelectButtonText);
   
            $(this).removeAttr('data-dirty');
         });
   
         bDialogOpen = true;
         $(document).on('click', function (e) {
            //Close dialog when clicking outside it
            if(bDialogOpen) {
               let oClicked = $(e.target);
               let oDialogInstance = oFilterDialog.dialog('instance');
               let oDialogContainer = oDialogInstance.uiDialog;
               if(oClicked.is(oHeaderFilterButton) ||
                   oClicked.parents().is(oDialogContainer) ||
                   oClicked.is(oDialogContainer)
               ) {
                   return;
               } else {
                   bDialogOpen = false;
                   oFilterDialog.dialog("close");
               }
            }
         });
   
         //TODO: this only makes sure the dialog is in the window, but may want to keep inside another container/dialog so may need to adjust this
         //Moves dialog up if extends past window bottom
         let oParentDialogContainer = $(this).closest('.ui-dialog');
         let nTopPosition = oParentDialogContainer.css('top').substring(0, oParentDialogContainer.css('top').length - 2) * 1;
         if($.isNumeric(nTopPosition) && ((window.innerHeight - nTopPosition) < oParentDialogContainer.height())) {
             let nNewTopPosition = window.innerHeight - nTopPosition - oParentDialogContainer.height() + nTopPosition;
             oParentDialogContainer.css('top', nNewTopPosition + 'px');
         }
         
         // open 시 체크박스 초기화(전체선택) 
         $(oFilterRows).find('.csTableFilterCheckbox').prop("checked", true); 
      },
      close: function () {
         oFilterDialog.find('.csTableFilterCheckbox').removeAttr('data-dirty');
         $(this).hide();
      }
   });
   
   oFilterDialog.dialog('open');
}



























