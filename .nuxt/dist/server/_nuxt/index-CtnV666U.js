import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mergeProps, useSSRContext, withCtx, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as __nuxt_component_1, a as __nuxt_component_2 } from "./corner-section-CG_gmmru.js";
import _sfc_main$2 from "./ContentDoc-D_W1VAJm.js";
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
var vertex_default = "#include <common>\n#include <logdepthbuf_pars_vertex>\n#include <fog_pars_vertex>\n\nattribute vec3 previous;\nattribute vec3 next;\nattribute float side;\nattribute float width;\nattribute float counters;\n\nuniform vec2 resolution;\nuniform float lineWidth;\nuniform vec3 color;\nuniform float opacity;\nuniform float sizeAttenuation;\n\nuniform float uTime;\nuniform float speed;\nuniform float offset;\nuniform float amplitude;\nuniform float b;\nuniform float c;\nuniform float d;\nuniform float e;\nuniform float f;\n\nvarying vec2 vUV;\nvarying vec4 vColor;\nvarying float vCounters;\nvarying vec3 vP;\nvec2 fix(vec4 i, float aspect) {\n    vec2 res = i.xy / i.w;\n    res.x *= aspect;\n    vCounters = counters;\n    return res;\n}\n\nvoid main() {\n    float aspect = resolution.x / resolution.y;\n    vColor = vec4(color, opacity);\n    vUV = uv;\n\n    mat4 m = projectionMatrix * modelViewMatrix;\n\n    vec3 p = vec3(position);\n    vP = p;\n    float o = PI *offset;\n    o += uTime;\n    \n    float a = amplitude * cos( p.z) ;\n    float x =(p.z * speed +o);\n    p.y += a * sin(b * x + c * sin(d * x - e) + f );\n    p.x += a * cos(b * x + c * sin(d * x - e) * p.z/10.0);\n    \n    vec4 finalPosition = m * vec4(p, 1.0);\n    vec4 prevPos = m * vec4(previous, 1.0);\n    vec4 nextPos = m * vec4(next, 1.0);\n\n    vec2 currentP = fix(finalPosition, aspect);\n    vec2 prevP = fix(prevPos, aspect);\n    vec2 nextP = fix(nextPos, aspect);\n\n    float w = lineWidth * width;\n\n    vec2 dir;\n    if (nextP == currentP) dir = normalize(currentP - prevP);\n    else if (prevP == currentP) dir = normalize(nextP - currentP);\n    else {\n    vec2 dir1 = normalize(currentP - prevP);\n    vec2 dir2 = normalize(nextP - currentP);\n    dir = normalize(dir1 + dir2);\n\n    vec2 perp = vec2(-dir1.y, dir1.x);\n    vec2 miter = vec2(-dir.y, dir.x);\n    \n    }\n\n    \n    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);\n    normal.xy *= .5 * w;\n    \n    if (sizeAttenuation == 0.) {\n    normal.xy *= finalPosition.w;\n    normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy;\n    }\n\n    finalPosition.xy += normal.xy * side;\n    gl_Position = finalPosition;\n    #include <logdepthbuf_vertex>\n    #include <fog_vertex>\n    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n    #include <fog_vertex>\n}";
var fragment_default = "#include <fog_pars_fragment>\n  #include <logdepthbuf_pars_fragment>\n  \n  uniform sampler2D map;\n  uniform sampler2D alphaMap;\n  uniform float useMap;\n  uniform float useAlphaMap;\n  uniform float useDash;\n  uniform float dashArray;\n  uniform float dashOffset;\n  uniform float dashRatio;\n  uniform float visibility;\n  uniform float alphaTest;\n  uniform vec2 repeat;\n  \n  varying vec2 vUV;\n  varying vec4 vColor;\n  varying float vCounters;\n  varying vec3 vP;\n  uniform float uTime;\n  \n  void main() {\n    #include <logdepthbuf_fragment>\n    vec4 c = vColor;\n    c.r = sin(vP.z);\n    c.a = 0.7;\n    if (useMap == 1.) c *= texture2D(map, vUV * repeat);\n    if (useAlphaMap == 1.) c.a *= texture2D(alphaMap, vUV * repeat).a;\n    if (c.a < alphaTest) discard;\n    if (useDash == 1.) {\n      c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));\n    }\n    gl_FragColor = c;\n    gl_FragColor.a *= step(vCounters, visibility);\n    #include <fog_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n  }";
const _sfc_main$1 = {
  // unmount() {
  // leo says destroy it here
  // }
  mounted() {
    const sizes = {
      width: (void 0).innerWidth,
      height: (void 0).innerHeight
    };
    (void 0).addEventListener("resize", () => {
      sizes.width = (void 0).innerWidth;
      sizes.height = (void 0).innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min((void 0).devicePixelRatio, 2));
    });
    const backgroundColor = new THREE.Color("beige");
    const canvas = (void 0).querySelector("canvas.webgl");
    const scene = new THREE.Scene();
    scene.background = backgroundColor;
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      120
    );
    camera.position.set(-1.526809290138386, 2.933433136629435, 2.2502940751091676);
    camera.rotation.set(
      -0.9164283978958037,
      -0.3916373693287119,
      -0.46170863682209606
    );
    new OrbitControls(camera, canvas);
    scene.add(camera);
    (void 0).camera = camera;
    const lineLength = 8;
    const points = [];
    for (let i = -lineLength; i < lineLength; i += 0.01) {
      points.push(new THREE.Vector3(0, 0, i));
    }
    const geometry = new MeshLineGeometry();
    geometry.setPoints(points, (p) => Math.sin(p) / 5);
    const material = new MeshLineMaterial({
      side: THREE.DoubleSide,
      color: new THREE.Color(0.8, 0.1, 0.3)
    });
    material.onBeforeCompile = function(info) {
      info.vertexShader = vertex_default;
      info.fragmentShader = fragment_default;
      info.uniforms.uTime = { value: 0 };
      info.uniforms.offset = { value: 0 };
      info.uniforms.speed = { value: 1 };
      info.uniforms.amplitude = { value: 1 };
      info.uniforms.b = { value: 0.8 };
      info.uniforms.c = { value: 0.8 };
      info.uniforms.d = { value: 0.8 };
      info.uniforms.e = { value: 0.8 };
      info.uniforms.f = { value: 0.8 };
    };
    for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / 40) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y += Math.PI / 2;
      mesh.rotation.z = i;
      mesh.position.y += Math.random() * 0.1;
      mesh.position.z += Math.random() * 0.1;
      mesh.position.x += Math.random() * 0.1;
      scene.add(mesh);
    }
    const renderer = new THREE.WebGLRenderer({
      canvas
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min((void 0).devicePixelRatio, 2));
    const clock = new THREE.Clock();
    const tick = () => {
      const e = clock.getElapsedTime() * 0.5;
      if (material.uniforms.uTime) {
        material.uniforms.uTime.value = e;
      }
      renderer.render(scene, camera);
      (void 0).requestAnimationFrame(tick);
    };
    tick();
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<canvas${ssrRenderAttrs(mergeProps({ class: "webgl" }, _attrs))}></canvas>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/twist.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_twist = __nuxt_component_0;
  const _component_navbar = __nuxt_component_1;
  const _component_corner_section = __nuxt_component_2;
  const _component_ContentDoc = _sfc_main$2;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_twist, null, null, _parent));
  _push(`<div class="front-layer">`);
  _push(ssrRenderComponent(_component_navbar, null, null, _parent));
  _push(ssrRenderComponent(_component_corner_section, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<h1${_scopeId}>hello world!</h1><div class="not-the-heading"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_ContentDoc, {
          head: false,
          class: "text",
          path: "/hello-world"
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode("h1", null, "hello world!"),
          createVNode("div", { class: "not-the-heading" }, [
            createVNode(_component_ContentDoc, {
              head: false,
              class: "text",
              path: "/hello-world"
            })
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-CtnV666U.js.map
