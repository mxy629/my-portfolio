export type Lang = 'zh' | 'en';

export interface ServiceCopy {
  number: string;
  name: string;
  description: string;
}

export interface PlanCopy {
  number: string;
  name: string;
  price: string;
  unit?: string;
  description: string;
}

export interface ProjectCopy {
  number: string;
  name: string;
  category: string;
}

export interface Copy {
  meta: {
    title: string;
  };
  nav: {
    about: string;
    price: string;
    projects: string;
    contact: string;
  };
  hero: {
    heading: string;
    /** Per-language vw scale: CJK glyphs are a full em wide, so they need a smaller size. */
    headingSize: string;
    /**
     * Per-language top margin. Latin caps only occupy ~72% of the em box, so
     * the spec's `-mt-5` trims dead leading without touching the glyphs. CJK
     * fills the em box edge to edge, so the same negative margin both clips the
     * glyph tops and collides with the navbar.
     */
    headingMargin: string;
    tagline: string;
    portraitAlt: string;
  };
  /** Shared call-to-action labels, reused across hero / about / contact. */
  cta: {
    contact: string;
  };
  about: {
    heading: string;
    body: string;
  };
  services: {
    heading: string;
    items: ServiceCopy[];
  };
  price: {
    heading: string;
    plans: PlanCopy[];
  };
  projects: {
    heading: string;
    detailAlt: string;
    heroAlt: string;
    items: ProjectCopy[];
  };
  contact: {
    heading: string;
    body: string;
    email: string;
  };
}

/**
 * 联系邮箱**不写死在源码里**。
 *
 * 这个仓库会推到公开的 GitHub，硬编码的邮箱（尤其是 QQ 邮箱 —— 它等价于把 QQ 号
 * 公之于众）会被搜索引擎和爬虫直接抓走。所以改从环境变量读取：
 *   - 本地开发：在 `.env.local` 写 `VITE_CONTACT_EMAIL=...`（该文件已被 .gitignore 忽略）
 *   - 线上构建：在 GitHub 仓库 Settings → Secrets and variables → Actions 配置同名 Secret
 *
 * 未配置时为空字符串，联系区会自动隐藏邮箱那一行，不会渲染出空链接。
 */
const EMAIL: string = import.meta.env.VITE_CONTACT_EMAIL ?? '';

const en: Copy = {
  meta: { title: 'Jack — 3D Creator' },
  nav: { about: 'About', price: 'Price', projects: 'Projects', contact: 'Contact' },
  hero: {
    heading: "Hi, i'm Meixy",
    // Same 13-glyph shape as the original "Hi, i'm jack" line, so the spec's
    // vw curve is scaled by ~0.9 to absorb the wider "MEIXY" word.
    headingSize: 'text-[12.6vw] sm:text-[13.5vw] md:text-[14.4vw] lg:text-[15.7vw]',
    headingMargin: 'mt-6 sm:mt-4 md:-mt-5',
    tagline: 'a fresh graduate — if you have a way to get rich, get in touch',
    portraitAlt: 'Meixy',
  },
  cta: { contact: 'Contact Me' },
  about: {
    heading: 'About me',
    body: "Hi everyone. There is nothing particularly special about this site, but welcome all the same. Alright — go ahead and scroll away.",
  },
  services: {
    heading: 'Services',
    items: [
      {
        number: '01',
        name: 'Eating',
        description:
          'A serious commitment to every meal — whether it is a quick home-style dish or a late-night snack, it deserves to be sat down for and finished properly.',
      },
      {
        number: '02',
        name: 'Sleeping',
        description:
          'Guaranteed rest, afternoon naps and second sleep included. Recharging properly is a daily non-negotiable.',
      },
      {
        number: '03',
        name: 'Playing Tennis',
        description:
          'From baseline rallies to net play — a single match is enough to burn off every last bit of spare energy.',
      },
      {
        number: '04',
        name: 'Studying',
        description:
          'Keeping the intake steady — reading, lectures, and notes, filing new things away one small piece at a time.',
      },
      {
        number: '05',
        name: 'Dancing',
        description:
          'Learning rhythm with the body. Rehearsal or freestyle, it is the best way to say something without any words.',
      },
    ],
  },
  price: {
    heading: 'Price',
    plans: [
      {
        number: '01',
        name: "Valentine's Day",
        price: '¥520',
        unit: '/ session',
        description:
          'A wake-up call with a proper good-morning greeting — on time, every time, to start your day off right.',
      },
      {
        number: '02',
        name: 'Chinese New Year',
        price: '¥888',
        unit: '/ session',
        description:
          'Seven-day companionship — from New Year\u2019s Eve through day six, always around to chat, hang out, and eat with you.',
      },
      {
        number: '03',
        name: 'Thesis Writing',
        price: '¥1,888',
        unit: '/ paper',
        description:
          'An end-to-end package covering both the program and the written thesis — from code to final draft, handled throughout.',
      },
    ],
  },
  projects: {
    heading: 'Project',
    detailAlt: 'detail',
    heroAlt: 'hero image',
    items: [
      { number: '01', name: 'Nextlevel Studio', category: 'Client' },
      { number: '02', name: 'Aura Brand Identity', category: 'Personal' },
      { number: '03', name: 'Solaris Digital', category: 'Client' },
    ],
  },
  contact: {
    heading: 'Contact',
    body: 'Everyone is welcome to get in touch.',
    email: EMAIL,
  },
};

const zh: Copy = {
  meta: { title: 'Jack — 3D 创作者' },
  nav: { about: '关于', price: '价格', projects: '项目', contact: '联系' },
  hero: {
    heading: '嗨，我是季节',
    // 六个全角字符 ≈ 6em，按 100vw 反推约 15.7vw 刚好铺满
    headingSize: 'text-[14.5vw] sm:text-[15vw] md:text-[15.4vw] lg:text-[15.7vw]',
    headingMargin: 'mt-6 sm:mt-5 md:mt-6',
    tagline: '我是一名刚毕业的大学生，有发财途径的联系我',
    portraitAlt: '季节',
  },
  cta: { contact: '联系我' },
  about: {
    heading: '关于我',
    body: '大家好，这个网站没什么特别的，但是欢迎大家来到这里。好了，划走吧。',
  },
  services: {
    heading: '服务',
    items: [
      {
        number: '01',
        name: '吃饭',
        description: '认真对待每一顿饭——无论是家常小炒还是深夜加餐，都值得坐下来好好吃完。',
      },
      {
        number: '02',
        name: '睡觉',
        description: '保障充足睡眠，午休与回笼觉一并包含在内，恢复精力是每天的必修课。',
      },
      {
        number: '03',
        name: '打网球',
        description: '从底线对拉到网前截击，一场球就足以把多余的精力全部消耗干净。',
      },
      {
        number: '04',
        name: '学习',
        description: '保持持续输入——看书、听课、做笔记，把新东西一点点装进脑子里。',
      },
      {
        number: '05',
        name: '舞蹈',
        description: '用身体记住节奏，无论是排练还是随性起舞，都是最好的表达方式。',
      },
    ],
  },
  price: {
    heading: '价格',
    plans: [
      {
        number: '01',
        name: '情人节',
        price: '¥520',
        unit: '/ 次',
        description: '早安问候叫醒服务——准时来电，用一句真诚的问候开启你的一天。',
      },
      {
        number: '02',
        name: '春节',
        price: '¥888',
        unit: '/ 次',
        description: '七日陪伴服务——从除夕到初六，全程陪聊、陪玩、陪吃，绝不缺席。',
      },
      {
        number: '03',
        name: '论文代写',
        price: '¥1,888',
        unit: '/ 篇',
        description: '论文程序加论文正文一条龙服务——从代码到成稿，全程包办。',
      },
    ],
  },
  projects: {
    heading: '项目',
    detailAlt: '细节图',
    heroAlt: '主视觉',
    items: [
      { number: '01', name: 'Nextlevel Studio', category: '客户项目' },
      { number: '02', name: 'Aura Brand Identity', category: '个人项目' },
      { number: '03', name: 'Solaris Digital', category: '客户项目' },
    ],
  },
  contact: {
    heading: '联系',
    body: '欢迎大家联系我',
    email: EMAIL,
  },
};

export const copy: Record<Lang, Copy> = { en, zh };

export const LANGS: Lang[] = ['zh', 'en'];
