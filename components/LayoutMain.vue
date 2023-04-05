<template>
    <div class="absolute top-0 right-0 bottom-0 left-0 flex">
        <aside class="relative flex flex-col w-full lg:max-w-lg lg:bg-slate-800">
            <slot name="menu" />

            <div class="relative z-10 py-6 px-4 lg:px-8">
                <slot name="head" />
            </div>

            <div class="relative z-10 grow px-4 lg:px-8 overflow-auto scrollbar-hide">
                <slot name="list" />
                <!-- <slot name="slider" /> -->
            </div>

            <div class="relative z-10 py-6 px-4 lg:px-8">
                <slot name="range" />
            </div>
        </aside>

        <main class="z-0 absolute w-full h-full lg:relative">
            <slot name="main" />
        </main>
    </div>
</template>
