<template>
    <div class="flex h-screen">
        <aside class="relative flex flex-col w-full max-w-lg bg-slate-800">
            <slot name="menu" />

            <div class="py-6 px-8">
                <slot name="head" />
            </div>

            <div class="grow px-8 overflow-auto">
                <slot name="list" />
                <!-- <slot name="slider" /> -->
            </div>

            <div class="py-6 px-8">
                <slot name="range" />
            </div>
        </aside>
        <main class="relative w-full">
            <slot name="main" />
        </main>
    </div>
</template>
