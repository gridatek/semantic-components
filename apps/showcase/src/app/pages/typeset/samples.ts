/**
 * The /typeset page's samples: HTML as rendered markdown would arrive — no
 * classes, no directives — for a typeset container to set.
 */

/** A docs page: steps, code, a table, a note. */
export const DOCS_SAMPLE = `
<h2>Lazy-loading routes</h2>
<p>A route can load its component only when someone visits it. The first page arrives sooner, and each part of the app is fetched the first time it's needed.</p>
<h3>Load a component</h3>
<p>Give the route a <code>loadComponent</code> function that imports the file:</p>
<pre><code>export const routes: Routes = [
  {
    path: 'settings',
    loadComponent: () =&gt; import('./settings/settings'),
  },
];</code></pre>
<p>The file needs a default export; otherwise pick the class from the module: <code>.then((m) =&gt; m.Settings)</code>.</p>
<h3>Choose when to fetch</h3>
<div class="typeset-scroll" tabindex="0" role="region" aria-label="Preloading strategies">
<table>
<thead><tr><th>Strategy</th><th>Fetches a route</th><th>Good for</th></tr></thead>
<tbody>
<tr><td><code>NoPreloading</code></td><td>When it is visited</td><td>Large apps, slow networks</td></tr>
<tr><td><code>PreloadAllModules</code></td><td>Once the app is idle</td><td>Small apps</td></tr>
<tr><td>Your own strategy</td><td>When you decide</td><td>The pages users open next</td></tr>
</tbody>
</table>
</div>
<p>Set it once, where the router is provided:</p>
<pre><code>provideRouter(routes, withPreloading(PreloadAllModules));</code></pre>
<blockquote><p>A guard runs before the route loads: someone who can't open a page never downloads it.</p></blockquote>
<h3>Check the result</h3>
<ol>
<li>Build the app and open the browser's network panel.</li>
<li>Visit the first page: only its chunk arrives.</li>
<li>Open <strong>Settings</strong>: its chunk arrives then, not before.</li>
</ol>
`;

/** The question before the chat answer: page chrome, outside the container. */
export const CHAT_QUESTION =
  'My Angular page gets slow when I type in a search box. Where do I start?';

/** An assistant's answer: short paragraphs, lists, a table, code. */
export const CHAT_SAMPLE = `
<p>Slow typing usually comes from work that runs on every keystroke: filtering a long list, recomputing values the template reads, or rendering rows that didn't change. Here's how to find which one.</p>
<h3>1. See what runs</h3>
<p>Open Angular DevTools, start the profiler, type a few letters and stop. Each bar is one change detection pass; the components in it are the ones that rendered.</p>
<ul>
<li><strong>Many bars per keystroke</strong>: something triggers extra passes, often a timer or a listener outside your input.</li>
<li><strong>One long bar</strong>: a component does too much work when it renders.</li>
</ul>
<h3>2. Fix the usual causes</h3>
<div class="typeset-scroll" tabindex="0" role="region" aria-label="Symptoms and fixes">
<table>
<thead><tr><th>Symptom</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>The whole list re-renders</td><td>A <code>track</code> key in the <code>@for</code></td></tr>
<tr><td>Filtering is slow</td><td>A <code>computed()</code> signal</td></tr>
<tr><td>Every letter filters</td><td>Debounce the query</td></tr>
</tbody>
</table>
</div>
<p>In a <code>computed()</code>, the filter runs once each time its inputs change, not on every pass:</p>
<pre><code>readonly query = signal('');
readonly results = computed(() =&gt;
  this.items().filter((item) =&gt;
    item.name.includes(this.query()),
  ),
);</code></pre>
<blockquote><p>Measure before and after with the same steps. A fix that doesn't move the profiler's numbers isn't the fix.</p></blockquote>
<p>Want to paste a screenshot of the profiler? I can point at the component that takes the time.</p>
`;

/** Long-form reading: an essay, a quote, a rule. */
export const ARTICLE_SAMPLE = `
<h2>The Space Between Lines</h2>
<p><em>On reading text that someone else wrote, in a box nobody designed for it.</em></p>
<p>Most of the words on a screen were never laid out by hand. They arrive from a writer's editor, a content system, a model answering a question — as headings, paragraphs and lists, with no idea of the page they'll land on. Someone has to decide how they look, and that someone is rarely there when they arrive.</p>
<p>Printers had compositors for this. They set each line, chose the space between paragraphs, and stepped a heading back from the text it introduced. On the web, the compositor is a stylesheet, and it has to make those choices once, for text it will never see.</p>
<h3>Rhythm</h3>
<p>Readers rarely notice good spacing. They notice when a heading floats closer to the paragraph above than to the one it names, or when a list crowds the sentence that set it up. Space says what belongs together, and a reader follows it without thinking.</p>
<blockquote><p>The best spacing is the kind nobody mentions: the eye moves on, and the words do the talking.</p></blockquote>
<p>That's why a few values carry so much weight: the size of the text, the height of its lines, and the distance between blocks. Set them well and every element follows; set them badly and no amount of decoration helps.</p>
<hr>
<h3>Measure</h3>
<p>A line of 60 to 80 characters is easy to follow: long enough to read in a sweep, short enough to find the next one. Wider, and the eye loses its place on the way back; narrower, and it hops more than it reads.</p>
<p>A stylesheet can't know how wide your layout is, so the measure is yours: a maximum width on the container, chosen once for the place the text lives.</p>
`;

/** A changelog: versions, dates, what changed. */
export const CHANGELOG_SAMPLE = `
<h2>Acme Notes changelog</h2>
<h3>2.4.0</h3>
<p><time datetime="2026-11-12">November 12, 2026</time></p>
<ul>
<li><strong>Added:</strong> shared notebooks, with a link anyone on your team can open.</li>
<li><strong>Added:</strong> <kbd>Ctrl</kbd> + <kbd>K</kbd> opens search from anywhere.</li>
<li><strong>Changed:</strong> notes open where you left them, scrolled to your last edit.</li>
</ul>
<h3>2.3.1</h3>
<p><time datetime="2026-10-28">October 28, 2026</time></p>
<ul>
<li><strong>Fixed:</strong> a pasted table kept its source's column widths.</li>
<li><strong>Fixed:</strong> dark mode no longer flashes white when a note loads.</li>
</ul>
<h3>2.3.0</h3>
<p><time datetime="2026-10-14">October 14, 2026</time></p>
<p><strong>Breaking:</strong> the <code>notes.export()</code> call now returns markdown; pass <code>{ format: 'html' }</code> for the old output.</p>
<details>
<summary>Older releases</summary>
<p>Releases before 2.3 are listed in the archive.</p>
</details>
`;

/** Meeting notes: decisions, nested lists, a definition list. */
export const NOTES_SAMPLE = `
<h2>Design review — November 14</h2>
<p><strong>Present:</strong> Sam, Priya, Lee, Noor</p>
<h3>Decisions</h3>
<ol>
<li>The search panel opens with <kbd>Ctrl</kbd> + <kbd>K</kbd>, as in the desktop app.</li>
<li>Empty states get one action, not two.</li>
<li>Dates follow the reader's locale everywhere, the exports included.</li>
</ol>
<h3>Open questions</h3>
<ul>
<li>Do shared notebooks need their own icon?
<ul>
<li>Lee: yes, in the sidebar only.</li>
<li>Noor: test it with five people first.</li>
</ul>
</li>
<li>Should archived notes show up in search?</li>
</ul>
<h3>Follow-up</h3>
<dl>
<dt>Owner</dt>
<dd>Priya</dd>
<dt>Due</dt>
<dd>November 21</dd>
</dl>
<p><mark>Next review:</mark> November 28, same time.</p>
`;
