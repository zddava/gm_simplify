// ==UserScript==
// @name         网页简化
// @namespace    github.com/zddava/gm_simplify
// @version      0.2
// @description  simplify some web pages
// @author       archer
// @match        *://*.cnblogs.com/*/*.html
// @icon         https://avatars.githubusercontent.com/u/1776283?v=4
// @grant        none
// @license      GPL-3.0-or-later
// ==/UserScript==

(function() {
    'use strict';
    let simplified = false;

    function simplify_cnblogs(){
        if(simplified){
            return;
        }

        let homeBlocks = document.querySelectorAll("#home > div");
        if(!homeBlocks){
            return;
        }

        for(let i = 0; i < homeBlocks.length; i++){
            if(homeBlocks[i].id && ('header' == homeBlocks[i].id || 'main' == homeBlocks[i].id)){
                continue;
            }

            if(homeBlocks[i].className && homeBlocks[i].className.indexOf("clear") != -1){
                homeBlocks[i].style.width = "0";
                continue;
            }

            homeBlocks[i].style.display = 'none';
        }

        let mainBlock = document.querySelector("#main");
        if(!mainBlock){
            return;
        }

        if(mainBlock.style.display == 'grid'){
            mainBlock.style.display = 'flex';    
        }

        let mainBlocks = document.querySelectorAll("#main > div");
        if(!mainBlocks){
            return;
        }

        let mainContent;
        for(let i = 0; i < mainBlocks.length; i++){
            if(mainBlocks[i].id && mainBlocks[i].id != "mainContent"){
                mainBlocks[i].style.display = 'none';
                continue;
            }

            if(mainBlocks[i].className && mainBlocks[i].className.indexOf("clear") != -1){
                mainBlocks[i].style.width = "0";
                continue;
            }

            mainContent = mainBlocks[i];
        }

        document.querySelector("#catalog") ? mainContent.style.width = '75vw': mainContent.style.width = '95%';

        let marginLeft = parseInt(getComputedStyle(mainContent).getPropertyValue("margin-left"));
        if(!isNaN(marginLeft) && marginLeft> 20){
            let top = mainContent.style.marginTop;
            mainContent.style.margin = '0 auto';
            mainContent.style.marginTop = top;
        }

        let toolbar = document.querySelector(".custom-toolbar");
        if(toolbar){
            toolbar.style.display = 'none';
        }

        simplified = true;
    }

    setTimeout(simplify_cnblogs, 2000);

    window.onload = function(){
        simplify_cnblogs();
    };

})();