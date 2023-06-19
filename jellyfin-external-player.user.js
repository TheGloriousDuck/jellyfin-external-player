// ==UserScript==
// @name         Jellyfin External Player
// @namespace    https://github.com/TheGloriousDuck
// @version      0.1
// @description  Adds a button to the Jellyfin UI that allows you to use MPC-HC as an external player
// @author       TheGloriousDuck
// @match        https://localhost:8096/*
// @icon         https://raw.githubusercontent.com/jellyfin/jellyfin-ux/c6d7b1fc16c8d62df9125d6463f3d404e0e81bae/branding/SVG/icon-transparent.svg
// @run-at       document-end
// ==/UserScript==

function execute() {
    'use strict';

    console.log("executing");

    let currentMediaEl;

    document.querySelectorAll('[data-action="menu"]').forEach((el) => {
        let mediaEl = el.parentNode.parentNode.parentNode.parentNode.parentNode;

        if (!mediaEl.attributes.getNamedItem("data-mediatype")) return;
        if (mediaEl.attributes.getNamedItem("data-mediatype").value != 'Video') return;
        if (mediaEl.attributes.getNamedItem("data-isfolder").value != 'false') return;

        el.addEventListener("click", function(event) {
            console.log("clicked 3 dots");
            currentMediaEl = mediaEl;
        })

    });

    document.addEventListener("DOMNodeInserted", function(event) {
        if (!currentMediaEl) return;
        if (event.target.className === "dialogContainer")
        {
            console.log("inserted");
            console.log(currentMediaEl);
            let buttonList = event.target.children[0].children[0].children[0];
            let playAllFromHereButton = buttonList.querySelector('[data-id="playallfromhere"]')
            console.log("button list: " + buttonList);
            console.log("playAllFromhereButton: " + playAllFromHereButton);

            let externalPlayerButtonDiv = document.createElement("div");
            externalPlayerButtonDiv.innerHTML = '<button is="emby-button" type="button" class="listItem listItem-button actionSheetMenuItem emby-button" data-id="playexternally"><span class="actionsheetMenuItemIcon listItemIcon listItemIcon-transparent material-icons play_arrow" aria-hidden="true"></span><div class="listItemBody actionsheetListItemBody"><div class="listItemBodyText actionSheetItemText">Play externally</div></div></button>';
            let externalPlayerButton = externalPlayerButtonDiv.children[0];

            externalPlayerButtonDiv.addEventListener("click", handleExternalPlayer);

            buttonList.insertBefore(externalPlayerButtonDiv, playAllFromHereButton);

            currentMediaEl = null;
        }

        function handleExternalPlayer(event) {
            // TODO: get the video stream link using Jellyfin API and play to MPC-HC
        }
    }, false);
};

function delayed() { console.log("delayed"); setTimeout(execute, 5000); }

window.addEventListener('load', delayed);
