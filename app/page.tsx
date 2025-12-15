"use client";

import { useMemo, useState } from "react";

type LanguageOption = {
  id: "en" | "hi" | "hinglish";
  label: string;
  sampleGreeting: string;
  description: string;
};

type PersonaOption = {
  id: "educator" | "storyteller" | "hustler" | "coach" | "explorer";
  label: string;
  tone: string;
  hookStyle: string;
  strengths: string[];
};

type ContentPillar = {
  title: string;
  summary: string;
  signatureFormats: string[];
};

type VideoIdea = {
  title: string;
  hook: string;
  description: string;
  format: string;
  cta: string;
  tags: string[];
};

type MonetizationTrack = {
  title: string;
  plan: string;
};

type Niche = {
  id:
    | "tech-productivity"
    | "personal-finance"
    | "fitness-habit"
    | "storytime-knowledge"
    | "culinary-lab"
    | "travel-culture";
  label: string;
  headline: string;
  description: string;
  nameTemplates: string[];
  taglines: string[];
  identityAngles: string[];
  contentPillars: ContentPillar[];
  ideaPool: VideoIdea[];
  monetization: MonetizationTrack[];
  collabIdeas: string[];
  heroPlaylist: string[];
  communityPrompts: string[];
};

type CreatorProfile = {
  nicheId: Niche["id"];
  personaId: PersonaOption["id"];
  languageId: LanguageOption["id"];
  uploadsPerWeek: number;
  signatureStrength: string;
};

type ChannelBlueprint = {
  channelName: string;
  tagline: string;
  positioning: string;
  pillars: ContentPillar[];
  calendar: {
    week: number;
    theme: string;
    videos: VideoIdea[];
  }[];
  monetization: MonetizationTrack[];
  collabIdeas: string[];
  communityPrompts: string[];
  fastActions: string[];
};

const LANGUAGES: LanguageOption[] = [
  {
    id: "en",
    label: "English",
    sampleGreeting: "Hey creators!",
    description: "Clean international tone for broad reach"
  },
  {
    id: "hi",
    label: "Hindi",
    sampleGreeting: "Namaste dosto!",
    description: "Pure Hindi delivery with cultural references"
  },
  {
    id: "hinglish",
    label: "Hinglish",
    sampleGreeting: "What's up dosto!",
    description: "Blend of Hindi & English that feels native and youthful"
  }
];

const PERSONAS: PersonaOption[] = [
  {
    id: "educator",
    label: "Calm Educator",
    tone: "clear, structured explainer with visuals",
    hookStyle: "Start with a crisp promise or statistic",
    strengths: ["Deep dives", "Frameworks", "Case studies"]
  },
  {
    id: "storyteller",
    label: "Relatable Storyteller",
    tone: "narrative-first with emotional arcs",
    hookStyle: "Open with a personal story or cliffhanger",
    strengths: ["Anecdotes", "Character driven", "Cinematic pacing"]
  },
  {
    id: "hustler",
    label: "Action Hustler",
    tone: "high-energy, step-by-step playbooks",
    hookStyle: "Lead with a challenge and a bold claim",
    strengths: ["Challenges", "Speed builds", "Tools & templates"]
  },
  {
    id: "coach",
    label: "Accountability Coach",
    tone: "motivational, supportive, habit-focused",
    hookStyle: "Paint the future state or transformation",
    strengths: ["Habit systems", "Checklists", "Live tracking"]
  },
  {
    id: "explorer",
    label: "Curious Explorer",
    tone: "documentary-style, discover and react",
    hookStyle: "Start with a surprising find or question",
    strengths: ["Discovery", "Comparisons", "Field vlogs"]
  }
];

const NICHES: Niche[] = [
  {
    id: "tech-productivity",
    label: "Tech & Productivity",
    headline: "Smart tools that give people back their time",
    description:
      "Break down AI, automation, and digital systems so busy professionals can work smarter without burnout.",
    nameTemplates: [
      "{persona} Tech Playbook",
      "{languageNoun} Time Hackers",
      "{strength} Systems Lab",
      "Workflow by {signature}" 
    ],
    taglines: [
      "Daily systems to multiply your focus",
      "AI + habits = unstoppable productivity",
      "Stop scrolling tools, start building workflows"
    ],
    identityAngles: [
      "Turns complex automations into step-by-step templates",
      "Tests every new app so viewers don't waste time",
      "Shares behind-the-scenes setups and Notion builds"
    ],
    contentPillars: [
      {
        title: "Automation Deep Dives",
        summary: "Visual breakdowns of AI and no-code systems that save hours.",
        signatureFormats: ["Live build tutorials", "Use-case storytelling", "Before/after demos"]
      },
      {
        title: "Creator Workflows",
        summary: "Share your personal dashboards, templates, and weekly reviews.",
        signatureFormats: ["Desk tours", "Template walk-through", "1-hour build challenges"]
      },
      {
        title: "Productivity Experiments",
        summary: "Rapid experiments with routines, apps, and mental models.",
        signatureFormats: ["7-day sprint logs", "Split tests", "Community challenges"]
      }
    ],
    ideaPool: [
      {
        title: "5 AI Tools That Run Your Side Hustle While You Sleep",
        hook: "I asked AI to run my business for a week—here's what actually worked.",
        description: "Break down each automation with Zapier, Notion, and voice agents, showing real outputs.",
        format: "Screen-record tutorial",
        cta: "Download my automation map to copy this setup",
        tags: ["AI automation", "Side hustle tools", "Passive systems"]
      },
      {
        title: "My 3-Layer Notion Second Brain for 2024",
        hook: "If your to-do list keeps failing, build this second brain instead.",
        description: "Tour the capture, clarify, and execution dashboards you use daily.",
        format: "Workspace walk-through",
        cta: "Grab the Notion template linked below",
        tags: ["Notion", "Productivity", "Templates"]
      },
      {
        title: "24 Hour Automation Challenge",
        hook: "I tried to automate everything I do in a day—here's what stayed manual.",
        description: "Document attempts, wins, and fails in vlog style with cost/time saved.",
        format: "Challenge vlog",
        cta: "Comment the next process I should automate",
        tags: ["Productivity challenge", "Automation", "Vlog"]
      },
      {
        title: "Top 7 Chrome Extensions for Creators",
        hook: "These extensions do the boring work so you can focus on creating.",
        description: "Quick hits with on-screen timers showing time saved per tool.",
        format: "Listicle with B-roll",
        cta: "Hit like if you want a Notion database of these tools",
        tags: ["Chrome extensions", "Creator stack", "Tools"]
      },
      {
        title: "Build a Personal CRM in 30 Minutes",
        hook: "Never forget an important relationship again with this Notion setup.",
        description: "Step-by-step build with relationship tagging, reminders, and automations.",
        format: "Live build tutorial",
        cta: "Download the template and send it to an accountability partner",
        tags: ["Personal CRM", "Networking", "Notion"]
      },
      {
        title: "Morning Routine for Deep Work",
        hook: "A 90-minute pre-work ritual that doubles my creative output.",
        description: "Share biohacks, planning, and tech stack to enter flow state fast.",
        format: "Routine breakdown",
        cta: "Try the routine tomorrow and share your focus score",
        tags: ["Deep work", "Morning routine", "Habits"]
      },
      {
        title: "The Ultimate YouTube Production Spreadsheet",
        hook: "Every viral video on my channel started in this template.",
        description: "Walk through ideation, scripting, and analytics tracking tabs.",
        format: "Template tour",
        cta: "Download the spreadsheet and tag me when you ship",
        tags: ["Content system", "YouTube workflow", "Templates"]
      },
      {
        title: "Real vs. Hype: Testing 10 Viral Productivity Hacks",
        hook: "I tried every trending hack so you don't have to.",
        description: "Rank each hack with data and whether it earned a permanent spot.",
        format: "Myth-busting review",
        cta: "Drop the hack I should test next",
        tags: ["Productivity hacks", "Myth busting", "Data"]
      },
      {
        title: "Turn Notion into a Command Center",
        hook: "If you manage multiple projects, this dashboard keeps everything synced.",
        description: "Show task dependencies, content calendar, and automation triggers.",
        format: "Advanced tutorial",
        cta: "Access the command center build along guide",
        tags: ["Dashboard", "Project management", "Notion"]
      },
      {
        title: "How I Script High-Retention Videos",
        hook: "This beat sheet keeps viewers watching till the end.",
        description: "Reveal your scripting template with examples and editing notes.",
        format: "Process explainer",
        cta: "Comment 'script' for the template",
        tags: ["Scripting", "Retention", "Editing"]
      },
      {
        title: "Weekly Reset: The 4-Step Sunday Ritual",
        hook: "I never start Monday overwhelmed thanks to this reset.",
        description: "Show review, plan, clean, and prepare steps with overlay graphics.",
        format: "Reset vlog",
        cta: "Share your Sunday ritual in the comments",
        tags: ["Weekly reset", "Habits", "Planning"]
      },
      {
        title: "Turn ChatGPT into Your Editor",
        hook: "The prompts I use to polish scripts in 5 minutes.",
        description: "Teach prompt stacks for ideation, structuring, and punch-up.",
        format: "Prompt tutorial",
        cta: "Grab the prompt pack PDF",
        tags: ["ChatGPT", "Scripting", "AI"]
      }
    ],
    monetization: [
      {
        title: "Notion Template Packs",
        plan: "Bundle your automation dashboards and sell on Gumroad after video 6."
      },
      {
        title: "Cohort-Based Bootcamp",
        plan: "Launch a 4-week productivity sprint with weekly live builds by month 3."
      },
      {
        title: "Tool Affiliate Stack",
        plan: "Share your automation stack with affiliate links in pinned comments."
      }
    ],
    collabIdeas: [
      "Automate a popular creator's workflow live on their channel",
      "Swap Notion dashboards with a finance YouTuber and review each other",
      "Guest on podcasts about solopreneur systems"
    ],
    heroPlaylist: [
      "AI workflow breakdowns",
      "Template tours",
      "Productivity experiments"
    ],
    communityPrompts: [
      "Share the biggest bottleneck in your current workflow",
      "Drop an automation you can't live without",
      "Post a screenshot of your Notion setup using #WorkflowWednesday"
    ]
  },
  {
    id: "personal-finance",
    label: "Personal Finance",
    headline: "Build wealth playbooks for first-generation investors",
    description:
      "Demystify money for young earners using relatable scenarios, culturally-aware tips, and simple actions.",
    nameTemplates: [
      "{persona} Money Blueprint",
      "Naya Paisa with {signature}",
      "Weekend Wealth Werkshop",
      "{languageNoun} Finance Insider"
    ],
    taglines: [
      "Street-smart money moves for the new India",
      "Make every salary slip count",
      "Money habits that build generational freedom"
    ],
    identityAngles: [
      "Turns complex policies into bite-sized cheat sheets",
      "Shares personal wins and losses from the Indian money journey",
      "Shows systems for saving, investing, and enjoying responsibly"
    ],
    contentPillars: [
      {
        title: "Salary to Wealth Systems",
        summary: "Monthly playbooks for TDS, budgeting, and debt payoff.",
        signatureFormats: ["First salary makeovers", "Expense tracker builds", "Percent allocation breakdowns"]
      },
      {
        title: "Investing Simplified",
        summary: "Explain mutual funds, index investing, and new asset classes without jargon.",
        signatureFormats: ["Portfolio teardowns", "Goal-based calculators", "Case-study storytelling"]
      },
      {
        title: "Lifestyle without Guilt",
        summary: "Show how to spend on travel, gadgets, and hobbies while still growing wealth.",
        signatureFormats: ["Cash flow diaries", "Savings challenges", "Smart luxury guides"]
      }
    ],
    ideaPool: [
      {
        title: "30-Day Salary Makeover",
        hook: "Turn your next paycheck into a growth machine with this 4-bucket plan.",
        description: "Walk through needs, goals, wealth, and joy buckets with exact percentages.",
        format: "Whiteboard explainer",
        cta: "Download the salary makeover sheet",
        tags: ["Budgeting", "Salary", "Money plan"]
      },
      {
        title: "Mutual Funds for Total Beginners",
        hook: "If SIP, NAV, and CAGR confuse you—watch this.",
        description: "Explain core concepts with animated graphics and relatable analogies.",
        format: "Animation + host",
        cta: "Start your first SIP with my checklist",
        tags: ["Mutual funds", "Investing basics", "SIP"]
      },
      {
        title: "How I Paid Off 5L of Debt in 14 Months",
        hook: "This is the exact stack of habits and automations I used.",
        description: "Share story, mistakes, and systems for snowballing debt.",
        format: "Story + framework",
        cta: "Tell me your payoff goal and I'll reply with a resource",
        tags: ["Debt payoff", "Money story", "Habits"]
      },
      {
        title: "Index Funds vs. Stock Picking",
        hook: "What actually grows faster in India 2024?",
        description: "Compare risk, returns, and time commitment with data.",
        format: "Data comparison",
        cta: "Comment your investor personality",
        tags: ["Index funds", "Stocks", "Comparison"]
      },
      {
        title: "Renter's Guide to Smart Living",
        hook: "Unlock tax savings, high-interest parking spots, and better landlord negotiations.",
        description: "Give actionable steps for urban renters in metros.",
        format: "Checklist explainer",
        cta: "Download the renter's negotiation script",
        tags: ["Renting", "Urban living", "Money hacks"]
      },
      {
        title: "Stop Wasting Bank Rewards",
        hook: "Optimize points, cashback, and hidden perks like a pro.",
        description: "Demonstrate reward stacking and the best card combos for different lifestyles.",
        format: "Card showdown",
        cta: "Share your current card stack for a personalised tip",
        tags: ["Credit cards", "Rewards", "Optimization"]
      },
      {
        title: "Recession-Proof Emergency Fund",
        hook: "Inflation is eating cash—here's the new place to park your buffer.",
        description: "Explain liquid funds, sweep accounts, and high-yield options.",
        format: "Scenario planning",
        cta: "Comment 'fund' for my calculator",
        tags: ["Emergency fund", "Inflation", "Savings"]
      },
      {
        title: "Money Talks with Parents",
        hook: "3 scripts to navigate tough conversations about finances at home.",
        description: "Role-play conversations covering support, boundaries, and planning.",
        format: "Role play",
        cta: "Tell me the convo you need help with next",
        tags: ["Family money", "Communication", "Scripts"]
      },
      {
        title: "Side Hustle Profit Tracker",
        hook: "Freelancers: stop bleeding cash with this simple tracker.",
        description: "Show income, tax, reinvest, and salary tabs.",
        format: "Template walk-through",
        cta: "Grab the tracker and start today",
        tags: ["Side hustle", "Tracking", "Spreadsheets"]
      },
      {
        title: "Investing for Weddings & Big Goals",
        hook: "Turn a 3-year wedding timeline into a stress-free plan.",
        description: "Match goals to instruments, from FDs to index funds and gold.",
        format: "Goal planner",
        cta: "Share your timeline for a custom suggestion",
        tags: ["Goal planning", "Weddings", "Savings"]
      },
      {
        title: "ETF Starter Portfolio",
        hook: "Build a diversified portfolio with just three funds.",
        description: "Show category picks and how to rebalance annually.",
        format: "Portfolio build",
        cta: "Comment ETF if you want the rebalancing guide",
        tags: ["ETFs", "Portfolio", "Rebalancing"]
      },
      {
        title: "52-Week Wealth Habit Challenge",
        hook: "One small money action every week to change your life.",
        description: "Lay out 12 themes with escalating challenges.",
        format: "Challenge roadmap",
        cta: "Screenshot the challenge and tag me on Instagram",
        tags: ["Money habits", "Challenge", "Accountability"]
      }
    ],
    monetization: [
      {
        title: "Finance Starter Kit",
        plan: "Bundle budget, tracker, and investment cheatsheets for ₹499."
      },
      {
        title: "Brand Partnerships",
        plan: "Partner with fintech apps for walkthroughs once trust metrics are strong."
      },
      {
        title: "Community Membership",
        plan: "Launch a Discord with AMAs and accountability pods at 1k subscribers."
      }
    ],
    collabIdeas: [
      "Budget makeover collab with a lifestyle vlogger",
      "Joint livestream decoding the markets with an economist",
      "Podcast swap with a career coach on salary negotiations"
    ],
    heroPlaylist: [
      "Salary to wealth transformations",
      "Investing basics",
      "Money & lifestyle balance"
    ],
    communityPrompts: [
      "Share your proudest money win of the week",
      "What's a financial term you want decoded?",
      "Drop your savings goal so the community can cheer you on"
    ]
  },
  {
    id: "fitness-habit",
    label: "Fitness & Habit Building",
    headline: "Practical fitness for people with real jobs and limited time",
    description:
      "Design micro-habits, minimal equipment routines, and mindset shifts that help viewers stay consistent.",
    nameTemplates: [
      "{persona} Habit Lab",
      "{languageNoun} Fit Project",
      "Momentum with {signature}",
      "Everyday Athlete Blueprint"
    ],
    taglines: [
      "Consistency beats perfection—train with systems",
      "Micro habits for busy bodies",
      "Realistic fitness that adapts to your life"
    ],
    identityAngles: [
      "Shows hybrid routines mixing strength, mobility, and fun",
      "Documents real client transformations and mindset wins",
      "Shares simple nutrition systems built for Indian kitchens"
    ],
    contentPillars: [
      {
        title: "Habit Frameworks",
        summary: "Design small routines that stack into a fit lifestyle.",
        signatureFormats: ["21-day habit journeys", "Habit scorecards", "Morning routines"]
      },
      {
        title: "Smart Training",
        summary: "Teach time-efficient workouts with progressive overload.",
        signatureFormats: ["Follow-along sessions", "Technique clinics", "Weekly training splits"]
      },
      {
        title: "Fuel Without Stress",
        summary: "Balanced meal preps and snack swaps for energy and recovery.",
        signatureFormats: ["Macro-friendly Indian meals", "Grocery hauls", "Meal planning"]
      }
    ],
    ideaPool: [
      {
        title: "7-Minute Morning Mobility Reset",
        hook: "Undo desk posture before you reach for coffee.",
        description: "Follow-along routine targeting spine, hips, and shoulders.",
        format: "Follow-along",
        cta: "Do it with me daily for 7 days and track your score",
        tags: ["Mobility", "Desk job", "Morning routine"]
      },
      {
        title: "Desk Worker Strength Blueprint",
        hook: "Three workouts a week to get strong without a gym membership.",
        description: "Demonstrate full-body workouts using resistance bands and bodyweight.",
        format: "Workout split",
        cta: "Download the 3-day workout plan",
        tags: ["Strength", "Home workout", "Bands"]
      },
      {
        title: "Protein on a Budget: Indian Edition",
        hook: "₹150 high-protein meals anyone can cook.",
        description: "Share 5 meals with macros, prep tips, and storage.",
        format: "Recipe series",
        cta: "Comment which meal you want a full prep video for",
        tags: ["Protein", "Budget meals", "Nutrition"]
      },
      {
        title: "Habit Tracker Makeover",
        hook: "Stop collecting empty checkboxes—build a tracker that actually works.",
        description: "Design a Notion or paper tracker focused on identity-based habits.",
        format: "System build",
        cta: "Grab the tracker template and share your streak",
        tags: ["Habit tracker", "Notion", "Consistency"]
      },
      {
        title: "Weekend Athlete Challenge",
        hook: "A two-day active routine that resets your body for the week.",
        description: "Blend hike, mobility, and recovery session with vlog storytelling.",
        format: "Vlog challenge",
        cta: "Tag your weekend athlete crew",
        tags: ["Active lifestyle", "Weekend", "Challenge"]
      },
      {
        title: "Fix Your Push-Up Form in 5 Steps",
        hook: "Most people waste strength here—check your form with me.",
        description: "Coach cues, regressions, and progressions with overlays.",
        format: "Technique clinic",
        cta: "Share your before/after video on Instagram",
        tags: ["Push-ups", "Form", "Tutorial"]
      },
      {
        title: "Meal Prep Blueprint for Busy Weeks",
        hook: "Cook once, eat clean all week with this simple system.",
        description: "Show 2 proteins, 2 carbs, 3 veggies with seasoning variations.",
        format: "Meal prep",
        cta: "Download the grocery list and rotation schedule",
        tags: ["Meal prep", "Nutrition", "Healthy eating"]
      },
      {
        title: "Sleep Ritual that Supercharges Recovery",
        hook: "One hour before bed: do these four things for deeper sleep.",
        description: "Share science-backed ritual with habit stacking.",
        format: "Night routine",
        cta: "Comment your current sleep score",
        tags: ["Sleep", "Recovery", "Habits"]
      },
      {
        title: "Hybrid Training Week in My Life",
        hook: "How I mix strength, conditioning, and mobility without burning out.",
        description: "Break down daily sessions, wearables data, and lifestyle choices.",
        format: "Week vlog",
        cta: "Follow for the complete programming guide",
        tags: ["Hybrid training", "Vlog", "Programming"]
      },
      {
        title: "Micro Habits that Burn 300 Extra Calories",
        hook: "Stack these movements into your day without formal workouts.",
        description: "Demonstrate NEAT boosters around the house/office.",
        format: "Tips montage",
        cta: "Share the habit you'll start today",
        tags: ["NEAT", "Micro habits", "Weight loss"]
      },
      {
        title: "Mental Reset Playbook",
        hook: "When you fall off the wagon, this 3-step reset gets you back.",
        description: "Coach through reflection, minimum viable action, and support.",
        format: "Mindset coaching",
        cta: "Save this for your next reset",
        tags: ["Mindset", "Reset", "Consistency"]
      },
      {
        title: "Smartwatch Data Deep Dive",
        hook: "What your wearable is telling you about recovery—and what to ignore.",
        description: "Break down readiness, HRV, and sleep metrics with planning tips.",
        format: "Data explainer",
        cta: "Comment your wearable for personalised guidance",
        tags: ["Wearable", "Data", "Recovery"]
      }
    ],
    monetization: [
      {
        title: "Habit Accelerator Cohort",
        plan: "8-week group with live workouts and accountability check-ins."
      },
      {
        title: "Nutrition Guides",
        plan: "Release seasonal meal prep guides paired with macros and grocery lists."
      },
      {
        title: "Brand Deals",
        plan: "Partner with athleisure and wellness brands after establishing credibility."
      }
    ],
    collabIdeas: [
      "Mobility session swap with a physiotherapist",
      "Co-host a challenge with a productivity YouTuber",
      "Guest vlogs training with athletes in different sports"
    ],
    heroPlaylist: [
      "21-day habit resets",
      "Follow-along workouts",
      "Healthy meal preps"
    ],
    communityPrompts: [
      "Drop your habit streak emoji today",
      "Share a photo of your meal prep setup",
      "What's one limiting belief you're crushing this week?"
    ]
  },
  {
    id: "storytime-knowledge",
    label: "Storytime Learning",
    headline: "Short, high-retention stories that teach uncommon knowledge",
    description:
      "Turn history, business, and psychology into binge-worthy stories with cinematic delivery.",
    nameTemplates: [
      "{persona} Story Lab",
      "{languageNoun} Fact Fiction",
      "Hidden Truths with {signature}",
      "Rabbit Hole Republic"
    ],
    taglines: [
      "Wild stories with the lesson intact",
      "Snackable knowledge bombs",
      "True tales that rewire how you think"
    ],
    identityAngles: [
      "Hunt for underdog stories that spark curiosity",
      "Use cliffhangers and visuals to make facts addictive",
      "Connect every story to a modern life takeaway"
    ],
    contentPillars: [
      {
        title: "Hidden History",
        summary: "Forgotten events and characters with modern relevance.",
        signatureFormats: ["Animated explainers", "Desk reenactments", "Map journeys"]
      },
      {
        title: "Business Plot Twists",
        summary: "Startup wins, fails, and pivots told like thrillers.",
        signatureFormats: ["Timeline breakdowns", "Character arcs", "Boardroom dramatization"]
      },
      {
        title: "Mind Benders",
        summary: "Psychology experiments and brain hacks that change behavior.",
        signatureFormats: ["Story + lesson", "Interactive challenges", "Perspective flips"]
      }
    ],
    ideaPool: [
      {
        title: "The Rickshaw Driver Who Built a Mini-Bank",
        hook: "He rewired his entire neighborhood's finances in 2 years.",
        description: "Narrate the story with receipts, visuals, and modern learnings.",
        format: "Story documentary",
        cta: "Share it with someone who loves underdog stories",
        tags: ["Inspiring", "Finance", "India"]
      },
      {
        title: "How a Typo Saved NASA Millions",
        hook: "One spelling mistake changed space history.",
        description: "Dramatize the incident and extract your key lessons.",
        format: "Animated timeline",
        cta: "Comment a crazy work mistake you've seen",
        tags: ["NASA", "Mistakes", "Innovation"]
      },
      {
        title: "The Psychology Trick Behind Viral Ads",
        hook: "Mad Men used this in the 60s—creators use it now.",
        description: "Break down the trick with modern brand examples.",
        format: "Story + analysis",
        cta: "Try it in your next script and tag me",
        tags: ["Marketing", "Psychology", "Ads"]
      },
      {
        title: "India's Forgotten Feminist Icon",
        hook: "She started schools when women weren't allowed to read.",
        description: "Tell her story with dramatized diary entries.",
        format: "Historical reenactment",
        cta: "Comment whose story I should tell next",
        tags: ["History", "Feminism", "India"]
      },
      {
        title: "Why Tokyo's Vending Machines Never Fail",
        hook: "37 secrets from the world's most efficient city.",
        description: "Reveal logistics, tech, and culture behind them.",
        format: "Visual tour",
        cta: "Share the smartest system you've seen",
        tags: ["Systems", "Japan", "Design"]
      },
      {
        title: "The Day Netflix Almost Died",
        hook: "They tried to sell themselves for $50M—Blockbuster said no.",
        description: "Narrate the pivot that birthed streaming.",
        format: "Business thriller",
        cta: "Send this to your co-founder",
        tags: ["Netflix", "Business", "Pivot"]
      },
      {
        title: "A 15-Year-Old's Experiment That Changed Medicine",
        hook: "A science project exposed a billion-dollar problem.",
        description: "Tell the story with recreated lab visuals.",
        format: "Story lab",
        cta: "Comment if I should interview them",
        tags: ["Medicine", "Experiment", "Youth"]
      },
      {
        title: "How Air India Won the World's Kindest Airline",
        hook: "Their inflight playbook is a masterclass in hospitality.",
        description: "Deconstruct the rituals and what brands can learn.",
        format: "Case study",
        cta: "Share your best airline experience",
        tags: ["Aviation", "Customer service", "Case study"]
      },
      {
        title: "The Street Magician Who Outsmarted the British",
        hook: "A performance artist turned spy and saved a movement.",
        description: "Reenact the mission with maps and props.",
        format: "Story reenactment",
        cta: "Tag a friend who loves spy stories",
        tags: ["Freedom fighters", "Spy", "History"]
      },
      {
        title: "The Math Problem That Took 100 Years",
        hook: "It looked impossible—until a school teacher solved it.",
        description: "Explain the journey with chalkboard visuals.",
        format: "Explainer + story",
        cta: "Tell me which mystery I should unpack next",
        tags: ["Math", "Mystery", "Education"]
      },
      {
        title: "The Scam Call Center That Became a Film School",
        hook: "They were trained to lie—until storytelling saved them.",
        description: "Twist-filled narrative with documentary footage.",
        format: "Mini documentary",
        cta: "Share your favourite redemption story",
        tags: ["Scam", "Redemption", "Story"]
      },
      {
        title: "Why Airports Sell Water So Expensive",
        hook: "There's a surprisingly strategic reason behind it.",
        description: "Break down operations, security, and behavioural economics.",
        format: "Story + economics",
        cta: "Comment the wildest airport pricing you've seen",
        tags: ["Airports", "Economics", "Story"]
      }
    ],
    monetization: [
      {
        title: "Digital Story Lab",
        plan: "Sell storytelling templates, B-roll packs, and script structures."
      },
      {
        title: "Speaking Gigs",
        plan: "Pitch keynote talks on storytelling for creators and startups."
      },
      {
        title: "Brand Narratives",
        plan: "Produce paid brand stories once the channel proves retention."
      }
    ],
    collabIdeas: [
      "Story swap with an investigative journalist",
      "Narrative breakdown with a filmmaker",
      "Live storytelling with a comedian"
    ],
    heroPlaylist: [
      "Business thrillers",
      "Hidden history",
      "Mind-bending experiments"
    ],
    communityPrompts: [
      "What's a story your grandparents told that more people should hear?",
      "Share a mind-blowing fact you discovered recently",
      "Vote on tomorrow's plot twist"
    ]
  },
  {
    id: "culinary-lab",
    label: "Culinary Lab",
    headline: "Modern Indian home cooking with science-backed flavor",
    description:
      "Teach easy, flavour-packed meals with cultural nostalgia and kitchen experiments.",
    nameTemplates: [
      "{persona} Kitchen Lab",
      "{languageNoun} Flavor Lab",
      "Plate Play with {signature}",
      "Spice Route Stories"
    ],
    taglines: [
      "Science-backed comfort food",
      "Desi flavours, global techniques",
      "Zero-waste meals for busy foodies"
    ],
    identityAngles: [
      "Uses food science to explain techniques",
      "Shares nostalgic recipes with modern twists",
      "Runs zero-waste kitchen experiments"
    ],
    contentPillars: [
      {
        title: "Weeknight Wins",
        summary: "Under 30-minute meals with grocery shortcuts.",
        signatureFormats: ["Pan-to-plate timers", "Ingredient swaps", "Meal plans"]
      },
      {
        title: "Flavor Experiments",
        summary: "Test myths and hacks to elevate classics.",
        signatureFormats: ["A/B taste tests", "Spice deep dives", "Fermentation diaries"]
      },
      {
        title: "Kitchen Systems",
        summary: "Organize, prep, and minimize waste like a pro.",
        signatureFormats: ["Prep Sundays", "Zero-waste challenges", "Gadget reviews"]
      }
    ],
    ideaPool: [
      {
        title: "3 High-Protein Dal Recipes",
        hook: "Upgrade the dal-chawal you already love.",
        description: "Cook masoor, moong, and chana dal with protein boosts and plating.",
        format: "Recipe trio",
        cta: "Download the spice map and macro chart",
        tags: ["High protein", "Dal", "Meal prep"]
      },
      {
        title: "5-Minute Chutney Science",
        hook: "Why mint chutney turns dark—fix it forever.",
        description: "Explain acid, salt, and blending hacks.",
        format: "Kitchen science",
        cta: "Share your family chutney secrets",
        tags: ["Chutney", "Food science", "Hack"]
      },
      {
        title: "Breakfast Meal Prep Without Boredom",
        hook: "One prep session = 5 unique breakfasts.",
        description: "Mix-and-match batters, spreads, and toppings.",
        format: "Prep guide",
        cta: "Screenshot the rotation chart",
        tags: ["Breakfast", "Meal prep", "Variety"]
      },
      {
        title: "Reinventing Maggi in 4 Gourmet Ways",
        hook: "Turn the hostel classic into a chef-level dish.",
        description: "Show street-style, Korean, Italian, and fusion bowls.",
        format: "Remix series",
        cta: "Vote for the next nostalgia upgrade",
        tags: ["Maggi", "Remix", "Comfort food"]
      },
      {
        title: "Zero-Waste Fridge Cleanse",
        hook: "Cook a full dinner using scraps and sad veggies.",
        description: "Document the challenge with recipe improvisations.",
        format: "Challenge vlog",
        cta: "Share your best zero-waste hack",
        tags: ["Zero waste", "Challenge", "Sustainability"]
      },
      {
        title: "Fermenting Basics for Indian Kitchens",
        hook: "Start with dosa batter, kimchi, and kanji without fancy gear.",
        description: "Show fermentation timelines with visuals.",
        format: "How-to",
        cta: "Download the fermentation schedule",
        tags: ["Fermentation", "Probiotic", "Gut health"]
      },
      {
        title: "Spice Pairing Masterclass",
        hook: "The science behind garam masala (and when to swap it).",
        description: "Break down base notes, aromatics, and finishing spices.",
        format: "Classroom explainer",
        cta: "Grab the printable spice wheel",
        tags: ["Spices", "Flavor", "Cooking class"]
      },
      {
        title: "Tiffin-ready Global Bowls",
        hook: "Packable meals inspired by Tokyo, Seoul, and Bangkok.",
        description: "Show layering, reheating tips, and sauces.",
        format: "Meal assembly",
        cta: "Download the tiffin packing guide",
        tags: ["Tiffin", "Global", "Meal prep"]
      },
      {
        title: "Desserts Without Refined Sugar",
        hook: "Gur, jaggery, and fruit-based sweets you can trust.",
        description: "Create three desserts with plating tips.",
        format: "Dessert series",
        cta: "Comment your festive craving",
        tags: ["Dessert", "Jaggery", "Healthy"]
      },
      {
        title: "Kitchen Gadgets Worth the Hype",
        hook: "I tested 7 trending tools—only 3 earned a spot.",
        description: "Review each with cleaning and storage tips.",
        format: "Review lab",
        cta: "Tell me which gadget to test next",
        tags: ["Gadgets", "Review", "Kitchen"]
      },
      {
        title: "Meal Planning for Mixed Diet Homes",
        hook: "Vegetarian + non-veg done without double work.",
        description: "Plan base dishes with modular proteins.",
        format: "Planning session",
        cta: "Download the shared pantry list",
        tags: ["Meal planning", "Family", "Diet"]
      },
      {
        title: "Street Food Secrets at Home",
        hook: "Recreate golgappa, pav bhaji, and momos with pro tips.",
        description: "Decode textures, sauces, and plating.",
        format: "Street food lab",
        cta: "Tag your street food squad",
        tags: ["Street food", "Recipes", "Tips"]
      }
    ],
    monetization: [
      {
        title: "Recipe Playbook PDFs",
        plan: "Sell themed bundles—weeknight dinners, festive menus, or vegan packs."
      },
      {
        title: "Kitchen Studio Workshops",
        plan: "Host paid livestream classes with ingredient kits via partners."
      },
      {
        title: "Brand Ingredient Partnerships",
        plan: "Collaborate with spice, cookware, and grocery brands for integrations."
      }
    ],
    collabIdeas: [
      "Cook-off with a nutritionist for macro-friendly versions",
      "Fusion recipe collab with a travel vlogger",
      "Zero-waste challenge with a sustainability creator"
    ],
    heroPlaylist: [
      "Weeknight wins",
      "Flavor experiments",
      "Kitchen systems"
    ],
    communityPrompts: [
      "What's the dish that defines home for you?",
      "Share a photo of your fridge clean-out meal",
      "Vote on the next nostalgia recipe"
    ]
  },
  {
    id: "travel-culture",
    label: "Travel & Culture",
    headline: "Document hidden gems, culture, and creator-friendly itineraries",
    description:
      "Inspire flexible travelers with smart planning, immersive storytelling, and budget-friendly experiences.",
    nameTemplates: [
      "{persona} Travel Log",
      "{languageNoun} Culture Quest",
      "TrailMix with {signature}",
      "Nomad Narrative"
    ],
    taglines: [
      "Slow travel guides for curious explorers",
      "Experience cities beyond the checklist",
      "Culture-rich itineraries for creators"
    ],
    identityAngles: [
      "Mixes cinematic visuals with planning breakdowns",
      "Shows remote work spots, cafes, and co-living tips",
      "Highlights local creators, artists, and communities"
    ],
    contentPillars: [
      {
        title: "Immersive Guides",
        summary: "City breakdowns mixing food, stays, and culture.",
        signatureFormats: ["48-hour itineraries", "Neighborhood walks", "Travel cinematic"]
      },
      {
        title: "Travel Systems",
        summary: "Teach planning frameworks, budgeting, and creator workflows on the go.",
        signatureFormats: ["Packing guides", "Budget breakdowns", "Remote work setup"]
      },
      {
        title: "Local Voices",
        summary: "Collaborate with locals to tell stories and spotlight culture.",
        signatureFormats: ["Interview vlogs", "Co-created itineraries", "Food crawls"]
      }
    ],
    ideaPool: [
      {
        title: "48 Hours in Pondicherry for Creators",
        hook: "Shoot, sip, and explore with this cinematic itinerary.",
        description: "Blend sunrise shots, cafe hopping, and beach drone footage.",
        format: "Itinerary vlog",
        cta: "Save this for your Pondy trip",
        tags: ["Pondicherry", "Itinerary", "Creator travel"]
      },
      {
        title: "Remote Work Setup in the Mountains",
        hook: "How to stay productive when the view is distracting.",
        description: "Show gear, wifi tests, workspace hacks, and time-blocking.",
        format: "Remote work guide",
        cta: "Comment your dream work view",
        tags: ["Remote work", "Mountains", "Setup"]
      },
      {
        title: "Food Crawl with a Local Grandmother",
        hook: "She knows every secret recipe in the old city.",
        description: "Document dishes, stories, and the cultural history behind them.",
        format: "Food documentary",
        cta: "Share a family food story",
        tags: ["Food crawl", "Culture", "Local guide"]
      },
      {
        title: "Budget vs. Bougie Weekend in Goa",
        hook: "Same city, two realities—watch both.",
        description: "Split-screen narrative of two different budgets.",
        format: "Comparison vlog",
        cta: "Vote for your travel style",
        tags: ["Goa", "Budget travel", "Luxury"]
      },
      {
        title: "Carry-On Capsule for 14 Days",
        hook: "Pack smarter with this mix-and-match system.",
        description: "Show outfits, laundry hacks, and packing cubes.",
        format: "Packing guide",
        cta: "Grab the packing checklist",
        tags: ["Packing", "Capsule wardrobe", "Travel hacks"]
      },
      {
        title: "How Locals Celebrate {Festival}",
        hook: "Experience the festival through the community's eyes.",
        description: "Highlight rituals, food, and meaning with VO.",
        format: "Festival doc",
        cta: "Tell me the festival I should cover next",
        tags: ["Festival", "Culture", "Tradition"]
      },
      {
        title: "Night Market Story Hunt",
        hook: "Find the most surprising story before midnight.",
        description: "Challenge format with storytelling focus.",
        format: "Challenge vlog",
        cta: "Suggest the next market to explore",
        tags: ["Night market", "Story", "Challenge"]
      },
      {
        title: "How Much Does a Creator Trip to {City} Cost?",
        hook: "Break down every rupee from flights to editing cafes.",
        description: "Show receipts, budgets, and savings hacks.",
        format: "Budget breakdown",
        cta: "Drop your budget for a custom plan",
        tags: ["Budget", "Creator travel", "Cost"]
      },
      {
        title: "Homestay Heroes",
        hook: "Meet the families redefining hospitality.",
        description: "Spotlight unique stays with storytelling.",
        format: "Mini documentary",
        cta: "Tag a homestay I should visit",
        tags: ["Homestay", "Hospitality", "Culture"]
      },
      {
        title: "Travel Filmmaking Workflow",
        hook: "Shoot, edit, and post while hopping cities.",
        description: "Share gear setup, file backups, and editing pipeline.",
        format: "Workflow tutorial",
        cta: "Comment your editing bottleneck",
        tags: ["Filmmaking", "Workflow", "Travel"]
      },
      {
        title: "Street Stories: Conversations with Strangers",
        hook: "Ask one deep question in every city.",
        description: "Compile thoughtful responses with cinematic visuals.",
        format: "Interview montage",
        cta: "Suggest the next question to ask",
        tags: ["Street interviews", "Stories", "Culture"]
      },
      {
        title: "The Ultimate Cafe Map",
        hook: "Top work-friendly cafes with actual wifi speeds.",
        description: "Rate coffee, seating, plugs, ambience.",
        format: "Guide",
        cta: "Download the cafe map",
        tags: ["Cafe", "Guide", "Remote work"]
      }
    ],
    monetization: [
      {
        title: "City Travel Playbooks",
        plan: "Sell PDF itineraries with budgets, maps, and creator locations."
      },
      {
        title: "Travel Merchandise",
        plan: "Launch travel journals, presets, and LUT packs."
      },
      {
        title: "Tourism Partnerships",
        plan: "Collaborate with tourism boards for campaign storytelling."
      }
    ],
    collabIdeas: [
      "Swap itineraries with a food vlogger",
      "Remote work camp with productivity creators",
      "Festival coverage with local historians"
    ],
    heroPlaylist: [
      "48-hour city guides",
      "Creator travel systems",
      "Local voices"
    ],
    communityPrompts: [
      "What's one city that surprised you?",
      "Share your best remote work cafe",
      "Tag a friend you want to travel with next"
    ]
  }
];

const WEEK_THEMES = [
  "Make Your First 1,000 Fans",
  "Design Systems That Scale",
  "Tell Stories That Stick",
  "Launch & Monetize"
];

const FAST_ACTIONS = [
  "Design channel art that matches your core promise",
  "Record an intro trailer announcing the first month challenge",
  "Set up keyword-rich playlists before uploading",
  "Post YouTube Shorts teasers for each long-form idea",
  "Create a Notion content hub to track execution",
  "Batch record B-roll this weekend for consistency"
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickItems<T>(items: T[], seed: number, count: number): T[] {
  const results: T[] = [];
  const length = items.length;
  for (let i = 0; i < count; i += 1) {
    const index = (seed + i) % length;
    results.push(items[index]);
  }
  return results;
}

function getLanguageMeta(id: LanguageOption["id"]): {
  noun: string;
  transitional: string;
  ctaTone: string;
} {
  switch (id) {
    case "hi":
      return {
        noun: "Desi",
        transitional: "Is video mein hum",
        ctaTone: "Hindi"
      };
    case "hinglish":
      return {
        noun: "Creator",
        transitional: "Aaj hum breakdown karne wale hain",
        ctaTone: "Hinglish"
      };
    default:
      return {
        noun: "Creator",
        transitional: "In this video we break down",
        ctaTone: "English"
      };
  }
}

function buildChannelName(
  niche: Niche,
  persona: PersonaOption,
  signature: string,
  languageId: LanguageOption["id"],
  seed: number
): string {
  const template = pickItems(niche.nameTemplates, seed, 1)[0];
  const languageMeta = getLanguageMeta(languageId);
  const strengthWord = signature.trim().split(" ").filter(Boolean)[0] ?? persona.label.split(" ")[0];
  return template
    .replace("{persona}", persona.label.split(" ")[0])
    .replace("{languageNoun}", languageMeta.noun)
    .replace("{signature}", signature.trim() || persona.label)
    .replace("{strength}", strengthWord);
}

function buildTagline(niche: Niche, persona: PersonaOption, seed: number): string {
  const tagline = pickItems(niche.taglines, seed + 7, 1)[0];
  return `${tagline} · ${persona.tone}`;
}

function buildPositioning(
  niche: Niche,
  persona: PersonaOption,
  language: LanguageOption,
  signatureStrength: string
): string {
  const personaStrength = persona.strengths[0];
  const custom = signatureStrength.trim() ? ` Known for ${signatureStrength.trim()}.` : "";
  return `${language.sampleGreeting} You create a ${persona.tone} channel focused on ${niche.headline}. ${personaStrength} is your superpower.${custom}`;
}

function buildCalendar(
  niche: Niche,
  persona: PersonaOption,
  language: LanguageOption,
  uploadsPerWeek: number,
  signatureStrength: string,
  seed: number
): ChannelBlueprint["calendar"] {
  const ideasNeeded = uploadsPerWeek * 4;
  const selectedIdeas = pickItems(niche.ideaPool, seed + 19, ideasNeeded);
  const toneTwist = persona.hookStyle;
  const languageMeta = getLanguageMeta(language.id);

  return WEEK_THEMES.map((theme, weekIndex) => {
    const start = weekIndex * uploadsPerWeek;
    const end = start + uploadsPerWeek;
    const videos = selectedIdeas.slice(start, end).map((idea, ideaIndex) => {
      const emphasis = signatureStrength.trim()
        ? `${signatureStrength.trim()} angle`
        : persona.strengths[(ideaIndex + weekIndex) % persona.strengths.length];
      return {
        ...idea,
        hook: `${idea.hook} (${toneTwist})`,
        description: `${languageMeta.transitional} ${idea.description} Add a ${emphasis} to stand out.`,
        cta:
          language.id === "hi"
            ? `Is plan ko follow karo aur comment karo "${weekIndex + 1} done" jab video shoot ho jaye.`
            : language.id === "hinglish"
              ? `Iss idea ko bana ke mujhe tag karo—comment "${weekIndex + 1} done" jab publish ho.`
              : idea.cta
      };
    });

    return {
      week: weekIndex + 1,
      theme,
      videos
    };
  });
}

function buildBlueprint(profile: CreatorProfile): ChannelBlueprint {
  const niche = NICHES.find((item) => item.id === profile.nicheId) ?? NICHES[0];
  const persona = PERSONAS.find((item) => item.id === profile.personaId) ?? PERSONAS[0];
  const language = LANGUAGES.find((item) => item.id === profile.languageId) ?? LANGUAGES[0];
  const seed = hashString([
    profile.nicheId,
    profile.personaId,
    profile.languageId,
    profile.signatureStrength,
    profile.uploadsPerWeek.toString()
  ].join("-"));

  const channelName = buildChannelName(niche, persona, profile.signatureStrength, profile.languageId, seed);
  const tagline = buildTagline(niche, persona, seed);
  const positioning = buildPositioning(niche, persona, language, profile.signatureStrength);

  const pillars = pickItems(niche.contentPillars, seed + 3, niche.contentPillars.length);
  const calendar = buildCalendar(
    niche,
    persona,
    language,
    profile.uploadsPerWeek,
    profile.signatureStrength,
    seed
  );
  const monetization = pickItems(niche.monetization, seed + 13, 2);
  const collabIdeas = pickItems(niche.collabIdeas, seed + 17, 2);
  const communityPrompts = pickItems(niche.communityPrompts, seed + 23, 3);
  const fastActions = pickItems(FAST_ACTIONS, seed + 29, 4);

  return {
    channelName,
    tagline,
    positioning,
    pillars,
    calendar,
    monetization,
    collabIdeas,
    communityPrompts,
    fastActions
  };
}

const DEFAULT_PROFILE: CreatorProfile = {
  nicheId: "tech-productivity",
  personaId: "hustler",
  languageId: "hinglish",
  uploadsPerWeek: 3,
  signatureStrength: "automation designer"
};

export default function HomePage() {
  const [profile, setProfile] = useState<CreatorProfile>(DEFAULT_PROFILE);
  const blueprint = useMemo(() => buildBlueprint(profile), [profile]);

  return (
    <main className="page">
      <div className="hero">
        <div className="hero-content">
          <span className="badge">Launch Blueprint</span>
          <h1>Design Your YouTube Channel &amp; 4-Week Video Plan</h1>
          <p>
            Craft a channel identity, content pillars, and upload calendar personalized to your niche, creator vibe,
            and language. No more guesswork—just shoot, publish, and grow.
          </p>
        </div>
        <div className="hero-card">
          <h2>{blueprint.channelName}</h2>
          <p className="tagline">{blueprint.tagline}</p>
          <p className="positioning">{blueprint.positioning}</p>
        </div>
      </div>

      <section className="panel">
        <header>
          <h2>Channel Inputs</h2>
          <p>Adjust the knobs to regenerate your blueprint instantly.</p>
        </header>
        <div className="grid">
          <label className="field">
            <span>Niche Focus</span>
            <select
              value={profile.nicheId}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  nicheId: event.target.value as CreatorProfile["nicheId"]
                }))
              }
            >
              {NICHES.map((niche) => (
                <option key={niche.id} value={niche.id}>
                  {niche.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Creator Persona</span>
            <select
              value={profile.personaId}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  personaId: event.target.value as CreatorProfile["personaId"]
                }))
              }
            >
              {PERSONAS.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Primary Language</span>
            <select
              value={profile.languageId}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  languageId: event.target.value as CreatorProfile["languageId"]
                }))
              }
            >
              {LANGUAGES.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Uploads per Week</span>
            <input
              type="number"
              min={2}
              max={4}
              value={profile.uploadsPerWeek}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  uploadsPerWeek: Math.min(4, Math.max(2, Number(event.target.value) || 2))
                }))
              }
            />
          </label>

          <label className="field field--wide">
            <span>Signature Strength</span>
            <input
              type="text"
              placeholder="e.g. storytelling, product design, nutrition science"
              value={profile.signatureStrength}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  signatureStrength: event.target.value
                }))
              }
            />
            <small>
              This appears in your channel name, hooks, and action notes. Use the skill that makes you different.
            </small>
          </label>
        </div>
      </section>

      <section className="panel">
        <header>
          <h2>Content Pillars</h2>
          <p>Stick to these recurring formats so viewers instantly understand your promise.</p>
        </header>
        <div className="pillar-grid">
          {blueprint.pillars.map((pillar) => (
            <article key={pillar.title} className="card">
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
              <ul>
                {pillar.signatureFormats.map((format) => (
                  <li key={format}>{format}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <header>
          <h2>4-Week Launch Calendar</h2>
          <p>Batch script and shoot these videos to build momentum from day one.</p>
        </header>
        <div className="calendar">
          {blueprint.calendar.map((week) => (
            <div key={week.week} className="week">
              <div className="week-head">
                <span className="week-number">Week {week.week}</span>
                <span className="week-theme">{week.theme}</span>
              </div>
              {week.videos.map((video) => (
                <article key={video.title} className="card card--video">
                  <header>
                    <h3>{video.title}</h3>
                    <span className="video-format">{video.format}</span>
                  </header>
                  <p className="video-hook">{video.hook}</p>
                  <p>{video.description}</p>
                  <footer>
                    <span className="video-cta">{video.cta}</span>
                    <div className="video-tags">
                      {video.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <header>
          <h2>Growth & Monetization Stack</h2>
          <p>Layer these revenue and collaboration plays once your first videos go live.</p>
        </header>
        <div className="grid">
          <div className="card">
            <h3>Monetize Early</h3>
            <ul>
              {blueprint.monetization.map((track) => (
                <li key={track.title}>
                  <strong>{track.title}</strong>
                  <span>{track.plan}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Collab Targets</h3>
            <ul>
              {blueprint.collabIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Community Prompts</h3>
            <ul>
              {blueprint.communityPrompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="panel">
        <header>
          <h2>Next Actions</h2>
          <p>Knock these out in the next 48 hours to maintain momentum.</p>
        </header>
        <ul className="action-list">
          {blueprint.fastActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .page {
          padding: 80px clamp(24px, 6vw, 72px) 120px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .hero {
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          align-items: stretch;
        }

        .hero-content {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 36px;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.45);
        }

        .hero-content h1 {
          margin-top: 12px;
          margin-bottom: 16px;
          font-size: clamp(32px, 6vw, 48px);
          line-height: 1.05;
        }

        .hero-content p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 18px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(56, 189, 248, 0.4);
          background: rgba(8, 145, 178, 0.15);
          color: #bae6fd;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .hero-card {
          background: linear-gradient(145deg, rgba(14, 116, 144, 0.25), rgba(37, 99, 235, 0.1));
          border-radius: 24px;
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .hero-card h2 {
          margin: 0;
          font-size: clamp(28px, 5vw, 40px);
        }

        .tagline {
          margin: 0;
          color: rgba(226, 232, 240, 0.85);
        }

        .positioning {
          margin: 0;
          color: rgba(148, 163, 184, 0.9);
          line-height: 1.6;
        }

        .panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px clamp(24px, 5vw, 48px);
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.35);
        }

        .panel header {
          margin-bottom: 24px;
        }

        .panel header h2 {
          margin: 0 0 8px;
          font-size: 24px;
        }

        .panel header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--surface-strong);
          border-radius: 16px;
          padding: 18px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          position: relative;
        }

        .field span {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(148, 163, 184, 0.8);
        }

        .field select,
        .field input {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.3);
          border-radius: 10px;
          padding: 10px 14px;
          color: #e2e8f0;
          font-size: 16px;
        }

        .field small {
          color: rgba(148, 163, 184, 0.7);
          line-height: 1.4;
        }

        .field--wide {
          grid-column: 1 / -1;
        }

        .pillar-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        }

        .card {
          background: var(--surface-strong);
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card h3 {
          margin: 0;
          font-size: 18px;
        }

        .card ul {
          margin: 0;
          padding-left: 18px;
          color: var(--text-secondary);
        }

        .calendar {
          display: grid;
          gap: 28px;
        }

        .week {
          background: rgba(15, 23, 42, 0.75);
          border-radius: 20px;
          border: 1px solid rgba(148, 163, 184, 0.3);
          padding: 24px;
          display: grid;
          gap: 20px;
        }

        .week-head {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .week-number {
          background: rgba(56, 189, 248, 0.15);
          color: #bae6fd;
          border-radius: 999px;
          padding: 6px 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .week-theme {
          font-weight: 600;
          color: rgba(226, 232, 240, 0.9);
        }

        .card--video header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card--video h3 {
          margin: 0;
          font-size: 18px;
        }

        .video-format {
          color: rgba(148, 163, 184, 0.7);
          font-size: 14px;
        }

        .video-hook {
          margin: 0;
          font-weight: 500;
          color: var(--text-primary);
        }

        .video-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(14, 165, 233, 0.18);
          color: #7dd3fc;
          font-size: 14px;
        }

        .video-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
          color: rgba(148, 163, 184, 0.8);
        }

        .action-list {
          list-style: none;
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
        }

        .action-list li {
          background: rgba(14, 165, 233, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: 14px;
          padding: 14px 18px;
          color: #e0f2fe;
        }

        @media (max-width: 720px) {
          .page {
            padding-top: 48px;
          }

          .panel {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}
