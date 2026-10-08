<template>
  <div class="password-protect">
    <div v-if="!unlocked" class="locked-content">
      <div class="password-form">
        <input 
          type="password" 
          v-model="password" 
          placeholder="请输入密码查看答案"
          @keyup.enter="checkPassword"
          class="password-input"
        />
        <button @click="checkPassword" class="unlock-btn">解锁</button>
      </div>
      <p v-if="error" class="error-msg">密码错误，请重试</p>
    </div>
    <div v-else class="unlocked-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  secret: {
    type: String,
    default: '538137'
  }
})

const password = ref('')
const unlocked = ref(false)
const error = ref(false)

const checkPassword = () => {
  if (password.value === props.secret) {
    unlocked.value = true
    error.value = false
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.password-protect {
  margin: 16px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.password-form {
  display: flex;
  gap: 8px;
  align-items: center;
}

.password-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.password-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.unlock-btn {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.unlock-btn:hover {
  background: var(--vp-c-brand-dark);
}

.error-msg {
  color: var(--vp-c-danger);
  margin-top: 8px;
  font-size: 14px;
}

.unlocked-content {
  padding: 8px 0;
}
</style>
