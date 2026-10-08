<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

type Direction = 'left' | 'right' | 'up' | 'down'
type GameStatus = 'playing' | 'won' | 'lost'

interface GameSnapshot {
  board: number[]
  score: number
  moves: number
  status: GameStatus
}

interface SavedGame extends GameSnapshot {
  bestScore: number
  hasWon: boolean
}

const SIZE = 4
const CELL_COUNT = SIZE * SIZE
const STORAGE_KEY = 'franklin-2048-game-v1'
const SWIPE_DISTANCE = 36

const board = ref<number[]>(Array(CELL_COUNT).fill(0))
const score = ref(0)
const bestScore = ref(0)
const moves = ref(0)
const status = ref<GameStatus>('playing')
const hasWon = ref(false)
const previous = ref<GameSnapshot | null>(null)
const boardElement = ref<HTMLElement | null>(null)
const touchStart = ref<{ x: number; y: number } | null>(null)

const canUndo = computed(() => previous.value !== null && status.value === 'playing')
const statusTitle = computed(() => status.value === 'won' ? '合成 2048！' : '本局结束')
const statusMessage = computed(() => status.value === 'won'
  ? '漂亮！你可以继续挑战更大的数字。'
  : `最终得分 ${score.value.toLocaleString('zh-CN')}，再来一局吧。`)

function addRandomTile(target: number[]) {
  const emptyCells = target
    .map((value, index) => value === 0 ? index : -1)
    .filter(index => index >= 0)

  if (!emptyCells.length) return
  const index = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  target[index] = Math.random() < 0.9 ? 2 : 4
}

function persist() {
  if (typeof window === 'undefined') return
  const saved: SavedGame = {
    board: [...board.value],
    score: score.value,
    bestScore: bestScore.value,
    moves: moves.value,
    status: status.value,
    hasWon: hasWon.value,
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
}

function restore() {
  if (typeof window === 'undefined') return false

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const saved = JSON.parse(raw) as SavedGame
    const validBoard = Array.isArray(saved.board)
      && saved.board.length === CELL_COUNT
      && saved.board.every(value => Number.isInteger(value) && value >= 0)

    if (!validBoard) return false
    board.value = [...saved.board]
    score.value = Number.isFinite(saved.score) ? Math.max(0, saved.score) : 0
    bestScore.value = Number.isFinite(saved.bestScore)
      ? Math.max(score.value, saved.bestScore)
      : score.value
    moves.value = Number.isFinite(saved.moves) ? Math.max(0, saved.moves) : 0
    status.value = ['playing', 'won', 'lost'].includes(saved.status) ? saved.status : 'playing'
    hasWon.value = Boolean(saved.hasWon)
    return true
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return false
  }
}

function focusBoard() {
  nextTick(() => boardElement.value?.focus())
}

function newGame() {
  const fresh = Array(CELL_COUNT).fill(0)
  addRandomTile(fresh)
  addRandomTile(fresh)
  board.value = fresh
  score.value = 0
  moves.value = 0
  status.value = 'playing'
  hasWon.value = false
  previous.value = null
  persist()
  focusBoard()
}

function getLineIndices(direction: Direction, line: number) {
  return Array.from({ length: SIZE }, (_, offset) => {
    if (direction === 'left') return line * SIZE + offset
    if (direction === 'right') return line * SIZE + (SIZE - 1 - offset)
    if (direction === 'up') return offset * SIZE + line
    return (SIZE - 1 - offset) * SIZE + line
  })
}

function mergeLine(values: number[]) {
  const compact = values.filter(value => value !== 0)
  const merged: number[] = []
  let gained = 0

  for (let index = 0; index < compact.length; index += 1) {
    if (compact[index] === compact[index + 1]) {
      const value = compact[index] * 2
      merged.push(value)
      gained += value
      index += 1
    } else {
      merged.push(compact[index])
    }
  }

  while (merged.length < SIZE) merged.push(0)
  return { values: merged, gained }
}

function hasAvailableMove(target: number[]) {
  if (target.some(value => value === 0)) return true

  for (let row = 0; row < SIZE; row += 1) {
    for (let column = 0; column < SIZE; column += 1) {
      const index = row * SIZE + column
      if (column < SIZE - 1 && target[index] === target[index + 1]) return true
      if (row < SIZE - 1 && target[index] === target[index + SIZE]) return true
    }
  }
  return false
}

function move(direction: Direction) {
  if (status.value !== 'playing') return

  const before: GameSnapshot = {
    board: [...board.value],
    score: score.value,
    moves: moves.value,
    status: status.value,
  }
  const next = Array(CELL_COUNT).fill(0)
  let gained = 0

  for (let line = 0; line < SIZE; line += 1) {
    const indices = getLineIndices(direction, line)
    const merged = mergeLine(indices.map(index => board.value[index]))
    gained += merged.gained
    indices.forEach((index, offset) => {
      next[index] = merged.values[offset]
    })
  }

  if (next.every((value, index) => value === board.value[index])) return

  previous.value = before
  addRandomTile(next)
  board.value = next
  score.value += gained
  bestScore.value = Math.max(bestScore.value, score.value)
  moves.value += 1

  if (!hasWon.value && next.some(value => value >= 2048)) {
    hasWon.value = true
    status.value = 'won'
  } else if (!hasAvailableMove(next)) {
    status.value = 'lost'
  }
  persist()
}

function undo() {
  if (!canUndo.value || !previous.value) return
  const snapshot = previous.value
  board.value = [...snapshot.board]
  score.value = snapshot.score
  moves.value = snapshot.moves
  status.value = snapshot.status
  previous.value = null
  persist()
  focusBoard()
}

function continueGame() {
  status.value = hasAvailableMove(board.value) ? 'playing' : 'lost'
  persist()
  if (status.value === 'playing') focusBoard()
}

function handleKeydown(event: KeyboardEvent) {
  const directions: Record<string, Direction> = {
    ArrowLeft: 'left', a: 'left', A: 'left',
    ArrowRight: 'right', d: 'right', D: 'right',
    ArrowUp: 'up', w: 'up', W: 'up',
    ArrowDown: 'down', s: 'down', S: 'down',
  }
  const direction = directions[event.key]
  if (!direction) return
  event.preventDefault()
  move(direction)
}

function handleTouchStart(event: TouchEvent) {
  const touch = event.changedTouches[0]
  touchStart.value = { x: touch.clientX, y: touch.clientY }
}

function handleTouchEnd(event: TouchEvent) {
  if (!touchStart.value) return
  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStart.value.x
  const deltaY = touch.clientY - touchStart.value.y
  touchStart.value = null

  if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < SWIPE_DISTANCE) return
  if (Math.abs(deltaX) > Math.abs(deltaY)) move(deltaX > 0 ? 'right' : 'left')
  else move(deltaY > 0 ? 'down' : 'up')
}

function tileClass(value: number) {
  return value > 2048 ? 'tile-super' : `tile-${value}`
}

onMounted(() => {
  if (!restore()) newGame()
  else focusBoard()
})
</script>

<template>
  <section class="game-shell" aria-labelledby="game-title">
    <header class="game-header">
      <div>
        <p class="eyebrow">数字拼图</p>
        <h1 id="game-title">2048</h1>
        <p class="intro">滑动方块，合并相同数字，一起抵达 2048。</p>
      </div>

      <div class="scoreboard" aria-label="游戏统计">
        <div class="score-card">
          <span>得分</span>
          <strong>{{ score.toLocaleString('zh-CN') }}</strong>
        </div>
        <div class="score-card score-card-best">
          <span>最高</span>
          <strong>{{ bestScore.toLocaleString('zh-CN') }}</strong>
        </div>
      </div>
    </header>

    <div class="toolbar">
      <p>已移动 <strong>{{ moves }}</strong> 步</p>
      <div class="actions">
        <button class="button button-secondary" type="button" :disabled="!canUndo" @click="undo">撤销一步</button>
        <button class="button button-primary" type="button" @click="newGame">新游戏</button>
      </div>
    </div>

    <div
      ref="boardElement"
      class="board"
      tabindex="0"
      role="application"
      aria-label="2048 游戏棋盘。使用方向键或 WASD 移动方块。"
      @keydown="handleKeydown"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div
        v-for="(value, index) in board"
        :key="`${index}-${value}`"
        class="tile"
        :class="tileClass(value)"
        :aria-label="value ? `第 ${Math.floor(index / SIZE) + 1} 行，第 ${index % SIZE + 1} 列，数字 ${value}` : undefined"
      >
        <span v-if="value">{{ value }}</span>
      </div>

      <div v-if="status !== 'playing'" class="game-overlay" role="dialog" aria-modal="true" :aria-label="statusTitle">
        <div class="result-card">
          <p class="result-kicker">{{ status === 'won' ? '里程碑达成' : '没有可移动的方块了' }}</p>
          <h2>{{ statusTitle }}</h2>
          <p>{{ statusMessage }}</p>
          <div class="result-actions">
            <button v-if="status === 'won'" class="button button-secondary" type="button" @click="continueGame">继续挑战</button>
            <button class="button button-primary" type="button" @click="newGame">
              {{ status === 'won' ? '重新开始' : '再来一局' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <p class="instructions">
      <span class="desktop-hint">使用方向键或 WASD 操作</span>
      <span class="mobile-hint">在棋盘上向任意方向滑动</span>
      <span aria-hidden="true"> · </span>每次有效移动后会出现一个新方块
    </p>

    <p class="sr-only" aria-live="polite">
      当前得分 {{ score }}，移动 {{ moves }} 步，游戏状态：{{ status === 'playing' ? '进行中' : statusTitle }}。
    </p>
  </section>
</template>

<style scoped>
.game-shell {
  --game-ink: #312e2b;
  --game-muted: #6f665f;
  --game-surface: #fbf8f3;
  --game-board: #9d8f82;
  --game-cell: rgba(255, 255, 255, 0.22);
  --game-accent: #d85b35;
  max-width: 620px;
  margin: 24px auto 48px;
  padding: clamp(20px, 5vw, 36px);
  color: var(--game-ink);
  background: var(--game-surface);
  border: 1px solid rgba(89, 75, 64, 0.14);
  border-radius: 28px;
  box-shadow: 0 22px 60px rgba(69, 52, 38, 0.12);
}

.game-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.eyebrow {
  margin: 0 0 2px;
  color: var(--game-accent);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

h1 {
  margin: 0;
  color: var(--game-ink);
  font-size: clamp(56px, 12vw, 84px);
  line-height: 0.94;
  letter-spacing: -0.07em;
}

.intro {
  max-width: 310px;
  margin: 14px 0 0;
  color: var(--game-muted);
  font-size: 16px;
  line-height: 1.55;
}

.scoreboard {
  display: grid;
  grid-template-columns: repeat(2, minmax(86px, 1fr));
  gap: 8px;
  flex: 0 0 auto;
}

.score-card {
  min-width: 86px;
  padding: 10px 12px;
  text-align: center;
  color: #fff;
  background: #74685e;
  border-radius: 14px;
}

.score-card-best { background: #4d443d; }
.score-card span { display: block; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; }
.score-card strong { display: block; margin-top: 2px; font-size: 22px; line-height: 1.2; }

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 28px 0 14px;
}

.toolbar p { margin: 0; color: var(--game-muted); font-size: 14px; }
.actions, .result-actions { display: flex; gap: 8px; }

.button {
  min-height: 44px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  transition: background-color 180ms ease, box-shadow 180ms ease, color 180ms ease;
}

.button:focus-visible, .board:focus-visible { outline: 3px solid #2f72d6; outline-offset: 3px; }
.button-primary { color: #fff; background: var(--game-accent); box-shadow: 0 7px 16px rgba(216, 91, 53, 0.24); }
.button-primary:hover { background: #bd4827; }
.button-secondary { color: var(--game-ink); background: #e9e2da; }
.button-secondary:hover:not(:disabled) { background: #ddd3c8; }
.button:disabled { cursor: not-allowed; opacity: 0.48; }

.board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(7px, 2vw, 12px);
  padding: clamp(7px, 2vw, 12px);
  overflow: hidden;
  background: var(--game-board);
  border-radius: 18px;
  touch-action: none;
  user-select: none;
}

.tile {
  display: grid;
  aspect-ratio: 1;
  place-items: center;
  color: #4b423b;
  background: var(--game-cell);
  border-radius: 12px;
  font-size: clamp(22px, 7vw, 42px);
  font-weight: 850;
  letter-spacing: -0.05em;
}

.tile span { animation: tile-pop 160ms ease-out; }
.tile-2 { background: #eee7dc; }
.tile-4 { background: #e9ddc8; }
.tile-8 { color: #fff; background: #e6a05e; }
.tile-16 { color: #fff; background: #e7814e; }
.tile-32 { color: #fff; background: #df6346; }
.tile-64 { color: #fff; background: #cc4636; }
.tile-128 { color: #fff; background: #d5a83d; font-size: clamp(20px, 6vw, 36px); }
.tile-256 { color: #fff; background: #ca942e; font-size: clamp(20px, 6vw, 36px); }
.tile-512 { color: #fff; background: #b97e22; font-size: clamp(20px, 6vw, 36px); }
.tile-1024 { color: #fff; background: #9c6419; font-size: clamp(18px, 5vw, 31px); }
.tile-2048 { color: #fff; background: #7348b5; font-size: clamp(18px, 5vw, 31px); box-shadow: inset 0 0 0 2px rgba(255,255,255,.3); }
.tile-super { color: #fff; background: #463174; font-size: clamp(16px, 4.5vw, 27px); }

.game-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(249, 244, 236, 0.88);
  backdrop-filter: blur(5px);
  animation: overlay-in 220ms ease-out;
}

.result-card { max-width: 360px; text-align: center; }
.result-kicker { margin: 0 0 6px; color: var(--game-accent); font-size: 12px; font-weight: 800; letter-spacing: 0.1em; }
.result-card h2 { margin: 0; color: var(--game-ink); border: 0; font-size: clamp(30px, 8vw, 48px); line-height: 1.1; }
.result-card > p:not(.result-kicker) { margin: 12px 0 20px; color: var(--game-muted); }
.result-actions { justify-content: center; }
.instructions { margin: 16px 4px 0; color: var(--game-muted); font-size: 13px; line-height: 1.6; text-align: center; }
.mobile-hint { display: none; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes tile-pop { from { opacity: 0.45; transform: scale(0.82); } to { opacity: 1; transform: scale(1); } }
@keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 600px) {
  .game-shell { margin: 8px auto 32px; padding: 18px; border-radius: 22px; }
  .game-header { align-items: flex-start; flex-direction: column; gap: 18px; }
  .scoreboard { width: 100%; }
  .toolbar { align-items: flex-start; flex-direction: column; margin-top: 20px; }
  .actions { width: 100%; }
  .actions .button { flex: 1; }
  .desktop-hint { display: none; }
  .mobile-hint { display: inline; }
}

@media (prefers-color-scheme: dark) {
  .game-shell {
    --game-ink: #f5eee7;
    --game-muted: #c6bcb3;
    --game-surface: #26221f;
    border-color: rgba(255, 255, 255, 0.11);
    box-shadow: 0 22px 60px rgba(0, 0, 0, 0.28);
  }
  .button-secondary { color: #f5eee7; background: #4a423b; }
  .button-secondary:hover:not(:disabled) { background: #5a5048; }
  .game-overlay { background: rgba(38, 34, 31, 0.9); }
}

:global(.dark) .game-shell {
  --game-ink: #f5eee7;
  --game-muted: #c6bcb3;
  --game-surface: #26221f;
  border-color: rgba(255, 255, 255, 0.11);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.28);
}

:global(.dark) .button-secondary {
  color: #f5eee7;
  background: #4a423b;
}

:global(.dark) .button-secondary:hover:not(:disabled) {
  background: #5a5048;
}

:global(.dark) .game-overlay {
  background: rgba(38, 34, 31, 0.9);
}

@media (prefers-reduced-motion: reduce) {
  .button, .tile span, .game-overlay { transition: none; animation: none; }
}
</style>
