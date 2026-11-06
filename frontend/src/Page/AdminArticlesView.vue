<template>
  <div class="flex flex-col space-y-8">
    
    <!-- Top Bar -->
    <header class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-200 pb-5">
      <div>
        <h1 class="text-3xl font-extrabold text-[#1E293B] tracking-tight">{{ $t('admin.articles.title') }}</h1>
        <p class="text-sm text-gray-500">{{ $t('admin.articles.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-400 font-mono">{{ $t('admin.articles.date', { date: currentDate }) }}</span>
      </div>
    </header>

    <!-- Articles Manager -->
    <section class="bg-white rounded-3xl border border-gray-150 shadow-sm p-6 flex flex-col space-y-6">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 class="text-xl font-extrabold text-[#1E293B]">{{ $t('admin.articles.sectionTitle') }}</h2>
          <p class="text-xs text-gray-500">{{ $t('admin.articles.sectionDesc') }}</p>
        </div>
        <!-- Write New Article Button -->
        <button
          type="button"
          @click="openArticleEditor(null)"
          class="px-5 py-2 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl text-xs font-semibold shadow-sm hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {{ $t('admin.articles.createNew') }}
        </button>
      </div>

      <p v-if="articlesLoadError" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {{ articlesLoadError }}
      </p>

      <!-- Empty state -->
      <div v-else-if="mockArticles.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-400">
        <svg class="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p class="text-sm font-semibold">{{ $t('admin.articles.emptyTitle') }}</p>
        <p class="text-xs mt-1">{{ $t('admin.articles.emptyHint') }}</p>
      </div>

      <!-- Article Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="article in mockArticles"
          :key="article.id"
          class="group p-5 border border-gray-150 rounded-2xl flex flex-col justify-between hover:shadow-lg hover:border-[#0D9488]/20 transition-all duration-300"
        >
          <div>
            <div class="flex justify-between items-center mb-3">
              <span
                :class="categoryColor(article.category)"
                class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
              >
                {{ categoryLabel(article.category) }}
              </span>
              <span class="text-[10px] text-gray-400 font-mono">{{ formatArticleDate(article.createdAt) }}</span>
            </div>
            <h3 class="font-bold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-[#0D9488] transition">{{ article.title }}</h3>
            <p class="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">{{ article.excerpt || article.content }}</p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <span class="text-[10px] text-gray-400">{{ $t('admin.articles.byAdmin', { id: article.createdById }) }}</span>
            <div class="flex gap-2">
              <button type="button" @click.stop="openArticleEditor(article)" class="text-xs text-[#0D9488] font-bold hover:underline cursor-pointer">{{ $t('admin.articles.edit') }}</button>
              <button type="button" @click.stop="deleteArticle(article.id)" class="text-xs text-rose-600 font-bold hover:underline cursor-pointer">{{ $t('admin.articles.delete') }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== Article Editor Modal ========== -->
    <Transition name="modal">
      <div v-if="isArticleEditorOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeArticleEditor"></div>

        <!-- Modal Panel -->
        <div class="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-[#045F54] to-[#0D9488] px-6 py-5 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-extrabold text-white">
                {{ editingArticle?.id ? $t('admin.articles.modalEdit') : $t('admin.articles.modalCreate') }}
              </h3>
              <p class="text-xs text-[#D1FAE5] mt-0.5">{{ $t('admin.articles.modalSubtitle') }}</p>
            </div>
            <button @click="closeArticleEditor" class="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Modal Body (scrollable) -->
          <div class="overflow-y-auto p-6 space-y-5 flex-1">

            <!-- Title -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldTitle') }} <span class="text-rose-500">*</span></label>
              <input
                v-model="articleForm.title"
                type="text"
                :placeholder="$t('admin.articles.titlePlaceholder')"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition"
              />
              <p v-if="formErrors.title" class="text-xs text-rose-500 mt-1">{{ formErrors.title }}</p>
            </div>

            <!-- Category + Source row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldCategory') }} <span class="text-rose-500">*</span></label>
                <select
                  v-model="articleForm.category"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition bg-white"
                >
                  <option value="">{{ $t('admin.articles.selectCategory') }}</option>
                  <option value="STRESS">{{ $t('admin.articles.catStress') }}</option>
                  <option value="DEPRESSION">{{ $t('admin.articles.catDepression') }}</option>
                  <option value="ANXIETY">{{ $t('admin.articles.catAnxiety') }}</option>
                  <option value="SELF-CARE">{{ $t('admin.articles.catSelfCare') }}</option>
                  <option value="EMERGENCY">{{ $t('admin.articles.catEmergency') }}</option>
                  <option value="MINDFULNESS">{{ $t('admin.articles.catMindfulness') }}</option>
                </select>
                <p v-if="formErrors.category" class="text-xs text-rose-500 mt-1">{{ formErrors.category }}</p>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldSource') }}</label>
                <input
                  v-model="articleForm.sourceName"
                  type="text"
                  :placeholder="$t('admin.articles.sourcePlaceholder')"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition"
                />
              </div>
            </div>

            <!-- Excerpt -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldExcerpt') }}</label>
              <textarea
                v-model="articleForm.excerpt"
                rows="2"
                :placeholder="$t('admin.articles.excerptPlaceholder')"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition resize-none"
              ></textarea>
            </div>

            <!-- Content -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldContent') }} <span class="text-rose-500">*</span></label>
              <textarea
                v-model="articleForm.content"
                rows="8"
                :placeholder="$t('admin.articles.contentPlaceholder')"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition resize-y"
              ></textarea>
              <p v-if="formErrors.content" class="text-xs text-rose-500 mt-1">{{ formErrors.content }}</p>
            </div>

           <!-- Cover Image Upload (เลือกรูปจากเครื่อง) -->
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldCover') }}</label>
              <div class="flex items-center gap-4">
                <!-- ปุ่มเลือกไฟล์ (ซ่อน input file แท้ไว้ด้านใน) -->
                <label class="cursor-pointer inline-flex items-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-100 hover:border-[#0D9488] hover:text-[#0D9488] transition-all">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {{ $t('admin.articles.chooseImage') }}
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleCoverImageUpload"
                  />
                </label>
                
                <!-- แสดงพรีวิวรูปภาพที่เลือก -->
                <div v-if="articleForm.coverImageUrl" class="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img :src="articleForm.coverImageUrl" class="w-full h-full object-cover" :alt="$t('admin.articles.coverPreview')" />
                  <!-- ปุ่มกากบาทสำหรับลบรูป -->
                  <button type="button" @click="articleForm.coverImageUrl = ''" class="absolute top-0 right-0 bg-rose-500 text-white w-4 h-4 flex items-center justify-center rounded-bl cursor-pointer hover:bg-rose-600 transition" :title="$t('admin.articles.removeImage')">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <span v-else class="text-xs text-gray-400">{{ $t('admin.articles.noFile') }}</span>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{{ $t('admin.articles.fieldSourceUrl') }}</label>
              <input
                v-model="articleForm.sourceUrl"
                type="url"
                placeholder="https://example.com/article"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488] transition"
              />
            </div>

            <!-- Preview card -->
            <div v-if="articleForm.title || articleForm.content" class="border border-dashed border-[#0D9488]/30 rounded-2xl p-4 bg-[#F0FDF9]">
              <p class="text-xs font-bold text-[#0D9488] mb-2 uppercase tracking-wider">{{ $t('admin.articles.previewLabel') }}</p>
              <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div class="flex items-center gap-2 mb-2">
                  <span v-if="articleForm.category" :class="categoryColor(articleForm.category)" class="px-2 py-0.5 rounded-full text-[10px] font-bold border">
                    {{ categoryLabel(articleForm.category) }}
                  </span>
                  <span class="text-[10px] text-gray-400">{{ todayDateFormatted }}</span>
                </div>
                <p class="font-bold text-sm text-gray-800 line-clamp-2">{{ articleForm.title || $t('admin.articles.previewTitle') }}</p>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ articleForm.excerpt || articleForm.content || $t('admin.articles.previewContent') }}</p>
              </div>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <p class="text-xs text-gray-400">{{ $t('admin.articles.requiredNoteBefore') }} <span class="text-rose-500 font-bold">*</span> {{ $t('admin.articles.requiredNoteAfter') }}</p>
            <div class="flex gap-3">
              <button
                @click="closeArticleEditor"
                class="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-100 transition cursor-pointer"
              >
                {{ $t('admin.users.cancel') }}
              </button>
              <button
                @click="saveArticle"
                class="px-6 py-2.5 bg-gradient-to-r from-[#045F54] to-[#0D9488] text-white rounded-xl text-sm font-bold hover:opacity-90 transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ editingArticle?.id ? $t('admin.articles.saveEdit') : $t('admin.articles.publish') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirm Modal -->
    <Transition name="modal">
      <div v-if="isDeleteConfirmOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50" @click="isDeleteConfirmOpen = false"></div>
        <div class="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
          <div class="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
          <h3 class="text-lg font-extrabold text-gray-800 mb-2">{{ $t('admin.articles.deleteConfirmTitle') }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ $t('admin.articles.deleteConfirmDesc') }}</p>
          <div class="flex gap-3">
            <button @click="isDeleteConfirmOpen = false" class="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition cursor-pointer">
              {{ $t('admin.users.cancel') }}
            </button>
            <button @click="executeDeleteArticle" class="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition shadow-md cursor-pointer">
              {{ $t('admin.articles.deleteConfirm') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { dateLocale } from '../i18n'
import { ref, computed, inject, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const triggerSuccessToast = inject('triggerSuccessToast')

const API_URL = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'https://dmhab-chatbot-web.onrender.com');

// Formatting date
const currentDate = computed(() => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString(dateLocale(), options)
})

const todayDateFormatted = computed(() => {
  return new Date().toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', year: 'numeric' })
})

// Articles management (เชื่อมต่อฐานข้อมูลจริงด้วย fetch API)
const mockArticles = ref([])
const articlesLoadError = ref('')

function formatArticleDate(dateValue) {
  if (!dateValue) return t('admin.articles.noDate')
  return new Date(dateValue).toLocaleDateString(dateLocale(), {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// 2. ฟังก์ชันดึงบทความจาก Backend (GET)
const fetchAdminArticles = async () => {
  try {
    articlesLoadError.value = ''
    const response = await fetch(`${API_URL}/api/articles`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch articles (${response.status})`);
    }
    const data = await response.json();
    mockArticles.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error loading articles:', error);
    articlesLoadError.value = error.message || t('admin.articles.errLoad');
  }
};

// สั่งให้โหลดข้อมูลทันทีที่เปิดหน้า
onMounted(() => {
  fetchAdminArticles();
})

// ==================== Article Editor ====================
const isArticleEditorOpen = ref(false)
const editingArticle = ref(null)
const articleForm = ref({ title: '', category: '', excerpt: '', content: '', sourceName: '', coverImageUrl: '', sourceUrl: '' })
const formErrors = ref({})

// Article delete confirm
const isDeleteConfirmOpen = ref(false)
const articleToDeleteId = ref(null)

function openArticleEditor(article) {
  editingArticle.value = article ? { ...article } : null
  formErrors.value = {}
  if (article) {
    articleForm.value = {
      title: article.title || '',
      category: article.category || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      sourceName: article.sourceName || '',
      coverImageUrl: article.coverImageUrl || '',
      sourceUrl: article.sourceUrl || ''
    }
  } else {
    articleForm.value = { title: '', category: '', excerpt: '', content: '', sourceName: '', coverImageUrl: '', sourceUrl: '' }
  }
  isArticleEditorOpen.value = true
}

function closeArticleEditor() {
  isArticleEditorOpen.value = false
  editingArticle.value = null
  formErrors.value = {}
}

function validateArticleForm() {
  const errors = {}
  if (!articleForm.value.title.trim()) errors.title = t('admin.articles.errTitle')
  if (!articleForm.value.category) errors.category = t('admin.articles.errCategory')
  if (!articleForm.value.content.trim()) errors.content = t('admin.articles.errContent')
  formErrors.value = errors
  return Object.keys(errors).length === 0
}

// 3. ฟังก์ชันบันทึกบทความ (POST สำหรับสร้างใหม่ / PUT สำหรับแก้ไข) ด้วย fetch API
async function saveArticle() {
  if (!validateArticleForm()) return

  try {
    const payload = {
      title: articleForm.value.title,
      category: articleForm.value.category,
      excerpt: articleForm.value.excerpt,
      content: articleForm.value.content,
      sourceName: articleForm.value.sourceName,
      coverImageUrl: articleForm.value.coverImageUrl,
      sourceUrl: articleForm.value.sourceUrl,
    }

    const isEdit = !!editingArticle.value?.id;
    const url = isEdit ? `${API_URL}/api/articles/${editingArticle.value.id}` : `${API_URL}/api/articles`;
    const method = isEdit ? 'PUT' : 'POST';

    // ดึง Token มาแนบไปด้วยเผื่อ Backend ล็อกป้องกันไว้
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to save article (${response.status})`);
    }

    closeArticleEditor();
    triggerSuccessToast(isEdit ? t('admin.articles.toastEdited') : t('admin.articles.toastCreated'));
    await fetchAdminArticles();
  } catch (error) {
    console.error("Error saving article:", error);
    alert(error.message || t('admin.articles.errSave'));
  }
}

function confirmDeleteArticle(id) {
  articleToDeleteId.value = id
  isDeleteConfirmOpen.value = true
}

// 4. ฟังก์ชันลบบทความ (DELETE) ด้วย fetch API
async function executeDeleteArticle() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/articles/${articleToDeleteId.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to delete article (${response.status})`);
    }

    isDeleteConfirmOpen.value = false
    articleToDeleteId.value = null
    triggerSuccessToast(t('admin.articles.toastDeleted'))
    await fetchAdminArticles();
  } catch (error) {
    console.error("Error deleting article:", error);
    alert(error.message || t('admin.articles.errDelete'));
  }
}

// Legacy deleteArticle kept for safety
const deleteArticle = (id) => confirmDeleteArticle(id)

// Category badge color helper
function categoryColor(cat) {
  const map = {
    STRESS: 'bg-amber-50 text-amber-600 border-amber-200',
    DEPRESSION: 'bg-blue-50 text-blue-600 border-blue-200',
    ANXIETY: 'bg-purple-50 text-purple-600 border-purple-200',
    'SELF-CARE': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    EMERGENCY: 'bg-rose-50 text-rose-600 border-rose-200',
    MINDFULNESS: 'bg-teal-50 text-teal-600 border-teal-200',
  }
  return map[cat] || 'bg-gray-100 text-gray-600 border-gray-200'
}

// Category label Thai helper
function categoryLabel(cat) {
  const map = {
    STRESS: t('admin.articles.catStress'),
    DEPRESSION: t('admin.articles.catDepression'),
    ANXIETY: t('admin.articles.catAnxiety'),
    'SELF-CARE': t('admin.articles.catSelfCare'),
    EMERGENCY: t('admin.articles.catEmergency'),
    MINDFULNESS: t('admin.articles.catMindfulness'),
  }
  return map[cat] || cat
}
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
