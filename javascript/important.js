/**
 * Javascript Important Resources
 * 
 * @author Edina C.B. <http://www.edina.es>
 * @version 1.0
 * @package javascript
 *
 * Copyright (c) Edina C.B. 2011 - Some functions has its own copyright
 */

/************************/
/*		JAVASCRIPT		*/
/************************/

	/////////////
	//PROTOTYPE//
	/////////////

	//Buscar un indice en un array de una forma similar a string.indexOf
	//Ejemplo: var mi_array = new Array(val1, val2, val3);
	//mi_array.indexOf(val1): Return 0 (index = 0)
	//mi_array.indexOf(val3): Return 2 (index = 2)
	//mi_array.indexOf(valUnknown): Return -1 (not in array)
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
		var len = this.length;
	
		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			 ? Math.ceil(from)
			 : Math.floor(from);
		if (from < 0)
		  from += len;
	
		for (; from < len; from++)
		{
		  if (from in this &&
			  this[from] === elt)
			return from;
		}
		return -1;
	  };
	}
	
	/*
	 * Metodo Object.keys: Permite obtener las claves de una object (No funcione en IE9 o anterior ni FF3.6 o anterior (esto lo soluciona)
	 */
	Object.keys = Object.keys || function(o)
	{
		var result = [];
		for(var name in o) {
			if (o.hasOwnProperty(name))
			  result.push(name);
		}
		return result;
	};
	
	//Funcion necesaria para utilizar textShadow (añadir sombra a un texto incluso si el navegador no soporta shadow de css3)
	if(typeof Array.prototype.map == 'undefined')
	{
		Array.prototype.map = function(fnc)
		{
			var a = new Array(this.length);
			for (var i = 0; i < this.length; i++)
			{
				a[i] = fnc(this[i]);
			}
			return a;
		}
	};
	
	//INICIO DE CIRCULAR BUFFER
	(function (global) {

		function CBuffer() {
			// handle cases where "new" keyword wasn't used
			if (!(this instanceof CBuffer)) {
				// multiple conditions need to be checked to properly emulate Array
				if (arguments.length > 1 || typeof arguments[0] !== 'number') {
					return CBuffer.apply(new CBuffer(), arguments);
				} else {
					return new CBuffer(arguments[0]);
				}
			}
			// if no arguments, then nothing needs to be set
			if (arguments.length === 0) return this;
			// this is the same in either scenario
			this.size = this.start = 0;
			// set to callback fn if data is about to be overwritten
			this.overflow = false;
			// emulate Array based on passed arguments
			if (arguments.length > 1 || typeof arguments[0] !== 'number') {
				this.data = new Array(arguments.length);
				this.end = (this.length = arguments.length) - 1;
				this.push.apply(this, arguments);
			} else {
				this.data = new Array(arguments[0]);
				this.end = (this.length = arguments[0]) - 1;
			}
			// need to `return this` so `return CBuffer.apply` works
			return this;
		}
		
		CBuffer.prototype = {
			// properly set constructor
			constructor : CBuffer,
		
			/* mutator methods */
			// pop last item
			pop : function () {
				var item;
				if (this.size === 0) return;
				item = this.data[this.end];
				// no need to delete item, since resize will make it inaccessible to
				// CBuffer methods
				this.end = (this.end - 1 + this.length) % this.length;
				this.size--;
				return item;
			},
			// push item to the end
			push : function () {
				var i = 0;
				// check if overflow is set, and if data is about to be overwritten
				if (this.overflow && this.size + arguments.length > this.length) {
					// call overflow function and send data that's about to be overwritten
					for (; i < this.size + arguments.length - this.length; i++) {
						this.overflow(this.data[(this.end + i + 1) % this.length], this);
					}
				}
				// push items to the end, wrapping and erasing existing items
				// using arguments variable directly to reduce gc footprint
				for (i = 0; i < arguments.length; i++) {
					this.data[(this.end + i + 1) % this.length] = arguments[i];
				}
				// recalculate size
				if (this.size < this.length) {
					if (this.size + i > this.length) this.size = this.length;
					else this.size += i;
				}
				// recalculate end
				this.end = (this.end + i) % this.length;
				// recalculate start
				this.start = (this.length + this.end - this.size + 1) % this.length;
				// return number current number of items in CBuffer
				return this.size;
			},
			// reverse order of the buffer
			reverse : function () {
				var i = 0,
					tmp;
				for (; i < ~~(this.size / 2); i++) {
					tmp = this.data[(this.start + i) % this.length];
					this.data[(this.start + i) % this.length] = this.data[(this.start + (this.size - i - 1)) % this.length];
					this.data[(this.start + (this.size - i - 1)) % this.length] = tmp;
				}
				return this;
			},
			// rotate buffer to the left by cntr, or by 1
			rotateLeft : function (cntr) {
				if (!cntr) cntr = 1;
				while (--cntr >= 0) {
					this.push(this.shift());
				}
				return this;
			},
			// rotate buffer to the right by cntr, or by 1
			rotateRight : function (cntr) {
				if (!cntr) cntr = 1;
				while (--cntr >= 0) {
					this.unshift(this.pop());
				}
				return this;
			},
			// remove and return first item
			shift : function () {
				var item;
				// check if there are any items in CBuff
				if (this.size === 0) return;
				// store first item for return
				item = this.data[this.start];
				// recalculate start of CBuffer
				this.start = (this.start + 1) % this.length;
				// decrement size
				this.size--;
				return item;
			},
			// sort items
			sort : function (fn) {
				if (fn) this.data.sort(fn);
				else this.data.sort();
				this.start = 0;
				this.end = this.size - 1;
				return this;
			},
			// add item to beginning of buffer
			unshift : function () {
				var i = 0;
				// check if overflow is set, and if data is about to be overwritten
				if (this.overflow && this.size + arguments.length > this.length) {
					// call overflow function and send data that's about to be overwritten
					for (; i < this.size + arguments.length - this.length; i++) {
						this.overflow(this.data[this.end - (i % this.length)], this);
					}
				}
				for (i = 0; i < arguments.length; i++) {
					this.data[(this.length + this.start - (i % this.length) - 1) % this.length] = arguments[i];
				}
				if (this.length - this.size - i < 0) {
					this.end += this.length - this.size - i;
					if (this.end < 0) this.end = this.length + (this.end % this.length);
				}
				if (this.size < this.length) {
					if (this.size + i > this.length) this.size = this.length;
					else this.size += i;
				}
				this.start -= arguments.length;
				if (this.start < 0) this.start = this.length + (this.start % this.length);
				return this.size;
			},
		
			/* accessor methods */
			// return index of first matched element
			indexOf : function (arg, idx) {
				if (!idx) idx = 0;
				for (; idx < this.size; idx++) {
					if (this.data[(this.start + idx) % this.length] === arg) return idx;
				}
				return -1;
			},
			// return last index of the first match
			lastIndexOf : function (arg, idx) {
				if (!idx) idx = this.size - 1;
				for (; idx >= 0; idx--) {
					if (this.data[(this.start + idx) % this.length] === arg) return idx;
				}
				return -1;
			},
		
			/* iteration methods */
			// check every item in the array against a test
			every : function (callback, context) {
				var i = 0;
				for (; i < this.size; i++) {
					if (!callback.call(context, this.data[(this.start + i) % this.length], i, this))
						return false;
				}
				return true;
			},
			// loop through each item in buffer
			// TODO: figure out how to emulate Array use better
			forEach : function (callback, context) {
				var i = 0;
				for (; i < this.size; i++) {
					callback.call(context, this.data[(this.start + i) % this.length], i, this);
				}
			},
			// check items agains test until one returns true
			// TODO: figure out how to emuldate Array use better
			some : function (callback, context) {
				var i = 0;
				for (; i < this.size; i++) {
					if (callback.call(context, this.data[(this.start + i) % this.length], i, this))
						return true;
				}
				return false;
			},
		
			/* utility methods */
			// reset pointers to buffer with zero items
			// note: this will not remove values in cbuffer, so if for security values
			//       need to be overwritten, run `.fill(null).empty()`
			empty : function () {
				var i = 0;
				this.size = this.start = 0;
				this.end = this.length - 1;
				return this;
			},
			// fill all places with passed value or function
			fill : function (arg) {
				var i = 0;
				if (typeof arg === 'function') {
					while(this.data[i] = arg(), ++i < this.length);
				} else {
					while(this.data[i] = arg, ++i < this.length);
				}
				// reposition start/end
				this.start = 0;
				this.end = this.length - 1;
				this.size = this.length;
				return this;
			},
			// return first item in buffer
			first : function () {
				return this.data[this.start];
			},
			// return last item in buffer
			last : function () {
				return this.data[this.end];
			},
			// return specific index in buffer
			get : function (arg) {
				return this.data[(this.start + arg) % this.length];
			},
			// set value at specified index
			set : function (idx, arg) {
				return this.data[(this.start + idx) % this.length] = arg;
			},
			// return clean array of values
			toArray : function () {
				var narr = new Array(this.size),
					i = 0;
				for (; i < this.size; i++) {
					narr[i] = this.data[(this.start + i) % this.length];
				}
				return narr;
			}
		};
		
		if (typeof module === 'object' && module.exports) module.exports = CBuffer;
		else global.CBuffer = CBuffer;
		
	}(this));
	//FIN DE CIRCULAR BUFFER

	/////////////
	//FUNCTIONS//
	/////////////
	
		// INICIO DE INTERNET EXPLORER //
		
		var cache_IEVersion = null;

		/**
		 * Devolver la version actual de internet explorer o -1 si no es IE.
		 * @return integer 
		 */
		function getInternetExplorerVersion()
		{
			if(cache_IEVersion != null)
				return cache_IEVersion;
				
			  var rv = -1; // Return value assumes failure.
			  if (navigator.appName == 'Microsoft Internet Explorer')
			  {
				var ua = navigator.userAgent;
				var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if (re.exec(ua) != null)
				  rv = parseFloat( RegExp.$1 );
			  }
			  cache_IEVersion = rv;
			  return rv;
		}
		
		/**
		 * Verifica si es IE7 o anterior (comprueba incluso si esta en vista compatibilidad)
		 * @return boolean 
		 */
		function isIE7prev()
		{
			if(isNaN(document.documentMode))
				return false;
				
			try
			{
				//Fix vista compatibilidad IE8 (modo ie7)
				if(document.documentMode <= 7 || (getInternetExplorerVersion()>-1 && getInternetExplorerVersion()<=7))
				{
					return true;
				}
			}
			catch(e)
			{
			}
			return false;
		}
		
		/**
		 * Verifica si es IE8 o anterior (comprueba incluso si esta en vista compatibilidad)
		 * @return boolean 
		 */
		function isIE8prev()
		{
			if(isNaN(document.documentMode))
				return false;
				
			try
			{
				//Fix vista compatibilidad IE9 (modo ie8)
				if(document.documentMode <= 8 || (getInternetExplorerVersion()>-1 && getInternetExplorerVersion()<=8))
				{
					return true;
				}
			}
			catch(e)
			{
			}
			return false;
		}	
		
		/**
		 * Verifica si es IE8 o anterior (comprueba incluso si esta en vista compatibilidad)
		 * @return boolean 
		 */
		function isIE9prev()
		{
			if(isNaN(document.documentMode))
				return false;
				
			try
			{
				//Fix vista compatibilidad IE9 (modo ie8)
				if(document.documentMode <= 9 || (getInternetExplorerVersion()>-1 && getInternetExplorerVersion()<=9))
				{
					return true;
				}
			}
			catch(e)
			{
			}
			return false;
		}		

		/**
		 * Verifica si es IE7 o anterior o no para establecer el inline-block como inline-block o como simplemente inline
		 * @return string 
		 */
		function getInlineBlock()
		{
			if(isIE7prev())
			{
				return "inline";
			}
			else
			{
				return "inline-block";
			}
		}

		// FIN DE INTERNET EXPLORER //
		
		// INICIO DE UTILIDADES //

		/**
		 * Equivalente a la funcion de PHP del mismo nombre
		 * @param string str: Texto a decodificar
		 * @return string
		 */
		function html_entities_decode(str)
		{
			if(!str)
				return;
			var ta=document.createElement("textarea");
			ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
			return ta.value;
		}
		
		/**
		 * Rellena con ceros un numero
		 * @param integer number: Numero a rellenar
		 * @param integer length: Numero total de caracteres que debe tener el numero
		 * @return string
		 */
		function zero_fill(number, length)
		{
			var result = number.toString();
			var pad = length - result.length;
		
			while(pad > 0) {
				result = '0' + result;
				pad--;
			}
		
			return result;
		}
		

		/**
		 * Comprueba si una fecha es valida o no (Española)
		 * @param string value: Texto con la fecha
		 * @param boolean forceGetDate: OPCIONAL - Si no se especifica devuelve true/false. Si se especifica devuelve false o un objecto DATE con la fecha 
		 * @return boolean o Date 
		 *
		 */
		function isADateES(value, forceGetDate)
		{
			var date = null;
			var separators = new Array("\\", "-", "/");
			for(var index in separators)
			{
				if(value.indexOf(separators[index])!=-1)
				{
					date = value.split(separators[index]);
				}
			}
			if(date == null  || date.length!=3 || date[1]*1>12 || date[0]*1>31)
			{
				return false;
			}
			var validDate = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(date[1]+"/"+date[0]+"/"+date[2]);
			
			if(forceGetDate==undefined)
			{
				return validDate;
			}
			else
			{
				if(!validDate)
				{
					return false;
				}
				else
				{
					return new Date(date[1]+"/"+date[0]+"/"+date[2]);
				}
			}
		}
		
		/**
		 * Prepara un AjaxUploader con sus textos tanto de drag (arrastrar), drop (soltar) o other (IE)
		 * @param string dragText: Texto que se establecera para accion de arrastrar un fichero encima para subir por AjaxUploader
		 * @param string dropText: Texto que se establecera para accion de soltar un fichero encima para subir por AjaxUploader
		 * @param string otherText: Texto que se establecera para IE porque no soporta drag and drop
		 * @param string uploaderDivId: OPCIONAL - Establece el id del AjaxUploader
		 * @param string forceImg: OPCIONAL - Fuerza a que solo se ponga una imagen como dragText, dropText y otherText
		 * @param string imgClass: OPCIONAL - Clase de la imagen que se usa en forceImg
		 * @return string 
		 */
		function uploaderText(dragText, dropText, otherText, uploaderDivId, forceImg, imgClass)
		{
			if(uploaderDivId == undefined)
			{
				uploaderDivId = "editar_album";
			}
			
			var IEVersion = getInternetExplorerVersion();
			
			if(forceImg != undefined && forceImg)
			{
					return '<div id="'+uploaderDivId+'"><div class="qq-uploader">' + 
							'<div class="qq-upload-drop-area"><img src="'+forceImg+'" class="'+imgClass+'"  /><\/div>' +
							'<div class="qq-upload-button"><img src="'+forceImg+'" class="'+imgClass+'"  /><\/div><\/div>' +
							'<ul class="qq-upload-list"><\/ul>' + 
					'<\/div><\/div>';
			}
			else
			{
				if(IEVersion != -1)
				{
					//El texto que hay aqui de dropText nunca se mostrara porque no es compatible
					return '<div id="'+uploaderDivId+'"><div class="qq-uploader">' + 
							'<div class="qq-upload-drop-area">'+dropText+'<\/div>' +
							'<div class="qq-upload-button">'+otherText+'<\/div><\/div>' +
							'<ul class="qq-upload-list"><\/ul>' + 
					'<\/div><\/div>';
				}
				else
				{
					return '<div id="'+uploaderDivId+'"><div class="qq-uploader">' + 
							'<div class="qq-upload-drop-area">'+dropText+'<\/div>' +
							'<div class="qq-upload-button">'+dragText+'<\/div>' +
							'<ul class="qq-upload-list"><\/ul>' + 
					'<\/div><\/div>';
				}
			}
		}
		
		/* PREPARA UN UPLOADER SIMPLE */
		function simpleUploaderText(text, id)
		{
			return uploaderText(text, text, text, id);
		}


		/**
		 * Obtener el tamaño de un objeto JSON (Limitado a json unidimensionales)
		 * @param string json_object: El objeto JSON a identificar
		 * @return integer 
		 */
		function json_size(json_object)
		{
			var size = 0;
			for(var index in json_object)
			{
				size++;
			}
			return size;
		}

		/**
		 * Fuerza a que todos los elementos del html (sean div, span, etc...) tengan la misma altura
		 * @param string className: selector className a utilizar
		 * @return integer 
		 */
		function sameHeight(className,marginTop)
		{
			var maxTituloSize = 0;
			if(marginTop==null)
			{
				marginTop=0;
			}
			$(className).each(function()
			{
				if($(this).height()>maxTituloSize)
				{
					maxTituloSize = $(this).height();
				}
			});
			if(maxTituloSize>0)
			{
				if(marginTop>0)
					$(className).height(maxTituloSize-marginTop);
				else
					$(className).height(maxTituloSize);
			}
		}
		
		/**
		 * Fuerza a que todos los elementos del html (sean div, span, etc...) tengan la misma altura
		 * @param string className: selector className a utilizar
		 * @return integer 
		 */
		function sameMinHeight(className)
		{
			var maxTituloSize = 0;
			$(className).each(function()
			{
				if($(this).height()>maxTituloSize)
				{
					maxTituloSize = $(this).height();
				}
			});
			if(maxTituloSize>0)
				$(className).css("min-height",maxTituloSize);
		}

		/**
		 * Precarga de imagenes en el navegador
		 * @param array images: array con las imagenes a precargar
		 * @return integer 
		 */
		function preloader(images) 
		{
		
			 // counter
			 var i = 0;
		
			 // create object
			 imageObj = new Image();
		
			 // start preloading
			 for(i=0; i<=images.length; i++) 
			 {
				  imageObj.src=images[i];
			 }
		}

		/**
		 * Corta strings largos
		 * Se puede utilizar para cortar palabras largas si el ultimo parametro se pone a TRUE
		 * @param string str: string con palabra/s largas a cortar
		 * @param integer int_width: tamaño maximo de la palabra
		 * @param string str_break: string de union entre los leementos cortados
		 * @param boolean cut: establece si se cortan palabras a mitad o se espera a que termine la palabra para utilizar el caracter de corte (str_break)
		 * @return string 
		 * 
		 * CopyRight: Jonas Raoni Soares Silva (http://www.jsfromhell.com) & Nick Callen & Kevin van Zonneveld (http://kevin.vanzonneveld.net) & Sakimori & Michael Grier
		 * 
		 */
		function wordwrap (str, int_width, str_break, cut)
		{
			// *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
			// *     returns 1: 'Kevin |van |Zonnev|eld'
			// *     example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
			// *     returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
			// *     example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
			// *     returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'
			// PHP Defaults
			var m = ((arguments.length >= 2) ? arguments[1] : 75);
			var b = ((arguments.length >= 3) ? arguments[2] : "\n");
			var c = ((arguments.length >= 4) ? arguments[3] : false);
		
			var i, j, l, s, r;
		
			str += '';
		
			if (m < 1) {
				return str;
			}
		
			for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
				for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
					j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
				}
			}
		
			return r.join("\n");
		}

		/**
		 * Compara dos arrays para ver si son iguales
		 * @param array a1: array a comparar
		 * @param array a2: array a comparar
		 * @return boolean 
		 *
		 */
		function arrayCompare(a1, a2)
		{
			if (a1.length != a2.length) return false;
			var length = a2.length;
			for (var i = 0; i < length; i++)
			{
				if (a1[i] !== a2[i]) return false;
			}
			return true;
		}
		
		/**
		 * Comprueba si existe un valor en un array
		 * @param string needle: string a buscar
		 * @param array haystack: array a revisar
		 * @return boolean 
		 *
		 */
		function inArray(needle, haystack)
		{
			if(needle == undefined || haystack == undefined)
			{
				return false;
			}
			var length = haystack.length;
			for(var i = 0; i < length; i++)
			{
				if(typeof haystack[i] == 'object')
				{
					if(arrayCompare(haystack[i], needle)) return true;
				}
				else
				{
					if(haystack[i] == needle) return true;
				}
			}
			return false;
		}

		/**
		 * Realizar un var_dump similar al de PHP
		 * @param string object: objeto para hacer el var_dump
		 * @param array br: tipo de salto de linea (\r\n o <br />)
		 * @param array multi: recursividad (si es objeto seguir la recursividad)
		 * @return string 
		 *
		 */
		function var_dump(object, br, multi)
		{
			var temp = "";
			if(br == undefined)
			{
				newLine = "\r\n";
			}
			else
			{
				newLine = "<br />";
			}
			for(var index in object)
			{
				if(typeof(object) == "object" && multi != undefined)
				{
					temp += index + ": "+newLine;
					temp += "\t"+var_dump(object[index], br)+newLine;
				}
				else
				{
					temp += index + ": "+ object[index]+newLine;
				}
			}
			return temp;
		}
		
		/**
		 * Comprobar si un dni o nie es valido
		 * @param String dni: numero de dni
		 * @return String dni validado o NULL si no es valido
		 *
		 */
		function validaDNI(dni)
		{
			var dniNIELimpio = dni.replace(/[^A-Za-z0-9]+/g, '').toUpperCase(); 	// /[0-9a-zA-Z]+/g
			
			if(dniNIELimpio.length != 9)
			{
				return null;
			}
			var dniNIESinLetraFinal = dniNIELimpio.substring(0,8);
			
			var cadena="TRWAGMYFPDXBNJZSQVHLCKET"; 
		
			//Calculo de NIE con X	
			if (dniNIESinLetraFinal.substring(0,1)=="X")
			{
				posicion = dniNIESinLetraFinal.substring(1, 8) % 23; 
				letra = cadena.substring(posicion,posicion+1); 
				if(dniNIESinLetraFinal+letra == dniNIELimpio)
        		{
					 return dniNIELimpio;
				}
			} 
			//Calculo de NIE con Y
			else if (dniNIESinLetraFinal.substring(0,1)=="Y")
			{
				//el calculo de los NIE que empiezan por Y se realiza cambiando la letra Y por un 1
				numero = "1"+dniNIESinLetraFinal.substring(0, 8); 
				posicion = numero % 23; 
				letra = cadena.substring(posicion,posicion+1); 
				if(dniNIESinLetraFinal+letra == dniNIELimpio)
				{
				  return dniNIELimpio;
				}
			}
			//Calculo de DNI espanol
			else
			{
				posicion = dniNIESinLetraFinal.substring(0, 8) % 23; 
				letra = cadena.substring(posicion,posicion+1); 
				if(dniNIESinLetraFinal+letra == dniNIELimpio)
				{
				  return dniNIELimpio;
				}
			}	
      
	      	return null;
		}
		
		/**
		 * Comprobar si un numero de cuenta esta bien o no
		 * @param String banco: numero del banco (4 digitos)
		 * @param String sucursal: numero de sucursal (4 digitos)
		 * @param String digitoControl: numero de control (2 digitos)
		 * @param String numCuenta: numero de cuenta (10 digitos)
		 * @return boolean 
		 *
		 */
		function validaCuentaBancaria(ccc)
		{
			if(!alphanumeric(ccc))
			{
				return false;
			}
			
			if(ccc.length == 24)
			{
				iban = ccc.substr(0, 4);
				banco = ccc.substr(4, 4);
				sucursal = ccc.substr(8, 4);
				digitoControl = ccc.substr(12, 2);
				numCuenta = ccc.substr(14, 10);
				
				if(iban.length !=4 || banco.length !=4 || sucursal.length !=4 || digitoControl.length !=2 || numCuenta.length !=10)
				{
					return false;
				}
			}
			else
			{
				banco = ccc.substr(0, 4);
				sucursal = ccc.substr(4, 4);
				digitoControl = ccc.substr(8, 2);
				numCuenta = ccc.substr(10, 10);
				
				if(banco.length !=4 || sucursal.length !=4 || digitoControl.length !=2 || numCuenta.length !=10)
				{
					return false;
				}
				
			}
			
			return (digitoControl*1 == obtenerDigitoControl(banco, sucursal, numCuenta)*1);
	
		}
		 
		 
		/* PRIVADA NO USAR utilizar en su caso validaCuentaBancaria(banco, sucursal, digitoControl, numCuenta) */ 
		function obtenerDigitoControl(banco, sucursal, numCuenta)
		{
			return calculaDigito("00"+banco+sucursal) + "" + calculaDigito(numCuenta);
		}
		
		/* PRIVADA NO USAR utilizar en su caso validaCuentaBancaria(iban,banco, sucursal, digitoControl, numCuenta) */ 
		function calculaDigito(valor)
		{
			  valores = new Array(1, 2, 4, 8, 5, 10, 9, 7, 3, 6);
			  control = 0;
			  for (i=0; i<=9; i++)
				control += parseInt(valor.charAt(i)) * valores[i];
			  control = 11 - (control % 11);
			  if (control == 11) control = 0;
			  else if (control == 10) control = 1;
			  return control;
		}
		
		function alphanumeric(texto)  
		{  
			var letterNumber = /^[0-9a-zA-Z]+$/;  
			if(texto.match(letterNumber))   
			{  
				return true;  
			}  
			else  
			{     
				return false;   
			}  
		}  
		/* PRIVADA NO USAR utilizar en su caso validaCuentaBancaria(iban,banco, sucursal, digitoControl, numCuenta) */ 
		/*
		function validarDigitoControlIBAN(ccc)
		{		
			codigoPais = ccc.substr(0 , 2);
				
			digitoControlIBAN = ccc.substr( 2 , 2);	//lo tenemos que comprobar
			
			cuentaBancaria = ccc.substr(4 , 20);	
			
			letras = new Array();
			letras["A"] = '10';
			letras["B"] = '11';
			letras["C"] = '12';
			letras["D"] = '13';
			letras["E"] = '14';
			letras["F"] = '15';
			letras["G"] = '16';
			letras["H"] = '17';
			letras["I"] = '18';
			letras["J"] = '19';
			letras["K"] = '20';
			letras["L"] = '21';
			letras["M"] = '22';
			letras["N"] = '23';
			letras["O"] = '24';
			letras["P"] = '25';
			letras["Q"] = '26';
			letras["R"] = '27';
			letras["S"] = '28';
			letras["T"] = '29';
			letras["U"] = '30';
			letras["V"] = '31';
			letras["W"] = '32';
			letras["X"] = '33';
			letras["Y"] = '34';
			letras["Z"] = '35';
	
			dividendo = cuentaBancaria+letras[codigoPais.substr(0 , 1)]+letras[codigoPais.substr(1 , 1)]+'00';	
			digitoControl =  98 - bcmod(dividendo, '97');
			if(strlen(digitoControl)==1) digitoControl = '0'.digitoControl;
			
			return digitoControl==digitoControlIBAN;
		}*/
		
		
		function validarDigitoControlIBAN(IBAN) {
  
//Limpiamos el numero de IBAN
            IBAN = IBAN.toUpperCase();  //Todo a Mayus
            IBAN = trim(IBAN); //Quitamos blancos de principio y final.
             IBAN  = IBAN.replace(/\s/g, "");  //Quitamos blancos del medio.
             
            var letra1,letra2,num1,num2;
            var isbanaux;
            var numeroSustitucion;
  
            // Para obtener la letra del NIE solo hay que sustituir la X del principio por un 0 y la Y por un 1 dividir el número entre 23
            // Letra (X,Y,Z) seguida de número de 7 cifras y otra letra (digito de control). (NIE).
  
            if (IBAN.length != 24) {               
                return false;
            }
  
            // Cogemos las primeras dos letras y las pasamos a numeros
            letra1 = IBAN.substring(0, 1);
             letra2 = IBAN.substring(1, 2);
             
        num1 = getnumIBAN(letra1);
        num2 = getnumIBAN(letra2);
            //Substituimos las letras por numeros.
          isbanaux = String(num1) + String(num2) + IBAN.substring(2, IBAN.length - 2);
         // Movemos los 6 primeros caracteres al final de la cadena.           
        isbanaux = isbanaux.substring(6,IBAN.length - 6) + isbanaux.substring(0,6);
             
         //Calculamos el resto         
            resto = isbanaux % 97;
             
  
            if (resto == 1)
    		{
                return true;
            }
            else
            {
                return false;
            }
  
        }
		
		function trim(myString)
		{
		return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
		}
		 
		function getnumIBAN(letra)
		{
			ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';          
			return ls_letras.search(letra) + 10;
		}
		
		
		/** Gestion de Cookies */
		function get_cookie(Name)
		{
			var search = Name + "="
			var returnvalue = "";
			if (document.cookie.length > 0)
			{
				offset = document.cookie.indexOf(search)
				if (offset != -1)
				{
					offset += search.length
					end = document.cookie.indexOf(";", offset);
					if (end == -1) end = document.cookie.length;
					returnvalue=unescape(document.cookie.substring(offset, end))
				}
			}
			return returnvalue;
		}


		function set_cookie(name, value, expires)
		{
			document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : "; expires=" + expires.toGMTString());
		} 


		function delCookie (name,path,domain)
		{
			if (get_cookie(name))
			{
				document.cookie = name + "=" + ((path == null) ? "" : "; path=" + path) + ((domain == null) ? "" : "; domain=" + domain) + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
			}
		}

		function prepareExpireDate(time_in_minutes)
		{
			var expirebar = new Date();
			expirebar.setTime(expirebar.getTime() + (1000 * 60 * time_in_minutes));
			return expirebar;
		}
		/** Fin de Gestion de Cookies */
		
		/**
		 * Muestra Banner si la cookie lo permite
		 * @param boolean/integer mostrarBanner: true/false, si se tiene que comprobar la cookie o no
		 * @param String nombreCookieBanner: nombre de la cookie a comprobar
		 * @param function accion: accion a ejecutar
		 *
		 */
		function muestraBannerSegunCookie(mostrarBanner, nombreCookieBanner, accion)
		{
			if(mostrarBanner)
			{
				//Verificamos si se ha mostrado el banner o no (si existe la cookie)
				if (get_cookie(nombreCookieBanner)=="")
				{
					//Si no existe la cookie la creamos y mostramos el banner. (tercer parametro controla cuando caduca la cookie: nada = al salir, o algo=dia que caducara).
					set_cookie(nombreCookieBanner, "true");
					accion();
				}
			}
		}

		/**
		 * Elimina los caracteres no numericos de un string (Para coger ids)
		 * @param String string: el string que contiene el texto a dejar solo los numeros
		 *
		 */
		function getNumbers(string)
		{
			return string.replace(/[^0-9]/g, "");
		}
		
		/**
		 * Modifica los caracteres mayor que y menor que y comillas dobles  < > " por sus correspondientes en HTML entities
		 * @param String string: el string que se desa modificar
		 *
		 */
		function htmlEntities(str) 
		{
			return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		}
		
		/**
		 * Quita las etiquetas HTML de un string
		 * @param String string: el string que se desa modificar
		 *
		 */
		 function strip_tags(html)
		 { 
			//PROCESS STRING
			if(arguments.length < 3) {
				html=html.replace(/<\/?(?!\!)[^>]*>/gi, '');
			} else {
				var allowed = arguments[1];
				var specified = eval("["+arguments[2]+"]");
				if(allowed){
					var regex='</?(?!(' + specified.join('|') + '))\b[^>]*>';
					html=html.replace(new RegExp(regex, 'gi'), '');
				} else{
					var regex='</?(' + specified.join('|') + ')\b[^>]*>';
					html=html.replace(new RegExp(regex, 'gi'), '');
				}
			}
	 
			//CHANGE NAME TO CLEAN JUST BECAUSE 
			var clean_string = html;
	 
			//RETURN THE CLEAN STRING
			return clean_string;
		}
		
		/**
		 * Muesta un texto largo al pasar por encima de un texto corto
		 * @param String cadena: el string corto que se mostrara
		 * @param String stringBody: el string largo que se mostrara al pasar el raton por encima
		 * @param String classBody: la clase que se le aplicara al cuerpo del texto largo
		 * @param String classHeader: la clase que se le aplicara al titulo que aparece al lado del texto largo
		 * @param String stringHeader: el titulo que aparecera al lado del texto largo
		 *
		 */
		function boxOver(cadena, stringBody, classBody, stringHeader, classHeader)
		{
			/*parametros por defecto*/
			classBody || ( classBody = "dvbdy1" );
			stringHeader || ( stringHeader = "" );
			classHeader || ( classHeader = "dvhdr1" );
			/*fin parametros por defecto*/
			
			return "<span title='cssbody=["+classBody+"] cssheader=["+classHeader+"] header=["+stringHeader+"] body=["+stringBody+"]'>"+cadena+"</span>";
		}

		/**
		 * Corta o limita un texto, haciendo que se vea un texto corto y al pasar por encima un texto largo
		 * @param String cadena: el string que se desa modificar
		 * @param Int limit: longitud maxima del texto (por defecto 20)
		 * @param String classBody: la clase que se le aplicara al cuerpo del texto largo
		 * @param String stringHeader: el titulo que aparecera al lado del texto largo
		 * @param String classHeader: la clase que se le aplicara al titulo que aparece al lado del texto largo
		 *
		 * REQUIRE: Para poder usar esta opcion es neceario incluir el fichero de javascript: boxover.js
		 */
		function limitText(cadena, limit, classBody, stringHeader, classHeader)
		{
			/*parametros por defecto*/
			limit || ( limit = 20 );
			classBody || ( classBody = "dvbdy1" );
			stringHeader || ( stringHeader = "" );
			classHeader || ( classHeader = "dvhdr1" );
			/*fin parametros por defecto*/
			
			if(html_entity_decode(cadena).length<=limit)
			{
				return cadena;
			}
			else
			{
				return boxOver(strip_tags(cadena).substr(0, limit-3)+"...", cadena, classBody, stringHeader, classHeader);
			}
		}
		
		/**
		 * Corta o limita un texto, haciendo que se vea un texto corto y al pasar por encima un texto largo
		 * (solo se activa si el texto de la primera linea es mas largo que el limite puesto)
		 * Igual que limitText pero permite elegir el texto que aparecera como corto en lugar de limitarlo al numero de caracteres
		 *
		 * @param String firstLine: texto de la primera linea
		 * @param String allIncludingFirstLine: texto de la primera linea y del resto (todo)
		 * @param Int limitFirstLine: longitud maxima del texto de la primera linea para que se active el texto largo
		 * @param String classBody: la clase que se le aplicara al cuerpo del texto largo
		 * @param String stringHeader: el titulo que aparecera al lado del texto largo
		 * @param String classHeader: la clase que se le aplicara al titulo que aparece al lado del texto largo
		 * @param boolean removeBRs: quita o no los brs
		 * @param boolean stripTagsFirstLine: aplica la funcion striptags o no al texto corto
		 *
		 * REQUIRE: Para poder usar esta opcion es neceario incluir el fichero de javascript: boxover.js
		 */
		function multiLineLimitText(firstLine, allIncludingFirstLine, limitFirstLine, classBody, stringHeader, classHeader, removeBRs,  stripTagsFirstLine)
		{
			/*parametros por defecto*/
			limitFirstLine || ( limitFirstLine = 20 );
			classBody || ( classBody = "dvbdy1" );
			stringHeader || ( stringHeader = "" );
			classHeader || ( classHeader = "dvhdr1" );
			removeBRs || ( removeBRs = false );
			stripTagsFirstLine || ( stripTagsFirstLine = true );
			/*fin parametros por defecto*/
			
			if(limitFirstLine>=html_entity_decode(allIncludingFirstLine).length)
				return strip_tags(allIncludingFirstLine);
		
			if(stripTagsFirstLine)
			{
				firstLine = strip_tags(firstLine);
			}
			
			allStringWOBR = allIncludingFirstLine;
			//Avoid invalid chars that will break boxover
			allStringWOBR = htmlEntities(allStringWOBR).replace(/'/g,"&#039;").replace(/\[/g,"{").replace(/\]/g,"}");
			
			if(removeBRs)
			{
					allStringWOBR = allIncludingFirstLine.replace(/<br\s*[\/]?>/gi,"&nbsp;");
			}
			if(html_entity_decode(firstLine).length<=limitFirstLine)
			{
					return boxOver(firstLine, allStringWOBR, classBody, stringHeader, classHeader);
			}
			else
			{
					return boxOver(html_entity_decode(firstLine).substr(0, limitFirstLine-3)+"...", allStringWOBR, classBody, stringHeader, classHeader);
			}
		
		}

		/**
		 * Obtener el valor de un radio button hecho con jNice
		 * @param String jNiceName: el valor name de un elemento jNice tipo Radio
		 *
		 */
		function getJNiceRadioValue(jNiceName)
		{
			var value = null;
			$('input[name='+jNiceName+']').each(function(){if($(this).attr("checkedNice")=="true"){value=$(this).val()}});
			return value;
		}
		
		// FIN DE UTILIDADES //
		

		// INICIO DE ANIMACIONES: No usar estas funciones //
		
		
		/**
		 * Hace un cambio de una imagen por otra con un efecto de desvanecimiento (necesita un div con una imagen dentro ambos con su id)
		 * Nota: Tanto el div y la imagen han de ser del mismo tamaño si no hara un efecto estraño de redimensionamiento.
		 * @param string newImgUrl: url de la nueva imagen para cambiar
		 * @param string divContainerId: id del div que se pondra la imagen
		 * @param string oldImageId: id de la imagen
		 * @return void 
		 *
		 */
		function crossFadeImg(newImgUrl, divContainerId, oldImageId)
		{
			$("#"+divContainerId).css("background-image", "url("+newImgUrl+")");
			$("#"+oldImageId).animate({opacity: 0},
				{
					queue:false, 
					duration:500,
					complete:function()
					{
						$("#"+oldImageId).attr("src", newImgUrl).css({opacity:1});
					}
				}
			);
		}

		/**
		 * Usar a traves de jquery para iniciar una transicion de imagenes
		 *
		 * USO:
		 * $(selector).initSwitchImages(delay, dur); 
		 * Hay que poner en un div varias img y ellas solas se iran mostrando una a una
		 *
		 */
		function initSwitch(id, duration, isRandom)
		{
			slideSwitch(id, isRandom);
			setInterval(function() { slideSwitch(id, isRandom); }, duration);
		}

		/**
		 * Usar a traves de jquery para iniciar una transicion de imagenes
		 *
		 * USO:
		 * $(selector).initSwitchImages(delay, dur); 
		 * Hay que poner en un div varias img y ellas solas se iran mostrando una a una
		 *
		 */
		function slideSwitch(id, isRandom)
		{    
			var $active = $('#'+id+' IMG.active');
			if ( $active.length == 0 ) $active = $('#'+id+' IMG:last');    // use this to pull the images in the order they appear in the markup
			
			var $next;
			var $sibs;
			var rndNum;
			
			if(isRandom != undefined && isRandom == true)
			{
				$sibs  = $active.siblings();
				rndNum = Math.floor(Math.random() * $sibs.length );
				$next  = $( $sibs[ rndNum ] );
			}
			else
			{
				$next =  $active.next().length ? $active.next() : $('#'+id+' IMG:first');
			}
			
			$active.addClass('last-active').animate({opacity: 0.0}, 1500);
			$next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, 1000, function() {$active.removeClass('active last-active');});
		}

		// FIN DE ANIMACIONES //
		
		// INICIO DE DESUSO - DEPRECATED //
		
		/*
			Remplazada por: $.html_entity_decode(text);
		
		function html_entity_decode (string, quote_style)
		{
			// http://kevin.vanzonneveld.net
			// +   original by: john (http://www.jd-tech.net)
			// +      input by: ger
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: Onno Marsman
			// +   improved by: marc andreu
			// +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +      input by: Ratheous
			// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
			// +      input by: Nick Kolosov (http://sammy.ru)
			// +   bugfixed by: Fox
			// -    depends on: get_html_translation_table
			// *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
			// *     returns 1: 'Kevin & van Zonneveld'
			// *     example 2: html_entity_decode('&amp;lt;');
			// *     returns 2: '&lt;'
		
			var hash_map = {}, symbol = '', tmp_str = '', entity = '';
			tmp_str = string.toString();
			
			if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
				return false;
			}
		
			// fix &amp; problem
			// http://phpjs.org/functions/get_html_translation_table:416#comment_97660
			delete(hash_map['&']);
			hash_map['&'] = '&amp;';
		
			for (symbol in hash_map) {
				entity = hash_map[symbol];
				tmp_str = tmp_str.split(entity).join(symbol);
			}
			tmp_str = tmp_str.split('&#039;').join("'");
			
			return tmp_str;
		}
		*/
		
		/*
			No se usa en ningun sitio, esta definido internamente en las dataTables
			
		function getDataFromDataTableById(table, id)
		{
			if(!$("#"+id).closest("tr").get(0))
			{
				return null;
			}
			var position = table.fnGetPosition($("#"+id).closest("tr").get(0));
			return tabla_presupuesto_platos.fnGetData(position);
		}
		*/
		/* Para forzar a que los campos de un datatable se pongan en 1 linea y si se pasa salgan las ellipsis (...) y al pasar el raton por encima un titulo */
		function tableAutoEllipsis(nRow, aaData, iDisplayIndex)
		{
			var table = $(this);
			//Overflow ellipsis
			$('td', nRow).each(function (iPosition)
			{
				var th = table.find("thead th:eq("+iPosition+")");
				var sCellContent = $(this).html();
				sCellContent = '<div title="'+sCellContent.replace("\"", "'")+'" style="overflow:hidden;display:block;white-space:nowrap;text-overflow:ellipsis;width:'+th.css('width')+';">' + sCellContent + '</div>';
				$(this).html(sCellContent);
			});
			return nRow;
		}

		function prepareAjaxError(successFunction, XMLHttpRequest, textStatus, errorThrown)
		{
			var data = new Object();
			data["error_thrown"] = errorThrown;
			data["error_number"] = -2;
			data["error_message"] = "Error, el servicio no esta disponible temporalmente";
			successFunction(data, textStatus, XMLHttpRequest);
		}

		function handleAjaxError(data, loginURL)
		{
			if(data["error_number"]<-1) //-2: Error estandar pero como tiene que mostrar un alert 
			{
				alert(data["error_message"]);
			}
			else if(data["error_number"]==-1)
			{
				alert(data["error_message"]);
				window.location = loginURL;
			}
		}
		
		// FIN DE DESUSO - DEPRECATED //

		/*AJUSTA LA ALTURA DEL IFRAME AL DE LA VENTANA PRINCIPAL*/
		function fix_iframe(idFrame)
		{
			$("#"+idFrame).height($("#"+idFrame).contents().find("body").height());
		}
		
		function startCountDownTimer(dt, ct, container, container_dias, container_horas, container_minutos, container_segundos, redirection)
		{
			var end = new Date(dt);
			var now = new Date(ct);
	
	
			var _second = 1000;
			var _minute = _second * 60;
			var _hour = _minute * 60;
			var _day = _hour * 24;
			var timer;
	
			function showRemaining() {
				now.setTime(now.getTime()+1000);
				var distance = end - now;
				if (distance < 0)
				{
					clearInterval(timer);
					$(container).html('');
					if(redirection!=undefined)
					{
						window.location = redirection;
					}
					return;
				}
				var days = Math.floor(distance / _day);
				var hours = Math.floor((distance % _day) / _hour);
				var minutes = Math.floor((distance % _hour) / _minute);
				var seconds = Math.floor((distance % _minute) / _second);
							
				$(container_dias).html(days);	
				$(container_horas).html(hours < 10 ? "0"+hours : hours);	
				$(container_minutos).html(minutes < 10 ? "0"+minutes : minutes);	
				$(container_segundos).html(seconds < 10 ? "0"+seconds : seconds);
			}
	
			timer = setInterval(showRemaining, 1000);
		}
		
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
	
		function dataURItoBlob(dataURI)
		{
			// convert base64/URLEncoded data component to raw binary data held in a string
			var byteString;
			if (dataURI.split(',')[0].indexOf('base64') >= 0)
				byteString = atob(dataURI.split(',')[1]);
			else
				byteString = unescape(dataURI.split(',')[1]);
		
			// separate out the mime component
			var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		
			// write the bytes of the string to a typed array
			var ia = new Uint8Array(byteString.length);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
		
			return new Blob([ia], {type:mimeString});
		}


/************************/
/*		JQUERY   		*/
/************************/

	/////////////////////////
	// EVENTS & OVERRIDES  //
	/////////////////////////

	/**
	 * Establecer/Recoger el valor de un input
	 * Añade soporte para checkbox
	 * @param string newImgUrl: url de la nueva imagen para cambiar
	 * @param string divContainerId: id del div que se pondra la imagen
	 * @param string oldImageId: id de la imagen
	 * @return void 
	 *
	 * Uso:
	 *	GET: $(selector).val()
	 *  SET: $(selector).val(value): Para establecer un valor de un checkbox pasar true o false
	 */
	var org_fn_val = jQuery.fn.val;
	$.fn.val = function()
	{
		if($(this).attr("type") == 'checkbox')
		{
			if(arguments != undefined && arguments[0] != undefined )
			{
				$(this).attr('checked', Boolean(arguments[0]));
			}
			else
			{
				if($(this).is(':checked'))
				{
					if($(this).attr("value")!=undefined)
					{
						return $(this).attr("value");
					}
					else
					{
						return true;
					}
				}
				else
				{
					return false;
				}
				//return $(this).is(':checked');
			}
		}
		/*
		else if($(this).attr("type") == 'select-one')
		{
			if(arguments != undefined && arguments[0] != undefined )
			{
				alert($(this).html());
				$(this).find("option[value='"+arguments[0]+"']").attr("selected", "selected");
	//			alert($(this).find("option[value='"+arguments[0]+"']").html());
			}
			else
			{
				return org_fn_val.apply( this, arguments );
			}
		}
		*/
		else
		{
			return org_fn_val.apply( this, arguments );
		}
	};

	/**
	 * Añade soporte de evento de rueda del raton
	 *
	 * Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net) Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
	 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
	 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
	 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
	 * 
	 * Version: 3.0.2
	 * 
	 * Requires: jquery 1.2.2+
	 *
	 * Uso:
	 *
	 * $(selector).mousewheel(fn):									Establece un evento de tipo mousewheel y aplica accion (fn)
	 * $(selector).bind('mousewheel', fn);							Establece un evento de tipo mousewheel y aplica accion (fn)
     * $(selector).bind('mousewheel', function(event, delta) {});   Establece un evento de tipo mousewheel y aplica accion definida internamente con parametros event y delta
	 *
	 */
	(function($)
	{
		var types = ['DOMMouseScroll', 'mousewheel'];
	
		$.event.special.mousewheel =
		{
			setup: function()
			{
				if ( this.addEventListener )
					for ( var i=types.length; i; )
						this.addEventListener( types[--i], handler, false );
				else
					this.onmousewheel = handler;
			},
			
			teardown: function()
			{
				if ( this.removeEventListener )
					for ( var i=types.length; i; )
						this.removeEventListener( types[--i], handler, false );
				else
					this.onmousewheel = null;
			}
		};
	
		$.fn.extend({
			mousewheel: function(fn)
			{
				return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
			},
			
			unmousewheel: function(fn)
			{
				return this.unbind("mousewheel", fn);
			}
		});
	
	
		function handler(event)
		{
			var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
			
			event = $.event.fix(event || window.event);
			event.type = "mousewheel";
			
			if ( event.wheelDelta ) delta = event.wheelDelta/120;
			if ( event.detail     ) delta = -event.detail/3;
			
			// Add events and delta to the front of the arguments
			args.unshift(event, delta);
		
			return $.event.handle.apply(this, args);
		}
	
	})(jQuery);
	

	/**
	 * Añade soporte de evento de rueda del raton
	 * 
	 * Requires: jquery 1.2.2+ and mousewheel event (zoom puede ser por rueda de raton o por teclas)
	 *
	 * Uso:
	 *
	 * $(selector).zoom(fn)											Establece un evento de tipo zoom y aplica accion (fn)
	 *
	 */
	jQuery.fn.zoom = function(fn)
	{
		jQuery(document).keydown(function(e)
		{
			switch (true)
			{
				case jQuery.browser.mozilla || jQuery.browser.msie :
					if (e.ctrlKey && (e.which == 187 || e.which == 189 || e.which == 107 || e.which == 109 || e.which == 96  || e.which == 48))
						fn();
					break;
				case jQuery.browser.opera :
					if (e.which == 43 || e.which == 45 || e.which == 42 ||(e.ctrlKey && e.which == 48))
						fn();
					break;
				case jQuery.browser.safari :
					if (e.metaKey && (e.charCode == 43 || e.charCode == 45))
						fn();
					break;
			}
			return;
		});
	
		jQuery(document).bind('mousewheel', function(e)
		{
			if (e.ctrlKey)
				fn();
		});
	
		jQuery(document).bind('DOMMouseScroll', function(e)
		{
			if (e.ctrlKey)
				fn();
		});
	};

	/**
	 * Fix de Mozilla firefox para ocultar un objeto flash y que no se reinicie constantemente al ocultar/mostrar
	 * 
	 * Requires: jquery 1.2.2+
	 *
	 * Uso:
	 *
	 * $(selector).flashHide()							Oculta un objeto de flash (Mozilla = visibility hidden, Resto = position absolute left -10000000)
	 * $(selector).flashShow()							Muestra un objeto de flash que se ha ocultado con flashHide (Mozilla = visibility hidden, Resto = position absolute left -10000000)
	 *
	 */
	(function($)
	{ 
	  var hideClassName = 'flashHide'; 
	  $.fn.extend({ 
		flashHide: function() {return this.each(function(){$(this).addClass(hideClassName);});}, 
		flashShow: function() {return this.each(function(){$(this).removeClass(hideClassName);}); 
		} 
	  }); 
	})(jQuery);
	
	$(document).ready(function()
	{
		if($.browser.mozilla)
		{
			$("<style type='text/css'> .flashHide {  visibility: hidden; width: 0px; height: 0px; } </style>").appendTo("head");
		}
		else
		{
			$("<style type='text/css'> .flashHide {    position: absolute;    left: -10000px;} </style>").appendTo("head");
		}
	});

	/**
	 * PRIVADA: No utilizar nunca para validar fechas, es algo interno del jquery.validation
	 *
	 * Uso: NO LO USES
	 *
	 */
	function isDateES(value, element, validator, forceGetDate)
	{ 
		var date = null;
		var separators = new Array("\\", "-", "/");
		for(var index in separators)
		{
			if(value.indexOf(separators[index])!=-1)
			{
				date = value.split(separators[index]);
			}
		}
		if(date == null  || date.length!=3 || date[1]*1>12 || date[0]*1>31)
		{
			return (validator.optional(element) || false);
		}
		var validDate = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(date[1]+"/"+date[0]+"/"+date[2]);
		
		if(forceGetDate==undefined)
		{
			return validator.optional(element) || (validDate && !/Invalid|NaN/.test(new Date(date[1]+"/"+date[0]+"/"+date[2])));
		}
		else
		{
			if((validDate && !/Invalid|NaN/.test(new Date(date[1]+"/"+date[0]+"/"+date[2]))))
			{
				return new Date(date[1]+"/"+date[0]+"/"+date[2]);
			}
			else
			{
				return false;
			}
		}
	}

	var jqueryVersions = null;
	/**
	 * PRIVADA: No utilizar nunca para validar, es algo interno del jquery.validation
	 *
	 * Uso: NO LO USES
	 *
	 */
	function getDefaultValue(element)
	{
		if(jqueryVersions == null)
			jqueryVersions = jQuery.fn.jquery.split(".");
		
		//jquery es mayor de 1.5 (puede ser 2.0 o 3.2)
		if(jqueryVersions[0]>1 || (jqueryVersions[0]==1 && jqueryVersions[1]>= 5))
		{
			return element.prop("defaultValue");
		} 
		//Versiones inferiores a 1.5
		else
		{
		   return element.attr("defaultValue"); 
		}
	}

	function validateDailyMotion(value)
	{
		var url = value.replace("http://", "").replace("www.", "").split("/");
		if(url.length<3)
		{
			return new Array(false, "No has puesto un video de DailiMotion valido, debe de ser del tipo: http://www.dailymotion.com/video/letras_palabras");
		}
		if(url[0] != "https://www.extinvalusa.com/javascript/dailymotion.com")
		{
			return new Array(false, "No has puesto un video de DailiMotion valido, el dominio no es de dailymotion.com, no puedes usar acortadores");
		}
		if(url[1] != "video")
		{
			return new Array(false, "No has puesto un video de DailiMotion valido, no puedes usar canales ni acortadores, tiene que ser un video suelto");
		}
		var videoId = url[2].split("_");
		if(videoId.length<2)
		{
			return new Array(false, "No has puesto un video de DailiMotion valido, no se puede detectar la id del video");
		}
		else
		{
			return new Array(true, videoId[0]);
		}
	}
	
	function validateVimeo(value)
	{
		var url = value.replace("http://", "").replace("www.", "").split("/");
		if(url.length<2)
		{
			return new Array(false, "No has puesto un video de Vimeo valido, debe de ser del tipo: http://www.vimeo.com/codigo");
		}
		if(url[0] != "https://www.extinvalusa.com/javascript/vimeo.com")
		{
			return new Array(false, "No has puesto un video de Vimeo valido, el dominio no es de vimeo.com, no puedes usar acortadores");
		}
		if(isNaN(url[1]*1))
		{
			return new Array(false, "No has puesto un video de Vimeo valido, no puedes usar canales ni acortadores, tiene que ser un video suelto");
		}
		return new Array(true, url[1]*1);
	}
	
	function validateEmail(email) 
	{ 
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return re.test(email);
	} 
	

	/*
		Funcion para realizar la copia de un TextArea o un INPUT-TEXT al portapapeles (como hacer CTRL+C)
	*/
	function copyToClipboard(elem)
	{
	  	// create hidden text element, if it doesn't already exist
		var targetId = "_hiddenCopyText_";
		var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
		var origSelectionStart, origSelectionEnd;
		if (isInput) {
			// can just use the original source element for the selection and copy
			target = elem;
			origSelectionStart = elem.selectionStart;
			origSelectionEnd = elem.selectionEnd;
		} else {
			// must use a temporary form element for the selection and copy
			target = document.getElementById(targetId);
			if (!target) {
				var target = document.createElement("textarea");
				target.style.position = "absolute";
				target.style.left = "-9999px";
				target.style.top = "0";
				target.id = targetId;
				document.body.appendChild(target);
			}
			target.textContent = elem.textContent;
		}
		// select the content
		var currentFocus = document.activeElement;
		target.focus();
		target.setSelectionRange(0, target.value.length);
		
		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		// restore original focus
		if (currentFocus && typeof currentFocus.focus === "function") {
			currentFocus.focus();
		}
		
		if (isInput) {
			// restore prior selection
			elem.setSelectionRange(origSelectionStart, origSelectionEnd);
		} else {
			// clear temporary content
			target.textContent = "";
		}
		return succeed;
	}
	
	/*
		Permite poner a un elemento la funcion de copiar el texto al portapapeles de un textarea o input
	*/
	$.fn.controlPlusC = function(selectorToBeCopy, notUnbind)
	{
		if($(selectorToBeCopy).size()!=1)
		{
			console.log("Solo se puede hacer controlPlusC sobre un elemento unico, utiliza una id");
			return;
		}
		
		if(notUnbind == undefined)
		{
			notUnbind = false;
		}

		if(!notUnbind)
		{
			$(this).unbind("click");
		}
		$(this).makeTagLink(function(){copyToClipboard($(selectorToBeCopy)[0])});
	}

	
	/**
	 * Añade soporte de validaciones especiales al validation
	 * 
	 * Requires: jquery 1.2.2+ & jquery.validation 1.0+
	 *
	 * Reglas añadidas:
	 * - youtube (verifica que una url es de tipo youtube)
	 * - requiredNotDefault (valor requerido pero no admite el valor por defecto del campo)
	 * - phone (formato +3491000000 o 910000000 o 003491000000)
	 * - hora (rango 00:00 a 23:59)
	 * - dateES (formato DD/MM/AAAA)
	 * - rangeDateES (rango de fechas en formato DD/MM/AAAA)
	 * - urlAlternativa (valida url con http:// o sin el)
	 * - urlPostNuddos (valida una url de tipo post de nuddos)
	 * - email (prueba@aaa.es)
	 *
	 */
	if(jQuery.validator != undefined)
	{
		(function() {
			var messager = function() {
				return "<br />"+msg;
			};
			var msg = "Este video no es valido, debe seleccionar un tipo de video adecuado a la url que ha puesto";
			jQuery.validator.addMethod("videoYDV", function (value, element, param) {
				/* 0=> Ninguno
				 * 1=> Youtube
				 * 2=> DailyMotion
				 * 3=> Vimeo
				 */
				 var tipoVideo = $(param).val()*1;
				 
				 if(tipoVideo == undefined)
				 {
					 msg = "Este video no es valido, solo se soportan Youtube, DayliMotion o Vimeo";
					 return false;
				 }
				 
				 switch(tipoVideo)
				 {
					 case 0:
					 {
						return this.optional(element);
						break;
					 }
					 case 1:
					 {
						var isYoutube = $.query.load(value).get("v")!="";
						if(!isYoutube)
						{
	 						msg = "No has puesto un video de Youtube valido, debe de ser del tipo: http://www.youtube.com/watch?v=";
						}
						return isYoutube;
						break;
					 }
					 case 2:
					 {
						var dailyMotion = validateDailyMotion(value);
						if(!dailyMotion[0])
						{
							msg = dailyMotion[1];
						}
						return dailyMotion[0];
						break;
					 }
					 case 3:
					 {
						var vimeo = validateVimeo(value);
						if(!vimeo[0])
						{
							msg = vimeo[1];
						}
						return vimeo[0];
						break;
					 }
					 default:
					 {
						 return false;
					 }
				 }
				},messager);
		})();
		
		jQuery.validator.addMethod("dailymotion", function (value, element) {
			return $.query.load(value).get("v")!="";
		},"<br />Este no es un enlace de youtube valido.");
		jQuery.validator.addMethod("youtube", function (value, element) {  return $.query.load(value).get("v")!=""; },"<br />Este no es un enlace de youtube valido.");
		jQuery.validator.addMethod("youtubeOptional", function (value, element) {  return this.optional(element) || $.query.load(value).get("v")!=""; },"<br />Este no es un enlace de youtube valido.");
		jQuery.validator.addMethod("requiredNotDefault", function (value, element) { return  value!=getDefaultValue($(element)) },"<br />Este campo es requerido");
		jQuery.validator.addMethod("phone", function (value, element) {  return this.optional(element) || /^\+*(?:[0-9]?){6,14}[0-9]$/.test(value); },"<br />Escriba un telefono valido ( +3491000000 o 910000000 o 003491000000)");
		jQuery.validator.addMethod("hora", function (value, element) {  return this.optional(element) || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value); },"<br />Escriba una hora valida (00:00 a 23:59)");
		jQuery.validator.addMethod("dateES", function(value, element) {return this.optional(element) || isDateES(value, element, this)}, "<br />Escriba una fecha del formato DD/MM/AAAA (dia, mes y a&ntilde;o)");
		jQuery.validator.addMethod("nick", function (value, element) {  return this.optional(element) || /^[A-Za-z0-9_\.]*$/.test(value); },"<br />Escriba un nick valido (Se aceptan alfanumericos, numeros, guiones y puntos)");
		jQuery.validator.addMethod("nick_sin_punto", function (value, element) {  return this.optional(element) || /^[A-Za-z0-9_]*$/.test(value); },"<br />Escriba un nick valido (Se aceptan alfanumericos, numeros, guiones)");
		jQuery.validator.addMethod("alfanumerico", function (value, element) {  return this.optional(element) || /^[A-Za-z0-9]*$/.test(value); },"<br />Escriba un valor alfanumerico (Se aceptan alfanumericos y numeros)");
		jQuery.validator.addMethod("urlAlternativa", function (value, element)
		{
			return this.optional(element) || jQuery.validator.methods.url.call(this, value, element, null) || jQuery.validator.methods.url.call(this, "http://"+value, element, null);
		},"<br />Escriba una url valido (Se acepta http:// o www.)");
		jQuery.validator.addMethod("urlPostNuddos", function (value, element)
		{
			return this.optional(element) || (jQuery.validator.methods.url.call(this, value, element, null) && validaCleanURLBlogNuddos(value));
		},"<br />Escriba una url de un blog de nuddos valido");
		jQuery.validator.addMethod("validarDNI", function (value, element)
		{
			return this.optional(element) || validaDNI(value);
		},"<br />Escriba un DNI o NIE valido");
		jQuery.validator.addMethod("rangeDateES", function(value, element, param)
		{ 
			var dates = (param+"").replace(/ /g, "").split(",");
			if(dates.length != 2)
			{
				return false;
			}
			
			var minDate = isDateES(dates[0], element, this, true);
			var maxDate = isDateES(dates[1], element, this, true);
			var userDate = isDateES(value, element, this, true);
			if(!minDate || !maxDate || !userDate)
			{
				return false;
			}
			if(userDate<minDate)
			{
				return false;
			}
			else if(userDate>maxDate)
			{
				return false;
			}
			else
			{
				return true;
			}
			
		}, "<br />Escriba una fecha del formato DD/MM/AAAA (dia, mes y a&ntilde;o)");
		//Examina si hay al menos un checkbox marcado en un bloque indicado por param que es el contenedor de todos los checkbox
		jQuery.validator.addMethod("checkboxGroup", function(value, elem, param) {
			if($("."+param+" input:checkbox:checked").length > 0){
				$("."+param+" label").removeClass("error");
			   return true;
		   }else {
				$("."+param+" label").addClass("error");
			   return false;
		   }
		},"Debes seleccionar al menos un elemento");
		
		jQuery.validator.addMethod("data-id", function(value, element) {
			return this.optional(element) || (!isNaN($(element).attr("data-id")) && (parseFloat($(element).attr("data-id")) > 0));
		}, "El valor del campo no es valido");
		
	}
	else
	{
		throw new Error ("Error, esta version de important.js tiene que ir justo debajo de jquery.validate.js en el head, no puede ir antes");
	}
	
	$.fn.makeLightBox = function(settings)
	{
		$(this).lightBox(settings);
	
		$(this).css("cursor", "pointer");
	}
	
	function validaCleanURLBlogNuddos(value)
	{
		var url = value.split("/");
		if(url.length < 2)
		{
			return false;
		}
		var urlDocument = url[url.length-1].split(".");
		var blogNuddos = urlDocument[0].split("-");
		if(blogNuddos[0] != "nuddos" || blogNuddos[1] != "post")
		{
			return false;
		}
		if(blogNuddos.length<3)
		{
			return false;
		}
		if(!blogNuddos[blogNuddos.length-1] || isNaN(blogNuddos[blogNuddos.length-1]*1) || !blogNuddos[blogNuddos.length-2] || isNaN(blogNuddos[blogNuddos.length-2]*1))
		{
			return false;
		}
		if(urlDocument[1] != "html")
		{
			return false;
		}
		return true;
	}
	
	$.fn.autoTitleTD = function()
	{
		if(!$(this).is("table"))
		{
			return;
		}
		
		$(this).find("td").each(function()
		{
			$(this).attr("title", $(this).text().replace('"', "'"));
		});
	}
	

	/////////////////////////////////////
	// FUNCTIONS:FORMULARIOS E INPUTS  //
	/////////////////////////////////////
	
	/**
	 * Obtine el objeto de validacion de un formulario
	 * @return validator 
	 *
	 * Uso:
	 *	$(selector).getValidator()
	 */
	$.fn.getValidator = function()
	{
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		else
		{
			return null;
		}
	};
	
	/**
	 * Borrar un form (poner todo vacio)
	 * @return void 
	 *
	 * Vease tambien: $(selector@form).reset(); Esta funcion reinicia un formulario a los valores iniciales (que pueden ser 0 o vacio o no)
	 *
	 * Uso:
	 *	$(selector).clearForm()
	 */
	$.fn.clearForm = function(forceResetValidation)
	{
		$(this).find(':input').each(function()
		{
			switch(this.type) {
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'text':
				case 'textarea':
					$(this).val('');
					break;
				case 'checkbox':
				case 'radio':
					this.checked = false;
			}
		});
		if($(this).getValidator() && forceResetValidation!=undefined && forceResetValidation == true)
		{
			$(this).getValidator().resetForm();
		}
	};
	
	/**
	 * Reinicia un form (poner todo por defecto puede no ser vacio y que tenga datos por defecto)
	 * @return void 
	 *
	 * Vease tambien: $(selector).clearForm(); Esta funcion borra un form (poner todo vacio)
	 *
	 * Uso:
	 *	$(selector).reset()
	 */
	$.fn.extend({  
		reset: function() {  
		return this.each(function() {  
				$(this).is('form') && this.reset();  
		});  
		}  
	});
	
	/**
	 * Convierte un formulario en un objeto json
	 * @return json
	 *
	 * Vease tambien la funcion estandar: $(selector).serialize();
	 *
	 * Uso:
	 *	$(selector).parse_form()
	 */
	$.fn.parse_form = function()
	{
		var json = {};
		$(this).find(':input').each(function()
		{
			switch(this.type) {
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'text':
				case 'textarea':
				case 'hidden':
					json[$(this).attr("id")] = $(this).val();
					break;
				case 'checkbox':
				case 'radio':
					json[$(this).attr("id")] = this.checked;
			}
		});
		return json;
	};

	/**
	 * Añade el evento onchange a todos los elementos de un formulario
	 * @param function action: funcion que se ejecuta si se produce algun cambio en un formulario
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).onChangeForm(action);
	 */
	$.fn.onChangeForm = function(action)
	{
		$(this).find(':input').each(function()
		{
			switch(this.type) {
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'text':
				case 'textarea':
				case 'checkbox':
				case 'radio':
					$(this).change(action);
			}
		});
	};


	/**
	 * Establece un valor de un input con formato html (transforma las entidades html tipo &aacute; en á)
	 * permite convertir br en saltos de linea o omitir los saltos de linea previos
	 * @param string text: texto a convertir en html
	 * @param boolean br2nl: activar la conversion de br a nl
	 * @param boolean ingnorePreviousnl: activar la ignoracion de los saltos de linea anteriores
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).valHTMLEntities(text, br2nl, ingnorePreviousNL);
	 */
	$.fn.valHTMLEntities = function(text, br2nl, ingnorePreviousNL)
	{
		if(br2nl == undefined || br2nl == false)
		{
			$(this).val($("<div/>").html(text).text());
		}
		else
		{
			if(ingnorePreviousNL == undefined || ingnorePreviousNL == false)
			{
				$(this).val($("<div/>").html(text).text().replace(/<br \/>/g, "\n").replace(/<br\/>/g, "\n").replace(/<br>/g, "\n"));
			}
			else
			{
				$(this).val($("<div/>").html(text).text().replace(/\n/g, "").replace(/<br \/>/g, "\n").replace(/<br\/>/g, "\n").replace(/<br>/g, "\n"));
			}
		}
	};

	/**
	 * Recupera/Establece un valor de un input con formato numerico
	 * @param string value: valor que se pondra en el input
	 * @param json params: opciones para parsear el numero (numero de decimales:2, separador decimal: ".", separador de miles: ",", moneda: "" (ninguna)
	 * @return string 
	 *
	 * Uso:
	 *	$(selector).val_formated(value, params);
	 *
	 * Vease tambien $(selector).html_formated(): Dar formato a una etiqueta de html (div, span...)
	 */
	$.fn.val_formated = function(value, params)
	{
		//parametros default
		var sDefaults = 
		{			
			numberOfDecimals: 2,
			decimalSeparator: '.',
			thousandSeparator: ',',
			symbol: ''
		}
	 
		//Fusion de jsons
		var options = jQuery.extend(sDefaults, params);
		if(value != undefined)
		{
			if(isNaN(value))
			{
				throw new Error ("Error, el campo con id: "+$(this).attr("id")+" ha recibido un valor NaN");
				value = 0;
			}
			
			$(this).val($.number_format(value, sDefaults));
		}
		else
		{
			return $.number_format($(this).val().replace(/,/, "").replace(/ /, "").replace(/€/, "").replace(/&nbsp;/, "").replace(/&euro;/, ""), sDefaults);
		}
	};

	/**
	 * Recupera un valor de un input con formato numerico como numero estandar en javascript para seguir operando
	 * @return float 
	 *
	 * Uso:
	 *	$(selector).cleanNumberVal();
	 */
	$.fn.cleanNumberVal = function()
	{
		return $(this).val().replace(/,/, "").replace(/€/, "").replace(/&nbsp;/, "").replace(/&euro;/, "")*1;
	};

	/**
	 * Desactiva un boton (img o input), desactiva la funcion click, si es tipo boton modifica el texto del boton y ese mismo texto aparecera en un alert
	 * @param string text: texto del boton y mensaje de alert al pulsar el boton
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).disableButton(text);
	 */
	$.fn.disableButton = function(text)
	{
		if($(this).attr("src")!=undefined)
		{
			$(this).attr("src", $(this).attr("src").replace(/reposo/, "desactivado"));
			$(this).attr("src", $(this).attr("src").replace(/sobre/, "desactivado"));
		}
		else if($(this).attr("value")!=undefined)
		{
			$(this).val(text);
			$(this).attr("disabled", "disabled");
		}
		$(this).unbind("click");
		$(this).click(function(){alert(text)});
		if($(this).attr("id") != undefined && $("#"+$(this).attr("id")+"_msg") != undefined)
		{
			$("#"+$(this).attr("id")+"_msg").html(text);
		}
	};
	
	/**
	 * Re-activa un boton (img o input), añade de nuevo la funcion click (hay que pasarsela otra vez), si es tipo boton modifica el texto del boton
	 * @param function text: accion del boton al hacer click
	 * @param string text: texto del boton
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).enableButton(action, text);
	 */
	$.fn.enableButton = function(action, text)
	{
		if($(this).attr("src")!=undefined)
		{
			$(this).attr("src", $(this).attr("src").replace(/desactivado/, "reposo"));
		}
		else if($(this).attr("value")!=undefined)
		{
			$(this).val(text);
			$(this).attr("disabled", "");
		}
		$(this).unbind("click");
		$(this).click(action);
		if($(this).attr("id") != undefined && $("#"+$(this).attr("id")+"_msg") != undefined)
		{
			$("#"+$(this).attr("id")+"_msg").html(text);
		}
	};

	/**
	 * Elimina reglas de la validacion de jquery.validation (sirve por si se oculta unos campos de un formulario y no tienen que ser validados).
	 * @param array ruleObject: array con las reglas a desactivar
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).removeRuleObject(ruleObject);
	 */
	jQuery.removeRuleObject = function(ruleObject)
	{
		try
		{
			for(var index in ruleObject)
			{
				$("#"+index).rules("remove");
			}
		}
		catch(e){}
	};

	/**
	 * Añade reglas de la validacion de jquery.validation (sirve por si vuelven a mostrar campos ocultos de un formulario y tienen que volver a ser validados).
	 * @param array ruleObject: array con las reglas a activar
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).addRuleObject(ruleObject);
	 */
	jQuery.addRuleObject = function(ruleObject)
	{
		try
		{
			for(var index in ruleObject)
			{
				$("#"+index).rules("add", ruleObject[index]);
			}
		}
		catch(e){}
	};
	
	/**
	 * Añade el evento de presionar la tecla enter a un selector
	 * @param function action: accion que se ejecutara al pulsar enter sobre ese selector (es posible añadirlo al formulario y activar todos los inputs a la vez)
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).pressEnter(action);
	 */
	$.fn.pressEnter = function(action)
	{
		$(this).bind("keydown", function(e)
		{
			if (e.keyCode == 13)
			{
				action();
				return false; //prevent default behaviour
			}
		});
	};


	/**
	 * Devuelve la extension de un input (para usar con type=file)
	 * @param boolean allowEmpty: permitir valores vacios de formulario o no
	 * @return void 
	 *
	 * Uso:
	 *	$(selector).getFileExt(action);
	 */
	$.fn.getFileExt = function(allowEmpty)
	{
		if($(this).attr("tagName")!=null && $(this).attr("tagName").toLowerCase() == "input")
		{
			var temp = $(this).val().split(".");
			var ext = temp[temp.length-1].toLowerCase();
			return ext;
		}
		else
		{
			return Boolean(allowEmpty);
		}
	};


	////////////////////////////
	// FUNCTIONS: UTILIDADES  //
	////////////////////////////
	
	/**
	 * Modificacion del Query String de una url
	 *
	 * @author Blair Mitchelmore
	 * @version 2.1.7
	 *
	 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
	 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
	 * Date: 2009/8/13
	 *
	 * Uso:
	 *	SET: 	$.query.set(key, value); 	Establece un valor a una clave (si no existe la crea)
	 *	GET: 	$.query.get(key); 			Recupera un valor de una clave
	 *	REMOVE: $.query.remove(key); 		Borra un valor de una clave
	 *	EMPTY: 	$.query.empty(); 			Borra todos los valores del QS
	 *	LOAD: 	$.query.load(url); 			carga una url para trabajar con ella 
	 *	LOAD: 	$.query.load(); 			Rollback de los valores (valores de inicio de la querystring alias de $.query.load(window.location))
	 *  GO:  	$.query.go();				Hacer un window.location con los nuevos valores que se hayan hecho set o remove $.query.set(key1, value1).set(key2, value2).go();
	 *	COPY: 	$.query.copy(); 			Copia los valores del QS para utilizarlos con otro objeto
	 *
	 */
	new function(settings)
	{ 
	  // Various Settings
	  var $separator = settings.separator || '&';
	  var $spaces = settings.spaces === false ? false : true;
	  var $suffix = settings.suffix === false ? '' : '[]';
	  var $prefix = settings.prefix === false ? false : true;
	  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
	  var $numbers = settings.numbers === false ? false : true;
	  
	  jQuery.query = new function() {
		var is = function(o, t) {
		  return o != undefined && o !== null && (!!t ? o.constructor == t : true);
		};
		var parse = function(path) {
		  var m, rx = /\[([^[]*)\]/g, match = /^([^[]+)(\[.*\])?$/.exec(path), base = match[1], tokens = [];
		  while (m = rx.exec(match[2])) tokens.push(m[1]);

		  return [base, tokens];
		};
		var set = function(target, tokens, value) {
		  var o, token = tokens.shift();
		  if (typeof target != 'object') target = null;
		  if (token === "") {
			if (!target) target = [];
			if (is(target, Array)) {
			  target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
			} else if (is(target, Object)) {
			  var i = 0;
			  while (target[i++] != null);
			  target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
			} else {
			  target = [];
			  target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
			}
		  } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
			var index = parseInt(token, 10);
			if (!target) target = [];
			target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
		  } else if (token) {
			var index = token.replace(/^\s*|\s*$/g, "");
			if (!target) target = {};
			if (is(target, Array)) {
			  var temp = {};
			  for (var i = 0; i < target.length; ++i) {
				temp[i] = target[i];
			  }
			  target = temp;
			}
			target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
		  } else {
			return value;
		  }
		  return target;
		};
		
		var queryObject = function(a) {
		  var self = this;
		  self.keys = {};
		  
		  if (a.queryObject) {
			jQuery.each(a.get(), function(key, val) {
			  self.SET(key, val);
			});
		  } else {
			jQuery.each(arguments, function() {
			  var q = "" + this;
			  q = q.replace(/^[?#]/,''); // remove any leading ? || #
			  q = q.replace(/[;&]$/,''); // remove any trailing & || ;
			  if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
			  
			  jQuery.each(q.split(/[&;]/), function(){
				var key = decodeURIComponent(this.split('=')[0] || "");
				var val = "";
				try
				{
					val = decodeURIComponent(this.split('=')[1] || "");
				}
				catch(e)
				{
				}
				
				if (!key) return;
				
				if ($numbers) {
				  if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
					val = parseFloat(val);
				  else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
					val = parseInt(val, 10);
				}
				
				val = (!val && val !== 0) ? true : val;
				
				if (val !== false && val !== true && typeof val != 'number')
				  val = val;
				
				self.SET(key, val);
			  });
			});
		  }
		  return self;
		};
		
		queryObject.prototype = {
		  queryObject: true,
		  has: function(key, type) {
			var value = this.get(key);
			return is(value, type);
		  },
		  GET: function(key) {
			if (!is(key)) return this.keys;
			var parsed = parse(key), base = parsed[0], tokens = parsed[1];
			var target = this.keys[base];
			while (target != null && tokens.length != 0) {
			  target = target[tokens.shift()];
			}
			return typeof target == 'number' ? target : target || "";
		  },
		  get: function(key) {
			var target = this.GET(key);
			if (is(target, Object))
			  return jQuery.extend(true, {}, target);
			else if (is(target, Array))
			  return target.slice(0);
			return target;
		  },
		  SET: function(key, val) {
			var value = !is(val) ? null : val;
			var parsed = parse(key), base = parsed[0], tokens = parsed[1];
			var target = this.keys[base];
			this.keys[base] = set(target, tokens.slice(0), value);
			return this;
		  },
		  set: function(key, val) {
			return this.copy().SET(key, val);
		  },
		  GO: function() {
			this.go();
		  },
		  go: function() {
			  window.location = this.toString();
		  },
		  REMOVE: function(key) {
			return this.SET(key, null).COMPACT();
		  },
		  remove: function(key) {
			return this.copy().REMOVE(key);
		  },
		  EMPTY: function() {
			var self = this;
			jQuery.each(self.keys, function(key, value) {
			  delete self.keys[key];
			});
			return self;
		  },
		  load: function(url) {
			var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
			var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
			return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
		  },
		  empty: function() {
			return this.copy().EMPTY();
		  },
		  copy: function() {
			return new queryObject(this);
		  },
		  COMPACT: function() {
			function build(orig) {
			  var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
			  if (typeof orig == 'object') {
				function add(o, key, value) {
				  if (is(o, Array))
					o.push(value);
				  else
					o[key] = value;
				}
				jQuery.each(orig, function(key, value) {
				  if (!is(value)) return true;
				  add(obj, key, build(value));
				});
			  }
			  return obj;
			}
			this.keys = build(this.keys);
			return this;
		  },
		  compact: function() {
			return this.copy().COMPACT();
		  },
		  toString: function() {
			var i = 0, queryString = [], chunks = [], self = this;
			var encode = function(str) {
			  str = str + "";
			  if ($spaces) str = str.replace(/ /g, "+");
			  return encodeURIComponent(str);
			};
			var addFields = function(arr, key, value) {
			  if (!is(value) || value === false) return;
			  var o = [encode(key)];
			  if (value !== true) {
				o.push("=");
				o.push(encode(value));
			  }
			  arr.push(o.join(""));
			};
			var build = function(obj, base) {
			  var newKey = function(key) {
				return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
			  };
			  jQuery.each(obj, function(key, value) {
				if (typeof value == 'object') 
				  build(value, newKey(key));
				else
				  addFields(chunks, newKey(key), value);
			  });
			};
			
			build(this.keys);
			
			if (chunks.length > 0) queryString.push($hash);
			queryString.push(chunks.join($separator));
			
			return queryString.join("");
		  }
		};
		
		return new queryObject(location.search, location.hash);
	  };
	}(jQuery.query || {}); // Pass in jQuery.query as settings object

	/**
	 * Decodifica las entidades html en sus correspondencias (similar al PHP html_entity_decode)
	 * @param string text: texto a decodificar
	 * @return string 
	 *
	 * Uso:
	 *	$.html_entity_decode(text);
	 */
	jQuery.html_entity_decode = function(text)
	{
		return $("<div/>").html(text).text();
	};

	/**
	 * Da formato a un texto con formato decimal (numero de decimales, separador de miles y decimales, simbolo, etc..)
	 * @param string numero: numero a formatear
	 * @param json params: parametros (por defecto vale decimales: 2, separador decimal: ".", separador de miles: ",", simbolo: "" (ninguno), poner simbolo detras: true
	 * @return string 
	 *
	 * Uso:
	 *	$.number_format(numero, parametros);
	 */
	jQuery.number_format = function(numero, params)
	{
			if(numero==undefined)
			{
				return "Error!";
			}
		
			//parametros default
			var sDefaults = 
			{			
				numberOfDecimals: 2,
				decimalSeparator: '.',
				thousandSeparator: ',',
				symbol: '',
				behind: true
			}
	 
			//função do jquery que substitui os parametros que não foram informados pelos defaults
			var options = jQuery.extend(sDefaults, params);
	
			//CORPO DO PLUGIN
			var number = numero; 
			var decimals = options.numberOfDecimals;
			var dec_point = options.decimalSeparator;
			var thousands_sep = options.thousandSeparator;
			var currencySymbol = options.symbol;
			var behind = options.behind;
	
			var exponent = "";
			var numberstr = number.toString ();
			var eindex = numberstr.indexOf ("e");
			if (eindex > -1)
			{
			exponent = numberstr.substring (eindex);
			number = parseFloat (numberstr.substring (0, eindex));
			}
			
			if (decimals != null)
			{
			var temp = Math.pow (10, decimals);
			number = Math.round (number * temp) / temp;
			}
			var sign = number < 0 ? "-" : "";
			var integer = (number > 0 ? 
			  Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
			
			var fractional = number.toString ().substring (integer.length + sign.length);
			dec_point = dec_point != null ? dec_point : ".";
			fractional = decimals != null && decimals > 0 || fractional.length > 1 ? 
					   (dec_point + fractional.substring (1)) : "";
			if (decimals != null && decimals > 0)
			{
			for (i = fractional.length - 1, z = decimals; i < z; ++i)
			  fractional += "0";
			}
			
			thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ? 
						  thousands_sep : null;
			if (thousands_sep != null && thousands_sep != "")
			{
			for (i = integer.length - 3; i > 0; i -= 3)
			  integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
			}
			
			if (options.symbol == '')
			{
			return sign + integer + fractional + exponent;
			}
			else
			{
				if(!behind)
					return currencySymbol + ' ' + sign + integer + fractional + exponent;
				else
					return sign + integer + fractional + exponent + currencySymbol;
			}
			//FIM DO CORPO DO PLUGIN	
	};

	/**
	 * Convierte un texto plano en un texto CUFON
	 * @param string selector: selector al que se le va a aplicar el cufon
	 * @param string text: texto que se transformara en un cufon
	 * @return string 
	 *
	 * Uso:
	 *	$.cufon(selector, text);
	 *  $(selector).cufon(text);
	 */
	jQuery.cufon = function(selector, text)
	{
		if(text!=undefined)
		{
			$(selector).html(text);
		}
		try
		{
			if(Cufon == undefined)
			{
				throw new Error ("Error, hay que agregar cufon-yui.js o cufon.js y cufon-font.js para que esto funcione");
				return;
			}
			Cufon.replace(selector);
		}
		catch(e)
		{
			throw new Error ("Error, hay que agregar cufon-yui.js o cufon.js y cufon-font.js para que esto funcione");
			return;
		}
	};
	$.fn.cufon = function(text)
	{
		$.cufon($(this), text);
	};

	/**
	 * Copyright (C) 2009 Jonathan Azoff <jon@azoffdesign.com> with GPLv2 License
	 *
	 * jQuery.log v1.0.0 - A jQuery plugin that unifies native console logging across browsers
	 * 
	 * @usage		call jQuery.log([args...]) to write to attempt to write to the console of any browser. 
	 *				**See http: *azoffdesign.com/plugins/js/log for an example.
	 * @param 		args...	one or more javascript objects to be written to the console
	 * @returns 	true if a console was detected and successfully used, false if the plug-in had to resort to alert boxes
	 * @note 		if a plug-in cannot be located then an alert is called with the arguments you wish to log. Multiple 
	 *              arguments are separated with a space.
	 * @depends 	just make sure you have jQuery and some code you want to debug.
	 */
	(function($){
		$.extend({"log":function(){ 
			if(arguments.length > 0) {
				
				// join for graceful degregation
				var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];
				
				// this is the standard; firebug and newer webkit browsers support this
				try { 
					console.log(args);
					return true;
				} catch(e) {
					// newer opera browsers support posting erros to their consoles
					try { 
						opera.postError(args); 
						return true;
					} catch(e) { }
				}
				
				// catch all; a good old alert box
				alert(args);
				return false;
			}
		}});
	})(jQuery);

	/**
	 * Copyright (C) 2009 Jonathan Azoff <jon@azoffdesign.com> with GPLv2 License
	 *
	 * jQuery.log v1.0.0 - A jQuery plugin that unifies native console logging across browsers
	 * 
	 * @usage		call jQuery.log([args...]) to write to attempt to write to the console of any browser. 
	 *				**See http: *azoffdesign.com/plugins/js/log for an example.
	 * @param 		args...	one or more javascript objects to be written to the console
	 * @returns 	true if a console was detected and successfully used, false if the plug-in had to resort to alert boxes
	 * @note 		if a plug-in cannot be located then an alert is called with the arguments you wish to log. Multiple 
	 *              arguments are separated with a space.
	 * @depends 	just make sure you have jQuery and some code you want to debug.
	 */
	(function($){
		$.extend({"console":function(){ 
			if(arguments.length > 0) {
				
				// join for graceful degregation
				var args = (arguments.length > 1) ? Array.prototype.join.call(arguments, " ") : arguments[0];
				
				// this is the standard; firebug and newer webkit browsers support this
				try { 
					console.log(args);
					return true;
				} catch(e) {
					// newer opera browsers support posting erros to their consoles
					try { 
						opera.postError(args); 
						return true;
					} catch(e) { }
				}
				
				// catch all; a good old alert box
				//alert(args);
				return false;
			}
		}});
	})(jQuery);


	/**
	 * Establece un retraso para luego ejecutar una funcion de animacion sobre un selector
	 * @param int time: tiempo en milisegundos de retraso para ejecutar una funcion
	 * @param function callback: funcion que se ejecutara
	 * @return jquery.object 
	 *
	 * Uso:
	 * $(selector).delay(time, function() { $(this).animate({height:180},250);}); 
	 * $(selector).delay(1500).animate({opacity: 1}, 1500);
	 * $(selector).delay(100).show(1000);
	 */
	$.fn.delay = function(time, callback)
	{
		// Empty function:
		jQuery.fx.step.delay = function(){};
		// Return meaningless animation, (will be added to queue)
		return this.animate({delay:1}, time, callback);
	};

	/**
	 * Escribe un mensaje temporal en un selector y al cabo de un tiempo lo borra (o vuelve al estado anterior)
	 * @param string message: mensaje que se mostrara
	 * @param int delayTime: tiempo que mostrara el mensaje (en milisegundos) minimo 1000 ms (1 seg). por defecto 5seg
	 * @param boolean keepPrevious: si no se especifica que se mantenga el anterior se pondra un espacio (&nbsp)
	 * @return void 
	 *
	 * Uso:
	 * $(selector).delay(time, function() { $(this).animate({height:180},250);}); 
	 * $(selector).delay(1500).animate({opacity: 1}, 1500);
	 * $(selector).delay(100).show(1000);
	 */
	$.fn.tempHTMLMessage = function(message, delayTime, keepPrevious)
	{
		var previousHTML = "&nbsp;";
		if(keepPrevious != undefined && keepPrevious)
		{
			previousHTML = $(this).html();
		}
		if(delayTime == undefined || delayTime* 1 < 1000)
		{
			delayTime = 5000;
		}
		$(this).html(message);
		$(this).delay(delayTime, function(){$(this).html(previousHTML);});
	};

	/**
	 * Da formato numerico a un numero y lo escribe en una etiqueta html (span, div, ...)
	 * @param string value: valor que se pondra en la etiqueta
	 * @param json params: opciones para parsear el numero (numero de decimales:2, separador decimal: ".", separador de miles: ",", moneda: "" (ninguna)
	 * @return void 
	 *
	 * Uso:
	 * $(selector).html_formated(value, params); 
	 * 
	 * Vease tambien $(selector).val_formated(): Dar formato a un input
	 */
	$.fn.html_formated = function(value, params)
	{
		//parametros default
		var sDefaults = 
		{			
			numberOfDecimals: 2,
			decimalSeparator: '.',
			thousandSeparator: ',',
			symbol: ''
		}
	
		var cleanValue = value+"";
		cleanValue = cleanValue.replace(/,/, "").replace(/ /, "").replace(/€/, "").replace(/&nbsp;/, "").replace(/&euro;/, "");
		//função do jquery que substitui os parametros que não foram informados pelos defaults
		var options = jQuery.extend(sDefaults, params);
		$(this).html($.number_format(value, sDefaults));
	};
	
	/**
	 * Recupera un valor de un tag html con formato numerico como numero estandar en javascript para seguir operando
	 * @return float 
	 *
	 * Uso:
	 *	$(selector).cleanNumberHTML();
	 */
	$.fn.cleanNumberHTML = function()
	{
		return $(this).text().replace(/[^0-9.]+/g,'');
	};
	
	/**
	 * Añade un mapa de google a una web
	 
	 * Uso:
	 * $(selector).googleMaps(lat, long, zoom); 
	 */
	$.fn.googleSimpleMaps = function(lat, long, zoom)
	 {
		var map;
		if(!zoom)
		{
			zoom = 17
		}
		 map = new google.maps.Map(document.getElementById($(this).attr("id")), 
		 {
			center: {lat: lat, lng: long},
			zoom: zoom
		 });
	 }
	 
	
	/**
	 * Añade un mapa de google a una web
	 * @param string lat: latitud de la posicion del mapa de google
	 * @param string long: longitud de la posicion del mapa de google
	 * @param string titulo: titulo que se le añadira (nombre de la empresa) al bocadillo
	 * @param string dir: direccion que aparecere en el bocadillo
	 * @param string tel: telefono que aparecere en el bocadillo
	 * @param string logo: logo que aparecere en el bocadillo
	 * @return void 
	 *
	 * Uso:
	 * $(selector).googleMaps(lat, long, titulo, dir, tel, logo, tipoMapa); 
	 *	tipoMapa: mapTypeId: google.maps.MapTypeId.ROADMAP --> muestra el mapa de carretera
	 *	tipoMapa: mapTypeId: google.maps.MapTypeId.SATELLITE --> muestra el mapa en satelite
	 *
	 */
	$.fn.googleMaps = function(lat, long, titulo, dir, tel, logo, width, height, widthAddress, tipoMapa, markerURL, hideInfo)
	{
		//Uso:
		//lat, long, address
		//lat, long, titulo, dir, tel
		//lat, long, titulo, dir, tel, logo
		
		if(tipoMapa == undefined)
		{
			tipoMapa = google.maps.MapTypeId.ROADMAP
		}
		
		
		var address = "";
		if(width == undefined)
		{
			width = "150";
		}
		if(height == undefined)
		{
			height = "40";
		}
		if(widthAddress == undefined)
		{
			widthAddress = "300";
		}
		if(!dir)
		{
			address = '<span style="font-size:11px; width: 220px;">'+titulo+'<\/span>';
		}
		else
		{
			if(!logo)
			{
				logo = "img/logo.jpg"/*tpa=https://www.extinvalusa.com/javascript/img/logo.jpg*/;
			}
			address = '<div style="font-size:11px; width: '+widthAddress+'px;"><img src="'+logo+'" alt="'+titulo+'" title="'+titulo+'" width="'+width+'" height="'+height+'" border="0" /><br /><br /><b>Direcci&oacute;n: <\/b> '+dir+' <br /><b>Tel&eacute;fono<\/b>: '+tel+'<\/div>';
		}
	   
		$(this).googleMapsMarker(lat, long, titulo, address, tipoMapa, markerURL, hideInfo);
		
	};
	
	$.fn.googleLogo = function(lat, long, logoURL, tipoMapa, markerURL, hideInfo)
	{
		var logo = '<div style="text-align: center"><img src="'+logoURL+'" alt="" title="" border="0" /><\/div>';
		var titulo = "";
		
		var map = $(this).googleMapsMarker(lat, long, titulo, logo, tipoMapa, markerURL, hideInfo);
		
		return map;
	}
	
	$.fn.googleMapsMarker = function(lat, long, titulo, texto, tipoMapa, markerURL, hideInfo)
	{
		var infowindow = new google.maps.InfoWindow({content: texto});
	
		var latlng = new google.maps.LatLng(lat, long); 
	
		var myOptions =
		{
		  zoom: 17,
		  center: latlng,
		 // mapTypeId: google.maps.MapTypeId.ROADMAP
		 //mapTypeId: google.maps.MapTypeId.SATELLITE		  
		 mapTypeId: tipoMapa	  
		};
		
		var map = new google.maps.Map(document.getElementById($(this).attr("id")), myOptions);
	
		if(markerURL)
		{
			marker = new google.maps.Marker(
			{
				position: latlng,
				map: map,
				title: titulo,
				icon: markerURL
			});
		}
		else
		{
			var marker = new google.maps.Marker(
			{
				position: latlng,
				map: map,
				title: titulo
			});
		}
		
		if(hideInfo==undefined || hideInfo==false)
		{
			infowindow.open(map,marker);
		}
		
		return map;
	};
	
	/*
	anade el mapa de google en una web sin marcadores y devuelve el objeto mapa
	* @param string lat: latitud de la posicion del mapa de google
	* @param string long: longitud de la posicion del mapa de google
	*	tipoMapa: mapTypeId: google.maps.MapTypeId.ROADMAP --> muestra el mapa de carretera	
	*	tipoMapa: mapTypeId: google.maps.MapTypeId.SATELLITE --> muestra el mapa en satelite
	*/
	$.fn.addGoogleMap = function(lat, long, tipoMapa, zoom, minZoom, maxZoom)
	{
		//var infowindow = new google.maps.InfoWindow({content: texto});
	
		var latlng = new google.maps.LatLng(lat, long, zoom, minZoom, maxZoom); 
	
		var myOptions =
		{
		  zoom: zoom, //17,		  
		  minZoom:minZoom,
		  maxZoom:maxZoom,
		  center: latlng,
		 // mapTypeId: google.maps.MapTypeId.ROADMAP
		 //mapTypeId: google.maps.MapTypeId.SATELLITE		  
		 mapTypeId: tipoMapa	  
		};
		
		var map = new google.maps.Map(document.getElementById($(this).attr("id")), myOptions);
	/*
		var marker = new google.maps.Marker(
		{
			position: latlng,
			map: map,
			title: titulo
		});*/
	
		//infowindow.open(map);
		return map;
	};
	/*
	anade marcadores a un mapa de google, se le pasa el objeto mapa donde debe insertarse el nuevo marcador
	* @param string lat: latitud de la posicion del mapa de google
	* @param string long: longitud de la posicion del mapa de google
	* @param object map: objeto mapa donde se inserta el marcador
	* @param string titulo: titulo del marcador
	* @param string urlImagen: la url del icono que queremos como marcador
	*/
	function addMarker(lat,lng, map,titulo, texto, urlImagen,logoURL)
	{
		var logo = '<div style="text-align: center;height:70px"><img src="'+logoURL+'" alt="" title="" border="0" /><br />'+texto+'<\/div>';
		var latlng=new google.maps.LatLng(lat,lng);
		var marker = new google.maps.Marker(
		{
			position: latlng,
			map: map,
			icon: urlImagen,
			title: titulo/*,
			animation:google.maps.Animation.BOUNCE*/
		});
		
		var infowindow = new google.maps.InfoWindow({
			content:logo
		});
		
		
		infowindow.open(map,marker);
		marker.setMap(map);				
	}
	
	
	/**
	 * Inicia un cambio de imagenes
	 * @param int delay: delay inicial antes de empezar la animacion
	 * @param int dur: tiempo que permanece cada foto
	 * @param int/boolean randomType OPCIONAL: tipo de random para aplicar.
	 * 		undefined-> sin random (secuencial)
	 *		true o 1 => random completo aleatorio
	 *		2=> random inicial y luego secuencial
	 * @return void 
	 *
	 * Uso:
	 * $(selector).initSwitchImages(delay, dur, randomType); 
	 * Hay que poner en un div varias img y ellas solas se iran mostrando una a una
	 *
	 */
	$.fn.initSwitchImages = function(delay, dur, randomType)
	{   
		var initialDelay = 0;
		if(delay != undefined){initialDelay = delay*1000;}
		
		var duration = 4000;
		if(dur != undefined){duration = dur*1000;}
		var id = $(this).attr("id");

		$("#"+id).css("position", "relative");
		$("#"+id).css("height", $("#"+id).find("IMG").attr("height")+"px");
		$("#"+id).css("width", $("#"+id).find("IMG").attr("width")+"px");
		
		var css = 
		{
			"position": "absolute",
			"top": "0",
			"left": "0",
			"right": "0",
			//"margin-left": "auto",
			//"margin-right": "auto",
			"z-index": "8",
			"opacity": "0.0"
		}
		
		$("#"+id).find("IMG").css(css);
		$("#"+id).find("IMG.active").css("z-index", "10");
		$("#"+id).find("IMG.active").css("opacity", "1.0");
		$("#"+id).find("IMG.last-active").css("z-index", "9");
		//initSwitch(id, duration);
		if(randomType != undefined)
		{
			switch(randomType)
			{
				case 1:
				case true:
				{
					isRandom = true;
					break;
				}
				case 2:
				{
					isRandom = false;
					rndNum = Math.floor(Math.random() * $("#"+id).find("IMG").length );
					$("#"+id).find("IMG:eq("+rndNum+")").addClass("active");
				}
				default:
				{
					isRandom = false;
					break;
				}
			}
		}
		else
		{
			isRandom = false;
		}
		
		setTimeout(function() { initSwitch(id, duration, isRandom) }, initialDelay);
	};

	/**
	 * jQuery.fn.sortElements
	 *
	 * Establece a un selector una funcion de orden
	 *
	 * USO: 
	 * $("#pais option").sortElements(jQuery.sortByName);
	 *
	 * --------------
	 * @param Function comparator: Exactly the same behaviour as [1,2,3].sort(comparator)
	 *   
	 * @param Function getSortable
	 *   A function that should return the element that is
	 *   to be sorted. The comparator will run on the
	 *   current collection, but you may want the actual
	 *   resulting sort to occur on a parent or another
	 *   associated element.
	 *   
	 *   E.g. $('td').sortElements(comparator, function(){
	 *      return this.parentNode; 
	 *   })
	 *   
	 *   The <td>'s parent (<tr>) will be sorted instead
	 *   of the <td> itself.
	 */
	jQuery.fn.sortElements = (function(){
	 
		var sort = [].sort;
	 
		return function(comparator, getSortable) {
	 
			getSortable = getSortable || function(){return this;};
	 
			var placements = this.map(function(){
	 
				var sortElement = getSortable.call(this),
					parentNode = sortElement.parentNode,
	 
					// Since the element itself will change position, we have
					// to have some way of storing its original position in
					// the DOM. The easiest way is to have a 'flag' node:
					nextSibling = parentNode.insertBefore(
						document.createTextNode(''),
						sortElement.nextSibling
					);
	 
				return function() {
	 
					if (parentNode === this) {
						throw new Error(
							"You can't sort elements if any one is a descendant of another."
						);
					}
	 
					// Insert before flag:
					parentNode.insertBefore(this, nextSibling);
					// Remove flag:
					parentNode.removeChild(nextSibling);
	 
				};
	 
			});
	 
			return sort.call(this, comparator).each(function(i){
				placements[i].call(getSortable.call(this));
			});
	 
		};
	 
	})();
	
	/**
	 * Funcion coparadora para usar junto con sortElements
	 * @param string a: texto A para ordenar
	 * @param string b: texto B para ordenar
	 * @return int: devuelve -1 o 1 en funcion de cual de los dos es mayor alfabeticamente 
	 *
	 * Uso:
	 * $("#pais option").sortElements(jQuery.sortByName);
	 *
	 */
	jQuery.sortByName = function(a,b)
	{
		return $(a).text().toLowerCase() > $(b).text().toLowerCase() ? 1 : -1;
	};
	
	/**
	 * Activa la animacion de sobre/reposo a una imagen (es necesario que la imagen tenga una equivalencia en el directorio sobre y otra en reoposo)
	 * @param string currentSection: especifica la seccion actual para saltarse la parte de reposo/sobre y marcarlos siempre como seleccionado
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeButtons(currentSection);
	 *
	 */
	$.fn.makeButtons = function(currentSection)
	{
		if($(this).size() == 0)
		{
			//Error, no existe el elemento al que se le quiere aplicar la funcion
			return;
		}

		if(currentSection!=undefined && $(this).attr("id") == currentSection)
		{
			$(this).attr("src", $(this).attr("src").replace(/reposo/, "sobre"));
		}
		else
		{
			if($(this).attr("src") != undefined)
			{
				if($(this).attr("src").indexOf("reposo")!=-1)
				{
					$(this).hover(function(){$(this).attr("src", $(this).attr("src").replace(/reposo/, "sobre"))},
								  function(){$(this).attr("src", $(this).attr("src").replace(/sobre/, "reposo"))});
				}
				else
				{
					$(this).hover(function(){$(this).stop().animate({opacity: 'https://www.extinvalusa.com/javascript/0.75'}, 'fast');},
								  function(){$(this).stop().animate({opacity: '1'}, 'fast');});
				}
			}
		}
		
		$(this).css("cursor", "pointer");
		return $(this);
	};
	
	/**
	 * Activa la animacion de sobre/reposo a una imagen dentro de un elemento html (es necesario que la imagen tenga una equivalencia en el directorio sobre y otra en reoposo)
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeButtonsInside();
	 *
	 */
	$.fn.makeButtonsInside = function()
	{
		var image = $(this).find("img");
		if(image.size() == 0)
		{
			//Error, no existe el elemento al que se le quiere aplicar la funcion
			return;
		}
	
		if(image.attr("src").indexOf("reposo")!=-1)
		{
			$(this).hover(function(){image.attr("src", image.attr("src").replace(/reposo/, "sobre"))},
						  function(){image.attr("src", image.attr("src").replace(/sobre/, "reposo"))});
		}
		else
		{
			$(this).hover(function(){image.stop().animate({opacity: 'https://www.extinvalusa.com/javascript/0.75'}, 'fast');},
						  function(){image.stop().animate({opacity: '1'}, 'fast');});
		}
		
		$(this).css("cursor", "pointer");
		return $(this);
	};
	

	/**
	 * Convierte un elemento en un boton con sus efectos de over y out y se le asigna una accion en forma de funcion
	 * @param function clickFunctionName: accion que se ejecutara al hacer click
	 * @param function mouseOverFunctionName: accion que se ejecutara al pasar por encima
	 * @param function mouseOutFunctionName: accion que se ejecutara al sacar el raton de la zona activa
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeButtons(currentSection);
	 *
	 */
	$.fn.makeLinks = function(clickFunctionName, mouseOverFunctionName, mouseOutFunctionName)
	{
		$(this).click(clickFunctionName);
		$(this).hover(mouseOverFunctionName, mouseOutFunctionName);
		$(this).css("cursor", "pointer");
		return $(this);
	};

	/**
	 * Esclusiva de besoos.com, deberia de estar en otro sitio
	 */
	$.fn.makePlayerFromIMG = function(action)
	{
		if($(this).attr("src") == undefined)
			return;
		
		$(this).unbind("click").click(function()
		{
			var url = $(this).attr("src").replace(".jpg", ".flv");
			var ids = $(this).attr("id").replace("id_video_", "").split("_");
			var idVideo = ids[1]*1;
			var idPropietario = ids[0]*1;
			action(url, idVideo, idPropietario);
		});
	};


	/**
	 * Establece una accion (funcion o url) a una imagen y le aplica el $(selector).makeButtons([currentSection]); (Animacion de imagen con over y out).
	 * @param function action: accion que se ejecutara al hacer click
	 * @param string currentSection: seccion actual para poner el boton como seleccionado siempre en lugar de reposo o sobre
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeImgLink(action, currentSection);
	 *
	 * Vease tambien: makeAlink, makeTagLink, makeCufonLink
	 *
	 */
	$.fn.makeImgLink = function(action, currentSection)
	{
		if($(this).size() == 0)
		{
			//Error, no existe el elemento al que se le quiere aplicar la funcion
			return;
		}
		
		if($(this) == undefined || $(this).attr("src") == undefined)
		{
			$.log("Error al hacer un makeImgLink en la id: "+$(this).attr("id")+" classes: "+$(this).attr('class') +" esto no sera una imagen usa el makeTagLink, accion a asignar: "+action);
			//Error, no existe el elemento al que se le quiere aplicar la funcion
			return;		
		}
		
		//Tipo null (se le ha hecho un <a> antes <a><img></a>
		if(action == null)
		{
			//No hacer nada
		}
		//Tipo location
		else if(typeof(action) == "string")
		{
			$(this).click(function(){window.location = action});
		}
		//Tipo function
		else
		{
			$(this).click(action);
		}
		
		$(this).makeButtons(currentSection);
		return $(this);
	};
	
	/**
	 *
	 * Alias de makeImgLink
	 *
	 * Establece una accion (funcion o url) a una imagen y le aplica el $(selector).makeButtons([currentSection]); (Animacion de imagen con over y out).
	 * @param function action: accion que se ejecutara al hacer click
	 * @param string currentSection: seccion actual para poner el boton como seleccionado siempre en lugar de reposo o sobre
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeImgLinks(action, currentSection);
	 *
	 */
	$.fn.makeImgLinks = function(action, currentSection)
	{
		$(this).makeImgLink(action, currentSection);
		return $(this);
	};

	/**
	 * Establece una accion (funcion o url) a una etiqueta cualquiera de html (div o span generalmente)
	 * le aplica los eventos de (className_reposo y className_sobre) y className_seleccionado si estamos en la seccion actual
	 * @param function action: accion que se ejecutara al hacer click
	 * @param string className: raiz de la clase que se le pondra (si pasa menu se tendran que activar en css menu_reposo, menu_sobre y men_seleccionado)
	 * @param string currentSection: seccion actual para poner el boton como seleccionado siempre en lugar de reposo o sobre
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeTagLink(action, className, currentSection);
	 *
	 * Vease tambien: makeAlink, makeImgLink, makeCufonLink
	 *
	 */
	$.fn.makeTagLink = function(action, className, currentSection)
	{
		//Tipo location
		if(typeof(action) == "string")
		{
			$(this).click(function(){window.location = action});
		}
		//Tipo function
		else
		{
			$(this).click(action);
		}
	
		if(className!=undefined)
		{
			if($(this).attr("id") != currentSection)
			{
				$(this).hover(function(){$(this).removeClass(className+"_reposo").addClass(className+"_sobre")},
							  function(){$(this).removeClass(className+"_sobre").addClass(className+"_reposo")});
				$(this).addClass(className+"_reposo");
			}
			else
			{
				$(this).addClass(className+"_seleccionado");
			}
		}
		
		$(this).css("cursor", "pointer");
		return $(this);
	};

	/**
	 * Convierte una etiqueta a en un makeTagLink con eventos de reposo, sobre y seleccionado leyendo el href o pasandoselo como parametro
	 * le aplica los eventos de (className_reposo y className_sobre) y className_seleccionado si estamos en la seccion actual
	 * @param function action: accion que se ejecutara al hacer click
	 * @param string className: raiz de la clase que se le pondra (si pasa menu se tendran que activar en css menu_reposo, menu_sobre y men_seleccionado)
	 * @param string currentSection: seccion actual para poner el boton como seleccionado siempre en lugar de reposo o sobre
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeALink(action, className, currentSection);
	 * $(selector).makeALink("https://www.extinvalusa.com/javascript/location.php"); 						Ir a la url indicada (sobreescribe el href)
	 * $(selector).makeALink();										Ir a la url del href tambien se puede pasar (null o undefined)
	 * $(selector).makeALink(action);								Ejecutar una accion determinada
	 * $(selector).makeALink(null, className, currentSection);		Ir a la url indicada en href y aplicar classname y currentSection
	 *
	 * Vease tambien: makeTagLink, makeImgLink, makeCufonLink
	 *
	 */
	$.fn.makeALink = function(action, className, currentSection)
	{
		//Tipo location
		if(typeof(action) == "string")
		{
			$(this).click(function(){window.location = action});
		}
		//Tipo href
		else if ((action == undefined || action == null) && ($(this).attr("tagName") == "a" || $(this).attr("tagName") == "A") && $(this).attr("href") != undefined)
		{
			$(this).click(function(){window.location = $(this).attr("href")});
		}
		//Tipo function
		else
		{
			$(this).click(action);
		}
	
		if(className!=undefined)
		{
			if($(this).attr("id") != currentSection)
			{
				$(this).hover(function(){$(this).removeClass(className+"_reposo").addClass(className+"_sobre")},
							  function(){$(this).removeClass(className+"_sobre").addClass(className+"_reposo")});
				$(this).addClass(className+"_reposo");
			}
			else
			{
				$(this).addClass(className+"_seleccionado");
			}
		}
		
		$(this).css("cursor", "pointer");
		return $(this);
	};
	
	/**
	 * Convierte varios enlaces <a> en una especie de makeTagLink pero de forma simultanea.
	 * Especificamos una class comun para todos lo enlaces (cada uno con su id)
	 * La clase hover se tiene que aplicar sobre la id del elemento (#btn_elemento:hover) en el css
	 * La clase selected se tiene que aplicar tambien sobre la id del elemento pero convirtiendola en class y añadiendole _sel (.btn_elemento_sel)
	 * @param function action: accion que se ejecutara al hacer click (null para que sea el href)
	 * @param string currentSection: seccion actual para poner el boton como seleccionado
	 * @return void
	 *
	 * Uso:
	 * $(selector_tipo_class).makeALinkWithHoverByClass(action, currentSection);
	 * $(selector_tipo_class).makeALinkWithHoverByClass("https://www.extinvalusa.com/javascript/location.php"); 						Ir a la url indicada (sobreescribe el href)
	 * $(selector_tipo_class).makeALinkWithHoverByClass();										Ir a la url del href tambien se puede pasar (null o undefined)
	 * $(selector_tipo_class).makeALinkWithHoverByClass(action);								Ejecutar una accion determinada
	 * $(selector_tipo_class).makeALinkWithHoverByClass(null,  currentSection);					Ir a la url indicada en href y currentSection
	 *
	 * Vease tambien: makeTagLink, makeImgLink, makeCufonLink, makeALink
	 *
	 */
	$.fn.makeALinkWithHoverByClass = function(action, currentSection)
	{
		$(this).each(function()
		{
			//Tipo location
			if(typeof(action) == "string")
			{
				$(this).click(function(){window.location = action});
			}
			//Tipo href
			else if ((action == undefined || action == null) && ($(this).attr("tagName") == "a" || $(this).attr("tagName") == "A") && $(this).attr("href") != undefined)
			{
				$(this).click(function(){window.location = $(this).attr("href")});
			}
			//Tipo function
			else
			{
				$(this).click(action);
			}
			
			$(this).css("cursor", "pointer");
			
			if($(this).attr("id") == currentSection)
			{
				$(this).addClass(currentSection+"_sel");
			}
		});
	};


	/**
	 * Aplica un cufon y establece una accion (funcion o url) a una etiqueta cualquiera de html (div o span generalmente),
	 * le aplica los eventos de (className_reposo y className_sobre) y className_seleccionado si estamos en la seccion actual
	 * @param function action: accion que se ejecutara al hacer click
	 * @param string className: raiz de la clase que se le pondra (si pasa menu se tendran que activar en css menu_reposo, menu_sobre y men_seleccionado)
	 * @param string currentSection: seccion actual para poner el boton como seleccionado siempre en lugar de reposo o sobre
	 * @return void
	 *
	 * Uso:
	 * $(selector).makeCufonLink(action, className, currentSection);
	 *
	 * Vease tambien: makeTagLink, makeImgLink, makeALink
	 *
	 */
	$.fn.makeCufonLink = function(action, className, currentSection)
	{
		if($(this).size() == 0 || $(this) == undefined || $(this).attr("id") == undefined || $(this).attr("id") == null || $(this).attr("id") == ""  || !$(this).attr("id"))
		{
			//Error, no existe el elemento al que se le quiere aplicar la funcion
			return;
		}
	
		//Tipo location
		if(typeof(action) == "string")
		{
			$(this).click(function(){window.location = action});
		}
		//Tipo function
		else
		{
			$(this).click(action);
		}
		
		if(className!=undefined)
		{
			if($(this).attr("id") != currentSection)
			{
				$(this).hover(function(){$(this).removeClass(className+"_reposo").addClass(className+"_sobre");$.cufon($(this))},
							  function(){$(this).removeClass(className+"_sobre").addClass(className+"_reposo");$.cufon($(this))});
				$(this).addClass(className+"_reposo");
			}
			else
			{
				$(this).addClass(className+"_seleccionado");
			}
		}
		
		$.cufon($(this));	
		
		$(this).css("cursor", "pointer");
	};

	/*
	$.fn.makeImgUploader = function(allowedExtensions, url, maxSize)
	{
	var	allowedExtensions = ['jpg', 'png'];
	var url = 'https://www.extinvalusa.com/javascript/ajax/uploadImageProfilePhotos.php';
	var maxSize =  2*1024*1024;   //2 Megas maximo
	
	
		var uploader;
		var img = $(this).find("img");
		var IEVersion = getInternetExplorerVersion();
		var textoSubida = uploaderText(dragText, dropText, otherText, $(this).attr("id")+"_uploader", img.attr("src"), "a");
		console.log(textoSubida);
		
		uploader = new qq.FileUploader(
		{
			height: img.attr("height"),
			width: img.attr("width"),
			// pass the dom node (ex. $(selector)[0] for jQuery users)
			element: $(this)[0],
			// path to server-side upload script
			action: url,
			// ex. ['jpg', 'jpeg', 'png', 'gif'] or []
			allowedExtensions: allowedExtensions,    
			//Parameters to be send
			//params: { "idCertificacion": ""},
			// size limit in bytes, 0 - no limit
			// this option isn't supported in all browsers
			sizeLimit: maxSize,
			// template for one item in file list
			fileTemplate: '<li class="qq-upload-element">' +
					'<span class="qq-upload-file"><\/span>' +
					'<span class="qq-upload-spinner"><\/span>' +
					'<span class="qq-upload-size"><\/span>' +
					'<a class="qq-upload-cancel" href="#">Cancel<\/a>' +
					'<span class="qq-upload-failed-text">Failed<\/span>' +
				'<\/li>',
			template: textoSubida,
			onComplete: function(){alert("a")},
			onSubmit: function(){alert("b")}
		});
		
		$(this).find(".qq-upload-list").hide();
		$(this).find(".qq-upload-button").css("padding", "0px");
		$(this).find(".qq-upload-button").css("min-height", "0px");
		$(this).css("cursor", "pointer").find(".qq-upload-button input").css("cursor", "pointer").width(img.attr("width")).height(img.attr("height"));
		
		$(this).hover(function(){$(this).find(".qq-upload-button img").attr("src", img.attr("src").replace(/reposo/, "sobre"))},
					  function(){$(this).find(".qq-upload-button img").attr("src", img.attr("src").replace(/sobre/, "reposo"))});
	}
	*/
	
	//////////////////////////////////////////
	// FUNCTIONS: FIX DE INTERNET EXPLORER  //
	//////////////////////////////////////////
	
	/**
	 * Arregla los problemas del IE7 o anterior o vista compatibilidad con el css inline-block (al que el llama solo inline)
	 * @param string param1: selector al que se le aplicara el css
	 * @param string param2: selector al que se le aplicara el css
	 * .... todos los que se necesiten
	 * @return void
	 *
	 * Uso:
	 * $.fixInline(param1, param2, ...);
	 *
	 */
	jQuery.fixInline = function()
	{
		try
		{
			//Fix vista compatibilidad IE8 (modo ie7)
			if(isIE7prev())
			{
				for (var i = 0; i < arguments.length; ++i)
				{
					$(arguments[i]).css("display","inline");
				}
			}
		}
		catch(e)
		{
		}
	};

	/**
	 * Arregla los height de los selects que se ven mal en IE7 o anterior
	 * @param string param1: selector al que se le aplicara el css
	 * @param string param2: selector al que se le aplicara el css
	 * .... todos los que se necesiten
	 * @return void
	 *
	 * Uso:
	 * $.fixMultipleSelects(param1, param2, ...);
	 *
	 */
	jQuery.fixMultipleSelects = function()
	{
		try
		{
			//Fix vista compatibilidad IE8 (modo ie7)
			if(isIE7prev())
			{
				for (var i = 0; i < arguments.length; ++i)
				{
					try
					{
						$(arguments[i]).css("height","auto");
					}
					catch(e2)
					{
					}
				}
			}
		}
		catch(e)
		{
		}
	};

	/**
	 * Añade ficheros CSS exclusivamente a IE7 o anterior
	 * @param string param1: nombre y ruta completa o relativa de la localizacion del fichero css
	 * @param string param2: nombre y ruta completa o relativa de la localizacion del fichero css
	 * .... todos los que se necesiten
	 * @return void
	 *
	 * Uso:
	 * $.addCSS_IE7prev(param1, param2, ...);
	 *
	 */
	jQuery.addCSS_IE7prev = function()
	{
		try
		{
			//Fix vista compatibilidad IE8 (modo ie7)
			if(isIE7prev())
			{
				
				for (var i = 0; i < arguments.length; ++i)
				{
					$.include(arguments[i]);
				}
			}
		}
		catch(e)
		{
		}
	};
	
	/**
	 * Añade ficheros CSS exclusivamente a IE8 o anterior
	 * @param string param1: nombre y ruta completa o relativa de la localizacion del fichero css
	 * @param string param2: nombre y ruta completa o relativa de la localizacion del fichero css
	 * .... todos los que se necesiten
	 * @return void
	 *
	 * Uso:
	 * $.addCSS_IE8prev(param1, param2, ...);
	 *
	 */
	jQuery.addCSS_IE8prev = function()
	{
		try
		{
			//Fix vista compatibilidad IE8 (modo ie7)
			if(isIE8prev())
			{
				
				for (var i = 0; i < arguments.length; ++i)
				{
					$.include(arguments[i]);
				}
			}
		}
		catch(e)
		{
		}
	};
	
	/**
	 * Añade ficheros CSS exclusivamente a todos los ie
	 * @param string param1: nombre y ruta completa o relativa de la localizacion del fichero css
	 * @param string param2: nombre y ruta completa o relativa de la localizacion del fichero css
	 * .... todos los que se necesiten
	 * @return void
	 *
	 * Uso:
	 * $.addCSS_IE(param1, param2, ...);
	 *
	 */
	jQuery.addCSS_IE = function()
	{
		try
		{
			//Fix vista compatibilidad IE8 (modo ie7)
			if(getInternetExplorerVersion()>-1)
			{
				
				for (var i = 0; i < arguments.length; ++i)
				{
					$.include(arguments[i]);
				}
			}
		}
		catch(e)
		{
		}
	};

	/**
	 * Aplica la propiedad css de maxWidth a todos los exploradores (incluido ie7)
	 * @param string maxWidth: width maximo
	 * @return void
	 *
	 * Uso:
	 * $(selector).setMaxWidth(maxWidth);
	 *
	 * Vease tambien: setMinWidth, setMaxHeight, setMinHeight
	 *
	 */
	$.fn.setMaxWidth = function(maxWidth)
	{
	   var width=$(this).parent().width();
	   $(this).width("auto");
	
	   if (width == null|| width == 0)
	   {
		 //element not found or not visible
		 return;
	   }
	
	   //if content-width>max-width then resize to the max-width
	   if (width>maxWidth)
	   {
			$(this).width(maxWidth);
	   }
	   else
	   {
		   $(this).width($(this).parent().width());
	   }
	};
	
	/**
	 * Aplica la propiedad css de minWidth a todos los exploradores (incluido ie7)
	 * @param string minWidth: width minimo
	 * @return void
	 *
	 * Uso:
	 * $(selector).setMinWidth(minWidth);
	 *
	 * Vease tambien: setMaxWidth, setMaxHeight, setMinHeight
	 *
	 */
	$.fn.setMinWidth = function(minWidth)
	{
	   var width=$(this).parent().width();
	   $(this).width("auto");
	   
	   if (width == null|| width == 0)
	   {
		 //element not found or not visible
		 return;
	   }
	
	   //if content-width>max-width then resize to the max-width
	   if (width<=minWidth)
	   {
			$(this).width(minWidth);
	   }
	   else
	   {
			$(this).width($(this).parent().width());
	   }
	};

	/**
	 * Aplica la propiedad css de maxHeight a todos los exploradores (incluido ie7)
	 * @param string maxHeight: height maximo
	 * @return void
	 *
	 * Uso:
	 * $(selector).setMaxHeight(maxHeight);
	 *
	 * Vease tambien: setMaxWidth, setminWidth, setMinHeight
	 *
	 */
	$.fn.setMaxHeight = function(maxHeight)
	{
	   var height=$(this).parent().height();
	   $(this).height("auto");
	
	   if (height == null|| height == 0)
	   {
		 //element not found or not visible
		 return;
	   }
	
	   //if content-width>max-width then resize to the max-width
	   if (height>maxHeight)
	   {
		 $(this).height(maxHeight);
	   }
	   else
	   {
		   $(this).height($(this).parent().height());
	   }
	};

	/**
	 * Aplica la propiedad css de minHeight a todos los exploradores (incluido ie7)
	 * @param string minHeight: height minimo
	 * @return void
	 *
	 * Uso:
	 * $(selector).setMinHeight(minHeight);
	 *
	 * Vease tambien: setMaxWidth, setminWidth, setMaxHeight
	 *
	 */
	$.fn.setMinHeight = function(minHeight)
	{
	   var height=$(this).parent().height();
	   $(this).height("auto");
	
	   if (height == null|| height == 0)
	   {
		 //element not found or not visible
		 return;
	   }
	
	   //if content-width>max-width then resize to the max-width
	   if (height<minHeight)
	   {
		 $(this).height(minHeight);
	   }
	   else
	   {
		   $(this).height($(this).parent().height());
	   }
	};

	/* 
	 * Añade un color de fondo, gradiente a un elemento (class)
	 * @param options: opciones:
	 * 		tipoGradiente: 0-Horizontal, 1-Vertical
	 *		colorInicio: color de inicio en hexadecimal
 	 *		colorFin: color de fin en hexadecimal
	 *		colorInicioAlfa: si tiene o no alfa el color inicial y su valor de 0 a 100
	 *		colorFinAlfa: si tiene o no alfa el color final y su valor de 0 a 100
	 *		imagenFondoGradiente: url (puede ser SVG) del fondo (mas info: http://ie.microsoft.com/testdrive/graphics/svggradientbackgroundmaker/default.html) solo para IE9 y es opcional, si no se pasa puede utilizarse normalmente pero SIN bordes redondeados.
	 * @return void
	 *
	 * Uso:
	 * $(class_selector).gradient(options);
	 *
	 */
	$.fn.gradient = function(options)
	{
		var defaultOptions =
		{
			tipoGradiente: 0,
			colorInicio: "#EEF7FD",
			colorFin: "#C3E2F8",
			colorInicioAlfa: "0",
			colorFinAlfa: "100",
			imagenFondoGradiente: "",
			extraSelector: "",
			hover: false
		};
		options = $.extend(defaultOptions, options);
		if(options.tipoGradiente == 0)
		{
			options.inicio = "top";
			options.inicioChrome = "left top";
			options.finChrome = "left bottom";
		}
		else
		{
			options.inicio = "left";
			options.inicioChrome = "left top";
			options.finChrome = "right top";
		}
		if(options.hover)
		{
			if(options.hover.tipoGradiente == 0)
			{
				options.hover.inicio = "top";
				options.hover.inicioChrome = "left top";
				options.hover.finChrome = "left bottom";
			}
			else
			{
				options.hover.inicio = "left";
				options.hover.inicioChrome = "left top";
				options.hover.finChrome = "right top";
			}
		}
		
		var cssName = "gradient_"+options.colorInicio.replace("#", "")+"_"+options.colorFin.replace("#", "");
		var cssToAdd = "";
		var cssToAddHover = "";
		
		if ($.browser.msie)
		{
			if($.browser.version < 9)  /* IE6-9 */
			{
				//$(this).css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.colorInicio+"', endColorstr='"+options.colorFin+"',GradientType="+options.tipoGradiente+" )"); 
				cssToAdd = "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.colorInicio+"', endColorstr='"+options.colorFin+"',GradientType="+options.tipoGradiente+" )";
				if(options.hover!=false)
				{
					cssToAddHover = "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.hover.colorInicio+"', endColorstr='"+options.hover.colorFin+"',GradientType="+options.hover.tipoGradiente+" )";
				}
			}
			else if($.browser.version >= 10)
			{
				//$(this).css("background", "-ms-linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%"); /* IE10+ */
				cssToAdd = "background: -ms-linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%";
				if(options.hover!=false)
				{
					cssToAddHover = "background: -ms-linear-gradient("+options.hover.inicio+", "+options.hover.colorInicio+" "+options.hover.colorInicioAlfa+"%,"+options.hover.colorFin+" "+options.hover.colorFinAlfa+"%";
				}
			}
			else if($.browser.version == 9)
			{
				if(options.imagenFondoGradiente!="")
				{
					//$(this).css("background-image", options.imagenFondoGradiente);
					cssToAdd = "background-image: "+options.imagenFondoGradiente;
					if(options.hover!=false)
					{
						cssToAddHover = "background-image: "+options.hover.imagenFondoGradiente;
					}
				}
				else
				{
					//$(this).css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.colorInicio+"', endColorstr='"+options.colorFin+"',GradientType="+options.tipoGradiente+" )"); 
					cssToAdd = "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.colorInicio+"', endColorstr='"+options.colorFin+"',GradientType="+options.tipoGradiente+" )";
					if(options.hover!=false)
					{
						cssToAddHover = "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='"+options.hover.colorInicio+"', endColorstr='"+options.hover.colorFin+"',GradientType="+options.hover.tipoGradiente+" )";
					}
				}
			}
			else
			{
				
			}
		}
		else if($.browser.opera)
		{
			//$(this).css("background", "-o-linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%"); /* Opera11.10+ */
			cssToAdd = "background: -o-linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%)";
			if(options.hover!=false)
			{
				cssToAddHover = "background: -o-linear-gradient("+options.hover.inicio+", "+options.hover.colorInicio+" "+options.hover.colorInicioAlfa+"%,"+options.hover.colorFin+" "+options.hover.colorFinAlfa+"%)";
			}
		}
		else if($.browser.mozilla)
		{
			//$(this).css("background", "-moz-linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%"); /* FF3.6+ */
			cssToAdd = "background: -moz-linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%)";
			if(options.hover!=false)
			{
				cssToAddHover = "background: -moz-linear-gradient("+options.hover.inicio+", "+options.hover.colorInicio+" "+options.hover.colorInicioAlfa+"%,"+options.hover.colorFin+" "+options.hover.colorFinAlfa+"%)";
			}
		}
		else if($.browser.webkit)
		{
			//$(this).css("background", "-webkit-gradient(linear, "+options.inicioChrome+", "+options.finChrome+", color-stop("+options.colorInicioAlfa+"%,"+options.colorInicio+"), color-stop("+options.colorFinAlfa+"%,"+options.colorFin+"))"); /* Chrome10+,Safari5.1+ */
			cssToAdd = "background: -webkit-gradient(linear, "+options.inicioChrome+", "+options.finChrome+", color-stop("+options.colorInicioAlfa+"%,"+options.colorInicio+"), color-stop("+options.colorFinAlfa+"%,"+options.colorFin+"))";
			if(options.hover!=false)
			{
				cssToAddHover = "background: -webkit-gradient(linear, "+options.hover.inicioChrome+", "+options.hover.finChrome+", color-stop("+options.hover.colorInicioAlfa+"%,"+options.hover.colorInicio+"), color-stop("+options.hover.colorFinAlfa+"%,"+options.hover.colorFin+"))";
			}
		}
		else
		{
			//$(this).css("background", "linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%"); /* W3C standard pero no funciona .... */
			cssToAdd = "background: linear-gradient("+options.inicio+", "+options.colorInicio+" "+options.colorInicioAlfa+"%,"+options.colorFin+" "+options.colorFinAlfa+"%";
			if(options.hover!=false)
			{
				cssToAddHover = "background: linear-gradient("+options.hover.inicio+", "+options.hover.colorInicio+" "+options.hover.colorInicioAlfa+"%,"+options.hover.colorFin+" "+options.hover.colorFinAlfa+"%";
			}
		}

		if(cssToAdd && cssName)
		{
			var texto = "<style type='text\/css'>"+options.extraSelector+"."+cssName+"{"+cssToAdd+"} "+options.extraSelector+"."+cssName+":hover {"+cssToAddHover+"}<\/style>";
			$("head").append(texto);
			//$("<style>").prop("type", "text/css").append(options.extraSelector+"."+cssName+"{"+cssToAdd+"} "+options.extraSelector+"."+cssName+":hover{"+cssToAddHover).appendTo("head");
			$(this).addClass(cssName);
		}
	};
	
	/* 
	 * Añade una sombra a un texto incluso si el navegador no tiene soporte de sobra de css3
	 * @param json options: opciones de css
	 * @return void
	 *
	 * Uso:
	 * $(selector).textShadow(options);
	 *
	 * Requires: jQuery 1.2+
	 *
	 * Created by Martin Hintzmann 2008 martin [a] hintzmann.dk
	 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
	 *
	 * Version: 0.2
	 * Requires: jQuery 1.2+
	 * http://plugins.jquery.com/project/textshadow
	 */
	$.fn.textShadow = function(option)
	{
		if (!$.browser.msie) return;
		var IE6 = $.browser.version < 7;
		return this.each(function() {

			var el = $(this);
			var shadow = el.textShadowParse(this.currentStyle["text-shadow"]);
			shadow = $.extend(shadow, option);
			
			if(!$(this).is("div") && ($(this).css("background-image")!=undefined || $(this).css("background-color")!=undefined || $(this).css("background")!=undefined))
			{
				var newdiv = $("<div />");
				newdiv.html($(this).html());
				newdiv.attr("class", $(this).attr("class"));
				newdiv.attr("style", $(this).attr("style"));
				if($(this).attr("href")!=undefined)
				{
					var action = $(this).attr("href").replace("javascript:", "");
					newdiv.css("cursor", "pointer");
					newdiv.click(function(){eval(action)});
				}
				newdiv.width($(this).width());
				newdiv.height($(this).height());
//				newdiv.attr("style", $(this).attr("style"));
				var events = $(this).data("events");
				for(var event_type in events)
				{
					for(var index in events[event_type])
					{	
						newdiv.bind(event_type, events[event_type][index]);
					}
				}

				$(this).parent().append(newdiv);
				$(this).remove();
				el = newdiv;
				//				alert("Detectado un elemento no compatible porque no es un div y tiene fondo!");
			}

			el.textShadowRemove();

			if (shadow.x == 0 && shadow.y == 0 && shadow.radius == 0) return;

			if (el.css("position")=="static") {
				el.css({position:"relative"});
			}
			el.css({zIndex:"0"});
			if (IE6) {
				el.css({zoom:"1"});
			}

			var span=document.createElement("span");
			$(span).addClass("jQueryTextShadow");
			$(span).html(el.html());
			$(span).css({
				padding:		this.currentStyle["padding"],	
				width:		el.width(),
				position:	"absolute",
				zIndex:		"-1",
				color:		shadow.color!=null?shadow.color:el.css("color"),
				left:			(-parseInt(shadow.radius)+parseInt(shadow.x))+"px",
				top:			(-parseInt(shadow.radius)+parseInt(shadow.y))+"px"
			});

			if (shadow.radius != 0) {
				if (shadow.opacity != null) {
					$(span).css("filter", "progid:DXImageTransform.Microsoft.Blur(pixelradius="+parseInt(shadow.radius)+", enabled='true', makeShadow='true', ShadowOpacity="+shadow.opacity+")");
				} else {
					$(span).css("filter", "progid:DXImageTransform.Microsoft.Blur(pixelradius="+parseInt(shadow.radius)+", enabled='true')");
				}
			}	
			el.append(span);
		
	  });
	};
	
	/*
	 * Necesaria para hacer la sobra incluso si no soporta el navegador sombre de CSS3
	 * 
	 * Vease: textShadow
	 *
	 */
	$.fn.textShadowParse = function(value) 
	{
		value = String(value)
			.replace(/^\s+|\s+$/gi, '')
			.replace(/\s*!\s*important/i, '')
			.replace(/\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^\)]+)\s*\)/g, '($1/$2/$3/$4)')
			.replace(/\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^\)]+)\s*\)/g, '($1/$2/$3)')
	
		var shadow =
		{
			x      : 0,
			y      : 0,
			radius : 0,
			color  : null
		};

		if (value.length > 1 || value[0].toLowerCase() != 'none')
		{
			value = value.replace(/\//g, ',');
			var color;
			if ( value.match(/(\#[0-9a-f]{6}|\#[0-9a-f]{3}|(rgb|hsb)a?\([^\)]*\)|\b[a-z]+\b)/i) && (color = RegExp.$1) )
			{
				shadow.color = color.replace(/^\s+/, '');
				value = value.replace(shadow.color, '');
			}

			value = value.replace(/^\s+|\s+$/g, '').split(/\s+/).map(function(item) {return (item || '').replace(/^0[a-z]*$/, '') ? item : 0 ;});

			switch (value.length)
			{
				case 1:
					shadow.x = shadow.y = value[0];
					break;
				case 2:
					shadow.x = value[0];
					shadow.y = value[1];
					break;
				case 3:
					shadow.x = value[0];
					shadow.y = value[1];
					shadow.radius = value[2];
					break;
			}
			if ((!shadow.x && !shadow.y && !shadow.radius) || shadow.color == 'transparent')
			{
				shadow.x = shadow.y = shadow.radius = 0;
				shadow.color = null;
			}
		}

		return shadow;
	};

	/*
	 * Necesaria para hacer la sobra incluso si no soporta el navegador sombre de CSS3
	 * 
	 * Vease: textShadow
	 *
	 */
	$.fn.textShadowRemove = function()
	{
		if (!$.browser.msie) return;
		return this.each(function() {
			$(this).children("span.jQueryTextShadow").remove();
		});
	};
	
	
	/**
	* 
	*/
	/**
	 * Calcula y aplica el tamaño maximo de pantalla que se puede utilizar para aplicarselo a un div principal
	 * @param boolean onChange: hacer seguimiento de cuando cambie el tamaño de la ventana (volver a calcular)
	 * @param boolean sourceDocumentWindow: si es true o undefined se utilizara document si es false se utilizara window (la diferencia es que document nunca decrece de tamaño y window si)
	 * @return void
	 *
	 * Uso:
	 * $(selector).setMaxDocumentHeight(true);
	 *
	 */
	$.fn.setMaxDocumentHeight = function(onChange, sourceDocumentWindow, maxSize)
	{
		var element = $(this);
		var tipo;
		if(sourceDocumentWindow == undefined || sourceDocumentWindow == true)
		{
			tipo = document;
		}
		else
		{
			tipo =  window;
		}	
		if(maxSize!=undefined && $(tipo).height()>maxSize)
		{
			return;
		}
		
		var paddingTop = $(this).css("padding-top").replace("px", "")*1;
		var paddingBottom = $(this).css("padding-bottom").replace("px", "")*1;
		var marginTop = $(this).css("margin-top").replace("px", "")*1;
		var marginBottom = $(this).css("margin-bottom").replace("px", "")*1;
		var borderTop = $(this).css("border-top-width").replace("px", "")*1;
		var borderBottom = $(this).css("border-bottom-width").replace("px", "")*1;
		
		var sobrante = (isNaN(paddingTop) ? 0 : paddingTop) + (isNaN(paddingBottom) ? 0 : paddingBottom) + (isNaN(marginTop) ? 0 : marginTop) + (isNaN(marginBottom) ? 0 : marginBottom) + (isNaN(borderTop) ? 0 : borderTop) + (isNaN(borderBottom) ? 0 : borderBottom);

		$(this).height($(tipo).height()-sobrante+"px");
		//console.log( paddingTop+", "+paddingBottom+", "+marginTop +", "+ marginBottom +", "+ borderTop +", "+ borderBottom+", "+($(tipo).height()-sobrante));

		
		if(onChange!=undefined && onChange != false)
		{
			$(window).resize(function()
			{
				element.setMaxDocumentHeight(false, sourceDocumentWindow, maxSize);
			});
		}
	};
	
	/**
	 * Ocultar elementos para mostrarlos poco a poco con un boton (Tipo Ver Mas)
	 * @param String elementClass: el nombre de la "clase" de los elementos que se "paginaran" (cada elemento tiene que tener esa clase
	 * Ejemplo: <div class="a">1</div>   <div class="a">2</div>  <div class="a">3</div> => En este caso el elementClass seria "a"
	 * @param int maxElementsPerPage: numero de elementos que se iran agregando (primero seran x luego x por 2 luego x por 3....)
 	 * @param String viewMoreText: Texto que aparecera
	 * @return void 
	 *
	 * Uso:
	 *	$.viewMore()
	 */
	jQuery.viewMore = function(elementClass, maxElementsPerPage, viewMoreText)
	{
		$('.'+elementClass+':gt('+(maxElementsPerPage-1)+')').hide().last().after(
			$(viewMoreText).attr('href','#').click(function(){
				var a = this;
				$('.'+elementClass+':not(:visible):lt('+maxElementsPerPage+')').fadeIn(function(){
				 if ($('.'+elementClass+':not(:visible)').length == 0) $(a).remove();   
				}); return false;
			})
		);
	};
	
	$.fn.limitByHeight = function(readMoreButton, replaceId)
	{
		var height = $(this).css("height");
		var maxHeight = $(this).css("max-height");
		$(this).css("height", "inherit");
		$(this).css("max-height", "inherit");
		var realHeight = $(this).css("height");
		$(this).css("height", height);
		$(this).css("max-height", maxHeight);
		var hasBeenOverflowed = realHeight.replace("px", "")-height.replace("px", "") > 0;
		if(replaceId!=undefined && $(this).attr("id")!=undefined)
		{
			var id = $(this).attr("id").replace("id_noticia_", "")*1;
			readMoreButton = readMoreButton.replace("%id%", id);				
		}
		if(hasBeenOverflowed)
		{
			$(this).after(readMoreButton);
		}
	};
	
	/**
	 * jQuery JSON plugin 2.4.0
	 *
	 * @author Brantley Harris, 2009-2011
	 * @author Timo Tijhof, 2011-2012
	 * @source This plugin is heavily influenced by MochiKit's serializeJSON, which is
	 *         copyrighted 2005 by Bob Ippolito.
	 * @source Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
	 *         website's http://www.json.org/json2.js, which proclaims:
	 *         "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
	 *         I uphold.
	 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
	 */
	(function ($) {
		'use strict';
	
		var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
			meta = {
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"' : '\\"',
				'\\': '\\\\'
			},
			hasOwn = Object.prototype.hasOwnProperty;
	
		/**
		 * jQuery.toJSON
		 * Converts the given argument into a JSON representation.
		 *
		 * @param o {Mixed} The json-serializable *thing* to be converted
		 *
		 * If an object has a toJSON prototype, that will be used to get the representation.
		 * Non-integer/string keys are skipped in the object, as are keys that point to a
		 * function.
		 *
		 */
		$.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
			if (o === null) {
				return 'null';
			}
	
			var pairs, k, name, val,
				type = $.type(o);
	
			if (type === 'undefined') {
				return undefined;
			}
	
			// Also covers instantiated Number and Boolean objects,
			// which are typeof 'object' but thanks to $.type, we
			// catch them here. I don't know whether it is right
			// or wrong that instantiated primitives are not
			// exported to JSON as an {"object":..}.
			// We choose this path because that's what the browsers did.
			if (type === 'number' || type === 'boolean') {
				return String(o);
			}
			if (type === 'string') {
				return $.quoteString(o);
			}
			if (typeof o.toJSON === 'function') {
				return $.toJSON(o.toJSON());
			}
			if (type === 'date') {
				var month = o.getUTCMonth() + 1,
					day = o.getUTCDate(),
					year = o.getUTCFullYear(),
					hours = o.getUTCHours(),
					minutes = o.getUTCMinutes(),
					seconds = o.getUTCSeconds(),
					milli = o.getUTCMilliseconds();
	
				if (month < 10) {
					month = '0' + month;
				}
				if (day < 10) {
					day = '0' + day;
				}
				if (hours < 10) {
					hours = '0' + hours;
				}
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				if (milli < 100) {
					milli = '0' + milli;
				}
				if (milli < 10) {
					milli = '0' + milli;
				}
				return '"' + year + '-' + month + '-' + day + 'T' +
					hours + ':' + minutes + ':' + seconds +
					'.' + milli + 'Z"';
			}
	
			pairs = [];
	
			if ($.isArray(o)) {
				for (k = 0; k < o.length; k++) {
					pairs.push($.toJSON(o[k]) || 'null');
				}
				return '[' + pairs.join(',') + ']';
			}
	
			// Any other object (plain object, RegExp, ..)
			// Need to do typeof instead of $.type, because we also
			// want to catch non-plain objects.
			if (typeof o === 'object') {
				for (k in o) {
					// Only include own properties,
					// Filter out inherited prototypes
					if (hasOwn.call(o, k)) {
						// Keys must be numerical or string. Skip others
						type = typeof k;
						if (type === 'number') {
							name = '"' + k + '"';
						} else if (type === 'string') {
							name = $.quoteString(k);
						} else {
							continue;
						}
						type = typeof o[k];
	
						// Invalid values like these return undefined
						// from toJSON, however those object members
						// shouldn't be included in the JSON string at all.
						if (type !== 'function' && type !== 'undefined') {
							val = $.toJSON(o[k]);
							pairs.push(name + ':' + val);
						}
					}
				}
				return '{' + pairs.join(',') + '}';
			}
		};
	
		/**
		 * jQuery.evalJSON
		 * Evaluates a given json string.
		 *
		 * @param str {String}
		 */
		$.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
			/*jshint evil: true */
			return eval('(' + str + ')');
		};
	
		/**
		 * jQuery.secureEvalJSON
		 * Evals JSON in a way that is *more* secure.
		 *
		 * @param str {String}
		 */
		$.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
			var filtered =
				str
				.replace(/\\["\\\/bfnrtu]/g, '@')
				.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
				.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
	
			if (/^[\],:{}\s]*$/.test(filtered)) {
				/*jshint evil: true */
				return eval('(' + str + ')');
			}
			throw new SyntaxError('Error parsing JSON, source is not valid.');
		};
	
		/**
		 * jQuery.quoteString
		 * Returns a string-repr of a string, escaping quotes intelligently.
		 * Mostly a support function for toJSON.
		 * Examples:
		 * >>> jQuery.quoteString('apple')
		 * "apple"
		 *
		 * >>> jQuery.quoteString('"Where are we going?", she asked.')
		 * "\"Where are we going?\", she asked."
		 */
		$.quoteString = function (str) {
			if (str.match(escape)) {
				return '"' + str.replace(escape, function (a) {
					var c = meta[a];
					if (typeof c === 'string') {
						return c;
					}
					c = a.charCodeAt();
					return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
				}) + '"';
			}
			return '"' + str + '"';
		};
	
	}(jQuery));
	/*FIN DE JSON PLUGIN */
	
	
	/* INICIO DE poupSelect*/
	(function($)
	{
		$.fn.popupSelect = function(_options)
		{
			var thisElement = $(this);
			var options=
			{
				initialText: "Seleccione una opcion",
				removeText: "X",
				closeText: "X",
				cssSelector:
				{
					position: "absolute",
					background: "white",
					"z-index": 999
				},
				hideZeroValue: true,
				manualTopLeft: false
			};
			
			var id = "";
			
			var action = function()
			{
				//console.log(thisElement, offset);
				$("."+id+"_popupSelectSelectorInitialText").click(function()
				{
					if(!options.manualTopLeft)
					{
						var offset = $("#"+id+"_popupSelectSelector").offset();
						$.extend (options.cssSelector,
						{
							top: offset.top+$("#"+id+"_popupSelectSelector").height(),
							left: offset.left
						});
					}
					$("#"+id+"_popupSelectContent").css(options.cssSelector);
					$(".popupSelectContent").hide();
					$("#"+id+"_popupSelectContent").show();
				});
			};
			
			if(!$(this).is('select') || $(this).attr("id")==undefined)
			{
				throw new Error("No es un select de html valido o no tiene id: "+$(this));
			}
			if(!$(this).is(":visible"))
			{
				return;
			}
			$.extend (options, _options);
			
			id = $(this).attr("id");
			var initialText = "<div class='"+id+"_popupSelectSelectorInitialText popupSelectSelectorInitialText'>"+options.initialText+"<div>";
			
			$("<div id='"+id+"_popupSelectSelector' class='"+id+"_popupSelectSelector popupSelectSelector'>"+initialText+"</div>").insertAfter("#"+id);
			$("body").append("<div id='"+id+"_popupSelectContent' class='"+id+"_popupSelectContent popupSelectContent'></div>");
			$("#"+id).hide();
			$("#"+id+"_popupSelectContent").hide();
			if($("#"+id+" optGroup").size()>0)
			{
				$("#"+id+" optgroup").each(function()
				{
					var optGroup = $("<div class='"+id+"_popupSelectOptionGroup popupSelectOptionGroup'></div>");
					$("#"+id+"_popupSelectContent").append(optGroup);
					optGroup.append("<div class='"+id+"_popupSelectOptionGroupTitle popupSelectOptionGroupTitle'>"+$(this).attr("label")+"</div>");
					
					$(this).find(" option").each(function()
					{
						if(options.hideZeroValue && $(this).val() == 0)
						{
							return;
						}
						var option = "<div id='"+id+"_"+$(this).val()+"' class='"+id+"_popupSelectOption popupSelectOption' title='"+$(this).text()+"'>"+$(this).text()+"</div>";
						optGroup.append(option);
					});
				});
			}
			else
			{
				$("#"+id+" option").each(function()
				{
					if(options.hideZeroValue && $(this).val() == 0)
					{
						return;
					}
					var option = "<div id='"+id+"_"+$(this).val()+"' class='"+id+"_popupSelectOption popupSelectOption' title='"+$(this).text()+"'>"+$(this).text()+"</div>";
					$("#"+id+"_popupSelectContent").append(option);
				});
			}
			
			
			$("."+id+"_popupSelectOption").click(function()
			{
				$("#"+id+"_popupSelectSelector").html("<div class='"+id+"_popupSelectSelectorText popupSelectSelectorText' title='"+$(this).html()+"'>"+$(this).html()+"</div><div class='"+id+"_popupSelectSelectorRemove popupSelectSelectorRemove'>"+options.removeText+"</div>");
				$("#"+id).val($(this).attr("id").replace(id+"_", ""));
				$("#"+id+"_popupSelectContent").hide();
				$("."+id+"_popupSelectSelectorRemove").unbind("click").click(function()
				{
					$("#"+id+"_popupSelectSelector").html(initialText);
					$("#"+id).val($(this).find("option").val());
					action();
				});
			
			});
			
			$("#"+id+"_popupSelectContent").append("<div class='"+id+"_popupSelectClose popupSelectClose'>"+options.closeText+"</div>");
			$("."+id+"_popupSelectClose").click(function()
			{
				$("#"+id+"_popupSelectContent").hide();
			});
			action();

			var idSeleccionado = $(this).val();
			if(idSeleccionado!=0)
			{
				if(!isNaN(idSeleccionado))
				{
					$("#"+id+"_"+idSeleccionado).trigger("click");
				}
				else
				{
					$("#"+id+"_popupSelectContent .popupSelectOption:eq("+($(this).prop("selectedIndex")-1)+")").trigger("click");
				}
			}
			
			return this;
		}
		
	})(jQuery);
	/* FIN DE poupSelect*/
	
	/* INICIO DE givePoints*/
	(function($)
	{
		$.fn.givePoints = function(_options)
		{
			var thisElement = $(this);
			var selected = false;
			var currentPoints = -1;
			var options=
			{
				ajaxURL: null,
				success: null,
				onSubmit: null,
				overIcon: null,
				reposeIcon: null,
				elements: ".vote_icon",
				
				extraData: null,
				maxPoints: 5,
				currentPoints: -1,
				showFullItemsWhenPoints: false
			};
			
			var setIcons = function(currentPoints)
			{
				for(var i = 0; i<options.maxPoints; i++)
				{
					if(i<=currentPoints)
					{
						thisElement.find("img:eq("+i+")").attr("src", options.overIcon);
					}
					else
					{
						if(options.showFullItemsWhenPoints || !selected)
						{
							thisElement.find("img:eq("+i+")").attr("src", options.reposeIcon);
						}
						else
						{
							thisElement.find("img:eq("+i+")").hide();
						}
					}
				}
			};
			
			var disableIcons = function()
			{
				for(var i = 0; i<options.maxPoints; i++)
				{
					thisElement.find("img:eq("+i+")").css("cursor", "default");
					thisElement.find("img:eq("+i+")").unbind("click");
					thisElement.find("img:eq("+i+")").unbind("mouseover");
				}
			}
			
			$.extend (options, _options);
			currentPoints = options.currentPoints;
			
			if(options.ajaxURL == null || options.overIcon == null || options.reposeIcon == null)
			{
				throw new Error("Debes especificar un ajax para procesar peticiones, icono de reposo e icono de sobre");
			}
			
			if(currentPoints == -1)
			{
				thisElement.find(options.elements).each(function()
				{
					$(this).mouseover(function()
					{
						setIcons($(this).index());
					});
					$(this).click(function()
					{
						if(selected)
							return;
	
						selected = true;
						currentPoints = $(this).index()+1;
						var data = 
						{
							currentPoints: currentPoints
						}
						$.extend(data, options.extraData);
						var ajaxObject =
						{
							type:"POST",
							dataType:"json",
							data: data,
							url: options.ajaxURL,
							success: function(data, status, XMLHttpRequest)
							{
								if(options.onSuccess)
								{
									options.onSuccess(data, status, XMLHttpRequest, currentPoints);
								}
								else
								{
									alert("Has votado con "+currentPoints);
								}
								setIcons(currentPoints-1);
								disableIcons();
							},
							error: function(event, XMLHttpRequest, ajaxOptions, thrownError)
							{
								ajaxObject.success({"error_number": "-1", "error_message": "Error inesperado"}, XMLHttpRequest.status, XMLHttpRequest);
							}
						};
						if(options.onSubmit)
						{
							options.onSubmit();
						}
						$.ajax(ajaxObject);
					});
					$(this).css("cursor", "pointer");
				});
				
				thisElement.mouseout(function()
				{
					if(!selected)
					{
						setIcons(-1);
					}
				});
			}
			else
			{
				selected = true;
				setIcons(currentPoints-1);
			}

			return this;
		}
		
	})(jQuery);
	/* FIN DE givePoints*/
	
	/* OBTENER UNA PROPIEDAD DE CSS QUE PUEDE SER QUE SEA EXCLUSIVA DEL NAVEGADOR*/
	$.fn.getSpecialCSSProperties = function(property)
	{
		if($(this).css("-webkit-"+property))
		{
			return Array($(this).css("-webkit-"+property), "-webkit-"+property);
		}
		else if($(this).css("-moz-"+property))
		{
			return Array($(this).css("-moz-"+property), "-moz-"+property);
		}
		else if($(this).css("-ms-"+property))
		{
			return Array($(this).css("-ms-"+property), "-ms-"+property);
		}
		else if($(this).css("-o-"+property))
		{
			return Array($(this).css("-o-"+property), "-o-"+property);
		}
		else if($(this).css(property))
		{
			return Array($(this).css(property), property);
		}
		else
		{
			return null;
		}
	};

	/*
		OBTENER LOS Z-INDEX CERCANOS AL ELEMENTO
		Deben de tener puesto cada uno de ellos un z-index distinto
	*/
	$.fn.findNearZIndex = function(commonIdent)
	{
		var currentZIndex = $(this).css("z-index")*1;
		var maxZIndex = 0;
		var minZindex = 9999999999;
		var otherMaxElement = null;
		var otherMinElement = null;
		
		$(commonIdent).each(function()
		{
			var tempZIndex = $(this).css("z-index")*1 - currentZIndex;
			if(tempZIndex  != 0)
			{
				if(tempZIndex< 0 && maxZIndex<(-1)*tempZIndex)
				{
					maxZIndex = tempZIndex;
					otherMaxElement = $(this);
				}
				if(tempZIndex> 0 && minZindex>tempZIndex)
				{
					minZindex = tempZIndex;
					otherMinElement = $(this);
				}
			}
		});
		
		
		if(minZindex == 9999999999)
		{
			minZindex = null;
		}
		else
		{
			minZindex = minZindex+currentZIndex;
		}
		
		if(maxZIndex == 0)
		{
			maxZIndex = null;
		}
		else
		{
			maxZIndex = maxZIndex+currentZIndex;
		}
		
		return Array(maxZIndex, minZindex, otherMaxElement, otherMinElement, currentZIndex);
	};
	
	/*
		Agregar placeholder como texto para IE que no es compatible
	*/
	$.fn.fixPlaceHolderIE9 = function()
	{
		if(!isIE9prev())
		{
			return;
		}
		
		$(this).find("input, textarea, select").each(function()
		{
			if($(this).prop("nodeName").toLowerCase() != "select")
			{
				if($(this).attr("placeHolder"))
				{
					$(this).before("<div style='margin-bottom:3px;'>"+$(this).attr("placeHolder")+": </div>");
				}
			}
			else
			{
				if($(this).attr("title"))
				{
					$(this).before("<div style='margin-bottom:3px;'>"+$(this).attr("title")+": </div>");	
				}
			}
		});
	};
	
	/*Premite ejecutar un ajax infinito hacia arriba o abajo y asignarle un callback cuando se produzca el evento */
	//Nota: Antes de que el callback actue hay que guardarse los tamaños de las alturas para poder hacerlo recursivo y mover la posicion al nuevo cursor:
	/*
		//Ejemplo (la parte success del ajax para direccion arriba):
		function ajaxSuccess()
		{
			var scrollHeightBefore = $(".selector").get(0).scrollHeight;
			$(".selector").prepend("algo");
			var newScrollHeight = $(".selector").get(0).scrollHeight;
			if(newScrollHeight>scrollHeightBefore)
			{
				$(".selector").scrollTop(newScrollHeight-scrollHeightBefore);
			}
		}
	*/
	//Ejemplo para ejecutar el inifiteScroll en un selector cuando llegue al final direccion abajo con parametros
	//$(".selector").infiniteScrollAjax(function(){anyFunction("parameter1", "parameter2")}, 1);
	//Ejemplo para ejecutar el inifiteScroll en un selector cuando llegue al principio direccion arriba sin parametros
	//$(".selector").infiniteScrollAjax(anyFunction, 0);
	(function($)
	{
		$.fn.infiniteScrollAjax = function(callback, arribaAbajo, margen)
		{
			// return null if not exists
			if(this.length == 0)
			{
				return null;
			}
			
			// support multiple elements
			if (this.length > 1)
			{
				this.each(function() { $(this).infiniteScrollAjax(callback, arribaAbajo, margen) });
				return this;
			}
			
			var previousCall = this.data("infiniteScrollAjax");
			if(previousCall)
			{
				return previousCall;
			}
		
			// private variables
			var lock = false;
			var enabled = false;
			var element = this;
		
			// private methods
			//var foo = function() {}
			//public methods
			//this.bar= function(){}
		
			this.getScrollHeigth = function()
			{
				if(element.is(document))
				{
					var body = document.body,
						html = document.documentElement;
									   
					scrollHeight = Math.max( body.scrollHeight, body.offsetHeight, 
									   html.clientHeight, html.scrollHeight, html.offsetHeight );
				}
				else
				{
					scrollHeight = $(this).get(0).scrollHeight;
					if(scrollHeight <= $(this).height())
					{
						return this;
					}
				}
				
				return scrollHeight;
			};
		
			// public methods        
			this.initialize = function(callback, arribaAbajo, margen)
			{
				if(margen == undefined)
				{
					margen = 0;
				}
				
				//Si hacemos que sea cuando llege arriba del todo lo movemos ya abajo automaticamente
				if(arribaAbajo == 0)
				{
					$(this).scrollTop(element.getScrollHeigth());
				}
				enabled = true;
				$(this).scroll(function()
				{
					var limitAchived = false;
					
					if(arribaAbajo == 0)
					{
						if($(this).scrollTop() == 0)
						{
							limitAchived = true;
						}
					}
					else
					{
						limitAchived = $(this).scrollTop() + $(window).height() + margen >= element.getScrollHeigth();
					}

					if(limitAchived && !lock)
					{
						lock = true;
						callback();
					}
				});
				
				return this;
			};

			this.release = function()
			{
				lock=false;
			}
			
			this.isLocked = function()
			{
				return lock;
			}
			
			this.isEnabled = function()
			{
				return enabled;
			}
			
			this.remove = function()
			{
				enabled = false;
				$(this).unbind("scroll");
				this.removeData("infiniteScrollAjax");
			}
			
			this.reset = function(callback, arribaAbajo, margen)
			{
				enabled = false;
				$(this).unbind("scroll");
				this.removeData("infiniteScrollAjax");
				return $(this).infiniteScrollAjax(callback, arribaAbajo, margen);
			}
			
			this.callbackFinished = function(continueDestroy)
			{
				if(continueDestroy)
				{
					this.remove();
				}
				else
				{
					this.release();
				}
			}

			this.data("infiniteScrollAjax", this);
			return this.initialize(callback, arribaAbajo, margen);
		}
	})(jQuery);