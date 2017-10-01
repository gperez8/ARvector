import regeneratorRuntime from "regenerator-runtime";

angular.module('app')
    .controller('appCtrl', ($scope, $location, $rootScope, Upload, $timeout, $http) => {
        var tmpList = [];
        $scope.arrow = {};
        $scope.arrow.profile = false;
        $scope.arrow.advOptions = false;
        $scope.arrow.folderResource = false;
        $scope.arrow.folderGuide = false;
        $scope.fileCheckShow = false;
        $scope.customOption = $rootScope.customOption;
        $scope.file = '';
        $scope.models = [];
        $rootScope.login = localStorage.getItem('token');
        $rootScope.rolUser = localStorage.getItem('rolUser');
        $rootScope.pathTeacher = JSON.parse(localStorage.getItem('pathTeacher'));
        $rootScope.pathTmp = JSON.parse(localStorage.getItem('pathTmp'));
        $rootScope.markers = JSON.parse(localStorage.getItem('markers'));
        $rootScope.path = '/testMarker';

        $scope.home = () => {
            $location.path('/home');
        };

        $scope.createMarker = () => {
            $location.path('/createMarker');
        };

        $scope.testMarker = () => {
            $rootScope.path = '/testMarker';
            $location.path('/testMarker');
        };

        $scope.createModel = () => {
            $rootScope.path = '/createModel2';
            $location.path('/createModel2');
        };

        $scope.mathEditor = () => {
            $rootScope.path = '/mathEditor';
            $location.path('/mathEditor');
        };

        $scope.isLogin = () => {
            return $rootScope.login !== '' && $rootScope.login !== null;
        };

        $scope.updateGraph = () => {
            const newFunction = document.querySelector('#zFunctionText').value;
            const scene = document.querySelector('#scene');
            scene.removeChild(scene.childNodes[3]);
            $rootScope.graph(newFunction, $scope.customOption);
        };

        $scope.graphGenerate = () => {
            $rootScope.exporter();
        };

        $scope.logout = () => {
            $rootScope.login = '';
            $rootScope.rolUser = '';
            $rootScope.path = '';
            $rootScope.markers = [];
            tmpList = [];
            $scope.arrow = {};
            $scope.arrow.profile = false;
            $scope.arrow.advOptions = false;
            $scope.arrow.folderResource = false;
            $scope.arrow.folderGuide = false;
            $scope.fileCheckShow = false;
            $scope.customOption = '';
            $scope.file = '';
            $scope.models = [];
            $rootScope.login = '';
            $rootScope.rolUser = '';
            $rootScope.pathTeacher = '';
            $rootScope.pathTmp = '';
            localStorage.removeItem('markers');
            localStorage.removeItem('token');
            localStorage.removeItem('rol');
            localStorage.removeItem('pathTeacher');
            localStorage.removeItem('pathTmp');
            localStorage.clear();
            $scope.home();
        };

        $scope.eventArrowOption = () => {
            $scope.arrow.advOptions = !$scope.arrow.advOptions;
            $scope.arrow.typeOption = 'graph';
        };

        $scope.modelFileLoad = () => {
            $http({
                method: 'POST',
                url: '/model/:3',
                data: { path: $rootScope.pathTmp.pathModelTmp },
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            }).then((data) => {
                const pathClient = data.data.pathClient;
                const pathServer = data.data.pathServer;
                const models = data.data.pathFilesName;
                $scope.models = models.map((obj) => {
                    return {
                        name: obj,
                        src: pathClient + obj,
                        deleteSrc: pathServer + obj,
                    };
                });
            });
        };

        $scope.print = () => {
            console.log('marker', $rootScope.markers);
        };

        $scope.importFileObj = (file) => {

            console.log('$rootScope.pathTmp.pathModelTmp', $rootScope.pathTmp.pathModelTmp );

            Upload.upload({
                url: '/model',
                method: 'POST',
                data: { dirToSave: $rootScope.pathTmp.pathModelTmp },
                file: file,
            }).then((response) => {

                console.log('response.data.pathClient', response.data.pathClient);
                console.log('response.data.pathFilesName', response.data.pathFilesName);
                $scope.models.push({
                    name: response.data.pathFilesName,
                    src: response.data.pathClient + response.data.pathFilesName,
                    deleteSrc: response.data.pathServer + response.data.pathFilesName,
                })
            }).catch((err) => {
                console.log('err', err.data.error);
            });
        };

        $scope.modelFileDelete = () => {
            const selectModel = $scope.models.filter((obj) => {
                if (obj.check) return obj;
            });

            console.log('selectModel',selectModel);

            $http({
                method: 'DELETE',
                url: '/model/:3',
                data: { path: selectModel },
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            }).then((response) => {

                $scope.models = $scope.models.filter((obj) => {
                    if (!obj.check) return obj;
                });
            }).catch((err) => {
                console.log('err', err);
            }); 
        };

        $scope.markerDelete = () => {
            const selectMarker = $rootScope.markers.filter((obj) => {
                if (obj.check) return obj;
            });

            selectMarker.map((obj) => {
                if (obj.src.length >= 1) {
                    $scope.models.unshift(obj.src[0]);
                }
            });

            $http({
                method: 'DELETE',
                url: '/createMarker/:3',
                data: { path: selectMarker },
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            }).then((response) => {
                
                selectMarker.map((obj) => {
                    if (obj.src.length >= 1) {
                        $scope.deleteOfScene(obj.src[0].name);
                    }
                });

                $rootScope.markers = $rootScope.markers.filter((obj) => {
                    if (!angular.isDefined(obj.check) || !obj.check) {
                        return (obj);
                    }
                });

                //localStorage.removeItem('markers');
                localStorage.setItem('markers', JSON.stringify($rootScope.markers));
            }).catch((err) => {
                console.log('err', err);
            });
        };


        $scope.updateScene = (index) => {
            $timeout(() => {

                    $rootScope.markers[index].name = $rootScope.markers[index].src[0].name;

                    localStorage.setItem('markers', JSON.stringify($rootScope.markers));

                    const scene = document.querySelector('a-scene');
                    const assets = scene.querySelector('#a-assets');
                    const target = scene.querySelector('#target');

                    /* se crea un nuevo a-asset-item */
                    const newAssetItem = document.createElement('a-asset-item');
                    newAssetItem.setAttribute('id', $rootScope.markers[index].src[0].name);
                    newAssetItem.setAttribute('src', $rootScope.markers[index].src[0].src);

                    /* se inserta a-asset-item como hijo de a-assets */
                    assets.appendChild(newAssetItem);

                    /* se crea un nuevo a-marker */
                    const newAMarker = document.createElement('a-marker');
                    newAMarker.setAttribute('id', $rootScope.markers[index].src[0].name);
                    newAMarker.setAttribute('type', 'pattern');
                    newAMarker.setAttribute('url', $rootScope.markers[index].pattFilePath);

                    /* se crea un nuevo a-gltf-model (recurso a ser proyectado) */
                    const newGltfModel = document.createElement('a-gltf-model');
                    newGltfModel.setAttribute('src', `#${$rootScope.markers[index].src[0].name}`);
                    newGltfModel.setAttribute('position', '0 0.5 0');
                    newGltfModel.setAttribute('scale', '0.5 0.5 0.5');

                    newAMarker.appendChild(newGltfModel);
                    target.appendChild(newAMarker);

                    if ($rootScope.markers[index].src.length > 1) {
                        $scope.deleteOfScene($rootScope.markers[index].src[1].name);
                        $scope.models.unshift($rootScope.markers[index].src.pop()); 
                    }
            }, 0);
        };

        $scope.deleteOfScene = (nameModel) => {
            const scene = document.querySelector('a-scene');
            const assetItemParent = scene.querySelector('#a-assets');
            const markersParent = scene.querySelector('#target');
            let position;

            const assetItemParentNodes = assetItemParent.childNodes;

            assetItemParentNodes.forEach((element, index) => {
                if (typeof element.id === 'string' && element.id === nameModel) {
                    assetItemParent.removeChild(assetItemParent.childNodes[index]);
                    markersParent.removeChild(markersParent.childNodes[index]);
                    return;
                }
            });
        };

        $scope.generatePdf = () => {
            const markersWithResources = $rootScope.markers.filter((obj) => {
                if (obj.src.length >= 1) {
                    return obj;
                }
            });

            let i = 0;
            const content = [];
            let rowImg = {};
            rowImg.columns = [];
            let rowText = {};
            rowText.columns = [];

            markersWithResources.map((obj) => {
                const columnInfoImg = {};
                const columnInfoText = {};

                columnInfoImg.alignment = 'center';
                columnInfoImg.image = obj.markerImage;
                columnInfoImg.width = 250;
                columnInfoImg.margin = [0, 0, 0, 0];

                columnInfoText.alignment = 'center';
                columnInfoText.text = obj.name;
                columnInfoText.margin = [0,0];

                rowImg.columns.push(columnInfoImg);
                rowText.columns.push(columnInfoText);

                if (rowImg.columns.length === 2) {
                    Object.assign(content[i], ...rowImg.columns);
                    Object.assign(content[i + 1], ...rowText.columns);
                    rowImg = {};
                    rowImg.columns = [];
                    rowText = {};
                    rowText.columns = [];
                    i = i+2;
                } else {
                    content[i] = rowImg;
                    if (i+1 === markersWithResources.length) {
                        content[i] = {
                            alignment: 'center',
                            image: rowImg.columns[0].image,
                            width: 250,
                        };
                        content[i + 1] = { 
                            text: rowText.columns[0].text, 
                            alignment: 'center' 
                        };
                    } else {
                        content[i + 1] = rowText;
                    }
                }
            });

            const docDefinition = {
                pageMargins: [ 50, 10, 50, 10 ],
                content,
            };

            pdfMake.createPdf(docDefinition).open();
        };

        $scope.insertImage = (index) => {
            if (!angular.isDefined($rootScope.markers[index].markerImage)) {
               (async () => {
                    await   $http({
                                method: 'POST',
                                url: '/image64',
                                data: { path: $rootScope.markers[index].imgFileDir },
                                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                            }).then((response) => {
                                const markers = JSON.parse(localStorage.getItem('markers'));
                                markers[index].markerImage = response.data.img;
                                $rootScope.markers[index].markerImage = response.data.img;
                                localStorage.setItem('markers', JSON.stringify(markers));
                            });
                })();
            }

            (async () => {
                await $timeout(() => {
                    const file = new FileReader();
                    const doc = document.querySelector('.ql-editor');
                    const image = document.createElement('img');
                    image.setAttribute('src', $rootScope.markers[index].markerImage);

                    const p = document.createElement('p');
                    p.appendChild(image);
                    doc.appendChild(p);
                }, 1000);
            })();
        };



        $scope.pdfGenerate = () => {
            const mathEditor = document.querySelector('.ql-editor');
            mathEditor.setAttribute('id', 'mathEditor');
            xepOnline.Formatter.Format('mathEditor', { render: 'download' });
        };

        $scope.saveResource = () => {
            $http({
                method: 'POST',
                url: '/image64',
                //data: { path:  },
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
            }).then((response) => {

            }); 
       };  

        $scope.sortableOptions = {
            placeholder: 'app',
            connectWith: '.apps-container',
        };
    });