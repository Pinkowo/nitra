<template>
  <!-- ═══ SVG Symbol Defs ═══════════════════════════════════════════ -->
  <svg style="display:none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Equipment icons (24×24) -->
      <symbol id="ico-chair" viewBox="0 0 24 24">
        <rect x="4" y="2" width="3" height="13" rx="1.5" fill="currentColor"/>
        <rect x="17" y="2" width="3" height="13" rx="1.5" fill="currentColor"/>
        <rect x="3" y="13" width="18" height="4" rx="2" fill="currentColor"/>
        <rect x="4" y="8" width="16" height="2" rx="1" fill="currentColor" opacity=".55"/>
        <rect x="4" y="19" width="4" height="3" rx="1" fill="currentColor" opacity=".6"/>
        <rect x="16" y="19" width="4" height="3" rx="1" fill="currentColor" opacity=".6"/>
      </symbol>
      <symbol id="ico-bp" viewBox="0 0 24 24">
        <rect x="10" y="9" width="12" height="10" rx="2" fill="currentColor"/>
        <rect x="12" y="11" width="8" height="5" rx="1" fill="white" opacity=".6"/>
        <path d="M9,5 Q4,5 4,11 Q4,17 9,17" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </symbol>
      <symbol id="ico-candy" viewBox="0 0 24 24">
        <rect x="7" y="2" width="10" height="15" rx="5" fill="currentColor" opacity=".22"/>
        <rect x="7" y="2" width="10" height="2.5" rx="1.5" fill="currentColor"/>
        <rect x="7" y="14.5" width="10" height="2.5" rx="1.5" fill="currentColor"/>
        <rect x="6" y="17" width="12" height="4" rx="2" fill="currentColor"/>
        <circle cx="10" cy="7" r="1.8" fill="currentColor" opacity=".85"/>
        <circle cx="14" cy="10" r="1.8" fill="currentColor" opacity=".85"/>
      </symbol>
      <symbol id="ico-steth" viewBox="0 0 24 24">
        <circle cx="7" cy="4" r="2.5" fill="currentColor"/>
        <circle cx="17" cy="4" r="2.5" fill="currentColor"/>
        <path d="M7,6.5 Q7,13 12,15 Q17,13 17,6.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="12" cy="20" r="4" fill="currentColor"/>
        <circle cx="12" cy="20" r="2.4" fill="white" opacity=".55"/>
      </symbol>
      <symbol id="ico-monitor" viewBox="0 0 24 24">
        <rect x="1" y="2" width="22" height="14" rx="2" fill="currentColor"/>
        <rect x="3" y="4" width="18" height="10" rx="1" fill="white" opacity=".6"/>
        <rect x="11" y="16" width="2" height="4" fill="currentColor" opacity=".65"/>
        <rect x="8" y="20" width="8" height="2" rx="1" fill="currentColor" opacity=".65"/>
      </symbol>
      <symbol id="ico-robot" viewBox="0 0 24 24">
        <rect x="5" y="3" width="14" height="10" rx="2" fill="currentColor"/>
        <circle cx="9" cy="8" r="2" fill="white" opacity=".8"/>
        <circle cx="15" cy="8" r="2" fill="white" opacity=".8"/>
        <circle cx="9" cy="8" r=".9" fill="currentColor"/>
        <circle cx="15" cy="8" r=".9" fill="currentColor"/>
        <rect x="7" y="13" width="10" height="7" rx="1.5" fill="currentColor" opacity=".85"/>
        <rect x="2" y="14" width="5" height="3" rx="1.5" fill="currentColor" opacity=".7"/>
        <rect x="17" y="14" width="5" height="3" rx="1.5" fill="currentColor" opacity=".7"/>
      </symbol>
      <symbol id="ico-lamp" viewBox="0 0 24 24">
        <rect x="11" y="0" width="2" height="5" rx="1" fill="currentColor" opacity=".65"/>
        <path d="M5,6 L7,14 L17,14 L19,6 Z" fill="currentColor" opacity=".45"/>
        <circle cx="12" cy="14" r="5" fill="currentColor"/>
        <circle cx="12" cy="14" r="3" fill="white" opacity=".72"/>
      </symbol>
      <symbol id="ico-tablet" viewBox="0 0 24 24">
        <rect x="5" y="0" width="14" height="22" rx="2.5" fill="currentColor"/>
        <rect x="7" y="2" width="10" height="16" rx="1" fill="white" opacity=".65"/>
        <circle cx="12" cy="21" r="1" fill="white" opacity=".55"/>
      </symbol>
      <symbol id="ico-therm" viewBox="0 0 24 24">
        <rect x="10" y="10" width="12" height="7" rx="3.5" fill="currentColor"/>
        <rect x="5" y="7" width="8" height="9" rx="3" fill="currentColor" opacity=".9"/>
        <ellipse cx="5" cy="11.5" rx="4" ry="4.5" fill="currentColor"/>
        <rect x="12" y="12" width="7" height="2.5" rx="1.2" fill="white" opacity=".55"/>
      </symbol>
      <symbol id="ico-massage" viewBox="0 0 24 24">
        <rect x="2" y="3" width="4" height="14" rx="2" fill="currentColor"/>
        <rect x="4" y="13" width="14" height="5" rx="2.5" fill="currentColor"/>
        <rect x="15" y="14" width="7" height="4" rx="2" fill="currentColor" opacity=".85"/>
        <rect x="1" y="2" width="6" height="4" rx="2" fill="currentColor" opacity=".8"/>
      </symbol>
      <symbol id="ico-mri" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10.5" fill="currentColor" opacity=".18"/>
        <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="3.5"/>
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="2.5" opacity=".75"/>
        <rect x="1.5" y="11" width="21" height="2" rx="1" fill="currentColor" opacity=".55"/>
      </symbol>
      <symbol id="ico-arm" viewBox="0 0 24 24">
        <rect x="8" y="19" width="8" height="4" rx="1.5" fill="currentColor"/>
        <rect x="10" y="11" width="4" height="9" rx="2" fill="currentColor" opacity=".85"/>
        <circle cx="12" cy="11" r="3" fill="currentColor"/>
        <line x1="13" y1="3" x2="17" y2="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".8"/>
        <line x1="13" y1="3" x2="17" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      </symbol>
      <!-- HUD icons (16×16) -->
      <symbol id="ico-coin" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7" fill="#D4A820"/>
        <circle cx="8" cy="8" r="5.5" fill="#B88A10"/>
        <rect x="7" y="4" width="2" height="8" rx="1" fill="#E8C040" opacity=".9"/>
        <rect x="4.5" y="5.5" width="7" height="1.5" rx=".75" fill="#E8C040" opacity=".7"/>
        <rect x="4.5" y="9" width="7" height="1.5" rx=".75" fill="#E8C040" opacity=".7"/>
      </symbol>
      <symbol id="ico-card" viewBox="0 0 16 16">
        <rect x="1" y="3" width="14" height="10" rx="2" fill="currentColor"/>
        <rect x="1" y="6" width="14" height="3" fill="currentColor" opacity=".35"/>
        <rect x="3" y="11" width="4" height="1.5" rx=".75" fill="white" opacity=".5"/>
      </symbol>
      <symbol id="ico-clock" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="8" cy="8" r="1" fill="currentColor"/>
        <line x1="8" y1="8" x2="8" y2="3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="8" y1="8" x2="11.5" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </symbol>
      <symbol id="ico-trophy" viewBox="0 0 16 16">
        <rect x="5" y="10" width="6" height="2" rx="1" fill="currentColor"/>
        <rect x="4" y="12" width="8" height="2" rx="1" fill="currentColor"/>
        <path d="M4,2 L12,2 L11,9 Q10,11 8,11 Q6,11 5,9 Z" fill="currentColor"/>
        <path d="M4,3 Q1,3 1,6 Q1,8 4,8" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12,3 Q15,3 15,6 Q15,8 12,8" fill="none" stroke="currentColor" stroke-width="1.5"/>
      </symbol>
    </defs>
  </svg>

  <!-- ═══ Game Scene ════════════════════════════════════════════════ -->
  <q-page class="game-page">
    <div class="game-scene">

      <!-- Sky -->
      <div class="sky">
        <div class="cloud ca"></div>
        <div class="cloud cb"></div>
        <div class="cloud cc"></div>

        <!-- City silhouette -->
        <div class="city-row">
          <div class="bldg" style="width:58px;height:88px;background:#F5B55A"></div>
          <div class="bldg" style="width:44px;height:64px;background:#DCA870"></div>
          <div class="bldg" style="width:72px;height:108px;background:#F2C455"></div>
          <div class="bldg" style="width:36px;height:55px;background:#E89050"></div>
          <div class="bldg" style="width:50px;height:78px;background:#F5B55A"></div>
          <div class="bldg" style="width:42px;height:58px;background:#DCA870"></div>
          <div class="bldg" style="width:65px;height:96px;background:#E89050"></div>
          <div class="bldg" style="width:48px;height:72px;background:#F2C455"></div>
          <div class="bldg" style="width:38px;height:60px;background:#F5B55A"></div>
          <div class="bldg" style="width:60px;height:84px;background:#DCA870"></div>
          <div class="bldg" style="width:44px;height:68px;background:#E89050"></div>
        </div>

        <!-- Sky leaderboard -->
        <div class="sky-lb" :style="{ opacity: skyLbDimmed ? 0.3 : 1 }">
          <div class="sky-lb-title">
            <svg width="12" height="12"><use href="#ico-trophy" color="#B07000"/></svg>
            排行榜
          </div>
          <div
            v-for="(p, i) in topPlayers"
            :key="p.uid"
            class="sky-lb-row"
            :class="{ me: p.uid === gameStore.uid }"
          >
            <div class="sky-lb-rank">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7" :fill="medalFill[i]"/>
                <text x="8" y="12" font-size="9" font-weight="900" text-anchor="middle" :fill="medalText[i]">
                  {{ i + 1 }}
                </text>
              </svg>
            </div>
            <span class="sky-lb-name">{{ p.name }}{{ p.uid === gameStore.uid ? ' ◀' : '' }}</span>
            <span class="sky-lb-val">${{ (p.cashBalance + p.assetsValue).toLocaleString() }}</span>
          </div>
        </div>

        <!-- Whale boss HP bar -->
        <div v-if="whaleState?.active" class="whale-boss-bar">
          <div class="whale-boss-label">⚡ 超級金主</div>
          <div class="whale-boss-track">
            <div class="whale-boss-fill" :style="{ width: whalePct + '%' }"></div>
          </div>
          <div class="whale-boss-hp">{{ whaleState.currentHp }} / {{ whaleState.whaleBaseHp }}</div>
        </div>

        <!-- Sky events area -->
        <div class="sky-event">
          <div v-if="whaleBannerVisible" class="sky-banner" :class="{ sweep: whaleBannerVisible }">
            超級客人現身！最後一擊得大獎！
          </div>
          <div v-if="eventStore.isRepaymentLocked" class="sky-lock">
            還款處理中 {{ eventStore.repayLockSecondsLeft }}s
          </div>
        </div>
      </div>

      <!-- Street lane -->
      <div class="street-lane">
        <!-- Customer A: female doctor, walks right -->
        <div
          v-if="!customers[0].hidden"
          class="customer"
          :class="{ dying: customers[0].dying }"
          style="top:44%;left:-100px;animation:walk-right 6s linear;"
          @click="hitCustomer(0, $event)"
          @touchstart="hitCustomer(0, $event)"
          @animationend="spawnNextCustomer(0)"
        >
          <div class="hp-bar">
            <div class="hp-fill" :class="hpClass(customers[0])" :style="{ width: hpPct(customers[0]) + '%' }"></div>
          </div>
          <svg class="char-svg" viewBox="0 0 16 24" width="40" height="60">
            <rect x="4" y="0" width="8" height="3" fill="#3C2415"/>
            <rect x="4" y="2" width="8" height="7" rx="1" fill="#F5C08A"/>
            <rect x="6" y="5" width="1" height="2" fill="#2C1A08"/>
            <rect x="9" y="5" width="1" height="2" fill="#2C1A08"/>
            <rect x="3" y="9" width="10" height="8" fill="#6AAABB"/>
            <rect x="1" y="10" width="3" height="5" rx="1" fill="#6AAABB"/>
            <rect x="12" y="10" width="3" height="5" rx="1" fill="#6AAABB"/>
            <rect x="0" y="14" width="3" height="2" rx="1" fill="#F5C08A"/>
            <rect x="13" y="14" width="3" height="2" rx="1" fill="#F5C08A"/>
            <rect x="4" y="17" width="3" height="5" fill="#4A88A8"/>
            <rect x="9" y="17" width="3" height="5" fill="#4A88A8"/>
            <rect x="3" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
            <rect x="8" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
          </svg>
        </div>

        <!-- Customer B: business suit, walks left -->
        <div
          v-if="!customers[1].hidden"
          class="customer"
          :class="{ dying: customers[1].dying }"
          style="top:38%;animation:walk-left 5s linear 1.8s;animation-fill-mode:backwards;"
          @click="hitCustomer(1, $event)"
          @touchstart="hitCustomer(1, $event)"
          @animationend="spawnNextCustomer(1)"
        >
          <div class="hp-bar">
            <div class="hp-fill" :class="hpClass(customers[1])" :style="{ width: hpPct(customers[1]) + '%' }"></div>
          </div>
          <svg class="char-svg" viewBox="0 0 16 24" width="40" height="60" style="transform:scaleX(-1)">
            <rect x="4" y="0" width="8" height="3" fill="#2C1C10"/>
            <rect x="4" y="2" width="8" height="7" rx="1" fill="#E8B080"/>
            <rect x="6" y="5" width="1" height="2" fill="#2C1A08"/>
            <rect x="9" y="5" width="1" height="2" fill="#2C1A08"/>
            <rect x="3" y="9" width="10" height="8" fill="#5C6070"/>
            <rect x="7" y="9" width="2" height="5" fill="#FFFDF5"/>
            <rect x="7.5" y="10" width="1" height="4" fill="#B82828"/>
            <rect x="1" y="10" width="3" height="5" rx="1" fill="#5C6070"/>
            <rect x="12" y="10" width="3" height="5" rx="1" fill="#5C6070"/>
            <rect x="0" y="14" width="3" height="2" rx="1" fill="#E8B080"/>
            <rect x="12" y="13" width="4" height="4" rx="1" fill="#8A6840"/>
            <rect x="4" y="17" width="3" height="5" fill="#383840"/>
            <rect x="9" y="17" width="3" height="5" fill="#383840"/>
            <rect x="3" y="21" width="5" height="3" rx="1" fill="#18181E"/>
            <rect x="8" y="21" width="5" height="3" rx="1" fill="#18181E"/>
          </svg>
        </div>

        <!-- Customer C: elder, walks right -->
        <div
          v-if="!customers[2].hidden"
          class="customer"
          :class="{ dying: customers[2].dying }"
          style="top:54%;animation:walk-right 8s linear 3.5s;animation-fill-mode:backwards;"
          @click="hitCustomer(2, $event)"
          @touchstart="hitCustomer(2, $event)"
          @animationend="spawnNextCustomer(2)"
        >
          <div class="hp-bar">
            <div class="hp-fill" :class="hpClass(customers[2])" :style="{ width: hpPct(customers[2]) + '%' }"></div>
          </div>
          <svg class="char-svg" viewBox="0 0 16 24" width="40" height="60">
            <rect x="3" y="0" width="10" height="3" fill="#9A9A9A"/>
            <rect x="4" y="2" width="8" height="7" rx="1" fill="#F0B878"/>
            <rect x="6" y="5" width="1" height="2" fill="#2C1A08"/>
            <rect x="9" y="5" width="1" height="2" fill="#2C1A08"/>
            <rect x="3" y="9" width="10" height="8" fill="#D07A40"/>
            <rect x="1" y="10" width="3" height="5" rx="1" fill="#D07A40"/>
            <rect x="12" y="10" width="3" height="5" rx="1" fill="#D07A40"/>
            <rect x="13" y="12" width="1.5" height="11" rx=".75" fill="#8A6030"/>
            <rect x="12.5" y="11" width="3" height="1.5" rx=".75" fill="#8A6030"/>
            <rect x="0" y="14" width="3" height="2" rx="1" fill="#F0B878"/>
            <rect x="4" y="17" width="3" height="5" fill="#6878A0"/>
            <rect x="9" y="17" width="3" height="5" fill="#6878A0"/>
            <rect x="3" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
            <rect x="8" y="21" width="5" height="3" rx="1" fill="#1A1A28"/>
          </svg>
        </div>

        <!-- Whale VIP (walks in street when active) -->
        <div
          v-if="whaleState?.active"
          class="customer whale"
          style="animation: walk-right 30s linear forwards; top: 40%; left: -100px;"
          @click="onHitWhale"
          @touchstart="onHitWhale"
        >
          <div class="hp-bar whale-hp-bar">
            <div class="hp-fill" :style="{ width: whalePct + '%' }"></div>
          </div>
          <svg class="char-svg" viewBox="0 0 44 30" width="88" height="60" xmlns="http://www.w3.org/2000/svg"
               style="animation-duration:.65s">
            <ellipse cx="20" cy="18" rx="18" ry="11" fill="#3A70B8"/>
            <ellipse cx="20" cy="21" rx="12" ry="7" fill="#78A8D0"/>
            <path d="M36,15 Q42,8 44,10 Q42,16 44,20 Q42,22 36,19 Z" fill="#2A5A98"/>
            <path d="M22,7 Q26,2 30,6 Q28,10 22,10 Z" fill="#2A5A98"/>
            <circle cx="12" cy="14" r="3" fill="white"/>
            <circle cx="12" cy="14" r="1.5" fill="#1A2840"/>
            <path d="M10,19 Q14,23 18,19" fill="none" stroke="#2A5A98" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12,5 L14,1 L16,4 L18,1 L20,5 L12,5 Z" fill="#FFD028"/>
            <rect x="12" y="5" width="8" height="2.5" rx=".5" fill="#E8B800"/>
            <path d="M16,7 Q14,3 15,0 M18,6 Q17,2 18,0 M20,7 Q20,3 22,1"
                  fill="none" stroke="#A8D8F0" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div class="sidewalk"></div>

      <!-- Clinic base -->
      <div class="clinic-base">
        <div class="clinic" :class="{ open: shopOpen }" @click="toggleShop">
          <div class="clinic-sign">NITRA CLINIC</div>
          <svg width="52" height="42" viewBox="0 0 52 42" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="0" width="48" height="42" rx="4" fill="#F8F6EC" stroke="#E0D0B0" stroke-width="1.5"/>
            <rect x="8" y="8" width="14" height="12" rx="2" fill="#B8D8E8" stroke="#A0C0D0" stroke-width="1"/>
            <rect x="30" y="8" width="14" height="12" rx="2" fill="#B8D8E8" stroke="#A0C0D0" stroke-width="1"/>
            <rect x="18" y="24" width="16" height="18" rx="2" fill="#C8B888" stroke="#B0A070" stroke-width="1"/>
            <circle cx="30" cy="34" r="1.5" fill="#888060"/>
            <line x1="8" y1="14" x2="22" y2="14" stroke="#90B8C8" stroke-width=".8"/>
            <line x1="15" y1="8" x2="15" y2="20" stroke="#90B8C8" stroke-width=".8"/>
            <line x1="30" y1="14" x2="44" y2="14" stroke="#90B8C8" stroke-width=".8"/>
            <line x1="37" y1="8" x2="37" y2="20" stroke="#90B8C8" stroke-width=".8"/>
          </svg>
          <div class="clinic-assets">
            <svg width="12" height="12"><use href="#ico-coin"/></svg>
            資產
            <span class="clinic-assets-val">${{ gameStore.assetsValue.toLocaleString() }}</span>
          </div>
        </div>
      </div>

    </div><!-- /game-scene -->

    <!-- ═══ Backdrop ═══════════════════════════════════════════════ -->
    <div class="backdrop" :class="{ on: shopOpen }" @click="closeShop"></div>

    <!-- ═══ Equipment Sheet ════════════════════════════════════════ -->
    <div class="eq-sheet" :class="{ open: shopOpen }">
      <div class="sheet-handle"></div>

      <!-- Bubble carousel -->
      <div
        ref="carouselEl"
        class="carousel"
        @touchend="onDragEnd"
        @mousedown="onDragStart"
        @mousemove="onDragMove"
        @mouseup="onDragEnd"
        @mouseleave="onDragEnd"
      >
        <div
          v-for="slot in carouselSlots"
          :key="slot.offset"
          class="bubble"
          :style="{
            width: slot.size + 'px',
            height: slot.size + 'px',
            background: slot.bg,
            border: `${slot.borderW}px solid ${slot.bd}`,
            boxShadow: slot.glow,
            opacity: slot.opacity,
            transform: `translate(calc(-50% + ${slot.x}px), -50%)`,
            left: '50%',
            top: '50%',
            zIndex: slot.isCenter ? 2 : 1,
          }"
          @click="slot.offset !== 0 && slot.idx >= 0 && slot.idx < EQUIPMENT_LIST.length ? jumpTo(slot.idx) : undefined"
        >
          <template v-if="slot.item">
            <svg :width="slot.iconSize" :height="slot.iconSize" style="display:block;flex-shrink:0">
              <use
                :href="'#ico-' + EQUIP_ICO[slot.item.id]"
                :color="slot.isCenter ? EQUIP_COLOR[slot.item.id] : EQUIP_COLOR[slot.item.id] + 'AA'"
              />
            </svg>
            <div v-if="Math.abs(slot.offset) <= 1" class="b-name">{{ slot.item.name }}</div>
          </template>
        </div>
      </div>

      <!-- Item detail -->
      <div class="shop-detail">
        <div class="item-name">{{ selectedItem?.isPremium ? '★ ' : '' }}{{ selectedItem?.name ?? '' }}</div>
        <div v-if="!isOwned" class="item-meta">
          Nitra ${{ selectedItem?.price.toLocaleString() }} · +{{ selectedItem?.assetValue.toLocaleString() }} 資產
        </div>
        <div v-else class="item-owned">✓ 已擁有</div>
      </div>

      <!-- Nitra row -->
      <div class="nitra-row">
        <div class="nitra-info">
          Nitra 已用：<span class="nitra-used-val">${{ gameStore.creditUsed.toLocaleString() }}</span>
          &nbsp;·&nbsp; 現金：<span style="color:rgba(255,255,255,.7)">${{ gameStore.cashBalance.toLocaleString() }}</span>
        </div>
        <button class="btn-repay" :disabled="!canRepay" @click="doRepay">還款</button>
      </div>

      <!-- Actions -->
      <div class="shop-actions">
        <button class="btn-cancel" @click="closeShop">取消</button>
        <button class="btn-buy" :disabled="!canBuy" @click="doBuy">Nitra 購買</button>
      </div>
    </div>

    <!-- ═══ Repay Lock Overlay ════════════════════════════════════ -->
    <div v-if="eventStore.isRepaymentLocked" class="repay-lock">
      <div class="lock-spinner"></div>
      <div class="lock-title">還款處理中</div>
      <div class="lock-sub">{{ eventStore.repayLockSecondsLeft }} 秒後解鎖</div>
    </div>

    <!-- Flash sale (teleported in FlashSaleOverlay) -->
    <FlashSaleOverlay />

    <!-- Full-screen flash sale countdown overlay -->
    <div v-if="flashCountdownVisible" class="flash-cd-overlay">
      <div class="flash-cd-num">{{ flashCountdownNum }}</div>
      <div class="flash-cd-label">限量器材即將出現！</div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/useGameStore'
import { useRoomStore } from '../stores/useRoomStore'
import { useEventStore } from '../stores/useEventStore'
import { useGameTimer } from '../composables/useGameTimer'
import { useRepaymentLock } from '../composables/useRepaymentLock'
import { subscribeRoom } from '../services/roomService'
import { subscribeWhale, tapWhale, clearWhale, spawnWhale } from '../services/whaleService'
import { subscribeFlashSale, initFlashSaleTimer, stopFlashSaleTimer } from '../services/flashSaleService'
import { db } from '../services/firebase'
import { goOffline } from 'firebase/database'
import { GameStatus, PaymentMode } from '../types'
import { EQUIPMENT_LIST, PREMIUM_EQUIPMENT } from '../assets/equipment-data'
import FlashSaleOverlay from '../components/FlashSaleOverlay.vue'

// ─── Stores / composables ─────────────────────────────────────────────────────
const router = useRouter()
const gameStore = useGameStore()
const roomStore = useRoomStore()
const eventStore = useEventStore()
const { start, stop } = useGameTimer()
const { repay } = useRepaymentLock()

// ─── Equipment icon + color maps ──────────────────────────────────────────────
const EQUIP_ICO: Record<string, string> = {
  'dental-chair': 'chair', 'bp-monitor': 'bp', 'candy-dispenser': 'candy',
  'e-stethoscope': 'steth', 'diag-display': 'monitor', 'disinfect-robot': 'robot',
  'surgery-lamp': 'lamp', 'emr-tablet': 'tablet', 'ear-thermometer': 'therm',
  'massage-chair': 'massage', 'ai-mri': 'mri', 'da-vinci-arm': 'arm',
  'biochem-analyzer': 'mri', 'laser-eye': 'lamp', 'mobile-ct': 'monitor',
}
const EQUIP_COLOR: Record<string, string> = {
  'dental-chair': '#C4782A', 'bp-monitor': '#3878A8', 'candy-dispenser': '#D04878',
  'e-stethoscope': '#508080', 'diag-display': '#2858A0', 'disinfect-robot': '#308858',
  'surgery-lamp': '#B88020', 'emr-tablet': '#4068A8', 'ear-thermometer': '#388888',
  'massage-chair': '#7848B0', 'ai-mri': '#9040D0', 'da-vinci-arm': '#6030B0',
  'biochem-analyzer': '#8030C0', 'laser-eye': '#4050C0', 'mobile-ct': '#3060A8',
}

// ─── Shop state ───────────────────────────────────────────────────────────────
const shopOpen = ref(false)
const selIdx = ref(0)
const carouselEl: Ref<HTMLElement | null> = ref(null)

// Drag state
const dragStartX = ref(0)
const dragActive = ref(false)
const dragDx = ref(0)

// Carousel slot config
const SLOT_SCALE: Record<string, number>   = { '-2': 0.42, '-1': 0.65, '0': 1, '1': 0.65, '2': 0.42 }
const SLOT_OPACITY: Record<string, number> = { '-2': 0.28, '-1': 0.72, '0': 1, '1': 0.72, '2': 0.28 }
const SLOT_X: Record<string, number>       = { '-2': -200, '-1': -108, '0': 0, '1': 108, '2': 200 }
const BASE_SIZE = 100

const carouselSlots = computed(() => {
  return [-2, -1, 0, 1, 2].map((off) => {
    const k = String(off)
    const i = selIdx.value + off
    const scale = SLOT_SCALE[k]
    const size = Math.round(BASE_SIZE * scale)
    const x = SLOT_X[k] + dragDx.value
    const item = i >= 0 && i < EQUIPMENT_LIST.length ? EQUIPMENT_LIST[i] : null
    const isPrem = item?.isPremium ?? false
    const isCenter = off === 0
    const bg  = isCenter ? (isPrem ? '#E8D8FF' : '#FFF09A') : (isPrem ? '#EDE0FF' : '#EBF5FB')
    const bd  = isCenter ? (isPrem ? '#9858D8' : '#C8A800') : (isPrem ? '#B080E0' : '#A8C8E0')
    const glow = isCenter
      ? (isPrem ? '0 0 0 4px #C090F0,0 4px 24px rgba(180,80,240,.38)'
                : '0 0 0 4px #D8B000,0 4px 24px rgba(216,176,0,.42)')
      : '0 2px 8px rgba(0,0,0,.12)'
    return {
      offset: off, idx: i, size, x, item, isCenter, isPrem, bg, bd, glow,
      opacity: SLOT_OPACITY[k],
      borderW: isCenter ? 3 : 2,
      iconSize: Math.round(size * 0.48),
    }
  })
})

const selectedItem = computed(() =>
  selIdx.value >= 0 && selIdx.value < EQUIPMENT_LIST.length ? EQUIPMENT_LIST[selIdx.value] : null,
)
const isOwned = computed(() =>
  selectedItem.value ? gameStore.ownedEquipment.includes(selectedItem.value.id) : false,
)
const canBuy = computed(() => {
  const item = selectedItem.value
  if (!item || isOwned.value || eventStore.isRepaymentLocked) return false
  return gameStore.availableCredit >= item.price
})
const canRepay = computed(() =>
  gameStore.creditUsed > 0 &&
  gameStore.cashBalance >= gameStore.creditUsed &&
  !eventStore.isRepaymentLocked,
)

function toggleShop() {
  if (eventStore.isRepaymentLocked) return
  shopOpen.value ? closeShop() : openShop()
}
function openShop() { shopOpen.value = true }
function closeShop() { shopOpen.value = false }

function doBuy() {
  const item = selectedItem.value
  if (!item || !canBuy.value) return
  gameStore.buyEquipment(item, PaymentMode.Nitra)
}

function doRepay() {
  if (!canRepay.value) return
  closeShop()
  repay()
}

// Drag handlers
function onDragStart(e: TouchEvent | MouseEvent) {
  if (eventStore.isRepaymentLocked) return
  e.preventDefault()
  dragStartX.value = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  dragActive.value = true
  dragDx.value = 0
}
function onDragMove(e: TouchEvent | MouseEvent) {
  if (!dragActive.value) return
  e.preventDefault()
  const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
  dragDx.value = (x - dragStartX.value) * 0.6
}
function onDragEnd() {
  if (!dragActive.value) return
  dragActive.value = false
  const raw = dragDx.value / 0.6
  if (Math.abs(raw) > 40)
    selIdx.value = Math.max(0, Math.min(EQUIPMENT_LIST.length - 1, selIdx.value + (raw < 0 ? 1 : -1)))
  dragDx.value = 0
}
function jumpTo(idx: number) {
  selIdx.value = idx
  dragDx.value = 0
}

// ─── Customer state ───────────────────────────────────────────────────────────
const customers = [
  reactive({ hp: 100, maxHp: 100, dying: false, hidden: false }),
  reactive({ hp: 100, maxHp: 100, dying: false, hidden: false }),
  reactive({ hp: 100, maxHp: 100, dying: false, hidden: false }),
]
const tier = computed(() => {
  if (!roomStore.startedAt) return 0
  return Math.floor((Date.now() - roomStore.startedAt) / 30000)
})
const tierHp = computed(() => Math.round(100 * Math.pow(1.5, tier.value)))

function hpPct(c: { hp: number; maxHp: number }) {
  return Math.max(0, (c.hp / c.maxHp) * 100)
}
function hpClass(c: { hp: number; maxHp: number }) {
  const pct = hpPct(c)
  if (pct < 30) return 'low'
  if (pct < 60) return 'mid'
  return ''
}
function hitCustomer(idx: number, event: MouseEvent | TouchEvent) {
  if (eventStore.isRepaymentLocked) return
  const c = customers[idx]
  if (c.dying || c.hidden) return
  const dmg = gameStore.attackPower
  c.hp = Math.max(0, c.hp - dmg)
  navigator.vibrate?.(30)
  spawnFloat(`-${dmg}`, 'dmg', event)
  if (c.hp <= 0) {
    const reward = Math.round(dmg * 12 * gameStore.rewardMultiplier)
    c.dying = true
    gameStore.addCash(reward)
    gameStore.recruitCustomer()
    spawnFloat(`+${reward}`, 'cash-pop', event)
    // Fade out (400ms), then hide + reset HP, then respawn from off-screen (1500ms gap)
    setTimeout(() => {
      c.dying = false    // clear dying BEFORE hiding so re-mount has clean opacity
      c.maxHp = tierHp.value
      c.hp = c.maxHp
      c.hidden = true
      setTimeout(() => { c.hidden = false }, 1500)
    }, 400)
  }
}

function spawnNextCustomer(idx: number) {
  // Customer walked off-screen naturally: destroy and spawn a fresh one
  const c = customers[idx]
  if (c.dying || c.hidden) return // hitCustomer is already handling this customer
  c.hidden = true
  c.maxHp = tierHp.value
  c.hp = c.maxHp
  setTimeout(() => { c.hidden = false }, 300)
}

// ─── Sky leaderboard ──────────────────────────────────────────────────────────
const medalFill = ['#FFD700', '#B0B8C8', '#C87A32']
const medalText = ['#7A5000', '#404858', '#fff']
const topPlayers = computed(() => roomStore.sortedPlayers.slice(0, 3))

// ─── Sky events ───────────────────────────────────────────────────────────────
const skyLbDimmed = ref(false)
const whaleBannerVisible = ref(false)
const flashCountdownVisible = ref(false)
const flashCountdownNum = ref(3)

// Whale
const whaleState = computed(() => eventStore.whaleState)
const whalePct = computed(() => {
  if (!whaleState.value) return 100
  return (whaleState.value.currentHp / whaleState.value.whaleBaseHp) * 100
})

watch(
  () => whaleState.value?.active,
  (active) => {
    if (active) {
      whaleBannerVisible.value = true
      skyLbDimmed.value = true
      setTimeout(() => {
        whaleBannerVisible.value = false
        skyLbDimmed.value = false
      }, 4000)
    }
  },
)

// ─── Demo mode event simulation ───────────────────────────────────────────────
const isDemoMode = ref(false)
const demoTimerIds: ReturnType<typeof setTimeout>[] = []
let demoWhaleTimeoutId: ReturnType<typeof setTimeout> | null = null

function scheduleDemoWhale() {
  const delay = (20 + Math.random() * 25) * 1000 // 20–45s random
  demoWhaleTimeoutId = setTimeout(() => {
    if (roomStore.status !== GameStatus.Playing) return
    eventStore.setWhale({ active: true, whaleBaseHp: 400, currentHp: 400, lastHitPlayer: null, bonusCash: 0 })
  }, delay)
}

function startDemoEvents() {
  const startedAt = roomStore.startedAt ?? Date.now()
  // Trigger 3s countdown at 27/57/87/117/147s, then activate 3.1s later
  const countdownTimes = [27, 57, 87, 117, 147]
  countdownTimes.forEach((t) => {
    const delay = startedAt + t * 1000 - Date.now()
    if (delay < 0) return
    const id = setTimeout(() => {
      if (roomStore.status !== GameStatus.Playing) return
      const item = PREMIUM_EQUIPMENT[Math.floor(Math.random() * PREMIUM_EQUIPMENT.length)]
      if (!item) return
      // Step 1: start countdown (active:false — triggers watch to show 3→2→1)
      eventStore.setFlashSale({
        active: false, equipmentId: item.id,
        claimed: false, claimedByUid: null, claimedByName: null,
        countdownStartedAt: Date.now(),
      })
      // Step 2: activate AFTER countdown finishes (3100ms = 3s countdown + 100ms buffer)
      const activateId = setTimeout(() => {
        const current = eventStore.flashSaleState
        if (current && current.equipmentId === item.id && !current.active && !current.claimed) {
          eventStore.setFlashSale({ ...current, active: true })
        }
      }, 3100)
      demoTimerIds.push(activateId)
    }, delay)
    demoTimerIds.push(id)
  })
  scheduleDemoWhale()
}

function stopDemoEvents() {
  demoTimerIds.forEach(clearTimeout)
  demoTimerIds.length = 0
  if (demoWhaleTimeoutId !== null) { clearTimeout(demoWhaleTimeoutId); demoWhaleTimeoutId = null }
}

// ─── Whale hit ────────────────────────────────────────────────────────────────
function hitWhaleDemoLocal(event: MouseEvent | TouchEvent) {
  const whale = eventStore.whaleState
  if (!whale || !whale.active) return
  const dmg = gameStore.attackPower
  const newHp = Math.max(0, whale.currentHp - dmg)
  spawnFloat(`-${dmg}`, 'dmg', event)
  navigator.vibrate?.(30)
  if (newHp <= 0) {
    const bonus = whale.whaleBaseHp * 50
    gameStore.addCash(bonus)
    spawnFloat(`+${bonus} LAST HIT`, 'cash-pop', event)
    eventStore.setWhale(null)
    scheduleDemoWhale() // schedule next whale after this one dies
  } else {
    eventStore.setWhale({ ...whale, currentHp: newHp })
  }
}

async function onHitWhale(event: MouseEvent | TouchEvent) {
  if (eventStore.isRepaymentLocked || !whaleState.value?.active) return
  if (isDemoMode.value) { hitWhaleDemoLocal(event); return }
  const { lastHit, bonusCash } = await tapWhale(gameStore.roomId, gameStore.uid, gameStore.attackPower)
  if (lastHit && bonusCash > 0) {
    gameStore.addCash(bonusCash)
    await clearWhale(gameStore.roomId)
    spawnFloat(`+${bonusCash} LAST HIT`, 'cash-pop', event)
  }
  spawnFloat(`-${gameStore.attackPower}`, 'dmg', event)
}

// Flash sale countdown — shows 3→2→1 only (activation handled by startDemoEvents setTimeout)
watch(
  () => eventStore.flashSaleState?.countdownStartedAt,
  (startedAt) => {
    if (!startedAt) return
    flashCountdownVisible.value = true
    let n = 3
    flashCountdownNum.value = n
    const t = setInterval(() => {
      n--
      if (n <= 0) {
        clearInterval(t)
        flashCountdownVisible.value = false
      } else {
        flashCountdownNum.value = n
      }
    }, 1000)
  },
)

// ─── Floating numbers ─────────────────────────────────────────────────────────
function spawnFloat(text: string, cls: string, event: MouseEvent | TouchEvent) {
  const x = 'touches' in event
    ? (event.changedTouches[0]?.clientX ?? 100)
    : (event as MouseEvent).clientX
  const y = 'touches' in event
    ? (event.changedTouches[0]?.clientY ?? 300)
    : (event as MouseEvent).clientY
  const el = document.createElement('div')
  el.className = `float-num ${cls}`
  el.textContent = text
  el.style.left = `${x + Math.round((Math.random() - 0.5) * 60)}px`
  el.style.top  = `${y}px`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 800)
}

// ─── Firebase subscriptions ───────────────────────────────────────────────────
let unsubRoom: (() => void) | null = null
let unsubWhale: (() => void) | null = null
let unsubFlash: (() => void) | null = null

onMounted(() => {
  // Carousel touch: must be { passive: false } so preventDefault() works
  if (carouselEl.value) {
    carouselEl.value.addEventListener('touchstart', onDragStart, { passive: false })
    carouselEl.value.addEventListener('touchmove',  onDragMove,  { passive: false })
  }

  // Demo mode: no roomId → run fully offline with pre-filled state
  if (!gameStore.uid || !gameStore.roomId) {
    isDemoMode.value = true
    goOffline(db) // suppress Firebase WebSocket connection errors
    const now = Date.now()
    gameStore.init('demo-uid', 'demo', '示範玩家', true)
    gameStore.syncFromFirebase({
      uid: 'demo-uid', name: '示範玩家',
      cashBalance: 0, assetsValue: 2200, creditUsed: 4000, creditLimit: 10000,
      ownedEquipment: ['dental-chair'], joinedAt: now, isHost: true,
    })
    roomStore.setRoom({
      id: 'demo', hostUid: 'demo-uid',
      status: GameStatus.Playing, startedAt: now,
      players: {
        'demo-uid': {
          uid: 'demo-uid', name: '示範玩家',
          cashBalance: 0, assetsValue: 2200, creditUsed: 4000, creditLimit: 10000,
          ownedEquipment: ['dental-chair'], joinedAt: now, isHost: true,
        },
      },
    })
    start()
    startDemoEvents() // simulate flash sale + whale locally (no Firebase)
    return
  }

  start()
  unsubRoom  = subscribeRoom(gameStore.roomId, (room) => { if (room) roomStore.setRoom(room) })
  unsubWhale = subscribeWhale(gameStore.roomId, (whale) => { eventStore.setWhale(whale) })
  unsubFlash = subscribeFlashSale(gameStore.roomId, (flash) => { eventStore.setFlashSale(flash) })

  // Host starts event timers that write to Firebase for all players
  if (gameStore.isHost) {
    initFlashSaleTimer(gameStore.roomId)
    scheduleOnlineWhale(gameStore.roomId)
  }
})

function scheduleOnlineWhale(roomId: string) {
  const delay = (30 + Math.random() * 30) * 1000 // 30–60s random
  demoWhaleTimeoutId = setTimeout(async () => {
    if (roomStore.status !== GameStatus.Playing) return
    try {
      await spawnWhale(roomId, 600)
    } catch { /* offline / error — skip */ }
    scheduleOnlineWhale(roomId) // schedule next whale
  }, delay)
}

onUnmounted(() => {
  if (carouselEl.value) {
    carouselEl.value.removeEventListener('touchstart', onDragStart)
    carouselEl.value.removeEventListener('touchmove',  onDragMove)
  }
  stop()
  stopDemoEvents()
  stopFlashSaleTimer(gameStore.roomId)
  unsubRoom?.()
  unsubWhale?.()
  unsubFlash?.()
})

watch(
  () => roomStore.status,
  (status) => {
    if (status === GameStatus.Ended) {
      stop()
      void router.push('/leaderboard')
    }
  },
)
</script>

<style scoped>
.game-page {
  /* placeholder — scene is fixed so page just needs to exist */
  background: var(--sky-c);
}

.game-scene {
  /* Fixed beneath the HUD — mirrors prototype's position:fixed inset:0 padding-top:80px */
  position: fixed;
  top: var(--q-header-height, 80px);
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  user-select: none;
  -webkit-user-select: none;
  /* No overflow:hidden so walk-right/left animations show at -100px edges */
}

/* Sky */
.sky {
  flex: 1;
  min-height: 0;
  background: linear-gradient(180deg, var(--sky-a) 0%, var(--sky-b) 55%, var(--sky-c) 100%);
  position: relative;
  overflow: hidden;
}

/* Clouds */
.cloud {
  position: absolute;
  background: rgba(255,255,255,.76);
  border-radius: 50px;
  animation: drift linear infinite;
}
.cloud::before, .cloud::after {
  content: '';
  position: absolute;
  background: inherit;
  border-radius: 50%;
}
.ca { width:72px;height:22px;top:14%;animation-duration:22s; }
.ca::before { width:42px;height:42px;top:-19px;left:10px; }
.ca::after  { width:28px;height:28px;top:-11px;right:9px; }
.cb { width:58px;height:18px;top:34%;animation-duration:31s;animation-delay:-10s;opacity:.6; }
.cb::before { width:32px;height:32px;top:-13px;left:8px; }
.cc { width:90px;height:27px;top:7%;animation-duration:27s;animation-delay:-7s;opacity:.55; }
.cc::before { width:48px;height:48px;top:-22px;left:13px; }
@keyframes drift { from { left:-160px; } to { left:calc(100% + 160px); } }

/* City buildings */
.city-row {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 58%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.bldg { flex-shrink:0;border-radius:3px 3px 0 0;position:relative; }
.bldg::after {
  content: '';
  position: absolute;
  top:18%;left:18%;width:28%;height:22%;
  background:rgba(255,255,255,.18);border-radius:2px;
}
.bldg::before {
  content: '';
  position: absolute;
  top:18%;right:18%;width:28%;height:22%;
  background:rgba(255,255,255,.12);border-radius:2px;
}

/* Sky leaderboard */
.sky-lb {
  position: absolute;
  top:8px;right:8px;
  background:rgba(255,252,240,.94);
  border:1.5px solid rgba(200,170,100,.5);
  border-radius:10px;
  padding:8px 12px;
  min-width:172px;
  font-size:.82rem;
  line-height:1.8;
  box-shadow:0 2px 10px rgba(60,30,0,.13);
  transition:opacity .3s;
  z-index:3;
}
.sky-lb-title {
  font-weight:900;font-size:.86rem;color:var(--cash);
  margin-bottom:4px;letter-spacing:.04em;
  display:flex;align-items:center;gap:4px;
}
.sky-lb-row { display:flex;gap:6px;align-items:center; }
.sky-lb-row.me { background:rgba(255,200,0,.18);border-radius:4px;padding:0 4px; }
.sky-lb-rank { font-weight:800;min-width:20px;display:flex;align-items:center;justify-content:center; }
.sky-lb-name { flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600; }
.sky-lb-val  { font-weight:900;font-size:.8rem;color:var(--cash); }

/* Sky events */
.sky-event {
  position:absolute;bottom:12px;left:0;right:0;
  display:flex;align-items:center;justify-content:center;
  z-index:4;pointer-events:none;
}
.sky-banner {
  background:#FFD028;color:#5A3200;
  font-size:1.05rem;font-weight:900;
  padding:8px 22px;border-radius:4px;
  box-shadow:0 3px 14px rgba(0,0,0,.22);white-space:nowrap;
  transform:translateX(-110%);
}
.sky-banner.sweep { animation:banner-sweep 3.6s ease forwards; }
@keyframes banner-sweep {
  0%   { transform:translateX(-110%); }
  18%  { transform:translateX(0); }
  72%  { transform:translateX(0); }
  100% { transform:translateX(110%); }
}
@keyframes count-pop { from { transform:scale(1.5);opacity:.5; } to { transform:scale(1);opacity:1; } }

/* Whale boss HP bar in sky */
.whale-boss-bar {
  position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
  width:230px;background:rgba(0,0,0,.55);border:2px solid #FFD028;
  border-radius:10px;padding:7px 12px;z-index:4;
}
.whale-boss-label {
  font-size:.78rem;font-weight:900;color:#FFD028;
  text-align:center;margin-bottom:5px;letter-spacing:.06em;
}
.whale-boss-track {
  height:14px;background:rgba(255,255,255,.15);border-radius:7px;overflow:hidden;
}
.whale-boss-fill {
  height:100%;background:linear-gradient(90deg,#C82000,#FF4040);
  border-radius:7px;transition:width 200ms ease;
}
.whale-boss-hp {
  font-size:.72rem;color:rgba(255,255,255,.7);text-align:center;margin-top:4px;
}

/* Flash sale countdown — no backdrop, just the numbers floating on screen */
.flash-cd-overlay {
  position:fixed;inset:0;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:transparent;z-index:35;pointer-events:none;
}
.flash-cd-num {
  font-size:9rem;font-weight:900;color:#FFD028;line-height:1;
  text-shadow:0 0 50px rgba(255,200,0,.8),4px 4px 0 rgba(0,0,0,.35);
  animation:count-pop .3s ease;
}
.flash-cd-label {
  font-size:1.3rem;font-weight:800;color:rgba(255,255,255,.9);
  margin-top:16px;text-shadow:0 2px 8px rgba(0,0,0,.5);
  letter-spacing:.06em;
}
.sky-lock {
  background:rgba(255,250,235,.94);border:1.5px solid #E8C090;
  border-radius:8px;padding:7px 20px;font-size:1rem;font-weight:800;
  color:#A82800;box-shadow:0 2px 8px rgba(0,0,0,.12);
}

/* Street */
.street-lane {
  height: 148px;
  background: var(--street);
  position: relative;
  overflow: visible; /* allow customers to animate from -100px edge */
  border-top: 3px solid #9A7035;
  flex-shrink: 0;
}
.street-lane::after {
  content:'';position:absolute;top:50%;left:0;right:0;height:4px;
  background:repeating-linear-gradient(90deg,rgba(255,255,255,.38) 0 26px,transparent 26px 52px);
  transform:translateY(-50%);pointer-events:none;
}

/* Customers — direct children of .street-lane */
.customer {
  position:absolute;
  top:50%;transform:translateY(-50%);
  display:flex;flex-direction:column;align-items:center;
  cursor:pointer;user-select:none;
  opacity:1 !important;
  touch-action:none;
  transition:opacity .3s ease;
}
.customer.dying { opacity:0 !important; }
.char-svg {
  display:block;
  animation:char-bob .42s ease-in-out infinite alternate;
  image-rendering:pixelated;
}
@keyframes char-bob { from { transform:translateY(0); } to { transform:translateY(-4px); } }
.hp-bar {
  width:46px;height:6px;border-radius:3px;
  background:rgba(0,0,0,.18);margin-bottom:4px;overflow:hidden;
}
.whale-hp-bar { width:68px;height:8px; }
.hp-fill {
  height:100%;border-radius:3px;background:var(--hp-hi);
  transition:width 130ms ease,background 200ms ease;
}
.hp-fill.mid { background:var(--hp-md); }
.hp-fill.low { background:var(--hp-lo); }

/* walk-right / walk-left defined globally in app.scss */

/* Sidewalk */
.sidewalk { height:16px;background:var(--sidewalk);border-top:2px solid #C09858;flex-shrink:0; }

/* Clinic */
.clinic-base {
  background:linear-gradient(180deg,#EEDDCC,#DDD0B8);
  padding:6px 0 0;display:flex;justify-content:center;align-items:flex-end;flex-shrink:0;
}
.clinic {
  width:196px;height:106px;background:#FEFDF5;
  border-radius:7px 7px 0 0;border:2px solid #E0D0B0;border-bottom:none;
  box-shadow:0 -3px 12px rgba(60,30,0,.10);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;
  cursor:pointer;position:relative;
  transition:transform 140ms ease,box-shadow 140ms ease;
}
.clinic:active { transform:scale(.97); }
.clinic.open { box-shadow:0 -4px 20px rgba(78,205,196,.5),0 0 0 2px #48C4B8; }
.clinic::before {
  content:'';position:absolute;top:-24px;left:50%;transform:translateX(-50%);
  width:34px;height:30px;background:#C83030;
  clip-path:polygon(35% 0%,65% 0%,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0% 65%,0% 35%,35% 35%);
}
.clinic-sign {
  font-size:.72rem;font-weight:900;color:#226060;
  letter-spacing:.06em;text-transform:uppercase;
  background:#E0F4F0;border:1.5px solid #A0DCD4;border-radius:3px;padding:2px 10px;margin-bottom:2px;
}
.clinic-assets {
  font-size:.88rem;font-weight:600;color:var(--txt-mid);
  display:flex;align-items:center;gap:4px;
}
.clinic-assets-val { font-weight:900;color:var(--cash);font-size:1rem; }

/* Backdrop */
.backdrop {
  position:fixed;inset:0;background:rgba(0,0,0,0);
  pointer-events:none;z-index:9;transition:background .2s ease;
}
.backdrop.on { background:rgba(0,0,0,.18);pointer-events:auto; }

/* Equipment sheet */
.eq-sheet {
  position:fixed;bottom:0;left:0;right:0;height:64vh;
  background:var(--shop-dark);
  border-top:1px solid rgba(255,255,255,.09);
  box-shadow:0 -6px 28px rgba(0,0,0,.38);
  transform:translateY(100%);transition:var(--t-sheet);
  z-index:10;display:flex;flex-direction:column;overflow:hidden;
}
.eq-sheet.open { transform:translateY(0); }
.sheet-handle {
  width:36px;height:4px;border-radius:2px;
  background:rgba(255,255,255,.22);margin:10px auto 4px;flex-shrink:0;
}

/* Carousel */
.carousel {
  flex:1;min-height:0;position:relative;
  display:flex;align-items:center;justify-content:center;
  overflow:visible;touch-action:pan-y;cursor:grab;
}
.carousel:active { cursor:grabbing; }
.bubble {
  position:absolute;border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  transition:var(--t-bub);user-select:none;
}
.b-name {
  font-size:.75rem;font-weight:800;text-align:center;margin-top:4px;
  max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  color:rgba(255,255,255,.9);
}

/* Shop detail */
.shop-detail { padding:5px 14px 2px;text-align:center;flex-shrink:0; }
.item-name   { font-size:1.2rem;font-weight:900;color:#fff; }
.item-meta   { font-size:.95rem;color:rgba(255,255,255,.62);margin-top:3px; }
.item-owned  {
  display:inline-flex;align-items:center;gap:4px;color:#68EDAA;
  font-weight:800;font-size:.95rem;background:rgba(104,237,170,.12);
  padding:3px 12px;border-radius:20px;margin-top:4px;
}

/* Nitra row */
.nitra-row {
  display:flex;align-items:center;gap:8px;margin:4px 12px 0;
  background:rgba(200,58,24,.10);border:1px solid rgba(200,58,24,.28);
  border-radius:8px;padding:8px 12px;flex-shrink:0;
}
.nitra-info { flex:1;font-size:.88rem;color:rgba(255,255,255,.6); }
.nitra-used-val { font-weight:800;color:#FF8060; }

/* Buttons */
.shop-actions { display:flex;gap:8px;padding:6px 12px 14px;flex-shrink:0; }
.btn-cancel {
  flex:0 0 auto;padding:12px 16px;border-radius:var(--r-btn);
  background:rgba(255,255,255,.09);color:rgba(255,255,255,.78);
  border:1px solid rgba(255,255,255,.16);cursor:pointer;
  font-size:1rem;font-weight:700;transition:background 100ms;
}
.btn-cancel:hover { background:rgba(255,255,255,.17); }
.btn-buy {
  flex:1;padding:12px;border-radius:var(--r-btn);
  background:var(--btn-r);color:#fff;border:none;cursor:pointer;
  font-size:1.05rem;font-weight:800;box-shadow:0 3px 0 var(--btn-r-dk);
  transition:transform 100ms,box-shadow 100ms,opacity 100ms;
}
.btn-buy:active:not(:disabled) { transform:translateY(2px);box-shadow:0 1px 0 var(--btn-r-dk); }
.btn-repay {
  padding:10px 14px;border-radius:var(--r-btn);
  background:var(--btn-g);color:#fff;border:none;cursor:pointer;
  font-size:.9rem;font-weight:800;box-shadow:0 3px 0 var(--btn-g-dk);white-space:nowrap;
  transition:transform 100ms,box-shadow 100ms;
}
.btn-repay:active:not(:disabled) { transform:translateY(2px);box-shadow:0 1px 0 var(--btn-g-dk); }
button:disabled { opacity:.33;cursor:not-allowed; }

/* Repay lock overlay */
.repay-lock {
  position:fixed;inset:0;background:rgba(0,0,0,.52);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:14px;z-index:40;pointer-events:all;
}
.lock-spinner {
  width:56px;height:56px;border-radius:50%;
  border:5px solid rgba(255,200,140,.2);border-top-color:var(--nitra);
  animation:spin 1s linear infinite;
}
@keyframes spin { to { transform:rotate(360deg); } }
.lock-title { font-size:1.4rem;font-weight:900;color:#fff; }
.lock-sub   { font-size:1rem;color:rgba(255,255,255,.62); }
</style>
