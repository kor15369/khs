(() => {
    const container = document.getElementById('weboffice_container');
    if (container) {
        container.style.flex = '1 auto';

        let webOfficeAPI;
        const Utils = {
            fileOpen(callback, isMultiple) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.multiple = isMultiple ? isMultiple : false;
                fileInput.onchange = () => {
                    const files = [];
                    for (let i = 0; i < fileInput.files.length; i += 1) {
                        const file = fileInput.files[i];
                        const blob = new Blob([file], { type: file.type });
                        files.push({ name: file.name, blob });
                    }
                    callback(isMultiple ? files : files[0]);
                };
                fileInput.click();
            },
            fileSave(fileName, blob) {
                const link = document.createElement('a');
                link.style.display = 'none';
                document.body.appendChild(link);

                const url = window.URL.createObjectURL(blob);
                link.href = url;
                link.download = fileName;
                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            },
            saveStorage(key, value) {
				//debugger;
				console.log(`key : ${key}, value : ${value}`);
                sessionStorage.setItem(key, value);
            },
            loadStorage(key) {
                const value = sessionStorage.getItem(key);
                sessionStorage.removeItem(key);
                return value;
            },
            objectAlert(object) {
                alert(JSON.stringify(object));
            },
            createButton(title, onclick) {
                const button = document.createElement('button');
                button.innerText = title;
                button.onclick = onclick;
                return button;
            }
        };

        const Tools = {
            documentType: (initValue) => {
                const select = document.createElement('select');
                select.innerHTML = `
					<option value='sheet'>sheet</option>
					<option value='slide'>slide</option>
					<option value='word'>word</option>
					<option value='hwp'>hwp</option>
                `;
                select.value = initValue;
                select.onchange = () => {
                    Utils.saveStorage('documentType', select.value);
                    window.location.reload(true);
                };
                return select;
            },
            viewMode: (initValue) => {
                const select = document.createElement('select');
                select.innerHTML = `
                    <option value='edit'>edit</option>
                    <option value='read'>read</option>
					<option value='presentation'>presentation</option>
                `;
                select.value = initValue;
                select.onchange = () => {
                    Utils.saveStorage('viewMode', select.value);
                    window.location.reload(true);
                };
                return select;
            },
            openButton: (isNew) =>
                isNew
                    ? Utils.createButton('New document', () => {
                          webOfficeAPI
                              .openNewDocument()
                              .then(() => {
                                  console.log('Success');
                              })
                              .catch((error) => {
                                  console.log(error.message);
                              });
                      })
                    : Utils.createButton('Open document', () => {
                          Utils.fileOpen((file) => {
                              webOfficeAPI
                                  .openDocument({
                                      name: file.name,
                                      blob: file.blob
                                  })
                                  .then(() => {
                                      console.log('Success');
                                  })
                                  .catch((error) => {
                                      console.log(error.message);
                                  });
                          });
                      }),
            saveButton: () =>
                Utils.createButton('Save document', () => {
					//debugger;
                    webOfficeAPI
                        .saveDocument()
                        .then((document) => {
                            Utils.fileSave(document.name, document.blob);
                            console.log('Success');
                            console.log(`document : ${JSON.stringify(document)}`);
                            
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }),
            SDKInfoButton: () =>
                Utils.createButton('SDK information', () => {
                    //Utils.objectAlert(webOfficeAPI.getSDKInformation());
                    Utils.objectAlert(document.blobs);
                }),
            documentInfoButton: () =>
                Utils.createButton('Document information', () => {
                    Utils.objectAlert(webOfficeAPI.getDocumentInformation());
                }),
            isModidfiedButton: () =>
                Utils.createButton('IsModified', () => {
                    Utils.objectAlert(webOfficeAPI.isModidfied());
                }),
            exportAsImageButton: () =>
                Utils.createButton('exportAsImage', () => {
                    webOfficeAPI
                        .exportAsImage()
                        .then((document) => {
                            if (document.blobs) {
                                document.blobs.forEach((blob) => {
                                    Utils.fileSave('image', blob);
                                });
                                console.log('Success');
                                console.log(`${JSON.stringify(document)}`);
                            }
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }),
            
        };

        let documentType = Utils.loadStorage('documentType');
        if (!documentType) {
            documentType = 'word';
        }
        let viewMode = Utils.loadStorage('viewMode');
        if (!viewMode) {
            viewMode = 'edit';
        }
        console.log(`documentType : ${documentType}, viewMode : ${viewMode}`);
		
        const toolbar = document.getElementById('test_toolbar');
        toolbar.style.display = 'flex';
        toolbar.style.height = '30px';
        toolbar.style.boxSizing = 'border-box';
        toolbar.style.borderBottom = '1px solid';
        toolbar.style.flexShrink = '0';
        toolbar.appendChild(Tools.documentType(documentType));
        toolbar.appendChild(Tools.viewMode(viewMode));
        toolbar.appendChild(Tools.openButton(true));
        toolbar.appendChild(Tools.openButton(false));
        toolbar.appendChild(Tools.saveButton());
        toolbar.appendChild(Tools.SDKInfoButton());
        toolbar.appendChild(Tools.documentInfoButton());
        toolbar.appendChild(Tools.isModidfiedButton());
        toolbar.appendChild(Tools.exportAsImageButton());
        
        const config = {
            documentType: documentType,
            viewMode: viewMode,
            watermark: 'TEST PAGE',
            callback: {
                onClickFileMenu: () => {
                    alert('file menu clicked');
                },
                onClickEmailLink: () => {
                    alert('email link clicked');
                }
            }
        };

        // eslint-disable-next-line
        PolarisWebOffice('weboffice_container', config)
            .then((API) => {
                webOfficeAPI = API[documentType];
                console.log(`Start PolarisWebOffice config : ${JSON.stringify(config)}`);
                webOfficeAPI
                    .openNewDocument()
                    .then(() => {
                        console.log('Success');
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
})();
