/** Types + mock data (single module for the demo). */

export type ListingStatus = "available" | "reserved";

export type User = {
  id: string;
  name: string;
  avatar: string;
  neighborhood: string;
  rating: number;
  exchanges: number;
  verified: boolean;
  bio: string;
  /** Source language of `bio` if not English. Triggers the inline translation chip. */
  bioLanguage?: string;
  /** English translation of `bio`, displayed under the original via the Google-Translate-style widget. */
  bioTranslation?: string;
  reviews: Review[];
};

export type Review = {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  distanceKm: number;
  neighborhood: string;
  owner: User;
  status: ListingStatus;
  priceType: "free" | "symbolic";
  priceEuro?: number;
  mapX: number;
  mapY: number;
  createdAt: string;
};

export type Conversation = {
  id: string;
  peer: User;
  lastMessage: string;
  lastAt: string;
  unread: number;
  messages: ChatMessage[];
};

export type ChatMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  at: string;
};

export type AppNotification = {
  id: string;
  type: "listing" | "message" | "reservation" | "pickup";
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
];

function user(
  id: string,
  i: number,
  name: string,
  neighborhood: string,
  rating: number,
  exchanges: number,
  verified: boolean,
  bio: string,
  reviews: { author: string; text: string; rating: number; date: string }[],
): User {
  return {
    id,
    name,
    avatar: avatars[i % avatars.length],
    neighborhood,
    rating,
    exchanges,
    verified,
    bio,
    reviews: reviews.map((r, j) => ({
      id: `${id}-r${j}`,
      author: r.author,
      text: r.text,
      rating: r.rating,
      date: r.date,
    })),
  };
}

export const MOCK_USERS: Record<string, User> = {
  u1: user(
    "u1",
    0,
    "Marta Ruiz",
    "Malasaña",
    4.97,
    142,
    true,
    "Product designer. Happy to lend tools and camping gear.",
    [
      {
        author: "Leo",
        text: "Pickup was smooth, item exactly as described. Would borrow again.",
        rating: 5,
        date: "Mar 12",
      },
      {
        author: "Anna",
        text: "Super responsive and kind. Neighborly in the true sense.",
        rating: 5,
        date: "Feb 2",
      },
    ],
  ),
  u2: user(
    "u2",
    1,
    "Daniel Herrera",
    "Chamberí",
    4.92,
    89,
    true,
    "Weekend DIY enthusiast. Ladder and power tools available.",
    [
      {
        author: "Sophie",
        text: "Reserved a drill — verification code worked perfectly at handoff.",
        rating: 5,
        date: "Apr 1",
      },
    ],
  ),
  u3: user(
    "u3",
    2,
    "Sofía Navarro",
    "Lavapiés",
    4.88,
    56,
    false,
    "Student. Giving away clothes and small furniture.",
    [
      {
        author: "Mark",
        text: "Great communication, item was free and spotless.",
        rating: 5,
        date: "Jan 18",
      },
    ],
  ),
  u4: user(
    "u4",
    3,
    "Bruno Torres",
    "Salamanca",
    4.95,
    201,
    true,
    "Parent of two — sports gear rotates quickly.",
    [],
  ),
  u5: {
    id: "u5",
    name: "Mariam Markozia",
    avatar: "",
    neighborhood: "La Latina",
    rating: 4.99,
    exchanges: 37,
    verified: true,
    bio: "გამარჯობა! მე მარიამი ვარ — ქართველი სტუდენტი მადრიდში. სიამოვნებით ვაზიარებ ჩემს ნივთებს მეზობლებს. სესიის დროს კალკულატორი ხშირად სჭირდებათ — თამამად მომწერეთ.",
    bioLanguage: "Georgian",
    bioTranslation:
      "Hi! I'm Mariam — a Georgian student in Madrid. Happy to share my things with neighbors. People often need a calculator during exam season — feel free to message me.",
    reviews: [
      {
        id: "u5-r0",
        author: "Iván",
        text: "Lent me her calculator the night before my finals. Lifesaver.",
        rating: 5,
        date: "Apr 8",
      },
    ],
  },
};

/** Unsplash photos matched to each listing (tools, sports, home — not random placeholders). */
const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&q=80`;

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "l9",
    title: "Casio fx-991 scientific calculator",
    description:
      "Engineering & stats functions, solar + battery. Borrow it for exams or that one tax form. Cover included.",
    category: "Electronics",
    images: [u("1626266061368-46a8f578ddd6"), u("1574607383077-47ddc2dc51c4")],
    distanceKm: 0.2,
    neighborhood: "La Latina",
    owner: MOCK_USERS.u5,
    status: "available",
    priceType: "free",
    mapX: 0.38,
    mapY: 0.62,
    createdAt: "2026-05-06",
  },
  {
    id: "l1",
    title: "Bosch cordless drill 18V",
    description:
      "Light use, two batteries. Perfect for shelves and small fixes. Case included.",
    category: "Tools",
    images: [u("1572981779307-38b8cabb2407"), u("1581094794329-c8112a89af12")],
    distanceKm: 0.4,
    neighborhood: "Malasaña",
    owner: MOCK_USERS.u2,
    status: "available",
    priceType: "symbolic",
    priceEuro: 0.5,
    mapX: 0.42,
    mapY: 0.38,
    createdAt: "2026-04-24",
  },
  {
    id: "l2",
    title: "Vintage wooden ladder (2.4m)",
    description: "Solid beech, rubber feet. Too tall for our new flat.",
    category: "Tools",
    images: [u("1556009756-5a06dce4729d"), u("1635082627989-dcd12a107364")],
    distanceKm: 0.9,
    neighborhood: "Chamberí",
    owner: MOCK_USERS.u1,
    status: "available",
    priceType: "free",
    mapX: 0.55,
    mapY: 0.32,
    createdAt: "2026-04-23",
  },
  {
    id: "l3",
    title: "Nike football boots size 42",
    description: "Worn one season — studs in great shape. Cleaned and dried.",
    category: "Sports",
    images: [u("1542291026-7eec264c27ff"), u("1577471488278-16eec37ffcc2")],
    distanceKm: 1.2,
    neighborhood: "Salamanca",
    owner: MOCK_USERS.u4,
    status: "reserved",
    priceType: "symbolic",
    priceEuro: 0.05,
    mapX: 0.28,
    mapY: 0.55,
    createdAt: "2026-04-22",
  },
  {
    id: "l4",
    title: "Camping hammock + straps",
    description: "Double nest, tree-friendly straps. No rips.",
    category: "Outdoors",
    images: [u("1559965368-a6adb91e12fe"), u("1573209580826-13bdfd6db7e7")],
    distanceKm: 0.6,
    neighborhood: "Lavapiés",
    owner: MOCK_USERS.u3,
    status: "available",
    priceType: "free",
    mapX: 0.62,
    mapY: 0.48,
    createdAt: "2026-04-21",
  },
  {
    id: "l5",
    title: "DeWalt circular saw",
    description: "Professional grade. Blade recently replaced. Ear protection recommended.",
    category: "Tools",
    images: [u("1642006953663-06f0387f5652"), u("1702200047649-ddefe9d4faa9")],
    distanceKm: 1.5,
    neighborhood: "Chamberí",
    owner: MOCK_USERS.u2,
    status: "available",
    priceType: "symbolic",
    priceEuro: 0.5,
    mapX: 0.48,
    mapY: 0.44,
    createdAt: "2026-04-20",
  },
  {
    id: "l6",
    title: "Kids' football (size 4)",
    description: "Barely used — outgrew it in months.",
    category: "Sports",
    images: [u("1575361204480-aadea25e6e68"), u("1574629810360-7efbbe195018")],
    distanceKm: 0.3,
    neighborhood: "Malasaña",
    owner: MOCK_USERS.u1,
    status: "available",
    priceType: "free",
    mapX: 0.5,
    mapY: 0.36,
    createdAt: "2026-04-25",
  },
  {
    id: "l7",
    title: "Pressure washer Kärcher",
    description: "K4 model. Great for balcony and bikes. Short hose extension included.",
    category: "Tools",
    images: [u("1592365559101-19adfefdf294"), u("1621905251918-48416bd8575a")],
    distanceKm: 2.1,
    neighborhood: "Salamanca",
    owner: MOCK_USERS.u4,
    status: "available",
    priceType: "symbolic",
    priceEuro: 0.5,
    mapX: 0.32,
    mapY: 0.42,
    createdAt: "2026-04-19",
  },
  {
    id: "l8",
    title: "Standing desk frame (manual)",
    description: "IKEA crank base only — you supply top. Disassembled for pickup.",
    category: "Home",
    images: [u("1593642634402-b0eb5e2eebc9"), u("1622131278701-eb225474ffd2")],
    distanceKm: 0.8,
    neighborhood: "Chamberí",
    owner: MOCK_USERS.u1,
    status: "available",
    priceType: "free",
    mapX: 0.58,
    mapY: 0.52,
    createdAt: "2026-04-18",
  },
];

export const WISHLIST_TAGS = [
  "Hammer",
  "Drill",
  "Football boots",
  "Football",
  "Ladder",
  "Pressure washer",
  "Projector",
  "Camping stove",
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    peer: MOCK_USERS.u2,
    lastMessage: "I can meet tomorrow 18:30 at Plaza Mayor.",
    lastAt: "2m ago",
    unread: 2,
    messages: [
      { id: "m1", fromMe: true, text: "Hi Daniel — is the drill still available to borrow?", at: "10:12" },
      { id: "m2", fromMe: false, text: "Yes! Until Friday works for me.", at: "10:18" },
      {
        id: "m3",
        fromMe: false,
        text: "I can meet tomorrow 18:30 at Plaza Mayor.",
        at: "10:22",
      },
    ],
  },
  {
    id: "c2",
    peer: MOCK_USERS.u1,
    lastMessage: "Verification code noted. See you then.",
    lastAt: "1h ago",
    unread: 0,
    messages: [
      { id: "m4", fromMe: false, text: "Reservation confirmed — code NLB-4F9Q for pickup.", at: "Yesterday" },
      { id: "m5", fromMe: true, text: "Verification code noted. See you then.", at: "Yesterday" },
    ],
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "listing",
    title: "New nearby on Neighborly",
    body: "Standing desk frame posted 0.8 km away — free pickup.",
    time: "12 min ago",
    read: false,
  },
  {
    id: "n2",
    type: "message",
    title: "Message from Daniel",
    body: "I can meet tomorrow 18:30 at Plaza Mayor.",
    time: "28 min ago",
    read: false,
  },
  {
    id: "n3",
    type: "reservation",
    title: "Reservation confirmed",
    body: "Ladder borrow confirmed. Service fee €0.50 captured symbolically.",
    time: "3h ago",
    read: true,
  },
  {
    id: "n4",
    type: "pickup",
    title: "Pickup reminder",
    body: "Handoff with Marta in 45 minutes. Bring your pickup code.",
    time: "Yesterday",
    read: true,
  },
];

export const CATEGORIES = [
  "All",
  "Tools",
  "Sports",
  "Outdoors",
  "Home",
  "Kids",
  "Electronics",
] as const;
