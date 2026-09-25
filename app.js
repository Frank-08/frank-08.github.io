/* Privileged User Training - course engine (SCORM 1.2) */
(function () {
  "use strict";

  /* ---------------- SCORM 1.2 wrapper ---------------- */
  var API = null, lmsOk = false;
  function findAPI(win) {
    var tries = 0;
    while (win && !win.API && win.parent && win.parent !== win && tries < 10) { win = win.parent; tries++; }
    return win ? win.API || null : null;
  }
  function getAPI() {
    var a = findAPI(window);
    if (!a && window.opener) a = findAPI(window.opener);
    return a;
  }
  var scorm = {
    init: function () {
      API = getAPI();
      if (API) { lmsOk = String(API.LMSInitialize("")) === "true"; }
      return lmsOk;
    },
    get: function (k) { return lmsOk ? String(API.LMSGetValue(k)) : ""; },
    set: function (k, v) { if (lmsOk) API.LMSSetValue(k, String(v)); },
    commit: function () { if (lmsOk) API.LMSCommit(""); },
    finish: function () { if (lmsOk) { API.LMSFinish(""); lmsOk = false; } }
  };

  /* ---------------- State ---------------- */
  var state = { done: {}, screen: 0, best: null, passed: false, attested: false, attempts: 0 };
  var startTime = new Date();

  function save() {
    var data = JSON.stringify(state);
    if (lmsOk) {
      scorm.set("cmi.suspend_data", data.substring(0, 4000));
      scorm.set("cmi.core.lesson_location", String(state.screen));
      scorm.commit();
    } else {
      try { localStorage.setItem("put_bayside_state", data); } catch (e) {}
    }
  }
  function load() {
    var raw = lmsOk ? scorm.get("cmi.suspend_data") : (function () { try { return localStorage.getItem("put_bayside_state"); } catch (e) { return ""; } })();
    if (raw) { try { var s = JSON.parse(raw); for (var k in s) state[k] = s[k]; } catch (e) {} }
  }
  function sessionTime() {
    var secs = Math.round((new Date() - startTime) / 1000);
    var h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
    function p(n, l) { n = String(n); while (n.length < l) n = "0" + n; return n; }
    return p(h, 4) + ":" + p(m, 2) + ":" + p(s, 2);
  }

  /* ---------------- Screens ---------------- */
  var SCREENS = [{ type: "welcome", title: "Welcome" }, { type: "primer", title: "What is privileged access?" }];
  MODULES.forEach(function (m, i) { SCREENS.push({ type: "module", title: m.title, mod: m, num: i + 1 }); });
  SCREENS.push({ type: "exam", title: "Final exam" });
  SCREENS.push({ type: "attest", title: "Attestation" });
  SCREENS.push({ type: "finish", title: "Course complete" });

  function modulesDone() { return MODULES.every(function (m) { return state.done[m.id]; }); }
  function introDone() { return state.done.welcome && state.done.primer; }
  function isUnlocked(i) {
    var s = SCREENS[i];
    if (i === 0) return true;
    if (s.type === "primer") return !!state.done.welcome;
    if (s.type === "module") {
      var prev = SCREENS[i - 1];
      return prev.type === "primer" ? introDone() : !!state.done[prev.mod.id];
    }
    if (s.type === "exam") return modulesDone();
    if (s.type === "attest") return state.passed;
    if (s.type === "finish") return state.passed && state.attested;
    return false;
  }
  function isComplete(i) {
    var s = SCREENS[i];
    if (s.type === "welcome") return !!state.done.welcome;
    if (s.type === "primer") return !!state.done.primer;
    if (s.type === "module") return !!state.done[s.mod.id];
    if (s.type === "exam") return state.passed;
    if (s.type === "attest") return state.attested;
    if (s.type === "finish") return state.passed && state.attested;
  }

  var $ = function (id) { return document.getElementById(id); };
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function renderNav() {
    var html = "";
    SCREENS.forEach(function (s, i) {
      var cls = ["nav-item"]; if (i === state.screen) cls.push("active");
      var un = isUnlocked(i); if (!un) cls.push("locked"); if (isComplete(i)) cls.push("complete");
      var label = s.type === "module" ? "<span class='nav-num'>" + s.num + "</span>" + esc(s.title) : esc(s.title);
      html += "<button class='" + cls.join(" ") + "' data-i='" + i + "'" + (un ? "" : " disabled aria-disabled='true'") + ">" +
        "<span class='nav-status' aria-hidden='true'></span><span class='nav-label'>" + label + "</span></button>";
    });
    $("nav").innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll(".nav-item"), function (b) {
      b.onclick = function () { go(parseInt(b.getAttribute("data-i"), 10)); closeMenu(); };
    });
    var total = MODULES.length + 4, n = 0;
    if (state.done.welcome) n++; if (state.done.primer) n++;
    MODULES.forEach(function (m) { if (state.done[m.id]) n++; });
    if (state.passed) n++; if (state.attested) n++;
    var pct = Math.round(n / total * 100);
    $("progress-fill").style.width = pct + "%";
    $("progress-text").textContent = pct + "% complete";
  }

  function footer(i, canNext, nextLabel) {
    var h = "<div class='footer-nav'>";
    h += i > 0 ? "<button class='btn btn-secondary' id='btn-back'>&larr; Back</button>" : "<span></span>";
    if (i < SCREENS.length - 1) h += "<button class='btn btn-primary' id='btn-next'" + (canNext ? "" : " disabled") + ">" + (nextLabel || "Next") + " &rarr;</button>";
    return h + "</div>";
  }
  function wireFooter(i) {
    var b = $("btn-back"), n = $("btn-next");
    if (b) b.onclick = function () { go(i - 1); };
    if (n) n.onclick = function () { if (isUnlocked(i + 1)) go(i + 1); };
  }
  function refreshNext(i) { var n = $("btn-next"); if (n) n.disabled = !isUnlocked(i + 1); }

  function go(i) {
    if (i < 0 || i >= SCREENS.length || !isUnlocked(i)) return;
    state.screen = i; save();
    var s = SCREENS[i], main = $("content");
    ({ welcome: rWelcome, primer: rPrimer, module: rModule, exam: rExam, attest: rAttest, finish: rFinish })[s.type](s, i, main);
    renderNav();
    try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); }
    main.scrollTop = 0; window.scrollTo(0, 0);
  }

  /* ---------------- Welcome ---------------- */
  function rWelcome(s, i, el) {
    state.done.welcome = true; save();
    el.innerHTML =
      "<div class='hero'><p class='eyebrow'>" + esc(COURSE.org) + "</p><h1>" + esc(COURSE.title) + "</h1>" +
      "<p class='lead'>As a privileged user, you hold a unique position of trust. Your elevated access to systems and data makes you a primary guardian of Council's security - and a crucial line of defence against cyber threats.</p></div>" +
      "<div class='card'><h2>Who this course is for</h2><p>Anyone at Bayside City Council who holds privileged access - not only IT staff. That includes people who approve payments, administer payroll or HR data, own or administer business systems, or hold delegated access for executives.</p></div>" +
      "<div class='grid2'>" +
      "<div class='card'><h2>What you'll cover</h2><ul class='ticks'><li>How attackers target systems and people</li><li>Managing cyber security risk</li><li>Building a positive security culture</li><li>Practical ways to reduce incidents</li></ul></div>" +
      "<div class='card'><h2>How it works</h2><ol class='steps'><li>A short primer on privileged access</li><li>" + MODULES.length + " modules, each with a video, key points and <strong>one knowledge-check question</strong></li><li>A <strong>" + EXAM.length + "-question final exam</strong> - pass mark " + COURSE.passMark + "%, unlimited retakes</li><li>An attestation of your responsibilities</li></ol></div>" +
      "</div>" +
      "<p class='note'>Your progress is saved automatically, so you can leave and return at any time. The content aligns with the Australian Government Information Security Manual (ISM) principles for privileged user awareness and is based on the Australian Cyber Security Centre's Privileged User Training video series.</p>" +
      footer(i, true, "Start");
    wireFooter(i);
  }

  /* ---------------- Non-IT primer ---------------- */
  function rPrimer(s, i, el) {
    state.done.primer = true; save();
    var roles = [
      ["Finance and payments", "Approving or releasing payments, uploading bank files, changing supplier bank details, or administering the finance system."],
      ["HR and payroll", "Administering payroll, changing pay or bank details, or accessing staff personal, medical or performance information."],
      ["Business system administrators", "Owning or administering a Council business system - for example managing users, permissions, configuration or bulk data."],
      ["Executives and delegates", "Senior leaders, and executive assistants with delegated access to mailboxes, calendars or approvals on a leader's behalf."],
      ["IT staff", "Administrators of servers, networks, cloud services, security tools, databases and identity systems."]
    ];
    var r = roles.map(function (x) { return "<div class='role'><h3>" + x[0] + "</h3><p>" + x[1] + "</p></div>"; }).join("");
    el.innerHTML =
      "<p class='eyebrow'>Before you begin</p><h1>What is privileged access?</h1>" +
      "<p class='lead'>Privileged access is any access above that of a standard user - the ability to make significant changes, approve transactions, or see sensitive information. You don't need to work in IT to be a privileged user.</p>" +
      "<h2>Privileged users at Bayside include</h2><div class='roles'>" + r + "</div>" +
      "<div class='card accent'><h2>Why you are a target</h2><p>Attackers go after the people who hold the keys. A compromised finance, payroll or delegated executive account can be just as valuable to an attacker as an IT administrator account - it can be used to redirect payments, steal personal information or impersonate leaders.</p></div>" +
      "<div class='card'><h2>Golden rules for every privileged user</h2><ul class='ticks'>" +
      "<li>Use your privileged access only for the task that needs it.</li>" +
      "<li>Never share your login or use shared accounts.</li>" +
      "<li>Use multi-factor authentication wherever it's available.</li>" +
      "<li>Treat urgent or unusual requests - especially to change bank details or release payments - with suspicion. Verify using contact details you already hold.</li>" +
      "<li>Ask for access you no longer need to be removed.</li>" +
      "<li>Report anything suspicious to the IT Service Desk.</li></ul></div>" +
      "<p class='note'>The modules that follow were produced for a broad audience, including technical administrators. Some content is technical - focus on the principles and the 'What this means for you' notes at the end of each module.</p>" +
      footer(i, true);
    wireFooter(i);
  }

  /* ---------------- Module ---------------- */
  function rModule(s, i, el) {
    var m = s.mod;
    var video = m.video
      ? "<div class='video'><iframe src='" + esc(m.video) + "' title='" + esc(m.title) + " video' allowfullscreen allow='autoplay; fullscreen; encrypted-media; picture-in-picture'></iframe></div>"
      : "<div class='video placeholder' role='img' aria-label='Video placeholder'><div><span class='play' aria-hidden='true'>&#9654;</span><strong>Video to be added</strong><br><span class='small'>Source file: " + esc(m.videoFile) + "</span></div></div>";
    var pts = m.points.map(function (p) { return "<div class='point'><h3>" + p[0] + "</h3><p>" + p[1] + "</p></div>"; }).join("");
    var c = m.check, order = shuffle(c.options.map(function (_, k) { return k; }));
    var opts = order.map(function (k) {
      return "<label class='opt'><input type='radio' name='kc' value='" + k + "'><span>" + esc(c.options[k]) + "</span></label>";
    }).join("");
    var done = !!state.done[m.id];
    el.innerHTML =
      "<p class='eyebrow'>Module " + s.num + " of " + MODULES.length + "</p><h1>" + esc(m.title) + "</h1>" +
      "<p class='lead'>" + m.intro + "</p>" + video +
      "<h2>Key points</h2><div class='points'>" + pts + "</div>" +
      "<div class='card accent'><h2>What this means for you</h2><p>" + m.forYou + "</p></div>" +
      "<section class='check' aria-labelledby='kc-h'><p class='eyebrow'>Knowledge check</p><h2 id='kc-h'>" + esc(c.q) + "</h2>" +
      "<fieldset><legend class='sr'>Choose one answer</legend>" + opts + "</fieldset>" +
      "<button class='btn btn-primary' id='kc-submit'>Check answer</button><div id='kc-fb' class='feedback' aria-live='polite'></div></section>" +
      footer(i, isUnlocked(i + 1), i + 1 < SCREENS.length && SCREENS[i + 1].type === "exam" ? "Go to exam" : "Next module");
    wireFooter(i);
    if (done) { $("kc-fb").className = "feedback ok"; $("kc-fb").innerHTML = "<strong>Completed.</strong> " + esc(c.feedback); }
    $("kc-submit").onclick = function () {
      var sel = el.querySelector("input[name='kc']:checked"), fb = $("kc-fb");
      if (!sel) { fb.className = "feedback warn"; fb.textContent = "Please select an answer."; return; }
      if (parseInt(sel.value, 10) === c.answer) {
        fb.className = "feedback ok"; fb.innerHTML = "<strong>Correct.</strong> " + esc(c.feedback);
        state.done[m.id] = true; save(); renderNav(); refreshNext(i);
      } else {
        fb.className = "feedback bad"; fb.innerHTML = "<strong>Not quite.</strong> Review the key points above and try again.";
      }
    };
  }

  /* ---------------- Exam ---------------- */
  function rExam(s, i, el) {
    var intro =
      "<p class='eyebrow'>Assessment</p><h1>Final exam</h1>" +
      "<p class='lead'>" + EXAM.length + " questions covering all modules. You need " + COURSE.passMark + "% (" + Math.ceil(EXAM.length * COURSE.passMark / 100) + " of " + EXAM.length + ") to pass. Questions and answers are shuffled each attempt, and you can retake the exam as many times as you need.</p>" +
      (state.best !== null ? "<p class='note'>Your best score so far: <strong>" + state.best + "%</strong>" + (state.passed ? " - passed." : ".") + "</p>" : "") +
      "<button class='btn btn-primary' id='exam-start'>" + (state.attempts ? "Retake exam" : "Start exam") + "</button>" +
      footer(i, isUnlocked(i + 1), "Continue");
    el.innerHTML = intro; wireFooter(i);
    $("exam-start").onclick = function () { runExam(i, el); };
  }
  function runExam(i, el) {
    var qs = shuffle(EXAM.map(function (q, k) { return k; }));
    var html = "<p class='eyebrow'>Final exam</p><h1>Answer all " + EXAM.length + " questions</h1><form id='exam'>";
    qs.forEach(function (k, n) {
      var q = EXAM[k], order = shuffle(q.options.map(function (_, j) { return j; }));
      html += "<fieldset class='q' id='q" + n + "'><legend><span class='qn'>" + (n + 1) + "</span>" + esc(q.q) + "</legend>" +
        order.map(function (j) { return "<label class='opt'><input type='radio' name='q" + n + "' value='" + j + "'><span>" + esc(q.options[j]) + "</span></label>"; }).join("") + "</fieldset>";
    });
    html += "<div id='exam-msg' class='feedback' aria-live='polite'></div><button type='submit' class='btn btn-primary'>Submit exam</button></form>";
    el.innerHTML = html; window.scrollTo(0, 0);
    $("exam").onsubmit = function (e) {
      e.preventDefault();
      var correct = 0, missed = [], unanswered = 0;
      qs.forEach(function (k, n) {
        var sel = el.querySelector("input[name='q" + n + "']:checked");
        if (!sel) { unanswered++; return; }
        if (parseInt(sel.value, 10) === EXAM[k].answer) correct++; else missed.push(EXAM[k].topic);
      });
      if (unanswered) { var m = $("exam-msg"); m.className = "feedback warn"; m.textContent = "Please answer all questions (" + unanswered + " unanswered)."; return; }
      var pct = Math.round(correct / EXAM.length * 100), pass = pct >= COURSE.passMark;
      state.attempts++;
      if (state.best === null || pct > state.best) state.best = pct;
      if (pass) state.passed = true;
      scorm.set("cmi.core.score.min", 0); scorm.set("cmi.core.score.max", 100);
      scorm.set("cmi.core.score.raw", state.best);
      if (!state.attested) scorm.set("cmi.core.lesson_status", "incomplete");
      save(); renderNav();
      var uniq = missed.filter(function (t, x) { return missed.indexOf(t) === x; });
      el.innerHTML =
        "<p class='eyebrow'>Exam result</p><h1>" + (pass ? "Well done - you passed" : "Not yet - please try again") + "</h1>" +
        "<div class='score " + (pass ? "pass" : "fail") + "'><span>" + pct + "%</span><small>" + correct + " of " + EXAM.length + " correct</small></div>" +
        (pass ? "<p class='lead'>Continue to the attestation to complete the course.</p>" :
          "<p class='lead'>You need " + COURSE.passMark + "% to pass. You can review the modules and retake the exam as many times as you need.</p>") +
        (uniq.length ? "<div class='card'><h2>Topics to review</h2><ul>" + uniq.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" : "") +
        "<div class='footer-nav'>" + (pass ? "<span></span><button class='btn btn-primary' id='to-attest'>Continue to attestation &rarr;</button>" :
          "<button class='btn btn-secondary' id='review'>Review modules</button><button class='btn btn-primary' id='retake'>Retake exam</button>") + "</div>";
      if (pass) $("to-attest").onclick = function () { go(i + 1); };
      else { $("retake").onclick = function () { runExam(i, el); }; $("review").onclick = function () { go(2); }; }
    };
  }

  /* ---------------- Attestation ---------------- */
  function rAttest(s, i, el) {
    var name = scorm.get("cmi.core.student_name");
    var items = ATTESTATION.map(function (t, k) {
      return "<label class='opt attest'><input type='checkbox' class='att' id='a" + k + "'" + (state.attested ? " checked disabled" : "") + "><span>" + esc(t) + "</span></label>";
    }).join("");
    el.innerHTML =
      "<p class='eyebrow'>Final step</p><h1>Privileged user attestation</h1>" +
      "<p class='lead'>Please read and confirm each statement to complete the course." + (name ? " Signing as <strong>" + esc(name) + "</strong>." : "") + "</p>" +
      "<fieldset class='q'><legend class='sr'>Attestation statements</legend>" + items + "</fieldset>" +
      (state.attested ? "<div class='feedback ok'><strong>Attestation recorded.</strong></div>" : "<button class='btn btn-primary' id='att-submit' disabled>I agree - complete the course</button>") +
      footer(i, isUnlocked(i + 1), "Finish");
    wireFooter(i);
    if (state.attested) return;
    var boxes = el.querySelectorAll(".att"), btn = $("att-submit");
    Array.prototype.forEach.call(boxes, function (b) {
      b.onchange = function () { btn.disabled = !Array.prototype.every.call(boxes, function (x) { return x.checked; }); };
    });
    btn.onclick = function () {
      state.attested = true;
      scorm.set("cmi.core.score.raw", state.best);
      scorm.set("cmi.core.lesson_status", "passed");
      save(); go(i + 1);
    };
  }

  /* ---------------- Finish ---------------- */
  function rFinish(s, i, el) {
    var c = COURSE.contacts.map(function (p) {
      return "<div class='contact'><h3>" + esc(p.name) + "</h3><p>" + esc(p.role) + "</p><a href='mailto:" + esc(p.email) + "'>" + esc(p.email) + "</a></div>";
    }).join("");
    el.innerHTML =
      "<div class='hero done'><p class='eyebrow'>Course complete</p><h1>Thank you</h1>" +
      "<p class='lead'>You have completed " + esc(COURSE.title) + " with a score of " + state.best + "%. Your completion has been recorded.</p></div>" +
      "<h2>Who to contact</h2><p>Report suspected security incidents, suspicious emails or unusual requests to the IT Service Desk first. For questions about privileged access or this course, contact:</p>" +
      "<div class='contacts'>" + c + "</div>" +
      "<div class='card accent'><h2>Remember</h2><p>If something doesn't look right, report it - don't investigate on your own, and don't alert the person or the attacker. Stay calm and follow the guidance you're given.</p></div>" +
      "<p class='note'>You can now close this window.</p>" + footer(i, false);
    wireFooter(i);
  }

  /* ---------------- Menu (mobile) ---------------- */
  function closeMenu() { document.body.classList.remove("menu-open"); $("menu-btn").setAttribute("aria-expanded", "false"); }

  /* ---------------- Boot ---------------- */
  window.addEventListener("load", function () {
    scorm.init();
    if (lmsOk) {
      var st = scorm.get("cmi.core.lesson_status");
      if (st === "not attempted" || st === "") scorm.set("cmi.core.lesson_status", "incomplete");
    }
    load();
    $("menu-btn").onclick = function () {
      var open = document.body.classList.toggle("menu-open");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    };
    var loc = parseInt(lmsOk ? scorm.get("cmi.core.lesson_location") : state.screen, 10);
    if (isNaN(loc) || !isUnlocked(loc)) loc = 0;
    go(loc);
  });
  function unload() {
    if (!lmsOk) return;
    scorm.set("cmi.core.session_time", sessionTime());
    scorm.set("cmi.core.exit", state.passed && state.attested ? "" : "suspend");
    save(); scorm.finish();
  }
  window.addEventListener("beforeunload", unload);
  window.addEventListener("unload", unload);
})();
