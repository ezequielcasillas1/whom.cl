<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ POLICY</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          RETURN POLICY_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          Print-on-demand items are made to order. We accept returns for defective items only.
        </p>
      </div>
    </section>

    <section class="py-16 bg-deep-black">
      <div class="max-w-4xl mx-auto px-6 space-y-10">
        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Need help?</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            For defective items, submit a request here:
            <RouterLink class="underline underline-offset-4 hover:text-white" to="/refunds">
              Refund / Replacement
            </RouterLink>
          </p>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Returns</div>
          <ul class="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> Returns are accepted for <span class="font-semibold">defective, damaged, or misprinted</span> items only.</li>
            <li><span class="text-gray-500">-</span> We do not accept returns or exchanges for <span class="font-semibold">buyer’s remorse</span>, including incorrect size selection.</li>
          </ul>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Exchanges</div>
          <ul class="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> We do not offer standard exchanges (size/color swaps).</li>
            <li><span class="text-gray-500">-</span> For confirmed defects, we will coordinate a <span class="font-semibold">replacement</span> at no cost.</li>
          </ul>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Reporting an issue</div>
          <ul class="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> Contact us within <span class="font-semibold">30 days of delivery</span>.</li>
            <li><span class="text-gray-500">-</span> Include your order number and clear photos of the issue.</li>
            <li><span class="text-gray-500">-</span> Email: <a class="underline underline-offset-4 hover:text-white" href="mailto:support@whom.clothing">support@whom.clothing</a></li>
          </ul>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Return address</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Do not send returns without first contacting us. If a return is approved, we will provide return instructions.
          </p>
          <p class="text-sm text-gray-400 leading-relaxed mt-4">
            WHOM.CLOTHING<br />
            2915 Old Ogletown Road<br />
            Newark, DE 19713<br />
            United States
          </p>
        </div>

        <div class="text-xs text-gray-500 tracking-wide leading-relaxed">
          This policy is provided to help customers understand how returns are handled for print-on-demand products.
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

