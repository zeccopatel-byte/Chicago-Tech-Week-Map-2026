const fs = require('fs');

const raw = `
| 1 | Aspen Ideas: Climate 2026 | 20–22 | Convene, Willis Tower | http://register.aspenideasclimate.org/event/2026/regProcessStep1?RefId=Web_2&rt=IfqDQJSUf0WTz15FjyPwMw |
| 2 | Chicago Sports Tech Week | 20–23 | Multiple Events | http://chicagosportstechweek.com/ |
| 3 | PROMPT. AI Innovation Series | 20 | Cine City Studios | http://luma.com/5v7dnv8w |
| 4 | TCW2026: Basecamp @ TechNexus | 20 | TeamWorking by TechNexus | http://luma.com/00tj0fik |
| 5 | UChicago Tech Ventures Demo Day | 20 | Provided Upon Registration | http://polsky.uchicago.edu/event/uchicago-tech-ventures-demo-day-2/ |
| 6 | Innovation Match Speed Networking | 20 | mHUB | http://mhub.org/events/innovation-match-speed-networking-for-founders-researchers-and-inventors-178100 |
| 7 | Future of Commerce Summit: Discover, Build, Launch | 20 | Kennedy-King College | http://www.gechamber.com/futureofcommerce |
| 8 | TechChicago Week KICKoff | 20 | Skyline Pitch Chicago | http://luma.com/tjn94z5t |
| 9 | Grassroots Founder Pitch Kickoff | 20 | Provided Upon Registration | http://luma.com/grassroots-pitch2026 |
| 10 | A Seat at the Cap Table: We Don't Wait for Invitations | 20 | Provided upon registration | http://luma.com/wlci6n0y |
| 11 | Skip the Small Talk | AI-matched Dinner Experience | 20 | Downtown | http://posh.vip/e/tech-chicago-week-aimatched-dinners |
| 12 | Analog Room: Humans in the Loop | 20 | SoHo House Chicago | http://readinessintelligencelab.com/community/events/ecosystem-builders-in-the-loop |
| 13 | AI Builder Day: MongoDB + LangChain | 21 | The Dalcy | http://events.mongodb.com/buildingproductionaiagentswithlangchain |
| 14 | Bagel Entrepreneurs @ TechChicago Week | 21 | River North, Chicago | http://luma.com/g77hyv4c |
| 15 | Chicago's Second Annual Fashion Tech Meet Up! | 21 | 2021 W. Fulton St Suite K-111 | http://luma.com/2vejmic9 |
| 16 | AI in the Product Development Life Cycle | 21 | Aon Center | http://forms.office.com/pages/responsepage.aspx?id=KFGnnESilkWHe_JIKOR24onNtour8I9LpJFpwcJfWE5UQjBWMVpCV1IyOUVEQzlPSVdDSElLRk1CUy4u |
| 17 | Smart Tech, Big Dreams: Learning AI for the Future | 21 | Chicago State University | http://forms.cloud.microsoft/pages/responsepage.aspx?id=ZRDrjL14YUeRYo7jUhWvvwCes0UAMHtLok2xNbz_hXNUM0xUSU0wQ0wxTDdFOTVRTkMyVUo3VlBMTi4u&route=shorturl |
| 18 | TechWalk | 21 | Chicago Riverwalk | http://luma.com/71ieg50p |
| 19 | Pilot Readiness – Designing and Running a Pilot | 21 | Virtual | http://mhub.org/events/pilot-readiness---designing-and-running-a-pilot-186793 |
| 20 | Chicago Connection Lab: Solving for Community | 21 | Fabrik Chicago | http://luma.com/rs962ot6 |
| 21 | Systematic Trading with AI-Tested Trading Strategies | 21 | Provided Upon Registration | http://partiful.com/e/5ZlPF5HTHNaOCCQs55aS |
| 22 | Founder Fest Chicago (During TechChicago) | 21 | Three Cities Social Club (Wicker Park) | http://www.kampevents.com/events/founder-fest-chicago |
| 23 | Women Investing / Investing in Women | 21 | MATTER | http://lp.constantcontactpages.com/ev/reg/r83mxxz/lp/ff1e6291-c2a5-42e8-bddc-718006083d9f |
| 24 | RichieBot | Art Exhibit & Documentary Film Experience | 21 | Vault Gallerie | http://luma.com/0o9262vi |
| 25 | Per Scholas Chicago Satellite Campus Launch | 21 | Xchange Chicago, Gary Comer Youth Center | http://luma.com/zbdwqe0u |
| 26 | Women Who Lead @ Chicago Tech Week | 21 | Porter Kitchen + Deck | http://luma.com/vy9r24a4 |
| 27 | 1871 TechPalooza | 21 | TBD | http://gotechchicago.com/mec-events/1871-techpalooza/ |
| 28 | Chicago Demo Day | 21 | Norton Rose Fulbright | http://www.eventbrite.com/e/chicago-demo-day-tickets-1991000515137?aff=oddtdtcreator |
| 29 | Building Bridges 2: Investors Meeting Investors | 21 | — | http://luma.com/r9psk5vt |
| 30 | So, You Want To Start A Business? | 21 | TechNexus Venture Collaborative | http://queerconnectionsmoc.club/#upcoming-events |
| 31 | AI & Quantum Security Beyond the Perimeter | 21 | Provided Upon Registration | http://luma.com/gopher-mcp-techweek |
| 32 | Health2Tech Chicago | 21 | Chicago | http://luma.com/zbe7g6nt |
| 33 | Tech for Good: Youth Mentoring & Innovation Gathering | 21 | 1617 W Washington Blvd, Chicago | http://events.eventnoire.com/e/tech-for-good-youth-mentoring-innovation-gathering |
| 34 | Chicago Defense and National Security Tech Social | 21 | Alumni Ventures LaSalle-Wacker Building | http://luma.com/chicago-defense-tech-social-2026 |
| 35 | Startup Pitch Competition | 21 | Fulton Market | http://chicagosportstechweek.com/startup-pitch |
| 36 | Quantum Roundtable: What's Your Business 'Qase'? | 21 | Union League Club of Chicago | http://theqampus.club/upcoming-events |
| 37 | Digital Delivery Chicago Meetup | 21 | Aon Center | http://www.meetup.com/js-chi/events/312068434/ |
| 38 | Founders & Funders™: Chicago VC Reverse Pitch™ | 21 | mHUB | http://luma.com/fnfxchi0726 |
| 39 | RCS: The New Way to Interact with Customers via Texts | 22 | Teamworking by TechNexus | http://nativemsg.com/chicago-tech-week-event-signup |
| 40 | 1 Million Cups Chicago | 22 | Teamworking by TechNexus | http://luma.com/ac1b8c4s |
| 41 | Chicago Media & Entertainment Tech Summit | 22 | 2112 (4245 N Knox Ave) | http://www.eventbrite.com/e/chicago-media-entertainment-tech-summit-tickets-1989553821036 |
| 42 | Stop Running Pilots. Start Running AI. | 22 | 200 N LaSalle St, Chicago | http://ai.launchconsulting.com/executive-briefing-launch-chicago |
| 43 | AI-matched Connections [VIRTUAL] | 22 | Virtual | http://posh.vip/e/aimatched-conversations-general-edition-1 |
| 44 | Chicago Builds: Future of Money | 22 | Fulton Market | http://luma.com/48bcksp6 |
| 45 | Let's Make A Movie! Future of AI In Media+ | 22 | 20 N Wacker Dr, Suite 1200 | http://luma.com/z2i2qp74 |
| 46 | Velocity through Community: Human-Forward AI | 22 | The Metropolitan | http://www.eventbrite.com/e/velocity-through-community-solving-grand-challenges-via-human-forward-ai-tickets-1989831909807 |
| 47 | Partnerships Powering the Future of Healthcare AI | 22 | MATTER | http://luma.com/b9a7bqgw |
| 48 | Queer Tech Club × PIE: TechChicago Week Mixer | 22 | PIE Office | http://getpie.at/n8lfEMYs |
| 49 | AI, Search & Scale: Elastic x HyperFlex | 22 | Alliance Française de Chicago | http://www.meetup.com/elastic-chicago-user-group/events/314736879/ |
| 50 | Pixels & Prosecco: Women in Tech Mixer | 22 | Provided upon registration | http://luma.com/3cy28qcq |
| 51 | 10th Annual Summer Pitch Battle & Party | 22 | Chicago | http://www.startupgrind.com/events/details/startup-grind-chicago-presents-10th-annual-summer-pitch-battle-amp-party/ |
| 52 | The Marketing Hot Seat: TechWeek Edition | 22 | Fabrik Chicago | http://luma.com/xu9e5l89 |
| 53 | Just Ai Foundation: A Future Worth Imagining | 22 | Provided Upon Registration | http://www.eventbrite.com/e/just-ai-foundation-a-future-worth-imagining-tickets-1991428993728 |
| 54 | Women Founders Crushing It | 22 | Bureau Gravity, Aurora, IL | http://docs.google.com/forms/d/e/1FAIpQLSeipqoXCBrxuTJLq2q_GNHhvOZ4U5dH6UIAygX_eO3BOK8XPw/viewform |
| 55 | The bots – and robots – are ready. Are you? | 22 | Provided Upon Registration | http://luma.com/xz847fkm |
| 56 | SparkLabs Founder Dinner | 22 | — | http://partiful.com/e/y0OjQV0FTtkqHxrSiVYH |
| 57 | The Next Horizon: Summer Soirée for Tech & Marketing | 23 | Hoste | http://luma.com/wrts6agi |
| 58 | Web3 Investor Day | 23 | Willis Tower - Convene | http://www.decasonic.com/web3-investor-day-2026 |
| 59 | Tech Meets Green – Tour PCs for People (10am) | 23 | Oak Lawn, IL | http://events.eventnoire.com/e/pcs-for-people-tech-center-tour-10-00-am |
| 60 | Tech Meets Green – Tour PCs for People (2pm) | 23 | Oak Lawn, IL | http://events.eventnoire.com/e/pcs-for-people-tech-center-tour-2-00-pm-2 |
| 61 | Passport to Founders | 23 | Fabrik Chicago | http://luma.com/e1d75gnn |
| 62 | Powering Partnerships Clean Energy Roundtable | 23 | Provided Upon Registration | http://luma.com/49h6ycn6 |
| 63 | The AI Workforce Shift | 23 | 70 W Madison, Chicago | http://luma.com/vwpk2xq3 |
| 64 | WMN Fintech Showcase | 23 | BMO Tower - 320 S Canal | http://luma.com/3i1kqqac |
| 65 | The Voucher Networking Mixer | 23 | 20 N Wacker Dr, 15th Fl | http://luma.com/268wtsd0 |
| 66 | Milna Launch Party @ TeamWorking | 23 | Teamworking by TechNexus | http://luma.com/q3ead560 |
| 67 | Chicago Grassroots Tech Meetup | 23 | — | http://luma.com/Grassroots-July26 |
| 68 | CHICAT: Art & Technology | 23 | 1701 W 13th St, Chicago | http://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=VI95FNthhUq-rCjE5lEAcZMWNmaUqopPjM30q2BUrFJUOTU1TzE2RVBRNlFFTlk4TEo5RDhZQjIxMi4u |
| 69 | Stripe Developer Meetup Chicago | 23 | Stripe Office Chicago | http://www.meetup.com/stripe-chicago/events/315073529/ |
| 70 | Summer Sparks: AI, Revenue and Customer Success | 23 | Workbox, River North | http://luma.com/l05itl91 |
| 71 | Fundraising for the Rest of Us | 23 | Three Cities Social Club | http://luma.com/qwvogdy9 |
| 72 | TechWalk: Solving Grand Challenges | 24 | Lakefront | http://luma.com/hyofk2s5 |
| 73 | Building Resilient Communities Brunch | 24 | Ovation Chicago | http://luma.com/0uaoipd4 |
| 74 | AI Voices: The Translation Layer | 24 | Microsoft Tech Center, Aon Center | http://www.ticketfalcon.com/e/alvoices2026/ |
| 75 | Fastest Draw in the 312 | 24 | Provided Upon Registration | http://luma.com/2o7ethm3 |
| 76 | Founders and Funders Forum for Sustainable Tech | 24 | Polsky Center | http://luma.com/wxgxbsko |
| 77 | Chicago Climate Smart Home Tour | 25 | 2219 W. Cortez St, Chicago | http://docs.google.com/forms/d/e/1FAIpQLScn31_5-fr2qgrc3moa1a67cCIL_hAaxONDOd6gO-vLDFvuaQ/viewform |
`;

const THEMES = [
  'Artificial Intelligence', 'Black in Tech', 'Climate', 'Culture/Arts/Entertainment', 
  'Energy', 'Finance', 'Food & Agriculture', 'Founders', 'Investors: VC/Angel',
  'Job Seekers', 'Latinx in Tech', 'LGBTQIA+ in Tech', 'Life Sciences', 'Manufacturing',
  'Quantum', 'Sports', 'TD&L', 'Women in Tech', 'Workforce', 'Youth'
];

const assignTheme = (name) => {
  const n = name.toLowerCase();
  if (n.includes('ai') || n.includes('data') || n.includes('artificial intelligence') || n.includes('bot')) return 'Artificial Intelligence';
  if (n.includes('climate') || n.includes('green') || n.includes('sustainable')) return 'Climate';
  if (n.includes('sport')) return 'Sports';
  if (n.includes('founder') || n.includes('pitch') || n.includes('startup') || n.includes('business')) return 'Founders';
  if (n.includes('invest') || n.includes('fund') || n.includes('vc') || n.includes('angel')) return 'Investors: VC/Angel';
  if (n.includes('women') || n.includes('wmn')) return 'Women in Tech';
  if (n.includes('queer')) return 'LGBTQIA+ in Tech';
  if (n.includes('health') || n.includes('med')) return 'Life Sciences';
  if (n.includes('quantum')) return 'Quantum';
  if (n.includes('finance') || n.includes('fintech') || n.includes('money') || n.includes('commerce') || n.includes('trade') || n.includes('stripe')) return 'Finance';
  if (n.includes('film') || n.includes('movie') || n.includes('art') || n.includes('media') || n.includes('music')) return 'Culture/Arts/Entertainment';
  if (n.includes('energy')) return 'Energy';
  if (n.includes('workforce') || n.includes('career') || n.includes('job') || n.includes('school')) return 'Workforce';
  return 'Culture/Arts/Entertainment';
}

const lines = raw.trim().split('\n');

const out = [];

const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const getRandomColor = () => {
    const colors = ['#ff2a5f', '#635bff', '#00e676', '#fbcb4b', '#00c3ff', '#ff7b00', '#0f73ee'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const getLogo = (theme) => {
    switch (theme) {
        case 'Artificial Intelligence': return '🤖';
        case 'Climate': return '🌱';
        case 'Culture/Arts/Entertainment': return '🎉';
        case 'Energy': return '⚡';
        case 'Finance': return '💵';
        case 'Founders': return '🚀';
        case 'Investors: VC/Angel': return '💸';
        case 'Life Sciences': return '🧬';
        case 'Quantum': return '⚛️';
        case 'Sports': return '🏀';
        case 'Women in Tech': return '👩‍💻';
        case 'Workforce': return '💼';
        default: return '📍';
    }
}

// area
const startLat = 41.870;
const endLat = 41.895;
const startLng = -87.645;
const endLng = -87.615;

lines.forEach(l => {
  if (l.trim() === '') return;
  const parts = l.split('|').map(p => p.trim());
  if (parts.length < 6) return;
  
  const id = parts[1];
  const name = parts[2];
  let dateRaw = parts[3];
  const loc = parts[4];
  const url = parts[5];
  
  if (dateRaw.includes('–')) {
      dateRaw = dateRaw.split('–')[0];
  }
  
  const dDay = `Jul ${dateRaw}`;
  const theme = assignTheme(name);
  
  const item = {
      id,
      name,
      color: getRandomColor(),
      lat: Number((startLat + Math.random() * (endLat - startLat)).toFixed(4)),
      lng: Number((startLng + Math.random() * (endLng - startLng)).toFixed(4)),
      logo: getLogo(theme),
      date: dDay,
      time: 'TBA',
      desc: loc,
      url,
      theme
  };
  out.push(item);
});

let finalCode = "const COMPANIES = [\n";
out.forEach(item => {
    finalCode += `  { id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', color: '${item.color}', lat: ${item.lat}, lng: ${item.lng}, logo: '${item.logo}', date: '${item.date}', time: '${item.time}', desc: '${item.desc.replace(/'/g, "\\'")}', url: '${item.url}', theme: '${item.theme}' },\n`;
});
finalCode += "];\n";

fs.writeFileSync('companies.txt', finalCode);
console.log("Done");
