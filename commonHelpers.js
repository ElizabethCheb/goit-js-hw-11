import{S as d}from"./assets/vendor-c9def49e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();let i;const u="41856148-e541297002e84807a45dae6d1",m=document.getElementById("search-form"),h=document.getElementById("search-input"),l=document.getElementById("gallery");m.addEventListener("submit",function(e){e.preventDefault();const o=h.value.trim();g(o,u)});document.addEventListener("DOMContentLoaded",function(){i=new d(".gallery a",{})});function g(e,o){const a=`https://pixabay.com/api/?key=${o}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true`;f(),fetch(a).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{if(s(),p(),t.hits.length===0){y();return}E(t.hits)}).catch(t=>{console.error("Error fetching data:",t),s(),displayErrorMessage("An error occurred while fetching data. Please try again.")})}function f(){if(!document.querySelector(".loading-indicator")){const o=document.createElement("div");o.className="loading-indicator",o.innerText="Loading...",document.body.appendChild(o)}}function s(){const e=document.querySelector(".loading-indicator");e&&e.remove()}function p(){l.innerHTML=""}function y(){const e=document.createElement("div");e.className="toast-container";const o=document.createElement("span");o.className="decorative-icon",o.innerHTML="&#9737;";const a=document.createElement("p");a.innerText="Sorry, there are no images matching your search query. Please, try again!";const t=document.createElement("span");t.className="close-button",t.innerHTML="&times;",e.appendChild(o),e.appendChild(a),e.appendChild(t),document.body.appendChild(e),t.addEventListener("click",()=>{e.remove()})}function E(e){const o=document.createDocumentFragment();e.forEach(a=>{const t=document.createElement("a");t.href=a.webformatURL;const n=document.createElement("img");n.src=a.webformatURL,n.alt=a.tags,t.style.width="calc((100% - 32px) / 3)",t.style.height="auto",n.style.width="100%",n.style.height="100%",t.style.marginBottom="16px",t.style.display="block",t.appendChild(n),o.appendChild(t)}),l.appendChild(o)}l.addEventListener("click",function(e){e.target.tagName==="IMG"&&i&&i.open({elements:[e.target]})});const L=document.querySelectorAll(".gallery img");L.forEach(e=>{e.style.width="calc((100% - 32px) / 3)",e.style.height="auto",e.style.marginBottom="16px"});const w=document.querySelectorAll(".gallery a");w.forEach(e=>{e.style.width="calc((100% - 32px) / 3)",e.style.height="auto",e.style.marginBottom="16px"});
//# sourceMappingURL=commonHelpers.js.map
