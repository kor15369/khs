             function ProcessTableData() {
                 $.loading('show');
 
                 let aProcessedData = JSON.parse(JSON.stringify(oTable.data, function (iIndex, sValue) {
                     return sValue === undefined ? "" : sValue;
                 })); //maintain source data
                 let aProcessedHeaders = [];
                 let aDisplayNameHeaders = [];
                 let aTableColumnSettings = oTable.columnSettings == undefined ? [] : oTable.columnSettings;
                 let oColumnNameMapping = {
                     bySystemName: {},
                     byDisplayName: {},
                     byIndex: {},
                     byOriginalDataPropertyName: {},
                     getDisplayName: {}
                 };
                 let oColumnSettingsMap = {};
                 
                 //test
                 /*
                 if(oMainTable.find('.csTableHideShowColumnsDialog').length === 0){
                    $('.csTableShowHideColumnsButton').parent().append('<div title="Show/Hide Columns" class="csFilterDialogDiv csTableHideShowColumnsDialog" style="display: none;">')
                 }
                 */
                 //test
                 
                 let oHideShowColumnsDialog = oMainTable.find('.csTableHideShowColumnsDialog');
                 let sToggleCheckedOptions = DESELECT_ALL_TEXT;
                 oHideShowColumnsDialog.find('.TableHideShowColumn').remove();
 
                 let aTempHeaders = [];
                 let aNameInformation = [];
 
                 if(aColumnOrder.length > 0) {
                     for (let i = 0; i < aColumnOrder.length; i++) {
                         if(aColumnOrder[i] != undefined && typeof aColumnOrder[i] == 'string') {
                             oColumnOrderMap[aColumnOrder[i]] = i;
                         }
                     }
                 }
                 if(bDebug) {
                     console.log('oColumnOrderMap: ', oColumnOrderMap);
                 }
 /*
                 if(iDataFormat == RR_DF_2D_ARRAY_HEADERS) {
                     aTempHeaders = aProcessedData.shift();
                     for (let i = 0; i < aTempHeaders.length; i++) {
                         if(aTempHeaders[i] == undefined || aTempHeaders[i] == '') {
                             aNameInformation.push({
                                 displayName: 'Column ' + (i + 1),
                                 systemName: 'Column ' + (i + 1),
                                 originalDataPropertyName: 'Column ' + (i + 1)
                             });
                         } else {
                             aNameInformation.push({
                                 displayName: aTempHeaders[i],
                                 systemName: aTempHeaders[i],
                                 originalDataPropertyName: aTempHeaders[i]
                             });
                         }
                     }
                 } else if(iDataFormat == RR_DF_2D_ARRAY) {
                     for (let i = 0; i < aProcessedData[0].length; i++) {
                         aNameInformation.push({
                             displayName: 'Column ' + (i + 1),
                             systemName: 'Column ' + (i + 1),
                             originalDataPropertyName: 'Column ' + (i + 1)
                         });
                     }
                 } else 
*/
//                 if(iDataFormat == RR_DF_OBJECT_ARRAY) {
				 if(1) {
                     let aConvertedDataArray = [];
                     aTempHeaders = [];
                     let iTempIndex = 0;
 
                     for (var sOrderSystemname in oColumnOrderMap) {
                         let iIndex = oColumnOrderMap[sOrderSystemname];
                         aNameInformation[iIndex] = {
                             displayName: '',
                             systemName: sOrderSystemname,
                             originalDataPropertyName: sOrderSystemname
                         };
                     }
 /*
                     if(oTable.type == 'onlineReport' && oTable.reportColumnDefinitions.length > 0) {
                         for (let j = 0; j < oTable.reportColumnDefinitions.length; j++) {
                             if(oTable.reportColumnDefinitions[j].isVisible) {
                                 if(oColumnOrderMap[oTable.reportColumnDefinitions[j].colSystemName] == undefined) {
                                     aNameInformation.push({
                                         displayName: oTable.reportColumnDefinitions[j].colDisplayName,
                                         systemName: oTable.reportColumnDefinitions[j].colSystemName,
                                         originalDataPropertyName: oTable.reportColumnDefinitions[j].colSystemName
                                     });
                                 } else {
                                     let iIndex = oColumnOrderMap[oTable.reportColumnDefinitions[j].colSystemName];
                                     aNameInformation[iIndex] = {
                                         displayName: oTable.reportColumnDefinitions[j].colDisplayName,
                                         systemName: oTable.reportColumnDefinitions[j].colSystemName,
                                         originalDataPropertyName: oTable.reportColumnDefinitions[j].colSystemName
                                     };
                                 }
                             }
                         }
                     }
 */
                     for (let i = 0; i < aProcessedData.length; i++) {
                         let aRow = [];
 
                         if(i === 0) {
                             for (var sOrderSystemname in oColumnOrderMap) {
                                 aRow.push(aProcessedData[i][sOrderSystemname]);
                             }
 
                             for (var sPropertyName in aProcessedData[i]) {
                                 if(oColumnOrderMap[sPropertyName] == undefined) {
                                     aRow.push(aProcessedData[i][sPropertyName]);
                                 }
 
                                 if(oTable.type == 'onlineReport' && aNameInformation.length > 0) {
                                     for (let j = 0; j < aNameInformation.length; j++) {
                                         if(sPropertyName.toUpperCase() == aNameInformation[j].displayName.toUpperCase()) {
                                             if(oColumnOrderMap[sPropertyName] != undefined) {
                                                 let iIndex = oColumnOrderMap[sPropertyName];
                                                 aNameInformation[iIndex].originalDataPropertyName = sPropertyName;
                                             } else {
                                                 aNameInformation[j].originalDataPropertyName = sPropertyName;
                                             }
                                             break;
                                         }
                                     }
                                 } else {
                                     if(oColumnOrderMap[sPropertyName] == undefined) {
                                         aNameInformation.push({
                                             displayName: sPropertyName,
                                             systemName: sPropertyName,
                                             originalDataPropertyName: sPropertyName
                                         });
                                     } else {
                                         let iIndex = oColumnOrderMap[sPropertyName];
                                         aNameInformation[iIndex] = {
                                             displayName: sPropertyName,
                                             systemName: sPropertyName,
                                             originalDataPropertyName: sPropertyName
                                         };
                                     }
                                 }
                             }
                         } else {
                             for (let j = 0; j < aNameInformation.length; j++) {
                                 let sPropertyName = aNameInformation[j].originalDataPropertyName;
                                 aRow.push(aProcessedData[i][sPropertyName]);
                             }
                         }
 
                         if(bDeleteColumnEnabled) {
                             aRow.push(undefined);
                         }
 
                         aConvertedDataArray.push(aRow);
 
                     }
 
                     aProcessedData = aConvertedDataArray;
                 }
 /*
                 if(bDebug) {
                     console.log('bDeleteColumnEnabled: ', bDeleteColumnEnabled);
                     console.log('oTable.reportColumnDefinitions: ', oTable.reportColumnDefinitions);
                 }
 
                 if(bDeleteColumnEnabled) {
                     let bAddDeleteColumn = true;
                     for (let i = 0; i < aTableColumnSettings.length; i++) {
                         if(aTableColumnSettings[i].systemName == 'cs_delete') {
                             bAddDeleteColumn = false;
                             break;
                         }
                     }
                     if(aNameInformation.length > 0) {
                         aNameInformation.push({
                             displayName: 'Delete',
                             systemName: 'cs_delete',
                             originalDataPropertyName: 'cs_delete'
                         });
                     }
 
                     if(bAddDeleteColumn && aNameInformation.length > 0) {
                         aTableColumnSettings.push({
                             systemName: 'cs_delete',
                             html: '<input class="rowCheckbox" type="checkbox" onchange="$(this).closest(\'td\').attr(\'rrvalue\', this.checked);" />',
                             showFilter: false,
                             showSort: false,
                             style: {
                                 'text-align': 'center',
                                 'width': '40px'
                             },
                             excludeFromExcel: true,
                             readOnly: true,
                             hidden: bTableReadOnly
                         });
 
                         if(oTable.headers == undefined) {
                             oTable.headers = [];
                         }
                     }
                 }
 
                 if(bDebug) {
                     console.log('process data aNameInformation: ', aNameInformation);
                     console.log('processData - aTableColumnSettings: ', aTableColumnSettings);
                 }
 
                 for (let i = 0; i < aNameInformation.length; i++) {
                     let sDisplayName = aNameInformation[i].displayName;
                     let sSystemName = aNameInformation[i].systemName;
                     let sPropertyName = aNameInformation[i].originalDataPropertyName;
 
                     //Creates mapping to update cell attribute for system name and index for when doing token replacement with system name
                     oColumnNameMapping.byIndex[i] = {
                         systemName: sSystemName,
                         displayName: sDisplayName,
                         originalDataPropertyName: sPropertyName
                     };
                     oColumnNameMapping.bySystemName[sSystemName] = i;
                     oColumnNameMapping.byDisplayName[sDisplayName] = i;
                     oColumnNameMapping.byOriginalDataPropertyName[sPropertyName] = i;
                     oColumnNameMapping.getDisplayName[sSystemName] = sDisplayName;
                     aProcessedHeaders.push(sDisplayName);
                     aDisplayNameHeaders.push(sDisplayName);
 
                     if(bDeleteColumnEnabled && sSystemName == 'cs_delete') {
                         oTable.headers[i] = {
                             systemName: 'cs_delete',
                             displayName: 'Delete',
                             displayText: '<i class="cs_icons trashcan cs_deleteColumn"></i>',
                             style: {
                                 'text-align': 'center',
                                 'width': '40px'
                             }
                         };
                     }
                 }
 
 
                 if(bDebug) {
                     console.log('oTable.headers: ', oTable.headers);
                     console.log('aDisplayNameHeaders: ', aDisplayNameHeaders);
                 }
 
                 let oHeaderSettingsMap = {};
                 //headers property can take an object where property is column system name and the value is the replacement header text
 
                 if(oTable.headers != undefined && oTable.headers.length > 0) {
                     for (let i = 0; i < oTable.headers.length; i++) {
                         if(oTable.headers[i] != undefined) {
                             if(typeof oTable.headers[i] == 'string') {
                                 let sDisplayName = iDataFormat == 1 ? oTable.headers[i].charAt(0).toUpperCase() + oTable.headers[i].slice(1) : oTable.headers[i];
                                 aProcessedHeaders[i] = sDisplayName;
                                 aDisplayNameHeaders[i] = sDisplayName;
                                 if(aNameInformation.length < oTable.headers.length && i > aNameInformation.length - 1) {
                                     oColumnNameMapping.byIndex[i] = {
                                         systemName: sDisplayName,
                                         displayName: sDisplayName
                                     };
                                     oColumnNameMapping.bySystemName[sDisplayName] = i;
                                     oColumnNameMapping.byDisplayName[sDisplayName] = i;
                                     oColumnNameMapping.getDisplayName[sDisplayName] = sDisplayName;
                                 }
                             } else if(typeof oTable.headers[i] == 'number') {
                                 let sDisplayName = iDataFormat == 1 ? oTable.headers[i].toString().charAt(0).toUpperCase() + oTable.headers[i].toString().slice(1) : oTable.headers[i];
                                 aProcessedHeaders[i] = sDisplayName;
                                 aDisplayNameHeaders[i] = sDisplayName;
                                 if(aNameInformation.length < oTable.headers.length && i > aNameInformation.length - 1) {
                                     oColumnNameMapping.byIndex[i] = {
                                         systemName: sDisplayName,
                                         displayName: sDisplayName
                                     };
                                     oColumnNameMapping.bySystemName[sDisplayName] = i;
                                     oColumnNameMapping.byDisplayName[sDisplayName] = i;
                                     oColumnNameMapping.getDisplayName[sDisplayName] = sDisplayName;
                                 }
                             } else {
                                 let sSystemName = oTable.headers[i] == undefined ? undefined : oTable.headers[i].systemName;
                                 let sDisplayName = oTable.headers[i].displayName == undefined ? 'Column ' + i : oTable.headers[i].displayName;
                                 let sDisplayText = oTable.headers[i].displayText == undefined ? (oTable.headers[i].html != undefined ? oTable.headers[i].html : sDisplayName) : oTable.headers[i].displayText;
 
                                 if(aNameInformation.length > 0) {
                                     for (let j = 0; j < aNameInformation.length; j++) {
                                         if(aNameInformation[j].systemName == sSystemName) {
                                             oColumnNameMapping.byIndex[j] = {
                                                 systemName: sSystemName,
                                                 displayName: sDisplayName
                                             };
                                             oColumnNameMapping.bySystemName[sSystemName] = j;
                                             oColumnNameMapping.byDisplayName[sDisplayName] = j;
                                             oColumnNameMapping.getDisplayName[sSystemName] = sDisplayName;
                                             aProcessedHeaders[j] = sDisplayText;
                                             aDisplayNameHeaders[j] = sDisplayName;
                                             oHeaderSettingsMap[sSystemName] = oTable.headers[i];
                                             break;
                                         }
                                     }
                                 } else { //There is no data, but there are headers we still want to display
                                     oColumnNameMapping.byIndex[i] = {
                                         systemName: sSystemName,
                                         displayName: sDisplayName
                                     };
                                     oColumnNameMapping.bySystemName[sSystemName] = i;
                                     oColumnNameMapping.byDisplayName[sDisplayName] = i;
                                     oColumnNameMapping.getDisplayName[sSystemName] = sDisplayName;
                                     aProcessedHeaders[i] = sDisplayText;
                                     aDisplayNameHeaders[i] = sDisplayName;
                                     oHeaderSettingsMap[sSystemName] = oTable.headers[i];
                                 }
 
                             }
                         }
                     }
 
                     if(bDeleteColumnEnabled && aNameInformation.length == 0) {
                         let bAddDeleteColumn = true;
                         for (let i = 0; i < aTableColumnSettings.length; i++) {
                             if(aTableColumnSettings[i].systemName == 'cs_delete') {
                                 bAddDeleteColumn = false;
                                 break;
                             }
                         }
                         if(bAddDeleteColumn) {
                             oTable.headers[oTable.headers.length] = {
                                 systemName: 'cs_delete',
                                 displayName: 'Delete',
                                 displayText: '<i class="cs_icons trashcan cs_deleteColumn"></i>',
                                 style: {
                                     'text-align': 'center',
                                     'width': '40px'
                                 }
                             };
 
                             aTableColumnSettings.push({
                                 systemName: 'cs_delete',
                                 html: '<input class="rowCheckbox" type="checkbox" onchange="$(this).closest(\'td\').attr(\'rrvalue\', this.checked);" />',
                                 showFilter: false,
                                 showSort: false,
                                 style: {
                                     'text-align': 'center',
                                     'width': '40px'
                                 },
                                 excludeFromExcel: true,
                                 readOnly: true,
                                 hidden: bTableReadOnly
                             });
 
                             let iDeleteHeaderIndex = oTable.headers.length - 1;
 
                             let sSystemName = 'cs_delete';
                             let sDisplayName = 'Delete';
                             let sDisplayText = '<i class="cs_icons trashcan cs_deleteColumn"></i>';
                             oColumnNameMapping.byIndex[iDeleteHeaderIndex] = {
                                 systemName: sSystemName,
                                 displayName: sDisplayName
                             };
                             oColumnNameMapping.bySystemName[sSystemName] = iDeleteHeaderIndex;
                             oColumnNameMapping.byDisplayName[sDisplayName] = iDeleteHeaderIndex;
                             oColumnNameMapping.getDisplayName[sSystemName] = sDisplayName;
                             aProcessedHeaders[iDeleteHeaderIndex] = sDisplayText;
                             aDisplayNameHeaders[iDeleteHeaderIndex] = sDisplayName;
                             oHeaderSettingsMap[sSystemName] = oTable.headers[iDeleteHeaderIndex];
                         }
                     }
                 }
 
                 if(bDebug) {
                     console.log('process data: aDisplayNameHeaders: ', aDisplayNameHeaders);
                     console.log('aProcessedHeaders: ', aProcessedHeaders);
                     console.log('oColumnNameMapping: ', oColumnNameMapping);
                 }
                 
                 function UpdateValueMapping(oColumnSettings, iColumnIndex) {
                    let oDisplayValuesMap = undefined;
                     let oDisplayValuesMapBack = undefined;
                     if(oColumnSettings._valueMapping != undefined) {
                         let aMapConfigs = oColumnSettings._valueMapping;
                         oDisplayValuesMap = {};
                         oDisplayValuesMapBack = {};
                         for (let i = 0; i < aMapConfigs.length; i++) {
                             let aMapConfig = aMapConfigs[i];
                             oDisplayValuesMap[aMapConfig[0].toString().toLowerCase()] = aMapConfig[1];
                             oDisplayValuesMapBack[aMapConfig[1].toString().toLowerCase()] = aMapConfig[0];
                         }
                     }
                     
                    oColumnSettings.displayValuesMap = oDisplayValuesMap;
                    oColumnSettings.displayValuesMapBack = oDisplayValuesMapBack;
                 oColumnSettingsMap[oColumnNameMapping.byIndex[iColumnIndex].systemName] = oColumnSettings;
                 }
 
                 for (let i = 0; i < aProcessedHeaders.length; i++) {
                     let oColumnSetting = {};
                     for (let j = 0; j < aTableColumnSettings.length; j++) {
                         if(oColumnNameMapping.byIndex[i] != undefined) {
                            let oColumnSettings = aTableColumnSettings[j];
                             if((oColumnSettings.index != undefined && oColumnSettings.index == i) || (oColumnSettings.systemName != undefined && (oColumnSettings.systemName == oColumnNameMapping.byIndex[i].systemName || oColumnSettings.systemName == oColumnNameMapping.byIndex[i].displayName || oColumnSettings.systemName == oColumnNameMapping.byIndex[i].originalDataPropertyName))) {
                                oColumnSettings._valueMapping = oColumnSettings.valueMapping != undefined && oColumnSettings.valueMapping instanceof Array && oColumnSettings.valueMapping.length > 0 ? oColumnSettings.valueMapping : undefined;
                         
                         let oDisplayValuesMap = undefined;
                                 let oDisplayValuesMapBack = undefined;
                         
                         if(oColumnSettings._valueMapping != undefined) {
                            UpdateValueMapping(oColumnSettings, i);
                            
                            Object.defineProperty(oColumnSettings, 'valueMapping', {
                               get: function() {
                                 return oColumnSettings._valueMapping;
                               },
                               set: function(aValueMapping) {          
                              
                                  if(typeof aValueMapping[0][0] == 'number') {
                                     aValueMapping.sort(function (a, b) {
                                        return a[0] - b[0];  
                                     });
                                  }
                                  else {
                                     aValueMapping.sort(function (a, b) {
                                                 let sValA = a[0] != undefined ? a[0].toLowerCase() : '';
                                                 let sValB = b[0] != undefined ? a[0].toLowerCase() : '';
                                                 return sValA.localeCompare(sValB);
                                             });
                                  }
                                  
                                  aValueMapping = aValueMapping.filter(function (aMap, iMapIndex, aValueMap) {
                                      if(iMapIndex > 0) {
                                         if(typeof aMap[0] == 'number') {
                                            return !(aMap[0] == aValueMap[iMapIndex - 1][0]);
                                         }
                                         else {
                                            return !(aMap[0].toLowerCase() == aValueMap[iMapIndex - 1][0].toLowerCase());
                                         }
                                      }
                                      else {
                                         return true;
                                      }
                                   });
                                   
                                  oColumnSettings._valueMapping = aValueMapping;
                            
                                  UpdateValueMapping(oColumnSettings, i);
                                  
                                  oColumnSetting = oColumnSettings;
                              }
                            });
                            
                                 oColumnSetting = oColumnSettings;
                         }
                         else {
                            oColumnSettings.displayValuesMap = oDisplayValuesMap;
                                 oColumnSettings.displayValuesMapBack = oDisplayValuesMapBack;
                                 oColumnSettingsMap[oColumnNameMapping.byIndex[i].systemName] = oColumnSettings; 
                                 
                                 oColumnSetting = oColumnSettings;
                         }                   
                                 break;
                             }
                         }
                     }
 
                     if((oColumnSetting.showHideColumn == undefined && oColumnSetting.showHideColumn != true) && (oColumnSetting.hidden == undefined || oColumnSetting.hidden != true) &&
                         (iNumberOfColumnsToFreeze == undefined || i >= iNumberOfColumnsToFreeze)) {
                         let oClonedRow = oHideShowColumnsDialog.find('.templateFilterDialogRow').clone();
                         oClonedRow.removeClass('templateFilterDialogRow');
                         oClonedRow.addClass('TableHideShowColumn');
                         let sHeaderName = /<\/?[a-z][\s\S]*>/i.test(aProcessedHeaders[i]) ? oColumnNameMapping.byIndex[i].displayName : aProcessedHeaders[i];
                         oClonedRow.find('.csTableFilterText').text(sHeaderName);
                         oClonedRow.attr(COL_SYSTEM_NAME_ATTRIBUTE, oColumnNameMapping.byIndex[i].systemName);
                         oClonedRow.find('.csTableFilterCheckbox').attr(COL_SYSTEM_NAME_ATTRIBUTE, oColumnNameMapping.byIndex[i].systemName);
 
                         if(aHideColumns.indexOf(oColumnNameMapping.byIndex[i].systemName) > -1 || aHideColumns.indexOf(oColumnNameMapping.byIndex[i].displayName) > -1) {
                             oClonedRow.find('.csTableFilterCheckbox').attr('checked', false);
                             sToggleCheckedOptions = SELECT_ALL_TEXT;
                         }
                         oHideShowColumnsDialog.find('tbody').append(oClonedRow);
                         oClonedRow.show();
                     }
                 }
 */
                 //Add row index for reference when drawing body
                 let aDisplayData = [];
 
                 for (let i = 0; i < aProcessedData.length; i++) {
                     let aDisplayRow = [];
                     for (let j = 0; j < aProcessedData[i].length; j++) {
                         if(oColumnNameMapping.byIndex[j] == undefined) {
                             aDisplayRow.push(aProcessedData[i][j]);
                             continue;
                         }
                         let sColSysName = oColumnNameMapping.byIndex[j].systemName;
                         let sDisplayVal = oColumnSettingsMap != undefined && oColumnSettingsMap[sColSysName] != undefined && oColumnSettingsMap[sColSysName].displayValuesMap != undefined && aProcessedData[i][j] != undefined && oColumnSettingsMap[sColSysName].displayValuesMap[aProcessedData[i][j].toString().toLowerCase()] != undefined ? oColumnSettingsMap[sColSysName].displayValuesMap[aProcessedData[i][j].toString().toLowerCase()] : aProcessedData[i][j];
                         aDisplayRow.push(sDisplayVal);
                     }
 
                     let bDirty = false;
                     if(oTable.previousProcessData != undefined && oTable.previousProcessData[i].dirty != undefined) {
                         bDirty = oTable.previousProcessData[i].dirty;
                     }
 
                     aDisplayData.push({
                         row: i,
                         rowData: aDisplayRow,
                         dirty: bDirty
                     });
 
                     aProcessedData[i] = {
                         row: i,
                         rowData: aProcessedData[i],
                         dirty: bDirty
                     };
                 }
 
                 if(bDebug) {
                     console.log('aProcessedData: ', aProcessedData);
                 }
 
                 oTable.processedData = JSON.parse(JSON.stringify(aProcessedData));
                 oTable.processedTableHeaders = JSON.parse(JSON.stringify(aProcessedHeaders));
                 oTable.displayData = aDisplayData;
                 oTable.displayHeaders = aDisplayNameHeaders;
                 oTable.columnNameMap = oColumnNameMapping;
                 oTable.columnSettingsMap = oColumnSettingsMap;
                 oTable.headerSettingsMap = oHeaderSettingsMap;
 
                 //Hide/Showcolumns dialog
                 //Build show/hide column dialog
                 //region HideShowColumns
                 
                 // ####### bug fix jiyong.jung 2021.12.21 Event bind off() remove #######
                 //oMainTable.find('.csTableShowHideColumnsButton').off().on('click', function () {
/*
             oMainTable.find('.csTableShowHideColumnsButton').on('click', function () {
                     let oShowHideColumnsButton = this;
                     oHideShowColumnsDialog.find('.csTableFilterContainer').height(HIDE_SHOW_COLUMNS_DIALOG_HEIGHT);
 
                     let bDialogOpen = false;
 
                     oHideShowColumnsDialog.dialog({
                         autoOpen: true,
                         closeOnEscape: true,
                         resizable: false,
                         draggable: false,
                         height: FILTER_DIALOG_HEIGHT,
                         width: FILTER_DIALOG_WIDTH,
                         position: {
                             my: "left top - 20px",
                             at: "right bottom",
                             of: $(oShowHideColumnsButton)
                         },
                         focus: function () {
                             bDialogOpen = false;
                         },
                         buttons: [{
                                 text: DIALOG_APPLY_BUTTON_TEXT,
                                 id: 'btnShowHideColumnsOkay',
                                 class: 'buttonPrimary',
                                 click: function (event) {
                                     let aSetFilterValues = [];
                                     let aoHideShowColumnOptions = oHideShowColumnsDialog.find('tr.TableHideShowColumn');
                                     let bFilterSet = false;
                                     let oHTMLTable = oMainTable.find('.csTableTableSelector');
                                     let oHTMLTableBody = oHTMLTable.find('tbody');
                                     let oMergedHeaders = {}; //Only if there are merged headers that require hiding/showing
 
                                     aHideColumns = [];
                                     for (let i = 0; i < aoHideShowColumnOptions.length; i++) {
                                         let sOptionText = $(aoHideShowColumnOptions[i]).find('span.csTableFilterText').text();
                                         let oCheckbox = $(aoHideShowColumnOptions[i]).find('.csTableFilterCheckbox');
                                         let bChecked = oCheckbox.is(":checked");
                                         let sColSystemName = oCheckbox.attr(COL_SYSTEM_NAME_ATTRIBUTE);
                                         let iColumnIndex = oTable.columnNameMap.bySystemName[sColSystemName];
 
                                         if(bChecked == true) {
                                             oHTMLTable.find('.TableHeader').find('th[' + COL_SYSTEM_NAME_ATTRIBUTE + '="' + sColSystemName + '"]').show();
                                             oHTMLTableBody.find('td[' + COL_SYSTEM_NAME_ATTRIBUTE + '="' + sColSystemName + '"]').show();
                                             if(oTable.additionalTopHeaderMapping != undefined) {
                                                 //TODO: finish updating hide/show merged headers when all are hidden
                                                 let iColspan = oTable.additionalTopHeaderMapping[sColSystemName].element.colSpan;
                                                 let bAdditionalHeaderFiltered = oTable.additionalTopHeaderMapping[sColSystemName].element.getAttribute('headerfiltered') == 'true' ? true : false;
 
                                                 if(iColspan < oTable.additionalTopHeaderMapping[sColSystemName].originalColspan && !bAdditionalHeaderFiltered) {
 
                                                     oTable.additionalTopHeaderMapping[sColSystemName].element.colSpan = iColspan + 1;
                                                     $(oTable.additionalTopHeaderMapping[sColSystemName].element).show();
                                                 } else {
                                                     $(oTable.additionalTopHeaderMapping[sColSystemName].element).show();
                                                 }
                                             }
                                         } else {
                                             let iHeaderIndex = oHTMLTable.find('.TableHeader').find('th[' + COL_SYSTEM_NAME_ATTRIBUTE + '="' + sColSystemName + '"]').index();
 
                                             oHTMLTable.find('.TableHeader').find('th[' + COL_SYSTEM_NAME_ATTRIBUTE + '="' + sColSystemName + '"]').hide();
                                             oHTMLTableBody.find('td[' + COL_SYSTEM_NAME_ATTRIBUTE + '="' + sColSystemName + '"]').hide();
 
                                             if(oTable.additionalTopHeaderMapping != undefined) {
                                                 let iColspan = oTable.additionalTopHeaderMapping[sColSystemName].element.colSpan;
 
                                                 if(iColspan > 1) {
                                                     let sNewColspan = (iColspan - 1).toString();
                                                     oTable.additionalTopHeaderMapping[sColSystemName].newColspan = sNewColspan;
                                                     oTable.additionalTopHeaderMapping[sColSystemName].element.colSpan = sNewColspan;
                                                     oTable.additionalTopHeaderMapping[sColSystemName].element.setAttribute('headerfiltered', 'true');
                                                 } else {
                                                     $(oTable.additionalTopHeaderMapping[sColSystemName].element).hide();
                                                 }
                                             }
 
                                             if(aHideColumns.indexOf(sColSystemName) < 0) {
                                                 aHideColumns.push(sColSystemName);
                                             }
                                         }
                                         oTable.hideColumns = aHideColumns;
                                     }
                                     
                                     //oHideShowColumnsDialog.find('tr.TableHideShowColumn').find("[data-dirty]").removeAttr("data-dirty");
                                     // ######## bug fix jiyong.jung 2021.12.21 dirty remove ########
                                     $(this).find('[data-dirty]').removeAttr('data-dirty');
 
                                     // ######## bug fix jiyong.jung 2021.12.21 Column freeze problem after refresh ########
                                     FreezeColumns();        
                                     
                                     $(this).dialog("close");
                                 }
                             },
                             {
                                 text: DIALOG_CANCEL_BUTTON_TEXT,
                                 class: 'buttonStandard',
                                 click: function (event) {
                                     // ######## bug fix jiyong.jung 2021.12.21 dirty remove ########
                                     $(this).find('[data-dirty]').removeAttr('data-dirty');
                                     $(this).dialog("close");
                                 }
                             },
                             {
                                 text: DESELECT_ALL_TEXT,
                                 class: 'buttonStandard',
                                 id: 'btnSelectDeselectAllShowHideColumns',
                                 click: function (event) {
                                     let oButton = $('#btnSelectDeselectAllShowHideColumns');
                                     let sButtonText = oButton.button().text();
                                     if(sButtonText == DESELECT_ALL_TEXT) {
                                         let aoCheckboxes = oHideShowColumnsDialog.find('.csTableFilterCheckbox');
                                         for (let i = 0; i < aoCheckboxes.length; i++) {
                                             if($(aoCheckboxes[i]).is(":checked")) {
                                                 $(aoCheckboxes[i]).trigger('click');
                                             }
                                         }
                                         oButton.button('option', 'label', SELECT_ALL_TEXT);
                                     } else {
                                         let aoCheckboxes = oHideShowColumnsDialog.find('.csTableFilterCheckbox');
                                         for (let i = 0; i < aoCheckboxes.length; i++) {
                                             if(!$(aoCheckboxes[i]).is(":checked")) {
                                                 $(aoCheckboxes[i]).trigger('click');
                                             }
                                         }
                                         oButton.button('option', 'label', DESELECT_ALL_TEXT);
                                     }
                                     // ######## bug fix jiyong.jung 2021.12.21 dirty remove ########
                                     $(this).find('[data-dirty]').removeAttr('data-dirty');
                                 }
                             }
                         ],
                         open: function () {
                             let oFilterRows = oHideShowColumnsDialog.find('tr.TableHideShowColumn');
                             let sSelectButtonText = DESELECT_ALL_TEXT;
                             for (let i = 0; i < oFilterRows.length; i++) {
                                 let oCheckbox = $(oFilterRows[i]).find('.csTableFilterCheckbox');
                                 let bChecked = oCheckbox.is(":checked");
 
                                 if(!bChecked) {
                                     sSelectButtonText = SELECT_ALL_TEXT;
                                     break;
                                 }
                             }
                             let oButton = $('#btnSelectDeselectAllShowHideColumns');
                             oButton.button('option', 'label', sSelectButtonText);
 
                             if(aHideColumns.length == 0) {
                                 let aoCheckboxes = oHideShowColumnsDialog.find('.csTableFilterCheckbox');
                                 for (let i = 0; i < aoCheckboxes.length; i++) {
                                     if(!$(aoCheckboxes[i]).is(":checked")) {
                                         $(aoCheckboxes[i]).trigger('click');
                                     }
                                 }
                             }
 
 
                             oHideShowColumnsDialog.find('tr').off().on('click', function (e) {
                                 if(e.target.type != 'checkbox') {
                                     let oCheckbox = $(this).find('.csTableFilterCheckbox');
                                     oCheckbox.trigger('click');
                                 }
                             });
 
                             oHideShowColumnsDialog.find('.csTableFilterCheckbox').off().on('change', function () {
                                 let oFilterRows = oHideShowColumnsDialog.find('tr.TableHideShowColumn');
                                 let sSelectButtonText = DESELECT_ALL_TEXT;
                                 for (let i = 0; i < oFilterRows.length; i++) {
                                     let oCheckbox = $(oFilterRows[i]).find('.csTableFilterCheckbox');
                                     let bChecked = oCheckbox.is(":checked");
 
                                     if(!bChecked) {
                                         sSelectButtonText = SELECT_ALL_TEXT;
                                         break;
                                     }
                                 }
                                 let oButton = $('#btnSelectDeselectAllShowHideColumns');
                                 oButton.button('option', 'label', sSelectButtonText);
                             });
 
                             bDialogOpen = true;
 
                             $(document).on('click', function (e) {
                                 //Close dialog when clicking outside it
                                 if(bDialogOpen) {
                                     let oClicked = $(e.target);
                                     let oDialogInstance = oHideShowColumnsDialog.dialog('instance');
                                     let oDialogContainer = oDialogInstance.uiDialog;
                                     if(oClicked.is('.csTableShowHideColumnsButton') ||
                                         oClicked.parents().is(oDialogContainer) ||
                                         oClicked.is(oDialogContainer)
                                     ) {
                                         return;
                                     } else {
                                         bDialogOpen = false;
                                         oHideShowColumnsDialog.dialog("close");
                                     }
                                 }
                             });
                         },
                         close: function () {
                             // ######## bug fix jiyong.jung 2021.12.21 dirty remove ########
                             $(this).find('[data-dirty]').removeAttr('data-dirty');
                             $(this).hide();
                         }
                     });
                 });
                 //endregion HideShowColumns
*/
             }