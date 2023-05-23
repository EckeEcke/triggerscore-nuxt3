<template>
    <footer class="w-full h-72 lg:h-64 py-2 bg-red-950 bg-opacity-90 shadow-md mt-auto">
        <section class="container mx-auto h-full px-1 md:px-4 xl:w-10/12 flex flex-col md:flex-row justify-around md:justify-between">
            <div class="self-center my-2 w-full md:w-auto">
                <h2 class="text-2xl font-semibold text-center lg:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                    <span>TRIGGERSC</span>
                    <span><font-awesome-icon :icon="['fas', 'angry']" class="text-white mx-1" /></span>
                    <span>RE</span>
                </h2>
                <div class="flex text-white my-4 justify-center lg:justify-start">
                    <NuxtLink to="/about" class="border-r border-white px-4 lg:pl-0 uppercase">{{ $t('header.about') }}</NuxtLink>
                    <NuxtLink to="/faq" class="border-r border-white px-4 uppercase">{{ $t('header.faq') }}</NuxtLink>
                    <NuxtLink to="/contact" class="px-4 uppercase">{{ $t('header.contact') }}</NuxtLink>
                </div>
                <article class="mx-auto text-white w-64 max-w-full text-center lg:text-left text-xs">
                    {{ $t('general.slogan') }}
                </article>
            </div>
            <div class="self-center items-center grid my-2 px-2 grid-cols-3 lg:grid-cols-3 gap-4">
                <a href="https://www.themoviedb.org" target="blank"><img alt="Logo TMDB" class="w-10 lg:w-16 mx-auto" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"></a>
                <a href="https://www.justwatch.com" target="blank"><img alt="Logo JustWatch" class="w-14 lg:w-24 mx-auto" src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg"></a>
                <a href="https://www.nuxt.com" target="blank"><img alt="Logo Nuxt" class="w-12 lg:w-16 mx-auto" src="../assets/images/nuxt-logo.svg"></a>
                <a href="https://www.tailwindcss.com" target="blank"><img alt="Logo Tailwind" class="w-8 lg:w-12 mx-auto" src="../assets/images/tailwind.svg"></a>
                <a href="https://www.nodejs.org" target="blank"><img alt="Logo Node" class="w-10 lg:w-16 mx-auto" src="../assets/images/node-logo.svg"></a>
                <a href="https://www.mysql.com" target="blank"><img alt="Logo MySQL" class="w-10 lg:w-16 mx-auto" src="../assets/images/mysql-logo.svg"></a>
            </div>
        </section>
    </footer>
</template>