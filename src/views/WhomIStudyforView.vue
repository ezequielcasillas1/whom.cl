<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ JOURNAL</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          WHOM I STUDY FOR_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          A study Bible journal to deepen your understanding of Scripture and grow in wisdom.
        </p>
      </div>
    </section>

    <section class="py-16 bg-deep-black">
      <div class="max-w-4xl mx-auto px-6 space-y-12">
        <!-- The Story -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ THE STORY</div>
          <div class="space-y-4 text-sm text-gray-300 leading-relaxed">
            <p>
              The Bible is more than a book—it's God's living Word, meant to transform our hearts and minds. Yet in our busy lives, it's easy to read Scripture without truly studying it, to skim passages without diving deep into their meaning. The "Whom I Study For" journal was created to change that.
            </p>
            <p>
              This journal isn't just about reading the Bible; it's about engaging with it. When you write down what you're learning, record your questions, and document how God's Word is speaking to you, something powerful happens. You move from passive reading to active study. You begin to see connections, understand context, and apply Scripture to your life in meaningful ways.
            </p>
            <p>
              Every passage you study, every insight you record, every verse that speaks to your heart becomes part of your spiritual foundation. This journal helps you build that foundation systematically, creating a record of your growth in understanding God's truth and your relationship with Him.
            </p>
            <p class="text-white font-medium">
              This journal is your companion in the journey toward deeper biblical knowledge, spiritual maturity, and a life transformed by God's Word.
            </p>
          </div>
        </div>

        <!-- How It Works -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ HOW IT WORKS</div>
          <div class="space-y-6">
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">1. Choose Your Passage</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Select a book, chapter, or specific passage you want to study. Write down the reference and date you're beginning your study. This creates intention and helps you stay focused on your reading plan.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">2. Read & Observe</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Read the passage carefully, multiple times if needed. Write down what you observe: key words, repeated phrases, the context, who's speaking, and what's happening. Observation is the foundation of good Bible study.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">3. Interpret & Understand</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Record your questions, insights, and what you're learning about the meaning of the text. Note cross-references, historical context, and how this passage connects to other parts of Scripture. Write down what God is teaching you.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">4. Apply & Reflect</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Document how this passage applies to your life. What does God want you to do with what you've learned? How does this change your perspective or actions? Write down your commitments and prayers based on your study.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">5. Track Your Growth</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Over time, your journal becomes a record of your spiritual growth. You'll see how your understanding deepens, how God speaks to you through His Word, and how Scripture transforms your life. This record encourages you to continue studying and growing.
              </p>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ WHY IT MATTERS</div>
          <ul class="space-y-3 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> <strong class="text-white">Deepens Understanding:</strong> Writing down what you learn helps you process and retain biblical truth more effectively than passive reading alone.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Creates Accountability:</strong> A journal helps you stay consistent in your Bible study and track your progress through Scripture.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Builds Spiritual Foundation:</strong> Your recorded insights become a reference library of what God has taught you, strengthening your faith and knowledge.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Encourages Application:</strong> Writing down how Scripture applies to your life helps you actually live out what you're learning.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Preserves Your Journey:</strong> Your journal becomes a testimony of God's faithfulness in teaching and transforming you through His Word.</li>
          </ul>
        </div>

        <div class="text-xs text-gray-500 tracking-wide leading-relaxed text-center pt-8">
          <RouterLink to="/christian-journals" class="hover:text-white transition-colors underline underline-offset-4">
            ← Back to Christian Journals
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
