<script setup>
    import { useMediaQuery } from '@vueuse/core'

    const menu = ref(false);

    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    const select = (city) => {
        console.log(city);
    }

    const isLargeScreen = useMediaQuery('(min-width: 1024px)')
</script>

<template>
    <div class="flex flex-col h-screen">
        <div class="grow flex flex-col">
            <div class="flex py-4 px-4">
                <div class="text-base text-white mr-auto">Edit</div>
                <div class="text-base text-white" @click="menu = true">Add</div>
            </div>

            <div class="grow relative">
                <div class="absolute top-0 left-0 right-0 bottom-0 overflow-auto scrollbar-hide">
                    <div class="grid grid-cols-1 gap-4 px-4 pb-4">
                        <div v-for="index of 30" :key="index" class="flex flex-col bg-slate-200/80 backdrop-blur rounded-lg p-2">
                            <!-- <div class="w-full aspect-square border rounded-full mb-2"></div> -->

                            <div class="text-center text-base text-black">
                                {{ 'Kyiv' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <select-menu
                :options="options"
                :relative="isLargeScreen"
                :show="isLargeScreen || menu"
                class="h-full"
                @close="menu = false"
                @select="select"
            />
        </div>

        <ui-navigation />
    </div>
</template>
