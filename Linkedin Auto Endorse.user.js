// ==UserScript==
// @name Linkedin Auto Endorse
// @namespace OrangeMonkey Scripts
// @grant none
// ==/UserScript==

const endorseSkillsHandler = async (e, iteration = 0) => {
  const showAllSkillsButton = document.querySelector('.artdeco-card:has(#skills) .pvs-list__footer-wrapper a.artdeco-button');
  
  if (showAllSkillsButton !== null) {
  	showAllSkillsButton.click();
    return;
  }
  
  e.target.style.backgroundColor = '#aaaaaa';
  e.target.setAttribute('disabled', 'disabled');
  const endorseButtons = document
  	.querySelectorAll('.artdeco-tabpanel:not(.artdeco-tabpanel--hidden) .pvs-list__paged-list-item button.artdeco-button:not(:has(.artdeco-button__icon))');
  if (endorseButtons.length < 1) {
    e.target.removeAttribute('disabled');
    e.target.style.backgroundColor = '#33b249';
    return;
  }
  const pressEndorseButtonsPromises = [...endorseButtons].map((button, i) => new Promise((resolve) => {
    setTimeout(() => {
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });;
      button.click()
      resolve();
    }, i * 500);
  }))
  await Promise.allSettled(pressEndorseButtonsPromises);
  const restEndorseButtons = document
  	.querySelectorAll('.artdeco-tabpanel:not(.artdeco-tabpanel--hidden) .pvs-list__paged-list-item .artdeco-button:not(:has(.artdeco-button__icon))');
  if (restEndorseButtons.length > 0 && iteration < 5) {
    endorseSkillsHandler(e, iteration + 1);
  } else {
    e.target.removeAttribute('disabled');
    e.target.style.backgroundColor = '#33b249';
    return;
  }
}

(function() {
  'use strict';

  const { host } = window.location;
  if (host !== 'www.linkedin.com') {
    return;
  }
  
  const skillsListContainer = document.querySelector('.pvs-list');
  
  const button = document.createElement('button');
  button.innerText = 'Endorse all';
  button.style.backgroundColor = '#5783db';
  button.style.color = '#ffffff';
  button.style.padding = '20px';
  button.style.borderRadius = '4px';
  button.style.position = 'fixed';
  button.style.zIndex = '99';
  button.style.bottom = '40px';
  button.style.left = '40px';
  
  button.addEventListener('click', endorseSkillsHandler);
	
  document.body.append(button);
})();
