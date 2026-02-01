<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ JOURNAL</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          WHOM THY PROFESSION CALLS FOR_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          A note-taking journal designed to help you excel in your career and profession through effective study and organization.
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
              Your profession is more than a job—it's a calling. Whether you're a student preparing for exams, a professional pursuing certifications, or someone advancing in your career, effective note-taking is essential to your success. Yet many struggle to capture, organize, and retain the information they need to excel.
            </p>
            <p>
              The "Whom Thy Profession Calls For" journal was created to solve this problem. This isn't just another notebook—it's a systematic approach to learning that helps you grasp notes more effectively, organize your studies, and retain information long-term. When you write with intention, structure your notes properly, and review them consistently, you transform passive learning into active mastery.
            </p>
            <p>
              Every lecture you attend, every book you read, every training session you complete becomes more valuable when you document it well. This journal helps you create a comprehensive knowledge base for your profession, building your expertise one note at a time. It's designed to help you not just pass tests or complete courses, but to truly understand and apply what you're learning.
            </p>
            <p class="text-white font-medium">
              This journal is your companion in the journey toward professional excellence, helping you honor God through your work by being the best you can be in your calling.
            </p>
          </div>
        </div>

        <!-- How It Works -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ HOW IT WORKS</div>
          <div class="space-y-6">
            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">1. Prepare & Set Goals</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Before each study session, lecture, or training, write down what you're learning about and what you hope to gain. Set clear objectives for your note-taking session. This preparation helps you stay focused and capture the most important information.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">2. Capture Key Information</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                During your study time, write down main concepts, definitions, examples, and important details. Use structured formats like outlines, mind maps, or the Cornell method. Focus on understanding, not just copying—write in your own words when possible.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">3. Organize & Structure</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                After capturing information, organize your notes with clear headings, bullet points, and visual hierarchy. Create connections between related concepts. Use the journal's structure to separate different topics, courses, or study sessions for easy reference later.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">4. Review & Summarize</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Regularly review your notes and write summaries of key concepts. Create study guides, flashcards, or concept maps from your notes. This active review process helps transfer information from short-term to long-term memory and deepens your understanding.
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-lg font-bold text-white uppercase tracking-wide">5. Apply & Excel</h3>
              <p class="text-sm text-gray-300 leading-relaxed">
                Use your organized notes to prepare for exams, complete assignments, and excel in your profession. Your journal becomes a comprehensive reference library for your career. Over time, you'll build expertise and confidence in your field, honoring God through excellence in your work.
              </p>
            </div>
          </div>
        </div>

        <!-- Benefits -->
        <div class="border border-stone-gray bg-black/30 p-8">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ WHY IT MATTERS</div>
          <ul class="space-y-3 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> <strong class="text-white">Improves Retention:</strong> Writing notes by hand and organizing them systematically helps you remember information much better than passive reading or typing.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Builds Knowledge Base:</strong> Your journal becomes a comprehensive reference library for your profession, accessible whenever you need to review or apply what you've learned.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Enhances Understanding:</strong> The process of organizing and summarizing notes helps you truly grasp concepts rather than just memorizing facts.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Increases Confidence:</strong> Well-organized notes give you confidence in exams, presentations, and professional situations because you know you've prepared thoroughly.</li>
            <li><span class="text-gray-500">-</span> <strong class="text-white">Honors Your Calling:</strong> Excellence in your profession honors God and serves others well. This journal helps you pursue that excellence through effective learning and organization.</li>
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
