!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=t.parcelRequire7bc7;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},t.parcelRequire7bc7=i);var r=i("iU1Pc"),u={formEl:document.querySelector("form"),firstDelayEl:document.querySelector('input[name="delay"]'),delayStepEl:document.querySelector('input[name="step"]'),amountEl:document.querySelector('input[name="amount"]'),submitBtn:document.querySelector('button[type="submit"]')};function l(e,t){return new Promise((function(n,o){setTimeout((function(){Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}console.log(u),u.formEl.addEventListener("submit",(function(t){t.preventDefault();for(var n=t.target.elements,o=n.delay,i=n.step,u=n.amount,a=1,c=+o.value;a<=+u.value;a++,c+=+i.value)l(a,c).then((function(t){var n=t.position,o=t.delay;e(r).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(t){var n=t.position,o=t.delay;e(r).Notify.failure("❌ Rejected promise  ".concat(n," in ").concat(o,"ms"))}))}))}();
//# sourceMappingURL=03-promises.1bc690a3.js.map
