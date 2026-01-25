<template>
  <main class="pt-24">
    <section class="py-20 bg-black border-b border-stone-gray">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-xs tracking-widest mb-4 text-gray-500">/ SUPPORT</div>
        <h1 class="text-4xl md:text-6xl font-black mb-6 editorial-spacing">
          REFUND / REPLACEMENT_
        </h1>
        <p class="text-gray-300 tracking-wide leading-relaxed">
          Defective items only. Use this page to request help with a defective, damaged, or misprinted product.
        </p>
        <p class="text-xs text-gray-500 tracking-wide leading-relaxed mt-6">
          If you purchased via Stripe, you can use your Stripe receipt email to find your order details, then submit
          the request below.
        </p>
      </div>
    </section>

    <section class="py-16 bg-deep-black">
      <div class="max-w-4xl mx-auto px-6 space-y-10">
        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ One option</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            This request is for <span class="font-semibold">defective items only</span>. We’ll review and coordinate the
            best resolution (replacement or refund) after verification.
          </p>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-4">/ Submit a defective item request</div>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <!-- Honeypot (Netlify Forms) -->
            <input v-model="botField" type="text" name="bot-field" class="hidden" tabindex="-1" autocomplete="off" />
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">
                  Email
                </label>
                <input
                  v-model.trim="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div>
                <label class="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">
                  Order / Receipt ID
                </label>
                <input
                  v-model.trim="orderId"
                  type="text"
                  required
                  placeholder="Stripe receipt or order number"
                  class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">
                What’s defective?
              </label>
              <textarea
                v-model.trim="issue"
                required
                rows="5"
                placeholder="Describe the issue (misprint, damaged seam, wrong item, etc.)"
                class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label class="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">
                Photo links (optional)
              </label>
              <textarea
                v-model.trim="photoLinks"
                rows="3"
                placeholder="Paste links to photos (Google Drive, iCloud, Imgur, etc.)"
                class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white transition-colors"
              />
              <div class="text-[10px] text-gray-500 tracking-widest uppercase mt-2">
                Tip: include a clear photo of the defect + the full item.
              </div>
            </div>

            <div>
              <label class="block text-[10px] tracking-widest uppercase text-gray-500 mb-2">
                Upload photos / documents (optional)
              </label>
              <input
                type="file"
                multiple
                name="attachments"
                accept="image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf"
                class="w-full bg-black border border-stone-gray px-4 py-3 text-sm tracking-wide focus:outline-none focus:border-white transition-colors"
                @change="onFilesChange"
              />
              <div class="text-[10px] text-gray-500 tracking-widest uppercase mt-2">
                Accepted: PNG, JPG/JPEG, PDF. Multiple files allowed.
              </div>
              <div v-if="attachments.length" class="mt-3 text-xs text-gray-400">
                <div class="text-[10px] tracking-widest uppercase text-gray-500 mb-2">Selected files</div>
                <ul class="space-y-1">
                  <li v-for="f in attachments" :key="f.name">
                    {{ f.name }} ({{ formatBytes(f.size) }})
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-3 md:items-center">
              <button
                type="submit"
                :disabled="submitting"
                class="px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-wider text-xs font-semibold"
              >
                {{ submitting ? 'Submitting...' : 'Submit request →' }}
              </button>
              <a
                class="text-xs uppercase tracking-wider text-gray-300 hover:text-white underline underline-offset-4"
                href="mailto:support@whom.clothing"
              >
                Or email support@whom.clothing
              </a>
            </div>
          </form>

          <div v-if="generated" class="mt-8 border-t border-stone-gray pt-6 space-y-3">
            <div class="text-xs tracking-widest uppercase text-gray-500">/ Next</div>
            <p v-if="submitStatus === 'success'" class="text-xs text-gray-500 tracking-wide">
              Request submitted.
            </p>
            <p v-else-if="submitStatus === 'error'" class="text-xs text-gray-500 tracking-wide">
              Upload submit failed (this is normal on local dev). Use the email draft below or add photo links above.
            </p>
            <p class="text-sm text-gray-300 leading-relaxed">
              Click the button below to open your email app with the request prefilled.
            </p>
            <div class="flex flex-col md:flex-row gap-3">
              <a
                class="px-6 py-3 border border-stone-gray hover:border-white transition-colors uppercase tracking-wider text-xs font-semibold text-center"
                :href="mailtoUrl"
              >
                Open email draft
              </a>
              <button
                type="button"
                class="px-6 py-3 border border-stone-gray hover:border-white transition-colors uppercase tracking-wider text-xs font-semibold"
                @click="copyBody"
              >
                Copy request text
              </button>
            </div>
            <pre class="mt-4 whitespace-pre-wrap text-xs text-gray-400 border border-stone-gray bg-black/40 p-4">{{ emailBody }}</pre>
            <p v-if="copied" class="text-xs text-gray-500 tracking-wide">Copied.</p>
          </div>
        </div>

        <div class="border border-stone-gray bg-black/30 p-6">
          <div class="text-xs tracking-widest uppercase text-gray-500 mb-2">/ Timing</div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Please contact us within <span class="font-semibold">30 days of delivery</span> and include clear photos.
            Don’t ship anything back until we reply with instructions.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

const email = ref('')
const orderId = ref('')
const issue = ref('')
const photoLinks = ref('')
const attachments = ref([])
const botField = ref('')

const generated = ref(false)
const copied = ref(false)
const submitStatus = ref('idle') // idle | success | error
const submitting = ref(false)

const emailBody = computed(() => {
  const fileLines =
    attachments.value?.length > 0
      ? attachments.value.map(f => `- ${f.name} (${formatBytes(f.size)})`)
      : ['(none)']
  const lines = [
    'Defective Item Request (WHOM.CLOTHING)',
    '',
    `Email: ${email.value || ''}`,
    `Order / Receipt ID: ${orderId.value || ''}`,
    '',
    'Issue:',
    issue.value || '',
    '',
    'Photo links:',
    photoLinks.value || '(none)',
    '',
    'Attachments:',
    ...fileLines
  ]
  return lines.join('\n')
})

const mailtoUrl = computed(() => {
  const subject = `Defective Item Request - ${orderId.value || 'Order'}`
  const to = 'support@whom.clothing'
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    emailBody.value
  )}`
})

function formatBytes(bytes) {
  const n = Number(bytes || 0)
  if (!Number.isFinite(n) || n <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), units.length - 1)
  const val = n / Math.pow(1024, i)
  return `${val.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

const onFilesChange = (e) => {
  const files = e?.target?.files ? Array.from(e.target.files) : []
  attachments.value = files
}

const submitToNetlifyForms = async () => {
  // Netlify Forms requires a matching static form definition (see index.html)
  const formData = new FormData()
  formData.append('form-name', 'defective-item')
  formData.append('bot-field', botField.value || '')
  formData.append('email', email.value || '')
  formData.append('orderId', orderId.value || '')
  formData.append('issue', issue.value || '')
  formData.append('photoLinks', photoLinks.value || '')

  for (const file of attachments.value || []) {
    formData.append('attachments', file)
  }

  const res = await fetch('/', { method: 'POST', body: formData })
  if (!res.ok) throw new Error(`Submit failed (${res.status})`)
}

const onSubmit = async () => {
  generated.value = true
  copied.value = false
  submitStatus.value = 'idle'
  submitting.value = true

  try {
    await submitToNetlifyForms()
    submitStatus.value = 'success'
  } catch {
    submitStatus.value = 'error'
  } finally {
    submitting.value = false
  }
}

const copyBody = async () => {
  try {
    await navigator.clipboard.writeText(emailBody.value)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Clipboard not available; user can still manually copy from the text block.
    copied.value = false
  }
}
</script>

