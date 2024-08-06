import { reactive } from 'vue';

const state = reactive({
  filter: 'All categories',
  sorting: 'default',
});

export function useFilterAndSort() {
  return {
    state,
  };
}