// ==UserScript==
// @name         KoreuScript
// @namespace    Benissou/KoreuScript
// @version      0.9.4
// @author       Benissou
// @description  Amélioration du site Koreus.com
// @homepage     https://www.koreus.com/modules/newbb/topic165924.html
// @icon         https://k.img.mu/qTOXTs.png
// @updateURL    https://openuserjs.org/meta/Benissou/KoreuScript.meta.js
// @include      http://www.koreus.com/*
// @include      https://www.koreus.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @connect      appli.koreus.com
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @copyright    2016+, Benissou
// @license      MIT
// ==/UserScript==

// ==OpenUserJS==
// @author       Benissou
// @collaborator Boboss
// ==/OpenUserJS==


/*jshint multistr: true */

var emo_smile = [
  "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖",
  "😗", "😘", "😙", "😚", "😛", "😜", "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩", "😪", "😫", "😬", "😭",
  "😮", "😯", "😰", "😱", "😲", "😳", "😴", "😵", "😶", "😷", "😸", "😹", "😺", "😻", "😼", "😽", "😾", "😿", "🙀", "🙁", "🙂", "🙃", "🙄"
];


(function() {
  'use strict';

  GM_addStyle('\
  .checkboxks {display: none;}\
  .checkboxks+label { position: relative; padding-left: 55px; cursor: pointer; }\
  	.checkboxks+label::before, .checkboxks+label::after { content: ""; position: absolute; border: 1px solid #777; transition: background-color .2s; }\
  	.checkboxks+label::before { left: 0; top: -3px; width: 45px; height: 20px; background: #DDDDDD; border-radius: 15px; }\
  	.checkboxks+label::after { left: 5px; top: 2px; width: 10px; height: 10px; background: #461B1B; border-radius: 50%; }\
  .checkboxks:checked+label::before {background: #34495E;}\
  .checkboxks:checked+label::after { background: #39D2B4; left: 30px; }\
  .checkboxks+label .ui { position: absolute; left: 30px; font-size: 14px; font-weight: bold; transition: all .2s; }\
  .checkboxks:checked+label .ui {left: 6px;}\
  .checkboxks+label .ui::after { content: "✖"; left: 28px; }\
  .checkboxks:checked+label .ui::after { content: "✓"; color: #39D2B4; }\
');

  GM_addStyle('.top {position: fixed;width: auto;top: 0;left: 0;right: 0;z-index: 1000;font-size: .9375rem;}');

  // CSS des skins
  var CSSLook = 'td#leftcolumn div.blockTitle{color:#306;background:linear-gradient(#fbe38b,#fecc53);padding:4px 3px}td#usermenu{padding:0}td#leftcolumn div.blockContent{padding:0}td#usermenu a{transition:background .3s;padding:2px 0 2px 6px;border-right:0;border-color:#ccc}td#leftcolumn div.blockContent{font-size:10px}td#mainmenu{padding:0}td#mainmenu a{transition:background .3s;padding:2px 0 2px 6px;border-right:0}td#mainmenu a.menuMain{border-right:0;padding-left:6px}td#mainmenu a.menuTop{border-right:0;border-bottom:1px solid #ccc;padding-left:6px}td#mainmenu a.menuSub{border-right:0;background-color:#E0DFE7;border-left:10px solid #ccc;border-color:#ccc;padding-left:8px}td#usermenu a:hover{background-color:#FFF;box-shadow:0 0 5px 3px rgba(0,0,0,0.2)}td#mainmenu a.menuSub:hover,a.menuTop:hover,a.menuMain:hover{background-color:#FFF;box-shadow:0 0 5px 3px rgba(0,0,0,0.2)}td#leftcolumn div.blockContent ul{padding:0;margin:0}td#leftcolumn div.blockContent li{margin:0;transition:background .3s;padding:2px 0 2px 6px;border-bottom:1px solid #ccc;list-style:none}td#leftcolumn div.blockContent li:hover{background-color:#FFF;box-shadow:0 0 5px 3px rgba(0,0,0,0.2)}td#centercolumn div#content table.outer tbody tr.odd td{vertical-align:middle}td#centercolumn div#content table.outer tbody tr.even td{vertical-align:middle}table.index_category tbody .head{background:linear-gradient(#BEBEE4,#9A9ACE);font-weight:700;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);height:25px}table.index_category td{padding:3px;vertical-align:middle}.item{margin-left:10px}.itemFoot{margin-left:10px}td[width="4%"],td[valign="middle"]{vertical-align:middle}table.index_category{margin-top:0;margin-bottom:0}td#centercolumn div#content div#cat_1{background-color:#fff}div[style="margin-left: auto; margin-right: auto;text-align:center; width:500px"]{margin-left:auto!important;margin-right:20px!important;text-align:right!important;width:500px!important}select{background-color:#FFF;border-top-left-radius:4px;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}div.dropdown .menu,div.dropdown .userbar{padding-left:0;text-align:center}table.outer > tbody > tr > th > div{padding-left:10px}#mainoption option{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:5px}table.outer{border:0}table.outer > tbody > tr:nth-child(4){box-shadow:0 6px 4px 0 rgba(0,0,0,0.15)}table.outer > tbody > tr:nth-child(1) > th{padding-right:10px}div#content{margin-left:10px}#forumoption option{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:3px 5px}#content > div:nth-child(5){padding-left:20px}#content div.dropdown #topicoption{margin-left:20px}#content > div:nth-child(13){padding-left:20px}table.outer > tbody > tr:nth-child(4){border-bottom-right-radius:15px;border-bottom-left-radius:15px}table.outer > tbody > tr{border-bottom-right-radius:0;border-bottom-left-radius:0}table.outer > tbody > tr:nth-child(4) > td:nth-child(1){border-bottom-left-radius:15px}table.outer > tbody > tr:nth-child(4) > td:nth-child(2){border-bottom-right-radius:15px;padding-right:10px}table.outer > tbody > tr:nth-child(1) > th:nth-child(1){border-top-left-radius:15px}table.outer > tbody > tr:nth-child(1) > th:nth-child(3){border-top-right-radius:15px}td#centercolumn div#content table.outer tbody tr.odd td{border-bottom-right-radius:0;border-bottom-left-radius:0}td#centercolumn div#content table.outer tbody tr.odd{border-bottom-right-radius:0;border-bottom-left-radius:0;box-shadow:none}span.itemPoster{padding:5px 1px 4px 5px;margin-right:5px;background-color:#E0DFE7;border-top-left-radius:10px;border-top-right-radius:10px}div.item{border-left:1px solid #c8c8c8;border-right:1px solid #c8c8c8;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-width:1px;border-bottom-color:#E0DFE7}div.itemHead{border-top-left-radius:10px;border-top-right-radius:10px;border-top-width:1px}div.item > div > h1{padding-left:10px}div.itemFoot{border-bottom-left-radius:10px;border-bottom-right-radius:10px;border-bottom-width:1px;box-shadow:0 6px 4px 0 rgba(0,0,0,0.15);background-color:#fff}div.itemFoot > span{padding-right:10px}#centercolumn{padding-right:10px}div.item > p{padding-left:10px}div.item > p > a > img{background-color:#9A9ACE;display:inline-block;border:0;border-radius:4px;padding:5px;transition:.3s}div.item > p > a > img:hover{box-shadow:0 0 2px 1px rgba(0,0,0,0.5);background-color:#fff}div#content{padding:0}#subject_pre,#messageColor,#messageFont,#messageSize,#newbb_form,select[name="add"],#\$dates_msg,#limit{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:2px 5px;border-top-left-radius:0}input[type="text"],textarea{box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;min-height:21px}input[type="checkbox"]{box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}input[type="submit"],input[type="button"],input[type="reset"]{min-height:21px;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;color:#306;background-color:#FFF;cursor:pointer}input[type="submit"]:hover,input[type="button"]:hover,input[type="reset"]:hover{box-shadow:0 2px 2px 0 rgba(0,0,0,0.5);background:none;background-color:#FFF}input[value="Recherche"],[value="Rechercher"],[value="Valider"],[value="Ok !"],[value="Ok"]{background:linear-gradient(#fbe38b,#fecc53);font-weight:700;cursor:pointer}input#contents_submit:hover,input[value="Recherche"]:hover,input[value="Rechercher"]:hover,input[value="Valider"]:hover,input[value="Ok !"]:hover,input[value="Ok"]:hover{background:linear-gradient(#fbe38b,#fecc53)}input#move,input#lu,input#nlu,input#del,input[value="?"],input[name="sa"],input[value="Citation"],input[value="Réponse Rapide"],input[value="Vider"],input[value="Prévisualiser"],input[value="Soumettre"],input[value="Ajouter"]{background:none;background-color:#FFF;margin-bottom:2px;cursor:pointer}td#centercolumn div form input[name="sa"]{background:linear-gradient(#fbe38b,#fecc53);font-weight:700;font-size:12px}input#reply{background:linear-gradient(#fbe38b,#fecc53);margin-bottom:2px;cursor:pointer;font-weight:700}';
  var CSSDark = 'body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#efefef;background-color:#353535!important}.navbar-default{background-color:#2C2C2C!important;border-color:#000}.navbar-default .navbar-nav > li > a:focus,.navbar-default .navbar-nav > li > a:hover{color:#fff;background-color:transparent}.navbar-default .navbar-nav > li > a,.navbar-default .navbar-text{color:#fff}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:14px;text-align:left;background-color:#2C2C2C;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}.dropdown-menu > li > a{clear:both;font-weight:400;color:#fff}.dropdown-menu > li > a:hover{background-color:#acaaba;color:#555}.dropdown-menu > .active > a,.dropdown-menu > .active > a:hover,.dropdown-menu > .active > a:focus{color:#fff;text-decoration:none;outline:0;background-color:#fecc53;color:#000}.container{background:transparent!important;border:0!important}li{margin-left:2px;list-style-type:none!important;color:#FFF}.thumbnail{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#252525;border:1px solid #000;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.panel{margin-bottom:20px;background-color:transparent;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.05);box-shadow:0 1px 1px rgba(0,0,0,0.05)}.btn-default{color:#000;background-color:#fecc53!important;border-color:#121212}.btn-default:hover{color:#fff;background-color:#9A9ACE!important;border-color:#121212}.pagination > li > a,.pagination > li > span{position:relative;float:left;padding:12px;line-height:1.42857143;text-decoration:none;color:#fff;background-color:#252525;border:1px solid #121212;margin-left:-1px}.pagination > li > a:hover{position:relative;float:left;padding:12px;line-height:1.42857143;text-decoration:none;color:#000;background-color:#fecc53;border:1px solid #121212;margin-left:-1px}.pagination > .active > a,.pagination > .active > span,.pagination > .active > a:hover,.pagination > .active > span:hover,.pagination > .active > a:focus,.pagination > .active > span:focus{z-index:2;color:#fff;background-color:#9A9ACE;border-color:#306;cursor:default}table{width:100%;font-size:12px;background-color:#303030!important;font-family:Verdana,Arial,Helvetica,sans-serif;color:#ccc}td#centercolumn{font-size:12px;background-color:#303030!important}td#leftcolumn div.blockTitle{color:#000;background:#fecc53;padding:4px 3px;text-transform:uppercase}td#leftcolumn{width:170px;border-right:0 solid #fecc53;font-size:12px;color:#306;background-color:#303030}td#usermenu{padding:0;background:#2C2C2C;color:#B8B8B8}td#leftcolumn div.blockContent{background:#2C2C2C;color:#B8B8B8;box-shadow:inset 0 0 5px 0 #000;padding:2px}a{color:#ddd}a:hover{color:#fecc53}td#usermenu a{transition:background .3s;padding:2px 0 2px 6px;border:0;border-color:#000}td#mainmenu{padding:0!important}td#mainmenu a{transition:background .3s;padding:2px 0 2px 6px;border:0;margin:2px;box-shadow:inset 0 0 5px 0 #000;text-transform:uppercase}td#mainmenu a:hover{transition:background .3s;box-shadow:inset 0 0 20px 0 #000;background-color:rgba(255,255,255,0.1)}td#mainmenu a.menuMain{padding:5px;border:0}td#mainmenu a.menuTop{background-color:rgba(0,0,0,0.1);padding:5px;border-right:0;border:0;padding-left:6px}td#mainmenu a.menuSub{border:0;background-color:rgba(0,0,0,0.3);border-left:10px solid #fecc53;padding:5px;margin:5px;box-shadow:inset 0 0 5px 0 #000}td#leftcolumn div.blockContent{border:2px solid #fecc53}td#leftcolumn div.blockContent ul{padding:0;margin:0}td#leftcolumn div.blockContent li{transition:background .3s;padding:5px;border:0;margin:2px;box-shadow:inset 0 0 5px 0 #000}td#leftcolumn div.blockContent li:hover{transition:background .3s;box-shadow:inset 0 0 50px 0 #000;background-color:rgba(255,255,255,0.1)}td#centercolumn div#content table.outer tbody tr.odd td{vertical-align:middle}td#centercolumn div#content table.outer tbody tr.even td{vertical-align:middle}table.index_category tbody .head{background:#404040;font-weight:700;box-shadow:inset 0 0 20px 0 rgba(0,0,0,0.15);height:40px}table.index_category td{padding:3px;vertical-align:middle}tr .even{box-shadow:inset 0 0 0 0 rgba(0,0,0,0.5);border:solid 1px #252525}tr .odd{box-shadow:inset 0 0 0 0 rgba(0,0,0,0.5);border:solid 1px #252525}.item{margin-left:10px}.itemHead{box-shadow:0 0 5px 0 rgba(0,0,0,0.5)}.itemFoot{margin-left:10px;box-shadow:0 0 5px 0 rgba(0,0,0,0.5)}td[width="4%"],td[valign="middle"]{vertical-align:middle}table.index_category{margin-top:0;margin-bottom:0}td#centercolumn div#content div#cat_1{background-color:#fff}div[style="margin-left: auto; margin-right: auto;text-align:center; width:500px"]{margin-left:auto!important;margin-right:20px!important;text-align:right!important;width:500px!important}select{background-color:#252525;color:#fff;box-shadow:0 0 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}div.dropdown .menu,div.dropdown .userbar{padding-left:0;text-align:center}table.outer > tbody > tr > th > div{padding-left:10px}#mainoption option{box-shadow:0 0 6px 0 rgba(0,0,0,0.15);padding:5px}table.outer{border:0}table.outer > tbody > tr:nth-child(4){box-shadow:0 6px 4px 0 rgba(0,0,0,0.15)}table.outer > tbody > tr:nth-child(1) > th{padding-right:10px}#forumoption option{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:3px 5px}#content > div:nth-child(5){padding-left:20px}#content div.dropdown #topicoption{margin-left:20px}#content > div:nth-child(13){padding-left:20px}tr.even td{background-color:#343434;padding:5px}tr.odd td{background-color:#292929;padding:5px}div.xoopsQuote{background:#121212;border:1px solid #323232;font-family:Verdana,Arial,Helvetica,sans-serif;padding:0 6px 6px;font-size:12px;color:#AAA}td#rightcolumn{width:170px;border-left:1px solid #ccc;font-size:12px;background-color:TRANSPARENT}td#centerCcolumn div.blockContent{border:1px solid #000;padding:3px;margin-right:0;margin-left:0;margin-bottom:2px;line-height:120%;color:#000}h1,h1 a{margin-top:0;margin-bottom:0;font-weight:700;color:#fecc53;background-color:transparent;font-size:18px;text-decoration:none}td#centercolumn th{background-color:#252525;font-weight:700;color:#fecc53;vertical-align:middle;padding:10px}.even{background-color:transparent;padding:15px}.comUserStat{font-size:10px;color:#fff;font-weight:700;border:0 solid #111;background-color:transparent;margin:0;padding:2px}span.itemPoster{padding:5px 1px 4px 5px;margin-right:5px;color:#fecc53;background:transparent}div.item{border:1px solid #000;border-bottom-width:0;background:#252525;padding:10px;box-shadow:inset 0 0 5px #000}div.itemHead{border:1px solid #000;background:#404040;padding:10px}div.itemInfo{border:1px solid #000;border-top-width:0;background:#505050}.itemTitle,.itemTitle a{font-weight:700;color:#fff;background-color:transparent;font-size:14px;text-decoration:none}.itemTitle a:hover{color:#fff!important;background-color:transparent!important}.itemText{margin-top:5px;margin-bottom:5px;line-height:1.5em;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:12px;color:#fff}.itemText a{color:#fecc53}.itemText a:hover{color:#9A9ACE!important;background:transparent!important}div.item > div > h1{padding-left:10px}div.itemFoot{border:1px solid #000;border-top-width:0;background:#404040}div.itemFoot > span{padding-right:10px}td#centerCcolumn legend.blockTitle{padding:3px;color:#fecc53;font-weight:700;margin-top:0;margin-right:0;margin-left:0}td#rightcolumn div.blockTitle{padding:5px;color:#fff;font-weight:700;background:#9A9ACE;text-align:center}td#rightcolumn{width:170px;border-left:0 solid #ccc;font-size:12px;background-color:TRANSPARENT}td#rightcolumn div.blockContent{padding:0;line-height:120%;background-color:#9A9ACE}#centercolumn{padding-right:10px}div.item > p{padding-left:10px}div.item > p > a > img{background-color:transparent;display:inline-block;border:0;box-shadow:inset 0 0 10px 0 #000;padding:2px;transition:.3s}div.item > p > a > img:hover{background-color:#fecc53}h2,h2 a{margin-top:0;margin-bottom:0;font-weight:700;color:#fecc53;background-color:transparent;font-size:16px;text-decoration:none}.foot{background-color:#181818;padding:5px;font-weight:700}.footer{background-color:#181818;padding:5px;font-weight:700}.footer a{background-color:transparent;padding:5px;font-weight:700}.small{color:#bbb}.small a{color:#fff}.odd{background-color:#252525;padding:0;padding-left:5px}.head{background-color:#161616;padding:5px;font-weight:700}div#content{padding:0}fieldset{border:solid 1px #111}#subject_pre,#messageColor,#messageFont,#messageSize,#newbb_form,select[name="add"],#\$dates_msg,#limit{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:2px 5px;border-top-left-radius:0}input[type="text"],textarea{box-shadow:0 0 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;min-height:20px;background-color:#111;color:#aaa}input[type="checkbox"]{box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}input[type="submit"],input[type="button"],input[type="reset"]{min-height:21px;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;color:#fecc53;background-color:#111!important;cursor:pointer}input[type="submit"]:hover,input[type="button"]:hover,input[type="reset"]:hover{box-shadow:inset 0 0 5px 0 rgba(0,0,0,0.5);background:none;background-color:#222!important}input[value="Recherche"],[value="Rechercher"],[value="Valider"],[value="Ok !"],[value="Ok"]{background:linear-gradient(#fbe38b,#fecc53);color:#222!important;font-weight:700;cursor:pointer}input#contents_submit:hover,input[value="Recherche"]:hover,input[value="Rechercher"]:hover,input[value="Valider"]:hover,input[value="Ok !"]:hover,input[value="Ok"]:hover{background:linear-gradient(#fbe38b,#fecc53)}input#move,input#lu,input#nlu,input#del,input[value="?"],input[name="sa"],input[value="Citation"],input[value="Réponse Rapide"],input[value="Vider"],input[value="Prévisualiser"],input[value="Soumettre"],input[value="Ajouter"]{background:none;color:#fecc53;background-color:#111!important;margin-bottom:2px;cursor:pointer}td#centercolumn div form input[name="sa"]{background:linear-gradient(#fbe38b,#fecc53);font-weight:700;font-size:12px}input#reply{background:linear-gradient(#fbe38b,#fecc53);margin-bottom:2px;cursor:pointer;font-weight:700}';




  // Initialise les variable permanentes
  var ThemeStyle = "Defaut";
  ThemeStyle = GM_getValue('ThemeSave');

  var CheckMessage = false;
  CheckMessage = GM_getValue('CheckMSave');

  var CheckPageDown = false;
  CheckPageDown = GM_getValue('CheckPSave');

  var CheckRepRapid = false;
  CheckRepRapid = GM_getValue('RepRapidSave');


  var CheckEmoji = false;
  CheckEmoji = GM_getValue('CheckEmojiSave');

  var VoteColor = false;
  VoteColor = GM_getValue('VoteColorSave');
  // ===================


  // Change le Theme =================
  switch (ThemeStyle) {
    case "Look":
      GM_addStyle(CSSLook);
      $('img[src*="//koreus.cdn.li/static/images/logo.jpg"]').attr("src", "http://k.img.mu/GYD7KO.png");
      break;
    case "Dark":
      GM_addStyle(CSSDark);
      $('img[src*="//koreus.cdn.li/static/images/logo.jpg"]').attr("src", "http://k.img.mu/GYD7KO.png");
      break;
    default:
  }
  // ==============================


  // Ajoute le menu ==================
  $('#leftcolumn').prepend('<div id="ScriptSection" class="blockContent"><button id="btnScript" type="button" style="width:100%">▼ Script Option</button></div>');

  $('#ScriptSection').append('<div id="MenuScript" style="display:none;padding-bottom:5px;">\
<div id="Theme" style="padding:5px">\
Thème : \
<select name="theme" style="width: 60%;float: right;" >\
<option value="Defaut">Aucun</option>\
<option value="Look">Koreus Look</option>\
<option value="Dark">Koreus Dark</option>\
</select> \
</div>\
<p style="padding-left:5px"><input name="ReponseCheck" id="Check_R_ID" class="checkboxks" type="checkbox"><label  name="ReponseCheck" for="Check_R_ID"><span class="ui"></span>Lien Message</label></p>\
<p style="padding-left:5px"><input name="PageCheck" class="checkboxks" id="Check_P_ID" type="checkbox"><label  name="PageCheck" for="Check_P_ID"><span class="ui"></span>Défilement</label></p>\
<p style="padding-left:5px"><input name="RapideStyleCheck" class="checkboxks" id="Check_RR_ID" type="checkbox"><label  name="RapideStyleCheck" for="Check_RR_ID"><span class="ui"></span>Editeur Rapide</label></p>\
<p style="padding-left:5px"><input name="EmojiCheck" class="checkboxks" id="Check_Emoji_ID" type="checkbox"><label  name="EmojiCheck" for="Check_Emoji_ID"><span class="ui"></span>Emoji</label></p>\
<p style="padding-left:5px"><input name="VoteColor" class="checkboxks" id="Check_VoteColor_ID" type="checkbox"><label  name="VoteColor" for="Check_VoteColor_ID"><span class="ui"></span>Couleur Vote</label></p>\
</div>');
  // ==============================



  // Ouverture/Fermeture du menu
  document.getElementById('btnScript').addEventListener('click', function() {
    Ouverture('MenuScript');
  });

  function Ouverture(id_name) {
    var var_name = document.getElementById(id_name);
    if (var_name.style.display != "none") {
      $("#btnScript").html('▼ Script Option');
      var_name.style.display = "none";
    } else {
      $("#btnScript").html('▲ Script Option');
      var_name.style.display = "block";
    }
  }
  // =======================


  // Change les variables permanentes
  $('select[name="theme"]').val(ThemeStyle);
  $('#Check_R_ID').prop("checked", CheckMessage);
  $('#Check_P_ID').prop("checked", CheckPageDown);
  $('#Check_RR_ID').prop("checked", CheckRepRapid);
  $('#Check_Emoji_ID').prop("checked", CheckEmoji);
  $('#Check_VoteColor_ID').prop("checked", VoteColor);

  $('select[name="theme"]').change(function() {
    GM_setValue('ThemeSave', this.value);
    location.reload();
  });

  $('#Check_R_ID').change(function() {
    CheckMessage = !CheckMessage;
    GM_setValue('CheckMSave', CheckMessage);
  });

  $('#Check_P_ID').change(function() {
    CheckPageDown = !CheckPageDown;
    GM_setValue('CheckPSave', CheckPageDown);
    location.reload();
  });

  $('#Check_RR_ID').change(function() {
    CheckRepRapid = !CheckRepRapid;
    GM_setValue('RepRapidSave', CheckRepRapid);
    location.reload();
  });

  $('#Check_Emoji_ID').change(function() {
    CheckEmoji = !CheckEmoji;
    GM_setValue('CheckEmojiSave', CheckEmoji);
    location.reload();
  });

  $('#Check_VoteColor_ID').change(function() {
    VoteColor = !VoteColor;
    GM_setValue('VoteColorSave', VoteColor);
    location.reload();
  });
  // ==========================


  // Ajoute le lien du message si l'option est cochée

  if (CheckMessage) {
    var url = new URL(window.location.href);
    var urlParams = new Map(url.searchParams);
    if (url.pathname == "/modules/news/comment_reply.php") {
      var com_itemid = urlParams.get('com_itemid');
      var com_id = urlParams.get('com_id');
      document.getElementById("com_text").value += "[url=https://www.koreus.com/modules/news/article" + com_itemid + ".html#comment" + com_id + "]Message[/url]";
    } else if (url.pathname == "/modules/newbb/reply.php") {
      var topic_id = urlParams.get('topic_id');
      var post_id = urlParams.get('post_id');
      var page_id = urlParams.get('start');
      document.getElementById("message").value += "[url=https://www.koreus.com/modules/newbb/topic" + topic_id + ((page_id > 0) ? "-" + page_id : "") + ".html#forumpost" + post_id + "]Message[/url]";
    }
  }

  //=====================================


  // Ajoute les boutons de défilement si l'option est coché
  if (CheckPageDown) {
    $('body').prepend('<div align="right" style="position:fixed; top:0; right:0;background-color:#9a9ace"><span id="ScrollUp" style="float:right;cursor: pointer;margin-left:2px;">▲</span><span id="ScrollDown" style="float:right;cursor: pointer;">▼</span></div>');

    document.getElementById("ScrollDown").addEventListener("click", function() {
      $("html, body").animate({
        scrollTop: $(document).height()
      }, "slow");
    });
    document.getElementById("ScrollUp").addEventListener("click", function() {
      $("html, body").animate({
        scrollTop: 0
      }, "slow");
    });
  }
  // =======================================



  // Ajoute l'éditeur si l'option est coché ==================
  if (CheckRepRapid) {
    if (window.location.href.indexOf("newbb/topic") > -1) {
      $('<img onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/url.gif" alt="url" onclick="xoopsCodeUrl(&quot;message&quot;, &quot;Entrez l\'URL du lien que vous voulez ajouter :&quot;, &quot;Entrez le titre du site web :&quot;);" style="">\
<img onclick="javascript:xoopsCodeQuote(&quot;message&quot;, &quot;Entrez le texte que vous voulez citer.&quot;);" onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/quote.gif" alt="quote" style="">\
<img onclick="javascript:xoopsCodeImg(&quot;message&quot;, &quot;Entrez l\'URL de l\'image que vous voulez ajouter.&quot;, &quot;Maintenant, entrez la position de l\'image.&quot;, &quot;\'R\' ou \'r\' pour droite, \'L\' ou \'l\' pour gauche, ou laisser vide.&quot;, &quot;ERREUR ! Entrez la position de l\'image.&quot;);" onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/imgsrc.gif" alt="imgsrc" style="">\
<img onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/video3.gif" alt="url" onclick="xoopsCodeVideo(&quot;message&quot;, &quot;Entrez l\'URL (Permalien) de la vidéo&quot;, &quot;Entrez le titre du site web :&quot;);" style=""><br>\
<select id="messageSize" onchange="setVisible(&quot;xoopsHiddenText&quot;);setElementSize(&quot;xoopsHiddenText&quot;,this.options[this.selectedIndex].value);">\
<option value="SIZE">TAILLE</option>\
<option value="xx-small">xx-small</option>\
<option value="x-small">x-small</option>\
<option value="small">small</option>\
<option value="medium">medium</option>\
<option value="large">large</option>\
<option value="x-large">x-large</option>\
<option value="xx-large">xx-large</option>\
</select><br>\
<img onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/bold.gif" alt="bold" style="">\
<img onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/italic.gif" alt="italic">\
<img onmouseover="style.cursor=&quot;hand&quot;" src="//media.koreus.com/images/underline.gif" alt="underline">\
<img src="//media.koreus.com/images/linethrough.gif" alt="linethrough" onmouseover="style.cursor=&quot;hand&quot;"><br>').insertBefore("#message");
    }
  }
  // =======================




  // Ajoute les emoji si l'option est coché
  if (CheckEmoji) {
    if (window.location.href.indexOf("comment_new.php") > -1) {
      $('<br id="emoji">').insertAfter("#com_text");
      $('<div id = "emoji-list" style="width:400px"></div').insertAfter("#emoji");
      appendArray(emo_smile, "com_text");
    } else if (window.location.href.indexOf("modules/newbb/") > -1) {
      $('<br id="emoji">').insertAfter("#message");
      $('<div id = "emoji-list" style="width:400px"></div').insertAfter("#emoji");
      appendArray(emo_smile, "message");
    }
  }

  function appendArray(array, messageId) {
    var list = "";
    for (var i = 0; i < array.length; i++) {
      list += '<a onclick="xoopsCodeSmilie(&quot;' + messageId + '&quot;, &quot; ' + array[i] + ' &quot;);" style="cursor: pointer;">' + array[i] + '</a>';
    }
    $('#emoji-list').append(list);
  }


  // =======================

  GM_addStyle("#leftcolumn.fixed{\
position:fixed;\
top:0;\
z-index: 999;\
}");

  GM_addStyle("#centercolumn.fixed{\
position:relative;\
padding-left:200px;\
}");

  // Check si sur Forum ou Article
  var bMessage = false;
  var bArticle = false;
  var textbox = "";
  var check = document.getElementById('com_text');
  if (check == null) {
    check = document.getElementById('message');
    if (check != null) {
      bMessage = true;
      textbox = "message";
    }
  } else {
    bMessage = true;
    bArticle = true;
    textbox = "com_text";
  }
  // ==========================


  // Si un forumlaire est sur la page
  if (bMessage) {
    var allImages = document.getElementsByTagName("img");
    var Bold;
    var Italic;
    var Underline;
    var Linethrough;

    for (var i = 0, max = allImages.length; i < max; i++) {

      if (allImages[i].alt === "bold") {

        Bold = allImages[i];
      }
      if (allImages[i].alt === "italic") {
        Italic = allImages[i];
      }
      if (allImages[i].alt === "underline") {
        Underline = allImages[i];
      }
      if (allImages[i].alt === "linethrough") {
        Linethrough = allImages[i];
      }

    }

    // ajoute les fonctions sur les boutons
    if (Bold != null && Italic != null && Underline != null && Linethrough != null) {

      Bold.removeAttribute("onclick");
      Bold.addEventListener('click', function() {
        AddQuote("[b]", "[/b]");
      });

      Italic.removeAttribute("onclick");
      Italic.addEventListener('click', function() {
        AddQuote("[i]", "[/i]");
      });

      Underline.removeAttribute("onclick");
      Underline.addEventListener('click', function() {
        AddQuote("[u]", "[/u]");
      });

      Linethrough.removeAttribute("onclick");
      Linethrough.addEventListener('click', function() {
        AddQuote("[d]", "[/d]");
      });

    }

    // supprime la textbox et le bouton ajouter
    if (document.getElementById("com_textAddtext") != null) {
      document.getElementById("com_textAddtext").remove();
    }

    if (document.getElementById("messageAddtext") != null) {
      document.getElementById("messageAddtext").remove();
    }


    for (i in document.getElementsByTagName('input')) {
      if (document.getElementsByTagName('input')[i].value == 'Ajouter') {
        document.getElementsByTagName('input')[i].remove();
        break;
      }
    }

    // Ajoute les fonctions aux menus (select)
    $('select').change(function() {


      // Articles

      if (this.id == "com_textSize") {
        AddQuote("[size=" + $(this).val() + "]", "[/size]");
      }

      if (this.id == "com_textFont") {
        AddQuote("[font=" + $(this).val() + "]", "[/font]");
      }

      if (this.id == "com_textColor") {
        this.style.backgroundColor = "#" + $(this).val();
        AddQuote("[color=" + $(this).val() + "]", "[/color]");
      }


      // Forum
      if (this.id == "messageSize") {

        AddQuote("[size=" + $(this).val() + "]", "[/size]");
      }

      if (this.id == "messageFont") {
        AddQuote("[font=" + $(this).val() + "]", "[/font]");
      }

      if (this.id == "messageColor") {
        //this.class = "ok";
        //insertAfter(this)
        //this.style.backgroundColor = "#"+  $(this).val();
        AddQuote("[color=" + $(this).val() + "]", "[/color]");
      }

    });


  }
  //==========================



  // fonction de remplacement
  function AddQuote(pre, post) {
    var elem = document.getElementById(textbox);
    var start = elem.selectionStart;
    var end = elem.selectionEnd;
    var len = elem.value.length;
    var sel_txt = elem.value.substring(start, end);

    elem.value = elem.value.substring(0, start) + pre + sel_txt + post + elem.value.substring(end, len);
  }
  //=====================



  // VoteLive ##############################################


  GM_addStyle('.voteWindow {position:absolute;z-index: 1000;right:10px;width:250px;margin-top:14px;padding:5px;background:#9A9ACE; visibility: hidden;}');

  function ShowVote(id) {

    var winID = id.getAttribute('id').replace('vote', '');
    var temp = "votewin" + winID;


    document.getElementById(temp).style.visibility = "visible";

    var GetDataURL;
    var selector;
    if (window.location.href.indexOf("/newbb/") > -1) {
      GetDataURL = 'https://appli.koreus.com/up&down.php?posts=' + winID + '&comments=';
    } else {
      GetDataURL = 'https://appli.koreus.com/up&down.php?posts=&comments=' + winID;
    }

    // Recupère les votes

    GM_xmlhttpRequest({
      method: "GET",
      url: GetDataURL,
      onload: parseAJAX_ResponseHTML
    });

    function parseAJAX_ResponseHTML(respObject) {
      var parser = new DOMParser();
      var responseDoc = parser.parseFromString(respObject.responseText, "text/html");


      var element1 = responseDoc.getElementsByTagName("table")[0];
      var element2 = responseDoc.getElementsByTagName("table")[1];


      //ajout du style sur les colones du tableau
      var tds1 = element1.getElementsByTagName("td");
      var i;
      for (i = 0; i < tds1.length; i++) {
        tds1[i].style.width = "50%";
        //tds1[i].style.border="solid 1px rgba(0,0,0,0.3)";
        tds1[i].style.padding = "5px";
        //tds1[i].style.textAlign="center";
        tds1[i].style.textTransform = "uppercase";
        //tds1[i].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.3) inset";
      }

      var tds2 = element2.getElementsByTagName("td");
      for (i = 0; i < tds2.length; i++) {
        tds2[i].style.width = "50%";
        //tds1[i].style.textAlign="center";
        //tds2[i].style.border="solid 1px rgba(0,0,0,0.3)";
        tds2[i].style.padding = "5px";
        //tds2[i].style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.3) inset";
      }



      // vide la fenetre et ajoute le contenue
      $(document.getElementById(temp)).contents().remove();
      document.getElementById(temp).appendChild(element1);
      document.getElementById(temp).appendChild(element2);
    }

  }

  function HideVote() {
    var fenetres = document.getElementsByClassName("voteWindow");
    for (var i = 0; i < fenetres.length; i++) {
      fenetres[i].style.visibility = "hidden";
    }
  }

  // Récupère tous les boutons vote up et ajoute une fonction hover qui appel la fonction ShowVote et HideVote
  var ArrowUp = document.getElementsByClassName("arrow-up");
  var ArrowUp2 = document.getElementsByClassName("arrow-up2");
  var PID;
  var VoteID;
  var Pourcent;

  for (var j = 0; j < ArrowUp.length; j++) {
    PID = ArrowUp[j].getAttribute('id').replace('up', '');
    VoteID = document.getElementById("vote" + PID);
    VoteID.style.cursor = "pointer";

    if (VoteColor) {
      Pourcent = VoteID.getAttribute("title").slice(VoteID.getAttribute("title").indexOf("(") + 1, VoteID.getAttribute("title").indexOf("%"));
      if (Pourcent < 50) {
        VoteID.style.color = "#ff0000";
      }
      if (Pourcent > 50) {
        VoteID.style.color = "#00ff00";
      }
    }
    VoteID.addEventListener("click", function() {
      ShowVote(this);
    });
    VoteID.addEventListener("mouseout", function() {
      HideVote();
    });

    ArrowUp[j].innerHTML = "<div class='voteWindow' id='votewin" + PID + "'></div>";
  }

  for (var k = 0; k < ArrowUp2.length; k++) {
    PID = ArrowUp2[k].getAttribute('id').replace('up', '');
    VoteID = document.getElementById("vote" + PID);
    VoteID.style.cursor = "pointer";

    if (VoteColor) {
      Pourcent = VoteID.getAttribute("title").slice(VoteID.getAttribute("title").indexOf("(") + 1, VoteID.getAttribute("title").indexOf("%"));
      if (Pourcent < 50) {
        VoteID.style.color = "#ff0000";
      }
      if (Pourcent > 50) {
        VoteID.style.color = "#00ff00";
      }
    }

    VoteID.addEventListener("click", function() {
      ShowVote(this);
    });
    VoteID.addEventListener("mouseout", function() {
      HideVote();
    });

    ArrowUp2[k].innerHTML = "<div class='voteWindow' id='votewin" + PID + "'></div>";
  }

  $(".voteWindow").append('<div style="height:100px;overflow:hidden;"><img id="myNewImage" src="http://k.img.mu/M0OYvC.gif" height=auto width="256" ><div>');


  // User Blacklist ##############################################
  // Contributor -Flo-
  // https://www.koreus.com/modules/newbb/topic165924-140.html#forumpost2539971

  GM_addStyle('.blBlock span { margin-left: 20px; }');
  GM_addStyle('.blBlock { font-weight: normal; }');
  GM_addStyle('.blBlock:hover { color: black; }');
  GM_addStyle('.blOptions span { font-weight: bold; cursor: pointer; }');
  GM_addStyle('.shutup { cursor: pointer; }');

  function blacklist(user) {
    GM_setValue(user, 'blacklisted');
    applyBlacklists(true);
  }

  function unblacklist(user) {
    GM_setValue(user, 'unblacklisted'); // Inutile de conserver cette clé, mais je n'ai pas trouvé comment supprimer une clé GM, GM_deleteValue ne semblant pas fonctionner.
    applyBlacklists(true);
  }

  function hideBlacklisted(postid, user) {
    postid.nextElementSibling.style.display = 'none';
    postid.innerHTML = '<div class="blBlock">🤐 <span class="blOptions">Message masqué (' + user + ' est blacklisté)<span class="blShow">Afficher le message</span><span class="blUnbl">Réautoriser ce membre</span></span></div>';
    var blBlock = postid.getElementsByClassName('blBlock')[0];
    var blOptions = postid.getElementsByClassName('blOptions')[0];

    blOptions.style.visibility = 'hidden';
    postid.addEventListener('click', function () {
      if (blOptions.style.visibility == 'hidden') {
        blOptions.style.visibility = 'visible';
      } else {
        blOptions.style.visibility = 'hidden';
      }
    });

    var blShow = postid.getElementsByClassName('blShow')[0];
    var blUnbl = postid.getElementsByClassName('blUnbl')[0];

    blShow.addEventListener('click', function () {
      postid.nextElementSibling.style.display = 'table';
    });
    blUnbl.addEventListener('click', function () {
      unblacklist(user);
    });
  }

  function applyBlacklists(refine) { // FONCTION PRINCIPALE
    var posts = $('a[id^="forumpost"]');

    for (var p = 0; p < posts.length; p++) {
      (function () {

        var post = posts[p].nextElementSibling;
        var postdd = post.getElementsByClassName('dropdown')[0];
        var poster = postdd.getElementsByTagName('option')[0].innerText;

        post.style.display = 'table';
        posts[p].innerHTML = '';

        if (!refine) {
          postdd.innerHTML += '<span class="shutup">🤐</span>';
          var shutup = postdd.getElementsByClassName('shutup')[0];
          shutup.style.visibility = 'hidden';

          postdd.addEventListener('mouseover', function () {
            shutup.style.visibility = 'visible';
          });
          postdd.addEventListener('mouseout', function () {
            shutup.style.visibility = 'hidden';
          });
          shutup.addEventListener('click', function () {
            blacklist(poster);
          });
        }

        if (GM_getValue(poster) == 'blacklisted') {
          hideBlacklisted(posts[p], poster);
        }

      }());
    }
  }

  applyBlacklists(false);

})();
