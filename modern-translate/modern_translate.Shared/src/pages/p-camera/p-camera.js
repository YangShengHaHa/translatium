!function(){"use strict";var e=WinJS.Binding,t=WinJS.Navigation,n=WinJS.Application,i=WindowsPreview.Media.Ocr,r=Windows.Storage.ApplicationData.current,a=r.localSettings;r.roamingSettings,WinJS.UI.Pages.define("/pages/p-camera/p-camera.html",{ready:function(i,r){var o=this;this.previewImg=i.querySelector(".preview"),this.ocrText=i.querySelector(".text-overlay"),this.bgOverlay=i.querySelector(".bg-overlay"),this.zoomContainer=i.querySelector(".zoom-container"),this.previewImg.onload=function(){try{o.zoomContainer.msContentZoomFactor=(window.screen.width/o.previewImg.width).toFixed(2)}catch(e){}},t.history.current.initialPlaceholder=!0,this.bindingData=e.as({inputLang:a.values.inputLang,outputLang:a.values.outputLang,imgSrc:window.URL.createObjectURL(r.file,{oneTimeOnly:!0}),extractedText:"",onclickBack:e.initializer(function(){t.back()}),onclickSelect:e.initializer(function(){var e=new Windows.Storage.Pickers.FileOpenPicker;if(e.suggestedStartLocation=Windows.Storage.Pickers.PickerLocationId.picturesLibrary,e.fileTypeFilter.append(".jpg"),e.fileTypeFilter.append(".jpeg"),e.fileTypeFilter.append(".png"),1==Custom.Device.isPhone)e.pickSingleFileAndContinue();else{var t=i.querySelector("#cameraMenu").winControl;t.show(this,"top")}}),onclickTextOnly:e.initializer(function(){n.sessionState.inputText=o.bindingData.extractedText,t.back()}),onclickOnImg:e.initializer(function(){var e=a.values.inputLang,t=a.values.outputLang,n=o.lineData.ratio,r=o.lineData.arr,s=o.lineData.info;return Custom.Utils.showNotif(WinJS.Resources.getString("translating").value),Custom.Translate.translateinBatch(e,t,r).then(function(e){if(e){var t=i.querySelector(".text-overlay");t.innerHTML="";for(var r=0;r<s.lines.length;r++){var a=s.lines[r],o=document.createElement("div");o.textContent=e[r],o.className="result",o.style.top=Math.round(n*a.words[0].top)+"px",o.style.left=Math.round(n*a.words[0].left)+"px",o.style.fontSize=Math.round(n*a.words[0].height)+"px",t.appendChild(o)}}else Custom.Utils.popupNoInternet();Custom.Utils.hideNotif()})}),onclickOpenCamera:e.initializer(function(){var e=new Windows.Media.Capture.CameraCaptureUI;return e.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function(e){e&&t.navigate("/pages/p-camera/p-camera.html",{file:e})})}),onclickOpenGallery:e.initializer(function(){var e=new Windows.Storage.Pickers.FileOpenPicker;e.suggestedStartLocation=Windows.Storage.Pickers.PickerLocationId.picturesLibrary,e.fileTypeFilter.append(".jpg"),e.fileTypeFilter.append(".jpeg"),e.fileTypeFilter.append(".png"),e.pickSingleFileAsync().done(function(e){e&&t.navigate("/pages/p-camera/p-camera.html",{file:e})})})}),e.processAll(i,this.bindingData),this.loadImage(r.file)},loadImage:function(e){var t=this,n=new i.OcrEngine(this.getOCRlang(a.values.inputLang)),r=this.previewImg,o=this.ocrText,s=this.bgOverlay,l=(this.zoomContainer,0),c=0;return Custom.Utils.showNotif(WinJS.Resources.getString("recognizing").value),e.openAsync(Windows.Storage.FileAccessMode.read).then(function(e){var t=Windows.Graphics.Imaging.BitmapDecoder;return t.createAsync(e)}).then(function(e){l=e.pixelWidth,c=e.pixelHeight,s.style.height=c+"px",s.style.width=l+"px",o.style.height=c+"px",o.style.width=l+"px";var t=1;if((c>2600||l>2600)&&(t=2600/Math.max(c,l)),(40>c||40>l)&&(t=Math.min(c,l)/40),c=Math.floor(c*t),l=Math.floor(l*t),1==t)return e.getPixelDataAsync();var n=new Windows.Graphics.Imaging.BitmapTransform;return n.scaledHeight=c,n.scaledWidth=l,e.getPixelDataAsync(Windows.Graphics.Imaging.BitmapPixelFormat.unknown,Windows.Graphics.Imaging.BitmapAlphaMode.premultiplied,n,Windows.Graphics.Imaging.ExifOrientationMode.ignoreExifOrientation,Windows.Graphics.Imaging.ColorManagementMode.doNotColorManage)}).then(function(e){var t=e.detachPixelData();return n.recognizeAsync(c,l,t)}).then(function(e){var n="";e.textAngle?(r.style.transform="rotate("+e.textAngle+"deg)",s.style.transform="rotate("+e.textAngle+"deg)"):(r.style.transform="rotate(0deg)",s.style.transform="rotate(0deg)");var i=r.width/l;if(o.innerHTML="",null!=e.lines)for(var a=[],c=0;c<e.lines.length;c++){for(var u=e.lines[c],p="",g=0;g<u.words.length;g++){var d=u.words[g];p+=d.text+" ",n+=d.text+" "}var h=document.createElement("div");h.textContent=p,h.className="result",h.style.top=Math.round(i*u.words[0].top)+"px",h.style.left=Math.round(i*u.words[0].left)+"px",h.style.fontSize=Math.round(i*u.words[0].height)+"px",o.appendChild(h),a.push(p.trim()),n+="\n"}return t.lineData={info:e,arr:a,ratio:i},n}).then(function(e){if(e.length<1)throw WinJS.Resources.getString("cannot_recognize").value;t.bindingData.extractedText=e,Custom.Utils.hideNotif()}).then(null,function(e){Custom.Utils.popupMsg(WinJS.Resources.getString("sorry").value,e),Custom.Utils.hideNotif()})},getOCRlang:function(e){var t=WindowsPreview.Media.Ocr.OcrLanguage;switch(e){case"en":return t.english;case"zh":return t.chineseSimplified;case"zh-TW":return t.chineseTraditional;case"ce":return t.czech;case"da":return t.danish;case"nl":return t.dutch;case"fi":return t.finnish;case"fr":return t.french;case"de":return t.german;case"el":return t.greek;case"hu":return t.hungarian;case"it":return t.italian;case"ja":return t.japanese;case"ko":return t.korean;case"no":return t.norwegian;case"pl":return t.polish;case"pt":return t.portuguese;case"ru":return t.russian;case"es":return t.spanish;case"sv":return t.swedish;case"tr":return t.turkish;default:return 0}}})}();