(function () {
  "use strict";
  const course = window.DPL_COURSE;
  const model = window.DPL_MODEL;
  const $ = id => document.getElementById(id);
  const all = selector => [...document.querySelectorAll(selector)];
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[character]));
  const icon = name => '<i data-lucide="' + name + '" aria-hidden="true"></i>';
  const icons = () => window.lucide?.createIcons();
  let state = model.initial();
  let storageWarning = "";
  let busy = false;
  let pngFiles = [];
  let pngUrls = [];
  let pdfUrl = "";
  let pendingImport;
  let currentVideo = 0;
  const activeModule = () => course.modules.find(module => module.id === state.activeId) || course.modules[0];
  const activeTopic = () => {
    const id = state.activeId;
    return state.topics[id] ||= { answers: {}, watched: {} };
  };

  function load() {
    try {
      const saved = localStorage.getItem(course.storageKey);
      const legacy = saved ? null : localStorage.getItem(course.legacyStorageKey);
      if (saved) state = model.normalize(JSON.parse(saved));
      else if (legacy) state = model.normalize(JSON.parse(legacy), true);
    } catch (error) {
      storageWarning = "No se pudo recuperar el guardado. Conserva un respaldo antes de continuar.";
    }
  }
  function save() {
    if (storageWarning) {
      $("save-status").textContent = storageWarning;
      $("save-status").classList.add("warning");
      return false;
    }
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(course.storageKey, JSON.stringify(state));
      $("save-status").textContent = "Guardado en este dispositivo";
      $("save-status").classList.remove("warning");
      return true;
    } catch {
      $("save-status").textContent = "No se pudo guardar. Descarga un respaldo.";
      $("save-status").classList.add("warning");
      return false;
    }
  }
  function invalidateExport() {
    state.delivery.reviewed = false;
    state.delivery.downloaded = false;
    state.delivery.ready = false;
    pngUrls.forEach(url => URL.revokeObjectURL(url));
    pngUrls = []; pngFiles = [];
    $("png-results").hidden = true;
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    pdfUrl = "";
    $("pdf-download-link").hidden = true;
  }
  function refreshProgress() {
    const summary = model.summary(state);
    $("global-progress").textContent = "Tu avance: " + summary.percent + "%";
    $("global-bar").value = summary.percent;
    $("module-summary").textContent = summary.completed + " de " + course.modules.length + " módulos completados.";
    $("resume-label").textContent = summary.percent ? "Continuar mi cuadernillo" : "Comenzar mi cuadernillo";
    const module = activeModule();
    const counts = model.counts(state, module);
    $("workbook-percent").textContent = counts.percent + "% de avance";
    $("workbook-bar").value = counts.percent;
    $("workbook-state").textContent = counts.status;
    $("workbook-state").className = "status" + (counts.complete ? " done" : "");
    $("answer-counter").textContent = counts.answered + " / " + model.questions(module).length + " respuestas";
    for (const item of course.modules) {
      const progress = model.counts(state, item);
      const card = document.querySelector('[data-card="' + item.id + '"]');
      if (!card) continue;
      card.querySelector(".status").textContent = progress.status;
      card.querySelector(".status").className = "status" + (progress.complete ? " done" : "");
      card.querySelector("progress").value = progress.percent;
      card.querySelector("[data-percent]").textContent = progress.percent + "%";
    }
    renderChecklist();
  }
  function renderModules() {
    $("module-grid").innerHTML = course.modules.map(module => {
      const count = model.counts(state, module);
      return '<article class="module-card" data-card="' + module.id + '"><a class="module-image" href="#cuadernillo/' + module.id + '/video" aria-label="Ver video: ' + escape(module.title) + '"><img src="https://i.ytimg.com/vi/' + module.videos[0].id + '/hqdefault.jpg" alt="Clase de ' + escape(module.title) + '" loading="lazy" width="480" height="360"><span>' + icon("play") + module.videos.length + (module.videos.length === 1 ? " video" : " videos") + '</span></a><div class="module-body"><div class="module-meta"><span>MÓDULO ' + module.number + '</span><span class="status">' + count.status + '</span></div><h3>' + escape(module.title) + '</h3><p>' + escape(module.subtitle) + '</p><div class="module-progress-line"><strong data-percent>' + count.percent + '%</strong><span>' + model.questions(module).length + ' preguntas</span></div><progress max="100" value="' + count.percent + '" aria-label="Avance: ' + escape(module.title) + '"></progress><div class="module-actions"><a class="button outline" href="#cuadernillo/' + module.id + '/video">' + icon("play") + 'Ver video</a><a class="button gold" href="#cuadernillo/' + module.id + '/preguntas">' + icon("notebook-pen") + 'Abrir cuadernillo</a></div></div></article>';
    }).join("");
    icons();
  }
  function renderVideo(index = 0) {
    const module = activeModule();
    currentVideo = Math.min(index, module.videos.length - 1);
    const video = module.videos[currentVideo];
    $("video-tabs").innerHTML = module.videos.map((item, i) => '<button type="button" data-video="' + i + '" aria-pressed="' + (i === currentVideo) + '">' + escape(item.title) + '</button>').join("");
    $("video-player").innerHTML = '<button id="play-video" aria-label="Reproducir ' + escape(video.title) + '"><img src="https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg" alt="" width="480" height="360"><span>' + icon("play") + 'Ver video</span></button>';
    $("play-video").addEventListener("click", () => {
      const frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + video.id + "?autoplay=1&rel=0";
      frame.title = video.title;
      frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      $("video-player").replaceChildren(frame);
    });
    $("video-tabs").querySelectorAll("button").forEach(button => button.addEventListener("click", () => renderVideo(Number(button.dataset.video))));
    $("video-checks").innerHTML = '<a class="video-external" href="' + video.url + '" target="_blank" rel="noopener noreferrer">' + icon("external-link") + 'Abrir en YouTube</a>' + module.videos.map(item => '<label><input type="checkbox" data-watched="' + item.id + '"' + (activeTopic().watched[item.id] ? ' checked' : '') + '><span>Ya vi ' + escape(item.title) + '</span></label>').join("");
    $("video-checks").querySelectorAll("input").forEach(input => input.addEventListener("change", () => {
      activeTopic().watched[input.dataset.watched] = input.checked;
      state.delivery.ready = false;
      save(); refreshProgress();
    }));
    icons();
  }
  function renderWorkbook() {
    const module = activeModule();
    const index = course.modules.indexOf(module);
    $("module-select").innerHTML = course.modules.map(item => '<option value="' + item.id + '">' + item.number + ' · ' + escape(item.title) + '</option>').join("");
    $("module-select").value = module.id;
    $("module-position").textContent = (index + 1) + " / " + course.modules.length;
    $("previous-module").disabled = index === 0;
    $("next-module").disabled = index === course.modules.length - 1;
    $("workbook-number").textContent = "MÓDULO " + module.number + " · GENERACIÓN 2022";
    $("workbook-title").textContent = module.title;
    $("workbook-subtitle").textContent = module.subtitle;
    renderVideo();
    const required = model.questions(module);
    const saved = activeTopic();
    const optional = index > 0 ? [{ id: "previousCommitment", label: "¿Cómo te fue con el compromiso del módulo anterior?", help: "Reflexión opcional para dar continuidad a tu aprendizaje." }] : [];
    $("questions").innerHTML = [...optional, ...required].map((question, i) => {
      const value = saved.answers[question.id] || "";
      return '<div class="question" id="question-' + question.id + '"><label for="answer-' + question.id + '"><span>' + (optional.includes(question) ? "" : (i + 1 - optional.length) + ". ") + escape(question.label) + '</span><span class="answer-indicator' + (value.trim() ? ' answered' : '') + '" data-indicator="' + question.id + '">' + (value.trim() ? "Completada" : "Pendiente") + '</span></label><p>' + escape(question.help || "") + '</p><textarea id="answer-' + question.id + '" data-answer="' + question.id + '" rows="5" placeholder="Escribe tu respuesta aquí…" aria-describedby="question-' + question.id + '">' + escape(value) + '</textarea></div>';
    }).join("");
    $("authenticity").innerHTML = '<label class="auth-label"><input id="auth-check" type="checkbox"' + (saved.answers.authenticity === "Confirmado" ? ' checked' : '') + '><span>Confirmo que estas respuestas corresponden a mi reflexión personal.</span></label>';
    $("auth-check").addEventListener("change", event => {
      activeTopic().answers.authenticity = event.target.checked ? "Confirmado" : "";
      invalidateExport(); save(); refreshProgress();
    });
    $("questions").querySelectorAll("textarea").forEach(input => {
      input.addEventListener("input", () => {
        activeTopic().answers[input.dataset.answer] = input.value;
        state.lastQuestion = input.dataset.answer;
        invalidateExport(); save();
        const indicator = $("questions").querySelector('[data-indicator="' + input.dataset.answer + '"]');
        indicator.textContent = input.value.trim() ? "Completada" : "Pendiente";
        indicator.className = "answer-indicator" + (input.value.trim() ? " answered" : "");
        refreshProgress();
      });
      input.addEventListener("focus", () => { state.lastQuestion = input.dataset.answer; save(); });
    });
    $("continue-module").innerHTML = index === course.modules.length - 1 ? 'Preparar mi entrega' + icon("send") : 'Siguiente módulo' + icon("arrow-right");
    refreshProgress(); icons();
  }
  function renderChecklist() {
    const summary = model.summary(state);
    const conditions = [
      { id: "videos", label: "Vi todos los videos.", checked: summary.allVideos, automatic: true },
      { id: "answers", label: "Contesté todas las preguntas del cuadernillo.", checked: summary.allAnswers, automatic: true },
      { id: "reviewed", label: "Revisé mis respuestas.", checked: state.delivery.reviewed },
      { id: "downloaded", label: "Descargué mi cuadernillo.", checked: state.delivery.downloaded },
      { id: "audio", label: "Grabé mi audio explicando los módulos con mis propias palabras.", checked: state.delivery.audio },
      { id: "ready", label: "Estoy listo para enviar mi cuadernillo y mi audio.", checked: state.delivery.ready }
    ];
    $("final-checklist").innerHTML = conditions.map(item => '<label><input type="checkbox" data-final="' + item.id + '"' + (item.checked ? " checked" : "") + (item.automatic ? " disabled" : "") + '><span>' + item.label + (item.id === "answers" && !summary.allAnswers ? '<small>Incluye el compromiso y la confirmación personal de cada módulo.</small>' : '') + '</span></label>').join("");
    $("final-checklist").querySelectorAll("input:not(:disabled)").forEach(input => input.addEventListener("change", () => {
      state.delivery[input.dataset.final] = input.checked;
      save(); refreshProgress();
    }));
    $("completion-banner").hidden = !summary.ready;
  }
  function route(scroll = true) {
    const parts = location.hash.slice(1).split("/");
    const view = ["modulos", "cuadernillo", "entrega"].includes(parts[0]) ? parts[0] : state.view;
    const module = course.modules.find(item => item.id === parts[1]);
    const changed = module && module.id !== state.activeId;
    if (changed) { state.activeId = module.id; state.lastQuestion = ""; }
    state.view = view;
    if (view === "cuadernillo") renderWorkbook();
    all(".view").forEach(section => section.hidden = section.id !== view);
    all("[data-view]").forEach(link => {
      if (link.dataset.view === view) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    save();
    if (scroll) {
      const target = parts[2] === "video" ? $("video-section") : parts[2] === "preguntas" ? $("answers-title") : $(view);
      target?.scrollIntoView({ block: "start" });
    }
  }
  function openModule(id, section = "") {
    const hash = "#cuadernillo/" + id + (section ? "/" + section : "");
    if (location.hash === hash) route();
    else location.hash = hash;
  }
  function changeModule(delta) {
    const index = course.modules.indexOf(activeModule());
    const module = course.modules[index + delta];
    if (module) openModule(module.id);
  }
  function fileName(suffix) {
    const name = state.profile.fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 80) || "participante";
    return "DPL1-2022-" + name + suffix;
  }
  function download(blob, name) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = name;
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  function exportSnapshot() {
    if (!state.profile.fullName.trim()) {
      location.hash = "#entrega";
      $("export-status").textContent = "Escribe tu nombre completo para incluirlo en tu cuadernillo.";
      setTimeout(() => $("fullName").focus(), 0);
      return null;
    }
    return structuredClone(state);
  }
  async function exportWorkbook(format, moduleOnly = false) {
    if (busy) return;
    const snapshot = exportSnapshot();
    if (!snapshot) return;
    busy = true;
    const trigger = $(moduleOnly ? "module-pdf" : format === "pdf" ? "download-pdf" : "prepare-png");
    trigger.disabled = true;
    $("export-status").textContent = "Preparando tu cuadernillo…";
    try {
      const files = await window.DPL_EXPORT.generate(course, snapshot, { format, modules: moduleOnly ? [activeModule()] : course.modules, onProgress: page => {
        $("export-status").textContent = "Preparando página " + page + "…";
      } });
      if (format === "pdf") {
        const name = fileName(moduleOnly ? "-modulo-" + activeModule().number + ".pdf" : ".pdf");
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        pdfUrl = URL.createObjectURL(files[0].blob);
        const link = $("pdf-download-link");
        link.href = pdfUrl; link.download = name; link.hidden = false;
        download(files[0].blob, name);
        if (!moduleOnly && state.updatedAt === snapshot.updatedAt) { state.delivery.downloaded = true; save(); refreshProgress(); }
        $("export-status").textContent = "PDF preparado. Si el navegador solicita permiso, confirma la descarga.";
      } else {
        if (state.updatedAt !== snapshot.updatedAt) throw new Error("Tus respuestas cambiaron durante la exportación. Prepara las imágenes nuevamente.");
        pngUrls.forEach(url => URL.revokeObjectURL(url));
        pngFiles = files.map((file, i) => new File([file.blob], fileName("-pagina-" + (i + 1) + ".png"), { type: "image/png" }));
        pngUrls = pngFiles.map(file => URL.createObjectURL(file));
        $("png-pages").innerHTML = pngFiles.map((file,i) => '<article class="png-page"><img src="' + pngUrls[i] + '" alt="Página ' + (i + 1) + ' de mi cuadernillo" loading="lazy"><a href="' + pngUrls[i] + '" download="' + escape(file.name) + '">' + icon("download") + 'Página ' + (i + 1) + '</a></article>').join("");
        $("png-pages").querySelectorAll("a").forEach(link => link.addEventListener("click", () => { state.delivery.downloaded = true; save(); refreshProgress(); }));
        $("png-count").textContent = pngFiles.length + " páginas listas";
        const sharing = navigator.canShare && navigator.canShare({ files: pngFiles });
        $("share-gallery").hidden = !sharing;
        $("gallery-help").textContent = sharing ? "Abre el menú de compartir y elige Guardar imagen, Fotos o Archivos si tu teléfono ofrece esa opción. La app no puede guardar directamente en tu galería." : "Este navegador no permite compartir imágenes directamente. Descarga cada página o el archivo ZIP. Después abre la imagen en tus descargas y utiliza Guardar imagen si tu teléfono lo permite.";
        $("png-results").hidden = false;
        $("export-status").textContent = "Imágenes PNG preparadas a 200 ppp. Descarga las páginas o compártelas desde tu teléfono.";
        icons();
      }
    } catch (error) {
      $("export-status").textContent = "No se pudo exportar: " + (error.message || "vuelve a intentarlo.");
    } finally { busy = false; trigger.disabled = false; }
  }
  $("resume").addEventListener("click", () => {
    openModule(state.activeId);
    requestAnimationFrame(() => {
      const field = state.lastQuestion && $("answer-" + state.lastQuestion);
      if (field) { field.scrollIntoView({ block: "center" }); field.focus({ preventScroll: true }); }
    });
  });
  $("module-select").addEventListener("change", event => openModule(event.target.value));
  $("previous-module").addEventListener("click", () => changeModule(-1));
  $("next-module").addEventListener("click", () => changeModule(1));
  $("continue-module").addEventListener("click", () => {
    if (activeModule() === course.modules.at(-1)) location.hash = "#entrega";
    else changeModule(1);
  });
  all("[data-profile]").forEach(input => input.addEventListener("input", () => {
    state.profile[input.dataset.profile] = input.value;
    invalidateExport(); save(); refreshProgress();
  }));
  $("module-pdf").addEventListener("click", () => exportWorkbook("pdf", true));
  $("download-pdf").addEventListener("click", () => exportWorkbook("pdf"));
  $("prepare-png").addEventListener("click", () => exportWorkbook("png"));
  $("share-gallery").addEventListener("click", async () => {
    if (!pngFiles.length || !navigator.canShare?.({ files: pngFiles })) return;
    try { await navigator.share({ files: pngFiles, title: course.title + " · 2022" }); }
    catch (error) { if (error.name !== "AbortError") $("export-status").textContent = "No se pudo compartir. Puedes descargar las imágenes."; }
  });
  $("download-zip").addEventListener("click", async () => {
    if (!pngFiles.length) return;
    const button = $("download-zip"); button.disabled = true;
    try {
      const zip = await window.DPL_EXPORT.zip(pngFiles);
      download(zip, fileName("-imagenes.zip"));
      state.delivery.downloaded = true; save(); refreshProgress();
    } catch { $("export-status").textContent = "No se pudo preparar el ZIP. Descarga las páginas por separado."; }
    finally { button.disabled = false; }
  });
  $("backup-download").addEventListener("click", () => {
    download(new Blob([JSON.stringify(state,null,2)], {type:"application/json"}), fileName("-respaldo.json"));
    $("backup-status").textContent = "Respaldo preparado.";
  });
  $("backup-import").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 20 * 1024 * 1024) throw new Error("El respaldo es demasiado grande.");
      pendingImport = model.normalize(JSON.parse(await file.text()));
      $("import-description").textContent = "Respaldo de " + (pendingImport.profile.fullName || "participante") + " · generación 2022.";
      $("import-dialog").showModal();
    } catch (error) { $("backup-status").textContent = error.message || "No se pudo leer el respaldo."; }
    event.target.value = "";
  });
  $("cancel-import").addEventListener("click", () => { pendingImport = null; $("import-dialog").close(); });
  $("confirm-import").addEventListener("click", () => {
    if (!pendingImport) return;
    state = pendingImport; pendingImport = null; storageWarning = "";
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    pdfUrl = ""; $("pdf-download-link").hidden = true;
    pngUrls.forEach(url => URL.revokeObjectURL(url)); pngUrls=[]; pngFiles=[]; $("png-results").hidden=true;
    all("[data-profile]").forEach(input => input.value = state.profile[input.dataset.profile]);
    renderModules(); renderWorkbook(); save();
    history.replaceState(null,"","#" + state.view + (state.view === "cuadernillo" ? "/" + state.activeId : ""));
    route(); $("import-dialog").close(); $("backup-status").textContent = "Respaldo importado.";
  });
  window.addEventListener("hashchange", () => route());
  window.addEventListener("storage", event => {
    if (event.key === course.storageKey) {
      storageWarning = "Hay cambios en otra pestaña. Descarga un respaldo y recarga antes de continuar.";
      save();
    }
  });
  load();
  all("[data-profile]").forEach(input => input.value = state.profile[input.dataset.profile]);
  $("contact-link").href = course.contactUrl;
  // The static mirror and the portal share this bundle, but have different parent routes.
  $("portal-link").href = location.protocol === "file:" ? "../../portal.html" : document.body.dataset.portalUrl || "../../portal.html";
  $("summary-count").textContent = course.modules.length + " módulos · " + course.modules.reduce((total,module)=>total+module.videos.length,0) + " videos";
  renderModules(); renderWorkbook(); route(false);
  icons();
})();
