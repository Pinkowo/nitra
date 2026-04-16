// ─── Enums ───────────────────────────────────────────────────────────────────

export enum GameStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Ended = 'ended',
}

export enum PaymentMode {
  Cash = 'cash',
  Nitra = 'nitra',
}

// ─── Player ──────────────────────────────────────────────────────────────────

export interface Player {
  uid: string
  name: string
  cashBalance: number
  assetsValue: number
  creditUsed: number
  creditLimit: number
  ownedEquipment: string[] // equipment IDs
  customersRecruited: number // total customers defeated
  joinedAt: number           // unix ms
  isHost: boolean
}

// ─── Room ────────────────────────────────────────────────────────────────────

export interface Room {
  id: string               // 4-digit string e.g. "4829"
  hostUid: string
  status: GameStatus
  startedAt: number | null // server timestamp ms; null until started
  players: Record<string, Player>
}

// ─── Equipment ───────────────────────────────────────────────────────────────

export interface Equipment {
  id: string
  name: string
  nameEn: string
  price: number
  assetValue: number       // value added to assetsValue on purchase
  imagePlaceholder: string // path for AI-generated art
  isPremium: boolean       // true = limited flash-sale item
  description: string
}

// ─── Customer / Combat ───────────────────────────────────────────────────────

export interface Customer {
  id: string
  maxHp: number
  currentHp: number
  tier: number             // floor(elapsedSeconds / 30)
  cashReward: number       // awarded when defeated
}

// ─── Global Events ───────────────────────────────────────────────────────────

export interface FlashSaleState {
  active: boolean
  equipmentId: string | null
  claimed: boolean
  claimedByUid: string | null
  claimedByName: string | null
  countdownStartedAt: number | null // when the 3-sec warning began
}

export interface WhaleState {
  active: boolean
  whaleBaseHp: number
  currentHp: number
  lastHitPlayer: string | null // uid of last-hit winner
  bonusCash: number            // whaleBaseHp * 50
}

export interface GlobalEvent {
  type: 'flashSale' | 'whale'
  roomId: string
  flashSale?: FlashSaleState
  whale?: WhaleState
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  rank: number
  uid: string
  name: string
  cashBalance: number
  assetsValue: number
  attackPower: number        // 10 + assetsValue / 100
  customersRecruited: number
  totalWorth: number         // cashBalance + assetsValue
}
