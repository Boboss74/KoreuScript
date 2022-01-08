// ==UserScript==
// @name         KoreuScript
// @namespace    Benissou/KoreuScript
// @version      0.10.15
// @author       Benissou
// @description  Amélioration du site Koreus.com
// @homepage     https://www.koreus.com/modules/newbb/topic165924.html
// @icon         https://k.img.mu/qTOXTs.png
// @updateURL    https://openuserjs.org/meta/Benissou/KoreuScript.meta.js
// @include      http://www.koreus.com/*
// @include      https://www.koreus.com/*
// @include      http://appli.koreus.com/*
// @include      https://appli.koreus.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://raw.githubusercontent.com/bryanwoods/autolink-js/1.0.2/autolink-min.js
// @connect      appli.koreus.com
// @grant        GM.deleteValue
// @grant        GM.setValue
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

(function () {
  'use strict'

  if (window.location.host === 'appli.koreus.com') {
    return improveAppli() // Amélioration de l'Appli Koreus
  }

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
')

  // Initialise les variable permanentes
  const themeStyle = GM_getValue('ThemeSave') === undefined ? false : GM_getValue('ThemeSave')
  let checkMessage = GM_getValue('CheckMSave') === undefined ? false : GM_getValue('CheckMSave')
  let checkPageDown = GM_getValue('CheckPSave') === undefined ? false : GM_getValue('CheckPSave')
  let checkRepRapid = GM_getValue('RepRapidSave') === undefined ? false : GM_getValue('RepRapidSave')
  let checkEmoji = GM_getValue('CheckEmojiSave') === undefined ? false : GM_getValue('CheckEmojiSave')
  let voteColor = GM_getValue('VoteColorSave') === undefined ? false : GM_getValue('VoteColorSave')
  let realVote = GM_getValue('RealVoteSave') === undefined ? true : GM_getValue('RealVoteSave')
  let commentsBelowVideo = GM_getValue('commentsBelowVideo') === undefined ? true : GM_getValue('commentsBelowVideo')
  // ===================

  // Change le Theme =================
  switch (themeStyle) {
    case 'Look':
      GM_addStyle('td#leftcolumn div.blockTitle{color:#306;background:linear-gradient(#fbe38b,#fecc53);padding:4px 3px}td#usermenu{padding:0}td#leftcolumn div.blockContent{padding:0}td#usermenu a{transition:background .3s;padding:2px 0 2px 6px;border-right:0;border-color:#ccc}td#leftcolumn div.blockContent{font-size:10px}td#mainmenu{padding:0}td#mainmenu a{transition:background .3s;padding:2px 0 2px 6px;border-right:0}td#mainmenu a.menuMain{border-right:0;padding-left:6px}td#mainmenu a.menuTop{border-right:0;border-bottom:1px solid #ccc;padding-left:6px}td#mainmenu a.menuSub{border-right:0;background-color:#E0DFE7;border-left:10px solid #ccc;border-color:#ccc;padding-left:8px}td#usermenu a:hover{background-color:#FFF;box-shadow:0 0 5px 3px rgba(0,0,0,0.2)}td#mainmenu a.menuSub:hover,a.menuTop:hover,a.menuMain:hover{background-color:#FFF;box-shadow:0 0 5px 3px rgba(0,0,0,0.2)}td#leftcolumn div.blockContent ul{padding:0;margin:0}td#leftcolumn div.blockContent li{margin:0;transition:background .3s;padding:2px 0 2px 6px;border-bottom:1px solid #ccc;list-style:none}td#leftcolumn div.blockContent li:hover{background-color:#FFF;box-shadow:0 0 5px 3px rgba(0,0,0,0.2)}td#centercolumn div#content table.outer tbody tr.odd td{vertical-align:middle}td#centercolumn div#content table.outer tbody tr.even td{vertical-align:middle}table.index_category tbody .head{background:linear-gradient(#BEBEE4,#9A9ACE);font-weight:700;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);height:25px}table.index_category td{padding:3px;vertical-align:middle}.item{margin-left:10px}.itemFoot{margin-left:10px}td[width="4%"],td[valign="middle"]{vertical-align:middle}table.index_category{margin-top:0;margin-bottom:0}td#centercolumn div#content div#cat_1{background-color:#fff}div[style="margin-left: auto; margin-right: auto;text-align:center; width:500px"]{margin-left:auto!important;margin-right:20px!important;text-align:right!important;width:500px!important}select{background-color:#FFF;border-top-left-radius:4px;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}div.dropdown .menu,div.dropdown .userbar{padding-left:0;text-align:center}table.outer > tbody > tr > th > div{padding-left:10px}#mainoption option{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:5px}table.outer{border:0}table.outer > tbody > tr:nth-child(4){box-shadow:0 6px 4px 0 rgba(0,0,0,0.15)}table.outer > tbody > tr:nth-child(1) > th{padding-right:10px}div#content{margin-left:10px}#forumoption option{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:3px 5px}#content > div:nth-child(5){padding-left:20px}#content div.dropdown #topicoption{margin-left:20px}#content > div:nth-child(13){padding-left:20px}table.outer > tbody > tr:nth-child(4){border-bottom-right-radius:15px;border-bottom-left-radius:15px}table.outer > tbody > tr{border-bottom-right-radius:0;border-bottom-left-radius:0}table.outer > tbody > tr:nth-child(4) > td:nth-child(1){border-bottom-left-radius:15px}table.outer > tbody > tr:nth-child(4) > td:nth-child(2){border-bottom-right-radius:15px;padding-right:10px}table.outer > tbody > tr:nth-child(1) > th:nth-child(1){border-top-left-radius:15px}table.outer > tbody > tr:nth-child(1) > th:nth-child(3){border-top-right-radius:15px}td#centercolumn div#content table.outer tbody tr.odd td{border-bottom-right-radius:0;border-bottom-left-radius:0}td#centercolumn div#content table.outer tbody tr.odd{border-bottom-right-radius:0;border-bottom-left-radius:0;box-shadow:none}span.itemPoster{padding:5px 1px 4px 5px;margin-right:5px;background-color:#E0DFE7;border-top-left-radius:10px;border-top-right-radius:10px}div.item{border-left:1px solid #c8c8c8;border-right:1px solid #c8c8c8;border-top-left-radius:10px;border-top-right-radius:10px;border-bottom-width:1px;border-bottom-color:#E0DFE7}div.itemHead{border-top-left-radius:10px;border-top-right-radius:10px;border-top-width:1px}div.item > div > h1{padding-left:10px}div.itemFoot{border-bottom-left-radius:10px;border-bottom-right-radius:10px;border-bottom-width:1px;box-shadow:0 6px 4px 0 rgba(0,0,0,0.15);background-color:#fff}div.itemFoot > span{padding-right:10px}#centercolumn{padding-right:10px}div.item > p{padding-left:10px}div.item > p > a > img{background-color:#9A9ACE;display:inline-block;border:0;border-radius:4px;padding:5px;transition:.3s}div.item > p > a > img:hover{box-shadow:0 0 2px 1px rgba(0,0,0,0.5);background-color:#fff}div#content{padding:0}#subject_pre,#messageColor,#messageFont,#messageSize,#newbb_form,select[name="add"],#$dates_msg,#limit{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:2px 5px;border-top-left-radius:0}input[type="text"],textarea{box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;min-height:21px}input[type="checkbox"]{box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}input[type="submit"],input[type="button"],input[type="reset"]{min-height:21px;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;color:#306;background-color:#FFF;cursor:pointer}input[type="submit"]:hover,input[type="button"]:hover,input[type="reset"]:hover{box-shadow:0 2px 2px 0 rgba(0,0,0,0.5);background:none;background-color:#FFF}input[value="Recherche"],[value="Rechercher"],[value="Valider"],[value="Ok !"],[value="Ok"]{background:linear-gradient(#fbe38b,#fecc53);font-weight:700;cursor:pointer}input#contents_submit:hover,input[value="Recherche"]:hover,input[value="Rechercher"]:hover,input[value="Valider"]:hover,input[value="Ok !"]:hover,input[value="Ok"]:hover{background:linear-gradient(#fbe38b,#fecc53)}input#move,input#lu,input#nlu,input#del,input[value="?"],input[name="sa"],input[value="Citation"],input[value="Réponse Rapide"],input[value="Vider"],input[value="Prévisualiser"],input[value="Soumettre"],input[value="Ajouter"]{background:none;background-color:#FFF;margin-bottom:2px;cursor:pointer}td#centercolumn div form input[name="sa"]{background:linear-gradient(#fbe38b,#fecc53);font-weight:700;font-size:12px}input#reply{background:linear-gradient(#fbe38b,#fecc53);margin-bottom:2px;cursor:pointer;font-weight:700}')
      $('img[src="//koreus.cdn.li/static/images/logo.jpg"]').attr('src', '//k.img.mu/GYD7KO.png').removeAttr('height').removeAttr('width')
      break
    case 'Dark':
      GM_addStyle('body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.42857143;color:#efefef;background-color:#353535!important}.navbar-default{background-color:#2C2C2C!important;border-color:#000}.navbar-default .navbar-nav > li > a:focus,.navbar-default .navbar-nav > li > a:hover{color:#fff;background-color:transparent}.navbar-default .navbar-nav > li > a,.navbar-default .navbar-text{color:#fff}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:14px;text-align:left;background-color:#2C2C2C;border:1px solid #ccc;border:1px solid rgba(0,0,0,.15);border-radius:4px;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.175);box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}.dropdown-menu > li > a{clear:both;font-weight:400;color:#fff}.dropdown-menu > li > a:hover{background-color:#acaaba;color:#555}.dropdown-menu > .active > a,.dropdown-menu > .active > a:hover,.dropdown-menu > .active > a:focus{color:#fff;text-decoration:none;outline:0;background-color:#fecc53;color:#000}.container{background:transparent!important;border:0!important}li{margin-left:2px;list-style-type:none!important;color:#FFF}.thumbnail{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#252525;border:1px solid #000;border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.panel{margin-bottom:20px;background-color:transparent;border:1px solid transparent;border-radius:4px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,0.05);box-shadow:0 1px 1px rgba(0,0,0,0.05)}.btn-default{color:#000;background-color:#fecc53!important;border-color:#121212}.btn-default:hover{color:#fff;background-color:#9A9ACE!important;border-color:#121212}.pagination > li > a,.pagination > li > span{position:relative;float:left;padding:12px;line-height:1.42857143;text-decoration:none;color:#fff;background-color:#252525;border:1px solid #121212;margin-left:-1px}.pagination > li > a:hover{position:relative;float:left;padding:12px;line-height:1.42857143;text-decoration:none;color:#000;background-color:#fecc53;border:1px solid #121212;margin-left:-1px}.pagination > .active > a,.pagination > .active > span,.pagination > .active > a:hover,.pagination > .active > span:hover,.pagination > .active > a:focus,.pagination > .active > span:focus{z-index:2;color:#fff;background-color:#9A9ACE;border-color:#306;cursor:default}table{width:100%;font-size:12px;background-color:#303030!important;font-family:Verdana,Arial,Helvetica,sans-serif;color:#ccc}td#centercolumn{font-size:12px;background-color:#303030!important}td#leftcolumn div.blockTitle{color:#000;background:#fecc53;padding:4px 3px;text-transform:uppercase}td#leftcolumn{width:170px;border-right:0 solid #fecc53;font-size:12px;color:#306;background-color:#303030}td#usermenu{padding:0;background:#2C2C2C;color:#B8B8B8}td#leftcolumn div.blockContent{background:#2C2C2C;color:#B8B8B8;box-shadow:inset 0 0 5px 0 #000;padding:2px}a{color:#ddd}a:hover{color:#fecc53}td#usermenu a{transition:background .3s;padding:2px 0 2px 6px;border:0;border-color:#000}td#mainmenu{padding:0!important}td#mainmenu a{transition:background .3s;padding:2px 0 2px 6px;border:0;margin:2px;box-shadow:inset 0 0 5px 0 #000;text-transform:uppercase}td#mainmenu a:hover{transition:background .3s;box-shadow:inset 0 0 20px 0 #000;background-color:rgba(255,255,255,0.1)}td#mainmenu a.menuMain{padding:5px;border:0}td#mainmenu a.menuTop{background-color:rgba(0,0,0,0.1);padding:5px;border-right:0;border:0;padding-left:6px}td#mainmenu a.menuSub{border:0;background-color:rgba(0,0,0,0.3);border-left:10px solid #fecc53;padding:5px;margin:5px;box-shadow:inset 0 0 5px 0 #000}td#leftcolumn div.blockContent{border:2px solid #fecc53}td#leftcolumn div.blockContent ul{padding:0;margin:0}td#leftcolumn div.blockContent li{transition:background .3s;padding:5px;border:0;margin:2px;box-shadow:inset 0 0 5px 0 #000}td#leftcolumn div.blockContent li:hover{transition:background .3s;box-shadow:inset 0 0 50px 0 #000;background-color:rgba(255,255,255,0.1)}td#centercolumn div#content table.outer tbody tr.odd td{vertical-align:middle}td#centercolumn div#content table.outer tbody tr.even td{vertical-align:middle}table.index_category tbody .head{background:#404040;font-weight:700;box-shadow:inset 0 0 20px 0 rgba(0,0,0,0.15);height:40px}table.index_category td{padding:3px;vertical-align:middle}tr .even{box-shadow:inset 0 0 0 0 rgba(0,0,0,0.5);border:solid 1px #252525}tr .odd{box-shadow:inset 0 0 0 0 rgba(0,0,0,0.5);border:solid 1px #252525}.item{margin-left:10px}.itemHead{box-shadow:0 0 5px 0 rgba(0,0,0,0.5)}.itemFoot{margin-left:10px;box-shadow:0 0 5px 0 rgba(0,0,0,0.5)}td[width="4%"],td[valign="middle"]{vertical-align:middle}table.index_category{margin-top:0;margin-bottom:0}td#centercolumn div#content div#cat_1{background-color:#fff}div[style="margin-left: auto; margin-right: auto;text-align:center; width:500px"]{margin-left:auto!important;margin-right:20px!important;text-align:right!important;width:500px!important}select{background-color:#252525;color:#fff;box-shadow:0 0 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}div.dropdown .menu,div.dropdown .userbar{padding-left:0;text-align:center}table.outer > tbody > tr > th > div{padding-left:10px}#mainoption option{box-shadow:0 0 6px 0 rgba(0,0,0,0.15);padding:5px}table.outer{border:0}table.outer > tbody > tr:nth-child(4){box-shadow:0 6px 4px 0 rgba(0,0,0,0.15)}table.outer > tbody > tr:nth-child(1) > th{padding-right:10px}#forumoption option{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:3px 5px}#content > div:nth-child(5){padding-left:20px}#content div.dropdown #topicoption{margin-left:20px}#content > div:nth-child(13){padding-left:20px}tr.even td{background-color:#343434;padding:5px}tr.odd td{background-color:#292929;padding:5px}div.xoopsQuote{background:#121212;border:1px solid #323232;font-family:Verdana,Arial,Helvetica,sans-serif;padding:0 6px 6px;font-size:12px;color:#AAA}td#rightcolumn{width:170px;border-left:1px solid #ccc;font-size:12px;background-color:TRANSPARENT}td#centerCcolumn div.blockContent{border:1px solid #000;padding:3px;margin-right:0;margin-left:0;margin-bottom:2px;line-height:120%;color:#000}h1,h1 a{margin-top:0;margin-bottom:0;font-weight:700;color:#fecc53;background-color:transparent;font-size:18px;text-decoration:none}td#centercolumn th{background-color:#252525;font-weight:700;color:#fecc53;vertical-align:middle;padding:10px}.even{background-color:transparent;padding:15px}.comUserStat{font-size:10px;color:#fff;font-weight:700;border:0 solid #111;background-color:transparent;margin:0;padding:2px}span.itemPoster{padding:5px 1px 4px 5px;margin-right:5px;color:#fecc53;background:transparent}div.item{border:1px solid #000;border-bottom-width:0;background:#252525;padding:10px;box-shadow:inset 0 0 5px #000}div.itemHead{border:1px solid #000;background:#404040;padding:10px}div.itemInfo{border:1px solid #000;border-top-width:0;background:#505050}.itemTitle,.itemTitle a{font-weight:700;color:#fff;background-color:transparent;font-size:14px;text-decoration:none}.itemTitle a:hover{color:#fff!important;background-color:transparent!important}.itemText{margin-top:5px;margin-bottom:5px;line-height:1.5em;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:12px;color:#fff}.itemText a{color:#fecc53}.itemText a:hover{color:#9A9ACE!important;background:transparent!important}div.item > div > h1{padding-left:10px}div.itemFoot{border:1px solid #000;border-top-width:0;background:#404040}div.itemFoot > span{padding-right:10px}td#centerCcolumn legend.blockTitle{padding:3px;color:#fecc53;font-weight:700;margin-top:0;margin-right:0;margin-left:0}td#rightcolumn div.blockTitle{padding:5px;color:#fff;font-weight:700;background:#9A9ACE;text-align:center}td#rightcolumn{width:170px;border-left:0 solid #ccc;font-size:12px;background-color:TRANSPARENT}td#rightcolumn div.blockContent{padding:0;line-height:120%;background-color:#9A9ACE}#centercolumn{padding-right:10px}div.item > p{padding-left:10px}div.item > p > a > img{background-color:transparent;display:inline-block;border:0;box-shadow:inset 0 0 10px 0 #000;padding:2px;transition:.3s}div.item > p > a > img:hover{background-color:#fecc53}h2,h2 a{margin-top:0;margin-bottom:0;font-weight:700;color:#fecc53;background-color:transparent;font-size:16px;text-decoration:none}.foot{background-color:#181818;padding:5px;font-weight:700}.footer{background-color:#181818;padding:5px;font-weight:700}.footer a{background-color:transparent;padding:5px;font-weight:700}.small{color:#bbb}.small a{color:#fff}.odd{background-color:#252525;padding:0;padding-left:5px}.head{background-color:#161616;padding:5px;font-weight:700}div#content{padding:0}fieldset{border:solid 1px #111}#subject_pre,#messageColor,#messageFont,#messageSize,#newbb_form,select[name="add"],#$dates_msg,#limit{box-shadow:0 1px 6px 0 rgba(0,0,0,0.15);padding:2px 5px;border-top-left-radius:0}input[type="text"],textarea{box-shadow:0 0 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;min-height:20px;background-color:#111;color:#aaa}input[type="checkbox"]{box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;cursor:pointer}input[type="submit"],input[type="button"],input[type="reset"]{min-height:21px;box-shadow:0 2px 6px 0 rgba(0,0,0,0.15);z-index:1;border:0!important;color:#fecc53;background-color:#111!important;cursor:pointer}input[type="submit"]:hover,input[type="button"]:hover,input[type="reset"]:hover{box-shadow:inset 0 0 5px 0 rgba(0,0,0,0.5);background:none;background-color:#222!important}input[value="Recherche"],[value="Rechercher"],[value="Valider"],[value="Ok !"],[value="Ok"]{background:linear-gradient(#fbe38b,#fecc53);color:#222!important;font-weight:700;cursor:pointer}input#contents_submit:hover,input[value="Recherche"]:hover,input[value="Rechercher"]:hover,input[value="Valider"]:hover,input[value="Ok !"]:hover,input[value="Ok"]:hover{background:linear-gradient(#fbe38b,#fecc53)}input#move,input#lu,input#nlu,input#del,input[value="?"],input[name="sa"],input[value="Citation"],input[value="Réponse Rapide"],input[value="Vider"],input[value="Prévisualiser"],input[value="Soumettre"],input[value="Ajouter"]{background:none;color:#fecc53;background-color:#111!important;margin-bottom:2px;cursor:pointer}td#centercolumn div form input[name="sa"]{background:linear-gradient(#fbe38b,#fecc53);font-weight:700;font-size:12px}input#reply{background:linear-gradient(#fbe38b,#fecc53);margin-bottom:2px;cursor:pointer;font-weight:700}')
      $('img[src="//koreus.cdn.li/static/images/logo.jpg"]').attr('src', '//k.img.mu/GYD7KO.png').removeAttr('height').removeAttr('width')
      break
    default:
  }
  // ==============================

  // Corrige des bugs =================

  // Fix: Messagerie, champs destinataire limité à 50 caractères
  // https://www.koreus.com/modules/newbb/topic187711.html
  $('input[name="to_userid"]').removeAttr('maxlength').attr('size', 50)

  // Fix: Intégration d'un tweet supprimé laisse un espace vide
  // https://www.koreus.com/modules/newbb/topic198288.html
  GM_addStyle('blockquote.twitter-tweet-error { background: url("https://k.img.mu/ekaAqx.png") no-repeat; height: 80px; margin: unset;}')

  // Fix: Twitter widget height
  if (window.location.pathname.startsWith('/video/')) {
    window.addEventListener('load', () => {
      if (document.getElementById('twitter-widget-0')) {
        // When loaded in a new tab, offsetHeight is 0
        const twitterWidgetHeight = document.getElementById('twitter-widget-0').offsetHeight || 600
        if (document.getElementById('videoDiv')) {
          document.getElementById('videoDiv').style['padding-bottom'] = 'unset'
          document.getElementById('videoDiv').style.height = `${twitterWidgetHeight + 15}px`
        } else {
          console.warn('Koreuscript - fix twitter widget height: cannot find #videoDiv')
        }
      }
    })
  }
  // ==============================

  // Ajoute le menu ==================
  $('#leftcolumn').prepend('<div id="ks-options" class="blockContent"><button id="ks-options-button" type="button" style="width:100%">▼ KoreuScript Options</button></div>')

  $('#ks-options').append('<div id="menu-script" style="display:none;padding-bottom:5px;">\
<div id="Theme" style="padding:5px">\
Thème : \
<select name="theme" style="width: 60%;float: right;" >\
<option value="Defaut">Aucun</option>\
<option value="Look">Koreus Look</option>\
<option value="Dark">Koreus Dark</option>\
</select> \
</div>\
<p style="padding-left:5px"><input name="ReponseCheck" id="Check_R_ID" class="checkboxks" type="checkbox"><label name="ReponseCheck" for="Check_R_ID"><span class="ui"></span>Lien Message</label></p>\
<p style="padding-left:5px"><input name="PageCheck" class="checkboxks" id="Check_P_ID" type="checkbox"><label name="PageCheck" for="Check_P_ID"><span class="ui"></span>Défilement</label></p>\
<p style="padding-left:5px"><input name="RapideStyleCheck" class="checkboxks" id="Check_RR_ID" type="checkbox"><label name="RapideStyleCheck" for="Check_RR_ID"><span class="ui"></span>Editeur Rapide</label></p>\
<p style="padding-left:5px"><input name="EmojiCheck" class="checkboxks" id="Check_Emoji_ID" type="checkbox"><label name="EmojiCheck" for="Check_Emoji_ID"><span class="ui"></span>Emoji</label></p>\
<p style="padding-left:5px"><input name="VoteColor" class="checkboxks" id="Check_VoteColor_ID" type="checkbox"><label name="VoteColor" for="Check_VoteColor_ID"><span class="ui"></span>Couleur Vote</label></p>\
<p style="padding-left:5px"><input name="RealVote" class="checkboxks" id="Check_RealVote_ID" type="checkbox"><label name="RealVote" for="Check_RealVote_ID"><span class="ui"></span>Score Vote Réel</label></p>\
<p style="padding-left:5px"><input name="CommentsBelowVideo" class="checkboxks" id="comments-below-video" type="checkbox"><label name="CommentsBelowVideo" for="comments-below-video"><span class="ui"></span>Commentaires sous vidéo</label></p>\
</div>')
  // ==============================

  // Ouverture/Fermeture du menu
  function toogleMenu () {
    const elem = document.getElementById('menu-script')
    if (elem.style.display !== 'none') {
      $('#ks-options-button').html('▼ KoreuScript Options')
      elem.style.display = 'none'
    } else {
      $('#ks-options-button').html('▲ KoreuScript Options')
      elem.style.display = 'block'
    }
  }
  if (document.getElementById('ks-options-button')) {
    document.getElementById('ks-options-button').addEventListener('click', toogleMenu)
  }

  // =======================

  // Change les variables permanentes
  $('select[name="theme"]').val(themeStyle)
  $('#Check_R_ID').prop('checked', checkMessage)
  $('#Check_P_ID').prop('checked', checkPageDown)
  $('#Check_RR_ID').prop('checked', checkRepRapid)
  $('#Check_Emoji_ID').prop('checked', checkEmoji)
  $('#Check_VoteColor_ID').prop('checked', voteColor)
  $('#Check_RealVote_ID').prop('checked', realVote)
  $('#comments-below-video').prop('checked', commentsBelowVideo)

  $('select[name="theme"]').change(function () {
    GM_setValue('ThemeSave', this.value)
    location.reload()
  })

  $('#Check_R_ID').change(() => {
    checkMessage = !checkMessage
    GM_setValue('CheckMSave', checkMessage)
  })

  $('#Check_P_ID').change(() => {
    checkPageDown = !checkPageDown
    GM_setValue('CheckPSave', checkPageDown)
    location.reload()
  })

  $('#Check_RR_ID').change(() => {
    checkRepRapid = !checkRepRapid
    GM_setValue('RepRapidSave', checkRepRapid)
    location.reload()
  })

  $('#Check_Emoji_ID').change(() => {
    checkEmoji = !checkEmoji
    GM_setValue('CheckEmojiSave', checkEmoji)
    location.reload()
  })

  $('#Check_VoteColor_ID').change(() => {
    voteColor = !voteColor
    GM_setValue('VoteColorSave', voteColor)
    location.reload()
  })

  $('#Check_RealVote_ID').change(() => {
    realVote = !realVote
    GM_setValue('RealVoteSave', realVote)
    location.reload()
  })

  $('#comments-below-video').change(() => {
    commentsBelowVideo = !commentsBelowVideo
    GM_setValue('commentsBelowVideo', commentsBelowVideo)
    location.reload()
  })
  // ==========================

  // Ajoute le lien du message si l'option est cochée

  if (checkMessage) {
    const url = new URL(window.location.href)
    const urlParams = new Map(url.searchParams)
    if (url.pathname === '/modules/news/comment_reply.php') {
      const comItemId = urlParams.get('comItemId')
      const comId = urlParams.get('comId')
      document.getElementById('com_text').value += '[url=https://www.koreus.com/modules/news/article' + comItemId + '.html#comment' + comId + ']Message[/url]'
    } else if (url.pathname === '/modules/newbb/reply.php') {
      const topicId = urlParams.get('topicId')
      const postId = urlParams.get('postId')
      const pageId = urlParams.get('start')
      document.getElementById('message').value += '[url=https://www.koreus.com/modules/newbb/topic' + topicId + ((pageId > 0) ? '-' + pageId : '') + '.html#forumpost' + postId + ']Message[/url]'
    }
  }

  // =====================================

  // Ajoute les boutons de défilement si l'option est cochée
  if (checkPageDown) {
    $('body').prepend('<div align="right" style="position:fixed; top:0; right:0;background-color:#9a9ace"><span id="ScrollUp" style="float:right;cursor: pointer;margin-left:2px;">▲</span><span id="ScrollDown" style="float:right;cursor: pointer;">▼</span></div>')

    document.getElementById('ScrollDown').addEventListener('click', () => {
      $('html, body').animate({
        scrollTop: $(document).height(),
      }, 'slow')
    })
    document.getElementById('ScrollUp').addEventListener('click', () => {
      $('html, body').animate({
        scrollTop: 0,
      }, 'slow')
    })
  }
  // =======================================

  // Ajoute l'éditeur si l'option est cochée ==================
  if (checkRepRapid) {
    if (window.location.href.indexOf('newbb/topic') > -1) {
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
<img src="//media.koreus.com/images/linethrough.gif" alt="linethrough" onmouseover="style.cursor=&quot;hand&quot;"><br>').insertBefore('#message')
    }
  }
  // =======================

  // Ajoute les emoji si l'option est cochée
  if (checkEmoji) {
    const emojis = [
      '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉', '😊', '😋', '😍', '😎', '😏', '😐', '😑', '😒',
      '😓', '😔', '😕', '😖', '😘', '😙', '😛', '😜', '😝', '😞', '😟', '😠', '😡', '😢', '😤', '😥', '😦', '😧',
      '😨', '😩', '😫', '😬', '😭', '😮', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '🙁', '🙂', '🙃', '🙄',
    ]
    const emojiObjects = emojis.map((emoji) => emoji.codePointAt(0).toString(16)).map((emojiHexaCode) => ({
      htmlImg: `<img class="emojione" alt="&#x${emojiHexaCode};" src="https://cdn.jsdelivr.net/emojione/assets/4.0/png/64/${emojiHexaCode}.png"/>`,
      editor: `&#x${emojiHexaCode};`,
    }))
    const smileyUrls = [
      // from https://www.developpez.net/forums/misc.php
      'https://k.img.mu/jV5loi.gif', // :D
      'https://k.img.mu/hxs0Wi.gif', // :)
      'https://k.img.mu/qoeVWQ.gif', // :(
      'https://k.img.mu/VKB7AE.gif', // 8O
      'https://k.img.mu/qoMze9.gif', // :?
      'https://k.img.mu/6jVA2U.gif', // 8-)
      'https://k.img.mu/R4CMKu.gif', // :lol:
      'https://k.img.mu/lVeoSj.gif', // :P
      'https://k.img.mu/tkbRPL.gif', // :oops:
      'https://k.img.mu/kaNAPP.gif', // :roll:
      'https://k.img.mu/Q9PwYc.gif', // ;)
      'https://k.img.mu/J1BJ8d.gif', // :mrgreen:
      'https://k.img.mu/AMD9KG.gif', // :aie:
      'https://k.img.mu/oHMHSq.gif', // :mouarf:
      'https://k.img.mu/QoQpnW.gif', // :calim2:
      'https://k.img.mu/75D9kF.gif', // :ptdr:
      'https://k.img.mu/cq9Ceq.gif', // :weird:
      'https://k.img.mu/cPpkqP.gif', // :-o
      'https://k.img.mu/FNUGPN.gif', // :x
      'https://k.img.mu/dp9DZH.gif', // :cry:
      'https://k.img.mu/b56nbP.gif', // :evil:
      'https://k.img.mu/Bg2GnX.gif', // :twisted:
      'https://k.img.mu/5QfJzC.gif', // :!:
      'https://k.img.mu/upaPUj.gif', // :question:
      'https://k.img.mu/6JDGXd.gif', // :idea:
      'https://k.img.mu/ZscyfJ.gif', // :arrow:
      'https://k.img.mu/HTNEvB.gif', // :|
    ]

    function insertSmileys (textAreaId) {
      $('<br /><div id="emoji" style="width:440px" />').insertAfter(`#${textAreaId}`)
      $('#emoji').append('<div id="emoji-list"></div>')

      const isSceditor = Array.from(document.getElementsByTagName('script')).some((elem) => elem.getAttribute('src')?.includes('/sceditor'))
      if (isSceditor) {
        $('#emoji-list').append(emojiObjects.map((emoji) => `<a onclick="sceditor.instance(document.getElementById('${textAreaId}')).insert('${emoji.editor}');" style="cursor: pointer;">${emoji.htmlImg}</a>`).join(''))
        $('#emoji-list').append('<br/>')
        $('#emoji-list').append(smileyUrls.map((url) => `<a onclick="sceditor.instance(document.getElementById('${textAreaId}')).insert('[img]${url}[/img]');" style="cursor: pointer;"><img src="${url}"/></a>`).join(''))
      } else {
        $('#emoji-list').append(emojiObjects.map((emoji) => `<a onclick="document.getElementById('${textAreaId}').value+='${emoji.editor}';" style="cursor: pointer;">${emoji.htmlImg}</a>`).join(''))
        $('#emoji-list').append('<br/>')
        $('#emoji-list').append(smileyUrls.map((url) => `<a onclick="document.getElementById('${textAreaId}').value+='[img]${url}[/img]';" style="cursor: pointer;"><img src="${url}"/></a>`).join(''))
      }
    }

    if (window.location.href.includes('/comment_new.php') || window.location.href.includes('/comment_reply.php')) {
      insertSmileys('com_text')
    } else if (window.location.href.includes('modules/newbb/')) {
      insertSmileys('message')
    }
  }

  // =======================

  GM_addStyle('#leftcolumn.fixed{\
position:fixed;\
top:0;\
z-index: 999;\
}')

  GM_addStyle('#centercolumn.fixed{\
position:relative;\
padding-left:200px;\
}')

  // Check si sur Forum ou Article
  let bMessage = false
  let textbox = ''

  if (document.getElementById('com_text')) {
    bMessage = true
    textbox = 'com_text'
  } else if (document.getElementById('message')) {
    bMessage = true
    textbox = 'message'
  }
  // ==========================

  // Si un forumlaire est sur la page
  if (bMessage) {
    const imageElements = document.getElementsByTagName('img')
    let imageElementBold
    let imageElementItalic
    let imageElementUnderline
    let imageElementLinethrough
    for (const imageElement of imageElements) {
      if (imageElement.alt === 'bold') {
        imageElementBold = imageElement
      }
      if (imageElement.alt === 'italic') {
        imageElementItalic = imageElement
      }
      if (imageElement.alt === 'underline') {
        imageElementUnderline = imageElement
      }
      if (imageElement.alt === 'linethrough') {
        imageElementLinethrough = imageElement
      }
    }

    // ajoute les fonctions sur les boutons
    if (imageElementBold != null && imageElementItalic != null && imageElementUnderline != null && imageElementLinethrough != null) {
      imageElementBold.removeAttribute('onclick')
      imageElementBold.addEventListener('click', () => {
        AddQuote('[b]', '[/b]')
      })

      imageElementItalic.removeAttribute('onclick')
      imageElementItalic.addEventListener('click', () => {
        AddQuote('[i]', '[/i]')
      })

      imageElementUnderline.removeAttribute('onclick')
      imageElementUnderline.addEventListener('click', () => {
        AddQuote('[u]', '[/u]')
      })

      imageElementLinethrough.removeAttribute('onclick')
      imageElementLinethrough.addEventListener('click', () => {
        AddQuote('[d]', '[/d]')
      })
    }

    // supprime la textbox et le bouton ajouter
    if (document.getElementById('com_textAddtext') != null) {
      document.getElementById('com_textAddtext').remove()
    }

    if (document.getElementById('messageAddtext') != null) {
      document.getElementById('messageAddtext').remove()
    }

    for (const i in document.getElementsByTagName('input')) {
      if (document.getElementsByTagName('input')[i].value === 'Ajouter') {
        document.getElementsByTagName('input')[i].remove()
        break
      }
    }

    // Ajoute les fonctions aux menus (select)
    $('select').change(function () {
      // Articles

      if (this.id === 'com_textSize') {
        AddQuote('[size=' + $(this).val() + ']', '[/size]')
      }

      if (this.id === 'com_textFont') {
        AddQuote('[font=' + $(this).val() + ']', '[/font]')
      }

      if (this.id === 'com_textColor') {
        this.style.backgroundColor = '#' + $(this).val()
        AddQuote('[color=' + $(this).val() + ']', '[/color]')
      }

      // Forum
      if (this.id === 'messageSize') {
        AddQuote('[size=' + $(this).val() + ']', '[/size]')
      }

      if (this.id === 'messageFont') {
        AddQuote('[font=' + $(this).val() + ']', '[/font]')
      }

      if (this.id === 'messageColor') {
        AddQuote('[color=' + $(this).val() + ']', '[/color]')
      }
    })
  }
  // ==========================

  // fonction de remplacement
  function AddQuote (pre, post) {
    const elem = document.getElementById(textbox)
    const start = elem.selectionStart
    const end = elem.selectionEnd
    const len = elem.value.length
    const selTxt = elem.value.substring(start, end)

    elem.value = elem.value.substring(0, start) + pre + selTxt + post + elem.value.substring(end, len)
  }
  // =====================

  // VoteLive ##############################################

  GM_addStyle('.voteWindow {position:absolute;z-index: 1000;right:10px;width:250px;margin-top:4px;padding:5px;background:#9A9ACE; visibility: hidden;}')

  function HideVote () {
    const fenetres = document.getElementsByClassName('voteWindow')
    for (let i = 0; i < fenetres.length; i++) {
      fenetres[i].style.visibility = 'hidden'
    }
  }

  // Récupère tous les boutons vote up et ajoute une fonction hover qui appel la fonction ShowVote et HideVote
  for (const arrowElement of [...document.getElementsByClassName('arrow-up'), ...document.getElementsByClassName('arrow-up2')]) {
    const pid = arrowElement.getAttribute('id').replace('up', '')
    const voteElem = arrowElement.parentNode.querySelector(`#vote${pid}`)
    voteElem.style.cursor = 'pointer'

    if (voteColor) {
      const title = voteElem.getAttribute('title')
      const score = parseInt(voteElem.textContent)

      let pourcent
      if (title.includes('%')) {
        pourcent = parseInt(title.slice(title.indexOf('(') + 1, title.indexOf('%')))
      } else if (score === 0 && title === '1 vote') {
        pourcent = 0
      } else if (score === 1 && title === '1 vote') {
        pourcent = 100
      }

      if (pourcent < 50) {
        voteElem.style.color = '#FF5252'
      }
      if (pourcent > 50) {
        voteElem.style.color = '#00E676'
      }
      if (pourcent === 50) {
        voteElem.style.color = '#F1D402'
      }
    }

    voteElem.addEventListener('click', function () {
      const pid = this.getAttribute('id').replace('vote', '')
      if (this.parentNode.querySelector('#votewin' + pid).style.visibility === 'visible') HideVote()
      else this.parentNode.querySelector('#votewin' + pid).style.visibility = 'visible'
    })

    arrowElement.innerHTML += "<div class='voteWindow' id='votewin" + pid + "'>Plus possible de savoir qui a voté<br><br>" +
      "Koreus a retiré l'outils Up & Down<br><br>Il a annoncé que <a href='/modules/newbb/topic146759-640.html#forumpost2546978'>la fonctionnalité reviendra sous une autre forme</a></div>"

    arrowElement.querySelector('#votewin' + pid).addEventListener('mouseleave', HideVote)
  }

  // Real Vote Score ###########################################################
  // Boboss

  if (realVote) {
    const arrowElems = [...document.getElementsByClassName('arrow-up'), ...document.getElementsByClassName('arrow-up2')]

    for (const arrowElem of arrowElems) {
      const voteId = arrowElem.getAttribute('id').substr(2)
      const vote = arrowElem.parentNode.querySelector('#vote' + voteId)
      const voteScore = parseInt(vote.textContent)
      const title = vote.getAttribute('title')
      const totalVote = title.split(' ')[0]

      let pourcentPositif
      if (title.includes('%')) {
        pourcentPositif = parseInt(title.slice(title.indexOf('(') + 1, title.indexOf('%')))
      } else if (voteScore === 1 && title === '1 vote') {
        pourcentPositif = 100
      } else if (voteScore === 0 && title === '1 vote') {
        pourcentPositif = 0
      } else if (voteScore === 0 && title === '0 vote') {
        continue
      } else {
        console.error('Should never be here: ' + title)
        continue
      }

      vote.innerText = Math.round(totalVote * ((pourcentPositif - 50) * 2) / 100)
    }
  }

  // Comments below video ######################################################
  // Boboss

  try {
    if (commentsBelowVideo && window.location.pathname.startsWith('/video/')) {
      function getParentElements (doc, selectors) {
        let element = doc.querySelector(selectors)
        const parentElements = []
        while (element) {
          parentElements.unshift(element)
          element = element.parentNode
        }
        return parentElements
      }

      function hide (doc, selectors) {
        doc.querySelectorAll(selectors).forEach((e) => { e.hidden = true })
      }

      function show (doc, selectors) {
        getParentElements(doc, selectors).filter((e) => e.hidden === true).forEach((e) => { e.hidden = false })
        doc.querySelectorAll(selectors + ' *').forEach((e) => { e.hidden = false })
      }

      function resizeIframe (iframe) {
        iframe.height = iframe.contentWindow.document.body.offsetHeight + 'px'
      }

      function iframeAutoResize (iframe) {
        let watcher
        function watch () {
          cancelAnimationFrame(watcher)
          if (iframe.height !== iframe.contentWindow.document.body.scrollHeight + 'px') {
            resizeIframe(iframe)
          }
          watcher = requestAnimationFrame(watch)
        }
        watcher = window.requestAnimationFrame(watch)
      }

      let addCommmentsBelowVideoCalled = false

      function addCommmentsBelowVideo () {
        addCommmentsBelowVideoCalled = true
        const urlIframe = document.querySelector('a.btn-primary').getAttribute('href')
        if (urlIframe) {
          const iframeArticle = document.createElement('iframe')
          iframeArticle.setAttribute('id', 'iframeArticle')
          iframeArticle.setAttribute('class', 'col-md-12 col-lg-12')
          iframeArticle.setAttribute('src', urlIframe)
          iframeArticle.setAttribute('scrolling', 'no')
          iframeArticle.setAttribute('frameborder', '0')
          iframeArticle.style.width = '1138px' // can be better !

          document.querySelector('div.row').appendChild(iframeArticle)

          iframeArticle.addEventListener('load', () => {
            const iframeDocument = iframeArticle.contentWindow.document

            // hide all
            hide(iframeDocument, 'body *')
            // unhide comments
            show(iframeDocument, '#centercolumn > div:nth-of-type(5)')
            // open all links within iframe in a new page
            iframeDocument.querySelectorAll('a').forEach((e) => { e.setAttribute('target', '_blank') })

            // manage iframe size
            resizeIframe(iframeArticle)
            iframeAutoResize(iframeArticle)
          })
        }
      }

      if (document.visibilityState === 'visible') {
        addCommmentsBelowVideo()
      } else {
        // better rendering when loaded in a new tab
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible' && !addCommmentsBelowVideoCalled) {
            addCommmentsBelowVideo()
          }
        })
      }
    }
  } catch (error) {
    console.error('[Koreuscript] Error while applying commentsUnderVideo: ' + error)
  }

  // User Blacklist ##############################################
  // Contributor -Flo-
  // https://www.koreus.com/modules/newbb/topic165924-140.html#forumpost2539971

  GM_addStyle('.blBlock span { margin-left: 20px; }')
  GM_addStyle('.blBlock { font-weight: normal; }')
  GM_addStyle('.blBlock:hover { color: black; }')
  GM_addStyle('.blOptions span { font-weight: bold; cursor: pointer; }')
  GM_addStyle('.shutup { cursor: pointer; }')

  function blacklist (userId) {
    GM.setValue('blacklisted.' + userId, true).then(() => { applyBlacklists(true) })
  }

  function unblacklist (userId) {
    GM.deleteValue('blacklisted.' + userId).then(() => { applyBlacklists(true) })
  }

  function hideBlacklisted (postid, userid) {
    const postdd = postid.nextElementSibling.getElementsByClassName('dropdown')[0]
    const userName = postdd.getElementsByTagName('option')[0].innerText
    postid.nextElementSibling.style.display = 'none'

    postid.innerHTML = '<div class="blBlock">🤐 <span class="blOptions">Message masqué (' + userName + ' est blacklisté)<span class="blShow">Afficher le message</span><span class="blUnbl">Réautoriser ce membre</span></span></div>'
    const blOptions = postid.getElementsByClassName('blOptions')[0]

    blOptions.style.visibility = 'hidden'
    postid.addEventListener('click', () => {
      if (blOptions.style.visibility === 'hidden') {
        blOptions.style.visibility = 'visible'
      } else {
        blOptions.style.visibility = 'hidden'
      }
    })

    const blShow = postid.getElementsByClassName('blShow')[0]
    const blUnbl = postid.getElementsByClassName('blUnbl')[0]

    blShow.addEventListener('click', () => {
      postid.nextElementSibling.style.display = 'table'
    })
    blUnbl.addEventListener('click', () => {
      unblacklist(userid)
    })
  }

  function applyBlacklists (refine) {
    const posts = document.querySelectorAll('a[id^="forumpost"]')

    for (const post of posts) {
      (function () {
        try {
          const postNext = post.nextElementSibling
          const postdd = postNext.querySelector('.dropdown')
          const userId = postdd.getElementsByTagName('option')[1].getAttribute('value').match(/membre(\d+)\.html$/)[1]

          postNext.style.display = 'table'
          post.innerHTML = ''

          if (!refine) {
            postdd.innerHTML += '<span class="shutup">🤐</span>'
            const shutup = postNext.querySelector('.shutup')
            shutup.style.visibility = 'hidden'

            postdd.addEventListener('mouseover', () => {
              shutup.style.visibility = 'visible'
            })
            postdd.addEventListener('mouseout', () => {
              shutup.style.visibility = 'hidden'
            })
            shutup.addEventListener('click', () => {
              blacklist(userId)
            })
          }

          if (GM_getValue('blacklisted.' + userId)) {
            hideBlacklisted(post, userId)
          }
        } catch (err) {
          console.error('[Koreuscript] Error while applying Blacklists: ' + err)
        }
      }())
    }
  }

  if (window.location.href.includes('modules/newbb/topic')) {
    applyBlacklists(false)
  }

  // Amélioration de l'Appli Koreus
  function improveAppli () {
    // Tchat d'équipe
    if (window.location.pathname === '/user/games/discussion.php') {
      improveMessage()

      const inputTextElement = $('form div.col-md-10')
      inputTextElement.addClass('col-md-9').removeClass('col-md-10')
      $(`<div class="col-md-1"><input id="btn-config-notif-tchat" class="btn btn-block btn-info" title="${GM_getValue('NotificationTchat') ? 'Désactiver les notifications' : 'Activer les notifications'}" type="button" value="${GM_getValue('NotificationTchat') ? '🔈' : '🔇'}"></div>`).insertAfter($('form div.col-md-2'))
      $('#btn-config-notif-tchat').click(toggleNotificationTchat)

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes[0]) {
            const currentPseudo = $('a.nav-link[href="/user"]')[0] ? $('a.nav-link[href="/user"]')[0].innerText : undefined
            const message = mutation.addedNodes[0].innerText.substr(11) // substr to remove time
            if (message.split(':')[0] !== currentPseudo && !document.hasFocus() && GM_getValue('NotificationTchat')) {
              new Notification('Team Egg', { body: message, icon: '/user/img/eggs/gif/oeuf0s.gif' }) // eslint-disable-line no-new
            }
            improveMessage()
          }
        }
      })

      // Start observing the target node for configured mutations
      observer.observe(document.getElementById('messages'), { childList: true })
    }

    function improveMessage () {
      $('div#messages p').each(function () {
        if (!this.dataset.improved) {
          this.dataset.improved = true

          // Transforme les liens dans la discussion en vrais liens cliquables
          this.innerHTML = this.innerHTML.autoLink({ target: '_blank' })

          // Affichage en couleurs des scores
          const m = this.innerHTML.match(/(.*<\/b>:\s+)(\d+)\s(\d+)\s(\d+)(\s?.*)/)
          if (m) {
            this.innerHTML = `${m[1]}<b><span class="text-team1">${m[2]}</span> <span class="text-team2">${m[3]}</span> <span class="text-team3">${m[4]}</span></b>${m[5]}`
          }
        }
      })
    }

    function toggleNotificationTchat () {
      Notification.requestPermission()
      const newConfigNotifTchat = !GM_getValue('NotificationTchat')
      GM_setValue('NotificationTchat', newConfigNotifTchat)
      $('#btn-config-notif-tchat').val(newConfigNotifTchat ? '🔈' : '🔇')
      $('#btn-config-notif-tchat').attr('title', GM_getValue('NotificationTchat') ? 'Désactiver les notifications' : 'Activer les notifications')
      $('#btn-config-notif-tchat').blur()
    }
  }
})()
