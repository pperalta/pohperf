/*
 * Piper PA28-161 Warrior III data
 */

ac.addModel({
	model: 'warrior3',
	dataSource:"Warrior III PA-28-161 SN 2842001 and up Pilot's Operation Handbook.\
		VB-1610, Revision 22.",
	serialNums: '16110-16119,42001-42999', // A3 begins at 43001
	serialPrefix: '28',

	airspeedUnits: 'kias',				// show KIAS only
	maxAlt: 10000,						// maximum altitude in cruise tables
	maxXwind: 17,

	dfltTaxiFuel: 1.2,					// taxi + takeoff fuel (7 lbs / LBSPERGAL)
	minTOfuel: 0,
	maxRampWeight: 2447,
	maxTOweight: 2440,
	maxLdgWeight: 2440,
	maxUtilWeight: 2020,

	CGenvelope: new CGenvelope({
		title: 'CG envelope',
		parmNames: ['category', 'limit', 'weight'],
		a: [
			{p:'utility', a:[
				{p:'forward', a:[
					{p:0,		v:83},
					{p:1950,	v:83},
					{p:2020,	v:83.8},
				]},
				{p:'aft', a:[
					{p:0,		v:93},
					{p:2020,	v:93},
				]},
			]},
			{p:'normal', a:[
				{p:'forward', a:[
					{p:0,		v:83},
					{p:1950,	v:83},
					{p:2440,	v:88.3},
				]},
				{p:'aft', a:[
					{p:0,		v:93},
					{p:2440,	v:93},
				]},
			]},
		]
	}),
	CGstations: {
		fuel:		{max:48,	arm:95},	// 48 gal of usable fuel
		seat1:		{max:400,	arm:80.5},	// Has both L and R
		seat2:		{max:400,	arm:118.1},	// Has both L and R
		baggage:	{max:200,	arm:142.8},
	},
	CGempty: new CGpoint(1543.6, 86.3749),	// Fig. 6-5

	IAStoCAS: new Ptable({
		title: "Calibrated airspeed",
		parmNames: ['flaps', 'airspeed'],
		rndMult: 1,
		a:[
		{p:'none', a:[
			{p:50,	v:57.5},
			{p:60,	v:65},
			{p:70,	v:73},
			{p:80,	v:81},
			{p:90,	v:90},
			{p:100, v:99},
			{p:120, v:117},
			{p:140, v:135},
			{p:160, v:153},
		]},
		{p:'partial', a:[	// not in POH, assume same as none
			{p:50,	v:57.5},
			{p:60,	v:65},
			{p:70,	v:73},
			{p:80,	v:81},
			{p:90,	v:90},
			{p:100, v:99},
			{p:120, v:117},
			{p:140, v:135},
			{p:160, v:153},
		]},
		{p:'full', a:[
			{p:43,	v:50},
			{p:50,	v:55},
			{p:60,	v:62.3},
			{p:70,	v:70.5},
			{p:80,	v:79},
			{p:90,	v:88},
			{p:100, v:96.5},
			{p:104, v:100},
		]},
	]}),
	CAStoIAS: null,						// built below

	stallIAS: new Ptable({				// Fig 5.5
		title: "Vs",
		parmNames: ['flaps', 'weight'],
		parmLimits: [''],
		rndMult: 1,
		a: [
		{p:'none',		a:[
			{p:1600,	v:40},
			{p:1700,	v:41.75},
			{p:1800,	v:43.5},
			{p:1900,	v:45},
			{p:2000,	v:46.25},
			{p:2100,	v:47.5},
			{p:2200,	v:48.5},
			{p:2300,	v:49.5},
			{p:2440,	v:50},
		]},
		// not in POH, assume same as none
		{p:'partial',	a:[
			{p:1600,	v:40},
			{p:1700,	v:41.75},
			{p:1800,	v:43.5},
			{p:1900,	v:45},
			{p:2000,	v:46.25},
			{p:2100,	v:47.5},
			{p:2200,	v:48.5},
			{p:2300,	v:49.5},
			{p:2440,	v:50},
		]},
		{p:'full',		a:[
			{p:1600,	v:34},
			{p:1700,	v:35.75},
			{p:1800,	v:37.5},
			{p:1900,	v:39},
			{p:2000,	v:40.25},
			{p:2100,	v:41.5},
			{p:2200,	v:42.5},
			{p:2300,	v:43.5},
			{p:2440,	v:44},
		]},
	]}),
	stallCAS: new Ptable({				// derived from stallIAS with Fig. 5-3
		title: "VsCAS",
		parmNames: ['flaps', 'weight'],
		parmLimits: ['B'],
		rndMult: 1,
		a: [
		{p:'none',		a:[
			{p:1600,	v:47},
			{p:1800,	v:50.25},
			{p:1900,	v:51.5},
			{p:2000,	v:53},
			{p:2100,	v:54},
			{p:2200,	v:55},
			{p:2300,	v:55.75},
			{p:2440,	v:56.25},
		]},
		// not in POH, assume same as none
		{p:'partial',	a:[
			{p:1600,	v:47},
			{p:1800,	v:50.25},
			{p:1900,	v:51.5},
			{p:2000,	v:53},
			{p:2100,	v:54},
			{p:2200,	v:55},
			{p:2300,	v:55.75},
			{p:2440,	v:56.25},
		]},
		{p:'full',		a:[
			{p:1600,	v:41},
			{p:1700,	v:43},
			{p:1800,	v:44.5},
			{p:1900,	v:46},
			{p:2000,	v:47},
			{p:2100,	v:48},
			{p:2200,	v:49},
			{p:2300,	v:49.75},
			{p:2440,	v:50},
		]},
	]}),

	Vx: new Ptable({					// Page 4-2
		title: "Vx",
		parmNames: ["altitude"],
		parmLimits: ['B'],
		rndMult: 1,
		a: [
		{p:0,		v:63},
	]}),
	Vy: new Ptable({		// Page 4-2
		title: "IAS for max. rate climb",
		parmNames: ["altitude"],
		parmLimits: ['B'],
		rndMult: 1,
		a: [
		{p:0,		v:79},
	]}),
	Va: new Ptable({					// Page 2-2
		title: "Va",
		parmNames: ["weight"],
		parmLimits: ['L'],
		rndMult: 1,
		a: [
		{p:1531,	v:88},
		{p:2440,	v:111},
	]}),

	TOVr: new Ptable({					// Fig. 5-9, 5-13
		title: 'Vr',
		parmNames: ['flaps', 'weight'],
		parmLimits: ['', 'L'],
		rndMult: 1,
		a: [
		{p:'none', a: [
			{p:1600, v:40},
			{p:1800, v:43},
			{p:2000, v:46},
			{p:2200, v:48},
			{p:2440, v:52},
		]},
		{p:'partial', a: [
			{p:1600, v:40},
			{p:1800, v:43},
			{p:2000, v:46},
			{p:2200, v:48},
			{p:2440, v:52},
		]},
	]}),
	TOV50: new Ptable({					// Fig. 5-9, 5-13
		title: "IAS at 50'",
		parmNames: ['flaps', 'weight'],
		parmLimits: ['', 'L'],
		rndMult: 1,
		a: [
		{p:'none', a: [
			{p:1600, v:44},
			{p:1800, v:47},
			{p:2000, v:50},
			{p:2200, v:53},
			{p:2440, v:57},
		]},
		{p:'partial', a: [
			{p:1600, v:44},
			{p:1800, v:47},
			{p:2000, v:50},
			{p:2200, v:53},
			{p:2440, v:57},
		]},
	]}),

	TOroll: new Ptable({				// Fig. 5-11, 5-13
		title: "Takeoff ground roll",
		parmNames: ['flaps', 'altitude', 'oat'],
		parmLimits: ['', 'L', 'L'],
		rndMult: 1,
		a: [
		{p:'none',	a: [
			{p:0, a: [
				{p:-13,		v:600},
				{p:0,		v:830},
				{p:10,		v:1015},
				{p:20,		v:1225},
				{p:40,		v:1630},
			]}, {p:1000, a: [
				{p:-25,		v:600},
				{p:-20,		v:690},
				{p:-10,		v:870},
				{p:0,		v:1050},
				{p:20,		v:1450},
				{p:40,		v:1850},
			]}, {p:2000, a: [
				{p:-39,		v:600},
				{p:-20,		v:910},
				{p:0,		v:1270},
				{p:20,		v:1650},
				{p:40,		v:2050},
			]}, {p:3000, a: [
				{p:-40,		v:840},
				{p:-20,		v:1140},
				{p:0,		v:1490},
				{p:20,		v:1860},
				{p:40,		v:2240},
			]}, {p:4000, a: [
				{p:-40,		v:1040},
				{p:-20,		v:1350},
				{p:0,		v:1700},
				{p:20,		v:2060},
				{p:40,		v:2450},
			]}, {p:5000, a: [
				{p:-40,		v:1260},
				{p:-20,		v:1560},
				{p:0,		v:1910},
				{p:20,		v:2275},
				{p:37.5,	v:2600},
			]}, {p:6000, a: [
				{p:-40,		v:1450},
				{p:-20,		v:1770},
				{p:0,		v:2120},
				{p:20,		v:2475},
				{p:27,		v:2600},
			]}, {p:7000, a: [
				{p:-40,		v:1660},
				{p:-20,		v:1950},
				{p:0,		v:2280},
				{p:17.8,	v:2600},
			]},
		]},
		{p:'partial',	a: [
			{p:0, a: [
				{p:10,		v:975},
				{p:40,		v:1400},
			]}, {p:1000, a: [
				{p:0,		v:1000},
				{p:40,		v:1600},
			]}, {p:2000, a: [
				{p:-13,		v:1000},
				{p:40,		v:1755},
			]}, {p:3000, a: [
				{p:-26,		v:1000},
				{p:0,		v:1400},
				{p:20,		v:1680},
				{p:40,		v:1950},
			]}, {p:4000, a: [
				{p:-40,		v:960},
				{p:0,		v:1570},
				{p:20,		v:1850},
				{p:40,		v:2100},
			]}, {p:5000, a: [
				{p:-40,		v:1150},
				{p:0,		v:1745},
				{p:40,		v:2345},
			]}, {p:6000, a: [
				{p:-40,		v:1320},
				{p:0,		v:1925},
				{p:40,		v:2575},
			]}, {p:7000, a: [
				{p:-40,		v:1500},
				{p:0,		v:2125},
				{p:28.2,	v:2600},
			]},
		]},
		],
	}),
	TOrollWeightAdj: new Ptable({
		title: 'Takeoff ground roll weight adjustment',
		parmNames: ['flaps', 'ground roll', 'weight'],
		parmLimits: ['', 'P', 'L'],
		rndMult: 1,
		a: [
		{p:'none',	a: [
			{p:1100, a: [
				{p:1600,	v:450},
				{p:1800,	v:520},
				{p:2000,	v:660},
				{p:2200,	v:840},
				{p:2440,	v:1100},
			]}, {p:1500, a: [
				{p:1600,	v:615},
				{p:1800,	v:725},
				{p:2000,	v:915},
				{p:2200,	v:1160},
				{p:2440,	v:1500},
			]}, {p:1890, a: [
				{p:1600,	v:780},
				{p:1800,	v:935},
				{p:2000,	v:1180},
				{p:2200,	v:1490},
				{p:2440,	v:1890},
			]}, {p:2255, a: [
				{p:1600,	v:915},
				{p:1800,	v:1140},
				{p:2000,	v:1450},
				{p:2200,	v:1800},
				{p:2440,	v:2255},
			]}, {p:2600, a: [
				{p:1600,	v:1045},
				{p:1800,	v:1330},
				{p:2000,	v:1720},
				{p:2200,	v:2150},
				{p:2400,	v:2600},
			]},
		]},
		{p:'partial',	a: [
			{p:1050, a: [
				{p:1600,	v:500},
				{p:2000,	v:715},
				{p:2440,	v:1050},
			]}, {p:1425, a: [
				{p:1600,	v:680},
				{p:2000,	v:1000},
				{p:2440,	v:1425},
			]}, {p:1850, a: [
				{p:1600,	v:850},
				{p:2000,	v:1265},
				{p:2440,	v:1850},
			]}, {p:2250, a: [
				{p:1600,	v:1025},
				{p:1800,	v:1240},
				{p:2000,	v:1540},
				{p:2440,	v:2250},
			]}, {p:2600, a: [
				{p:1600,	v:1210},
				{p:1800,	v:1460},
				{p:2000,	v:1800},
				{p:2415,	v:2600},
			]},
		]},
		],
	}),
	TOrollHeadwindAdj: new Ptable({		// Fig. 5-11, 5-13
		title: 'Takeoff ground roll headwind adjustment',
		parmNames: ['flaps', 'ground roll', 'wind'],
		parmLimits: ['', 'P', 'H'],		// clamp wind > 15 kts
		rndMult: '10u',
		a: [
		{p:'none',	a: [
			{p:400, a: [
				{p:0,	v:400},
				{p:15,	v:290},
			]}, {p:600, a: [
				{p:0,	v:600},
				{p:15,	v:450},
			]}, {p:800, a: [
				{p:0,	v:800},
				{p:15,	v:595},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:15,	v:750},
			]}, {p:1200, a: [
				{p:0,	v:1200},
				{p:15,	v:930},
			]}, {p:1400, a: [
				{p:0,	v:1400},
				{p:15,	v:1090},
			]}, {p:1600, a: [
				{p:0,	v:1600},
				{p:15,	v:1230},
			]}, {p:1800, a: [
				{p:0,	v:1800},
				{p:15,	v:1390},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:15,	v:1575},
			]}, {p:2200, a: [
				{p:0,	v:2200},
				{p:15,	v:1715},
			]}, {p:2400, a: [
				{p:0,	v:2400},
				{p:15,	v:1925},
			]},
		]},
		{p:'partial',	a: [
			{p:600, a: [
				{p:0,	v:600},
				{p:15,	v:450},
			]}, {p:800, a: [
				{p:0,	v:800},
				{p:15,	v:600},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:15,	v:775},
			]}, {p:1200, a: [
				{p:0,	v:1200},
				{p:15,	v:925},
			]}, {p:1400, a: [
				{p:0,	v:1400},
				{p:15,	v:1090},
			]}, {p:1600, a: [
				{p:0,	v:1600},
				{p:15,	v:1260},
			]}, {p:1800, a: [
				{p:0,	v:1800},
				{p:15,	v:1430},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:15,	v:1580},
			]}, {p:2200, a: [
				{p:0,	v:2200},
				{p:15,	v:1780},
			]}, {p:2400, a: [
				{p:0,	v:2400},
				{p:15,	v:1950},
			]},
		]}],
	}),
	TOrollTailwindAdj: new Ptable({		// Fig. 5-11, 5-13
		title: 'Takeoff ground roll tailwind adjustment',
		parmNames: ['flaps', 'ground roll', 'wind'],
		parmLimits: ['', 'P', ''],
		rndMult: '10u',
		a: [
		{p:'none',	a: [
			{p:400, a: [
				{p:0,	v:400},
				{p:5,	v:525},
			]}, {p:600, a: [
				{p:0,	v:600},
				{p:5,	v:775},
			]}, {p:800, a: [
				{p:0,	v:800},
				{p:5,	v:1060},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:5,	v:1275},
			]}, {p:1200, a: [
				{p:0,	v:1200},
				{p:5,	v:1500},
			]}, {p:1400, a: [
				{p:0,	v:1400},
				{p:5,	v:1750},
			]}, {p:1600, a: [
				{p:0,	v:1600},
				{p:5,	v:2000},
			]}, {p:1800, a: [
				{p:0,	v:1800},
				{p:5,	v:2250},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:5,	v:2500},
			]}, {p:2200, a: [
				{p:0,	v:2200},
				{p:5,	v:2750},		// extrapolated
			]},
		]},
		{p:'partial',	a: [
			{p:600, a: [
				{p:0,	v:600},
				{p:5,	v:775},
			]}, {p:800, a: [
				{p:0,	v:800},
				{p:5,	v:1000},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:5,	v:1300},
			]}, {p:1200, a: [
				{p:0,	v:1200},
				{p:5,	v:1500},
			]}, {p:1400, a: [
				{p:0,	v:1400},
				{p:5,	v:1750},
			]}, {p:1600, a: [
				{p:0,	v:1600},
				{p:5,	v:2000},
			]}, {p:1800, a: [
				{p:0,	v:1800},
				{p:5,	v:2200},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:5,	v:2500},
			]}, {p:2200, a: [
				{p:0,	v:2200},
				{p:5,	v:2700},		// extrapolated
			]},
		]}],
	}),

	TOobs: new Ptable({					// Fig. 5-9, 5-13
		title: "Takeoff 50' obstacle clearance distance",
		parmNames: ['flaps', 'altitude', 'oat'],
		parmLimits: ['', 'L', 'L'],
		rndMult: 1,
		a: [
		{p:'none',	a: [
			{p:0, a: [
				{p:-6,		v:1500},
				{p:20,		v:2150},
				{p:40,		v:2650},
			]}, {p:1000, a: [
				{p:-16,		v:1500},
				{p:0,		v:1930},
				{p:20,		v:2450},
				{p:40,		v:3015},
			]}, {p:2000, a: [
				{p:-28,		v:1500},
				{p:0,		v:2200},
				{p:20,		v:2740},
				{p:40,		v:3335},
			]}, {p:3000, a: [
				{p:-38,		v:1500},
				{p:-20,		v:2000},
				{p:0,		v:2515},
				{p:20,		v:3075},
				{p:40,		v:3700},
			]}, {p:4000, a: [
				{p:-40,		v:1750},
				{p:-20,		v:2300},
				{p:0,		v:2885},
				{p:20,		v:3480},
				{p:40,		v:4150},
			]}, {p:5000, a: [
				{p:-40,		v:2025},
				{p:-20,		v:2615},
				{p:0,		v:3235},
				{p:20,		v:3885},
				{p:36,		v:4500},
			]}, {p:6000, a: [
				{p:-40,		v:2300},
				{p:-20,		v:2950},
				{p:0,		v:3615},
				{p:24.5,	v:4500},
			]}, {p:7000, a: [
				{p:-40,		v:2600},
				{p:-20,		v:3400},
				{p:0,		v:4040},
				{p:11.5,	v:4500},
			]},
		]},
		{p:'partial',	a: [
			{p:0, a: [
				{p:-11,		v:1000},
				{p:20,		v:1775},
				{p:40,		v:2280},
			]}, {p:1000, a: [
				{p:-21,		v:1000},
				{p:0,		v:1780},
				{p:20,		v:2025},
				{p:40,		v:2540},
			]}, {p:2000, a: [
				{p:-32.5,	v:1000},
				{p:0,		v:1790},
				{p:40,		v:2810},
			]}, {p:3000, a: [
				{p:-40,		v:1070},
				{p:0,		v:2080},
				{p:40,		v:3200},
			]}, {p:4000, a: [
				{p:-40,		v:1280},
				{p:0,		v:2330},
				{p:40,		v:3510},
			]}, {p:5000, a: [
				{p:-40,		v:1500},
				{p:0,		v:2660},
				{p:40,		v:4000},
			]}, {p:6000, a: [
				{p:-40,		v:1750},
				{p:-20,		v:2350},
				{p:0,		v:3030},
				{p:27.5,	v:4000},
			]}, {p:7000, a: [
				{p:-40,		v:2100},
				{p:-20,		v:2720},
				{p:17,		v:4000},
			]},
		]},
		],
	}),
	TOobsWeightAdj: new Ptable({
		title: "Takeoff 50' obstacle clearance distance weight adjustment",
		parmNames: ['flaps', 'ground roll', 'weight'],
		parmLimits: ['', 'P', 'L'],
		rndMult: 1,
		a: [
		{p:'none',	a: [
			{p:2000, a: [
				{p:1600,	v:640},
				{p:1800,	v:860},
				{p:2000,	v:1180},
				{p:2440,	v:2000},
			]}, {p:2600, a: [
				{p:1600,	v:870},
				{p:1800,	v:1180},
				{p:2000,	v:1560},
				{p:2440,	v:2600},
			]}, {p:3200, a: [
				{p:1600,	v:1100},
				{p:1800,	v:1480},
				{p:2000,	v:1960},
				{p:2440,	v:3200},
			]}, {p:3820, a: [
				{p:1600,	v:1350},
				{p:1800,	v:1860},
				{p:2000,	v:2430},
				{p:2440,	v:3820},
			]}, {p:4440, a: [
				{p:1600,	v:1600},
				{p:1800,	v:2150},
				{p:2000,	v:2800},
				{p:2440,	v:4440},
			]},
		]},
		{p:'partial',	a: [
			{p:1640, a: [
				{p:1600,	v:700},
				{p:2000,	v:1110},
				{p:2440,	v:1640},
			]}, {p:2190, a: [
				{p:1600,	v:940},
				{p:2000,	v:1480},
				{p:2440,	v:2190},
			]}, {p:2730, a: [
				{p:1600,	v:1200},
				{p:2200,	v:2230},
				{p:2440,	v:2730},
			]}, {p:3310, a: [
				{p:1600,	v:1475},
				{p:1900,	v:2050},
				{p:2200,	v:2690},
				{p:2440,	v:3310},
			]}, {p:3900, a: [
				{p:1600,	v:1710},
				{p:2100,	v:2850},
				{p:2300,	v:3400},
				{p:2440,	v:3900},
			]},
		]},
		],
	}),
	TOobsHeadwindAdj: new Ptable({
		title: "Takeoff 50' obstacle clearance distance headwind adjustment",
		parmNames: ['flaps', 'ground roll', 'wind'],
		parmLimits: ['', 'P', 'H'],		// clamp wind > 15 kts
		rndMult: '10u',
		a: [
		{p:'none',	a: [
			{p:500, a: [
				{p:0,	v:500},
				{p:15,	v:300},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:15,	v:800},
			]}, {p:1500, a: [
				{p:0,	v:1500},
				{p:15,	v:1200},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:15,	v:1640},
			]}, {p:2500, a: [
				{p:0,	v:2500},
				{p:15,	v:2030},
			]}, {p:3000, a: [
				{p:0,	v:3000},
				{p:15,	v:2440},
			]}, {p:3500, a: [
				{p:0,	v:3500},
				{p:15,	v:2830},
			]}, {p:4000, a: [
				{p:0,	v:4000},
				{p:15,	v:3310},
			]},
		]},
		{p:'partial',	a: [
			{p:1000, a: [
				{p:0,	v:1000},
				{p:15,	v:750},
			]}, {p:1500, a: [
				{p:0,	v:1500},
				{p:15,	v:1200},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:15,	v:1625},
			]}, {p:2500, a: [
				{p:0,	v:2500},
				{p:15,	v:2000},
			]}, {p:3000, a: [
				{p:0,	v:3000},
				{p:15,	v:2400},
			]}, {p:3500, a: [
				{p:0,	v:3500},
				{p:15,	v:2825},
			]}, {p:4000, a: [
				{p:0,	v:4000},
				{p:15,	v:3300},
			]},
		]},
		],
	}),
	TOobsTailwindAdj: new Ptable({
		title: "Takeoff 50' obstacle clearance distance tailwind adjustment",
		parmNames: ['flaps', 'ground roll', 'wind'],
		parmLimits: ['', 'P', ''],
		rndMult: '10u',
		a: [
		{p:'none',	a: [
			{p:500, a: [
				{p:0,	v:500},
				{p:5,	v:700},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:5,	v:1250},
			]}, {p:1500, a: [
				{p:0,	v:1500},
				{p:5,	v:1880},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:5,	v:2350},
			]}, {p:2500, a: [
				{p:0,	v:2500},
				{p:5,	v:2950},
			]}, {p:3000, a: [
				{p:0,	v:3000},
				{p:5,	v:3550},
			]}, {p:3500, a: [
				{p:0,	v:3500},
				{p:5,	v:4200},
			]}, {p:4000, a: [
				{p:0,	v:4000},
				{p:5,	v:4800},		// extrapolated
			]},
		]},
		{p:'partial',	a: [
			{p:500, a: [
				{p:0,	v:500},
				{p:5,	v:650},
			]}, {p:1000, a: [
				{p:0,	v:1000},
				{p:5,	v:1200},
			]}, {p:1500, a: [
				{p:0,	v:1500},
				{p:5,	v:1800},
			]}, {p:2000, a: [
				{p:0,	v:2000},
				{p:5,	v:2400},
			]}, {p:2500, a: [
				{p:0,	v:2500},
				{p:5,	v:3020},
			]}, {p:3000, a: [
				{p:0,	v:3000},
				{p:5,	v:3620},
			]}, {p:3500, a: [
				{p:0,	v:3500},
				{p:5,	v:4200},		// extrapolated
			]},
		]}],
	}),

	climbRate: new Ptable({				// Fig. 5-17
		title: "Climb Rate",
		parmNames: ["altitude", "isa"],
		parmLimits: ['L', 'L'],
		rndMult: '5d',
		a: [
		{p:0, a: [
			{p:-15,		v:677},
			{p:0,		v:644},
			{p:10,		v:624},
			{p:20,		v:604},
			{p:30,		v:585},
		]}, {p:1000, a: [
			{p:-15,		v:628},
			{p:0,		v:595},
			{p:10,		v:574},
			{p:20,		v:554},
			{p:30,		v:534},
		]}, {p:2000, a: [
			{p:-15,		v:578},
			{p:0,		v:545},
			{p:10,		v:524},
			{p:20,		v:504},
			{p:30,		v:485},
		]}, {p:3000, a: [
			{p:-15,		v:528},
			{p:0,		v:495},
			{p:10,		v:475},
			{p:20,		v:455},
			{p:30,		v:436},
		]}, {p:4000, a: [
			{p:-15,		v:478},
			{p:0,		v:446},
			{p:10,		v:425},
			{p:20,		v:405},
			{p:30,		v:386},
		]}, {p:5000, a: [
			{p:-15,		v:429},
			{p:0,		v:396},
			{p:10,		v:376},
			{p:20,		v:356},
			{p:30,		v:337},
		]}, {p:6000, a: [
			{p:-15,		v:379},
			{p:0,		v:346},
			{p:10,		v:326},
			{p:20,		v:306},
			{p:30,		v:287},
		]}, {p:7000, a: [
			{p:-15,		v:330},
			{p:0,		v:298},
			{p:10,		v:277},
			{p:20,		v:257},
			{p:30,		v:238},
		]}, {p:8000, a: [
			{p:-15,		v:280},
			{p:0,		v:248},
			{p:10,		v:227},
			{p:20,		v:207},
			{p:30,		v:188},
		]}, {p:9000, a: [
			{p:-15,		v:231},
			{p:0,		v:198},
			{p:10,		v:177},
			{p:20,		v:157},
			{p:30,		v:138},
		]}, {p:10000, a: [
			{p:-15,		v:181},
			{p:0,		v:149},
			{p:10,		v:128},
			{p:20,		v:108},
			{p:30,		v:89},
		]}, {p:11000, a: [
			{p:-15,		v:132},
			{p:0,		v:99},
			{p:10,		v:79},
			{p:20,		v:59},
			{p:30,		v:40},
		]}, {p:12000, a: [
			{p:-15,		v:83},
			{p:0,		v:49},
			{p:10,		v:29},
			{p:20,		v:9},
			{p:30,		v:-10},
		]}, {p:13000, a: [
			{p:-15,		v:33},
			{p:0,		v:0},
			{p:10,		v:-21},
			{p:20,		v:-41},
			{p:30,		v:-60},
		]}]
	}),
	// arbitrary units (derived from unlabeled y-axis on Fig. 5-19)
	climbTFD: new Ptable({
		title: "Climb Time/Fuel/Distance",
		parmNames: ['altitude', 'oat'],
		parmLimits: ['L', 'L'],
		a: [
		{p:0, a: [
			{p:0,	v:0},
			{p:45,	v:0},
		]}, {p:1000, a: [
			{p:-2,	v:3.25},
			{p:13,	v:3.7},
			{p:43,	v:5},
		]}, {p:2000, a: [
			{p:-4,	v:6.5},
			{p:11,	v:7.3},
			{p:41,	v:9.9},
		]}, {p:3000, a: [
			{p:-6,	v:9.7},
			{p:9,	v:11},
			{p:39,	v:14.9},
		]}, {p:4000, a: [
			{p:-8,	v:12.9},
			{p:7,	v:14.7},
			{p:37,	v:20},
		]}, {p:5000, a: [
			{p:-10,	v:16.2},
			{p:5,	v:18.4},
			{p:15,	v:20.3},
			{p:35,	v:25},
		]}, {p:6000, a: [
			{p:-12,	v:19.5},
			{p:3,	v:22.3},
			{p:15,	v:25},
			{p:33,	v:31.1},
		]}, {p:7000, a: [
			{p:-14,	v:22.9},
			{p:1,	v:26},
			{p:15,	v:29.8},
			{p:31,	v:35.1},
		]}, {p:8000, a: [
			{p:-16,	v:26.2},
			{p:-1,	v:29.9},
			{p:15,	v:34.7},
			{p:29,	v:39.7},
		]}, {p:9000, a: [
			{p:-18,	v:29.5},
			{p:-3,	v:33.4},
			{p:15,	v:39.7},
			{p:27,	v:45},
		]}, {p:10000, a: [
			{p:-20,	v:32.9},
			{p:-5,	v:37.1},
			{p:15,	v:45},
		]}, {p:11000, a: [
			{p:-22,	v:36},
			{p:-15,	v:37.9},
			{p:-7,	v:40.8},
			{p:3,	v:45},
		]}, {p:12000, a: [
			{p:-24,	v:39},
			{p:-15,	v:41.8},
			{p:-9,	v:44.4},
		]},
		],
	}),
	climbTime: new Ptable({				// Fig. 5-19
		title: "Climb Time",
		parmNames: ['TFD Units'],
		rndMult: 0.1,
		a: [
		{p:0,	v:0},
		{p:5,	v:2.4},
		{p:10,	v:5},
		{p:15,	v:7.6},
		{p:20,	v:11.3},
		{p:25,	v:14.7},
		{p:30,	v:19.8},
		{p:35,	v:26.3},
		{p:40,	v:36},
		{p:43,	v:45.5},
		{p:45,	v:54},
		]
	}),
	climbFuel: new Ptable({				// Fig. 5-19
		title: "Climb Fuel",
		parmNames: ["TFD Units"],
		parmLimits: ['L'],
		rndMult: 0.1,
		a: [
		{p:0,	v:1},					// taxi+takeoff fuel
		{p:5,	v:1.5},
		{p:10,	v:2},
		{p:15,	v:2.6},
		{p:20,	v:3.2},
		{p:25,	v:4},
		{p:30,	v:5},
		{p:35,	v:6.3},
		{p:40,	v:8.1},
		{p:43,	v:9.8},
		{p:45,	v:11.7},
		]
	}),
	climbDist: new Ptable({				// Fig. 5-19
		title: "Climb Dist",
		parmNames: ['TFD Units'],
		parmLimits: ['L'],
		rndMult: 0.1,
		a: [
		{p:0,	v:0},
		{p:5,	v:4},
		{p:10,	v:7},
		{p:15,	v:11},
		{p:20,	v:16},
		{p:25,	v:22},
		{p:30,	v:29},
		{p:35,	v:39},
		{p:40,	v:54},
		{p:43,	v:68},
		{p:45,	v:83},
		]
	}),

	cruisePowerMax: 75,
	cruisePowerOptions: [				// Fig. 5-23 / 5-23a / 5-23b
		{value:'Max', text:'Maximum'},
		{value:75, text:'75%'},
		{value:65, text:'65%'},
		{value:55, text:'55%'},
	],
	cruiseTAS: new Ptable({				// Fig. 5-23 / 5-23a / 5-23b
		title: "Cruise TAS",
		parmNames: ['power', 'altitude', 'isa'],
		parmLimits: ['', 'L', 'L'],
		rndMult: 1,
		a: [
		{p:55, a:[
			{p:0, a:[
				{p:-15,		v:92},
				{p:30,		v:98},
			]},
			{p:2000, a:[
				{p:-15,		v:94},
				{p:30,		v:100},
			]},
			{p:4000, a:[
				{p:-15,		v:96},
				{p:30,		v:102},
			]},
			{p:6000, a:[
				{p:-15,		v:98},
				{p:30,		v:104},
			]},
			{p:8000, a:[
				{p:-15,		v:100},
				{p:17.5,	v:104},
			]},
			{p:9000, a:[
				{p:-15,		v:101},
				{p:8.5,		v:104},
			]},
			{p:10000, a:[
				{p:-15,		v:102},
				{p:0,		v:104},
			]},
		]},
		{p:65, a:[
			{p:0, a:[
				{p:-15,		v:100},
				{p:30,		v:106},
			]},
			{p:2000, a:[
				{p:-15,		v:103},
				{p:30,		v:108},
			]},
			{p:4000, a:[
				{p:-15,		v:105},
				{p:30,		v:111},
			]},
			{p:6000, a:[
				{p:-15,		v:107},
				{p:30,		v:113},
			]},
			{p:8000, a:[
				{p:-15,		v:109},
				{p:17.5,	v:114},
			]},
			{p:9000, a:[
				{p:-15,		v:110},
				{p:8.5,		v:114},
			]},
			{p:10000, a:[
				{p:-15,		v:112},
			]},
		]},
		{p:75, a:[
			{p:0, a: [
				{p:-15,		v:106},
				{p:30,		v:112},
			]}, {p:2000, a: [
				{p:-15,		v:108},
				{p:30,		v:114},
			]}, {p:3000, a: [
				{p:-15,		v:109},
				{p:20,		v:114},
				{p:30,		v:114},
			]}, {p:4000, a: [
				{p:-15,		v:110},
				{p:10,		v:114},
				{p:30,		v:114},
			]}, {p:5000, a: [
				{p:-15,		v:112},
				{p:0,		v:114},
				{p:25,		v:114},
			]}, {p:6000, a: [
				{p:-15,		v:113},
				{p:10,		v:113},
			]}, {p:7000, a: [
				{p:-15,		v:114},
				{p:0,		v:114},
			]},
		]}],
	}),
	cruiseFF: new Ptable({				// Fig. 5-23 / 5-23a / 5-23b
		title: "Cruise fuel flow",
		parmNames: ['power'],
		parmLimits: [''],
		rndMult: 0.1,
		a: [
			{p:55, v:7.9},
			{p:65, v:9.2},
			{p:75, v:11.4},
		]
	}),
	cruiseRPM: new Ptable({				// Fig. 5-20 / 5-20a / 5-20b
		title: "Cruise RPM",
		parmNames: ['power', 'altitude', 'isa'],
		parmLimits: ['', 'L', 'L'],
		rndMult: 5,
		a: [
		{p:55, a:[
			{p:0, a: [
				{p:-15,		v:2210},
				{p:0,		v:2250},
				{p:10,		v:2280},
				{p:20,		v:2300},
				{p:30,		v:2330},
			]}, {p:2000, a: [
				{p:-15,		v:2260},
				{p:0,		v:2300},
				{p:10,		v:2320},
				{p:20,		v:2350},
				{p:30,		v:2370},
			]}, {p:4000, a: [
				{p:-15,		v:2300},
				{p:0,		v:2340},
				{p:10,		v:2370},
				{p:20,		v:2400},
				{p:30,		v:2420},
			]}, {p:6000, a: [
				{p:-15,		v:2350},
				{p:0,		v:2390},
				{p:10,		v:2410},
				{p:20,		v:2440},
				{p:30,		v:2460},
			]}, {p:8000, a: [
				{p:-15,		v:2390},
				{p:0,		v:2430},
				{p:10,		v:2460},
				{p:17.5,	v:2475},
			]}, {p:9000, a: [
				{p:-15,		v:2410},
				{p:0,		v:2450},
				{p:8.5,		v:2480},
			]}, {p:10000, a: [
				{p:-15,		v:2430},
				{p:0,		v:2480},
			]},
		]},
		{p:65, a:[
			{p:0, a: [
				{p:-15,		v:2340},
				{p:0,		v:2390},
				{p:10,		v:2420},
				{p:20,		v:2440},
				{p:30,		v:2470},
			]}, {p:2000, a: [
				{p:-15,		v:2390},
				{p:0,		v:2440},
				{p:10,		v:2460},
				{p:20,		v:2490},
				{p:30,		v:2520},
			]}, {p:4000, a: [
				{p:-15,		v:2440},
				{p:0,		v:2480},
				{p:10,		v:2510},
				{p:20,		v:2540},
				{p:30,		v:2560},
			]}, {p:6000, a: [
				{p:-15,		v:2490},
				{p:0,		v:2530},
				{p:10,		v:2560},
				{p:20,		v:2580},
				{p:30,		v:2600},
			]}, {p:8000, a: [
				{p:-15,		v:2530},
				{p:0,		v:2580},
				{p:10,		v:2610},
				{p:17.5,	v:2630},
			]}, {p:9000, a: [
				{p:-15,		v:2560},
				{p:0,		v:2600},
				{p:8.5,		v:2630},
			]}, {p:10000, a: [
				{p:-15,		v:2580},
			]},
		]},
		{p:75, a:[
			{p:0, a: [
				{p:-15,		v:2460},
				{p:0,		v:2510},
				{p:10,		v:2540},
				{p:20,		v:2560},
				{p:30,		v:2590},
			]}, {p:2000, a: [
				{p:-15,		v:2510},
				{p:0,		v:2560},
				{p:10,		v:2590},
				{p:20,		v:2620},
				{p:30,		v:2640},
			]}, {p:3000, a: [
				{p:-15,		v:2540},
				{p:0,		v:2580},
				{p:10,		v:2610},
				{p:20,		v:2640},
				{p:30,		v:2670},
			]}, {p:4000, a: [
				{p:-15,		v:2560},
				{p:0,		v:2610},
				{p:10,		v:2640},
				{p:20,		v:2670},
				{p:30,		v:2690},
			]}, {p:5000, a: [
				{p:-15,		v:2590},
				{p:0,		v:2630},
				{p:10,		v:2660},
				{p:20,		v:2690},
			]}, {p:6000, a: [
				{p:-15,		v:2610},
				{p:0,		v:2660},
				{p:10,		v:2690},
			]}, {p:7000, a: [
				{p:-15,		v:2640},
				{p:0,		v:2690},
			]},
		]}]
	}),

	descentIAS: 126,					// Fig. 5-31
	descentRPM: 2500,					// Fig. 5-31
	descentTime: new Ptable({			// Fig. 5-31
		title: "Descent time",
		parmNames: ['altitude', 'isa'],
		rndMult: 0.1,
		a: [
		{p:0, a:[
			{p:-15,	v:0},
			{p:0,	v:0},
			{p:10,	v:0},
			{p:20,	v:0},
			{p:30,	v:0},
		]},
		{p:1000, a:[
			{p:-15,	v:8},
			{p:0,	v:5},
			{p:10,	v:3},
			{p:20,	v:2},
			{p:30,	v:1},
		]},
		{p:2000, a:[
			{p:-15,	v:21},
			{p:0,	v:8},
			{p:10,	v:5},
			{p:20,	v:3},
			{p:30,	v:3},
		]},
		{p:3000, a:[
			{p:-15,	v:26},
			{p:0,	v:10},
			{p:10,	v:6},
			{p:20,	v:5},
			{p:30,	v:4},
		]},
		{p:4000, a:[
			{p:-15,	v:29},
			{p:0,	v:12},
			{p:10,	v:8},
			{p:20,	v:6},
			{p:30,	v:5},
		]},
		{p:5000, a:[
			{p:-15,	v:31},
			{p:0,	v:14},
			{p:10,	v:9},
			{p:20,	v:7},
			{p:30,	v:6},
		]},
		{p:6000, a:[
			{p:-15,	v:33},
			{p:0,	v:15},
			{p:10,	v:10},
			{p:20,	v:8},
			{p:30,	v:7},
		]},
		{p:7000, a:[
			{p:-15,	v:34},
			{p:0,	v:16},
			{p:10,	v:11},
			{p:20,	v:9},
			{p:30,	v:7},
		]},
		{p:8000, a:[
			{p:-15,	v:35},
			{p:0,	v:17},
			{p:10,	v:12},
			{p:20,	v:9},
			{p:30,	v:8},
		]},
		{p:9000, a:[
			{p:-15,	v:36},
			{p:0,	v:18},
			{p:10,	v:13},
			{p:20,	v:10},
			{p:30,	v:9},
		]},
		{p:10000, a:[
			{p:-15,	v:37},
			{p:0,	v:19},
			{p:10,	v:13},
			{p:20,	v:11},
			{p:30,	v:9},
		]},
		{p:11000, a:[
			{p:-15,	v:38},
			{p:0,	v:19},
			{p:10,	v:14},
			{p:20,	v:11},
			{p:30,	v:10},
		]},
		{p:12000, a:[
			{p:-15,	v:39},
			{p:0,	v:20},
			{p:10,	v:15},
			{p:20,	v:12},
			{p:30,	v:10},
		]},
	]}),
	descentFuel: new Ptable({			// Fig. 5-31
		title: "Descent fuel",
		parmNames: ['altitude', 'isa'],
		rndMult: 0.1,
		a: [
		{p:0, a:[
			{p:-15,	v:0},
			{p:0,	v:0},
			{p:10,	v:0},
			{p:20,	v:0},
			{p:30,	v:0},
		]},
		{p:1000, a:[
			{p:-15,	v:2},
			{p:0,	v:1},
			{p:10,	v:1},
			{p:20,	v:1},
			{p:30,	v:1},
		]},
		{p:2000, a:[
			{p:-15,	v:4},
			{p:0,	v:2},
			{p:10,	v:1},
			{p:20,	v:1},
			{p:30,	v:1},
		]},
		{p:3000, a:[
			{p:-15,	v:4},
			{p:0,	v:2},
			{p:10,	v:1},
			{p:20,	v:1},
			{p:30,	v:1},
		]},
		{p:4000, a:[
			{p:-15,	v:5},
			{p:0,	v:2},
			{p:10,	v:2},
			{p:20,	v:1},
			{p:30,	v:1},
		]},
		{p:5000, a:[
			{p:-15,	v:5},
			{p:0,	v:2},
			{p:10,	v:2},
			{p:20,	v:1},
			{p:30,	v:1},
		]},
		{p:6000, a:[
			{p:-15,	v:5},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:1},
		]},
		{p:7000, a:[
			{p:-15,	v:6},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:1},
		]},
		{p:8000, a:[
			{p:-15,	v:6},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:2},
		]},
		{p:9000, a:[
			{p:-15,	v:6},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:2},
		]},
		{p:10000, a:[
			{p:-15,	v:6},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:2},
		]},
		{p:11000, a:[
			{p:-15,	v:6},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:2},
		]},
		{p:12000, a:[
			{p:-15,	v:6},
			{p:0,	v:3},
			{p:10,	v:2},
			{p:20,	v:2},
			{p:30,	v:2},
		]},
	]}),
	descentDist: new Ptable({			// Fig. 5-31
		title: "Descent distance",
		parmNames: ['altitude', 'isa'],
		rndMult: 0.1,
		a: [
		{p:0, a:[
			{p:-15,	v:0},
			{p:0,	v:0},
			{p:10,	v:0},
			{p:20,	v:0},
			{p:30,	v:0},
		]},
		{p:1000, a:[
			{p:-15,	v:16},
			{p:0,	v:10},
			{p:10,	v:6},
			{p:20,	v:4},
			{p:30,	v:3},
		]},
		{p:2000, a:[
			{p:-15,	v:43},
			{p:0,	v:17},
			{p:10,	v:10},
			{p:20,	v:8},
			{p:30,	v:6},
		]},
		{p:3000, a:[
			{p:-15,	v:53},
			{p:0,	v:22},
			{p:10,	v:14},
			{p:20,	v:11},
			{p:30,	v:9},
		]},
		{p:4000, a:[
			{p:-15,	v:59},
			{p:0,	v:26},
			{p:10,	v:17},
			{p:20,	v:13},
			{p:30,	v:11},
		]},
		{p:5000, a:[
			{p:-15,	v:64},
			{p:0,	v:29},
			{p:10,	v:20},
			{p:20,	v:16},
			{p:30,	v:13},
		]},
		{p:6000, a:[
			{p:-15,	v:67},
			{p:0,	v:32},
			{p:10,	v:22},
			{p:20,	v:18},
			{p:30,	v:15},
		]},
		{p:7000, a:[
			{p:-15,	v:70},
			{p:0,	v:34},
			{p:10,	v:24},
			{p:20,	v:20},
			{p:30,	v:17},
		]},
		{p:8000, a:[
			{p:-15,	v:73},
			{p:0,	v:36},
			{p:10,	v:26},
			{p:20,	v:21},
			{p:30,	v:18},
		]},
		{p:9000, a:[
			{p:-15,	v:76},
			{p:0,	v:38},
			{p:10,	v:28},
			{p:20,	v:23},
			{p:30,	v:20},
		]},
		{p:10000, a:[
			{p:-15,	v:78},
			{p:0,	v:40},
			{p:10,	v:30},
			{p:20,	v:25},
			{p:30,	v:21},
		]},
		{p:11000, a:[
			{p:-15,	v:80},
			{p:0,	v:42},
			{p:10,	v:31},
			{p:20,	v:26},
			{p:30,	v:23},
		]},
		{p:12000, a:[
			{p:-15,	v:81},
			{p:0,	v:43},
			{p:10,	v:33},
			{p:20,	v:28},
			{p:30,	v:24},
		]},
	]}),

	// Vreffull: 66,
	Vreffull: new Ptable({
		title: "Vref",
		parmNames: ['weight'],
		parmLimits: ['L'],
		rndMult: '1u',
		a: [
			{p:1600,	v:49},
			{p:1800,	v:55},
			{p:2000,	v:60},
			{p:2200,	v:63},
			{p:2440,	v:65},
		]
	}),
	ldgRoll: new Ptable({				// Fig. 5-37
		title: "Landing ground roll",
		parmNames: ["altitude", "oat"],
		parmLimits: ['L', 'L'],
		rndMult: 1,
		a: [
		{p:0, a: [
			{p:-40,	v:515},
			{p:40,	v:675},
		]}, {p:2000, a: [
			{p:-40,	v:550},
			{p:40,	v:725},
		]}, {p:4000, a: [
			{p:-40,	v:590},
			{p:0,	v:684},
			{p:40,	v:782},
		]}, {p:6000, a: [
			{p:-40,	v:630},
			{p:0,	v:730},
			{p:40,	v:838},
		]}, {p:7000, a: [
			{p:-40,	v:660},
			{p:0,	v:763},
			{p:40,	v:870},
		]},
		]
	}),
	ldgRollWeightAdj: new Ptable({
		title: "Landing ground roll weight adjustment",
		parmNames: ['ground roll', 'weight'],
		parmLimits: ['P', 'L'],
		rndMult: 1,
		a: [
		{p:535, a: [
			{p:1600,	v:360},
			{p:2440,	v:535},
		]}, {p:620, a: [
			{p:1600,	v:405},
			{p:2440,	v:620},
		]}, {p:690, a: [
			{p:1600,	v:455},
			{p:2440,	v:690},
		]}, {p:764, a: [
			{p:1600,	v:500},
			{p:2440,	v:764},
		]}, {p:840, a: [
			{p:1600,	v:545},
			{p:2440,	v:840},
		]},
		]
	}),
	ldgRollHeadwindAdj: new Ptable({
		title: "Landing ground roll headwind adjustment",
		parmNames: ['ground roll', 'wind'],
		parmLimits: ['P', 'H'],
		rndMult: '10u',
		a: [
		{p:400, a: [
			{p:0,	v:400},
			{p:15,	v:265},				// extrapolated
		]}, {p:500, a: [
			{p:0,	v:500},
			{p:15,	v:340},
		]}, {p:600, a: [
			{p:0,	v:600},
			{p:15,	v:425},
		]}, {p:700, a: [
			{p:0,	v:700},
			{p:15,	v:507},
		]}, {p:800, a: [
			{p:0,	v:800},
			{p:15,	v:590},
		]},
		]
	}),
	ldgRollTailwindAdj: new Ptable({
		title: "Landing ground roll tailwind adjustment",
		parmNames: ['ground roll', 'wind'],
		parmLimits: ['P', ''],
		rndMult: '10u',
		a: [
		{p:300, a: [
			{p:0,	v:300},
			{p:5,	v:430},
		]}, {p:400, a: [
			{p:0,	v:400},
			{p:5,	v:540},
		]}, {p:500, a: [
			{p:0,	v:500},
			{p:5,	v:670},
		]}, {p:600, a: [
			{p:0,	v:600},
			{p:5,	v:800},
		]},
		]
	}),

	ldgObs: new Ptable({				// Fig. 5-35
		title: "Landing 50' obstacle clearance distance",
		parmNames: ["altitude", "oat"],
		parmLimits: ['L', 'L'],
		rndMult: 1,
		a: [
		{p:0, a: [
			{p:-40,	v:1000},
			{p:40,	v:1230},
		]}, {p:2000, a: [
			{p:-40,	v:1050},
			{p:40,	v:1300},
		]}, {p:4000, a: [
			{p:-40,	v:1100},
			{p:40,	v:1375},
		]}, {p:6000, a: [
			{p:-40,	v:1170},
			{p:40,	v:1450},
		]}, {p:7000, a: [
			{p:-40,	v:1200},
			{p:40,	v:1500},
		]},
		]
	}),
	ldgObsWeightAdj: new Ptable({
		title: "Landing 50' obstacle clearance distance weight adjustment",
		parmNames: ['ground roll', 'weight'],
		parmLimits: ['P', 'L'],
		rndMult: 1,
		a: [
		{p:1060, a: [
			{p:1600,	v:700},
			{p:2440,	v:1060},
		]}, {p:1160, a: [
			{p:1600,	v:770},
			{p:2440,	v:1160},
		]}, {p:1260, a: [
			{p:1600,	v:830},
			{p:2440,	v:1260},
		]}, {p:1360, a: [
			{p:1600,	v:910},
			{p:2440,	v:1360},
		]}, {p:1460, a: [
			{p:1600,	v:965},
			{p:2440,	v:1460},
		]}]
	}),
	ldgObsHeadwindAdj: new Ptable({				//Fig. 5-35
		title: "Landing 50' obstacle clearance distance headwind adjustment",
		parmNames: ['ground roll', 'wind'],
		parmLimits: ['P', 'H'],	// clamp wind > 15 kts
		rndMult: '10u',
		a: [
		{p:700, a: [
			{p:0,	v:700},
			{p:7,	v:600},
			{p:15,	v:600},				// conservative
		]}, {p:800, a: [
			{p:0,	v:800},
			{p:13.5,	v:600},
			{p:15,	v:600},				// conservative
		]}, {p:900, a: [
			{p:0,	v:900},
			{p:15,	v:657},
		]}, {p:1000, a: [
			{p:0,	v:1000},
			{p:15,	v:747},
		]}, {p:1100, a: [
			{p:0,	v:1100},
			{p:15,	v:850},
		]}, {p:1200, a: [
			{p:0,	v:1200},
			{p:15,	v:940},
		]}, {p:1300, a: [
			{p:0,	v:1300},
			{p:15,	v:1040},
		]}, {p:1400, a: [
			{p:0,	v:1400},
			{p:15,	v:1140},
		]}, {p:1500, a: [
			{p:0,	v:1500},
			{p:15,	v:1210},
		]}]
	}),
	ldgObsTailwindAdj: new Ptable({			// Fig. 5-35
		title: "Landing 50' obstacle clearance distance tailwind adjustment",
		parmNames: ['ground roll', 'wind'],
		parmLimits: ['P', ''],
		rndMult: '10u',
		a: [
		{p:700, a: [
			{p:0,	v:700},
			{p:5,	v:960},
		]}, {p:800, a: [
			{p:0,	v:800},
			{p:5,	v:1060},
		]}, {p:900, a: [
			{p:0,	v:900},
			{p:5,	v:1160},
		]}, {p:1000, a: [
			{p:0,	v:1000},
			{p:5,	v:1260},
		]}, {p:1100, a: [
			{p:0,	v:1100},
			{p:5,	v:1380},
		]}, {p:1200, a: [
			{p:0,	v:1200},
			{p:5,	v:1480},
		]}, {p:1300, a: [
			{p:0,	v:1300},
			{p:5,	v:1600},			// extrapolated
		]}, {p:1400, a: [
			{p:0,	v:1400},
			{p:5,	v:1760},			// extrapolated
		]}]
	}),

	// Fig. 5-33
	glideRatio: 22.75/12000,			// nm/ft
	glideIAS: 73,
	glideCAS: 75,
});

// Build table to convert CAS to IAS.
pp.buildCAStoIAS(ac.baseData('warrior3'));

/*
 * Testing
 */
test.add('warrior3', function () {
	var v, isa;

	io('ac.model').valSet('warrior3');

	// page 5-14, 5-16, takeoff ground roll, 27C OAT, 15kt
	v = pp.takeoffDistance('TOroll', 'none', 1500, 27, 2316, 15);
	test.checkNumValue(v, 1150, 50);
	v = pp.takeoffDistance('TOroll', 'partial', 1500, 27, 2175, 15);
	test.checkNumValue(v, 975, 50);

	// page 5-15, 5-17, takeoff performance, 23 C OAT, 8kt
	v = pp.takeoffDistance('TOobs', 'none', 1500, 27, 2316, 15);
	test.checkNumValue(v, 2100, 100);
	v = pp.takeoffDistance('TOobs', 'partial', 1500, 27, 2175, 15);
	test.checkNumValue(v, 1500, 100);


	// page 5-19, climb rate
	v = pp.climbRate(5000, 16);
	test.checkNumValue(v, 374, 5);

	// page 5-12, climb, flaps up, 23 C OAT to 15 C OAT
	v = pp.climbTime(1500, 27, 5000, 16);
	test.checkNumValue(v, 8, 1);
	v = pp.climbFuel(1500, 27, 5000, 16);
	test.checkNumValue(v, 2, 1);
	v = pp.climbDistance(1500, 27, 5000, 16);
	test.checkNumValue(v, 13, 2);


	// page 5-7, cruise, power 75%, 6000', 16C
	isa = stdTempDiff(5000, 16);
	v = pp.cruiseTAS(75, 5000, isa);
	test.checkNumValue(v, 114, 1);
	v = pp.cruiseFF(75);
	test.checkNumValue(v, 11.4, 0.2);
	// page 5-22, cruise, power 65%
	v = pp.cruiseRPM(75, 5000, isa);
	test.checkNumValue(v, 2665, 10);


	// page 5-30, descent, flaps up, 15 C OAT to 21 C OAT
	v = pp.descentTime(5000, 16, 2500, 24);
	test.checkNumValue(v, 3.9, 1);
	v = pp.descentFuel(5000, 16, 2500, 24);
	test.checkNumValue(v, 0.9, 1);
	v = pp.descentDistance(5000, 16, 2500, 24);
	test.checkNumValue(v, 8.6, 1);


	// page 5-28, 5-29, landing,
	v = pp.landingDistance('ldgRoll', 2500, 24, 2179, 0);
	test.checkNumValue(v, 626, 10);
	v = pp.landingDistance('ldgObs', 2500, 24, 2179, 0);
	test.checkNumValue(v, 1135, 10);
});
