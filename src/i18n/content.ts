export type Lang = "en" | "zh"

export type PluginCardCopy = {
  name: string
  detail: string
}

export type Content = {
  meta: { title: string }
  lang: { en: string; zh: string; switchToEn: string; switchToZh: string }
  nav: {
    features: string
    plugins: string
    privacy: string
    team: string
    github: string
    menu: string
    close: string
  }
  chapters: {
    overall: string
    schematic: string
    layout: string
    module: string
    plugins: string
  }
  hero: {
    line1: string
    line2: string
    line3: string
    sub: string
    watch: string
    github: string
    clipLabel: string
  }
  film: { title: string; label: string; play: string }
  agent: {
    title: string
    bullets: readonly [string, string]
    note: string
    blocks: {
      agent: string
      human: string
      context: string
      gui: string
      api: string
      core: string
      plugins: string
      task: string
      operation: string
      object: string
    }
    clipLabel: string
  }
  workspace: {
    title: string
    bullets: readonly [string, string]
    clipLabel: string
  }
  verify: {
    title: string
    bullets: readonly [string, string]
    stat: string
    legend: { baseline: string; tuned: string; band: string }
    clipLabel: string
  }
  mark: {
    title: string
    bullets: readonly [string, string]
    note: string
    comment: string
    shorter: string
    from: string
    to: string
    unit: string
    copper: string
    clipLabel: string
  }
  place: {
    title: string
    bullets: readonly [string, string]
    clipLabel: string
  }
  case: {
    title: string
    bullets: readonly [string, string]
    prompt: string
    clipLabel: string
  }
  chrome: {
    userComment: string
    add: string
    userPrompt: string
    before: string
    after: string
  }
  plugins: {
    title: string
    bullets: readonly [string, string]
    cards: readonly [
      PluginCardCopy,
      PluginCardCopy,
      PluginCardCopy,
      PluginCardCopy,
      PluginCardCopy,
    ]
    yours: string
    thermalCaption: string
    parasiticsCaption: string
    thermalLabel: string
    parasiticsLabel: string
    wallLabel: string
  }
  privacy: {
    title: string
    bullets: readonly [string, string, string]
    machine: string
    machineItems: readonly [string, string, string]
    onlyTo: string
    provider: string
    agents: readonly [string, string, string, string, string]
    note: string
    clipLabel: string
  }
  native: {
    title: string
    items: readonly [string, string, string, string]
  }
  closing: {
    lead: string
    power: string
    rest: string
    engineer: string
    cta: string
    imageLabel: string
  }
  team: {
    title: string
    developers: string
    institutions: string
    pending: string
    contact: string
    github: string
  }
  footer: {
    license: string
    copyright: string
    github: string
    notices: string
  }
}

export const en = {
  meta: { title: "OpenPE — AI-Native Power Electronics Engineer Workbench" },
  lang: {
    en: "EN",
    zh: "中文",
    switchToEn: "Switch to English",
    switchToZh: "切换到中文",
  },
  nav: {
    features: "Features",
    plugins: "Plugins",
    privacy: "Privacy",
    team: "Team",
    github: "GitHub",
    menu: "Menu",
    close: "Close",
  },
  chapters: {
    overall: "Overall",
    schematic: "Schematic",
    layout: "Layout",
    module: "Module",
    plugins: "Plugins",
  },
  hero: {
    line1: "AI-Native",
    line2: "Power Electronics",
    line3: "Engineer Workbench",
    sub: "An open-source desktop studio where your AI agent works in the same schematic, PCB layout, 3D model and simulation as you. Built on native KiCad 10 files.",
    watch: "Watch the film",
    github: "GitHub",
    clipLabel: "OpenPE intro",
  },
  film: {
    title: "See the workflow",
    label: "OpenPE workflow film",
    play: "Play",
  },
  agent: {
    title: "Same commands for you and your agent",
    bullets: [
      "What you can do in the studio, your agent can do",
      "Codex, Claude Code and Cursor drive the same design, simulation and project commands as the UI, through scoped tools",
    ],
    note: "DeepSeek Harness and Pi propose changes; you apply them.",
    blocks: {
      agent: "Agent",
      human: "Human",
      context: "Context Management",
      gui: "GUI",
      api: "Uniform API",
      core: "Core",
      plugins: "Plugins",
      task: "Task",
      operation: "Operation",
      object: "Object",
    },
    clipLabel: "Architecture",
  },
  workspace: {
    title: "One unified workspace",
    bullets: ["From schematic to PCB and 3D", "Edit directly or guide your agent"],
    clipLabel: "Unified workspace",
  },
  verify: {
    title: "Design and verify",
    bullets: ["Build and tune editable circuits", "Verify the result with ngspice"],
    stat: "R15 39.0 → 38.1 kΩ · output within ±1% (11.99–12.05 V)",
    legend: { baseline: "Baseline", tuned: "Tuned", band: "±1% band" },
    clipLabel: "ngspice verification",
  },
  mark: {
    title: "Mark and refine",
    bullets: [
      "Mark a region on the schematic or board and leave a comment",
      "Your agent refines exactly that part — rotate, reroute, compare",
    ],
    note: "Marks are screenshots sent with your next message; they never edit the design on their own.",
    comment: "Could you turn D7 and C19 so the pads line up better?",
    shorter: "47% shorter",
    from: "39.9",
    to: "21.2",
    unit: "mm",
    copper: "SEC copper",
    clipLabel: "Mark and refine",
  },
  place: {
    title: "Place with guidance",
    bullets: ["Preview positions and angles", "Place the group with Tab"],
    clipLabel: "Guided placement",
  },
  case: {
    title: "Build the case",
    bullets: ["Model from dimensions in 3D", "Refine the case and fit a clear lid"],
    prompt: "Could you add a lid made of clear acrylic? Make it 3 mm thick.",
    clipLabel: "Case model",
  },
  chrome: {
    userComment: "User Comment",
    add: "Add",
    userPrompt: "User Prompt",
    before: "Before",
    after: "After",
  },
  plugins: {
    title: "Extend your workbench",
    bullets: [
      "Plugins connect the studio to real-world engineering",
      "Install your own JavaScript plugins — sandboxed, with no native or network access",
    ],
    cards: [
      { name: "SPICE Simulation", detail: "ngspice 47 transient" },
      { name: "Layout Thermal", detail: "Gmsh + Elmer PCB temperature" },
      {
        name: "Layout Parasitics",
        detail: "pad-to-pad DC resistance and partial inductance",
      },
      { name: "EMC Analysis", detail: "geometry review, not compliance" },
      { name: "PE Layout Skill", detail: "bundled layout guidance" },
    ],
    yours: "Your plugin",
    thermalCaption: "Peak PCB temperature 67.7 °C",
    parasiticsCaption: "30.30 mΩ · 17.61 nH",
    thermalLabel: "PCB temperature",
    parasiticsLabel: "Layout parasitics",
    wallLabel: "Plugin wall",
  },
  privacy: {
    title: "Local-first by design",
    bullets: [
      "No OpenPE cloud — no account, no OpenPE servers, no telemetry",
      "Your designs stay on your machine as native KiCad files",
      "Prompts go only to the AI provider you choose, through its own CLI or SDK",
    ],
    machine: "Your machine",
    machineItems: ["OpenPE", "project files", "local agent CLIs"],
    onlyTo: "only to",
    provider: "Your chosen AI provider",
    agents: ["Codex", "Claude Code", "Cursor", "DeepSeek Harness", "Pi"],
    note: "Library, price and datasheet lookups contact those vendors directly. A Cursor API key is encrypted with the OS keychain via Electron safeStorage.",
    clipLabel: "Local agents",
  },
  native: {
    title: "Native and open",
    items: [
      "Native KiCad 10 files — unchanged files keep their original bytes",
      "Whole-project undo and local Git history",
      "Apache-2.0 open source",
      "Windows x64 · macOS arm64 · Linux x64",
    ],
  },
  closing: {
    lead: "What will you",
    power: "Power",
    rest: "next,",
    engineer: "Engineer?",
    cta: "GitHub",
    imageLabel: "Cased board",
  },
  team: {
    title: "Team and contact",
    developers: "Core developers",
    institutions: "Teams & institutions",
    pending: "To be announced",
    contact: "Contact",
    github: "GitHub organization",
  },
  footer: {
    license: "Apache-2.0",
    copyright: "© OpenPE contributors",
    github: "GitHub",
    notices:
      "Third-party notices: Inter is licensed under the SIL Open Font License. Solver, format, and provider names belong to their owners.",
  },
} satisfies Content

export const zh = {
  meta: { title: "OpenPE — AI-Native 电力电子工程师工作台" },
  lang: {
    en: "EN",
    zh: "中文",
    switchToEn: "Switch to English",
    switchToZh: "切换到中文",
  },
  nav: {
    features: "功能",
    plugins: "插件",
    privacy: "隐私",
    team: "团队",
    github: "GitHub",
    menu: "菜单",
    close: "关闭",
  },
  chapters: {
    overall: "总览",
    schematic: "原理图",
    layout: "布局",
    module: "模块",
    plugins: "插件",
  },
  hero: {
    line1: "AI-Native",
    line2: "电力电子",
    line3: "工程师工作台",
    sub: "一个开源桌面工作室：你的 AI agent 与你使用同一份原理图、PCB 布局、3D 模型和仿真。基于原生 KiCad 10 文件。",
    watch: "观看影片",
    github: "GitHub",
    clipLabel: "OpenPE 介绍",
  },
  film: {
    title: "观看工作流",
    label: "OpenPE 工作流影片",
    play: "播放",
  },
  agent: {
    title: "你和你的 agent 使用同一套命令",
    bullets: [
      "你在工作室里能做的，你的 agent 也能做",
      "Codex、Claude Code 和 Cursor 通过范围受控的工具，执行与界面相同的设计、仿真和项目命令",
    ],
    note: "DeepSeek Harness 和 Pi 提出修改；由你来应用。",
    blocks: {
      agent: "Agent",
      human: "人",
      context: "上下文管理",
      gui: "GUI",
      api: "统一 API",
      core: "Core",
      plugins: "插件",
      task: "任务",
      operation: "操作",
      object: "对象",
    },
    clipLabel: "架构",
  },
  workspace: {
    title: "一个统一的工作区",
    bullets: ["从原理图到 PCB 和 3D", "直接编辑，或引导你的 agent"],
    clipLabel: "统一工作区",
  },
  verify: {
    title: "设计并验证",
    bullets: ["搭建并调节可编辑电路", "用 ngspice 验证结果"],
    stat: "R15 39.0 → 38.1 kΩ · 输出在 ±1% 以内（11.99–12.05 V）",
    legend: { baseline: "基线", tuned: "调节后", band: "±1% 区间" },
    clipLabel: "ngspice 验证",
  },
  mark: {
    title: "标记并细化",
    bullets: [
      "在原理图或电路板上标出区域并留下注释",
      "你的 agent 只细化那一部分：旋转、重新走线、对比",
    ],
    note: "标记是随下一条消息发送的截图；它们不会自行修改设计。",
    comment: "能否把 D7 和 C19 转一下，让焊盘对齐得更好？",
    shorter: "缩短 47%",
    from: "39.9",
    to: "21.2",
    unit: "mm",
    copper: "SEC copper",
    clipLabel: "标记并细化",
  },
  place: {
    title: "在引导下放置",
    bullets: ["预览位置和角度", "用 Tab 放置这一组"],
    clipLabel: "引导放置",
  },
  case: {
    title: "制作外壳",
    bullets: ["按尺寸在 3D 中建模", "细化外壳并装上透明盖"],
    prompt: "能否加一个透明亚克力盖？厚度做成 3 mm。",
    clipLabel: "外壳模型",
  },
  chrome: {
    userComment: "用户注释",
    add: "添加",
    userPrompt: "用户提示",
    before: "之前",
    after: "之后",
  },
  plugins: {
    title: "扩展你的工作台",
    bullets: [
      "插件把工作室连接到实际工程",
      "安装你自己的 JavaScript 插件：沙箱运行，没有原生或网络访问",
    ],
    cards: [
      { name: "SPICE Simulation", detail: "ngspice 47 瞬态" },
      { name: "Layout Thermal", detail: "Gmsh + Elmer，PCB 温度" },
      { name: "Layout Parasitics", detail: "焊盘到焊盘的直流电阻与部分电感" },
      { name: "EMC Analysis", detail: "几何审查，不是合规判定" },
      { name: "PE Layout Skill", detail: "随附的布局指导" },
    ],
    yours: "你的插件",
    thermalCaption: "峰值 PCB 温度 67.7 °C",
    parasiticsCaption: "30.30 mΩ · 17.61 nH",
    thermalLabel: "PCB 温度",
    parasiticsLabel: "布局寄生参数",
    wallLabel: "插件墙",
  },
  privacy: {
    title: "设计上即本地优先",
    bullets: [
      "没有 OpenPE 云：没有账户，没有 OpenPE 服务器，没有遥测",
      "你的设计以原生 KiCad 文件留在自己的机器上",
      "提示词只发给你选择的 AI 提供方，经由它自己的 CLI 或 SDK",
    ],
    machine: "你的机器",
    machineItems: ["OpenPE", "项目文件", "本地 agent CLI"],
    onlyTo: "只发往",
    provider: "你选择的 AI 提供方",
    agents: ["Codex", "Claude Code", "Cursor", "DeepSeek Harness", "Pi"],
    note: "元件库、价格和数据手册查询直接联系相应厂商。Cursor API key 通过 Electron safeStorage，用操作系统钥匙串加密。",
    clipLabel: "本地 agent",
  },
  native: {
    title: "原生且开放",
    items: [
      "原生 KiCad 10 文件：未改动的文件保持原来的字节",
      "全项目撤销，以及本地 Git 历史",
      "Apache-2.0 开源",
      "Windows x64 · macOS arm64 · Linux x64",
    ],
  },
  closing: {
    lead: "你接下来要",
    power: "驱动",
    rest: "什么，",
    engineer: "Engineer？",
    cta: "GitHub",
    imageLabel: "装壳后的电路板",
  },
  team: {
    title: "团队与联系",
    developers: "核心开发者",
    institutions: "团队与机构",
    pending: "待公布",
    contact: "联系",
    github: "GitHub 组织",
  },
  footer: {
    license: "Apache-2.0",
    copyright: "© OpenPE contributors",
    github: "GitHub",
    notices:
      "第三方声明：Inter 以 SIL Open Font License 授权。求解器、文件格式和提供方的名称归各自所有者。",
  },
} satisfies Content

export const content: Record<Lang, Content> = { en, zh }
