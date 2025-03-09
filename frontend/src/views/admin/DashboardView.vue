<template>
  <div>
    <div class="flex items-center gap-4">
      <h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
      
      <div class="h-6 w-px bg-gray-300"></div>
      
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink current>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  </div>
</template>

<script setup>
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
// Dashboard component
</script> 