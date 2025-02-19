import{u as we}from"./BfqyDlIo.js";import{bW as b,bX as T,bY as v,bZ as k,b_ as H,b$ as K,c0 as Ie,c1 as ye,c2 as W,c3 as be,c4 as Te,c5 as ve,c6 as N,c7 as Ae,c8 as Se,c9 as ke,v as Ee,x as Ce,ba as Re,t as _e}from"./JidMSw1s.js";const Y="@firebase/installations",O="0.6.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J=1e4,X=`w:${O}`,Z="FIS_v2",Pe="https://firebaseinstallations.googleapis.com/v1",De=60*60*1e3,Oe="installations",Fe="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},m=new H(Oe,Fe,Me);function Q(e){return e instanceof K&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee({projectId:e}){return`${Pe}/projects/${e}/installations`}function te(e){return{token:e.token,requestStatus:2,expiresIn:xe(e.expiresIn),creationTime:Date.now()}}async function ne(e,t){const a=(await t.json()).error;return m.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function ae({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function $e(e,{refreshToken:t}){const n=ae(e);return n.append("Authorization",Ne(t)),n}async function ie(e){const t=await e();return t.status>=500&&t.status<600?e():t}function xe(e){return Number(e.replace("s","000"))}function Ne(e){return`${Z} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function je({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=ee(e),i=ae(e),s=t.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const r={fid:n,authVersion:Z,appId:e.appId,sdkVersion:X},o={method:"POST",headers:i,body:JSON.stringify(r)},c=await ie(()=>fetch(a,o));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:te(l.authToken)}}else throw await ne("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=/^[cdef][\w-]{21}$/,D="";function Be(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Ve(e);return Le.test(n)?n:D}catch{return D}}function Ve(e){return qe(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re=new Map;function oe(e,t){const n=E(e);ce(n,t),Ue(n,t)}function ce(e,t){const n=re.get(e);if(n)for(const a of n)a(t)}function Ue(e,t){const n=ze();n&&n.postMessage({key:e,fid:t}),Ge()}let h=null;function ze(){return!h&&"BroadcastChannel"in self&&(h=new BroadcastChannel("[Firebase] FID Change"),h.onmessage=e=>{ce(e.data.key,e.data.fid)}),h}function Ge(){re.size===0&&h&&(h.close(),h=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="firebase-installations-database",Ke=1,w="firebase-installations-store";let R=null;function F(){return R||(R=Ie(He,Ke,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(w)}}})),R}async function A(e,t){const n=E(e),i=(await F()).transaction(w,"readwrite"),s=i.objectStore(w),r=await s.get(n);return await s.put(t,n),await i.done,(!r||r.fid!==t.fid)&&oe(e,t.fid),t}async function le(e){const t=E(e),a=(await F()).transaction(w,"readwrite");await a.objectStore(w).delete(t),await a.done}async function C(e,t){const n=E(e),i=(await F()).transaction(w,"readwrite"),s=i.objectStore(w),r=await s.get(n),o=t(r);return o===void 0?await s.delete(n):await s.put(o,n),await i.done,o&&(!r||r.fid!==o.fid)&&oe(e,o.fid),o}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M(e){let t;const n=await C(e.appConfig,a=>{const i=We(a),s=Ye(e,i);return t=s.registrationPromise,s.installationEntry});return n.fid===D?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function We(e){const t=e||{fid:Be(),registrationStatus:0};return ue(t)}function Ye(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(m.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=Je(e,n);return{installationEntry:n,registrationPromise:a}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Xe(e)}:{installationEntry:t}}async function Je(e,t){try{const n=await je(e,t);return A(e.appConfig,n)}catch(n){throw Q(n)&&n.customData.serverCode===409?await le(e.appConfig):await A(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Xe(e){let t=await j(e.appConfig);for(;t.registrationStatus===1;)await se(100),t=await j(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:a}=await M(e);return a||n}return t}function j(e){return C(e,t=>{if(!t)throw m.create("installation-not-found");return ue(t)})}function ue(e){return Ze(e)?{fid:e.fid,registrationStatus:0}:e}function Ze(e){return e.registrationStatus===1&&e.registrationTime+J<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qe({appConfig:e,heartbeatServiceProvider:t},n){const a=et(e,n),i=$e(e,n),s=t.getImmediate({optional:!0});if(s){const l=await s.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const r={installation:{sdkVersion:X,appId:e.appId}},o={method:"POST",headers:i,body:JSON.stringify(r)},c=await ie(()=>fetch(a,o));if(c.ok){const l=await c.json();return te(l)}else throw await ne("Generate Auth Token",c)}function et(e,{fid:t}){return`${ee(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t=!1){let n;const a=await C(e.appConfig,s=>{if(!de(s))throw m.create("not-registered");const r=s.authToken;if(!t&&at(r))return s;if(r.requestStatus===1)return n=tt(e,t),s;{if(!navigator.onLine)throw m.create("app-offline");const o=st(s);return n=nt(e,o),o}});return n?await n:a.authToken}async function tt(e,t){let n=await q(e.appConfig);for(;n.authToken.requestStatus===1;)await se(100),n=await q(e.appConfig);const a=n.authToken;return a.requestStatus===0?$(e,t):a}function q(e){return C(e,t=>{if(!de(t))throw m.create("not-registered");const n=t.authToken;return rt(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function nt(e,t){try{const n=await Qe(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await A(e.appConfig,a),n}catch(n){if(Q(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await le(e.appConfig);else{const a=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await A(e.appConfig,a)}throw n}}function de(e){return e!==void 0&&e.registrationStatus===2}function at(e){return e.requestStatus===2&&!it(e)}function it(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+De}function st(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function rt(e){return e.requestStatus===1&&e.requestTime+J<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ot(e){const t=e,{installationEntry:n,registrationPromise:a}=await M(t);return a?a.catch(console.error):$(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ct(e,t=!1){const n=e;return await lt(n),(await $(n,t)).token}async function lt(e){const{registrationPromise:t}=await M(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(e){if(!e||!e.options)throw _("App Configuration");if(!e.name)throw _("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw _(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function _(e){return m.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fe="installations",dt="installations-internal",ft=e=>{const t=e.getProvider("app").getImmediate(),n=ut(t),a=k(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},pt=e=>{const t=e.getProvider("app").getImmediate(),n=k(t,fe).getImmediate();return{getId:()=>ot(n),getToken:i=>ct(n,i)}};function gt(){T(new v(fe,ft,"PUBLIC")),T(new v(dt,pt,"PRIVATE"))}gt();b(Y,O);b(Y,O,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S="analytics",ht="firebase_id",mt="origin",wt=60*1e3,It="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",x="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u=new ye("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},d=new H("analytics","Analytics",yt);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(e){if(!e.startsWith(x)){const t=d.create("invalid-gtag-resource",{gtagURL:e});return u.warn(t.message),""}return e}function pe(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Tt(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function vt(e,t){const n=Tt("firebase-js-sdk-policy",{createScriptURL:bt}),a=document.createElement("script"),i=`${x}?l=${e}&id=${t}`;a.src=n?n==null?void 0:n.createScriptURL(i):i,a.async=!0,document.head.appendChild(a)}function At(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function St(e,t,n,a,i,s){const r=a[i];try{if(r)await t[r];else{const c=(await pe(n)).find(l=>l.measurementId===i);c&&await t[c.appId]}}catch(o){u.error(o)}e("config",i,s)}async function kt(e,t,n,a,i){try{let s=[];if(i&&i.send_to){let r=i.send_to;Array.isArray(r)||(r=[r]);const o=await pe(n);for(const c of r){const l=o.find(g=>g.measurementId===c),f=l&&t[l.appId];if(f)s.push(f);else{s=[];break}}}s.length===0&&(s=Object.values(t)),await Promise.all(s),e("event",a,i||{})}catch(s){u.error(s)}}function Et(e,t,n,a){async function i(s,r,o){try{s==="event"?await kt(e,t,n,r,o):s==="config"?await St(e,t,n,a,r,o):s==="consent"?e("consent","update",o):e("set",r)}catch(c){u.error(c)}}return i}function Ct(e,t,n,a,i){let s=function(...r){window[a].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=Et(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function Rt(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(x)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=30,Pt=1e3;class Dt{constructor(t={},n=Pt){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const ge=new Dt;function Ot(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function Ft(e){var t;const{appId:n,apiKey:a}=e,i={method:"GET",headers:Ot(a)},s=It.replace("{app-id}",n),r=await fetch(s,i);if(r.status!==200&&r.status!==304){let o="";try{const c=await r.json();!((t=c.error)===null||t===void 0)&&t.message&&(o=c.error.message)}catch{}throw d.create("config-fetch-failed",{httpStatus:r.status,responseMessage:o})}return r.json()}async function Mt(e,t=ge,n){const{appId:a,apiKey:i,measurementId:s}=e.options;if(!a)throw d.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:a};throw d.create("no-api-key")}const r=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new Nt;return setTimeout(async()=>{o.abort()},wt),he({appId:a,apiKey:i,measurementId:s},r,o,t)}async function he(e,{throttleEndTimeMillis:t,backoffCount:n},a,i=ge){var s;const{appId:r,measurementId:o}=e;try{await $t(a,t)}catch(c){if(o)return u.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:r,measurementId:o};throw c}try{const c=await Ft(e);return i.deleteThrottleMetadata(r),c}catch(c){const l=c;if(!xt(l)){if(i.deleteThrottleMetadata(r),o)return u.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:r,measurementId:o};throw c}const f=Number((s=l==null?void 0:l.customData)===null||s===void 0?void 0:s.httpStatus)===503?N(n,i.intervalMillis,_t):N(n,i.intervalMillis),g={throttleEndTimeMillis:Date.now()+f,backoffCount:n+1};return i.setThrottleMetadata(r,g),u.debug(`Calling attemptFetch again in ${f} millis`),he(e,g,a,i)}}function $t(e,t){return new Promise((n,a)=>{const i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),a(d.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function xt(e){if(!(e instanceof K)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class Nt{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function jt(e,t,n,a,i){if(i&&i.global){e("event",n,a);return}else{const s=await t,r=Object.assign(Object.assign({},a),{send_to:s});e("event",n,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qt(){if(Ae())try{await Se()}catch(e){return u.warn(d.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return u.warn(d.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Lt(e,t,n,a,i,s,r){var o;const c=Mt(e);c.then(p=>{n[p.measurementId]=p.appId,e.options.measurementId&&p.measurementId!==e.options.measurementId&&u.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${p.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(p=>u.error(p)),t.push(c);const l=qt().then(p=>{if(p)return a.getId()}),[f,g]=await Promise.all([c,l]);Rt(s)||vt(s,f.measurementId),i("js",new Date);const y=(o=r==null?void 0:r.config)!==null&&o!==void 0?o:{};return y[mt]="firebase",y.update=!0,g!=null&&(y[ht]=g),i("config",f.measurementId,y),f.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(t){this.app=t}_delete(){return delete I[this.app.options.appId],Promise.resolve()}}let I={},L=[];const B={};let P="dataLayer",Vt="gtag",V,me,U=!1;function Ut(){const e=[];if(ve()&&e.push("This is a browser extension environment."),ke()||e.push("Cookies are not available."),e.length>0){const t=e.map((a,i)=>`(${i+1}) ${a}`).join(" "),n=d.create("invalid-analytics-context",{errorInfo:t});u.warn(n.message)}}function zt(e,t,n){Ut();const a=e.options.appId;if(!a)throw d.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)u.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw d.create("no-api-key");if(I[a]!=null)throw d.create("already-exists",{id:a});if(!U){At(P);const{wrappedGtag:s,gtagCore:r}=Ct(I,L,B,P,Vt);me=s,V=r,U=!0}return I[a]=Lt(e,L,B,t,V,P,n),new Bt(e)}function Gt(e=be()){e=W(e);const t=k(e,S);return t.isInitialized()?t.getImmediate():Ht(e)}function Ht(e,t={}){const n=k(e,S);if(n.isInitialized()){const i=n.getImmediate();if(Te(t,n.getOptions()))return i;throw d.create("already-initialized")}return n.initialize({options:t})}function Kt(e,t,n,a){e=W(e),jt(me,I[e.app.options.appId],t,n,a).catch(i=>u.error(i))}const z="@firebase/analytics",G="0.9.5";function Wt(){T(new v(S,(t,{options:n})=>{const a=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return zt(a,i,n)},"PUBLIC")),T(new v("analytics-internal",e,"PRIVATE")),b(z,G),b(z,G,"esm2017");function e(t){try{const n=t.getProvider(S).getImmediate();return{logEvent:(a,i,s)=>Kt(n,a,i,s)}}catch(n){throw d.create("interop-component-reg-failed",{reason:n})}}}Wt();const Yt={class:"absolute w-full h-full mx-auto flex flex-col"},Jt={class:"relative grow"},Qt={__name:"default",setup(e){return Gt(),we().fetchPlatform(),(n,a)=>(_e(),Ee("div",Yt,[Ce("div",Jt,[Re(n.$slots,"default")])]))}};export{Qt as default};
