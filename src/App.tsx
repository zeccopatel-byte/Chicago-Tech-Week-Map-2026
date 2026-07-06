/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo, useEffect } from 'react';
import { Filter, List, Calendar, X } from 'lucide-react';
import { PolygonLayer } from '@deck.gl/layers';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { Map, Marker, Popup, useControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function DeckGLOverlay(props: any) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

// Chicago Tech Week Mock Data
const COMPANIES = [
  { id: '1', name: 'Aspen Ideas: Climate 2026', color: '#41B6E6', lat: 41.8724, lng: -87.6307, logo: '🌱', date: 'Jul 20', time: 'TBA', desc: 'Convene, Willis Tower', url: 'http://register.aspenideasclimate.org/event/2026/regProcessStep1?RefId=Web_2&rt=IfqDQJSUf0WTz15FjyPwMw', theme: 'Climate' },
  { id: '2', name: 'Chicago Sports Tech Week', color: '#E4002B', lat: 41.8841, lng: -87.623, logo: '🏀', date: 'Jul 20', time: 'TBA', desc: 'Multiple Events', url: 'http://chicagosportstechweek.com/', theme: 'Sports' },
  { id: '3', name: 'PROMPT. AI Innovation Series', color: '#41B6E6', lat: 41.8893, lng: -87.6423, logo: '🤖', date: 'Jul 20', time: 'TBA', desc: 'Cine City Studios', url: 'http://luma.com/5v7dnv8w', theme: 'Artificial Intelligence' },
  { id: '4', name: 'TCW2026: Basecamp @ TechNexus', color: '#E4002B', lat: 41.879, lng: -87.6206, logo: '🎉', date: 'Jul 20', time: 'TBA', desc: 'TeamWorking by TechNexus', url: 'http://luma.com/00tj0fik', theme: 'Culture/Arts/Entertainment' },
  { id: '5', name: 'UChicago Tech Ventures Demo Day', color: '#41B6E6', lat: 41.8851, lng: -87.639, logo: '🎉', date: 'Jul 20', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://polsky.uchicago.edu/event/uchicago-tech-ventures-demo-day-2/', theme: 'Culture/Arts/Entertainment' },
  { id: '6', name: 'Innovation Match Speed Networking', color: '#41B6E6', lat: 41.8869, lng: -87.6326, logo: '🎉', date: 'Jul 20', time: 'TBA', desc: 'mHUB', url: 'http://mhub.org/events/innovation-match-speed-networking-for-founders-researchers-and-inventors-178100', theme: 'Culture/Arts/Entertainment' },
  { id: '7', name: 'Future of Commerce Summit: Discover, Build, Launch', color: '#E4002B', lat: 41.8855, lng: -87.6312, logo: '💵', date: 'Jul 20', time: 'TBA', desc: 'Kennedy-King College', url: 'http://www.gechamber.com/futureofcommerce', theme: 'Finance' },
  { id: '8', name: 'TechChicago Week KICKoff', color: '#E4002B', lat: 41.8893, lng: -87.6386, logo: '🎉', date: 'Jul 20', time: 'TBA', desc: 'Skyline Pitch Chicago', url: 'http://luma.com/tjn94z5t', theme: 'Culture/Arts/Entertainment' },
  { id: '9', name: 'Grassroots Founder Pitch Kickoff', color: '#41B6E6', lat: 41.8854, lng: -87.6151, logo: '🚀', date: 'Jul 20', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://luma.com/grassroots-pitch2026', theme: 'Founders' },
  { id: '10', name: 'A Seat at the Cap Table: We Don\'t Wait for Invitations', color: '#E4002B', lat: 41.8736, lng: -87.6345, logo: '🤖', date: 'Jul 20', time: 'TBA', desc: 'Provided upon registration', url: 'http://luma.com/wlci6n0y', theme: 'Artificial Intelligence' },
  { id: '11', name: 'Skip the Small Talk', color: '#41B6E6', lat: 41.881, lng: -87.6403, logo: '🎉', date: 'Jul AI-matched Dinner Experience', time: 'TBA', desc: '20', url: 'Downtown', theme: 'Culture/Arts/Entertainment' },
  { id: '12', name: 'Analog Room: Humans in the Loop', color: '#41B6E6', lat: 41.8766, lng: -87.6159, logo: '🎉', date: 'Jul 20', time: 'TBA', desc: 'SoHo House Chicago', url: 'http://readinessintelligencelab.com/community/events/ecosystem-builders-in-the-loop', theme: 'Culture/Arts/Entertainment' },
  { id: '13', name: 'AI Builder Day: MongoDB + LangChain', color: '#41B6E6', lat: 41.8927, lng: -87.6177, logo: '🤖', date: 'Jul 21', time: 'TBA', desc: 'The Dalcy', url: 'http://events.mongodb.com/buildingproductionaiagentswithlangchain', theme: 'Artificial Intelligence' },
  { id: '14', name: 'Bagel Entrepreneurs @ TechChicago Week', color: '#41B6E6', lat: 41.8811, lng: -87.6265, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'River North, Chicago', url: 'http://luma.com/g77hyv4c', theme: 'Culture/Arts/Entertainment' },
  { id: '15', name: 'Chicago\'s Second Annual Fashion Tech Meet Up!', color: '#41B6E6', lat: 41.8853, lng: -87.6225, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: '2021 W. Fulton St Suite K-111', url: 'http://luma.com/2vejmic9', theme: 'Culture/Arts/Entertainment' },
  { id: '16', name: 'AI in the Product Development Life Cycle', color: '#E4002B', lat: 41.8937, lng: -87.6315, logo: '🤖', date: 'Jul 21', time: 'TBA', desc: 'Aon Center', url: 'http://forms.office.com/pages/responsepage.aspx?id=KFGnnESilkWHe_JIKOR24onNtour8I9LpJFpwcJfWE5UQjBWMVpCV1IyOUVEQzlPSVdDSElLRk1CUy4u', theme: 'Artificial Intelligence' },
  { id: '17', name: 'Smart Tech, Big Dreams: Learning AI for the Future', color: '#41B6E6', lat: 41.8925, lng: -87.6155, logo: '🤖', date: 'Jul 21', time: 'TBA', desc: 'Chicago State University', url: 'http://forms.cloud.microsoft/pages/responsepage.aspx?id=ZRDrjL14YUeRYo7jUhWvvwCes0UAMHtLok2xNbz_hXNUM0xUSU0wQ0wxTDdFOTVRTkMyVUo3VlBMTi4u&route=shorturl', theme: 'Artificial Intelligence' },
  { id: '18', name: 'TechWalk', color: '#E4002B', lat: 41.8739, lng: -87.63, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Chicago Riverwalk', url: 'http://luma.com/71ieg50p', theme: 'Culture/Arts/Entertainment' },
  { id: '19', name: 'Pilot Readiness – Designing and Running a Pilot', color: '#41B6E6', lat: 41.8711, lng: -87.6219, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Virtual', url: 'http://mhub.org/events/pilot-readiness---designing-and-running-a-pilot-186793', theme: 'Culture/Arts/Entertainment' },
  { id: '20', name: 'Chicago Connection Lab: Solving for Community', color: '#41B6E6', lat: 41.8904, lng: -87.635, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Fabrik Chicago', url: 'http://luma.com/rs962ot6', theme: 'Culture/Arts/Entertainment' },
  { id: '21', name: 'Systematic Trading with AI-Tested Trading Strategies', color: '#41B6E6', lat: 41.8839, lng: -87.6197, logo: '🤖', date: 'Jul 21', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://partiful.com/e/5ZlPF5HTHNaOCCQs55aS', theme: 'Artificial Intelligence' },
  { id: '22', name: 'Founder Fest Chicago (During TechChicago)', color: '#E4002B', lat: 41.8865, lng: -87.6179, logo: '🚀', date: 'Jul 21', time: 'TBA', desc: 'Three Cities Social Club (Wicker Park)', url: 'http://www.kampevents.com/events/founder-fest-chicago', theme: 'Founders' },
  { id: '23', name: 'Women Investing / Investing in Women', color: '#E4002B', lat: 41.8877, lng: -87.6255, logo: '💸', date: 'Jul 21', time: 'TBA', desc: 'MATTER', url: 'http://lp.constantcontactpages.com/ev/reg/r83mxxz/lp/ff1e6291-c2a5-42e8-bddc-718006083d9f', theme: 'Investors: VC/Angel' },
  { id: '24', name: 'RichieBot', color: '#E4002B', lat: 41.881, lng: -87.645, logo: '🤖', date: 'Jul Art Exhibit & Documentary Film Experience', time: 'TBA', desc: '21', url: 'Vault Gallerie', theme: 'Artificial Intelligence' },
  { id: '25', name: 'Per Scholas Chicago Satellite Campus Launch', color: '#41B6E6', lat: 41.8709, lng: -87.6292, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Xchange Chicago, Gary Comer Youth Center', url: 'http://luma.com/zbdwqe0u', theme: 'Culture/Arts/Entertainment' },
  { id: '26', name: 'Women Who Lead @ Chicago Tech Week', color: '#E4002B', lat: 41.8942, lng: -87.6158, logo: '👩‍💻', date: 'Jul 21', time: 'TBA', desc: 'Porter Kitchen + Deck', url: 'http://luma.com/vy9r24a4', theme: 'Women in Tech' },
  { id: '27', name: '1871 TechPalooza', color: '#41B6E6', lat: 41.8894, lng: -87.6426, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'TBD', url: 'http://gotechchicago.com/mec-events/1871-techpalooza/', theme: 'Culture/Arts/Entertainment' },
  { id: '28', name: 'Chicago Demo Day', color: '#E4002B', lat: 41.8714, lng: -87.6272, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Norton Rose Fulbright', url: 'http://www.eventbrite.com/e/chicago-demo-day-tickets-1991000515137?aff=oddtdtcreator', theme: 'Culture/Arts/Entertainment' },
  { id: '29', name: 'Building Bridges 2: Investors Meeting Investors', color: '#41B6E6', lat: 41.8881, lng: -87.6157, logo: '💸', date: 'Jul 21', time: 'TBA', desc: '—', url: 'http://luma.com/r9psk5vt', theme: 'Investors: VC/Angel' },
  { id: '30', name: 'So, You Want To Start A Business?', color: '#41B6E6', lat: 41.8942, lng: -87.6443, logo: '🚀', date: 'Jul 21', time: 'TBA', desc: 'TechNexus Venture Collaborative', url: 'http://queerconnectionsmoc.club/#upcoming-events', theme: 'Founders' },
  { id: '31', name: 'AI & Quantum Security Beyond the Perimeter', color: '#E4002B', lat: 41.8752, lng: -87.6348, logo: '🤖', date: 'Jul 21', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://luma.com/gopher-mcp-techweek', theme: 'Artificial Intelligence' },
  { id: '32', name: 'Health2Tech Chicago', color: '#41B6E6', lat: 41.8856, lng: -87.628, logo: '🧬', date: 'Jul 21', time: 'TBA', desc: 'Chicago', url: 'http://luma.com/zbe7g6nt', theme: 'Life Sciences' },
  { id: '33', name: 'Tech for Good: Youth Mentoring & Innovation Gathering', color: '#41B6E6', lat: 41.8895, lng: -87.6186, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: '1617 W Washington Blvd, Chicago', url: 'http://events.eventnoire.com/e/tech-for-good-youth-mentoring-innovation-gathering', theme: 'Culture/Arts/Entertainment' },
  { id: '34', name: 'Chicago Defense and National Security Tech Social', color: '#E4002B', lat: 41.88, lng: -87.6392, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Alumni Ventures LaSalle-Wacker Building', url: 'http://luma.com/chicago-defense-tech-social-2026', theme: 'Culture/Arts/Entertainment' },
  { id: '35', name: 'Startup Pitch Competition', color: '#41B6E6', lat: 41.8736, lng: -87.6154, logo: '🚀', date: 'Jul 21', time: 'TBA', desc: 'Fulton Market', url: 'http://chicagosportstechweek.com/startup-pitch', theme: 'Founders' },
  { id: '36', name: 'Quantum Roundtable: What\'s Your Business \'Qase\'?', color: '#E4002B', lat: 41.8771, lng: -87.6423, logo: '🚀', date: 'Jul 21', time: 'TBA', desc: 'Union League Club of Chicago', url: 'http://theqampus.club/upcoming-events', theme: 'Founders' },
  { id: '37', name: 'Digital Delivery Chicago Meetup', color: '#E4002B', lat: 41.879, lng: -87.6256, logo: '🎉', date: 'Jul 21', time: 'TBA', desc: 'Aon Center', url: 'http://www.meetup.com/js-chi/events/312068434/', theme: 'Culture/Arts/Entertainment' },
  { id: '38', name: 'Founders & Funders™: Chicago VC Reverse Pitch™', color: '#E4002B', lat: 41.8917, lng: -87.6366, logo: '🚀', date: 'Jul 21', time: 'TBA', desc: 'mHUB', url: 'http://luma.com/fnfxchi0726', theme: 'Founders' },
  { id: '39', name: 'RCS: The New Way to Interact with Customers via Texts', color: '#E4002B', lat: 41.8774, lng: -87.629, logo: '🎉', date: 'Jul 22', time: 'TBA', desc: 'Teamworking by TechNexus', url: 'http://nativemsg.com/chicago-tech-week-event-signup', theme: 'Culture/Arts/Entertainment' },
  { id: '40', name: '1 Million Cups Chicago', color: '#41B6E6', lat: 41.8827, lng: -87.6384, logo: '🎉', date: 'Jul 22', time: 'TBA', desc: 'Teamworking by TechNexus', url: 'http://luma.com/ac1b8c4s', theme: 'Culture/Arts/Entertainment' },
  { id: '41', name: 'Chicago Media & Entertainment Tech Summit', color: '#41B6E6', lat: 41.8911, lng: -87.6419, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: '2112 (4245 N Knox Ave)', url: 'http://www.eventbrite.com/e/chicago-media-entertainment-tech-summit-tickets-1989553821036', theme: 'Artificial Intelligence' },
  { id: '42', name: 'Stop Running Pilots. Start Running AI.', color: '#41B6E6', lat: 41.8867, lng: -87.641, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: '200 N LaSalle St, Chicago', url: 'http://ai.launchconsulting.com/executive-briefing-launch-chicago', theme: 'Artificial Intelligence' },
  { id: '43', name: 'AI-matched Connections [VIRTUAL]', color: '#41B6E6', lat: 41.8764, lng: -87.6227, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: 'Virtual', url: 'http://posh.vip/e/aimatched-conversations-general-edition-1', theme: 'Artificial Intelligence' },
  { id: '44', name: 'Chicago Builds: Future of Money', color: '#41B6E6', lat: 41.8748, lng: -87.643, logo: '💵', date: 'Jul 22', time: 'TBA', desc: 'Fulton Market', url: 'http://luma.com/48bcksp6', theme: 'Finance' },
  { id: '45', name: 'Let\'s Make A Movie! Future of AI In Media+', color: '#41B6E6', lat: 41.8913, lng: -87.6369, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: '20 N Wacker Dr, Suite 1200', url: 'http://luma.com/z2i2qp74', theme: 'Artificial Intelligence' },
  { id: '46', name: 'Velocity through Community: Human-Forward AI', color: '#E4002B', lat: 41.8846, lng: -87.6267, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: 'The Metropolitan', url: 'http://www.eventbrite.com/e/velocity-through-community-solving-grand-challenges-via-human-forward-ai-tickets-1989831909807', theme: 'Artificial Intelligence' },
  { id: '47', name: 'Partnerships Powering the Future of Healthcare AI', color: '#41B6E6', lat: 41.8868, lng: -87.6408, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: 'MATTER', url: 'http://luma.com/b9a7bqgw', theme: 'Artificial Intelligence' },
  { id: '48', name: 'Queer Tech Club × PIE: TechChicago Week Mixer', color: '#41B6E6', lat: 41.8853, lng: -87.6432, logo: '📍', date: 'Jul 22', time: 'TBA', desc: 'PIE Office', url: 'http://getpie.at/n8lfEMYs', theme: 'LGBTQIA+ in Tech' },
  { id: '49', name: 'AI, Search & Scale: Elastic x HyperFlex', color: '#41B6E6', lat: 41.8829, lng: -87.6291, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: 'Alliance Française de Chicago', url: 'http://www.meetup.com/elastic-chicago-user-group/events/314736879/', theme: 'Artificial Intelligence' },
  { id: '50', name: 'Pixels & Prosecco: Women in Tech Mixer', color: '#E4002B', lat: 41.8917, lng: -87.6314, logo: '👩‍💻', date: 'Jul 22', time: 'TBA', desc: 'Provided upon registration', url: 'http://luma.com/3cy28qcq', theme: 'Women in Tech' },
  { id: '51', name: '10th Annual Summer Pitch Battle & Party', color: '#41B6E6', lat: 41.873, lng: -87.6269, logo: '🚀', date: 'Jul 22', time: 'TBA', desc: 'Chicago', url: 'http://www.startupgrind.com/events/details/startup-grind-chicago-presents-10th-annual-summer-pitch-battle-amp-party/', theme: 'Founders' },
  { id: '52', name: 'The Marketing Hot Seat: TechWeek Edition', color: '#41B6E6', lat: 41.871, lng: -87.6386, logo: '🎉', date: 'Jul 22', time: 'TBA', desc: 'Fabrik Chicago', url: 'http://luma.com/xu9e5l89', theme: 'Culture/Arts/Entertainment' },
  { id: '53', name: 'Just Ai Foundation: A Future Worth Imagining', color: '#E4002B', lat: 41.8943, lng: -87.6216, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://www.eventbrite.com/e/just-ai-foundation-a-future-worth-imagining-tickets-1991428993728', theme: 'Artificial Intelligence' },
  { id: '54', name: 'Women Founders Crushing It', color: '#E4002B', lat: 41.8911, lng: -87.6361, logo: '🚀', date: 'Jul 22', time: 'TBA', desc: 'Bureau Gravity, Aurora, IL', url: 'http://docs.google.com/forms/d/e/1FAIpQLSeipqoXCBrxuTJLq2q_GNHhvOZ4U5dH6UIAygX_eO3BOK8XPw/viewform', theme: 'Founders' },
  { id: '55', name: 'The bots – and robots – are ready. Are you?', color: '#41B6E6', lat: 41.8892, lng: -87.6386, logo: '🤖', date: 'Jul 22', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://luma.com/xz847fkm', theme: 'Artificial Intelligence' },
  { id: '56', name: 'SparkLabs Founder Dinner', color: '#41B6E6', lat: 41.8757, lng: -87.6215, logo: '🚀', date: 'Jul 22', time: 'TBA', desc: '—', url: 'http://partiful.com/e/y0OjQV0FTtkqHxrSiVYH', theme: 'Founders' },
  { id: '57', name: 'The Next Horizon: Summer Soirée for Tech & Marketing', color: '#E4002B', lat: 41.8842, lng: -87.6277, logo: '🎉', date: 'Jul 23', time: 'TBA', desc: 'Hoste', url: 'http://luma.com/wrts6agi', theme: 'Culture/Arts/Entertainment' },
  { id: '58', name: 'Web3 Investor Day', color: '#E4002B', lat: 41.8897, lng: -87.6327, logo: '💸', date: 'Jul 23', time: 'TBA', desc: 'Willis Tower - Convene', url: 'http://www.decasonic.com/web3-investor-day-2026', theme: 'Investors: VC/Angel' },
  { id: '59', name: 'Tech Meets Green – Tour PCs for People (10am)', color: '#41B6E6', lat: 41.8875, lng: -87.6175, logo: '🌱', date: 'Jul 23', time: 'TBA', desc: 'Oak Lawn, IL', url: 'http://events.eventnoire.com/e/pcs-for-people-tech-center-tour-10-00-am', theme: 'Climate' },
  { id: '60', name: 'Tech Meets Green – Tour PCs for People (2pm)', color: '#41B6E6', lat: 41.895, lng: -87.6255, logo: '🌱', date: 'Jul 23', time: 'TBA', desc: 'Oak Lawn, IL', url: 'http://events.eventnoire.com/e/pcs-for-people-tech-center-tour-2-00-pm-2', theme: 'Climate' },
  { id: '61', name: 'Passport to Founders', color: '#E4002B', lat: 41.8928, lng: -87.6382, logo: '🏀', date: 'Jul 23', time: 'TBA', desc: 'Fabrik Chicago', url: 'http://luma.com/e1d75gnn', theme: 'Sports' },
  { id: '62', name: 'Powering Partnerships Clean Energy Roundtable', color: '#41B6E6', lat: 41.8879, lng: -87.6389, logo: '🎉', date: 'Jul 23', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://luma.com/49h6ycn6', theme: 'Culture/Arts/Entertainment' },
  { id: '63', name: 'The AI Workforce Shift', color: '#41B6E6', lat: 41.8785, lng: -87.6175, logo: '🤖', date: 'Jul 23', time: 'TBA', desc: '70 W Madison, Chicago', url: 'http://luma.com/vwpk2xq3', theme: 'Artificial Intelligence' },
  { id: '64', name: 'WMN Fintech Showcase', color: '#E4002B', lat: 41.888, lng: -87.6378, logo: '👩‍💻', date: 'Jul 23', time: 'TBA', desc: 'BMO Tower - 320 S Canal', url: 'http://luma.com/3i1kqqac', theme: 'Women in Tech' },
  { id: '65', name: 'The Voucher Networking Mixer', color: '#E4002B', lat: 41.8723, lng: -87.6213, logo: '🎉', date: 'Jul 23', time: 'TBA', desc: '20 N Wacker Dr, 15th Fl', url: 'http://luma.com/268wtsd0', theme: 'Culture/Arts/Entertainment' },
  { id: '66', name: 'Milna Launch Party @ TeamWorking', color: '#E4002B', lat: 41.8864, lng: -87.6435, logo: '🎉', date: 'Jul 23', time: 'TBA', desc: 'Teamworking by TechNexus', url: 'http://luma.com/q3ead560', theme: 'Culture/Arts/Entertainment' },
  { id: '67', name: 'Chicago Grassroots Tech Meetup', color: '#41B6E6', lat: 41.8726, lng: -87.6444, logo: '🎉', date: 'Jul 23', time: 'TBA', desc: '—', url: 'http://luma.com/Grassroots-July26', theme: 'Culture/Arts/Entertainment' },
  { id: '68', name: 'CHICAT: Art & Technology', color: '#41B6E6', lat: 41.8885, lng: -87.6219, logo: '🎉', date: 'Jul 23', time: 'TBA', desc: '1701 W 13th St, Chicago', url: 'http://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=VI95FNthhUq-rCjE5lEAcZMWNmaUqopPjM30q2BUrFJUOTU1TzE2RVBRNlFFTlk4TEo5RDhZQjIxMi4u', theme: 'Culture/Arts/Entertainment' },
  { id: '69', name: 'Stripe Developer Meetup Chicago', color: '#41B6E6', lat: 41.8882, lng: -87.6171, logo: '💵', date: 'Jul 23', time: 'TBA', desc: 'Stripe Office Chicago', url: 'http://www.meetup.com/stripe-chicago/events/315073529/', theme: 'Finance' },
  { id: '70', name: 'Summer Sparks: AI, Revenue and Customer Success', color: '#41B6E6', lat: 41.8943, lng: -87.6205, logo: '🤖', date: 'Jul 23', time: 'TBA', desc: 'Workbox, River North', url: 'http://luma.com/l05itl91', theme: 'Artificial Intelligence' },
  { id: '71', name: 'Fundraising for the Rest of Us', color: '#E4002B', lat: 41.8844, lng: -87.626, logo: '🤖', date: 'Jul 23', time: 'TBA', desc: 'Three Cities Social Club', url: 'http://luma.com/qwvogdy9', theme: 'Artificial Intelligence' },
  { id: '72', name: 'TechWalk: Solving Grand Challenges', color: '#41B6E6', lat: 41.8913, lng: -87.6315, logo: '🎉', date: 'Jul 24', time: 'TBA', desc: 'Lakefront', url: 'http://luma.com/hyofk2s5', theme: 'Culture/Arts/Entertainment' },
  { id: '73', name: 'Building Resilient Communities Brunch', color: '#E4002B', lat: 41.8774, lng: -87.6163, logo: '🎉', date: 'Jul 24', time: 'TBA', desc: 'Ovation Chicago', url: 'http://luma.com/0uaoipd4', theme: 'Culture/Arts/Entertainment' },
  { id: '74', name: 'AI Voices: The Translation Layer', color: '#E4002B', lat: 41.8747, lng: -87.6395, logo: '🤖', date: 'Jul 24', time: 'TBA', desc: 'Microsoft Tech Center, Aon Center', url: 'http://www.ticketfalcon.com/e/alvoices2026/', theme: 'Artificial Intelligence' },
  { id: '75', name: 'Fastest Draw in the 312', color: '#E4002B', lat: 41.8893, lng: -87.6246, logo: '🎉', date: 'Jul 24', time: 'TBA', desc: 'Provided Upon Registration', url: 'http://luma.com/2o7ethm3', theme: 'Culture/Arts/Entertainment' },
  { id: '76', name: 'Founders and Funders Forum for Sustainable Tech', color: '#41B6E6', lat: 41.8778, lng: -87.6306, logo: '🤖', date: 'Jul 24', time: 'TBA', desc: 'Polsky Center', url: 'http://luma.com/wxgxbsko', theme: 'Artificial Intelligence' },
  { id: '77', name: 'Chicago Climate Smart Home Tour', color: '#41B6E6', lat: 41.884, lng: -87.6247, logo: '🌱', date: 'Jul 25', time: 'TBA', desc: '2219 W. Cortez St, Chicago', url: 'http://docs.google.com/forms/d/e/1FAIpQLScn31_5-fr2qgrc3moa1a67cCIL_hAaxONDOd6gO-vLDFvuaQ/viewform', theme: 'Climate' },
];

function toSentenceCase(str: string) {
  if (!str) return str;
  let lower = str.toLowerCase();
  // Preserve common acronyms and proper nouns seen in this dataset
  lower = lower.replace(/\bai\b/g, 'AI');
  lower = lower.replace(/\btcw2026\b/g, 'TCW2026');
  lower = lower.replace(/\bmhub\b/g, 'mHUB');
  lower = lower.replace(/\buchicago\b/g, 'UChicago');
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function GlowingMarker({ color, name, logo, isDarkMode }: { color: string; name: string; logo: string, isDarkMode: boolean }) {
  return (
    <div className="relative flex flex-col items-center group/marker z-10 hover:z-50" style={{ filter: `drop-shadow(0px 0px 8px ${color}${isDarkMode ? '60' : '90'})` }}>
      <div className="absolute bottom-0 flex flex-col items-center pb-[120px]">
        <div 
          className="flex items-center p-1 rounded-full text-xs font-semibold shadow-xl transition-all duration-300 group-hover/marker:-translate-y-2 group-hover/marker:scale-110 cursor-pointer pointer-events-auto"
          style={{ 
            backgroundColor: isDarkMode ? '#111111' : '#ffffff', 
            border: `1px solid ${color}${isDarkMode ? '80' : 'ff'}`,
            boxShadow: `0 4px 12px rgba(0,0,0,${isDarkMode ? '0.8' : '0.1'}), inset 0 0 8px ${color}20` 
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center rounded-full text-[12px] shrink-0" style={{
            backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6', 
            borderColor: isDarkMode ? '#374151' : '#e5e7eb', 
            borderWidth: 1
          }}>
            {logo}
          </div>
          <span className={`whitespace-nowrap flex-grow pl-2 pr-3 font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {toSentenceCase(name)}
          </span>
        </div>
      </div>
        
      <div className="absolute bottom-0 flex flex-col items-center">
        <div 
          style={{ 
            width: '2px', 
            height: '60px', 
            background: `linear-gradient(to top, ${color}, transparent)` 
          }} 
        />
        
        <div 
          style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            backgroundColor: color, 
            boxShadow: `0 0 12px 4px ${color}${isDarkMode ? '80' : '50'}, inset 0 0 4px ${isDarkMode ? 'white' : 'white'}`,
            transform: 'translateY(6px)'
          }} 
        />
      </div>
    </div>
  );
}

// Generate realistic looking city blocks locally
function getMockBuildings() {
  const buildings = [];
  const startLat = 41.870;
  const endLat = 41.895;
  const startLng = -87.645;
  const endLng = -87.615;
  
  let seed = 1;
  function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
  }

  for (let lat = startLat; lat < endLat; lat += 0.001) {
    for (let lng = startLng; lng < endLng; lng += 0.0015) {
       const distToCenter = Math.sqrt(Math.pow(lat - 41.8845, 2) + Math.pow(lng - 87.632, 2));
       const centerFactor = Math.max(0, 1 - (distToCenter * 40)); 
       const numDivisions = Math.floor(random() * 3) + 2;
       
       for(let i=0; i<numDivisions; i++) {
           const maxH = 200 * centerFactor + 40; 
           const height = random() * maxH + 15;
           
           if (height > 20 && random() > 0.2) {
             const bx = lng + (random() * 0.001);
             const by = lat + (random() * 0.0007);
             const bw = 0.0003 + random() * 0.0003;
             const bh = 0.0002 + random() * 0.0002;
             
             const isColored = random() > 0.5;
             const baseR = isColored ? (random() > 0.6 ? 240 : 50) : 50;
             const baseG = isColored ? (baseR === 240 ? 150 : 180) : 60;
             const baseB = isColored ? (baseR === 240 ? 80 : 200) : 70;
             
             buildings.push({
               polygon: [
                 [bx, by],
                 [bx + bw, by],
                 [bx + bw, by + bh],
                 [bx, by + bh]
               ],
               height: height,
               color: [baseR * (0.8 + random()*0.4), baseG * (0.8 + random()*0.4), baseB * (0.8 + random()*0.4)]
             });
           }
       }
    }
  }
  return buildings;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isDayFilterOpen, setIsDayFilterOpen] = useState<boolean>(false);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [selectedCompany, setSelectedCompany] = useState<typeof COMPANIES[0] | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -87.632,
    latitude: 41.8845,
    zoom: 15,
    pitch: 60,
    bearing: 15
  });
  
  useEffect(() => {
    let animationFrameId: number;
    if (!isAutoRotating) return;
    
    const rotateMap = () => {
      setViewState(prev => ({
        ...prev,
        bearing: prev.bearing + 0.05
      }));
      animationFrameId = requestAnimationFrame(rotateMap);
    };
    
    animationFrameId = requestAnimationFrame(rotateMap);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoRotating]);

  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All Themes');
  const DAYS = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const THEMES = [
    'All Themes', 'Artificial Intelligence', 'Climate', 
    'Culture/Arts/Entertainment', 'Finance', 
    'Founders', 'Investors: VC/Angel', 
    'LGBTQIA+ in Tech', 'Life Sciences', 
    'Sports', 'Women in Tech'
  ];

  const getDayForDate = (dateStr: string) => {
    const map: Record<string, string> = {
      'Jul 20': 'Mon',
      'Jul 21': 'Tue',
      'Jul 22': 'Wed',
      'Jul 23': 'Thu',
      'Jul 24': 'Fri',
      'Jul 25': 'Sat',
      'Jul 26': 'Sun'
    };
    return map[dateStr] || 'All';
  };

  const filteredCompanies = useMemo(() => {
    return COMPANIES.filter(c => {
      const dayMatch = selectedDay === 'All' || getDayForDate(c.date) === selectedDay;
      const themeMatch = selectedTheme === 'All Themes' || c.theme === selectedTheme;
      return dayMatch && themeMatch;
    });
  }, [selectedDay, selectedTheme]);

  const buildingsData = useMemo(() => getMockBuildings(), []);

  const layers = [
    new PolygonLayer({
      id: 'buildings',
      data: buildingsData,
      extruded: true,
      wireframe: false,
      opacity: 0.8,
      getPolygon: d => d.polygon,
      getElevation: d => d.height,
      getFillColor: d => d.color,
      material: {
          ambient: 0.4,
          diffuse: 0.6,
          shininess: 32,
          specularColor: [30, 30, 30]
      }
    })
  ];

  return (
    <div className={`w-screen h-screen overflow-hidden flex flex-col md:flex-row font-sans transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-neutral-900'}`}>
      
      {/* MAP SECTION */}
      <div className="flex-1 relative order-2 md:order-1 h-full md:h-full group">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onDragStart={() => setIsAutoRotating(false)}
          onZoomStart={() => setIsAutoRotating(false)}
          onClick={() => setSelectedCompany(null)}
          mapStyle={isDarkMode ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"} 
          interactiveLayerIds={[]}
          dragRotate={true}
          style={{ width: '100%', height: '100%' }}
        >
          <DeckGLOverlay layers={layers} interleaved={true} />
          {filteredCompanies.map(company => (
              <Marker
                 key={company.id}
                 longitude={company.lng}
                 latitude={company.lat}
                 anchor="bottom"
                 style={{ zIndex: selectedCompany?.id === company.id ? 50 : 10, cursor: 'pointer' }}
                 onClick={e => {
                     if (e && e.originalEvent && typeof e.originalEvent.stopPropagation === 'function') {
                         e.originalEvent.stopPropagation();
                     } else if (e && typeof e.stopPropagation === 'function') {
                         e.stopPropagation();
                     }
                     setSelectedCompany(company);
                 }}
              >
                 <div className="block outline-none relative hover:z-50">
                   <GlowingMarker color={company.color} name={company.name} logo={company.logo} isDarkMode={isDarkMode} />
                 </div>
              </Marker>
          ))}
          
          {selectedCompany && (
              <Popup
                 longitude={selectedCompany.lng}
                 latitude={selectedCompany.lat}
                 anchor="bottom"
                 offset={[0, -100]}
                 onClose={() => setSelectedCompany(null)}
                 closeButton={false}
                 className={`custom-popup ${isDarkMode ? 'dark-popup' : 'light-popup'}`}
              >
                 <div className={`p-4 rounded-3xl border shadow-2xl min-w-[240px] pointer-events-auto ${isDarkMode ? 'bg-[#1c1c1e]/80 border-white/10 text-white backdrop-blur-3xl' : 'bg-white/80 border-black/10 text-neutral-900 shadow-xl backdrop-blur-3xl'}`}>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                           <div className="w-10 h-10 flex items-center justify-center rounded-xl text-lg shrink-0 shadow-sm" style={{
                              backgroundColor: isDarkMode ? '#41B6E630' : '#41B6E615',
                              color: isDarkMode ? '#fff' : '#41B6E6'
                           }}>
                             {selectedCompany.logo}
                           </div>
                            <div>
                             <span className="text-[11px] font-semibold uppercase tracking-wider block" style={{ color: '#41B6E6' }}>
                                 {selectedCompany.date}{selectedCompany.time !== 'TBA' ? ` • ${selectedCompany.time}` : ''}
                             </span>
                           </div>
                        </div>
                        <button onClick={() => setSelectedCompany(null)} className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${isDarkMode ? 'bg-[#2c2c2e] hover:bg-[#3a3a3c] text-neutral-400' : 'bg-[#e5e5ea] hover:bg-[#d1d1d6] text-gray-500'}`}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                    </div>
                    <h3 className="text-base font-semibold mb-1 leading-tight">{selectedCompany.name}</h3>
                    <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>{selectedCompany.desc}</p>
                    <a 
                        href={selectedCompany.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`block text-center text-[13px] font-semibold py-2.5 rounded-xl transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
                    >
                        View Event
                    </a>
                 </div>
              </Popup>
          )}
        </Map>

        {/* Floating Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:top-6 md:left-6 z-10 pointer-events-none w-[calc(100%-2rem)] md:w-auto">
            <div className={`border p-4 md:p-6 rounded-3xl shadow-2xl w-full max-w-full md:max-w-xs pointer-events-auto transition-transform hover:scale-105 duration-300 bg-white/95 border-black/10 backdrop-blur-2xl`}>
                <div className="flex justify-between items-start mb-1 md:mb-2">
                  <h1 className={`text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2 pr-2 text-gray-900`}>
                      Chicago Tech Week Map'26
                  </h1>

                  {/* Calendar Mobile Control (Inside Header Card) */}
                  <div className="md:hidden relative z-50 pointer-events-auto">
                    <button 
                      onClick={() => setIsDayFilterOpen(!isDayFilterOpen)}
                      className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors shadow-sm border bg-[#e5e5ea] text-neutral-900 border-black/5 hover:bg-[#d1d1d6] ${isDayFilterOpen || selectedDay !== 'All' ? 'text-[#41B6E6]' : ''}`}
                      aria-label="Day Filter"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className={`text-xs md:text-sm leading-relaxed mb-3 md:mb-5 font-medium text-gray-600`}>
                    <span className="hidden md:inline">Explore Chicago events July 20–26 with interactive maps, day and category filters. Plan your week faster.<br /><br /></span>
                    <span className="block md:inline">Built independently by <a href="https://www.linkedin.com/in/monicapara/" target="_blank" rel="noopener noreferrer" className={`underline transition-colors hover:text-[#E4002B]`}>Monica</a> & <a href="https://www.linkedin.com/in/zalak-zecco-patel-3a618890/" target="_blank" rel="noopener noreferrer" className={`underline transition-colors hover:text-[#E4002B]`}>Zecco</a>.<span className="hidden md:inline"> Not affiliated with P33 Chicago.</span></span>
                </p>

                <div className="mb-2 md:mb-4 hidden md:block">
                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-2 text-gray-500`}>
                    Day
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`text-[11px] font-semibold tracking-wide px-3 py-1.5 rounded-full transition-colors ${
                          selectedDay === day 
                            ? 'bg-[#41B6E6] text-white'
                            : 'bg-[#e5e5ea] text-gray-700 hover:bg-[#d1d1d6]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
            </div>
        </div>
        
        {/* Map UI Hint */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10 text-xs font-semibold tracking-widest text-neutral-400 shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#E4002B] rounded-full animate-pulse"></span>
            DRAG TO ROTATE 3D MAP
        </div>
        
        {/* Mobile Day Filter Modal (Portal-like) */}
        {isDayFilterOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-[55] md:hidden" onClick={() => setIsDayFilterOpen(false)} />
            <div className={`fixed top-0 left-0 right-0 p-4 rounded-b-3xl border-b shadow-2xl backdrop-blur-2xl z-[60] transform transition-transform duration-300 md:hidden ${isDarkMode ? 'bg-[#1c1c1e]/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filter by Day</h3>
                <button onClick={() => setIsDayFilterOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-900'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      setIsDayFilterOpen(false);
                    }}
                    className={`text-base text-left px-4 py-3 rounded-2xl transition-colors ${
                      selectedDay === day
                        ? (isDarkMode ? 'bg-[#41B6E6] text-white font-medium' : 'bg-[#41B6E6] text-white font-medium')
                        : (isDarkMode ? 'text-neutral-200 hover:bg-[#2c2c2e]' : 'text-gray-800 hover:bg-[#e5e5ea]')
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Absolute Controls */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none md:top-6 md:bottom-auto md:left-auto md:right-6 md:justify-end z-40">
          <div className="flex flex-col gap-2 items-center md:items-end pointer-events-auto">
            <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsListOpen(!isListOpen)}
              className={`md:hidden shrink-0 w-11 h-11 flex items-center justify-center rounded-full transition-colors shadow-lg backdrop-blur-2xl border ${isDarkMode ? 'bg-white text-black border-none' : 'bg-white border-black/10 text-slate-700 hover:bg-[#f2f2f7]/80'} ${isListOpen ? 'text-[#41B6E6]' : ''}`}
              aria-label="Toggle List"
            >
              <List className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`shrink-0 w-11 h-11 flex items-center justify-center rounded-full transition-colors shadow-lg backdrop-blur-2xl border ${isDarkMode ? 'bg-white text-black border-none hover:bg-neutral-200' : 'bg-white border-black/10 text-slate-700 hover:bg-[#f2f2f7]/80'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`shrink-0 w-11 h-11 flex items-center justify-center rounded-full transition-colors shadow-lg backdrop-blur-2xl border ${isDarkMode ? 'bg-white text-black border-none hover:bg-neutral-200' : 'bg-white border-black/10 text-slate-700 hover:bg-[#f2f2f7]/80'} ${isFilterOpen || selectedTheme !== 'All Themes' ? 'text-[#41B6E6]' : ''}`}
                aria-label="Filter Icon"
              >
                <Filter className="w-5 h-5" />
              </button>
              
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 bg-black/40 z-[55] md:hidden" onClick={() => setIsFilterOpen(false)} />
                  <div className={`fixed bottom-0 left-0 right-0 p-4 rounded-t-3xl border-t shadow-2xl backdrop-blur-2xl z-[60] transform transition-transform duration-300 md:absolute md:top-full md:bottom-auto md:left-auto md:right-0 md:mt-2 md:mb-0 md:p-2 md:rounded-3xl md:border md:w-72 max-h-[80vh] md:max-h-[60vh] overflow-y-auto custom-scrollbar pointer-events-auto ${isDarkMode ? 'bg-[#1c1c1e]/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
                    <div className="flex justify-between items-center mb-4 md:hidden">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Filter by Theme</h3>
                      <button onClick={() => setIsFilterOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-900'}`}>
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-wider mb-2 px-2 pt-2 ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
                      Event Themes
                    </label>
                    <div className="flex flex-col gap-1.5 md:gap-1">
                    {THEMES.map(theme => (
                      <button
                        key={theme}
                        onClick={() => {
                          setSelectedTheme(theme);
                          setIsFilterOpen(false);
                        }}
                        className={`text-sm text-left px-3 py-2 rounded-xl transition-colors ${
                          selectedTheme === theme
                            ? (isDarkMode ? 'bg-[#41B6E6] text-white font-medium' : 'bg-[#41B6E6] text-white font-medium')
                            : (isDarkMode ? 'text-neutral-200 hover:bg-[#2c2c2e]' : 'text-gray-800 hover:bg-[#e5e5ea]')
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                </>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (LIST VIEW) */}
      <div className={`absolute md:relative right-0 top-0 bottom-0 w-full md:w-[420px] transform transition-transform duration-300 ${isListOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} ${isDarkMode ? 'bg-[#000000] border-[#38383a]' : 'bg-[#f2f2f7] border-[#c6c6c8]'} border-l flex flex-col z-50 md:z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] md:order-2`}>
        
        {/* Mobile Header with Back Button */}
        <div className={`md:hidden flex items-center px-4 py-3 border-b ${isDarkMode ? 'border-[#38383a]' : 'border-[#c6c6c8]'}`}>
          <button 
            onClick={() => setIsListOpen(false)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDarkMode ? 'text-[#41B6E6] hover:text-[#41B6E6]' : 'text-[#41B6E6] hover:text-[#41B6E6]'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Map
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className={`mb-4 px-1 text-sm font-semibold ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
               {filteredCompanies.length} {filteredCompanies.length === 1 ? 'Event' : 'Events'}
            </div>
            <div className="space-y-4">
              {filteredCompanies.map((company, idx) => (
              <a 
                key={company.id}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-4 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-[#1c1c1e] hover:bg-[#2c2c2e]' 
                    : 'bg-white hover:bg-[#e5e5ea] shadow-sm hover:shadow-md'
                }`}
              >
                {/* Minimal glow logic based on company color */}
                <div 
                  className="absolute inset-x-0 -bottom-px h-px opacity-0 group-hover:opacity-100 transition-opacity" 
                  style={{ background: `linear-gradient(to right, transparent, ${company.color}, transparent)` }}
                />
                
                <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: isDarkMode ? '#41B6E6' : '#fff', backgroundColor: isDarkMode ? '#41B6E620' : '#41B6E6' }}>
                            {company.date}
                        </span>
                        <span className={`text-[11px] font-medium tracking-wide flex items-center gap-1.5 ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
                            <span>{getDayForDate(company.date)}</span>
                            {company.time !== 'TBA' && (
                              <>
                                <span className="opacity-40">•</span>
                                <span>{company.time}</span>
                              </>
                            )}
                        </span>
                    </div>
                    
                    {/* Arrow CTA */}
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#3a3a3c] text-neutral-300 group-hover:bg-white group-hover:text-black' 
                        : 'bg-[#f2f2f7] text-gray-400 group-hover:bg-black group-hover:text-white'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17l9.2-9.2M17 17V7H7"/>
                      </svg>
                    </div>
                </div>
                <div>
                    <h3 className={`text-base font-semibold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{toSentenceCase(company.name)}</h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>{company.desc}</p>
                </div>
              </a>
            ))}
            </div>
        </div>
      </div>

    </div>
  );
}

