import { _ as __nuxt_component_1, a as __nuxt_component_2 } from "./corner-section-CG_gmmru.js";
import _sfc_main$1 from "./ContentDoc-D_W1VAJm.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./nuxt-link-CFXPg0gv.js";
import "ufo";
import "../server.mjs";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "klona";
import "devalue";
import "./ContentRenderer-LVLN0x9G.js";
import "./ContentRendererMarkdown-BeuGjsxX.js";
import "destr";
import "scule";
import "property-information";
import "./preview-B122VS9C.js";
import "cookie-es";
import "ohash";
import "./ContentQuery-C-tUDgY3.js";
import "./query-F7LhHKtN.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_navbar = __nuxt_component_1;
  const _component_corner_section = __nuxt_component_2;
  const _component_ContentDoc = _sfc_main$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_navbar, null, null, _parent));
  _push(ssrRenderComponent(_component_corner_section, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h1${_scopeId}>Colophon</h1><div class="not-the-heading"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_ContentDoc, {
          head: false,
          class: "text",
          path: "/colophon"
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("h1", null, "Colophon"),
          createVNode("div", { class: "not-the-heading" }, [
            createVNode(_component_ContentDoc, {
              head: false,
              class: "text",
              path: "/colophon"
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/colophon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const colophon = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  colophon as default
};
//# sourceMappingURL=colophon-CS2815MP.js.map
