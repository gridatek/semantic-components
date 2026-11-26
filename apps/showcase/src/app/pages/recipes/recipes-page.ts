import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScFrame, ScTypeset } from '@semantic-components/ui';
import { ComponentsService } from '../../services/components-service';

/**
 * The recipes: what is made from the library's components, with no component
 * of its own — the parts to put together, and how.
 */
@Component({
  selector: 'app-recipes-page',
  imports: [RouterLink, ScFrame, ScTypeset],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Recipes</h1>
        <p class="text-muted-foreground">
          Patterns made from the components you already have, with no component
          of their own: which parts to put together, and how — so there is one
          way to do each thing, and less to learn.
        </p>
      </div>

      <ul class="grid grid-cols-1 gap-4 md:grid-cols-2">
        @for (recipe of recipes(); track recipe.path) {
          <li class="contents">
            <a
              scFrame
              [routerLink]="'/docs/recipes/' + recipe.path"
              class="hover:bg-accent p-6 transition-colors"
            >
              <h2 class="text-base leading-none font-semibold tracking-tight">
                {{ recipe.name }}
              </h2>
              <p class="text-muted-foreground mt-2 text-sm">
                {{ recipe.description }}
              </p>
            </a>
          </li>
        }
      </ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RecipesPage {
  private readonly recipes = inject(ComponentsService).visibleRecipes;
}
