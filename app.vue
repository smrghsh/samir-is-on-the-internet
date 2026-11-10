<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const description =
  'I research spatial tools for complex 3D data, and develop immersive XR for cutting-edge products and creative works.'
useSeoMeta({
  title: 'Samir Ghosh',
  ogTitle: 'Samir Ghosh',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://samir.tech',
  ogImage: 'https://samir.tech/preview.png',
  ogImageWidth: 996,
  ogImageHeight: 606,
  ogImageType: 'image/png',
  ogImageAlt: 'samir.tech — domain-warped noise in blue, cyan and magenta',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Samir Ghosh',
  twitterDescription: description,
  twitterImage: 'https://samir.tech/preview.png',
})
</script>
