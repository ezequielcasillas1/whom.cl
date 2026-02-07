<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ JOURNALS</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          CHRISTIAN JOURNALS_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          Tools for spiritual growth, Bible study, and professional development rooted in faith.
        </p>
      </div>
    </section>

    <section class="py-16 bg-deep-black">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Whom I Fast For Card -->
          <RouterLink 
            to="/WhomIfastfor" 
            class="border border-stone-gray bg-black/30 p-8 hover:border-white transition-colors group"
          >
            <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ PRAYER & FASTING</div>
            <h2 class="text-2xl font-black mb-4 editorial-spacing group-hover:text-white transition-colors">
              WHOM I FAST FOR_
            </h2>
            <p class="text-sm text-gray-300 leading-relaxed mb-6">
              A fasting prayer journal to deepen your spiritual journey and keep regrets at bay. Document your prayers, track your fasts, and build a legacy of faith.
            </p>
            <div class="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-400 transition-colors">
              Learn More →
            </div>
          </RouterLink>

          <!-- Whom I Study For Card -->
          <RouterLink 
            to="/WhomIStudyfor" 
            class="border border-stone-gray bg-black/30 p-8 hover:border-white transition-colors group"
          >
            <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ BIBLE STUDY</div>
            <h2 class="text-2xl font-black mb-4 editorial-spacing group-hover:text-white transition-colors">
              WHOM I STUDY FOR_
            </h2>
            <p class="text-sm text-gray-300 leading-relaxed mb-6">
              A study Bible journal designed to help you dive deeper into Scripture. Record insights, track your reading, and grow in understanding God's Word.
            </p>
            <div class="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-400 transition-colors">
              Learn More →
            </div>
          </RouterLink>

          <!-- Whom Thy Profession Calls For Card -->
          <RouterLink 
            to="/WhomThyProfessionCallsfor" 
            class="border border-stone-gray bg-black/30 p-8 hover:border-white transition-colors group"
          >
            <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ PROFESSIONAL GROWTH</div>
            <h2 class="text-2xl font-black mb-4 editorial-spacing group-hover:text-white transition-colors">
              WHOM THY PROFESSION CALLS FOR_
            </h2>
            <p class="text-sm text-gray-300 leading-relaxed mb-6">
              A note-taking journal for your career and profession. Grasp notes more effectively, organize your studies, and excel in your calling.
            </p>
            <div class="text-xs text-gray-500 uppercase tracking-wide group-hover:text-gray-400 transition-colors">
              Learn More →
            </div>
          </RouterLink>
        </div>

        <div class="mt-16 border-t border-stone-gray pt-12">
          <div class="max-w-3xl mx-auto text-center">
            <p class="text-xs tracking-widest uppercase text-gray-500 mb-4">
              / OUR MISSION
            </p>
            <p class="text-sm text-gray-300 leading-relaxed">
              These journals are designed to help you live with intention, grow in faith, and pursue excellence in every area of life. Whether you're fasting and praying, studying Scripture, or advancing in your profession, these tools will help you document your journey and build a legacy of faithfulness.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
