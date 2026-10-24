import {
  GOLDMEDAL_WIRE_2_5,
  MODULAR_SWITCH_6A,
  MCB_SINGLE_POLE,
  LED_BULB_9W,
  CEILING_FAN_1200,
  PVC_CONDUIT_PIPE,
  EXTENSION_BOARD,
  DOORBELL_CHIME,
  SMART_WIFI_PLUG
} from './productImages.js';

export const CATEGORIES = [
  {
    id: 'wires-cables',
    name: 'Wires & Cables (Polycab & Goldmedal)',
    icon: 'Cable',
    description: 'High-conductivity copper house wires, FR/FRLS cables, flexible cords & cable accessories by Goldmedal and Polycab.',
    subcategories: [
      'Polycab Copper House Wire',
      'Goldmedal FR / FRLS Wire',
      'Flexible Wire & Cables',
      'Cable Coils (90m Factory Sealed)',
      'Cable Clips & Accessories',
      'Lugs & Glands'
    ],
    badge: 'Polycab & Goldmedal Only',
    image: GOLDMEDAL_WIRE_2_5
  },
  {
    id: 'switches-sockets',
    name: 'Switches & Sockets',
    icon: 'ToggleRight',
    description: 'Modern modular switches, sockets, USB chargers, designer plates & concealed gang boxes.',
    subcategories: [
      'Modular Switches',
      '6A Sockets',
      '16A Heavy Sockets',
      'USB Charging Sockets',
      'Bell Push Switches',
      'Fan Regulators & Dimmers',
      'Modular Plates & Concealed Boxes'
    ],
    badge: 'Flame Retardant',
    image: MODULAR_SWITCH_6A
  },
  {
    id: 'protection-distribution',
    name: 'Protection & Distribution',
    icon: 'ShieldCheck',
    description: 'Miniature circuit breakers (MCBs), RCCBs, isolators, DB boxes & surge protection devices.',
    subcategories: [
      'SP & DP MCBs',
      'RCCBs & RCBOs',
      'Isolators',
      'Distribution Boards (DB)',
      'Surge Protection Devices (SPD)',
      'Fuses & Changeovers'
    ],
    badge: 'IS/IEC 60898',
    image: MCB_SINGLE_POLE
  },
  {
    id: 'lighting',
    name: 'Lighting',
    icon: 'Lightbulb',
    description: 'Energy-efficient LED bulbs, slim panel lights, batten tubelights, downlights & floodlights.',
    subcategories: [
      'LED Bulbs (B22/E27)',
      'Battens & Tube Lights',
      'Slim Panel & Downlights',
      'Outdoor & Flood Lights',
      'Emergency Inverter Bulbs',
      'Bulb Holders & Batten Caps'
    ],
    badge: 'Surge Protected',
    image: LED_BULB_9W
  },
  {
    id: 'fans-ventilation',
    name: 'Fans & Ventilation',
    icon: 'Wind',
    description: 'High air delivery ceiling fans, BLDC energy savers, quiet exhaust fans & wall mount fans.',
    subcategories: [
      'BLDC & Ceiling Fans (1200mm)',
      'Kitchen & Bath Exhaust Fans',
      'Wall Mount & Cabin Fans',
      'Electronic Regulators',
      'Fan Downrods & Canopies'
    ],
    badge: '5-Star Energy Rated',
    image: CEILING_FAN_1200
  },
  {
    id: 'conduits-supplies',
    name: 'Conduits & Installation',
    icon: 'Wrench',
    description: 'Heavy PVC conduit pipes, flexible corrugated pipes, junction boxes, bends & electrical tapes.',
    subcategories: [
      'PVC Rigid Conduits (20mm/25mm)',
      'Flexible Corrugated Conduits',
      'Deep Junction Boxes',
      'Bends, Saddles & Couplers',
      'FR Insulation Tape Packs',
      'Fasteners & Rawl Plugs'
    ],
    badge: 'Contractor Favorite',
    image: PVC_CONDUIT_PIPE
  },
  {
    id: 'power-backup',
    name: 'Power & Backup',
    icon: 'BatteryCharging',
    description: 'Surge spike guards, AC voltage stabilizers, pure sine wave home inverters & tubular batteries.',
    subcategories: [
      'Extension Boards & Spike Guards',
      'Automatic AC Voltage Stabilizers',
      'Pure Sine Wave Inverters',
      'Tubular Inverter Batteries',
      'Compact Desktop UPS'
    ],
    badge: 'Heavy Duty',
    image: EXTENSION_BOARD
  },
  {
    id: 'doorbells-accessories',
    name: 'Doorbells & Accessories',
    icon: 'BellRing',
    description: 'Melodious mechanical and wireless doorbells, heavy 3-pin plug tops, multi-adaptors & night lamps.',
    subcategories: [
      'Doorbells (Chime & Wireless)',
      'Plug Tops (6A & 16A)',
      'Multi-Plug Surge Adaptors',
      'Sensor Night Lamps',
      'Bed Switches & Testers'
    ],
    badge: 'Home Essentials',
    image: DOORBELL_CHIME
  },
  {
    id: 'smart-home',
    name: 'Smart Home Automation',
    icon: 'Cpu',
    description: 'WiFi modular touch switches, 16A smart plugs with power monitoring, motion sensors & smart lighting.',
    subcategories: [
      'Smart WiFi Modular Switches',
      '16A Heavy Duty Smart Plugs',
      'PIR Motion & Door Sensors',
      'Smart RGB Downlights & Strips',
      'WiFi Hubs & IR Blasters'
    ],
    badge: 'Voice Controlled',
    image: SMART_WIFI_PLUG
  }
];

export const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    subtitle: 'Warm ambiance, smart lighting, high-load entertainment sockets',
    icon: 'Tv',
    banner: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    keyNeeds: ['1200mm Ceiling Fan / BLDC', '12W Warm White Downlights', '6-Module TV Point Plate', 'Spike Guard & Surge Protector', 'Smart Dimmer Switch'],
    categoryIds: ['fans-ventilation', 'lighting', 'switches-sockets', 'power-backup', 'smart-home']
  },
  {
    id: 'kitchen-dining',
    name: 'Kitchen & Dining',
    subtitle: 'Heavy-duty 16A/20A power for microwave, chimney, mixer & refrigerator',
    icon: 'Utensils',
    banner: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    keyNeeds: ['16A Modular Sockets', 'High CFM Exhaust Fan', '20W Cool Day Batten Light', '2.5 sq mm Polycab / Goldmedal Wire', 'Weatherproof Under-Counter LED'],
    categoryIds: ['switches-sockets', 'fans-ventilation', 'lighting', 'wires-cables']
  },
  {
    id: 'master-bedroom',
    name: 'Bedrooms',
    subtitle: 'Relaxing 2-way bed switches, step regulators, AC points & USB chargers',
    icon: 'BedDouble',
    banner: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
    keyNeeds: ['Dual USB Charging Socket', 'Quiet BLDC Fan with Remote', 'Two-Way Modular Bed Switches', '4kVA AC Voltage Stabilizer', 'Dusk-to-Dawn Night Lamp'],
    categoryIds: ['switches-sockets', 'fans-ventilation', 'power-backup', 'doorbells-accessories']
  },
  {
    id: 'bathroom-utility',
    name: 'Bathroom & Utility',
    subtitle: 'Water-resistant fittings, dedicated geyser & washing machine protection',
    icon: 'Droplets',
    banner: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
    keyNeeds: ['16A/25A Geyser Switch with Indicator', 'IP44 Bathroom Exhaust Fan', '30mA RCCB Shock Protection', 'Waterproof IP65 Bulkhead Light', 'Heavy 4 sq mm Polycab Line Wire'],
    categoryIds: ['switches-sockets', 'fans-ventilation', 'protection-distribution', 'lighting', 'wires-cables']
  },
  {
    id: 'balcony-outdoor',
    name: 'Balcony & Exterior',
    subtitle: 'All-weather lighting, weatherproof junction boxes & garden illumination',
    icon: 'Trees',
    banner: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    keyNeeds: ['50W Waterproof IP65 Floodlight', 'Weatherproof Socket Enclosure', 'Wireless Outdoor Doorbell (100m)', 'UV Resistant Conduit Pipe', 'Smart Twilight Sensor'],
    categoryIds: ['lighting', 'doorbells-accessories', 'conduits-supplies', 'smart-home']
  },
  {
    id: 'main-panel',
    name: 'Main Distribution Panel',
    subtitle: 'Whole-house electrical safety, overload protection, earth leakage control',
    icon: 'Boxes',
    banner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    keyNeeds: ['8-Way / 12-Way Double Door DB', '40A / 63A 4-Pole RCCB', 'C-Curve SP MCBs (6A - 32A)', 'Type 2 Surge Protection Device', 'Pure Copper Earthing Kit'],
    categoryIds: ['protection-distribution', 'wires-cables', 'conduits-supplies']
  }
];

export const STORE_INFO = {
  name: 'NAVEEN-ELECTRONICS',
  displayName: 'NAVEEN ELECTRONICS',
  legalName: 'Naveen Electronics & Electrical Store',
  colony: 'Raghavendra Colony',
  city: 'Jogulamba Gadwal',
  district: 'Jogulamba Gadwal',
  state: 'Telangana',
  country: 'India',
  pincode: '509125',
  address: 'Shop No. 3 & 4, Raghavendra Colony Main Road, Near Market, Jogulamba Gadwal, Telangana 509125',
  phone: '9440800487',
  formattedPhone: '+91 9440800487',
  whatsapp: '919440800487',
  email: 'naveenelectronics.gadwal@gmail.com',
  gstin: '36AAECN8921B1Z9',
  operatingHours: 'Mon - Sun: 8:00 AM to 9:30 PM (All 7 Days Open)',
  expressDeliveryHours: 'Same-day delivery across Raghavendra Colony & Jogulamba Gadwal town',
  indicativePriceNotice: 'Estimated Prices Only: Product prices vary by daily copper rates, brand, and specifications. All prices shown are estimates until confirmed directly with Naveen Electronics.',
  safetyNotice: 'Safety Advisory: Mains voltage carries severe electrical shock hazards. Always hire a qualified licensed electrician for wire sizing, MCBs, and connections in accordance with the Indian Electricity Rules.'
};
