const savedLang = localStorage.getItem("lang") || "ar";
const themeButtons = document.querySelectorAll(".theme-btn");

function applyTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

applyTheme(localStorage.getItem("theme") === "light");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("light-mode"));
  });
});
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

function toggleMenu(open) {
  mobileMenu.classList.toggle("active", open);
  hamburgerBtn.classList.toggle("active", open);
  hamburgerBtn.setAttribute("aria-expanded", open);
  mobileMenu.setAttribute("aria-hidden", !open);
  document.body.classList.toggle("menu-open", open);
}

hamburgerBtn.addEventListener("click", () => {
  toggleMenu(!mobileMenu.classList.contains("active"));
});
menuOverlay.addEventListener("click", () => toggleMenu(false));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") toggleMenu(false);
});
const featuresData = [
  { icon: '<i class="fa-solid fa-screwdriver-wrench"></i>', key: "builder" },
  { icon: '<i class="fa-solid fa-puzzle-piece"></i>', key: "compat" },
  { icon: '<i class="fa-solid fa-gauge-high"></i>', key: "bottleneck" },
  { icon: '<i class="fa-solid fa-chart-line"></i>', key: "fps" },
  { icon: '<i class="fa-solid fa-forward-fast"></i>', key: "futureProof" },
  { icon: '<i class="fa-solid fa-angles-up"></i>', key: "upgrade" },
  { icon: '<i class="fa-solid fa-scale-balanced"></i>', key: "compare" },
  { icon: '<i class="fa-solid fa-microchip"></i>', key: "assistant" },
];
const featuresContainer = document.getElementById("features-container");

function renderFeatures(lang) {
  const t = translations[lang] || translations.ar;
  const focusedIndex = Array.from(featuresContainer.children).indexOf(
    document.activeElement,
  );
  featuresContainer.innerHTML = "";

  featuresData.forEach((feature) => {
    const card = document.createElement("div");
    card.className = "feature-card card";
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
        <div class="feature-icon card-icon">${feature.icon}</div>
        <h3 class="feature-heading card-title">${t[`features.${feature.key}.title`] ?? ""}</h3>
        <p class="feature-desc card-desc">${t[`features.${feature.key}.desc`] ?? ""}</p>
      `;
    featuresContainer.appendChild(card);
  });

  if (focusedIndex !== -1) {
    featuresContainer.children[focusedIndex]?.focus();
  }
}
const whyUsData = [
  { key: "scattered" },
  { key: "beginners" },
  { key: "database" },
];

const whyUsContainer = document.getElementById("why-us-container");

function renderWhyUs(lang) {
  const t = translations[lang] || translations.ar;
  const focusedIndex = Array.from(whyUsContainer.children).indexOf(
    document.activeElement,
  );
  whyUsContainer.innerHTML = "";

  whyUsData.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card why-us-card";
    card.setAttribute("tabindex", "0");
    card.innerHTML = `
        <div class="card-icon why-us-number">${t[`whyus.${item.key}.number`] ?? ""}</div>
        <h3 class="card-title why-us-title">${t[`whyus.${item.key}.title`] ?? ""}</h3>
        <p class="card-desc why-us-desc">${t[`whyus.${item.key}.desc`] ?? ""}</p>
      `;
    whyUsContainer.appendChild(card);
  });

  if (focusedIndex !== -1) {
    whyUsContainer.children[focusedIndex]?.focus();
  }
}
const workflowData = [
  { icon: '<i class="fa-solid fa-sliders"></i>', key: "choose" },
  { icon: '<i class="fa-solid fa-circle-check"></i>', key: "check" },
  {
    icon: '<i class="fa-solid fa-magnifying-glass-chart"></i>',
    key: "analyze",
  },
  { icon: '<i class="fa-solid fa-rocket"></i>', key: "decide" },
];
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;
const workflowContainer = document.getElementById("workflow-container");

function renderWorkflow(lang) {
  const t = translations[lang] || translations.ar;
  const focusedIndex = Array.from(workflowContainer.children).indexOf(
    document.activeElement,
  );
  workflowContainer.innerHTML = "";

  workflowData.forEach((step) => {
    const card = document.createElement("div");
    card.className = "card workflow-card";
    card.setAttribute("tabindex", "0");
    card.innerHTML = `  
        <span class="workflow-number">${t[`workflow.${step.key}.number`] ?? ""}</span>
      ${step.icon}
      <h3 class="feature-heading card-title">${t[`workflow.${step.key}.title`] ?? ""}</h3>
      <p class="feature-desc card-desc">${t[`workflow.${step.key}.desc`] ?? ""}</p>
    `;
    workflowContainer.appendChild(card);
  });

  if (focusedIndex !== -1) {
    workflowContainer.children[focusedIndex]?.focus();
  }
}
document.getElementById("currentYear").textContent = new Date().getFullYear();
const MAX_FPS = 240;

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function updateBenchmark(data) {
  if (data.gpu) {
    if (data.gpu.score != null) {
      document.getElementById("gpuValue").textContent = Number(
        data.gpu.score,
      ).toLocaleString("en-US");
    }
    if (data.gpu.name)
      document.getElementById("gpuName").textContent = data.gpu.name;
  }

  if (data.cpu) {
    if (data.cpu.score != null) {
      document.getElementById("cpuValue").textContent = Number(
        data.cpu.score,
      ).toLocaleString("en-US");
    }
    if (data.cpu.name)
      document.getElementById("cpuName").textContent = data.cpu.name;
  }

  if (data.bottleneckPercent != null) {
    const p = clamp(data.bottleneckPercent, 0, 100);
    document.getElementById("bottleneckBar").style.width = p + "%";
    const lang = document.documentElement.lang === "en" ? "en" : "ar";
    const labels = {
      ar: { excellent: "ممتاز", good: "جيد", high: "مرتفع" },
      en: { excellent: "Excellent", good: "Good", high: "High" },
    }[lang];
    const label =
      data.bottleneckLabel ||
      (p < 5 ? labels.excellent : p < 15 ? labels.good : labels.high);
    document.getElementById("bottleneckStatus").textContent =
      `${label} ✓ ${p.toFixed(1)}%`;
  }

  if (data.fps != null) {
    document.getElementById("fpsStatus").textContent =
      `FPS ${Math.round(data.fps)}`;
    document.getElementById("fpsBar").style.width =
      clamp((data.fps / MAX_FPS) * 100, 0, 100) + "%";
  }

  if (data.futureTotal != null && data.futureScore != null) {
    document.getElementById("futureStatus").textContent =
      `${data.futureTotal} / ${data.futureScore}`;
    document.getElementById("futureBar").style.width =
      clamp((data.futureScore / data.futureTotal) * 100, 0, 100) + "%";
  }
}
let liveState = {
  gpu: 34811,
  cpu: 41230,
  bottleneck: 2.4,
  fps: 148,
  future: 87,
};

function simulateLiveTick() {
  liveState.gpu = clamp(
    liveState.gpu + Math.round((Math.random() - 0.5) * 120),
    1000,
    99999,
  );
  liveState.cpu = clamp(
    liveState.cpu + Math.round((Math.random() - 0.5) * 150),
    1000,
    99999,
  );
  liveState.bottleneck = clamp(
    liveState.bottleneck + (Math.random() - 0.5) * 0.6,
    0,
    30,
  );
  liveState.fps = clamp(
    Math.round(liveState.fps + (Math.random() - 0.5) * 8),
    30,
    240,
  );
  liveState.future = clamp(
    Math.round(liveState.future + (Math.random() - 0.5) * 2),
    0,
    100,
  );

  updateBenchmark({
    gpu: { score: liveState.gpu },
    cpu: { score: liveState.cpu },
    bottleneckPercent: liveState.bottleneck,
    fps: liveState.fps,
    futureTotal: 100,
    futureScore: liveState.future,
  });
}

setInterval(simulateLiveTick, 2500);

const translations = {
  ar: {
    "site.title": "elkaeron",
    "meta.description":
      "منصة متكاملة لتجميع الكمبيوتر، وفحص توافقه، وتحليل أدائه الفعلي، وتوقّع معدل الإطارات — كل ذلك في مكانٍ واحد.",
    "og.title": "elKaeron | منصتك لتجميع الكمبيوتر وتحليل الأداء",
    "og.description":
      "اصنع تجميعتك، تحقّق من التوافق، وتوقّع أداءك — بدقة وبلا تحيّز.",
    "lang.select": "اختر اللغة",
    "lang.ar": "العربية",
    "lang.en": "EN",
    "theme.toggle": "تبديل المظهر",
    "nav.menu": "القائمة",
    "nav.builder": "تجميع الجهاز",
    "nav.bottleneck": "فحص الاختناق",
    "nav.upgradePlan": "خطة الترقية",
    "nav.performanceForecast": "توقع الأداء",
    "nav.futureReady": "جهوزية المستقبل",
    "nav.compare": "مقارنة التجميعات",
    "auth.login": "دخول / تسجيل",
    "hero.title": "كل ما تحتاجه لجهازك في مكانٍ واحد",
    "hero.desc":
      "اصنع تجميعتك، تحقّق من التوافق، وتوقّع الأداء — منصة واحدة متكاملة تناسب المبتدئ والمحترف.",
    "hero.ctaPrimary": "ابدأ تجميعتك",
    "hero.ctaSecondary": "جرّب المساعد الذكي",
    "bench.live": "تحليل مباشر",
    "bench.title": "Live Benchmark",
    "bench.gpuLabel": "GPU",
    "bench.cpuLabel": "CPU",
    "bench.bottleneck": "اختناق (Bottleneck)",
    "bench.bottleneckStatus": "ممتاز ✓ 2.4%",
    "bench.fpsLabel": "FPS — Cyberpunk 2077 · 1080p Ultra",
    "bench.fpsStatus": "FPS 148",
    "bench.futureLabel": "Future Proof Score",
    "bench.futureStatus": "100 / 87",
    "stats.plannedFeatures": "ميزة مخططة",
    "stats.databaseParts": "قطعة في قاعدة البيانات",
    "stats.goal.num": "#١",
    "stats.goal": "هدفنا عالميًا",
    "stats.supportedGames": "لعبة مدعومة",
    "whyus.title": "أين تقصّر المنصات الأخرى؟",
    "features.title": "استكشف المنصة",
    "features.builder.title": "اصنع تجميعتك",
    "features.builder.desc":
      "اختر قطعك وشاهد السعر الإجمالي يتغيّر لحظيًا أمامك.",
    "features.compat.title": "توافق مضمون",
    "features.compat.desc":
      "تحقّق من توافق جميع القطع قبل أن تنفق قرشًا واحدًا.",
    "features.bottleneck.title": "اكتشف الاختناق",
    "features.bottleneck.desc": "اعرف بتحليل دقيق أيّ قطعة تُعيق أداء جهازك.",
    "features.fps.title": "توقّع الأداء مسبقًا",
    "features.fps.desc":
      "اعرف معدّل الإطارات (FPS) المتوقع في ألعابك المفضّلة قبل الشراء.",
    "features.futureProof.title": "جاهز للمستقبل؟",
    "features.futureProof.desc":
      "اعرف كم سنةً يصمد جهازك أمام الألعاب والبرامج القادمة.",
    "features.upgrade.title": "مسار الترقية",
    "features.upgrade.desc": "طوِّر جهازك بالتدريج بأذكى طريقة وبأقل تكلفة.",
    "features.compare.title": "مقارنة التجميعات",
    "features.compare.desc":
      "قارن بين تجميعتين في الأداء والسعر، واتخذ قرارك بثقة.",
    "features.assistant.title": "المساعد الذكي",
    "features.assistant.desc":
      "اسأل أيّ سؤال عن الهاردوير، واحصل على إجابة فورية من مساعد متخصص.",
    "whyus.scattered.number": "١",
    "whyus.scattered.title": "أدوات مبعثرة",
    "whyus.scattered.desc":
      "التوافق في موقع، والأسعار في موقع آخر، والأداء في موقع ثالث — لا توجد منصة واحدة تجمع كل ذلك.",
    "whyus.beginners.number": "٢",
    "whyus.beginners.title": "معقّدة على المبتدئ",
    "whyus.beginners.desc":
      "معظمها مصممة للمحترفين، أما المبتدئ فيجد نفسه ضائعًا بين المصادر.",
    "whyus.database.number": "٣",
    "whyus.database.title": "قطع غائبة عن المنصات الأخرى",
    "whyus.database.desc":
      "قطع متوفرة في أسواقنا المحلية لا تجدها في أي منصة أخرى، مما يُصعّب البحث والمقارنة.",
    "ai-proof.title": "جهازك المثالي يبدأ من هنا",
    "ai-proof.you": "أنت",
    "ai-proof.ai": "elKaeron AI",
    "ai-proof.msg1": "عندي ميزانية 20,000 جنيه — أنسب تجميعة ألعاب إيه؟",
    "ai-proof.reply1":
      "بناءً على ميزانيتك وأسعار السوق المصري الحالية: Ryzen 5 7600 + RX 7700 XT + 16GB DDR5. هتحصل على 120+ FPS في معظم الألعاب عند 1080p، مع Future Proof Score 82/100. الاختناق 1.8% بس. تحتاج تفاصيل أكتر؟",
    "ai-proof.msg2": "RTX 4070 هتكون أحسن بدالها؟",
    "ai-proof.reply2":
      "RTX 4070 هتدّيك +12% في Ray Tracing، بس أغلى بـ4,500 جنيه وهتخرجك من الميزانية. لو هدفك الألعاب الحالية، RX 7700 XT هي الأذكى. لو عندك مرونة في الميزانية، نقدر نبص على خيار تاني.",
    "workflow.title": "كيف تعمل المنصة؟",

    "workflow.choose.number": "١",
    "workflow.choose.title": "اختر قطعك",
    "workflow.choose.desc":
      "تصفّح قاعدة بياناتنا الضخمة، واختر القطع التي تناسب ميزانيتك وحاجتك الحقيقية.",

    "workflow.check.number": "٢",
    "workflow.check.title": "تحقّق من التوافق فورًا",
    "workflow.check.desc":
      "نتأكّد تلقائيًا من توافق كل قطعة مع الأخرى، فلا مجال لأي خطأ في التجميعة.",

    "workflow.analyze.number": "٣",
    "workflow.analyze.title": "شاهد تحليل الأداء",
    "workflow.analyze.desc":
      "اعرف نسبة الاختناق المتوقعة، ومعدل الإطارات في ألعابك، ومدى جهوزية جهازك للمستقبل.",

    "workflow.decide.number": "٤",
    "workflow.decide.title": "اصنع بثقة",
    "workflow.decide.desc":
      "اتّخذ قرارك النهائي بناءً على بيانات دقيقة وحقيقية، بلا تخمين وبلا تحيّز.",
    "footer.desc":
      "منصة متكاملة لتجميع أجهزة الكمبيوتر وفحصها وتطويرها — بمعايير دقيقة وبيانات حقيقية.",
    "footer.tools": "الأدوات",
    "footer.company": "الشركة",
    "footer.support": "الدعم الفني",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "الشروط والأحكام",
    "footer.copy": `${currentYear.toLocaleString("ar-EG", {
      useGrouping: false,
    })}© elKaeron. جميع الحقوق محفوظة.`,
    "faq.title": "أسئلة شائعة",

    "faq.fps.q": "هل يستطيع الموقع توقّع أداء جهازي في ألعاب معينة؟",
    "faq.fps.a":
      "نعم، يقدّم elKaeron تقديرًا تقريبيًا لمعدل الإطارات (FPS) المتوقع في أشهر الألعاب (مثل Cyberpunk, Valorant, GTA V) بناءً على كرت الشاشة والمعالج المختارين ودقة الشاشة (1080p, 2K, 4K).",

    "faq.cpuGpu.q": "أيهما أهم لاستخدامي: المعالج (CPU) أم كرت الشاشة (GPU)؟",
    "faq.cpuGpu.a":
      "يعتمد ذلك على استخدامك؛ إذا كان هدفك الأساسي هو الألعاب، فالأولوية لكرت الشاشة. أما إذا كان عملك يتركّز على المونتاج، أو البرمجة، أو الرندرة (Rendering)، فإن قوة المعالج هي الأهم.",

    "faq.compat.q":
      "كيف أضمن توافق القطع (Compatibility) عند بناء تجميعة جديدة؟",
    "faq.compat.a":
      "يفحص نظام elKaeron تلقائيًا المقابس (Sockets)، وأنواع الرامات (DDR4/DDR5)، والمنافذ، للتأكد من أن جميع القطع التي تختارها متوافقة تمامًا مع اللوحة الأم ومزود الطاقة دون أي تعارض.",

    "faq.prices.q": "هل أسعار القطع المعروضة في الموقع محدثة؟",
    "faq.prices.a":
      "نعم، نحاول تحديث أسعار السوق بشكل دوري بناءً على متوسط الأسعار في المتاجر المحلية والعالمية، لكن قد تطرأ تغييرات طفيفة حسب العرض والطلب.",

    "faq.laptop.q":
      "هل يدعم الموقع مقارنة كروت الشاشة والمعالجات الخاصة باللابتوب؟",
    "faq.laptop.a":
      "حاليًا، تركّز المنصة بشكل كامل على قطع أجهزة الكمبيوتر المكتبية (Desktop) لضمان دقة البيانات، وجارٍ العمل على إضافة دعم لأجهزة اللابتوب في التحديثات القادمة.",

    "faq.ai.q": "كيف تساعد أدوات الذكاء الاصطناعي في منصة elKaeron؟",
    "faq.ai.a":
      "يساعدك المساعد الذكي على اقتراح أفضل تجميعة ممكنة بناءً على ميزانيتك المحددة واستخدامك (ألعاب، مونتاج، برمجة)، مع تحقيق أفضل قيمة مقابل السعر.",

    "faq.bottleneckCalc.q": "كيف يحسب الموقع نسبة الاختناق (Bottleneck)؟",
    "faq.bottleneckCalc.a":
      "نعتمد على خوارزميات متطورة تقارن قوة المعالجة (CPU) بقوة الرسوميات (GPU) بناءً على اختبارات الأداء الواقعية (Benchmarks) في الألعاب وبرامج الرندر، لتحديد ما إذا كانت إحدى القطع تحدّ من أداء الأخرى.",

    "faq.bottleneckMeaning.q":
      "هل نسبة الاختناق الظاهرة تعني أن جهازي لن يعمل؟",
    "faq.bottleneckMeaning.a":
      "لا، بالطبع لا. الاختناق يعني فقط أنك لن تحصل على 100% من أداء القطعة الأقوى، لكن الجهاز سيعمل بشكل طبيعي تمامًا.",
    "chat.title": "مساعد Elkaeron الذكي",
    "chat.description":
      "اسألني عن أي شيء يخص المنصة، أو التجميعات، أو المهارات، أو الخبرة.",
  },

  en: {
    "site.title": "elkaeron",
    "meta.description":
      "Build your PC, check compatibility, and forecast performance — all in one platform.",
    "og.title": "elKaeron | Build, Analyze & Optimize Your PC",
    "og.description":
      "PC builds, compatibility checks, and real performance analysis — unbiased, for everyone.",
    "lang.select": "Select language",
    "lang.ar": "عربي",
    "lang.en": "EN",
    "theme.toggle": "Toggle theme",
    "nav.menu": "Menu",
    "nav.builder": "PC Builder",
    "nav.bottleneck": "Bottleneck Check",
    "faq.title": "FAQ's",

    "footer.copy": `© ${currentYear} elKaeron. All rights reserved.`,

    "faq.fps.q":
      "Does the site predict my system's performance in specific games?",
    "faq.fps.a":
      "Yes, elKaeron provides an estimated FPS for the most popular games (such as Cyberpunk, Valorant, GTA V) based on your selected GPU, CPU, and screen resolution (1080p, 2K, 4K).",

    "faq.cpuGpu.q": "Which matters more for my use case: CPU or GPU?",
    "faq.cpuGpu.a":
      "It depends on your usage; if gaming is your main goal, prioritize the GPU. If your work focuses on video editing, programming, or rendering, CPU power matters most.",

    "faq.compat.q":
      "How do I ensure part compatibility when building a new rig?",
    "faq.compat.a":
      "elKaeron automatically checks sockets, RAM types (DDR4/DDR5), and ports to make sure every part you choose is fully compatible with your motherboard and power supply with zero conflicts.",

    "faq.prices.q": "Are the part prices shown on the site up to date?",
    "faq.prices.a":
      "Yes, we periodically update market prices based on the average across local and international stores, though minor changes may occur depending on supply and demand.",

    "faq.laptop.q": "Does the site support comparing laptop GPUs and CPUs?",
    "faq.laptop.a":
      "Currently the platform focuses entirely on desktop components to ensure data accuracy, and we're working on adding laptop versions in upcoming updates.",

    "faq.ai.q": "How does AI contribute to the elKaeron platform?",
    "faq.ai.a":
      "Our smart assistant helps you find the best possible build based on your set budget and use case (gaming, editing, programming) while maximizing value for your money.",

    "faq.bottleneckCalc.q":
      "How does the site calculate the Bottleneck percentage?",
    "faq.bottleneckCalc.a":
      "We rely on advanced algorithms that compare CPU and GPU performance based on real-world benchmarks in games and rendering software, to determine whether one component is limiting the other.",

    "faq.bottleneckMeaning.q":
      "Does a visible bottleneck mean my PC won't work?",
    "faq.bottleneckMeaning.a":
      "Not at all. A bottleneck simply means you won't get 100% of your stronger component's performance, but the system will still run completely normally.",
    "nav.upgradePlan": "Upgrade Plan",
    "nav.performanceForecast": "Performance Forecast",
    "nav.futureReady": "Future Ready",
    "nav.compare": "Build Comparison",
    "auth.login": "Sign in / Register",
    "hero.title": "Everything you need for your PC in one place",
    "hero.desc":
      "Build your rig, check compatibility, and forecast performance — one platform for beginners and pros alike.",
    "hero.ctaPrimary": "Start your build",
    "hero.ctaSecondary": "Try the AI assistant",
    "bench.live": "Live analysis",
    "bench.title": "Live Benchmark",
    "bench.gpuLabel": "GPU",
    "bench.cpuLabel": "CPU",
    "bench.bottleneck": "Bottleneck",
    "bench.bottleneckStatus": "Excellent ✓ 2.4%",
    "bench.fpsLabel": "FPS — Cyberpunk 2077 · 1080p Ultra",
    "bench.fpsStatus": "FPS 148",
    "bench.futureLabel": "Future Proof Score",
    "bench.futureStatus": "100 / 87",
    "stats.plannedFeatures": "Planned features",
    "stats.databaseParts": "Parts in database",
    "stats.goal.num": "#1",
    "stats.goal": "Our global goal",
    "stats.supportedGames": "Supported games",
    "whyus.title": "Where Others Fall Short",
    "features.title": "Explore the Platform",
    "features.builder.title": "PC Builder",
    "features.builder.desc":
      "Pick your parts and watch the total price update in real time.",
    "features.compat.title": "Guaranteed Compatibility",
    "features.compat.desc":
      "Verify every component works together before spending a single dollar.",
    "features.bottleneck.title": "Bottleneck Detector",
    "features.bottleneck.desc":
      "Find out exactly which part is holding your system back.",
    "features.fps.title": "Performance Forecast",
    "features.fps.desc":
      "Know your expected FPS in your favorite games before you buy.",
    "features.futureProof.title": "Future Ready?",
    "features.futureProof.desc":
      "See how many years your build can keep up with upcoming games and software.",
    "features.upgrade.title": "Upgrade Path",
    "features.upgrade.desc":
      "Level up your build gradually, smartly, and at minimum cost.",
    "features.compare.title": "Build Comparison",
    "features.compare.desc":
      "Compare two builds on performance and price — and decide with confidence.",
    "features.assistant.title": "Smart Assistant",
    "features.assistant.desc":
      "Ask any hardware question and get an instant answer from a specialized AI.",
    "whyus.scattered.number": "1",
    "whyus.scattered.title": "Tools are scattered",
    "whyus.scattered.desc":
      "Compatibility on one site, prices on another, benchmarks on a third. No single platform ties it all together.",

    "whyus.beginners.number": "2",
    "whyus.beginners.title": "Too complex for beginners",
    "whyus.beginners.desc":
      "Most platforms are built for power users. If it's your first build, you'll get lost between sources.",

    "whyus.database.number": "3",
    "whyus.database.title": "Local market parts go missing",
    "whyus.database.desc":
      "Parts widely available in local markets aren't listed on most platforms, making search and comparison a dead end.",
    "ai-proof.title": "Your build, perfected",
    "ai-proof.you": "You",
    "ai-proof.ai": "elKaeron AI",
    "ai-proof.msg1":
      "I have a budget of 20,000 EGP — what's the best gaming build?",
    "ai-proof.reply1":
      "Based on your budget and current Egyptian market prices: Ryzen 5 7600 + RX 7700 XT + 16GB DDR5. You'll get 120+ FPS in most games at 1080p with a Future Proof Score of 82/100. Bottleneck is only 1.8%. Want the full breakdown?",
    "ai-proof.msg2": "Would an RTX 4070 be a better choice instead?",
    "ai-proof.reply2":
      "The RTX 4070 gives +12% in Ray Tracing but costs 4,500 EGP more and pushes you over budget. If current games are your target, the RX 7700 XT is the smarter pick. If you have some flexibility, we can explore another option.",
    "workflow.title": "How It Works",

    "workflow.choose.number": "1",
    "workflow.choose.title": "Choose Your Parts",
    "workflow.choose.desc":
      "Browse our massive parts database and pick what fits your budget and real needs.",

    "workflow.check.number": "2",
    "workflow.check.title": "Instant Compatibility Check",
    "workflow.check.desc":
      "We automatically verify every part works together — zero room for mistakes.",

    "workflow.analyze.number": "3",
    "workflow.analyze.title": "See the Performance Analysis",
    "workflow.analyze.desc":
      "Know your expected bottleneck, in-game FPS, and how future-ready your build really is.",

    "workflow.decide.number": "4",
    "workflow.decide.title": "Build With Confidence",
    "workflow.decide.desc":
      "Make your final call based on real, accurate data — no guessing, no bias.",
    "footer.desc":
      "Your all-in-one platform to build, check, and improve PC systems — with real data and zero bias.",
    "footer.tools": "Tools",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms and Conditions",
    "chat.title": "Elkaeron AI Assistant",
    "chat.description":
      "Ask me anything about the portfolio, projects, skills, or experience.",
  },
};

// ── Word-by-word animation ─────────────────────────────────────────────────
(function injectWordAnimStyles() {
  if (document.getElementById("word-anim-style")) return;
  const style = document.createElement("style");
  style.id = "word-anim-style";
  style.textContent = `
    .word-wrap {
      display: inline-block;
      overflow: hidden;
      vertical-align: bottom;
      padding-bottom: 0.08em;   /* يمنع قطع الحروف النازلة */
      margin-bottom: -0.08em;
    }
    .word-inner {
      display: inline-block;
      transform: translateY(110%);
      opacity: 0;
      transition:
        transform 0.55s cubic-bezier(0.34, 1.4, 0.64, 1),
        opacity   0.35s ease;
    }
    .word-inner.word-visible {
      transform: translateY(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
})();

/**

  @param {HTMLElement} el        
  @param {number}      baseDelay 
  @param {number}      stagger   
 */
function animateWords(el, baseDelay = 0, stagger = 55) {
  if (!el) return;

  const text = el.textContent.trim();
  const words = text.split(/\s+/);

  el.innerHTML = words
    .map(
      (w) =>
        `<span class="word-wrap"><span class="word-inner">${w}</span></span>`,
    )
    .join(" ");

  el.querySelectorAll(".word-inner").forEach((span, i) => {
    setTimeout(
      () => span.classList.add("word-visible"),
      baseDelay + i * stagger,
    );
  });
}

function translatePage(lang) {
  // 1. تغيير لغة واتجاه الصفحة
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // 2. ترجمة النصوص
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = translations[lang]?.[key];
    if (value) el.textContent = value;
  });

  // 3. ترجمة الـ aria-label
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    const value = translations[lang]?.[key];
    if (value) el.setAttribute("aria-label", value);
  });

  // 4. تحديث اتجاه الأيقونات مباشرة
  const currentDir = document.documentElement.dir;
  const leftIcons = document.querySelectorAll(".fa-arrow-left");
  const rightIcons = document.querySelectorAll(".fa-arrow-right");

  if (currentDir === "ltr") {
    leftIcons.forEach((icon) => {
      icon.classList.replace("fa-arrow-left", "fa-arrow-right");
    });
  } else {
    rightIcons.forEach((icon) => {
      icon.classList.replace("fa-arrow-right", "fa-arrow-left");
    });
  }
}
const langSelectors = document.querySelectorAll(".lang-selector");

langSelectors.forEach((select) => {
  select.addEventListener("change", (e) => {
    const lang = e.target.value;

    localStorage.setItem("lang", lang);

    translatePage(lang);
    renderFeatures(lang);
    renderWhyUs(lang);
    renderWorkflow(lang);

    updateCountersLocale();
    simulateLiveTick();

    langSelectors.forEach((s) => (s.value = lang));

    // إعادة تشغيل أنيميشن الكلمات بعد تغيير اللغة
    animateWords(document.querySelector(".hero-heading"), 0, 55);
    animateWords(document.querySelector(".hero-desc"), 180, 38);
  });
});
langSelectors.forEach((s) => (s.value = savedLang));
translatePage(savedLang);
renderFeatures(savedLang);
renderWhyUs(savedLang);
renderWorkflow(savedLang);

simulateLiveTick();
(function () {
  function animateEl(el, delay) {
    setTimeout(() => {
      el.classList.add("is-visible");
      el.addEventListener("animationend", function handler() {
        el.classList.remove("anim-ready", "is-visible");
        el.removeEventListener("animationend", handler);
      });
    }, delay);
  }

  // ── Hero: heading + desc كلمة كلمة، ثم الباقي ────────────────────────────
  animateWords(document.querySelector(".hero-heading"), 0, 55);
  animateWords(document.querySelector(".hero-desc"), 220, 38);

  const heroBtns = document.querySelector(".hero-btns");
  const benchCard = document.querySelector(".benchmark-card");
  if (heroBtns) animateEl(heroBtns, 500);
  if (benchCard) animateEl(benchCard, 620);

  // ── Progress bars تتملى مع ظهور الكارت ───────────────────────────────────
  // setTimeout(() => {
  //   const bench = document.querySelector(".benchmark-card");
  //   if (!bench) return;

  //   bench.querySelectorAll(".progress-fill").forEach((fill) => {
  //     const targetW = fill.style.width;
  //     fill.style.transition = "none";
  //     fill.style.width = "0%";
  //     requestAnimationFrame(() =>
  //       requestAnimationFrame(() => {
  //         fill.style.transition = "width .85s cubic-bezier(.34, 1.56, .64, 1)";
  //         fill.style.width = targetW;
  //       }),
  //     );
  //   });
  // }, 650); // نفس توقيت ظهور الكارت تقريبًا

  // ── Scroll-triggered sections ──────────────────────────────────────────────
  [
    [".stats-grid", ".stat"],
    ["#why-us-container", ".card"],
    ["#features-container", ".card"],
    ["#workflow-container", ".card"],
    [".chat-demo", ".c-msg"],
    [".faq-grid", ".faq-card"],
  ].forEach(([contSel, childSel]) => {
    const container = document.querySelector(contSel);
    if (container) {
      container
        .querySelectorAll(childSel)
        .forEach((el) => el.classList.add("anim-ready"));
    }
  });

  function observe(container, childSel, stagger) {
    if (!container) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const targets = childSel
            ? [...entry.target.querySelectorAll(childSel)]
            : [entry.target];

          targets.forEach((el, i) => animateEl(el, i * stagger));
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );
    io.observe(container);
  }
  observe(document.querySelector(".stats-grid"), ".stat", 80);
  observe(document.getElementById("why-us-container"), ".card", 100);
  observe(document.getElementById("features-container"), ".card", 100);
  observe(document.getElementById("workflow-container"), ".card", 100);
  observe(document.querySelector(".chat-demo"), ".c-msg", 150);
  observe(document.querySelector(".faq-grid"), ".faq-card", 80);
})();
function updateCountersLocale() {
  const locale = document.documentElement.dir === "rtl" ? "ar-EG" : "en-US";

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    el.textContent = target.toLocaleString(locale);
  });
}

const countUp = (el, target, duration = 1400) => {
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);

    const locale = document.documentElement.dir === "rtl" ? "ar-EG" : "en-US";

    el.textContent = Math.round(eased * target).toLocaleString(locale);

    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString(locale);
    }
  };

  requestAnimationFrame(tick);
};

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countUp(e.target, parseInt(e.target.dataset.count, 10));
      obs.unobserve(e.target);
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll("[data-count]").forEach((el) => obs.observe(el));

const cards = document.querySelectorAll(".faq-card");

cards.forEach((card) => {
  const summary = card.querySelector(".faq-q");
  summary.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = card.getAttribute("data-open") === "true";

    cards.forEach((other) => {
      other.setAttribute("data-open", "false");
      other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      card.setAttribute("data-open", "true");
      summary.setAttribute("aria-expanded", "true");
    }
  });
});
const closeBtn = document.getElementById("ai-close-btn");
const chat = document.getElementById("chat");
const fab = document.getElementById("fab");
const chatBody = document.getElementById("chat-body");
const messages = document.querySelector(".messages");
closeBtn.addEventListener("click", () => {
  chat.classList.toggle("active");
});
fab.addEventListener("click", () => {
  chat.classList.toggle("active");
});
if (messages.children === true) {
  chatBody.style.display = "none";
} else {
  messages.style.display = "none";
}
const hero = document.querySelector(".hero");

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    fab.style.visibility = "hidden";
    fab.style.opacity = 0;
  } else {
    fab.style.visibility = "visible";
    fab.style.opacity = 1;
  }
});
observer.observe(hero);
