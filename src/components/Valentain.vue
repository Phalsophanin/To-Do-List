<template>
  <div class="relative min-h-screen bg-[#ffe5ec] flex items-center justify-center font-['Comic_Sans_MS',_cursive,_sans-serif] overflow-hidden">
    
    <div ref="heartContainer" class="absolute inset-0 pointer-events-none z-1"></div>

    <video ref="audioPlayer" class="hidden" loop>
      <source src="/src/assets/song.mp4" type="video/mp4">
    </video>

    <transition name="fade">
      <div v-if="currentPage === 1" 
           class="z-10 w-full max-w-[400px] bg-white/80 p-10 rounded-[30px] text-center backdrop-blur-sm border-2 border-[#ff85a1] shadow-[0_10px_30px_rgba(255,77,109,0.2)] mx-4">
        <img src="/src/assets/bear.gif" alt="Cute Bear" class="w-[200px] rounded-2xl mb-5 mx-auto" />
        <h1 class="text-[#c9184a] text-3xl font-bold mb-8">
          Happy Valentine's Day My Sweetheart!
        </h1>
        <div class="flex justify-center">
          <button 
            @click="startExperience"
            class="bg-[#2ecc71] hover:bg-[#27ae60] hover:scale-110 text-white text-2xl font-bold py-3 px-11 rounded-xl transition-all duration-200 shadow-[0_4px_0_#27ae60] active:shadow-none active:translate-y-1"
          >
            Next ❤️
          </button>
        </div>
      </div>
    </transition>

    <transition name="pop">
      <div v-if="currentPage === 2" 
           class="fixed inset-0 z-[100] bg-[#ffe5ec] flex flex-col items-center justify-center text-center p-5">
        <img src="/src/assets/3.png" alt="cute" class="w-[200px] rounded-2xl mb-5" />
        
        <h3 class="text-[#ff4d6d] text-3xl md:text-4xl font-bold mb-8 px-5">
          Nin Nin love you more than I can say, and even more than I know how to show 💕❤️
        </h3>
        
        <div class="flex gap-4">
          <button 
            @click="currentPage = 1" 
            class="bg-gray-400 hover:bg-gray-500 text-white text-xl font-bold py-3 px-8 rounded-xl transition-all shadow-[0_4px_0_#666] active:translate-y-1"
          >
            Back
          </button>
          <button 
            @click="currentPage = 3"
            class="bg-[#ff4d6d] hover:scale-110 text-white text-2xl font-bold py-3 px-8 rounded-xl transition-all shadow-[0_4px_0_#c9184a] active:translate-y-1"
          >
            More? ✨
          </button>
        </div>
      </div>
    </transition>

    <transition name="pop">
      <div v-if="currentPage === 3" 
           class="fixed inset-0 z-[110] bg-[#ffb3c6] flex flex-col items-center justify-center text-center p-5">
        
        <div class="bg-white/40 p-8 rounded-[40px] backdrop-blur-md border-4 border-white shadow-2xl">
          <h2 class="text-white text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Forever & Always! 
          </h2>
          <p class="text-[#c9184a] text-2xl font-semibold mb-8">
            I am so lucky to have you. Thank you for being my sunshine, my rock, and my everything. I love you to the moon and back, Nin Nin! 🌙❤️
          </p>
          <button 
            @click="reset"
            class="bg-white text-[#ff4d6d] hover:scale-110 text-2xl font-bold py-3 px-11 rounded-xl transition-all shadow-[0_4px_0_#ff85a1] active:translate-y-1"
          >
            Restart ❤️
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentPage = ref(1);
const heartContainer = ref(null);
const audioPlayer = ref(null);
let heartInterval = null;

// Starts music and moves to page 2
const startExperience = () => {
  if (audioPlayer.value) {
    audioPlayer.value.play().catch(e => console.log("Music play blocked:", e));
  }
  currentPage.value = 2;
};

// Resets music and returns to start
const reset = () => {
  currentPage.value = 1;
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
  }
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

<style scoped>
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

/* Page Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
</style>