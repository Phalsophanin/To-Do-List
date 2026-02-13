<template>
  <div class="relative min-h-screen bg-[#ffe5ec] flex items-center justify-center font-['Comic_Sans_MS',_cursive,_sans-serif] overflow-hidden">
    
    <div ref="heartContainer" class="absolute inset-0 pointer-events-none z-1"></div>

    <transition name="fade">
      <div v-if="!showCelebration" 
           class="z-10 w-full max-w-[400px] bg-white/80 p-10 rounded-[30px] text-center backdrop-blur-sm border-2 border-[#ff85a1] shadow-[0_10px_30px_rgba(255,77,109,0.2)] mx-4">
        <img src="/src/assets/bear.gif" alt="Cute Bear" class="w-[200px] rounded-2xl mb-5 mx-auto" />
        <h1 class="text-[#c9184a] text-3xl font-bold mb-8">
          Happy Valentine's Day My Sweetheart!
        </h1>
        <div class="flex justify-center">
          <button 
            @click="celebrate"
            class="bg-[#2ecc71] hover:bg-[#27ae60] hover:scale-110 text-white text-2xl font-bold py-3 px-11 rounded-xl transition-all duration-200 shadow-[0_4px_0_#27ae60] active:shadow-none active:translate-y-1"
          >
            Next ❤️
          </button>
        </div>
      </div>
    </transition>

    <transition name="pop">
      <div v-if="showCelebration" 
           class="fixed inset-0 z-[100] bg-[#ffe5ec] flex flex-col items-center justify-center text-center p-5">
        <img src="/src/assets/3.png" alt="cute" class="w-[200px] rounded-2xl mb-5" />
        <h3 class="text-[#ff4d6d] text-3xl md:text-4xl font-bold mb-8 px-5">
          Nin Nin love you more than I can say, and even more than I know how to show 💕❤️
        </h3>
        <button 
          @click="reset"
          class="bg-[#ff4d6d] hover:scale-110 text-white text-2xl font-bold py-3 px-11 rounded-xl transition-all duration-200 shadow-[0_4px_0_#c9184a] active:shadow-none active:translate-y-1"
        >
          Back
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showCelebration = ref(false);
const heartContainer = ref(null);
let heartInterval = null;

const celebrate = () => {
  showCelebration.value = true;
};

const reset = () => {
  showCelebration.value = false;
};

const createHeart = () => {
  if (!heartContainer.value) return;

  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.className = 'absolute bottom-[-50px] pointer-events-none animate-floatUp';
  
  const size = Math.random() * 20 + 10;
  const duration = Math.random() * 5 + 5;
  const leftPos = Math.random() * 100;

  heart.style.left = `${leftPos}vw`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.opacity = Math.random().toString();

  heartContainer.value.appendChild(heart);

  // Clean up DOM
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
};

onMounted(() => {
  heartInterval = setInterval(createHeart, 300);
});

onUnmounted(() => {
  clearInterval(heartInterval);
});
</script>

<style>
@keyframes floatUp {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-120vh) translateX(40px) scale(1.5);
    opacity: 0;
  }
}

.animate-floatUp {
  animation: floatUp linear infinite;
}

/* Vue Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  animation: pop-in 0.5s ease-out forwards;
}
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>