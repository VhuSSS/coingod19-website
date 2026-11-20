// Service positioning is registered before the shared language controller starts.
(() => {
  function update(selector, zh, en) {
    const element = document.querySelector(selector);
    if (!element) return;
    element.innerHTML = zh;
    const translation = translations.find(item => item.element === element);
    if (translation) Object.assign(translation, { zh, en });
    else translations.push({ element, zh, en });
  }
  update('h1', '区块链开发，<br><span class="highlight">让 AI 与业务落地。</span>', 'Blockchain engineering.<br><span class="highlight">AI for real business.</span>');
  update('.intro', '我是 <strong>区块炼金师-币神</strong>，拥有 <strong>5 年以上区块链技术开发经验</strong>，正在拓展 AI 开发与应用服务。承接区块链项目、AI 工具安装部署与应用开发，也为企业和个人提供小程序、官网、网站及商城开发。', 'I’m <strong>Blockchain Alchemist · CoinGod</strong>, a developer with <strong>over 5 years of blockchain development experience</strong>, now expanding into AI development and implementation. Available for blockchain projects, AI tool setup and deployment, and websites, mini programs and online stores.');
  update('.hero .eyebrow', '<span class="live-dot"></span> BLOCKCHAIN · AI · SOFTWARE', '<span class="live-dot"></span> BLOCKCHAIN · AI · SOFTWARE');
  update('.hero-actions .button', '了解技术服务 <span>↗</span>', 'Explore services <span>↗</span>');
  document.querySelector('.hero-actions .button').href = '#services';
  update('.hero-actions .text-link', '沟通项目需求 <span>↗</span>', 'Discuss a project <span>↗</span>');
  document.querySelector('.hero-actions .text-link').href = '#contact';
  update('.about h2', '从链上技术，<br>走向更广泛的业务场景。', 'From onchain technology<br>to everyday business.');
  update('.about-bottom p', '5 年以上区块链开发经历，是我开展技术服务的基础。目前，我也在向 AI 方向拓展，承接 AI 应用开发、工具安装配置与部署支持。无论是链上项目，还是小程序、官网和商城，都可以从具体需求开始，沟通实现方式、交付范围与合作安排。', 'Over 5 years in blockchain development form the foundation of my work. I’m expanding into AI applications, tool installation, configuration and deployment support. For blockchain projects, mini programs, websites and online stores, we can start with your requirements and agree on an implementation approach, deliverables and working arrangements.');
  update('#focus h2', '三条服务主线，<br>回应不同业务需求。', 'Three service areas.<br>Practical business needs.');
  update('#focus .section-heading > p', '根据使用场景与项目阶段，确定合适的技术方案和交付范围。', 'Define the approach and scope around your use case and project stage.');
  const areas = [
    ['区块链技术开发', 'Blockchain development', '承接区块链项目开发、链上交互与业务系统集成，以及现有项目的功能迭代。具体链、技术栈与功能范围在需求沟通时确认。', 'Blockchain project development, onchain interactions, business system integration and feature updates. Supported chains, stack and scope are agreed during discovery.'],
    ['AI 开发与部署', 'AI development & deployment', '提供 AI 工具安装配置、模型与应用部署支持、模型 API 接入，以及面向具体业务的 AI 应用与自动化开发。部署方式根据设备条件与使用需求确定。', 'AI tool installation and configuration, model and application deployment support, model API integration, and business-focused AI applications and automation. Deployment depends on your hardware and use case.'],
    ['网站与小程序开发', 'Websites & mini programs', '承接企业官网、个人网站、小程序与商城开发，可沟通商品展示、内容管理、订单等业务功能，以及上线部署和后续迭代。', 'Corporate and personal websites, mini programs and online stores. Discuss product catalogs, content management, orders, deployment and follow-up improvements.']
  ];
  areas.forEach(([zh,en,text,english], index) => {
    update(`.focus-grid article:nth-child(${index+1}) h3`, zh, en);
    update(`.focus-grid article:nth-child(${index+1}) p`, text, english);
    update(`.focus-grid article:nth-child(${index+1}) .chips`, ['<span>Blockchain</span><span>Integration</span>','<span>AI Apps</span><span>Deployment</span>','<span>Web</span><span>Mini Programs</span>'][index], ['<span>Blockchain</span><span>Integration</span>','<span>AI Apps</span><span>Deployment</span>','<span>Web</span><span>Mini Programs</span>'][index]);
  });
  document.querySelector('#focus').id = 'services';
  const serviceLink = document.createElement('a');
  serviceLink.href = '#services'; serviceLink.textContent = '技术服务';
  document.querySelector('.nav nav a').after(serviceLink);
  translations.push({ element: serviceLink, zh: '技术服务', en: 'Services' });
  update('.studio-caption', '<span>技术服务 / SERVICES</span><span class="studio-count">03</span>', '<span>TECHNICAL SERVICES</span><span class="studio-count">03</span>');
  ['区块链项目开发','AI 应用与安装部署','网站 · 小程序 · 商城'].forEach((text,index) => {
    update(`.studio-row:nth-of-type(${index+1}) .studio-topic`, text, ['Blockchain development','AI applications & deployment','Websites · Mini programs · Stores'][index]);
    document.querySelectorAll('.studio-row')[index].href = '#services';
  });
  update('.studio-status span', '欢迎沟通开发与部署需求', 'Available for development & deployment projects');
  update('.contact h2', '聊聊你的开发或部署需求', 'Let’s discuss your project');
  update('.contact-intro p', '区块链、AI、小程序、官网或商城项目，都欢迎联系。请简要说明业务目标、现有基础、期望功能、预算范围与时间安排，方便评估实现方式和工作量。', 'Get in touch about blockchain, AI, mini programs, websites or online stores. Share your goal, current setup, desired features, budget range and timeline so we can assess the approach and effort.');
  update('#journey .section-heading h2', '从需求沟通，<br>到上线交付。', 'From requirements<br>to launch.');
  update('#journey .section-heading > p', '先明确目标与范围，再按约定推进开发和验收。', 'Agree on goals and scope, then work toward implementation and acceptance.');
  const steps = [
    ['需求沟通','Discovery','了解业务目标、使用场景、现有系统与部署环境。','Discuss goals, use cases, existing systems and deployment environment.'],
    ['方案与范围','Scope & approach','确认功能清单、技术方案、交付内容、费用与时间安排。','Agree on features, technical approach, deliverables, fees and timeline.'],
    ['开发与联调','Build & integrate','按约定推进开发、安装或配置，沟通进度并验证关键功能。','Develop, install or configure the solution, share progress and validate key functions.'],
    ['验收与交接','Handover','按约定验收成果，完成上线、使用说明与后续支持安排。','Review agreed deliverables, launch, provide usage guidance and agree on follow-up support.']
  ];
  steps.forEach(([zh,en,text,english],index) => {
    const card = document.querySelectorAll('.journey-track article')[index];
    card.querySelectorAll('[data-depth-copy]').forEach(node => {
      const item = translations.find(record => record.element === node);
      if (item) { const heading = node.closest('h3'); Object.assign(item,{zh:heading?zh:text,en:heading?en:english}); node.innerHTML=item.zh; }
    });
    card.querySelector('small')?.remove();
  });
  update('.field-note blockquote', '清晰的需求、明确的范围，是一次可靠交付的起点。', 'Clear requirements and an agreed scope are the starting point for a reliable delivery.');
  update('.conversation h2', '合作之前，<br>先把问题聊清楚。', 'Let’s clarify<br>the details first.');
  const questions = [
    ['可以承接哪些项目？','What projects can we discuss?','区块链技术开发、AI 应用开发与工具安装部署，以及小程序、企业官网、个人网站和商城。具体功能与技术要求需要结合项目评估。','Blockchain development, AI applications and tool deployment, mini programs, corporate or personal websites, and online stores. Features and technical requirements are assessed per project.'],
    ['咨询时需要准备什么？','What should I prepare?','可以先提供业务目标、参考产品、功能清单、已有代码或系统情况，以及预算范围和期望时间。AI 安装部署需求还可以说明设备配置、操作系统和希望使用的工具。','Share your goals, references, feature list, existing code or system, budget range and timeline. For AI setup, include hardware, operating system and the tools you want to use.'],
    ['费用、交付与后续维护如何安排？','How are pricing, delivery and maintenance handled?','根据功能复杂度、开发工作量与部署环境沟通报价。交付内容、验收方式和后续维护范围在合作前明确；页面中的概念项目用于展示思路，实际服务以约定为准。','Pricing is discussed based on complexity, effort and deployment environment. Deliverables, acceptance criteria and maintenance are agreed before work starts. Concept projects illustrate ideas; actual services follow the agreed scope.']
  ];
  document.querySelectorAll('.faq-list details').forEach((detail,index)=>{
    const [zh,en,text,english]=questions[index];
    const nodes=detail.querySelectorAll('[data-depth-copy]');
    nodes.forEach((node,i)=>{const item=translations.find(record=>record.element===node);if(item){Object.assign(item,{zh:i===0?zh:text,en:i===0?en:english});node.innerHTML=item.zh;}});
  });
  update('.nav nav a[href="#journey"]', '合作流程', 'Process');
  update('#services .section-label', '02 / TECHNICAL SERVICES', '02 / TECHNICAL SERVICES');
  update('#journey .section-label', '06 / HOW WE WORK', '06 / HOW WE WORK');
  ui.zh.pageTitle = '区块炼金师-币神 · 区块链与 AI 开发服务';
  ui.zh.description = '5 年以上区块链开发经验，提供区块链项目开发、AI 应用与安装部署、小程序、官网、网站及商城开发服务。';
  ui.en.pageTitle = 'CoinGod · Blockchain, AI & Software Development';
  ui.en.description = 'Over 5 years in blockchain development. Blockchain projects, AI applications and deployment, websites, mini programs and online stores.';
})();

