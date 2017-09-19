!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};__webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=13)}([function(module,exports,__webpack_require__){"use strict";var THREEx=THREEx||{};THREEx.ArPatternFile={},THREEx.ArPatternFile.toCanvas=function(patternFileString,onComplete){console.assert(!1,"not yet implemented")},THREEx.ArPatternFile.encodeImageURL=function(imageURL,onComplete){var image=new Image;image.onload=function(){var patternFileString=THREEx.ArPatternFile.encodeImage(image);onComplete(patternFileString)},image.src=imageURL},THREEx.ArPatternFile.encodeImage=function(image){var canvas=document.createElement("canvas"),context=canvas.getContext("2d");canvas.width=16,canvas.height=16;for(var patternFileString="",orientation=0;orientation>-2*Math.PI;orientation-=Math.PI/2){context.save(),context.clearRect(0,0,canvas.width,canvas.height),context.translate(canvas.width/2,canvas.height/2),context.rotate(orientation),context.drawImage(image,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height),context.restore();var imageData=context.getImageData(0,0,canvas.width,canvas.height);0!==orientation&&(patternFileString+="\n");for(var channelOffset=2;channelOffset>=0;channelOffset--)for(var y=0;y<imageData.height;y++){for(var x=0;x<imageData.width;x++){0!==x&&(patternFileString+=" ");var offset=y*imageData.width*4+4*x+channelOffset,value=imageData.data[offset];patternFileString+=String(value).padStart(3)}patternFileString+="\n"}}return patternFileString},THREEx.ArPatternFile.triggerDownload=function(patternFileString){var domElement=window.document.createElement("a");domElement.href=window.URL.createObjectURL(new Blob([patternFileString],{type:"text/plain"})),domElement.download="generated-marker.patt",document.body.appendChild(domElement),domElement.click(),document.body.removeChild(domElement)},THREEx.ArPatternFile.buildFullMarker=function(innerImageURL,onComplete){var canvas=document.createElement("canvas"),context=canvas.getContext("2d");canvas.width=canvas.height=512,context.fillStyle="white",context.fillRect(0,0,canvas.width,canvas.height),context.fillStyle="black",context.fillRect(.1*canvas.width,.1*canvas.height,.8*canvas.width,.8*canvas.height),context.fillStyle="white",context.fillRect((.1+.2)*canvas.width,(.1+.2)*canvas.height,canvas.width*(1-2*(.1+.2)),canvas.height*(1-2*(.1+.2)));var innerImage=document.createElement("img");innerImage.addEventListener("load",function(){context.drawImage(innerImage,(.1+.2)*canvas.width,(.1+.2)*canvas.height,canvas.width*(1-2*(.1+.2)),canvas.height*(1-2*(.1+.2)));var imageUrl=canvas.toDataURL();onComplete(imageUrl)}),innerImage.src=innerImageURL}},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("aboutCtrl",function($scope){$scope.algo="about",$(document).ready(function(){$(".parallax").parallax()})})},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("appCtrl",function($scope,$location,$rootScope,Upload,$timeout,$http){$scope.arrow={},$scope.arrow.profile=!1,$scope.arrow.advOptions=!1,$scope.customOption=$rootScope.customOption,$scope.file="",$scope.list2=[],$scope.path=$rootScope.path,$scope.home=function(){$location.path("/home")},$scope.createMarker=function(){$location.path("/createMarker")},$scope.testMarker=function(){$scope.path="/testMarker",$location.path("/testMarker")},$scope.createModel=function(){$scope.path="/createModel2",$location.path("/createModel2")},$scope.isLogin=function(){return""!==$rootScope.login&&null!==$rootScope.login},$scope.updateGraph=function(){var newFunction=document.querySelector("#zFunctionText").value,scene=document.querySelector("#scene");scene.removeChild(scene.childNodes[3]),$rootScope.graph(newFunction,$scope.customOption)},$scope.graphGenerate=function(){$rootScope.exporter()},$scope.logout=function(){$rootScope.logout(),$rootScope.login=localStorage.getItem("token"),$scope.home()},$scope.eventArrowOption=function(){$scope.arrow.advOptions=!$scope.arrow.advOptions,$scope.arrow.typeOption="graph"},$scope.rawScreens=[[{icon:"./img/icons/facebook.jpg",title:"Facebook (a)",link:"https://www.facebook.com"},{icon:"./img/icons/youtube.jpg",title:"Youtube (a)",link:"https://www.youtube.com"},{icon:"./img/icons/gmail.jpg",title:"Gmail (a)",link:"http://www.gmail.com"},{icon:"./img/icons/google+.jpg",title:"Google+ (a)",link:"https://plus.google.com"},{icon:"./img/icons/twitter.jpg",title:"Twitter (a)",link:"https://www.twitter.com"},{icon:"./img/icons/yahoomail.jpg",title:"Yahoo Mail (a)",link:"http://mail.yahoo.com"},{icon:"./img/icons/pinterest.jpg",title:"Pinterest (a)",link:"https://www.pinterest.com"}],[]],$scope.fileLoad=function(){$http({method:"GET",url:"/model/:3",data:{},headers:{"Content-Type":"application/json;charset=utf-8"}}).then(function(data){var path=data.data.path,models=data.data.pathFilesName;$scope.list2=models.map(function(obj){return{name:obj,src:path+obj}})})},$scope.list1=[],$scope.list3=$scope.rawScreens[1],$scope.print=function(){console.log("marker",$rootScope.markers)},$scope.importFileObj=function(file){Upload.upload({url:"/model",method:"POST",data:{name:"pruebaImport"},file:file}).then(function(response){$scope.list2.push({name:response.data.pathFilesName,src:response.data.path+response.data.pathFilesName})}).catch(function(err){console.log("err",err.data.error)})},$scope.deleteFile=function(){var selectModel=$scope.list2.filter(function(obj){if(obj.check)return obj});$http({method:"DELETE",url:"/model/:3",data:{path:selectModel},headers:{"Content-Type":"application/json;charset=utf-8"}}).then(function(response){$scope.list2=$scope.list2.filter(function(obj){if(!obj.check)return obj})}).catch(function(err){console.log("err",err)})},$scope.sortableOptions={placeholder:"app",connectWith:".apps-container"}})},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("homeCtrl",function($scope,$http,$auth,$location,$rootScope){$scope.form,$http.get("/register").then(function(data){console.log(data),$scope.view=data.data}),$scope.login=function(){$http.post("/login",$scope.form,"json").then(function(data){localStorage.setItem("token",data.data.token),$rootScope.login=localStorage.getItem("token"),$rootScope.path="/testMarker",$location.path("/testMarker")},function(error){console.log("error",error)})},$scope.register=function(){$location.path("/register")}})},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("markerGenerateCtrl",function($scope,$http,$location){$scope.entrada="",$scope.imageQr="",$scope.markerGenerated="",$scope.buildMarker=function(imageQr){THREEx.ArPatternFile.buildFullMarker(imageQr,function(markerUrl){var markerImage=document.createElement("img");markerImage.src=markerUrl;for(var container=document.querySelector("#qr");container.firstChild;)container.removeChild(container.firstChild);container.appendChild(markerImage),$scope.markerGenerated=markerImage})},$scope.pattFileGenerate=function(imageQr,markerGenerated){null!==imageQr&&void 0!==imageQr&&null!==markerGenerated&&void 0!==markerGenerated&&THREEx.ArPatternFile.encodeImageURL(imageQr,function(patternFileString){var file=new FileReader;file.readAsDataURL(new Blob([patternFileString],{type:"text/plain"})),file.onload=function(){var data={};data.pattFile=file.result.substr(23),data.pattFileImage=markerGenerated.src.substr(21),data.name="gregory",data.asignature="vectorial",$http.post("/createMarker",data,"json").then(function(response){console.log("response",response)},function(error){console.log("error",error)})}})},$scope.markerGenerate=function(){var container=document.createElement("div");new QRCode(container,{text:$scope.entrada,width:256,height:256,colorDark:"#000000",colorLight:"#ffffff"});console.log("container",container);var canvasImg=container.querySelector("canvas"),image=canvasImg.toDataURL("image/png");$scope.imageQr=image,$scope.buildMarker(image)},$scope.generatePdf=function(){var docDefinition={content:[{image:$scope.markerGenerated.src,width:300,alignment:"center"}]};pdfMake.createPdf(docDefinition).open()},$scope.logout=function(){localStorage.clear(),$location.path("/home")}})},function(module,exports,__webpack_require__){"use strict";var _ImageImport=__webpack_require__(11),_ImageResize=__webpack_require__(12);angular.module("app").controller("mathEditorCtrl",function($scope){Quill.register("modules/imageImport",_ImageImport.ImageImport),Quill.register("modules/imageResize",_ImageResize.ImageResize);var toolbarOptions=[[{header:[1,2,3,4,5,6,!1]}],[{font:[]}],[{size:["small",!1,"large","huge"]}],["blockquote","code-block"],["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{align:[]}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{color:[]},{background:[]}],["link","image","video","formula"],["clean"]];new Quill("#editor",{theme:"snow",modules:{formula:!0,toolbar:toolbarOptions,history:{delay:1e3,maxStack:50,userOnly:!1},imageImport:!0,imageResize:{displaySize:!0}}});$scope.hola=function(){var remove=document.querySelector(".ql-toolbar"),editor=document.querySelector("#editor"),parent=remove.parentNode;parent.removeChild(remove),window.print(),window.close(),parent.insertBefore(remove,editor)}})},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("modelGenerateCtrl2",function($scope,$rootScope,$http){$("#menu-toggle").click(function(e){e.preventDefault(),$("#wrapper").toggleClass("toggled")}),$rootScope.graph($rootScope.zFuncTextR,$rootScope.customOption)})},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("registerCtrl",function($scope,$http,$auth,$location){$scope.form={},$scope.view={},$http.get("/register").then(function(data){console.log(data),$scope.view=data.data}),$scope.register=function(){$scope.form.rol=Number($scope.form.rol),$scope.form.school=Number($scope.form.school),console.log("register scope.form",$scope.form),$http.post("/register/:"+$scope.form.rol,$scope.form,"json").then(function(data){console.log("data",data)}).catch(function(response){console.log("log incorrecto")})},$scope.login=function(){$location.path("/")},$scope.filterNumberOnly=function($event){isNaN(String.fromCharCode($event.keyCode))&&$event.preventDefault()},$scope.filterLettersOnly=function($event){$event.which>=65&&$event.which<=90||8===$event.which||37===$event.which||39===$event.which||46===$event.which||9===$event.which||$event.preventDefault()}}),angular.module("app").filter("capitalize",function(){return function(input){return input?input.charAt(0).toUpperCase()+input.substr(1).toLowerCase():""}})},function(module,exports,__webpack_require__){"use strict";angular.module("app").controller("testMarkerCtrl",function($scope){function handleSceneLoaded(){document.querySelector("#camera").setAttribute("orbit-controls","enabled",!1),document.querySelector("#camera").setAttribute("position","0 2 10"),document.querySelector("#camera").setAttribute("orbit-controls","enabled",!0),document.querySelector("#camera").addEventListener("start-drag-orbit-controls"),document.querySelector("#camera").addEventListener("end-drag-orbit-controls")}$("#menu-toggle").click(function(e){e.preventDefault(),$("#wrapper").toggleClass("toggled")}),document.addEventListener("DOMContentLoaded",function(){var scene=document.querySelector("a-scene");scene.hasLoaded?addEventListeners():scene.addEventListener("loaded",handleSceneLoaded)})})},function(module,exports,__webpack_require__){"use strict";angular.module("app",["ngRoute","ngStorage","satellizer","ui.bootstrap","ui.sortable","ngFileUpload"]).run(function($http,$rootScope,$location){var scene=void 0;$rootScope.login=localStorage.getItem("token"),$rootScope.markers=[],$rootScope.entrada="",$rootScope.path=$location.path(),$rootScope.zFuncTextR="x^2 - y^2",$rootScope.customOption={},$rootScope.customOption.x={},$rootScope.customOption.y={},$rootScope.customOption.z={},$rootScope.customOption.x.min=-3,$rootScope.customOption.x.max=3,$rootScope.customOption.y.min=-3,$rootScope.customOption.y.max=3,$rootScope.customOption.z.min=-3,$rootScope.customOption.z.max=3,$rootScope.customOption.planeSize=6,$rootScope.customOption.planeSubdivition=10,$rootScope.customOption.axisSize=10,$rootScope.graph=function(zFuncTextR,customOption){function meshFunction(a,b){var x=xRange*a+xMin,y=yRange*b+yMin,z=zFunc(x,y);return isNaN(z)?new THREE.Vector3(0,0,0):new THREE.Vector3(x,y,z)}function render(){renderer.render(scene,camera)}var graphMesh=void 0,xMin=customOption.x.min||-3,xMax=customOption.x.max||3,xRange=xMax-xMin,yMin=customOption.y.min||-3,yMax=customOption.y.max||3,yRange=yMax-yMin,zMin=customOption.z.min||-3,zMax=customOption.z.min||3,zRange=zMax-zMin,zFuncText=zFuncTextR||"x^2 - y^2",zFunc=Parser.parse(zFuncText).toJSFunction(["x","y"]);scene=new THREE.Scene,scene.background=new THREE.Color(15790320);var SCREEN_WIDTH=window.innerWidth,SCREEN_HEIGHT=window.innerHeight,ASPECT=SCREEN_WIDTH/SCREEN_HEIGHT,camera=new THREE.PerspectiveCamera(45,ASPECT,.1,2e4);camera.position.set(2*xMax,.5*yMax,4*zMax),camera.up=new THREE.Vector3(0,0,1),camera.lookAt(scene.position),scene.add(camera),new THREE.OrbitControls(camera,document.getElementById("scene")).addEventListener("change",render);var helper=new THREE.GridHelper(customOption.planeSize,customOption.planeSubdivition);helper.rotateX(Math.PI/2),helper.material.opacity=.25,helper.material.transparent=!0,scene.add(helper);var axis=new THREE.AxisHelper(customOption.axisSize);scene.add(axis);var renderer=new THREE.WebGLRenderer;renderer.setSize(window.innerWidth,window.innerHeight),document.getElementById("scene").appendChild(renderer.domElement),camera.position.z=5,THREEx.WindowResize(renderer,camera).stop();var wireTexture=new THREE.ImageUtils.loadTexture;wireTexture.wrapS=THREE.RepeatWrapping,wireTexture.wrapT=THREE.RepeatWrapping,wireTexture.repeat.set(40,40);var wireMaterial=new THREE.MeshBasicMaterial({map:wireTexture,vertexColors:THREE.VertexColors,side:THREE.DoubleSide}),vertexColorMaterial=new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors,side:THREE.DoubleSide});renderer.setClearColor(8947848,1),xRange=xMax-xMin,yRange=yMax-yMin,zFunc=Parser.parse(zFuncText).toJSFunction(["x","y"]);var graphGeometry=new THREE.ParametricGeometry(meshFunction,80,80,!0);graphGeometry.computeBoundingBox(),zMin=graphGeometry.boundingBox.min.z,zMax=graphGeometry.boundingBox.max.z,zRange=zMax-zMin;for(var color=void 0,point=void 0,face=void 0,numberOfSides=void 0,vertexIndex=void 0,faceIndices=["a","b","c","d"],i=0;i<graphGeometry.vertices.length;i++)point=graphGeometry.vertices[i],color=new THREE.Color(255),color.setHSL(.7*(zMax-point.z)/zRange,1,.5),graphGeometry.colors[i]=color;for(var _i=0;_i<graphGeometry.faces.length;_i++){face=graphGeometry.faces[_i],numberOfSides=face instanceof THREE.Face3?3:4;for(var j=0;j<numberOfSides;j++)vertexIndex=face[faceIndices[j]],face.vertexColors[j]=graphGeometry.colors[vertexIndex]}graphMesh&&scene.remove(graphMesh),wireMaterial.map.repeat.set(80,80),graphMesh=new THREE.Mesh(graphGeometry,vertexColorMaterial),graphMesh.side=THREE.DoubleSide,scene.add(graphMesh)},$rootScope.exporter=function(){console.time("file");var exporter=new THREE.OBJExporter,model=LZMA.compress(exporter.parse(scene.children[3]),3),data={};data.model=model,data.name="model",data.asignature="vectorial",$http.post("/createModel2",data,"json").then(function(response){console.timeEnd("file end"),console.log("response",response)},function(error){console.log("error",error)})},$rootScope.logout=function(){localStorage.clear()},$rootScope.buildMarker=function(imageQr){THREEx.ArPatternFile.buildFullMarker(imageQr,function(markerUrl){var newMarker={};newMarker.imageQr=imageQr,newMarker.imageSrc=markerUrl,$rootScope.markers.unshift(newMarker),$rootScope.$apply()})},$rootScope.pattFileGenerate=function(imageQr,markerGenerated){null!==imageQr&&void 0!==imageQr&&null!==markerGenerated&&void 0!==markerGenerated&&THREEx.ArPatternFile.encodeImageURL(imageQr,function(patternFileString){var file=new FileReader;file.readAsDataURL(new Blob([patternFileString],{type:"text/plain"})),file.onload=function(){var data={};data.pattFile=file.result.substr(23),data.pattFileImage=markerGenerated.src.substr(21),data.name="gregory",data.asignature="vectorial",$http.post("/createMarker",data,"json").then(function(response){console.log("response",response)},function(error){console.log("error",error)})}})},$rootScope.markerGenerate=function(){$http.get("createMarker").then(function(data){var container=document.createElement("div"),canvasImg=(new QRCode(container,{text:data.data.time.now,width:256,height:256,colorDark:"#000000",colorLight:"#ffffff"}),container.querySelector("canvas")),image=canvasImg.toDataURL("image/png");$rootScope.buildMarker(image)}).catch(function(e){return console.error(e.stack)})},$rootScope.makerDelete=function(){$rootScope.markers=$rootScope.markers.filter(function(obj){if(!angular.isDefined(obj.check)||!obj.check)return obj})}})},function(module,exports,__webpack_require__){"use strict";angular.module("app").config(function($authProvider,$routeProvider,$httpProvider,$locationProvider){$authProvider.tokenName="token",$authProvider.tokenPrefix="ARvector",$authProvider.tokenHeader="Authorization",$authProvider.tokenType="Bearer",$authProvider.storageType="localStorage",$routeProvider.when("/",{templateUrl:"views/home.html",controller:"homeCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"aboutCtrl"}).when("/createMarker",{templateUrl:"views/createMarker.html",controller:"markerGenerateCtrl"}).when("/createModel2",{templateUrl:"views/createModel2.html",controller:"modelGenerateCtrl2"}).when("/testMarker",{templateUrl:"views/testMarker.html",controller:"testMarkerCtrl"}).when("/mathEditor",{templateUrl:"views/mathEditor.html",controller:"mathEditorCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"registerCtrl"}).otherwise({redirectTo:"/"}),$locationProvider.html5Mode(!0),$httpProvider.interceptors.push(function($q,$location,$localStorage){return{request:function(config){return config.headers=config.headers||{},localStorage.getItem("token")&&(config.headers.Authorization="Bearer "+localStorage.getItem("token")),config},responseError:function(response){return 401!==response.status&&403!==response.status||$location.path("/home"),$q.reject(response)}}})})},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();exports.ImageImport=function(){function ImageImport(quill){arguments.length>1&&void 0!==arguments[1]&&arguments[1];_classCallCheck(this,ImageImport),this.quill=quill,this.handleDrop=this.handleDrop.bind(this),this.handlePaste=this.handlePaste.bind(this),this.quill.root.addEventListener("drop",this.handleDrop,!1),this.quill.root.addEventListener("paste",this.handlePaste,!1)}return _createClass(ImageImport,[{key:"handleDrop",value:function(evt){evt.preventDefault(),evt.dataTransfer&&evt.dataTransfer.files&&evt.dataTransfer.files.length&&this.readFiles(evt.dataTransfer.files,this.insert.bind(this))}},{key:"handlePaste",value:function(evt){var _this=this;evt.clipboardData&&evt.clipboardData.items&&evt.clipboardData.items.length&&this.readFiles(evt.clipboardData.items,function(dataUrl){_this.quill.getSelection()||setTimeout(function(){return _this.insert(dataUrl)},0)})}},{key:"insert",value:function(dataUrl){var index=(this.quill.getSelection()||{}).index||this.quill.getLength();this.quill.insertEmbed(index,"image",dataUrl,"user")}},{key:"readFiles",value:function(files,callback){[].forEach.call(files,function(file){if(file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)){var reader=new FileReader;reader.onload=function(evt){callback(evt.target.result)};var blob=file.getAsFile?file.getAsFile():file;blob instanceof Blob&&reader.readAsDataURL(blob)}})}}]),ImageImport}()},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();exports.ImageResize=function(){function ImageResize(quill){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,ImageResize),this.quill=quill,this.options=options,this.handleClick=this.handleClick.bind(this),this.handleMousedown=this.handleMousedown.bind(this),this.handleMouseup=this.handleMouseup.bind(this),this.handleDrag=this.handleDrag.bind(this),this.checkImage=this.checkImage.bind(this),this.boxes=[],document.execCommand("enableObjectResizing",!1,"false"),this.quill.root.addEventListener("click",this.handleClick,!1)}return _createClass(ImageResize,[{key:"handleClick",value:function(evt){if(evt.target&&evt.target.tagName&&"IMG"==evt.target.tagName.toUpperCase()){if(this.img===evt.target)return;this.img&&this.hide(),this.show(evt.target)}else this.img&&this.hide()}},{key:"show",value:function(img){this.img=img,this.showResizers(),this.showSizeDisplay();var rect=this.img.getBoundingClientRect();this.positionBoxes(rect),this.positionSizeDisplay(rect)}},{key:"hide",value:function(){this.hideResizers(),this.hideSizeDisplay(),this.img=void 0}},{key:"showResizers",value:function(){this.setUserSelect("none"),this.addBox("nwse-resize"),this.addBox("nesw-resize"),this.addBox("nwse-resize"),this.addBox("nesw-resize"),document.addEventListener("keyup",this.checkImage,!0),this.quill.root.addEventListener("input",this.checkImage,!0)}},{key:"hideResizers",value:function(){document.removeEventListener("keyup",this.checkImage),this.quill.root.removeEventListener("input",this.checkImage),this.setUserSelect(""),this.setCursor(""),this.boxes.forEach(function(box){return document.body.removeChild(box)}),this.dragBox=void 0,this.dragStartX=void 0,this.preDragWidth=void 0,this.boxes=[]}},{key:"addBox",value:function(cursor){var box=document.createElement("div"),styles={position:"absolute",height:"12px",width:"12px",backgroundColor:"white",border:"1px solid #777",boxSizing:"border-box",opacity:"0.80",cursor:cursor};this.extend(box.style,styles,this.options.handleStyles||{}),box.addEventListener("mousedown",this.handleMousedown,!1),document.body.appendChild(box),this.boxes.push(box)}},{key:"extend",value:function(destination){for(var _len=arguments.length,sources=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)sources[_key-1]=arguments[_key];return sources.forEach(function(source){for(var prop in source)source.hasOwnProperty(prop)&&(destination[prop]=source[prop])}),destination}},{key:"positionBoxes",value:function(rect){var _this=this;[{left:rect.left-6,top:rect.top-6},{left:rect.left+rect.width-6,top:rect.top-6},{left:rect.left+rect.width-6,top:rect.top+rect.height-6},{left:rect.left-6,top:rect.top+rect.height-6}].forEach(function(pos,idx){_this.extend(_this.boxes[idx].style,{top:Math.round(pos.top+window.pageYOffset)+"px",left:Math.round(pos.left+window.pageXOffset)+"px"})})}},{key:"handleMousedown",value:function(evt){this.dragBox=evt.target,this.dragStartX=evt.clientX,this.preDragWidth=this.img.width||this.img.naturalWidth,this.setCursor(this.dragBox.style.cursor),document.addEventListener("mousemove",this.handleDrag,!1),document.addEventListener("mouseup",this.handleMouseup,!1)}},{key:"handleMouseup",value:function(){this.setCursor(""),document.removeEventListener("mousemove",this.handleDrag),document.removeEventListener("mouseup",this.handleMouseup)}},{key:"handleDrag",value:function(evt){if(this.img){this.dragBox==this.boxes[0]||this.dragBox==this.boxes[3]?this.img.width=Math.round(this.preDragWidth-evt.clientX-this.dragStartX):this.img.width=Math.round(this.preDragWidth+evt.clientX-this.dragStartX);var rect=this.img.getBoundingClientRect();this.positionBoxes(rect),this.positionSizeDisplay(rect)}}},{key:"setUserSelect",value:function(value){var _this2=this;["userSelect","mozUserSelect","webkitUserSelect","msUserSelect"].forEach(function(prop){_this2.quill.root.style[prop]=value,document.documentElement.style[prop]=value})}},{key:"setCursor",value:function(value){[document.body,this.img,this.quill.root].forEach(function(el){return el.style.cursor=value})}},{key:"checkImage",value:function(){this.img&&this.hide()}},{key:"showSizeDisplay",value:function(){if(this.options.displaySize){this.display=document.createElement("div");var styles={position:"absolute",font:"12px/1.0 Arial, Helvetica, sans-serif",padding:"4px 8px",textAlign:"center",backgroundColor:"white",color:"#333",border:"1px solid #777",boxSizing:"border-box",opacity:"0.80",cursor:"default"};this.extend(this.display.style,styles,this.options.displayStyles||{}),document.body.appendChild(this.display)}}},{key:"hideSizeDisplay",value:function(){document.body.removeChild(this.display),this.display=void 0}},{key:"positionSizeDisplay",value:function(rect){if(this.display&&this.img){var size=this.getCurrentSize();if(this.display.innerHTML=size.join(" &times; "),size[0]>120&&size[1]>30){var dispRect=this.display.getBoundingClientRect();this.extend(this.display.style,{left:Math.round(rect.left+rect.width+window.pageXOffset-dispRect.width-8)+"px",top:Math.round(rect.top+rect.height+window.pageYOffset-dispRect.height-8)+"px"})}else this.extend(this.display.style,{left:Math.round(rect.left+rect.width+window.pageXOffset+8)+"px",top:Math.round(rect.top+rect.height+window.pageYOffset+8)+"px"})}}},{key:"getCurrentSize",value:function(){return[this.img.width,Math.round(this.img.width/this.img.naturalWidth*this.img.naturalHeight)]}}]),ImageResize}()},function(module,exports,__webpack_require__){"use strict";__webpack_require__(9),__webpack_require__(10),__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(6),__webpack_require__(8),__webpack_require__(5),__webpack_require__(7),__webpack_require__(0)}]);