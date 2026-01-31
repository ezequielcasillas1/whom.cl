<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ POLICY</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          TERMS OF SALE_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          Terms and conditions governing your purchase from WHOM.CLOTHING.
        </p>
      </div>
    </section>

    <section class="py-16 bg-deep-black">
      <div class="max-w-4xl mx-auto px-6 space-y-10">
        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Acceptance of terms</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            By placing an order, you agree to these Terms of Sale. If you do not agree, please do not make a purchase.
          </p>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Products</div>
          <ul class="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> All products are made-to-order through print-on-demand</li>
            <li><span class="text-gray-500">-</span> Product images are for illustration; actual colors may vary</li>
            <li><span class="text-gray-500">-</span> We reserve the right to refuse or cancel any order</li>
          </ul>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Pricing</div>
          <ul class="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> All prices are in USD unless otherwise stated</li>
            <li><span class="text-gray-500">-</span> Prices are subject to change without notice</li>
            <li><span class="text-gray-500">-</span> You will be charged the price displayed at checkout</li>
          </ul>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Payment</div>
          <ul class="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li><span class="text-gray-500">-</span> Payment is processed securely through Stripe</li>
            <li><span class="text-gray-500">-</span> We accept major credit cards and debit cards</li>
            <li><span class="text-gray-500">-</span> Payment must be received before order processing</li>
          </ul>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Returns and refunds</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Returns are accepted for defective items only. See our <RouterLink class="underline underline-offset-4 hover:text-white" to="/return-policy">Return Policy</RouterLink> for details.
          </p>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Intellectual property</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            All designs, logos, and content are the property of WHOM.CLOTHING and are protected by copyright. Unauthorized use is prohibited.
          </p>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Limitation of liability</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            WHOM.CLOTHING is not liable for any indirect, incidental, or consequential damages arising from your purchase or use of our products.
          </p>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Contact</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Questions about these terms? Contact us at <a class="underline underline-offset-4 hover:text-white" href="mailto:support@whom.clothing">support@whom.clothing</a>
          </p>
        </div>

        <div class="text-xs text-gray-500 tracking-wide leading-relaxed">
          Last updated: January 2026. These terms may be updated from time to time.
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
