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
             }