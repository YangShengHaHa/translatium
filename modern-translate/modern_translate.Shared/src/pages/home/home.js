!function(){"use strict";var t,i=WinJS.Utilities,e=WinJS.Binding,n=WinJS.UI,a=WinJS.Application,s=WinJS.Navigation,o=Windows.Storage.ApplicationData.current,r=o.localSettings,l=o.roamingSettings;n.Pages.define("/pages/home/home.html",{ready:function(t,n){var o=this;this.liveCardTemplate=t.querySelector(".live-card-template").winControl,this.normalCardTemplate=t.querySelector(".normal-card-template").winControl,this.progressHistory=t.querySelector(".history-footer .progress"),this.progressFavorites=t.querySelector(".favorites-footer .progress"),this.dtInputLang=t.querySelector("#dt-input-lang"),this.imeContainer=t.querySelector(".ime-container"),this.backDrop=t.querySelector(".backdrop"),this.selectLanguage=t.querySelector(".select-language"),this.inputBox=t.querySelector("#input-box"),this.pivotView=t.querySelector("#pivot").winControl,this.toolBar=t.querySelector(".toolbar").winControl,1==l.values["prevent-lock"]&&null==window.dispRequest&&(window.dispRequest=new Windows.System.Display.DisplayRequest,window.dispRequest.requestActive());var u=!1,g=!1;this.bindingData=e.as({labelClearHistory:WinJS.Resources.getString("clear_history").value,selectMode:"hidden",imeMode:"",inputLang:"undefined"==typeof r.values.inputLang?"en":r.values.inputLang,tmpinputLang:r.values.inputLang,outputLang:"undefined"==typeof r.values.outputLang?"es":r.values.outputLang,inputText:a.sessionState.inputText?a.sessionState.inputText:"",expandinputBox:!1,isPremium:Custom.Utils.isPremium(),languageTemplate:e.initializer(function(t){return t.then(function(t){var i=document.createElement("div");return i.className="language-item material-text",i.innerText=t.data.language_name?t.data.language_name:WinJS.Resources.getString(t.data.language_id).value,i})}),languageGroupTemplate:e.initializer(function(t){return t.then(function(t){var i=document.createElement("div");return i.className="language-group material-text themed-text",1==t.data.main?i.innerText=WinJS.Resources.getString("all").value:(i.innerText=WinJS.Resources.getString("recent").value,i.style.marginTop="10px"),i})}),languageInvoked:e.initializer(function(t){o.hideDropdown();var i=t.detail.itemIndex,e=Custom.Data.groupedlanguageList.getAt(i).language_id;"inputLang"==o.bindingData.selectMode&&("auto"!=o.bindingData.inputLang&&e==o.bindingData.outputLang?o.swapLanguage():o.bindingData.inputLang=e),"outputLang"==o.bindingData.selectMode&&(e==o.bindingData.inputLang?o.swapLanguage():o.bindingData.outputLang=e)}),cardTemplate:e.initializer(function(t){return t.then(function(i){return"live"===i.data.type?o.liveCardTemplate.renderItem(t):o.normalCardTemplate.renderItem(t)})}),cardLayout:{type:WinJS.Class.define(function(t){this._site=null,this._surface=null},{initialize:function(t){return this._site=t,this._surface=this._site.surface,WinJS.Utilities.addClass(this._surface,"card-layout"),WinJS.UI.Orientation.vertical},uninitialize:function(){WinJS.Utilities.removeClass(this._surface,"card-layout"),this._site=null,this._surface=null}})},historyList:new WinJS.Binding.List([]),loadmoreHistory:e.initializer(function(t){var e=t?t.detail.visible:!0;return e?WinJS.Promise.as().then(function(){if(!u){u=!0,i.removeClass(o.progressHistory,"hide");var t="SELECT * FROM history ORDER BY id DESC LIMIT 0,5";if(o.bindingData.historyList.length>0){var e=o.bindingData.historyList.getAt(o.bindingData.historyList.length-1);"live"!=e.type&&(t="SELECT * FROM history WHERE id < "+e.id+" ORDER BY id DESC LIMIT 0,5")}return Custom.SQLite.localDatabase.executeAsync(t).then(function(t){t.forEach(function(t){var i=Custom.SQLite.entriestoObj(t.entries);o.bindingData.historyList.push(i)}),u=!1})}}).then(function(){i.addClass(o.progressHistory,"hide")}):void i.addClass(o.progressHistory,"hide")}),favoriteList:new WinJS.Binding.List([]),loadmoreFavorite:e.initializer(function(t){var e=t?t.detail.visible:!0;return e?WinJS.Promise.as().then(function(){if(!g){g=!0,i.removeClass(o.progressFavorites,"hide");var t="9223372036854775807";o.bindingData.favoriteList.length>0&&(t=o.bindingData.favoriteList.getAt(o.bindingData.favoriteList.length-1).id);var e="SELECT * FROM favorites WHERE id < "+t+" ORDER BY id DESC LIMIT 0,5";return Custom.SQLite.localDatabase.executeAsync(e).then(function(t){t.forEach(function(t){var i=Custom.SQLite.entriestoObj(t.entries);o.bindingData.favoriteList.push(i)}),g=!1})}}).then(function(){i.addClass(o.progressFavorites,"hide")}):void i.addClass(o.progressFavorites,"hide")}),onclickinputLang:e.initializer(function(t){o.bindingData.imeMode="","inputLang"==o.bindingData.selectMode?o.bindingData.selectMode="hidden":o.bindingData.selectMode="inputLang"}),onclickoutputLang:e.initializer(function(t){o.bindingData.imeMode="","outputLang"==o.bindingData.selectMode?o.bindingData.selectMode="hidden":o.bindingData.selectMode="outputLang"}),onclickbackDrop:e.initializer(function(){o.bindingData.selectMode="hidden"}),onclickSwap:e.initializer(function(t){o.swapLanguage()}),oninputText:e.initializer(function(t){o.bindingData.inputText=o.inputBox.value}),onkeydownText:0==l.values["enter-to-translate"]?null:e.initializer(function(t){13==(t.keyCode||t.which)&&(o.inputBox.blur(),t.preventDefault(),o.addTranslation())}),onclickClearHistory:e.initializer(function(t){if(o.bindingData.historyList.length>0){Custom.Utils.showNotif(WinJS.Resources.getString("clearing_history").value);var i=0;"live"==o.bindingData.historyList.getAt(0).type&&(i=1),o.bindingData.historyList.splice(i,o.bindingData.historyList.length);var e="DELETE FROM history";Custom.SQLite.localDatabase.executeAsync(e).then(function(){Custom.Utils.hideNotif()})}}),onclickAbout:e.initializer(function(t){s.navigate("/pages/about/about.html")}),onclickSettings:e.initializer(function(t){s.navigate("/pages/settings/settings.html")}),onclickPin:e.initializer(function(t){s.navigate("/pages/p-pin/p-pin.html")}),onclickBuyNow:e.initializer(function(t){s.navigate("/pages/premium/premium.html")}),onclickClear:e.initializer(function(t){o.bindingData.inputText=""}),onclickWrite:e.initializer(function(t){o.bindingData.imeMode="write"!=o.bindingData.imeMode?"write":"",""!=o.bindingData.imeMode&&(o.bindingData.expandinputBox=!1)}),onclickSpeak:e.initializer(function(t){return i.hasClass(this,"disabled")?void Custom.Utils.popupMsg(WinJS.Resources.getString("sorry").value,WinJS.Resources.getString("speech_not_available").value.replace("{1}",WinJS.Resources.getString(o.bindingData.inputLang).value)):(o.bindingData.imeMode="speak"!=o.bindingData.imeMode?"speak":"",void(""!=o.bindingData.imeMode&&(o.bindingData.expandinputBox=!1)))}),onclickCamera:e.initializer(function(e){if(i.hasClass(this,"disabled"))return void Custom.Utils.popupMsg(WinJS.Resources.getString("sorry").value,WinJS.Resources.getString("camera_not_available").value.replace("{1}",WinJS.Resources.getString(o.bindingData.inputLang).value));var n=new Windows.Storage.Pickers.FileOpenPicker;if(n.suggestedStartLocation=Windows.Storage.Pickers.PickerLocationId.picturesLibrary,n.fileTypeFilter.append(".jpg"),n.fileTypeFilter.append(".jpeg"),n.fileTypeFilter.append(".png"),1==Custom.Device.isPhone)n.pickSingleFileAndContinue();else{var a=t.querySelector("#cameraMenu").winControl;a.show(this,"bottom")}}),onclickForward:e.initializer(function(t){o.addTranslation()}),onselectionchangedpivotView:e.initializer(function(t){var i=t.detail.item;1==o.pivotView.selectedIndex?(o.bindingData.historyList.splice(0,o.bindingData.historyList.length),o.bindingData.loadmoreFavorite().then(function(){0==o.bindingData.favoriteList.length?(i.element.querySelector(".empty").style.display="",i.element.querySelector("#favorite-list").style.display="none"):(i.element.querySelector(".empty").style.display="none",i.element.querySelector("#favorite-list").style.display="")})):0==o.pivotView.selectedIndex&&(o.bindingData.favoriteList.splice(0,o.bindingData.favoriteList.length),o.bindingData.loadmoreHistory())}),onclickExpand:e.initializer(function(t){o.bindingData.expandinputBox=!o.bindingData.expandinputBox,o.bindingData.imeMode=""}),onclickOutside:e.initializer(function(t){o.bindingData.imeMode=""}),onclickOpenCamera:e.initializer(function(){var t=new Windows.Media.Capture.CameraCaptureUI;return t.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function(t){t&&s.navigate("/pages/p-camera/p-camera.html",{file:t})})}),onclickOpenGallery:e.initializer(function(){var t=new Windows.Storage.Pickers.FileOpenPicker;t.suggestedStartLocation=Windows.Storage.Pickers.PickerLocationId.picturesLibrary,t.fileTypeFilter.append(".jpg"),t.fileTypeFilter.append(".jpeg"),t.fileTypeFilter.append(".png"),t.pickSingleFileAsync().done(function(t){t&&s.navigate("/pages/p-camera/p-camera.html",{file:t})})})}),e.processAll(t,this.bindingData),e.bind(this.bindingData,{inputLang:function(t){r.values.inputLang=t,o.bindingData.tmpinputLang=t,"auto"!=t&&o.updateRecent(),o.liveTranslation()},outputLang:function(t){r.values.outputLang=t,o.updateRecent(),o.liveTranslation()},selectMode:function(t){"hidden"==t?o.hideDropdown():o.showDropdown(o.bindingData.selectMode)},imeMode:function(t){o.imeControl&&(o.imeControl.dispose(),o.imeControl=null),o.imeContainer.className="ime-container",o.imeContainer.innerHTML="",o.applyText(),""!=t&&("write"==t&&(o.imeControl=new Custom.Control.Write(o.imeContainer)),"speak"==t&&(o.imeControl=new Custom.Control.Speak(o.imeContainer)),o.imeControl.onedit=function(t){0==t.eType?o.addText(t.eText):1==t.eType?o.deleteText():2==t.eType&&o.applyText()})},inputText:function(t){o.inputBox.value!=t&&(o.inputBox.value=t),a.sessionState.inputText=t,o.liveTranslation()},expandinputBox:function(t,i){1==i&&(o.pivotView.selectedItem.element.style.transform="translate(-"+o.pivotView.selectedItem.element.style.left+", 0px)")}}),this.toolBar.forceLayout()},unload:function(t,i){window.soundPromise&&window.soundPromise.cancel(),null!=window.dispRequest&&(window.dispRequest.requestRelease(),window.dispRequest=null)},updateLayout:function(t,i){this.bindingData.imeMode=""},deleteText:function(){var t=this.inputBox.querySelector(".new-text");if(t)t.innerText="",t.className="";else{var i=this.inputBox.value;i.length>0&&(this.bindingData.inputText=i.substr(0,i.length-1))}},addText:function(t){var i=this.inputBox.querySelector(".new-text");i?i.innerText=t:(i=document.createElement("span"),i.innerText=t,i.className="new-text",this.inputBox.appendChild(i))},applyText:function(){var t=this.inputBox.querySelector(".new-text");t&&(t.className="",this.bindingData.inputText=this.inputBox.value)},hideDropdown:function(){this.element,i.removeClass(this.backDrop,"show"),i.removeClass(this.selectLanguage,"show")},showDropdown:function(t){var e=this.element,n=(e.querySelector("#language-list").winControl,!1);"auto"==Custom.Data.languageList.getAt(0).language_id&&(n=!0),"inputLang"==t&&(0==n&&Custom.Data.languageList.unshift({language_id:"auto",main:1}),i.removeClass(this.selectLanguage,"show-right"),i.addClass(this.selectLanguage,"show-left"),i.addClass(this.selectLanguage,"show")),"outputLang"==t&&(1==n&&Custom.Data.languageList.shift(),i.removeClass(this.selectLanguage,"show-left"),i.addClass(this.selectLanguage,"show-right"),i.addClass(this.selectLanguage,"show")),i.addClass(this.backDrop,"show")},swapLanguage:function(){if("auto"!=this.bindingData.inputLang){var t=this.element;WinJS.Utilities.toggleClass(t.querySelector("#swap"),"rotate");var i=this.bindingData.outputLang;this.bindingData.outputLang=this.bindingData.inputLang,this.bindingData.inputLang=i}},addTranslation:function(){var i=this;return t&&t.cancel(),WinJS.Promise.as().then(function(){var t=i.bindingData.inputLang,e=i.bindingData.outputLang,n=i.bindingData.inputText;return n.length<1?void 0:WinJS.Promise.as().then(function(){if(Custom.Utils.showNotif(WinJS.Resources.getString("translating").value),i.bindingData.historyList.length>0){var a=i.bindingData.historyList.getAt(0);if("live"==a.type&&(i.bindingData.historyList.splice(0,1),a.inputText==n&&a.inputLang==t&&a.outputLang==e))return a}return Custom.Translate.translate(t,e,n)}).then(function(t){return Custom.Utils.hideNotif(),t?(delete t.type,delete t.suggestedinputLang,delete t.suggestedinputText,Custom.SQLite.insertObject(Custom.SQLite.localDatabase,"history",t).then(function(t){i.bindingData.inputText="",t.type="normal",i.bindingData.historyList.unshift(t),i.bindingData.expandinputBox=!1})):Custom.Utils.popupNoInternet()})})},liveTranslation:function(){if(0!=l.values["realtime-translation"]&&1!=this.bindingData.expandinputBox){var i=this;t&&t.cancel(),t=WinJS.Promise.as().then(function(){var t=i.bindingData.inputLang,e=i.bindingData.outputLang,n=i.bindingData.inputText;return n.trim().length<1?(i.bindingData.historyList.length>0&&"live"==i.bindingData.historyList.getAt(0).type&&i.bindingData.historyList.splice(0,1),void("auto"==t&&(i.bindingData.tmpinputLang="auto"))):Custom.Translate.translate(t,e,n).then(function(e){return e?void(i.bindingData.inputText==n&&("auto"==t&&(i.bindingData.tmpinputLang=e.inputLang),e.type="live",e.id=null,i.bindingData.historyList.length>0&&"live"==i.bindingData.historyList.getAt(0).type?i.bindingData.historyList.splice(0,1,e):i.bindingData.historyList.unshift(e))):void(i.bindingData.historyList.length>0&&"live"==i.bindingData.historyList.getAt(0).type&&i.bindingData.historyList.splice(0,1))})})}},updateRecent:function(){var t=this.bindingData.inputLang,i=this.bindingData.outputLang,e=r.values.recent,n=[];e&&(n=JSON.parse(e));for(var a=Custom.Data.languageList.length-1;0==Custom.Data.languageList.getAt(a).main;)Custom.Data.languageList.pop(),a--;n.indexOf(t)<0&&"auto"!=t&&n.push(t),n.indexOf(i)<0&&n.push(i),n.splice(0,n.length-3),n.forEach(function(t){Custom.Data.languageList.push({language_id:t,language_name:WinJS.Resources.getString(t).value,main:0})}),r.values.recent=JSON.stringify(n)}})}();