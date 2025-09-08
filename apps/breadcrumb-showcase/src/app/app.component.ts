import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from '@semantic-components/breadcrumb';

@Component({
  imports: [RouterModule, BreadcrumbComponent],
  selector: 'app-root',
  template: `
    <!-- Navigation List for Your App Routes -->
    <nav class="breadcrumb-nav">
      <ul class="breadcrumb-list">
        <!-- Main Routes -->
        <li><a [routerLink]="['/dashboard']">Dashboard</a></li>
        <li><a [routerLink]="['/products']">Products</a></li>
        <li><a [routerLink]="['/users']">Users</a></li>

        <!-- Product Sub-routes -->
        <li><a [routerLink]="['/products', 'category', '1']">Category (ID: 1)</a></li>
        <li><a [routerLink]="['/products', 'category', 'electronics']">Electronics Category</a></li>
        <li><a [routerLink]="['/products', '123']">Product Details (ID: 123)</a></li>
        <li><a [routerLink]="['/products', 'laptop-pro']">Laptop Pro Details</a></li>

        <!-- User Sub-routes -->
        <li><a [routerLink]="['/users', '456']">User Profile (ID: 456)</a></li>
        <li><a [routerLink]="['/users', 'john-doe']">John Doe Profile</a></li>
        <li><a [routerLink]="['/users', '456', 'settings']">User Settings (ID: 456)</a></li>
        <li><a [routerLink]="['/users', 'john-doe', 'settings']">John Doe Settings</a></li>
      </ul>
    </nav>

    <!-- Alternative: Organized by sections -->
    <nav class="breadcrumb-nav">
      <div class="nav-section">
        <h3>Main Pages</h3>
        <ul class="breadcrumb-list">
          <li><a [routerLink]="['/dashboard']">Dashboard</a></li>
          <li><a [routerLink]="['/products']">Products List</a></li>
          <li><a [routerLink]="['/users']">Users List</a></li>
        </ul>
      </div>

      <div class="nav-section">
        <h3>Product Pages</h3>
        <ul class="breadcrumb-list">
          <li>
            <a [routerLink]="['/products', 'category', 'electronics']">Electronics Category</a>
          </li>
          <li><a [routerLink]="['/products', 'category', 'clothing']">Clothing Category</a></li>
          <li><a [routerLink]="['/products', '123']">Product ID: 123</a></li>
          <li><a [routerLink]="['/products', 'laptop-macbook']">MacBook Product</a></li>
        </ul>
      </div>

      <div class="nav-section">
        <h3>User Pages</h3>
        <ul class="breadcrumb-list">
          <li><a [routerLink]="['/users', '1']">User ID: 1</a></li>
          <li><a [routerLink]="['/users', '2']">User ID: 2</a></li>
          <li><a [routerLink]="['/users', '1', 'settings']">User 1 Settings</a></li>
          <li><a [routerLink]="['/users', '2', 'settings']">User 2 Settings</a></li>
        </ul>
      </div>
    </nav>

    <div class="app-container">
      <header class="app-header">
        <h1>My Application</h1>
        <lib-breadcrumb
          [showHome]="true"
          [enableNavigation]="true"
          homeLabel="Dashboard"
          homeUrl="/dashboard"
        />
      </header>

      <main class="app-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        background-color: #f8fafc;
      }

      .app-header {
        background: white;
        border-bottom: 1px solid #e2e8f0;
        padding: 1rem 2rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      }

      .app-header h1 {
        margin: 0 0 0.5rem 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1e293b;
      }

      .app-main {
        padding: 2rem;
      }

      .breadcrumb-nav {
        padding: 1rem 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .breadcrumb-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin: 0;
        padding: 0;
      }

      .breadcrumb-list li a {
        color: #0066cc;
        text-decoration: none;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        border: 1px solid #e0e0e0;
        background-color: #f9f9f9;
        transition: all 0.2s ease;
        font-size: 0.875rem;
      }

      .breadcrumb-list li a:hover {
        background-color: #0066cc;
        color: white;
        border-color: #0066cc;
      }

      /* Organized sections style */
      .nav-section {
        margin-bottom: 1.5rem;
      }

      .nav-section h3 {
        margin: 0 0 0.5rem 0;
        color: #333;
        font-size: 1rem;
        font-weight: 600;
      }

      .nav-section .breadcrumb-list {
        margin-left: 1rem;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .breadcrumb-list {
          flex-direction: column;
          gap: 0.5rem;
        }

        .breadcrumb-list li a {
          display: block;
          text-align: center;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'breadcrumb-showcase';
}
