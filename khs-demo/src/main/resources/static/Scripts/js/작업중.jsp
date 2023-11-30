


function ClickTableFilterButton2(oHeaderInfo) {
   
   let oHeaderFilterButton = oHeaderInfo.headerButton;
   let iColumnIndex = oHeaderInfo.colIndex;
   let oFilterDialog;
   ////let sFilterName = 'TableFilter' + oTable.systemName + 'ColumnIndex' + iColumnIndex;
   let sFilterName = 'TableFilter' + 'ExternalUrlList' + 'ColumnIndex' + iColumnIndex;
   
   console.log(`iColumnIndex : ${iColumnIndex}`);
   
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
      oFilterDialog = $(oHeaderFilterButton).siblings('.csColumnFilterSelector');
      oFilterDialog.attr('id', sFilterName);
      let sColumnName = $(oHeaderFilterButton).siblings('.headerDisplayName').text();
      ////oFilterDialog.attr('title', LANGUAGES.CS_Tables_FilterColumn + ' ' + sColumnName);
      oFilterDialog.attr('title', 'Filter Column' + ' ' + sColumnName);
   } else {
      oFilterDialog = $('#' + sFilterName);
   }
   
   let oFilterTable = oFilterDialog.find('.csTableFilterTable');
   let oFilterTableBody = oFilterTable.find('tbody');
   let oFilterSearchInput = oFilterDialog.find('.csTableFilterSearchInput');
   
   
   oFilterTableBody.find('.TableFilterRow').remove();
   
////참고 var sUndefinedReplacement = oTable.undefinedReplacement == undefined ? '' : oTable.undefinedReplacement;
   var sUndefinedReplacement = '';
   
   ////let sNullValue = sUndefinedReplacement == undefined || sUndefinedReplacement == '' ? NO_VALUE : sUndefinedReplacement;
   let sNullValue = sUndefinedReplacement == undefined || sUndefinedReplacement == '' ? '(No Value)' : sUndefinedReplacement;
   
   //Compares against full source data to build excel like filter options
   //Loops through each filter option and breaks if hits current index
   ////let aTempFilteredData = JSON.parse(JSON.stringify(oTable.processedData));
   let aTempFilteredData = JSON.parse(JSON.stringify(_aoExternalUrList));



////if(oFilterOptions != undefined && oFilterOptions.columnFilters != undefined) { 미사용
////for (var sFilterPropertyName in oFilterOptions.columnFilters) {
////    let iColumnFilterIndex = $.isNumeric(sFilterPropertyName) ? sFilterPropertyName : oTable.columnNameMap.bySystemName[sFilterPropertyName];
////    aTempFilteredData = aTempFilteredData.filter(function (aRow, iIndex) {
////       let sCellValue = aRow.rowData[iColumnFilterIndex]; //Check if the filter column has html and if it does get the text instead of the full html string
////       sCellValue = sCellValue != undefined && oTable.columnSettingsMap != undefined && oTable.columnSettingsMap[sFilterPropertyName] != undefined && oTable.columnSettingsMap[sFilterPropertyName].displayValuesMap != undefined && oTable.columnSettingsMap[sFilterPropertyName].displayValuesMap[sCellValue.toString().toLowerCase()] != undefined ? oTable.columnSettingsMap[sFilterPropertyName].displayValuesMap[sCellValue.toString().toLowerCase()] : sCellValue;
////       return (iColumnIndex * 1) == (iColumnFilterIndex * 1) ? true : oFilterOptions.columnFilters[sFilterPropertyName].some(value => value == sCellValue) ? true : false;
////    });
////    if((iColumnIndex * 1) == (iColumnFilterIndex * 1)) {
////       break;
////    }
////}
////}

   let aFilterValues = aTempFilteredData.map(function (aRow, iIndex) {
      
      ////return aRow.rowData[iColumnIndex];
      return aRow.languageName;
   }).filter(function (sValue, iIndex, aSelf) {
      return aSelf.indexOf(sValue) == iIndex;
   });
   
   aFilterValues.sort(new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
   }).compare);
   
   //Add undefined values
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
   //debugger;
 console.log('oFilterTableBody1 : ' + $(oFilterTableBody).html());   
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
   
      // if(oFilterOptions != undefined && oFilterOptions.columnFilters != undefined && oFilterOptions.columnFilters[iColumnIndex] != undefined) {미사용
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
console.log('oFilterTableBody2 : ' + $(oFilterTableBody).html());   
      oFilterTableBody.append(oClonedRow);
      oClonedRow.show();
   }
   
   let bDialogOpen = false;
   
   let oDetachedChildred = oFilterDialog.children().detach(); //detach child elements to make loading dialog faster - else it parses all the elements on load first
   console.log(oDetachedChildred);
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
                          } else if(sUndefinedReplacement == '' && sOptionText == sNullValue) {
                              sOptionText = sNullValue;
                          }
   
                          aSetFilterValues.push(sOptionText);
                      }
   
                      if(!bChecked || oFilterRows.length < aFilterValues.length) {
                          bFilterSet = true;
                      }
                  }
   
                  ////if(oFilterOptions == undefined || oFilterOptions.columnFilters == undefined) {
                      oFilterOptions = {
                          columnFilters: {},
                      };
                  ////}
   
                  if(bFilterSet) {
                      oHeaderFilterButton.classList.remove(ICON_FILTER_INACTIVE_CLASS);
                      oHeaderFilterButton.classList.add(ICON_FILTER_ACTIVE_CLASS);
                      oFilterOptions.columnFilters[iColumnIndex] = aSetFilterValues;
                  } else {
                      oHeaderFilterButton.classList.remove(ICON_FILTER_ACTIVE_CLASS);
                      oHeaderFilterButton.classList.add(ICON_FILTER_INACTIVE_CLASS);
                      delete oFilterOptions.columnFilters[iColumnIndex];
                  }
                  ApplyFilterOptionsToData();
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
                      for (let i = 0; i < aoCheckboxes.length; i++) {
                          if($(aoCheckboxes[i]).is(":checked")) {
                              $(aoCheckboxes[i]).trigger('click');
                          }
                      }
                      oButton.button('option', 'label', SELECT_ALL_TEXT);
                  } else {
                      let aoCheckboxes = oFilterDialog.find('.csTableFilterCheckbox');
                      for (let i = 0; i < aoCheckboxes.length; i++) {
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
         console.log(`called open event`);
          oDetachedChildred.appendTo(oFilterDialog);
         
          oFilterSearchInput.val('');
   
          if(oFilterDialog.parent().find('.ui-dialog-buttonset').height() > 50) {
              oFilterDialog.css('overflow', 'hidden');
              oFilterDialog.find('.csTableFilterContainer').height(185);
          }
         
          //Live search on options
          oFilterSearchInput.off().on('input', function () {
              oFilterTableBody.find('.TableFilterRow').remove();
              let sSearchValue = oFilterSearchInput.val().toLowerCase();
              let sColSysName = oTable.columnNameMap.byIndex[iColumnIndex].systemName;
              sSearchValue = sSearchValue != undefined && oTable.columnSettingsMap != undefined && oTable.columnSettingsMap[sColSysName] != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMapBack != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMapBack[sSearchValue.toString().toLowerCase()] != undefined ? oTable.columnSettingsMap[sColSysName].displayValuesMapBack[sSearchValue.toString().toLowerCase()] : sSearchValue;
   
              let aTempFilterValues = aFilterValues.filter(function (sOption, iIndex) {
                  return sOption.toString().toLowerCase().indexOf(sSearchValue) > -1;
              });
   
              for (let i = 0; i < aTempFilterValues.length; i++) {
                  let sDisplayVal = aTempFilterValues[i] != undefined && oTable.columnSettingsMap != undefined && oTable.columnSettingsMap[sColSysName] != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMap != undefined && oTable.columnSettingsMap[sColSysName].displayValuesMap[aTempFilterValues[i].toString().toLowerCase()] != undefined ? oTable.columnSettingsMap[sColSysName].displayValuesMap[aTempFilterValues[i].toString().toLowerCase()] : aTempFilterValues[i];
                  let oClonedRow = oFilterTable.find('.templateFilterDialogRow').clone();
                  oClonedRow.removeClass('templateFilterDialogRow');
                  oClonedRow.addClass('TableFilterRow');
                  oClonedRow.find('.csTableFilterText').text(sDisplayVal);
   
                  if(oFilterOptions != undefined && oFilterOptions.columnFilters != undefined && oFilterOptions.columnFilters[iColumnIndex] != undefined) {
                      let bChecked = oFilterOptions.columnFilters[iColumnIndex].indexOf(aTempFilterValues[i]) > -1 ? true : false;
                      oClonedRow.find('.csTableFilterCheckbox').attr('checked', bChecked);
   
   
                      if(!bChecked) {
                          sToggleCheckedOptions = SELECT_ALL_TEXT;
                      }
                  }
   
                  oFilterTableBody.append(oClonedRow);
                  oClonedRow.show();
              }
          });
         
          //Prevent WOE
          oFilterSearchInput.blur(function () {
              oFilterSearchInput.removeAttr('data-dirty');
          });
   
          oFilterDialog.find('tr').off().on('click', function (e) {
              if(e.target.type != 'checkbox') {
                  let oCheckbox = $(this).find('.csTableFilterCheckbox');
                  oCheckbox.trigger('click');
              }
          });
   
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
          
      },
      close: function () {
          oFilterDialog.find('.csTableFilterCheckbox').removeAttr('data-dirty');
          $(this).hide();
      }
   });
   
   oFilterDialog.dialog('open');
   }
   /*
             function ProcessTableData2() {
                 $.loading('show');
 
                 ////let aProcessedData = JSON.parse(JSON.stringify(oTable.data, function (iIndex, sValue) {
                 let aProcessedData = JSON.parse(JSON.stringify(_aoExternalUrList, function (iIndex, sValue) {
                     return sValue === undefined ? "" : sValue;
                 })); //maintain source data
                 let aProcessedHeaders = [];
                 let aDisplayNameHeaders = [];
                 ////let aTableColumnSettings = oTable.columnSettings == undefined ? [] : oTable.columnSettings;
                 let aTableColumnSettings =[];
                 let oColumnNameMapping = {
                     bySystemName: {},
                     byDisplayName: {},
                     byIndex: {},
                     byOriginalDataPropertyName: {},
                     getDisplayName: {}
                 };
                 let oColumnSettingsMap = {};

                 ////let oHideShowColumnsDialog = oMainTable.find('.csTableHideShowColumnsDialog');
                 let sToggleCheckedOptions = DESELECT_ALL_TEXT;
                 ////oHideShowColumnsDialog.find('.TableHideShowColumn').remove();
 
                 let aTempHeaders = [];
                 let aNameInformation = [];
               ////
               //  if(aColumnOrder.length > 0) {
               //       for (let i = 0; i < aColumnOrder.length; i++) {
               //           if(aColumnOrder[i] != undefined && typeof aColumnOrder[i] == 'string') {
               //              oColumnOrderMap[aColumnOrder[i]] = i;
               //           }
               //       }
               //  }
                
                //// 
               //  if(bDebug) {
               //       console.log('oColumnOrderMap: ', oColumnOrderMap);
               //  }

//                 if(iDataFormat == RR_DF_OBJECT_ARRAY) {
				 if(1) {
                     let aConvertedDataArray = [];
                     aTempHeaders = [];
                     let iTempIndex = 0;
 
                     ////
                     // for (var sOrderSystemname in oColumnOrderMap) {
                     //     let iIndex = oColumnOrderMap[sOrderSystemname];
                     //     aNameInformation[iIndex] = {
                     //        displayName: '',
                     //        systemName: sOrderSystemname,
                     //        originalDataPropertyName: sOrderSystemname
                     //     };
                     // }
////
               //       for (let i = 0; i < aProcessedData.length; i++) {
               //           let aRow = [];
 
               //           if(i === 0) {
                            
               //              ////
               //             //  for (var sOrderSystemname in oColumnOrderMap) {
               //             //       aRow.push(aProcessedData[i][sOrderSystemname]);
               //             //  }
 
               //              for (var sPropertyName in aProcessedData[i]) {
               //                   if(oColumnOrderMap[sPropertyName] == undefined) {
               //                       aRow.push(aProcessedData[i][sPropertyName]);
               //                   }
 
               //                   if(oTable.type == 'onlineReport' && aNameInformation.length > 0) {
               //                       for (let j = 0; j < aNameInformation.length; j++) {
               //                          if(sPropertyName.toUpperCase() == aNameInformation[j].displayName.toUpperCase()) {
               //                               if(oColumnOrderMap[sPropertyName] != undefined) {
               //                                   let iIndex = oColumnOrderMap[sPropertyName];
               //                                   aNameInformation[iIndex].originalDataPropertyName = sPropertyName;
               //                               } else {
               //                                   aNameInformation[j].originalDataPropertyName = sPropertyName;
               //                               }
               //                               break;
               //                          }
               //                       }
               //                   } else {
                                    
               //                       if(oColumnOrderMap[sPropertyName] == undefined) {
               //                          aNameInformation.push({
               //                               displayName: sPropertyName,
               //                               systemName: sPropertyName,
               //                               originalDataPropertyName: sPropertyName
               //                          });
               //                       } else {
               //                          let iIndex = oColumnOrderMap[sPropertyName];
               //                          aNameInformation[iIndex] = {
               //                               displayName: sPropertyName,
               //                               systemName: sPropertyName,
               //                               originalDataPropertyName: sPropertyName
               //                          };
               //                       }
               //                   //}
               //              }
               //           } else {
               //              for (let j = 0; j < aNameInformation.length; j++) {
               //                   let sPropertyName = aNameInformation[j].originalDataPropertyName;
               //                   aRow.push(aProcessedData[i][sPropertyName]);
               //              }
               //           }
 
               //           if(bDeleteColumnEnabled) {
               //              aRow.push(undefined);
               //           }
 
               //           aConvertedDataArray.push(aRow);
 
               //       }
 
               //       aProcessedData = aConvertedDataArray;
               //  }
 
                 //Add row index for reference when drawing body
                ////let aDisplayData = [];
 
                 for (let i = 0; i < aProcessedData.length; i++) {
                    ////
                     // let aDisplayRow = [];
                     // for (let j = 0; j < aProcessedData[i].length; j++) {
                     //     if(oColumnNameMapping.byIndex[j] == undefined) {
                     //        aDisplayRow.push(aProcessedData[i][j]);
                     //        continue;
                     //     }
                     //     let sColSysName = oColumnNameMapping.byIndex[j].systemName;
                     //     let sDisplayVal = oColumnSettingsMap != undefined && oColumnSettingsMap[sColSysName] != undefined && oColumnSettingsMap[sColSysName].displayValuesMap != undefined && aProcessedData[i][j] != undefined && oColumnSettingsMap[sColSysName].displayValuesMap[aProcessedData[i][j].toString().toLowerCase()] != undefined ? oColumnSettingsMap[sColSysName].displayValuesMap[aProcessedData[i][j].toString().toLowerCase()] : aProcessedData[i][j];
                     //     aDisplayRow.push(sDisplayVal);
                     // }
 
                     let bDirty = false;
                     ////
                     // if(oTable.previousProcessData != undefined && oTable.previousProcessData[i].dirty != undefined) {
                     //     bDirty = oTable.previousProcessData[i].dirty;
                     // }
 
                     // aDisplayData.push({
                     //     row: i,
                     //     rowData: aDisplayRow,
                     //     dirty: bDirty
                     // });
 
                     aProcessedData[i] = {
                         row: i,
                         rowData: aProcessedData[i],
                         dirty: bDirty
                     };
                 }
 ////
               //  if(bDebug) {
               //       console.log('aProcessedData: ', aProcessedData);
               //  }
               
               //  oTable.processedData = JSON.parse(JSON.stringify(aProcessedData));
               //  oTable.processedTableHeaders = JSON.parse(JSON.stringify(aProcessedHeaders));
               //  oTable.displayData = aDisplayData;
               //  oTable.displayHeaders = aDisplayNameHeaders;
               //  oTable.columnNameMap = oColumnNameMapping;
               //  oTable.columnSettingsMap = oColumnSettingsMap;
               //  oTable.headerSettingsMap = oHeaderSettingsMap;
               return JSON.parse(JSON.stringify(aProcessedData));
             }
             }
             */