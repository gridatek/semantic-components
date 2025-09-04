import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScNav, ScNavLink, ScNavList } from '@semantic-components/ui';

@Component({
  selector: 'cms-navigation',
  imports: [RouterModule, ScNav, ScNavList, ScNavLink],
  template: `
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Brand -->
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-gray-900">CMS</h1>
          </div>

          <!-- Main Navigation -->
          <nav class="hidden sm:flex" sc-nav>
            <ul sc-nav-list>
              <li>
                <a sc-nav-link routerLink="/home" routerLinkActive="active-page">Home</a>
              </li>
              <li>
                <a sc-nav-link routerLink="/about" routerLinkActive="active-page">About</a>
              </li>
              <li>
                <a sc-nav-link href="#">Content</a>
              </li>
              <li>
                <a sc-nav-link href="#">Media</a>
              </li>
              <li>
                <a sc-nav-link href="#">Settings</a>
              </li>
            </ul>
          </nav>

          <!-- User Actions -->
          <div class="hidden sm:flex sm:items-center space-x-4">
            <button
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <button
              class="rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
            >
              <span class="sr-only">Open user menu</span>
              <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span class="text-sm font-medium text-gray-700">U</span>
              </div>
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="sm:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              type="button"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CmsNavigation {}
