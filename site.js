/* Aibiike Nurlanova portfolio: theme toggle, draft bar, and the clickable skills page. */
(function () {
  "use strict";
  var root = document.documentElement;

  // ---------- Theme toggle ----------
  var btn = document.getElementById("theme-btn");
  var moon = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paint() {
    if (!btn) return;
    var d = isDark();
    btn.querySelector("svg").innerHTML = d ? sun : moon;
    btn.setAttribute("aria-label", d ? "Switch to light mode" : "Switch to dark mode");
  }
  if (btn) btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
  paint();

  // Placeholder links do nothing until filled in.
  document.querySelectorAll("[data-placeholder]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // ---------- Skills page ----------
  // Every skill points only to real work from my resume and projects.
  var EVIDENCE = {
    "adm-data":   { where: "Minerva University Admissions Office · Software Engineering Intern", href: "experience.html#minerva-swe", what: "Mined 30,000+ admissions records with Python (Pandas) and SQL to surface patterns that shaped proposed changes to the entrance assessment." },
    "adm-sql":    { where: "Minerva University Admissions Office · Software Engineering Intern", href: "experience.html#minerva-swe", what: "Refactored SQL data models across 30+ tables, standardizing schemas and making downstream queries more reliable." },
    "adm-web":    { where: "Minerva University Admissions Office · Software Engineering Intern", href: "experience.html#minerva-swe", what: "Shipped React front-end components and Node.js back-end features in short release cycles, working with admissions staff to prioritize what launched." },
    "ai-team":    { where: "Minerva Admissions AI Research Team · AI Research & Software Development Intern", href: "experience.html#minerva-ai", what: "Build AI-powered web and native apps for recruitment and admissions, prototyping with Claude Code, Gemini CLI and GitHub and building reusable AI coding workflows." },
    "alexis-build": { where: "Alexis Dance Studio website", href: "projects.html#alexis", what: "Built a 6-page site end to end: React/Vite front end and a Node.js/Express back end." },
    "alexis-pm":  { where: "Alexis Dance Studio website", href: "projects.html#alexis", what: "Scoped the roadmap directly with the studio owner, and chose to defer back-end integration so customer-facing pages shipped first." },
    "alexis-client": { where: "Alexis Dance Studio website", href: "projects.html#alexis", what: "Worked directly with a real client (the studio owner) and kept iterating on their feedback after launch; 100+ visits since launch." },
    "planner-build": { where: "Application Planner", href: "projects.html#planner", what: "No-framework HTML/CSS/JavaScript site. All content lives in one data.json; a scheduler counts back from the deadline and skips busy days." },
    "planner-ship": { where: "Application Planner", href: "projects.html#planner", what: "Deployed with GitHub Actions to GitHub Pages; shipped in small commits as features were added." },
    "planner-pm": { where: "Application Planner", href: "projects.html#planner", what: "Designed for applicants at schools without counselors; the planner only states what official sources say, and sends everything else to admissions." },
    "planner-privacy": { where: "Application Planner", href: "projects.html#planner", what: "Privacy by design: everything runs in the browser, nothing is saved or sent, and there is no tracking." },
    "planner-ai": { where: "Application Planner", href: "projects.html#planner", what: "Built by directing an AI coding agent: I set the requirements and checked the results, and the agent wrote the code." },
    "dcm":        { where: "Dance Competition Manager", href: "projects.html#dcm", what: "Object-oriented C++ app on Linux covering registration, heat assignments, multi-round scoring and finalist selection, with persistent file storage." },
    "dcm-algo":   { where: "Dance Competition Manager", href: "projects.html#dcm", what: "Designed ranking algorithms that compute placements across rounds and judging panels." },
    "dancesport": { where: "SF DanceSport Hub", href: "projects.html#dancesport", what: "Static site on GitHub Pages bringing Bay Area competitions, results, camps and resources into one place." },
    "vyra-agents": { where: "Vyra AI (YC F26) · GTM & Growth Marketer", href: "experience.html#vyra", what: "Built AI agents and automated workflows for account research, outreach and pipeline generation, owning outbound end to end." },
    "vyra-reqs":  { where: "Vyra AI (YC F26) · GTM & Growth Marketer", href: "experience.html#vyra", what: "Turned customer demo feedback and outreach data into product requirements that informed the team's product decisions." },
    "bakai-ops":  { where: "Bakai Bank · Business Analyst Intern", href: "experience.html#bakai", what: "Streamlined onboarding, loan-processing and account workflows for 1,000+ clients using SQL and Excel." },
    "bakai-case": { where: "Bakai Bank · Business Analyst Intern", href: "experience.html#bakai", what: "Proposed an AI-driven document-processing workflow and presented the business case to operations leadership." },
    "mc-strategy": { where: "Monte Carlo Hospitality Group · Strategy Consulting Intern", href: "experience.html#montecarlo", what: "Designed the strategy to grow from 2 to 8 branches across the US East Coast." },
    "mc-model":   { where: "Monte Carlo Hospitality Group · Strategy Consulting Intern", href: "experience.html#montecarlo", what: "Built an AI-powered model that scored candidate sites on population density, income, foot traffic, competitor density, rent, labor costs and branch revenue." },
    "mc-forecast": { where: "Monte Carlo Hospitality Group · Strategy Consulting Intern", href: "experience.html#montecarlo", what: "Extended the model to forecast revenue, profit margin, customer demand and expected ROI per location." },
    "180-crm":    { where: "180 Degrees Consulting · Professional Development Director", href: "experience.html#c180", what: "Grew the nonprofit client pipeline 50% with a Salesforce CRM strategy and sourcing playbook that cut acquisition time 30%." },
    "180-train":  { where: "180 Degrees Consulting · Professional Development Director", href: "experience.html#c180", what: "Diagnosed skill gaps through structured 1:1s and built the training curriculum to close them." },
    "bf-partners": { where: "BreakFree · Founder & Project Lead", href: "experience.html#breakfree", what: "Delivered 50+ educational workshops for underserved women in partnership with UN Women." },
    "bf-product": { where: "BreakFree · Founder & Project Lead", href: "experience.html#breakfree", what: "Co-built a digital accessibility platform serving 100+ community members, owning partnerships and product direction." },
    "imu":        { where: "IMU Peace Club · Project Leader", href: "experience.html#imu", what: "Ran structured interviews with 30+ volunteers and donors and turned the findings into a content strategy and outreach roadmap the club adopted." }
  };

  var SKILLS = {
    tech: [
      ["Python", ["adm-data"]],
      ["SQL", ["adm-data", "adm-sql", "bakai-ops"]],
      ["Data modeling", ["adm-sql", "planner-build"]],
      ["JavaScript", ["planner-build", "alexis-build"]],
      ["React", ["alexis-build", "adm-web"]],
      ["Node.js & Express", ["alexis-build", "adm-web"]],
      ["HTML & CSS", ["planner-build", "dancesport"]],
      ["C++ & OOP", ["dcm"]],
      ["Algorithms", ["dcm-algo", "planner-build"]],
      ["Linux", ["dcm"]],
      ["Git, GitHub & CI", ["planner-ship", "ai-team", "dancesport"]],
      ["AI agents & automation", ["vyra-agents", "ai-team", "planner-ai"]],
      ["Claude Code & Gemini CLI", ["ai-team", "planner-ai"]]
    ],
    pm: [
      ["Roadmapping", ["alexis-pm", "imu"]],
      ["User research & interviews", ["imu", "vyra-reqs"]],
      ["Prioritization & trade-offs", ["alexis-pm", "adm-web"]],
      ["Feedback into requirements", ["vyra-reqs", "alexis-client"]],
      ["Stakeholder & client management", ["alexis-client", "adm-web", "bf-partners"]],
      ["Iterative delivery", ["adm-web", "planner-ship", "alexis-client"]],
      ["Product direction", ["bf-product", "planner-pm"]],
      ["Privacy & trust by design", ["planner-privacy", "planner-pm"]]
    ],
    biz: [
      ["Expansion strategy", ["mc-strategy"]],
      ["Site-selection modeling", ["mc-model"]],
      ["Revenue & ROI forecasting", ["mc-forecast"]],
      ["Business cases for leadership", ["bakai-case", "mc-forecast"]],
      ["Process improvement", ["bakai-ops"]],
      ["Excel", ["bakai-ops"]],
      ["Salesforce CRM", ["180-crm"]],
      ["Pipeline & growth", ["180-crm", "vyra-agents"]],
      ["Training & team development", ["180-train"]],
      ["Partnerships", ["bf-partners", "bf-product"]]
    ]
  };

  function slug(s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }

  function showProof(group, name, ids) {
    var panel = document.getElementById("proof-" + group);
    var items = ids.map(function (id) {
      var e = EVIDENCE[id];
      return el("li", null, [
        el("span", { class: "where" }, [el("a", { href: e.href, text: e.where })]),
        el("span", { class: "what", text: e.what })
      ]);
    });
    panel.replaceChildren(
      el("h3", { text: name + ": where I used it" }),
      el("ol", null, items)
    );
  }

  function selectSkill(group, name, ids, updateHash) {
    document.querySelectorAll('#list-' + group + ' .skill-btn').forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.name === name));
    });
    showProof(group, name, ids);
    if (updateHash && history.replaceState) history.replaceState(null, "", "#" + slug(name));
  }

  var lists = { tech: document.getElementById("list-tech"), pm: document.getElementById("list-pm"), biz: document.getElementById("list-biz") };
  if (lists.tech) {
    Object.keys(SKILLS).forEach(function (group) {
      SKILLS[group].forEach(function (s) {
        var name = s[0], ids = s[1];
        var b = el("button", { type: "button", class: "skill-btn", "aria-pressed": "false", "aria-controls": "proof-" + group, "data-name": name, id: "skill-" + slug(name) }, [
          name, el("span", { class: "count", text: "(" + ids.length + ")", "aria-hidden": "true" })
        ]);
        b.setAttribute("aria-label", name + ", " + ids.length + " example" + (ids.length === 1 ? "" : "s"));
        b.addEventListener("click", function () { selectSkill(group, name, ids, true); });
        lists[group].appendChild(el("li", null, [b]));
      });
    });
    // Open a skill from the URL (e.g. skills.html#sql), otherwise start with the first in each group.
    var wanted = (location.hash || "").slice(1);
    Object.keys(SKILLS).forEach(function (group) {
      var pick = SKILLS[group].find(function (s) { return slug(s[0]) === wanted; }) || SKILLS[group][0];
      selectSkill(group, pick[0], pick[1], false);
    });
    if (wanted) { var t = document.getElementById("skill-" + wanted); if (t) t.scrollIntoView({ block: "center" }); }
  }

  // ---------- Draft bar: shows only while placeholders remain ----------
  var n = document.querySelectorAll(".ph").length;
  var bar = document.getElementById("draft-bar");
  if (bar && n) {
    document.getElementById("draft-count").textContent = n + " placeholder" + (n === 1 ? "" : "s") + " on this page.";
    bar.hidden = false;
  }
})();
