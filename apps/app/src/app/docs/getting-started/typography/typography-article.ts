import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-typography-article',
  imports: [],
  template: `
    <div class="container mx-auto max-w-4xl p-8">
      <h1 class="text-4xl font-bold mb-8">Typography System Test</h1>
      <p class="text-lg text-muted-foreground mb-12">
        Testing the typography.css system with generic article content using prose classes.
      </p>

      <!-- Base Prose Test -->
      <section class="mb-16">
        <h2 class="text-2xl font-semibold mb-6">Base Prose (.prose)</h2>
        <article class="prose border p-8 rounded-lg">
          <h1>Garlic bread with cheese: What the science tells us</h1>
          <p>
            For years parents have espoused the health benefits of eating garlic bread with cheese
            to their children, with the food earning such an iconic status in our culture that kids
            will often dress up as warm, cheesy loaf for Halloween.
          </p>
          <p>
            But a recent study shows that the celebrated appetizer may be linked to a series of
            rabies cases springing up around the country.
          </p>

          <h2>The Study</h2>
          <p>
            The study, published in the
            <em>Journal of Culinary Science</em>
            , examined over 1,000 cases of garlic bread consumption across 15 states. The findings
            were
            <strong>particularly alarming</strong>
            for families with young children.
          </p>

          <blockquote>
            <p>
              We found a direct correlation between garlic bread consumption and unusual behavior
              patterns that closely resembled early-stage rabies symptoms.
            </p>
          </blockquote>

          <h3>Key Findings</h3>
          <ul>
            <li>73% of subjects showed increased aggression when garlic bread was removed</li>
            <li>Excessive drooling was observed in 68% of cases</li>
            <li>Participants demonstrated an uncontrollable urge to bite others</li>
            <li>Fear of water was reported in 12% of severe cases</li>
          </ul>

          <h3>Research Methodology</h3>
          <p>
            The researchers used a
            <a href="#">double-blind study design</a>
            to ensure accuracy. Participants were given either real garlic bread or a placebo made
            from regular bread with garlic powder.
          </p>

          <pre><code>function analyzeGarlicBreadData(samples) {{ '{' }}
  return samples.filter(sample => {{ '{' }}
    return sample.garlicContent > 0.5 && 
           sample.cheeseRatio >= 0.3;
  {{ '}' }});
{{ '}' }}</code></pre>

          <h4>Statistical Analysis</h4>
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Percentage</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Increased Aggression</td>
                <td>73%</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Excessive Drooling</td>
                <td>68%</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Biting Urges</td>
                <td>45%</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Fear of Water</td>
                <td>12%</td>
                <td>Low</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h2>Expert Opinions</h2>
          <p>
            Dr. Margaret Breadsworth, a leading expert in
            <code>culinary psychology</code>
            , commented on the findings: "While these results are concerning, we must remember that
            correlation does not imply causation."
          </p>

          <ol>
            <li>The study sample size was relatively small</li>
            <li>Environmental factors were not fully controlled</li>
            <li>Long-term effects remain unknown</li>
          </ol>

          <figure>
            <div class="bg-gray-100 p-8 text-center text-gray-500 rounded">
              [Chart showing garlic bread consumption vs. symptom severity]
            </div>
            <figcaption>
              Figure 1: Correlation between daily garlic bread intake and reported symptoms
            </figcaption>
          </figure>
        </article>
      </section>

      <!-- Large Prose Test -->
      <section class="mb-16">
        <h2 class="text-2xl font-semibold mb-6">Large Prose (.prose-lg)</h2>
        <article class="prose prose-lg border p-8 rounded-lg">
          <h1>The Economics of Cheese Production</h1>
          <p>
            The global cheese market has experienced unprecedented growth over the past decade, with
            artisanal varieties leading the charge in premium pricing and consumer demand.
          </p>
          <h2>Market Trends</h2>
          <p>
            From
            <strong>aged cheddars</strong>
            to exotic
            <em>blue cheeses</em>
            , consumers are increasingly willing to pay premium prices for quality dairy products.
            This trend has created new opportunities for
            <a href="#">small-scale producers</a>
            .
          </p>
          <blockquote>
            <p>The artisanal cheese market represents the future of dairy production.</p>
          </blockquote>
        </article>
      </section>

      <!-- Extra Large Prose Test -->
      <section class="mb-16">
        <h2 class="text-2xl font-semibold mb-6">Extra Large Prose (.prose-xl)</h2>
        <article class="prose prose-xl border p-8 rounded-lg">
          <h1>Climate Change and Agriculture</h1>
          <p>
            Rising temperatures and changing precipitation patterns are forcing farmers worldwide to
            adapt their growing techniques and crop selections.
          </p>
          <p>
            <strong>Sustainable farming practices</strong>
            are becoming essential for maintaining crop yields while minimizing environmental
            impact.
          </p>
        </article>
      </section>

      <!-- Blog Prose Test -->
      <section class="mb-16">
        <h2 class="text-2xl font-semibold mb-6">Blog Prose (.prose-blog)</h2>
        <article class="prose prose-blog border p-8 rounded-lg">
          <h1>Photography in the Digital Age</h1>
          <p>
            The transition from film to digital photography has revolutionized how we capture, edit,
            and share images with the world.
          </p>

          <div class="bg-blue-100 p-8 text-center text-blue-600 rounded">
            [Responsive image that extends beyond container on mobile]
          </div>

          <p>
            Modern cameras offer unprecedented control over every aspect of image capture, from ISO
            sensitivity to white balance adjustments.
          </p>
        </article>
      </section>

      <!-- Dark Mode Test -->
      <section class="mb-16">
        <h2 class="text-2xl font-semibold mb-6">Dark Mode Comparison</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-medium mb-4">Light Mode</h3>
            <article class="prose border p-6 rounded-lg">
              <h2>Morning Routines</h2>
              <p>
                Starting your day with
                <a href="#">intentional habits</a>
                can significantly impact your
                <strong>productivity</strong>
                and overall well-being.
              </p>
              <code>const morning = 'coffee + meditation';</code>
            </article>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-4">Dark Mode</h3>
            <article class="prose dark border p-6 rounded-lg bg-gray-900">
              <h2>Evening Routines</h2>
              <p>
                Winding down with
                <a href="#">relaxing activities</a>
                helps prepare your mind and body for
                <strong>restorative sleep</strong>
                .
              </p>
              <code>const evening = 'tea + reading';</code>
            </article>
          </div>
        </div>
      </section>

      <!-- Not Prose Test -->
      <section class="mb-16">
        <h2 class="text-2xl font-semibold mb-6">Not Prose Exclusions</h2>
        <article class="prose border p-8 rounded-lg">
          <h1>Mixed Content Example</h1>
          <p>This content follows normal prose styling rules for consistent typography.</p>

          <div class="not-prose">
            <h3 class="text-xl font-bold text-blue-600 mb-2">Custom Component</h3>
            <p class="text-sm text-gray-500 mb-4">
              This section uses custom styling outside of the prose system.
            </p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Call to Action
            </button>
          </div>

          <p>After the custom section, we return to standard prose typography styling.</p>
        </article>
      </section>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypographyArticle {}
