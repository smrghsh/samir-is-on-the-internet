import { _ as __nuxt_component_0 } from './nuxt-link-CFXPg0gv.mjs';
import { withCtx, createVNode, useSSRContext, mergeProps } from 'file:///Users/vertex/code/samir-is-on-the-internet/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot } from 'file:///Users/vertex/code/samir-is-on-the-internet/node_modules/vue/server-renderer/index.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _imports_0 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20aria-label='GitHub'%20role='img'%20viewBox='0%200%20512%20512'%3e%3crect%20width='512'%20height='512'%20rx='15%25'%20fill='%231B1817'/%3e%3cpath%20fill='%23fff'%20d='M335%20499c14%200%2012%2017%2012%2017H165s-2-17%2012-17c13%200%2016-6%2016-12l-1-50c-71%2016-86-28-86-28-12-30-28-37-28-37-24-16%201-16%201-16%2026%202%2040%2026%2040%2026%2022%2039%2059%2028%2074%2022%202-17%209-28%2016-35-57-6-116-28-116-126%200-28%2010-51%2026-69-3-6-11-32%203-67%200%200%2021-7%2070%2026%2042-12%2086-12%20128%200%2049-33%2070-26%2070-26%2014%2035%206%2061%203%2067%2016%2018%2026%2041%2026%2069%200%2098-60%20120-117%20126%2010%208%2018%2024%2018%2048l-1%2070c0%206%203%2012%2016%2012z'/%3e%3c/svg%3e";
const _imports_1 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-label='Instagram'%20role='img'%20viewBox='0%200%20512%20512'%3e%3crect%20width='512'%20height='512'%20rx='15%25'%20id='b'/%3e%3cuse%20fill='url(%23a)'%20xlink:href='%23b'/%3e%3cuse%20fill='url(%23c)'%20xlink:href='%23b'/%3e%3cradialGradient%20id='a'%20cx='.4'%20cy='1'%20r='1'%3e%3cstop%20offset='.1'%20stop-color='black'/%3e%3cstop%20offset='.5'%20stop-color='black'/%3e%3cstop%20offset='1'%20stop-color='%23black'/%3e%3c/radialGradient%3e%3clinearGradient%20id='c'%20x2='.2'%20y2='1'%3e%3cstop%20offset='.1'%20stop-color='black'/%3e%3cstop%20offset='.5'%20stop-color='black'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3cg%20fill='none'%20stroke='%23fff'%20stroke-width='30'%3e%3crect%20width='308'%20height='308'%20x='102'%20y='102'%20rx='81'/%3e%3ccircle%20cx='256'%20cy='256'%20r='72'/%3e%3ccircle%20cx='347'%20cy='165'%20r='6'/%3e%3c/g%3e%3c/svg%3e";
const _imports_2 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20aria-label='LinkedIn'%20role='img'%20viewBox='0%200%20512%20512'%20fill='%23fff'%3e%3cpath%20d='m0%200H512V512H0'%20fill='black'/%3e%3ccircle%20cx='142'%20cy='138'%20r='37'/%3e%3cpath%20stroke='%23fff'%20stroke-width='66'%20d='M244%20194v198M142%20194v198'/%3e%3cpath%20d='M276%20282c0-20%2013-40%2036-40%2024%200%2033%2018%2033%2045v105h66V279c0-61-32-89-76-89-34%200-51%2019-59%2032'/%3e%3c/svg%3e";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<nav${ssrRenderAttrs(_attrs)}><div class="first-row">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "home-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h1${_scopeId}>Samir Ghosh</h1>`);
      } else {
        return [
          createVNode("h1", null, "Samir Ghosh")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="socials"><a href="https://github.com/smrghsh"><img${ssrRenderAttr("src", _imports_0)} alt=""></a><a href="https://www.instagram.com/vertex.shader/"><img${ssrRenderAttr("src", _imports_1)} alt=""></a><a href="https://www.linkedin.com/in/vertexshader"><img${ssrRenderAttr("src", _imports_2)} alt=""></a></div></div><div class="second-row">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "subpage",
    to: "/bio"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3${_scopeId}>Bio</h3>`);
      } else {
        return [
          createVNode("h3", null, "Bio")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<a class="subpage" href="CV_Samir_Ghosh-11-6-23.pdf"><h3>CV</h3></a>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "subpage",
    to: "/Colophon"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h3${_scopeId}>Colophon</h3>`);
      } else {
        return [
          createVNode("h3", null, "Colophon")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></nav>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "corner-heading" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/corner-section.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_1 as _, __nuxt_component_2 as a };
//# sourceMappingURL=corner-section-CG_gmmru.mjs.map
