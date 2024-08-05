<template>
    <div
      @click="handleClick"
      class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
    >
      <img class="object-contain h-48 mt-3" :src="product.image" alt="Product Image" />
  
      <div class="flex-1 flex flex-col p-6">
        <div class="flex-1">
          <header class="mb-2 flex-2">
            <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
              <div class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300">
                {{ product.title }}
              </div>
            </h2>
          </header>
          <Ratings :rate="product.rating.rate" :count="product.rating.count" />
          <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
            <h2>${{ product.price }}</h2>
          </div>
        </div>
  
        <div class="flex mt-1 space-x-2">
          <div class="justify-start flex-1">
            <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {{ product.category }}
            </span>
          </div>
          <div class="justify-end space-x-2">
            <button @click.stop="addToFavourites">
              <svg
                class="me-1.5 h-5 w-5 hover:fill-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                transform="scale(1.6)"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            </button>
  
            <button class="inline-flex justify-center whitespace-nowrap rounded-lg bg-cyan-700 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import Ratings from '@/components/RatingsComponent.vue';
  
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    components: {
      Ratings,
    },
    setup(props) {
      const router = useRouter();
  
      const handleClick = () => {
        router.push({ name: 'ProductDetail', params: { id: props.product.id } });
      };
  
      const addToFavourites = (event) => {
        event.stopPropagation();
        // Add to favorites logic
      };
  
      return {
        handleClick,
        addToFavourites,
      };
    },
  };
  </script>
  