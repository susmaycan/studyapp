<script setup lang="ts">
const props = defineProps<{
  set: ISet
}>()

const emits = defineEmits(['refresh'])

const router = useRouter()
const { isAuthenticated } = useAuth()

const startGame = () => {
  router.push(`/game/${props.set?.id}`)
}

const emptyTermsLength = computed(() => props.set.terms.length === 0)

const tabs = [
  {
    key: 'terms',
    label: 'Terms',
  },
  {
    key: 'stats',
    label: 'Stats',
  },
]
</script>
<template>
  <div>
    <div class="flex flex-col text-center items-center mb-3">
      <s-title>{{ set?.name }}</s-title>
      <p class="my-2">{{ set?.description }}</p>
      <set-image
        v-if="set.picture"
        class="mb-3"
        :url="set.picture"
        :width="17"
        :height="17"
        :alt="`Picture of set ${set.name}`"
      />
      <s-button
        icon="i-heroicons-play-circle"
        :is-disabled="emptyTermsLength"
        @click="startGame"
      >
        Practice
      </s-button>
    </div>
    <div>
      <p v-if="emptyTermsLength">No terms in this set.</p>
      <div v-else class="flex flex-col text-center items-center">
        <u-tabs :items="tabs" class="w-full">
          <template #item="{ item }">
            <div v-if="item.key === 'terms'" class="space-y-3">
              <div class="flex justify-center flex-wrap">
                <term-card-all
                  v-for="term in set.terms"
                  :key="term.id"
                  :term="term"
                  can-edit
                  @refresh="emits('refresh')"
                />
              </div>
            </div>
            <div v-if="item.key === 'stats'" class="space-y-3">
              <div
                class="flex justify-center flex-wrap gap-4"
                v-if="isAuthenticated"
              >
                <term-stat-card
                  v-for="term in set.terms"
                  :key="term.id"
                  :term="term"
                />
              </div>
              <div class="my-4">
                Stats only available for authenticated users.
              </div>
            </div>
          </template>
        </u-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
