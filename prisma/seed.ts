// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  {
    name: 'Indian Institute of Technology Delhi',
    location: 'Hauz Khas, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    fees: 990000,
    rating: 4.8,
    reviews: 1250,
    cutoff: 150,
    courses: ['BTech CSE', 'BTech Mechanical', 'BTech Electrical', 'BTech Civil', 'BTech Chemical'],
    placements: 98,
    avgPackage: 25,
    overview: 'IIT Delhi is one of the premier engineering institutions in India with excellent placements and research facilities.'
  },
  {
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    fees: 990000,
    rating: 4.9,
    reviews: 2100,
    cutoff: 100,
    courses: ['BTech CSE', 'BTech Aerospace', 'BTech Electrical', 'BTech Mechanical', 'BTech Civil'],
    placements: 99,
    avgPackage: 28,
    overview: 'IIT Bombay is one of the most prestigious engineering colleges with world-class faculty and infrastructure.'
  },
  {
    name: 'Birla Institute of Technology and Science',
    location: 'Pilani, Rajasthan',
    city: 'Pilani',
    state: 'Rajasthan',
    fees: 1800000,
    rating: 4.6,
    reviews: 3200,
    cutoff: 750,
    courses: ['BTech CSE', 'BTech Mechanical', 'BTech ECE', 'BTech Civil', 'BTech Chemical'],
    placements: 96,
    avgPackage: 20,
    overview: 'BITS Pilani is a top private engineering institute known for rigorous curriculum and excellent placements.'
  },
  {
    name: 'Indian Institute of Technology Hyderabad',
    location: 'Kandi, Sangareddy, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 990000,
    rating: 4.7,
    reviews: 980,
    cutoff: 400,
    courses: ['BTech CSE', 'BTech Electrical', 'BTech Mechanical', 'BTech Civil', 'BTech Chemical', 'BTech AI'],
    placements: 97,
    avgPackage: 22,
    overview: 'IIT Hyderabad is a premier engineering institution known for cutting-edge research and strong industry connections in the tech hub of Hyderabad.'
  },
  {
    name: 'Osmania University College of Engineering',
    location: 'Amberpet, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 95000,
    rating: 4.1,
    reviews: 1800,
    cutoff: 3500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech Chemical'],
    placements: 82,
    avgPackage: 8,
    overview: 'One of the oldest and most reputed engineering colleges in Telangana, affiliated to Osmania University with a legacy of over 100 years.'
  },
  {
    name: 'JNTUH College of Engineering',
    location: 'Kukatpally, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 120000,
    rating: 4.0,
    reviews: 2100,
    cutoff: 4000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 80,
    avgPackage: 7,
    overview: 'JNTUH College of Engineering is the constituent college of Jawaharlal Nehru Technological University Hyderabad, offering quality technical education.'
  },
  {
    name: 'Chaitanya Bharathi Institute of Technology',
    location: 'Gandipet, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 350000,
    rating: 4.2,
    reviews: 1450,
    cutoff: 5000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech EEE'],
    placements: 85,
    avgPackage: 9,
    overview: 'CBIT is one of the top private engineering colleges in Hyderabad, known for strong academics and consistent placements in top IT companies.'
  },
  {
    name: 'Vasavi College of Engineering',
    location: 'Ibrahimbagh, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 320000,
    rating: 4.1,
    reviews: 1200,
    cutoff: 5500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech EEE'],
    placements: 83,
    avgPackage: 8,
    overview: 'Vasavi College of Engineering is a well-known private engineering college in Hyderabad with strong placement support and experienced faculty.'
  },
  {
    name: 'Mahatma Gandhi Institute of Technology',
    location: 'Gandipet, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 290000,
    rating: 4.0,
    reviews: 980,
    cutoff: 6000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT'],
    placements: 81,
    avgPackage: 7,
    overview: 'MGIT is an autonomous engineering college in Hyderabad offering quality technical education with good industry exposure and placement opportunities.'
  },
  {
    name: 'CVR College of Engineering',
    location: 'Vastunagar, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 270000,
    rating: 3.9,
    reviews: 870,
    cutoff: 7000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 78,
    avgPackage: 6,
    overview: 'CVR College of Engineering offers a strong technical curriculum with focus on practical learning and industry-ready skills.'
  },
  {
    name: 'Gokaraju Rangaraju Institute of Engineering and Technology',
    location: 'Bachupally, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 310000,
    rating: 4.0,
    reviews: 1100,
    cutoff: 6500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech Biotech'],
    placements: 82,
    avgPackage: 7,
    overview: 'GRIET is a reputed autonomous engineering college in Hyderabad known for its research culture and strong alumni network in IT sector.'
  },
  {
    name: 'VNR Vignana Jyothi Institute of Engineering and Technology',
    location: 'Bachupally, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 330000,
    rating: 4.2,
    reviews: 1300,
    cutoff: 5200,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech AI & ML'],
    placements: 86,
    avgPackage: 9,
    overview: 'VNR VJIET is a top autonomous engineering college in Hyderabad with state-of-the-art infrastructure and excellent placements in IT and core companies.'
  },
  {
    name: 'Malla Reddy Engineering College',
    location: 'Maisammaguda, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 240000,
    rating: 3.7,
    reviews: 750,
    cutoff: 9000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 72,
    avgPackage: 5,
    overview: 'Malla Reddy Engineering College provides affordable quality education with decent placement support for students from diverse backgrounds.'
  },
  {
    name: 'Sreenidhi Institute of Science and Technology',
    location: 'Ghatkesar, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 280000,
    rating: 3.8,
    reviews: 820,
    cutoff: 8000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT'],
    placements: 75,
    avgPackage: 6,
    overview: 'SNIST is an autonomous engineering college offering quality technical education with good infrastructure and industry tie-ups.'
  },
  {
    name: 'Kommuri Pratap Reddy Institute of Technology',
    location: 'Ghatkesar, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 220000,
    rating: 3.6,
    reviews: 560,
    cutoff: 10000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil'],
    placements: 68,
    avgPackage: 5,
    overview: 'KPRIET provides affordable engineering education with focus on practical skills and student development in the growing IT corridor of east Hyderabad.'
  },
  {
    name: 'TKR College of Engineering and Technology',
    location: 'Meerpet, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 210000,
    rating: 3.5,
    reviews: 490,
    cutoff: 11000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 65,
    avgPackage: 5,
    overview: 'TKR College of Engineering offers quality technical education at affordable fees, with focus on producing industry-ready graduates.'
  },
  {
    name: 'Anurag University',
    location: 'Venkatapur, Ghatkesar, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 300000,
    rating: 4.0,
    reviews: 950,
    cutoff: 7500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech Data Science', 'BTech AI & ML'],
    placements: 80,
    avgPackage: 7,
    overview: 'Anurag University is a growing institution offering modern engineering programs with strong focus on emerging technologies like AI, ML and Data Science.'
  },
  {
    name: 'Vardhaman College of Engineering',
    location: 'Shamshabad, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 260000,
    rating: 3.8,
    reviews: 700,
    cutoff: 8500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT'],
    placements: 74,
    avgPackage: 6,
    overview: 'Vardhaman College of Engineering is located near Hyderabad airport and offers solid technical education with consistent placement records.'
  },
  {
    name: 'Matrusri Engineering College',
    location: 'Saidabad, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 200000,
    rating: 3.5,
    reviews: 420,
    cutoff: 12000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 63,
    avgPackage: 4,
    overview: 'Matrusri Engineering College is an affordable engineering institution in central Hyderabad providing basic to advanced technical education.'
  },
  {
    name: 'Geethanjali College of Engineering and Technology',
    location: 'Cheeryal, Keesara, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 235000,
    rating: 3.7,
    reviews: 610,
    cutoff: 9500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT'],
    placements: 70,
    avgPackage: 5,
    overview: 'Geethanjali College of Engineering offers a student-friendly environment with experienced faculty and decent campus placement support.'
  },
  {
    name: 'Vignan Institute of Technology and Science',
    location: 'Deshmukhi, Nalgonda, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 215000,
    rating: 3.6,
    reviews: 530,
    cutoff: 10500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 67,
    avgPackage: 5,
    overview: 'VITS offers quality engineering education on a scenic campus near Hyderabad with focus on student development and placement preparation.'
  },
  {
    name: 'Lords Institute of Engineering and Technology',
    location: 'Himayatsagar, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 195000,
    rating: 3.4,
    reviews: 380,
    cutoff: 13000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil'],
    placements: 60,
    avgPackage: 4,
    overview: 'Lords Institute provides engineering education with emphasis on practical training and soft skills to produce well-rounded technical graduates.'
  },
  {
    name: 'Marri Laxman Reddy Institute of Technology and Management',
    location: 'Dundigal, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 250000,
    rating: 3.8,
    reviews: 660,
    cutoff: 8800,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech EEE'],
    placements: 73,
    avgPackage: 6,
    overview: 'MLRITM is located in the aerospace hub of Dundigal, Hyderabad, offering solid engineering programs with good industry connections.'
  },
  {
    name: 'CMR College of Engineering and Technology',
    location: 'Kandlakoya, Medchal, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 265000,
    rating: 3.9,
    reviews: 780,
    cutoff: 8200,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech Data Science'],
    placements: 76,
    avgPackage: 6,
    overview: 'CMRCET is a growing engineering college near Hyderabad offering modern programs and good placement support in IT and core engineering sectors.'
  },
  {
    name: 'Hyderabad Institute of Technology and Management',
    location: 'Medchal, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 255000,
    rating: 3.7,
    reviews: 590,
    cutoff: 9200,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT'],
    placements: 71,
    avgPackage: 5,
    overview: 'HITAM offers engineering education in a serene campus environment near Hyderabad with dedicated placement cell and industry interaction programs.'
  },
  {
    name: 'Guru Nanak Institutions Technical Campus',
    location: 'Ibrahimpatnam, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 245000,
    rating: 3.8,
    reviews: 640,
    cutoff: 9000,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE', 'BTech IT'],
    placements: 74,
    avgPackage: 6,
    overview: 'GNITC is a well-established engineering college in Hyderabad with strong emphasis on discipline, technical skills, and student welfare.'
  },
  {
    name: 'Malla Reddy College of Engineering and Technology',
    location: 'Maisammaguda, Secunderabad, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 270000,
    rating: 3.9,
    reviews: 850,
    cutoff: 7800,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech IT', 'BTech AI & ML'],
    placements: 77,
    avgPackage: 7,
    overview: 'MRCET is one of the largest engineering campuses in Hyderabad offering a wide range of programs with strong placement support and modern facilities.'
  },
  {
    name: 'Sreyas Institute of Engineering and Technology',
    location: 'Nagole, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 190000,
    rating: 3.4,
    reviews: 360,
    cutoff: 13500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil'],
    placements: 58,
    avgPackage: 4,
    overview: 'Sreyas Institute provides affordable engineering education in east Hyderabad with focus on basics of engineering and career readiness.'
  },
  {
    name: 'Aurora Engineering College',
    location: 'Bhongir, Nalgonda, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 205000,
    rating: 3.5,
    reviews: 410,
    cutoff: 12500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 62,
    avgPackage: 4,
    overview: 'Aurora Engineering College offers engineering programs in a peaceful environment outside Hyderabad with dedicated student support services.'
  },
  {
    name: 'Nalla Malla Reddy Engineering College',
    location: 'Divyanagar, Ghatkesar, Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    fees: 225000,
    rating: 3.6,
    reviews: 480,
    cutoff: 11500,
    courses: ['BTech CSE', 'BTech ECE', 'BTech Mechanical', 'BTech Civil', 'BTech EEE'],
    placements: 65,
    avgPackage: 5,
    overview: 'NMREC provides solid engineering education along the Hyderabad-Warangal highway with a focus on holistic development of students.'
  }
];

async function main() {
  console.log('Starting seeding...');
  for (const college of colleges) {
    const existing = await prisma.college.findUnique({
      where: { name: college.name }
    });
    if (!existing) {
      await prisma.college.create({ data: college });
      console.log(`Created college: ${college.name}`);
    } else {
      console.log(`Skipped (already exists): ${college.name}`);
    }
  }
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });