(function () {
  "use strict";
  const WIDTH = 1654;
  const HEIGHT = 2339;
  const MARGIN = 126;
  const TOP = 245;
  const BOTTOM = HEIGHT - 160;
  const scripts = new Map();
  const base = new URL(".", document.currentScript.src);
  function loadScript(path) {
    if (!scripts.has(path)) scripts.set(path, new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(path, base).href;
      script.onload = resolve;
      script.onerror = () => { scripts.delete(path); script.remove(); reject(new Error("No se pudo cargar el exportador.")); };
      document.head.append(script);
    }));
    return scripts.get(path);
  }
  function wrap(context, text, width) {
    const lines = [];
    for (const paragraph of String(text).replace(/\r\n?/g, "\n").split("\n")) {
      let line = "";
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        const candidate = line ? line + " " + word : word;
        if (context.measureText(candidate).width <= width) { line = candidate; continue; }
        if (line) { lines.push(line); line = ""; }
        // Split long URLs or words by code point so no content escapes the page.
        for (const character of word) {
          if (line && context.measureText(line + character).width > width) { lines.push(line); line = ""; }
          line += character;
        }
      }
      lines.push(line);
    }
    return lines;
  }
  function layout(course, state, modules, context) {
    const pages = [];
    let page;
    let y;
    const newPage = () => { page = []; pages.push(page); y = TOP; };
    newPage();
    function write(text, options = {}) {
      const size = options.size || 31;
      const lineHeight = Math.ceil(size * 1.45);
      context.font = (options.bold ? "700 " : "400 ") + size + "px Arial";
      const lines = wrap(context, text, WIDTH - MARGIN * 2);
      if (options.keep && y + Math.min(lines.length * lineHeight + options.keep, BOTTOM - TOP) > BOTTOM) newPage();
      for (const line of lines) {
        if (y + lineHeight > BOTTOM) newPage();
        page.push({ text: line, x: MARGIN, y, size, bold: Boolean(options.bold), color: options.color || "#202a32" });
        y += lineHeight;
      }
      y += options.gap ?? 16;
    }
    write("Nombre: " + state.profile.fullName, { bold: true });
    if (state.profile.group) write("Grupo o centro: " + state.profile.group);
    if (state.profile.zone) write("Zona: " + state.profile.zone);
    if (state.profile.recognitionName) write("Nombre para reconocimiento: " + state.profile.recognitionName);
    write("Fecha: " + new Intl.DateTimeFormat("es-MX", { timeZone: "America/Merida", year: "numeric", month: "long", day: "numeric" }).format(new Date()), { gap: 30 });
    modules.forEach((module, index) => {
      if (index > 0) newPage();
      write("MÓDULO " + module.number + " · " + module.title, { bold: true, size: 38, color: "#042f66", keep: 100, gap: 24 });
      const answers = state.topics[module.id]?.answers || {};
      const optional = answers.previousCommitment?.trim() ? [{ id: "previousCommitment", label: "¿Cómo te fue con el compromiso del módulo anterior?" }] : [];
      for (const question of [...optional, ...window.DPL_MODEL.questions(module)]) {
        write(question.label, { bold: true, color: "#042f66", keep: 65, gap: 8 });
        write(answers[question.id]?.trim() ? answers[question.id] : "Sin respuesta", { gap: 28 });
      }
      write("Reflexión personal: " + (answers.authenticity === "Confirmado" ? "Confirmada por el participante." : "Sin confirmar."), { size: 26, color: "#52616b" });
    });
    return pages;
  }
  async function logoImage() {
    await loadScript("export-logo.js");
    const image = new Image();
    image.src = window.DPL_EXPORT_LOGO;
    await image.decode();
    return image;
  }
  function renderPage(canvas, page, number, count, logo, course) {
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    const size = 116;
    const ratio = Math.min(size / logo.naturalWidth, size / logo.naturalHeight);
    const w = logo.naturalWidth * ratio, h = logo.naturalHeight * ratio;
    context.drawImage(logo, MARGIN + (size-w)/2, 70+(size-h)/2, w, h);
    context.fillStyle = "#042f66";
    context.font = "700 32px Arial";
    context.fillText(course.title, MARGIN + 148, 103);
    context.font = "400 27px Arial";
    context.fillText("Generación " + course.generation + " · Fraternidad Guerreros de la Luz", MARGIN + 148, 151);
    context.fillStyle = "#f2ad00";
    context.fillRect(MARGIN, 203, WIDTH - MARGIN * 2, 4);
    context.textBaseline = "top";
    for (const operation of page) {
      context.font = (operation.bold ? "700 " : "400 ") + operation.size + "px Arial";
      context.fillStyle = operation.color;
      context.fillText(operation.text, operation.x, operation.y);
    }
    context.fillStyle = "#52616b";
    context.font = "400 24px Arial";
    context.fillText("DPL1 · 2022 · Cuadernillo del participante", MARGIN, HEIGHT - 95);
    context.textAlign = "right";
    context.fillText("Página " + number + " de " + count, WIDTH - MARGIN, HEIGHT - 95);
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
  }
  async function generate(course, state, { format, modules = course.modules, onProgress = () => {} }) {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH; canvas.height = HEIGHT;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Este navegador no permite generar imágenes.");
    const [logo] = await Promise.all([logoImage(), format === "pdf" ? loadScript("vendor/jspdf.umd.min.js") : Promise.resolve()]);
    const pages = layout(course, state, modules, context);
    const files = [];
    const pdf = format === "pdf" ? new window.jspdf.jsPDF({ unit: "mm", format: "a4", compress: true }) : null;
    pdf?.setProperties({ title: course.title + " · Generación " + course.generation, author: state.profile.fullName, subject: "Cuadernillo digital FGDLL" });
    for (let i = 0; i < pages.length; i++) {
      onProgress(i + 1);
      renderPage(canvas, pages[i], i + 1, pages.length, logo, course);
      if (pdf) {
        if (i) pdf.addPage();
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, 210, 297, undefined, "FAST");
      } else {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("No se pudo generar la imagen de una página.");
        files.push({ blob, page: i + 1 });
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    canvas.width = 1; canvas.height = 1;
    if (pdf) files.push({ blob: pdf.output("blob") });
    return files;
  }
  async function zip(files) {
    await loadScript("vendor/fflate.js");
    const entries = Object.fromEntries(await Promise.all(files.map(async file => [file.name, new Uint8Array(await file.arrayBuffer())])));
    const bytes = window.fflate.zipSync(entries, { level: 0 });
    return new Blob([bytes], { type: "application/zip" });
  }
  window.DPL_EXPORT = { generate, zip, layout, wrap, width: WIDTH, height: HEIGHT };
})();
