(function () {
  "use strict";
  const course = window.DPL_COURSE;
  const fields = ["fullName", "group", "zone", "email", "phone", "recognitionName"];
  const text = value => typeof value === "string" ? value : "";
  function initial() {
    return { version: 2, courseId: course.id, profile: Object.fromEntries(fields.map(key => [key, ""])),
      topics: {}, activeId: course.modules[0].id, lastQuestion: "", view: "modulos",
      delivery: { reviewed: false, downloaded: false, audio: false, ready: false }, updatedAt: "" };
  }
  function normalize(raw, legacy = false) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Respaldo inválido.");
    if (!legacy && (raw.courseId !== course.id || raw.version !== 2)) throw new Error("Este respaldo no corresponde al Diplomado I de 2022.");
    const state = initial();
    for (const key of fields) state.profile[key] = text(raw.profile?.[key]);
    for (const module of course.modules) {
      const saved = raw.topics?.[module.id] || {};
      const answers = Object.fromEntries(Object.entries(saved.answers || {}).filter(([, value]) => typeof value === "string"));
      state.topics[module.id] = {
        answers,
        watched: Object.fromEntries(module.videos.map(video => [video.id,
          legacy ? saved.reviewed === true : saved.watched?.[video.id] === true])),
        status: text(saved.status), completedAt: text(saved.completedAt), sentAt: text(saved.sentAt)
      };
    }
    if (course.modules.some(module => module.id === raw.activeId)) state.activeId = raw.activeId;
    state.lastQuestion = text(raw.lastQuestion);
    if (["modulos", "cuadernillo", "entrega"].includes(raw.view)) state.view = raw.view;
    for (const key of Object.keys(state.delivery)) state.delivery[key] = raw.delivery?.[key] === true;
    state.updatedAt = text(raw.updatedAt);
    return state;
  }
  function topic(state, id) {
    return state.topics[id] || { answers: {}, watched: {} };
  }
  function questions(module) {
    return [...module.exercises, { id: "commitment", label: "Compromiso de 7 días", help: "Escribe una acción pequeña que puedas cumplir y revisar." }];
  }
  function counts(state, module) {
    const item = topic(state, module.id);
    const answered = questions(module).filter(question => Boolean(item.answers[question.id]?.trim())).length;
    const watched = module.videos.filter(video => item.watched[video.id] === true).length;
    const authentic = item.answers.authenticity === "Confirmado" ? 1 : 0;
    const total = questions(module).length + module.videos.length + 1;
    const done = answered + watched + authentic;
    return { answered, watched, total, done, percent: done === total ? 100 : Math.min(99, Math.round(done / total * 100)),
      complete: done === total, status: done === total ? "Completado" : done ? "En proceso" : "Pendiente" };
  }
  function summary(state) {
    const entries = course.modules.map(module => counts(state, module));
    const done = entries.reduce((sum, item) => sum + item.done, 0);
    const total = entries.reduce((sum, item) => sum + item.total, 0);
    const allVideos = course.modules.every(module => counts(state, module).watched === module.videos.length);
    const allAnswers = course.modules.every(module => counts(state, module).answered === questions(module).length && topic(state,module.id).answers.authenticity === "Confirmado");
    return { percent: done === total ? 100 : Math.min(99, Math.round(done / total * 100)),
      completed: entries.filter(item => item.complete).length, allVideos, allAnswers,
      ready: allVideos && allAnswers && Boolean(state.profile.fullName.trim()) && Object.values(state.delivery).every(Boolean) };
  }
  window.DPL_MODEL = { initial, normalize, topic, questions, counts, summary };
})();
