import type { Chapter } from "@/content/site.ts"
import type { SchoolId } from "@/content/team.ts"

export type Lang = "en" | "zh"

type Step = { chapter: string; caption: string }
type Plugin = { name: string; body: string }
type Term = { name: string; body: string }

export type Content = {
  meta: { title: string }
  nav: Record<Chapter, string> & { github: string; menu: string; switchLang: string; primaryLabel: string; footerLabel: string }
  hero: {
    openSource: string
    foundations: string
    titleMain: string
    titleFor: string
    titleDomain: string
    titleRole: string
    download: string
  }
  film: { title: string; caption: string; play: string }
  workspace: { title: string; imageAlt: string; parts: readonly Term[] }
  workflow: { title: string; steps: readonly Step[] }
  agents: {
    title: string
    storage: string
    providerContext: string
    more: string
    architecture: {
      title: string
      description: string
      agent: string
      human: string
      context: string
      gui: string
      api: string
      core: Term
      plugins: Term
    }
  }
  plugins: {
    title: string
    thermal: Plugin
    spice: Plugin
    emc: Plugin
    parasitics: Plugin
    skill: Plugin
    yours: { name: string; run: string; reset: string; output: string; ready: string }
  }
  team: {
    title: string
    core: string
    institutions: string
    schoolNames: Record<SchoolId, readonly [string, string]>
  }
  footer: { license: string }
}

const en: Content = {
  meta: { title: "OpenPE · AI-Native Workbench for Power Electronics Engineer" },
  nav: {
    workspace: "Workspace",
    workflow: "Workflow",
    agents: "Agents",
    plugins: "Plugins",
    team: "Team",
    github: "GitHub",
    menu: "Menu",
    switchLang: "Switch to Chinese",
    primaryLabel: "Primary navigation",
    footerLabel: "Footer navigation",
  },
  hero: {
    openSource: "Open source",
    foundations: "Built with open source",
    titleMain: "AI-Native Workbench",
    titleFor: "for",
    titleDomain: "Power Electronics",
    titleRole: "Engineer",
    download: "Download",
  },
  film: {
    title: "Watch the workflow",
    caption: "EMC Flyback",
    play: "Play the demo",
  },
  workspace: {
    title: "Design alongside your Agent",
    imageAlt: "OpenPE desktop with the EMC Flyback layout open and transformer T1 selected",
    parts: [
      { name: "Session manager", body: "Switch between conversations." },
      { name: "Agent interface", body: "Discuss and request edits." },
      { name: "Design workspace", body: "Open Schematic, Layout, Model or Source." },
      { name: "Properties", body: "Inspect or edit the selection." },
    ],
  },
  workflow: {
    title: "From schematic to enclosure",
    steps: [
      {
        chapter: "Schematic",
        caption: "Tune feedback in ngspice.",
      },
      {
        chapter: "Layout",
        caption: "Place parts and send comments.",
      },
      {
        chapter: "Module",
        caption: "Model the enclosure and lid.",
      },
    ],
  },
  agents: {
    title: "Work with your local Agent",
    storage: "Projects stay in native KiCad files.",
    providerContext: "The AI provider you choose receives the prompts and context you send.",
    more: "More Agents",
    architecture: {
      title: "OpenPE architecture",
      description: "The GUI supplies project context to the Agent. Both share the Uniform API for Core and plugin capabilities.",
      agent: "Agent",
      human: "Human",
      context: "Context Management",
      gui: "GUI",
      api: "Uniform API",
      core: { name: "Core", body: "Schematic · PCB · Model" },
      plugins: { name: "Plugins", body: "Analysis and extensions" },
    },
  },
  plugins: {
    title: "Extend the workbench",
    thermal: {
      name: "Layout Thermal",
      body: "Map PCB temperatures with Gmsh and Elmer.",
    },
    spice: {
      name: "SPICE Simulation",
      body: "Run a transient from the schematic.",
    },
    emc: {
      name: "EMC Analysis",
      body: "Review PCB geometry for EMC risks.",
    },
    parasitics: {
      name: "Layout Parasitics",
      body: "Extract pad-to-pad DC resistance and partial inductance.",
    },
    skill: {
      name: "PE Layout Skill",
      body: "Guide power-electronics PCB design and review.",
    },
    yours: {
      name: "Your plugin",
      run: "Run",
      reset: "Reset",
      output: "Sample output",
      ready: "Run to count parts.",
    },
  },
  team: {
    title: "The OpenPE team",
    core: "Authors",
    institutions: "Universities",
    schoolNames: {
      berkeley: ["University of", "California, Berkeley"],
      ucla: ["University of", "California, Los Angeles"],
      mit: ["Massachusetts", "Institute of Technology"],
      glasgow: ["University of", "Glasgow"],
      eindhoven: ["Eindhoven University", "of Technology"],
      westlake: ["Westlake", "University"],
    },
  },
  footer: {
    license: "Apache-2.0 · © 2026 OpenPE contributors",
  },
}

const zh: Content = {
  meta: { title: "OpenPE · 面向电力电子工程师的 AI 原生工作台" },
  nav: {
    workspace: "工作区",
    workflow: "工作流",
    agents: "Agent",
    plugins: "插件",
    team: "团队",
    github: "GitHub",
    menu: "菜单",
    switchLang: "切换到英文",
    primaryLabel: "主导航",
    footerLabel: "页脚导航",
  },
  hero: {
    openSource: "开源",
    foundations: "基于开源技术",
    titleMain: "AI 原生工作台",
    titleFor: "面向",
    titleDomain: "电力电子",
    titleRole: "工程师",
    download: "下载",
  },
  film: {
    title: "工作流演示",
    caption: "EMC Flyback",
    play: "播放演示",
  },
  workspace: {
    title: "与 Agent 协作设计",
    imageAlt: "OpenPE 桌面端的 EMC Flyback PCB 布局，已选中变压器 T1",
    parts: [
      { name: "会话管理", body: "切换对话。" },
      { name: "Agent 对话", body: "和 Agent 讨论设计并提出修改请求。" },
      { name: "设计工作区", body: "在原理图、PCB 布局、三维建模和源文件视图间切换。" },
      { name: "属性面板", body: "查看或编辑所选对象。" },
    ],
  },
  workflow: {
    title: "从原理图到外壳",
    steps: [
      {
        chapter: "原理图",
        caption: "调整反馈分压电阻，并用 ngspice 验证输出电压。",
      },
      {
        chapter: "PCB 布局",
        caption: "放置 PCB 元件，并将布局批注发给 Agent。",
      },
      {
        chapter: "外壳建模",
        caption: "为电路板的外壳和上盖建模。",
      },
    ],
  },
  agents: {
    title: "与本地 Agent 协作",
    storage: "工程以 KiCad 原生格式保存在本地。",
    providerContext: "所选 AI 服务商会收到你发送的提示词和上下文。",
    more: "更多 Agent",
    architecture: {
      title: "OpenPE 架构",
      description: "图形界面向 Agent 提供工程上下文。两者通过统一 API 使用核心与插件功能。",
      agent: "Agent",
      human: "用户",
      context: "上下文管理",
      gui: "图形界面",
      api: "统一 API",
      core: { name: "核心", body: "原理图、PCB 布局与建模" },
      plugins: { name: "插件", body: "分析工具与扩展" },
    },
  },
  plugins: {
    title: "扩展工作台",
    thermal: {
      name: "Layout Thermal",
      body: "用 Gmsh 和 Elmer 计算 PCB 温度分布。",
    },
    spice: {
      name: "SPICE Simulation",
      body: "基于原理图进行瞬态仿真。",
    },
    emc: {
      name: "EMC Analysis",
      body: "根据 PCB 几何结构检查潜在的 EMC 风险。",
    },
    parasitics: {
      name: "Layout Parasitics",
      body: "提取两个焊盘之间的直流电阻和部分电感。",
    },
    skill: {
      name: "PE Layout Skill",
      body: "指导电力电子 PCB 设计与审查。",
    },
    yours: {
      name: "自定义插件",
      run: "运行",
      reset: "重置",
      output: "示例输出",
      ready: "运行后显示元件数量。",
    },
  },
  team: {
    title: "OpenPE 团队",
    core: "作者",
    institutions: "院校",
    schoolNames: {
      berkeley: ["加州大学", "伯克利分校"],
      ucla: ["加州大学", "洛杉矶分校"],
      mit: ["麻省", "理工学院"],
      glasgow: ["格拉斯哥", "大学"],
      eindhoven: ["埃因霍温", "理工大学"],
      westlake: ["西湖", "大学"],
    },
  },
  footer: {
    license: "Apache-2.0 · © 2026 OpenPE 贡献者",
  },
}

export const closingCopy = {
  line1: "What will you",
  power: "Power",
  between: " next, ",
  engineer: "Engineer",
} as const

export const content: Record<Lang, Content> = { en, zh }
