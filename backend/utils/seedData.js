const initialServices = [
  {
    icon: '⚙️',
    title: 'Compact Spinning Spares',
    description: 'Precision-engineered spare parts including sensors, gears, pins, and suction components for optimal spinning efficiency.',
    category: 'core',
  },
  {
    icon: '🔧',
    title: 'Electronic Servicing',
    description: 'PCB repairs, VFD servicing, drive support for Siemens, Mitsubishi, Danfoss, and ABB systems with quick turnaround.',
    category: 'core',
  },
  {
    icon: '📱',
    title: 'HMI Display Solutions',
    description: 'Professional HMI conversions, display upgrades, and custom safety covers for modern textile machinery systems.',
    category: 'core',
  },
  {
    icon: '🤖',
    title: 'Industrial Automation',
    description: 'Customized automation solutions, control panel diagnostics, and machine interface upgrades for enhanced productivity.',
    category: 'core',
  },
  {
    icon: '🛡️',
    title: 'Preventive Maintenance',
    description: 'Comprehensive maintenance support designed to minimize downtime and extend the life of your equipment.',
    category: 'core',
  },
  {
    icon: '💡',
    title: 'Technical Support',
    description: '24/7 responsive technical assistance and expert troubleshooting for all your textile machinery needs.',
    category: 'core',
  },
];

const initialExpertise = [
  {
    title: 'Component-Level Fault Finding',
    description: 'We trace failures down to the individual capacitor, driver or sensor, so boards are repaired rather than replaced whenever it makes sense.',
    category: 'expertise',
  },
  {
    title: 'Multi-Brand Machine Knowledge',
    description: 'Hands-on familiarity with Rieter, Trützschler, Lakshmi and Savio systems, and how their electronics and mechanics behave in real running conditions.',
    category: 'expertise',
  },
  {
    title: 'Bench Testing & Validation',
    description: 'Repaired drives and boards are load-tested against machine parameters before dispatch, cutting repeat failures and return visits.',
    category: 'expertise',
  },
  {
    title: 'Retrofit & Upgrade Engineering',
    description: 'Planning and fitting newer components into older machines, with wiring, signal and mounting details worked out to avoid production disruption.',
    category: 'expertise',
  },
  {
    title: 'Root-Cause Analysis',
    description: 'We look beyond the immediate fault to why it happened, whether heat, dust, power quality or wear, and advise on preventing a repeat.',
    category: 'expertise',
  },
  {
    title: 'Shop-Floor Training',
    description: 'Practical guidance for your maintenance crew on safe handling, quick checks and early warning signs, based on what we see in the field.',
    category: 'expertise',
  },
];

const initialStats = [
  { icon: '✓', number: '10+', label: 'Years of Experience' },
  { icon: '✓', number: '1K+', label: 'Machines Serviced' },
  { icon: '✓', number: '2.5K+', label: 'Happy Customers' },
  { icon: '✓', number: '98%', label: 'Customer Satisfaction' },
];

const initialTeam = [
  { name: 'Senior Engineer', role: 'Senior Engineer', specialty: 'Compact Spinning Systems', icon: '👨‍🔧' },
  { name: 'Electronics Specialist', role: 'Electronics Specialist', specialty: 'Drive & PCB Repairs', icon: '👩‍💼' },
  { name: 'Automation Expert', role: 'Automation Expert', specialty: 'HMI & Control Systems', icon: '👨‍💻' },
  { name: 'Technical Support Lead', role: 'Technical Support Lead', specialty: '24/7 Customer Service', icon: '👩‍🔬' },
];

const initialFaqs = [
  {
    question: 'What types of machinery do you service?',
    answer: 'We specialize in compact spinning systems, modern textile machinery, and industrial automation equipment from leading manufacturers including Rieter, Trützschler, Lakshmi, Savio, and others.',
    order: 1,
  },
  {
    question: "What's your typical turnaround time?",
    answer: 'Most repairs are completed within 24-48 hours. For complex jobs, we provide daily updates and work to minimize your downtime wherever possible.',
    order: 2,
  },
  {
    question: 'Do you offer preventive maintenance?',
    answer: 'Yes, we offer comprehensive preventive maintenance plans customized to your machinery and production schedule to minimize unexpected breakdowns.',
    order: 3,
  },
  {
    question: 'Are spare parts always in stock?',
    answer: 'We maintain inventory of commonly needed parts and can source specialized components quickly through our supplier network across India.',
    order: 4,
  },
  {
    question: 'Do you provide warranty on repairs?',
    answer: 'All repairs come with a 6-month warranty on parts and labor. Extended warranties and maintenance contracts are also available.',
    order: 5,
  },
];

const initialCatalogItems = [
  {
    name: 'Rieter Compact Suction Tube',
    sku: 'SSTE-CS-101',
    category: 'Compact Spinning Spares',
    description: 'High-grade replacement suction tube compatible with Rieter compact spinning frames. Made of durable polycarbonate for optimal suction efficiency.',
    specifications: ['Material: Durastan Polycarbonate', 'Compatibility: Rieter K44, K45', 'Weight: 120g'],
    compatibility: 'Rieter K44, K45, K46',
    availability: 'In Stock',
    imagePlaceholder: '⚙️',
  },
  {
    name: 'Siemens Sinamics VFD Drive 7.5kW',
    sku: 'SSTE-EL-204',
    category: 'Drives & Inverters',
    description: 'Fully reconditioned Siemens Sinamics V20 Variable Frequency Drive. Pre-tested on factory loads with calibrated power efficiency.',
    specifications: ['Power: 7.5 kW (10 HP)', 'Input: 380-480V 3-Phase', 'Control: USS/Modbus RTU'],
    compatibility: 'LMW ring frames, standard industrial blowers',
    availability: 'Limited Stock',
    imagePlaceholder: '🔌',
  },
  {
    name: 'Lakshmi Ring Frame HMI Display Panel',
    sku: 'SSTE-HMI-302',
    category: 'HMI & Control Screens',
    description: 'Upgrade replacement touchscreen for Lakshmi Ring Frame control panels. Features high-brightness display and improved dust-resistant cover.',
    specifications: ['Screen Size: 7.0 Inch TFT', 'Resolution: 800x480', 'IP Rating: IP65 Dustproof Front Cover'],
    compatibility: 'LMW LR6, LR9 Ring Frames',
    availability: 'In Stock',
    imagePlaceholder: '🖥️',
  },
  {
    name: 'Mitsubishi FR-A840 Inverter Card',
    sku: 'SSTE-EL-209',
    category: 'Electronic Boards',
    description: 'Serviced and tested main control PCB for Mitsubishi FR-A800 series inverters. Ready for drop-in replacement.',
    specifications: ['Compatible series: FR-A840-00250 to 00470', 'Calibrated outputs', '6-month warranty'],
    compatibility: 'Mitsubishi FR-A800 VFDs',
    availability: 'Call for Availability',
    imagePlaceholder: '💾',
  },
  {
    name: 'Optoelectronic Yarn Sensor',
    sku: 'SSTE-SEN-401',
    category: 'Sensors & Electronics',
    description: 'High-sensitivity yarn break detection sensor for winding and spinning machines. Features fast response time and status indicator LED.',
    specifications: ['Response Time: < 15ms', 'Supply Voltage: 24V DC', 'Connection: 3-wire M8 connector'],
    compatibility: 'Savio, Schlafhorst, and custom winding frames',
    availability: 'In Stock',
    imagePlaceholder: '👁️',
  },
  {
    name: 'Compact Spinning Suction Slot Grid',
    sku: 'SSTE-CS-105',
    category: 'Compact Spinning Spares',
    description: 'Laser-cut stainless steel slot grid for compact suction nozzles. Ensures uniform tension and fiber path stability.',
    specifications: ['Material: 316 Stainless Steel', 'Slot Size: 0.8mm', 'Finish: Electro-polished'],
    compatibility: 'Rieter, Lakshmi compact systems',
    availability: 'In Stock',
    imagePlaceholder: '⚙️',
  },
];

module.exports = {
  initialServices,
  initialExpertise,
  initialStats,
  initialTeam,
  initialFaqs,
  initialCatalogItems,
};
