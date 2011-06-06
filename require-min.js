//     require.js 0.4.1
//     (c) 2011 Jérémy Barbe.
//     May be freely distributed under the MIT license.
(function(){if(window.require)return;var require,strictFiles=false,async=false,scripts=document.getElementsByTagName('script'),body=document.body,cache={},queue={},emptyFn=function(){},success,error,complete,scriptCounter,loadedCounter,errorCounter;require=function(params){strictFiles=params.strict||false;async=params.async||false;success=error=complete=emptyFn;scriptCounter=loadedCounter=errorCounter=0;queue={};(function(){files=params.files instanceof Array?params.files:[params.files];success=params.success||success;complete=params.complete||complete;error=params.error||error;for(var j in scripts){if(scripts[j].src){cache[getName(scripts[j].src)]=j;}}for(var i in files){if(typeof files[i]==="string"||files[i]instanceof Array){var file,script,callback=emptyFn;console.log(files[i]);if(files[i]instanceof Array){file=files[i][0];script=getName(files[i][0]);callback=getName(files[i][1]);}else{file=files[i];script=getName(files[i]);}if(cache[script]||queue[script])continue;create(file,i,callback);scriptCounter++;}}if(scriptCounter===0){complete();success();}})();};function create(file,index,callback){var script=document.createElement('script'),fileName=getName(file),fileType=getType(file);script.onload=script.onerror=function(event){if(event.type=="error"){errorCounter++;error(event,file);}else
callback();loadedCounter++;delete queue[getName(file)];cache[getName(file)]=index;if(loadedCounter==scriptCounter){complete();if(errorCounter===0)success();}return true;};queue[fileName]=index;script.async=async;script.id=fileName;script.src=file;script.type=fileType;body.appendChild(script);}function getName(file){var name=file.toString().split('/').pop();name=name.split('.');name.pop();name=name.join('-');return strictFiles?file:name;}function getType(file){var types={js:'text/javascript',tpl:'text/template'};return types[file.toString().split('.').pop()]||types.js;}window.require=require;})();