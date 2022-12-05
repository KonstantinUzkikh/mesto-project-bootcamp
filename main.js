(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){"Escape"===e.key&&(r(),e.target.blur())}function n(e){e.classList.add("popup_opened"),setTimeout((function(){e.classList.remove("popup_disappearance"),e.classList.add("popup_appearance")}),100),document.addEventListener("keydown",t)}function r(){var e=document.querySelector(".popup_opened");e.classList.remove("popup_appearance"),e.classList.add("popup_disappearance"),setTimeout((function(){e.classList.remove("popup_opened")}),700),document.removeEventListener("keydown",t)}function o(e,t,n){var r=e.querySelector(".popup__input-error_".concat(t.id));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function a(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){return o(e,n,t)}))}function c(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.removeAttribute("disabled"),t.classList.remove(n.inactiveButtonClass)):(t.setAttribute("disabled",!0),t.classList.add(n.inactiveButtonClass))}e.d({},{x:()=>L,N:()=>q});var i={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-3",headers:{authorization:"29081990-548c-4f14-9b01-8d4a7169b3f0","Content-Type":"application/json"}};function u(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function l(e,t,n){var r={method:"".concat(t),headers:i.headers};return null!=n&&(r.body=JSON.stringify(n)),fetch(e,r).then(u)}function s(e,t){e.textContent=t}var d,p=document.querySelector("#card-template").content,f=document.querySelector(".elements__cards-list"),m=document.querySelector(".popup_magnification-image"),_=m.querySelector(".popup__big-image"),v=m.querySelector(".popup__title-big-image"),y=document.querySelector(".popup_confirmation-action"),b=y.querySelector(".popup__button-submit");function S(e){var t=p.querySelector(".elements__card-item").cloneNode(!0);e.refDOM=t;var r=t.querySelector(".card__image"),o=t.querySelector(".card__title"),a=t.querySelector(".card__counter-likes"),c=t.querySelector(".card__button-like"),u=t.querySelector(".card__button-delete"),s=t.querySelector(".card__button-image");return o.textContent=e.name,r.src=e.link,r.alt="Фотография: "+e.name,0!=e.likes.length&&(a.textContent="".concat(e.likes.length),e.likes.some((function(e){return e===q._id}))&&c.classList.add("card__button-like_active")),c.addEventListener("click",(function(){return function(e){var t,n;(t=e.likes.some((function(e){return e===q._id}))?"DELETE":"PUT",n=e,l("".concat(i.baseUrl,"/cards/likes/").concat(n.card_id),t)).then((function(t){e.likes=t.likes.map((function(e){return e._id})),e.likes.length>0?e.refDOM.querySelector(".card__counter-likes").textContent=e.likes.length:e.refDOM.querySelector(".card__counter-likes").textContent="",e.refDOM.querySelector(".card__button-like").classList.toggle("card__button-like_active")})).catch((function(e){return alert("".concat(e," - ошибка обмена данными с сервером"))}))}(e)})),e.owner_id===q._id&&(u.classList.add("card__button-delete_active"),u.addEventListener("click",(function(){return function(e){d=e,n(y)}(e)}))),s.addEventListener("click",(function(){return function(e){v.textContent=e.name,_.src=e.link,_.alt="Фотография: "+e.name,n(m)}(e)})),t}function h(e){f.prepend(e)}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}b.addEventListener("click",(function(e){var t;e.preventDefault(e),s(b,"Удаление..."),(t=d,l("".concat(i.baseUrl,"/cards/").concat(t.card_id),"DELETE")).then((function(){var e;L.some((function(t,n){t.card_id===d.card_id&&(e=n)})),function(e){e.remove()}(L[e].refDOM),L.splice(e,1)})).then((function(){r()})).catch((function(e){return alert("".concat(e," - ошибка обмена данными с сервером"))})).finally((function(){s(b,"Да")}))}));var q={},L=[];Promise.all([l("".concat(i.baseUrl,"/users/me"),"GET"),l("".concat(i.baseUrl,"/cards"),"GET")]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];q=o,A.src=q.avatar,x.textContent=q.name,w.textContent=q.about,(L=a.map((function(e){return{name:e.name,link:e.link,owner_id:e.owner._id,card_id:e._id,likes:e.likes.map((function(e){return e._id}))}}))).forEach((function(e){h(S(e))}))})).catch((function(e){return alert("".concat(e," - ошибка чтения данных с сервера"))}));var E,g={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_disabled",inputErrorClass:"popup__input_type-error",errorClass:"popup__input-error_visible"};E=g,Array.from(document.querySelectorAll(E.formSelector)).forEach((function(e){return function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(a){a.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?o(e,t,n):function(e,t,n){var r=e.querySelector(".popup__input-error_".concat(t.id));r.textContent=t.validationMessage,r.classList.add(n.errorClass),t.classList.add(n.inputErrorClass)}(e,t,n)}(e,a,t),c(n,r,t)}))}))}(e,E)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__button-close"))&&r()}))}));var C=document.querySelector(".profile__container"),A=C.querySelector(".profile__avatar"),x=C.querySelector(".profile__name"),w=C.querySelector(".profile__activity"),T=C.querySelector(".profile__button-edit"),O=document.querySelector(".popup_editing-profile"),D=document.forms.form_profile,U=D.elements["profile-name"],j=D.elements["profile-activity"],P=D.elements["button-submit_profile"];T.addEventListener("click",(function(){U.value=x.textContent,j.value=w.textContent,a(D,g),c([U,j],P,g),n(O)})),D.addEventListener("submit",(function(e){e.preventDefault(e),s(P,"Сохранение..."),function(e,t){return l("".concat(i.baseUrl,"/users/me"),"PATCH",{name:e,about:t})}(U.value,j.value).then((function(e){x.textContent=e.name,w.textContent=e.about,q.name=e.name,q.about=e.about})).then((function(){r()})).catch((function(e){return alert("".concat(e," - ошибка записи профиля"))})).finally((function(){s(P,"Сохранить")}))}));var M=C.querySelector(".profile__button-avatar"),B=document.querySelector(".popup_editing-avatar"),I=document.forms.form_avatar,N=I.elements["avatar-url"],G=I.elements["button-submit_avatar"];M.addEventListener("click",(function(){N.value=A.src,a(I,g),c([N],G,g),n(B)})),I.addEventListener("submit",(function(e){var t;e.preventDefault(e),s(G,"Сохранение..."),(t="".concat(N.value),l("".concat(i.baseUrl,"/users/me/avatar"),"PATCH",{avatar:t})).then((function(e){A.src=e.avatar,q.avatar=e.avatar})).then((function(){r()})).catch((function(e){return alert("".concat(e," - ошибка записи url аватара"))})).finally((function(){s(G,"Сохранить")}))}));var H=document.querySelector(".profile__button-add-card"),z=document.querySelector(".popup_creating-card"),J=document.forms.form_card,$=J.elements["card-name"],F=J.elements["card-url"],K=J.elements["button-submit_card"];c([$,F],K,g),H.addEventListener("click",(function(){n(z)})),J.addEventListener("reset",(function(){setTimeout((function(){c([$,F],K,g)}),0)})),J.addEventListener("submit",(function(e){e.preventDefault(e);var t={name:$.value,link:F.value};s(K,"Сохранение..."),function(e){return l("".concat(i.baseUrl,"/cards"),"POST",{name:e.name,link:e.link})}(t).then((function(t){var n={name:t.name,link:t.link,owner_id:t.owner._id,card_id:t._id,likes:t.likes.map((function(e){return e._id}))};L.push(n),h(S(n)),e.target.reset()})).then((function(){r()})).catch((function(e){return alert("".concat(e," - ошибка записи карточки"))})).finally((function(){s(K,"Создать")}))}))})();