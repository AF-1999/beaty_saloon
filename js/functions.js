window.onerror = (function(){
    var errorList = [];
    function toStr(obj) {
        var str = '';
        for(k in obj){
            if(str != "") str += ";";
            str += k + ":" + obj[k];
        }
        return '{' + str + '}';
    }
    return function(message, url, lineNumber, charNumber){
        try {
            var source = location.protocol.toString() + "//" + location.host.toString();
            var regSource = source.replace(".", "\\.");
            var reg = new RegExp("^" + regSource);
            if(!url || !reg.test(url)) return;
            
            lineNumber = lineNumber || 0;
            charNumber = charNumber || 0;
            message += "\r\n Браузер: "+navigator.userAgent;
            var err = {text: message, file: url+":"+lineNumber+":"+charNumber+" \r\n "+location.href.toString(), type: "js"};
            var isSend = false;
            var strErr = toStr(err);
            for(var i = 0; i < errorList.length; i++){
                if(toStr(errorList[i]) == strErr) {
                    isSend = true;
                    break;
                }
            }
            
            if(!isSend) {
                errorList.push(err);
                sendError(err);
            }
                
        }catch(e){}
    };
})();
/// вар дамп на скрипте
function dump(obj) {
    var out = "";
    if(obj && typeof(obj) == "object"){
        for (var i in obj) {
            out += i + ": " + obj[i] + "\n";
        }
    } else {
        out = obj;
    }
    alert(out);
    return out;
}


function trim (str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length; --i >= 0;) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

//динамичная модалка//
function load_modal(link, data, fn){
    $.ajax({
        type: "POST",
        url: link,
        data: data,
        success: function(html){
            var data_url = link + "-" + json_encode(data);
            var a_modal = $("<div class=\"hidden ajax_modal\">" + html + "</div>");
            a_modal.attr("data-url", data_url);
            a_modal.css({"display":"none"});
            $("body").append(a_modal);
            if(typeof fn == "function") fn(a_modal);
        }
    });
}
function open_modal(a_modal, notClose, afterFn){
    var modal = $(".popup_block:first", a_modal);
    
    var notClose = notClose || false;
    var settings = {
        openAfter: function(el, n){
            if(typeof $().customSelect === "function") $("select.custom_form", n).customSelect("resize");
            if(typeof afterFn == "function") afterFn(n);
        }
    };
    
    if (typeof(uploadify_reset) == "function") uploadify_reset();
    if (typeof(custom_form_draw) == "function"){
        $(modal).find(".custom_form").each(function(){
            custom_form_elem($(this));
        });
    }
    if(typeof(pickmeup_compile) == "function") pickmeup_compile(modal);
    
    
    if(typeof $().customSelect === "function") $("select", modal).customSelect();
    var body = $("body");
    if(!body.hasClass("blocked_body") || notClose) modal.modal('open', settings); 
    else{
        body.modal("close", "all", {"closeAfter": function(m){
            if(!body.hasClass("blocked_body")){
                modal.modal('open', settings);
            }
        }});
    }
}

function ajax_modal(req_url, data, notClose, fn){
    data = data || {};

    var body = $("body");
    var data_url = req_url + "-" + json_encode(data);
    var a_modal = $(".ajax_modal[data-url='" + data_url + "']");
    var modal = $(".popup_block:first", a_modal);
    if(a_modal.length == 0 || modal.length == 0){
        if(modal.length == 0) a_modal.remove();
        return load_modal(req_url, data, function(modals) { open_modal(modals, notClose, fn); });
    }
    
    return open_modal(a_modal, notClose, fn);
}
/*end динамичная модалка*/


 ///аналог пхпшной html_entity_decode, спер с http://phpjs.org/functions/html_entity_decode/   
 function html_entity_decode (string, quote_style) {
 
  var hash_map = {},
    symbol = '',
    tmp_str = '',
    entity = '';
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

function htmlentities(string, quote_style, charset, double_encode) {
  var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
    symbol = '';
  string = string == null ? '' : string + '';

  if (!hash_map) {
    return false;
  }

  if (quote_style && quote_style === 'ENT_QUOTES') {
    hash_map["'"] = '&#039;';
  }

  if ( !! double_encode || double_encode == null) {
    for (symbol in hash_map) {
      if (hash_map.hasOwnProperty(symbol)) {
        string = string.split(symbol)
          .join(hash_map[symbol]);
      }
    }
  } else {
    string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function(ignore, text, entity) {
      for (symbol in hash_map) {
        if (hash_map.hasOwnProperty(symbol)) {
          text = text.split(symbol)
            .join(hash_map[symbol]);
        }
      }

      return text + entity;
    });
  }

  return string;
}


//типа мурзилка для хтмл_ентити_декоде
function get_html_translation_table (table, quote_style) {

  var entities = {},
    hash_map = {},
    decimal;
  var constMappingTable = {},
    constMappingQuoteStyle = {};
  var useTable = {},
    useQuoteStyle = {};

  // Translate arguments
  constMappingTable[0] = 'HTML_SPECIALCHARS';
  constMappingTable[1] = 'HTML_ENTITIES';
  constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
  constMappingQuoteStyle[2] = 'ENT_COMPAT';
  constMappingQuoteStyle[3] = 'ENT_QUOTES';

  useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
  useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

  if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
    throw new Error("Table: " + useTable + ' not supported');
    // return false;
  }

  entities['38'] = '&amp;';
  if (useTable === 'HTML_ENTITIES') {
    entities['160'] = '&nbsp;';
    entities['161'] = '&iexcl;';
    entities['162'] = '&cent;';
    entities['163'] = '&pound;';
    entities['164'] = '&curren;';
    entities['165'] = '&yen;';
    entities['166'] = '&brvbar;';
    entities['167'] = '&sect;';
    entities['168'] = '&uml;';
    entities['169'] = '&copy;';
    entities['170'] = '&ordf;';
    entities['171'] = '&laquo;';
    entities['172'] = '&not;';
    entities['173'] = '&shy;';
    entities['174'] = '&reg;';
    entities['175'] = '&macr;';
    entities['176'] = '&deg;';
    entities['177'] = '&plusmn;';
    entities['178'] = '&sup2;';
    entities['179'] = '&sup3;';
    entities['180'] = '&acute;';
    entities['181'] = '&micro;';
    entities['182'] = '&para;';
    entities['183'] = '&middot;';
    entities['184'] = '&cedil;';
    entities['185'] = '&sup1;';
    entities['186'] = '&ordm;';
    entities['187'] = '&raquo;';
    entities['188'] = '&frac14;';
    entities['189'] = '&frac12;';
    entities['190'] = '&frac34;';
    entities['191'] = '&iquest;';
    entities['192'] = '&Agrave;';
    entities['193'] = '&Aacute;';
    entities['194'] = '&Acirc;';
    entities['195'] = '&Atilde;';
    entities['196'] = '&Auml;';
    entities['197'] = '&Aring;';
    entities['198'] = '&AElig;';
    entities['199'] = '&Ccedil;';
    entities['200'] = '&Egrave;';
    entities['201'] = '&Eacute;';
    entities['202'] = '&Ecirc;';
    entities['203'] = '&Euml;';
    entities['204'] = '&Igrave;';
    entities['205'] = '&Iacute;';
    entities['206'] = '&Icirc;';
    entities['207'] = '&Iuml;';
    entities['208'] = '&ETH;';
    entities['209'] = '&Ntilde;';
    entities['210'] = '&Ograve;';
    entities['211'] = '&Oacute;';
    entities['212'] = '&Ocirc;';
    entities['213'] = '&Otilde;';
    entities['214'] = '&Ouml;';
    entities['215'] = '&times;';
    entities['216'] = '&Oslash;';
    entities['217'] = '&Ugrave;';
    entities['218'] = '&Uacute;';
    entities['219'] = '&Ucirc;';
    entities['220'] = '&Uuml;';
    entities['221'] = '&Yacute;';
    entities['222'] = '&THORN;';
    entities['223'] = '&szlig;';
    entities['224'] = '&agrave;';
    entities['225'] = '&aacute;';
    entities['226'] = '&acirc;';
    entities['227'] = '&atilde;';
    entities['228'] = '&auml;';
    entities['229'] = '&aring;';
    entities['230'] = '&aelig;';
    entities['231'] = '&ccedil;';
    entities['232'] = '&egrave;';
    entities['233'] = '&eacute;';
    entities['234'] = '&ecirc;';
    entities['235'] = '&euml;';
    entities['236'] = '&igrave;';
    entities['237'] = '&iacute;';
    entities['238'] = '&icirc;';
    entities['239'] = '&iuml;';
    entities['240'] = '&eth;';
    entities['241'] = '&ntilde;';
    entities['242'] = '&ograve;';
    entities['243'] = '&oacute;';
    entities['244'] = '&ocirc;';
    entities['245'] = '&otilde;';
    entities['246'] = '&ouml;';
    entities['247'] = '&divide;';
    entities['248'] = '&oslash;';
    entities['249'] = '&ugrave;';
    entities['250'] = '&uacute;';
    entities['251'] = '&ucirc;';
    entities['252'] = '&uuml;';
    entities['253'] = '&yacute;';
    entities['254'] = '&thorn;';
    entities['255'] = '&yuml;';
  }

  if (useQuoteStyle !== 'ENT_NOQUOTES') {
    entities['34'] = '&quot;';
  }
  if (useQuoteStyle === 'ENT_QUOTES') {
    entities['39'] = '&#39;';
  }
  entities['60'] = '&lt;';
  entities['62'] = '&gt;';


  // ascii decimals to real symbols
  for (decimal in entities) {
    if (entities.hasOwnProperty(decimal)) {
      hash_map[String.fromCharCode(decimal)] = entities[decimal];
    }
  }

  return hash_map;
}


function json_decode (data){
    if (data != ""){
        
        data = html_entity_decode(data);
        
        var data = data.replace(/\(-double-quots-\)/gi, "&quot;");;
        var data = data.replace(/^(\{.*\})(.*)$/ig, '$1');
        
        try {
            var data = $.parseJSON(data);   
        } catch(e) {
            sendError({file: location.href, text: data, type: "json"});
            data = null;
        }
        
    } else data = null;
    return data;
}




function json_encode (val) {
    val = JSON.stringify(val);
    return val;
}

 // пример использования: echo 'В Вашем почтовом ящике '.$n.' '.pluralForm($n, 'письмо', 'письма', 'писем');
function pluralForm(n, form1, form2, form5){
    n = Math.abs(n) % 100;
    
    n1 = n % 10;
    if (n > 10 && n < 20) return form5;
    if (n1 > 1 && n1 < 5) return form2;
    if (n1 == 1) return form1;
    return form5;
}
  
//извините люди, не имею понятия. скорее всего это нужно для типа поля формы - modalChooser, но не уверен.
function getRationalCols(kol){
    var colkol = Math.ceil(kol / 10);
    var rowkol = Math.ceil(kol / colkol);
    while (colkol * 2 < rowkol){
        colkol ++;
        rowkol = Math.ceil(kol / colkol);
    }
    
    return rowkol;
}

function str_replace(search, replace, val) {
  val = val.split(search);
  val = val.join(replace);
  return val;
}

var yaCounters = [];
function initYaCounters(){
    if(window.Ya && Ya._metrika && yaCounters.length == 0){
        var counters = Ya._metrika.counters;
        for(var k in counters){
            yaCounters.push(counters[k]);
        }
    } 
}
function yacounter_plus(id){
    if(!id) return;
    if(yaCounters.length == 0){
        initYaCounters();
    }
    if(yaCounters.length > 0){
        for(var i = 0; i < yaCounters.length; i++){
            yaCounters[i].reachGoal("goal_general");
            yaCounters[i].reachGoal(id);
        }
    }
    if (typeof(dataLayer) != "undefined"){
        dataLayer.push({'event': id});
    }
}

$(window).resize(function(){
    up_top_swing();
});

$(window).scroll(function(){
    up_top_swing();
});

function up_top_swing(){
    var upelem = $("#up_button");
    if (upelem.length > 0){
        
        if ($(window).scrollTop() > 0){
            upelem.css("display", "block")
        } else {
            upelem.css("display", "none")
        }
        if ($(".footer_container").offset().top - 36 < $(".up_button_control").offset().top ){
            if (!upelem.hasClass("up_button_absolute")){
                upelem.addClass("up_button_absolute");
            }
        } else {
            if (upelem.hasClass("up_button_absolute")){
                upelem.removeClass("up_button_absolute");
            }
        }
    }
}

$("#up_button").live("click", function(){
    $("html,body").animate({"scrollTop": 0},"speed",function(){});
})

function href_change(path){
    history.pushState({foo: 'bar'}, 'Title', path);
    window.addEventListener("popstate", function(e) {
        location.href = '';
    }, false);
    window.removeEventListener("popstate", null, null);
}

function moneyFormat(n) {
    var s = String(n);
    var k = s.indexOf('.');
    if (k < 0) {
        k = s.length;
        //s += '.00';
    }
    else {
        //s += '00';
    }
    s = s.substr(0, k + 3);
    for (var i = k - 3, j = n < 0 ? 1 : 0; i > j; i -= 3) s = s.substr(0, i) + '&nbsp;' + s.substr(i);
    return s;
}
function sendError(err) {
    $.ajax({
        type: "POST",  
        url: "/ajax/js_error.php",  
        data: err,
        async: true
    }); 
}
function getScrollBarWidth() {
    var div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollWidth;
}

function getChar(event) {
  var c = null;
  if (event.which == null) { // IE
    c = event.keyCode;
  }
  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    c = event.which;
  }
  if (!c || c < 32) return null; // спец. символ
  return String.fromCharCode(c);
}


/*$(window).resize(viewport_resize).ready(viewport_resize);

function viewport_resize(){
    width = window.outerWidth;
    if (width > 410){
        $("#viewport").attr("content", "width=device-width, initial-scale=1");
    } else {
        $("#viewport").attr("content", "width=410");
    }
}*/

//Надо сделать чтобы карта начинала масштабироваться от скролла только после клика по ней.
$(document).ready(function(){
    if ($("#map_block.map_block").length > 0){
        if (window.innerWidth > 750){
            setTimeout(function(){
                if ($("#map_block.map_block").css("position") == "static") $("#map_block.map_block").css("position", "relative");
                $("#map_block.map_block").append("<div class=\"map_block_blocker\"></div>");
            }, 1000)
        }
    }
})

$(".map_block_blocker").live("mousedown touchstart", function(){
    $(this).remove();
})