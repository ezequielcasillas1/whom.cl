<template>
  <footer class="bg-black border-t border-stone-gray">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid md:grid-cols-3 gap-16 mb-16">
        <!-- Brand Section -->
        <div>
          <h3 class="text-2xl font-black mb-6 editorial-spacing">
            WHOM.CLOTHING_®
          </h3>
          <p class="text-sm text-gray-400 leading-relaxed mb-6">
            2915 OLD OGLETOWN ROAD,
            <br />
            NEWARK, DELAWARE 19713, UNITED STATES
          </p>
        </div>
        
        <!-- Information Links -->
        <div>
          <h4 class="text-xs tracking-widest uppercase mb-6 text-gray-500">
            INFORMATION
          </h4>
          <ul class="space-y-3 text-sm">
            <li>
              <a href="#blog" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Blog
              </a>
            </li>
            <li>
              <RouterLink to="/terms-of-sale" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Terms of Sale
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/return-policy" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Return Policy
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/shipping-policy" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Shipping Policy
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/refunds" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Refund / Replacement
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/privacy-policy" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Privacy Policy
              </RouterLink>
            </li>
          </ul>
        </div>
        
        <!-- Social Media -->
        <div>
          <h4 class="text-xs tracking-widest uppercase mb-6 text-gray-500">
            SOCIAL MEDIA
          </h4>
          <ul class="space-y-3 text-sm">
            <li>
              <a href="#instagram" class="text-gray-300 hover:text-white transition-colors uppercase tracking-wide">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div class="border-t border-stone-gray pt-16 mb-16">
        <div class="max-w-2xl">
          <h4 class="text-xs tracking-widest uppercase mb-6 text-gray-500">
            JOIN OUR MAILING LIST TO BE IN THE KNOW ABOUT NEW RELEASES, EXCLUSIVE EVENTS AND MORE.
          </h4>
          <div class="flex">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              class="flex-1 bg-transparent border border-stone-gray px-6 py-4 text-sm tracking-wide uppercase focus:outline-none focus:border-white transition-colors"
            />
            <button class="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors text-sm tracking-widest uppercase font-semibold">
              →
            </button>
          </div>
        </div>
      </div>
      
      <!-- Biblical Foundation -->
      <div class="border-t border-stone-gray pt-16 mb-12">
        <div class="text-center max-w-3xl mx-auto">
          <p class="text-xs tracking-widest uppercase text-gray-500 mb-4">
            / FOUNDED ON SCRIPTURE
          </p>
          <blockquote class="text-lg md:text-xl text-gray-300 italic leading-relaxed mb-4">
            "But whom do you say that I am?"
          </blockquote>
          <p class="text-xs text-gray-500">
            — Matthew 16:15 (NKJV)
          </p>
        </div>
      </div>
      
      <!-- Key Verses -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="text-center">
          <p class="text-xs text-gray-400 italic mb-2">
            "This is My beloved Son, in whom I am well pleased."
          </p>
          <p class="text-xs text-gray-600">Matthew 3:17</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-400 italic mb-2">
            "That you believe in Him whom He sent."
          </p>
          <p class="text-xs text-gray-600">John 6:29</p>
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-400 italic mb-2">
            "In whom we have redemption through His blood."
          </p>
          <p class="text-xs text-gray-600">Colossians 1:14</p>
        </div>
      </div>
    </div>
    
    <!-- Bottom Bar -->
    <div class="border-t border-stone-gray">
      <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p class="mb-4 md:mb-0">
          © {{ currentYear }} WHOM.CLOTHING_® ALL RIGHTS RESERVED
        </p>
        <p class="tracking-widest">
          DESIGNED FOR BELIEVERS WHO WALK WITH PURPOSE
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const currentYear = ref(new Date().getFullYear())
</script>


