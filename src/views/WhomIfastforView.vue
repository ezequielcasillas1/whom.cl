<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ JOURNAL</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          WHOM I FAST FOR_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          A fasting prayer journal to deepen your spiritual journey and keep regrets at bay.
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
              In a world filled with distractions and regrets, finding moments of clarity and connection with God can feel impossible. The "Whom I Fast For" prayer journal was born from a simple truth: when we fast and pray with intention, we create space for God to move in our lives and in the lives of those we love.
            </p>
            <p>
              This journal isn't just about recording prayers—it's about transformation. Each entry becomes a testament to your commitment, a reminder of who you're interceding for, and a record of God's faithfulness. By documenting your fasting journey, you're not just keeping track of days; you're building a legacy of faith that keeps regrets at bay and draws you closer to the heart of God.
            </p>
            <p>
              When we write down our prayers, our reasons for fasting, and the people we're lifting up, something powerful happens. We move from passive hope to active faith. We create accountability for ourselves and a testimony for others. Most importantly, we make space for God to work in ways we never imagined.
            </p>
            <p class="text-white font-medium">
              This journal is your companion in the journey toward spiritual growth, deeper relationships, and a life lived without the weight of "what if" and "I wish I had."
            </p>
          </div>
        </div>

        <!-- How It Works -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ HOW IT WORKS</div>
          <div class="space-y-6">
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">1. Set Your Intention</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Before you begin fasting, write down who you're fasting for and why. Be specific about your prayer requests and the spiritual breakthrough you're seeking. This clarity anchors your fast and gives purpose to each day.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">2. Daily Prayer Entries</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Each day of your fast, take time to write your prayers, reflections, and any insights God reveals. Use the journal to track your spiritual state, physical well-being, and the progress you're seeing in your prayer requests.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">3. Scripture & Reflection</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Record verses that speak to you during your fast. Write down what God is teaching you and how your perspective is shifting. These moments of revelation become markers of your spiritual growth.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">4. Track God's Faithfulness</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                As you complete your fast, document answered prayers, breakthroughs, and moments of divine intervention. This record serves as a powerful reminder of God's faithfulness and encourages you in future seasons of fasting and prayer.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">5. Build Your Legacy</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Over time, your journal becomes a testament to your faith journey. It's proof that you didn't just hope for change—you actively sought God's intervention through fasting and prayer. This legacy keeps regrets away because you'll know you did everything you could, with faith and intention.
              </p>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ WHY IT MATTERS</div>
          <ul class="space-y-3 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> <strong class="text-white">Keeps Regrets Away:</strong> When you've documented your prayers and fasting, you'll never wonder "Did I do enough?" You'll have a record of your faithfulness.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Deepens Spiritual Connection:</strong> Writing down your prayers and reflections creates space for God to speak and for you to listen more intentionally.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Creates Accountability:</strong> A journal holds you accountable to your commitment and helps you stay focused on your purpose.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Builds Faith:</strong> Looking back at answered prayers and God's faithfulness strengthens your faith for future challenges.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Preserves Testimonies:</strong> Your journal becomes a collection of testimonies that can encourage others and remind you of God's work in your life.</li>
          </ul>
        </div>

        <!-- Coming Soon: Mobile Apps -->
        <div class="border border-stone-gray bg-black/30 p-8 text-center">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-3">/ COMING SOON</div>
          <p class="text-gray-300 text-sm leading-relaxed">
            We are developing iOS and Android apps for users. Stay tuned.
          </p>
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
