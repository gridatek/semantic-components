import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScInput,
  ScLabel,
  ScSeparator,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiGithubIcon,
  SiMailIcon,
  SiMapPinIcon,
  SiPhoneIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-contact',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScInput,
    ScLabel,
    ScSeparator,
    ScTextarea,
    SiGithubIcon,
    SiMailIcon,
    SiMapPinIcon,
    SiPhoneIcon,
  ],
  host: { class: 'block' },
  template: `
    <div class="bg-background min-h-screen">
      <div class="mx-auto max-w-5xl px-6 py-12">
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-bold tracking-tight">Get in Touch</h1>
          <p class="text-muted-foreground mt-3 text-lg">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <div class="grid gap-12 md:grid-cols-2">
          <!-- Left column - Contact info -->
          <div class="space-y-8">
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div
                  class="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg"
                >
                  <svg siMailIcon class="size-5"></svg>
                </div>
                <div>
                  <h3 class="font-medium">Email</h3>
                  <p class="text-muted-foreground text-sm">
                    support&#64;example.com
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg"
                >
                  <svg siMapPinIcon class="size-5"></svg>
                </div>
                <div>
                  <h3 class="font-medium">Office</h3>
                  <p class="text-muted-foreground text-sm">
                    123 Main St, San Francisco, CA
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg"
                >
                  <svg siPhoneIcon class="size-5"></svg>
                </div>
                <div>
                  <h3 class="font-medium">Phone</h3>
                  <p class="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div scSeparator></div>

            <div>
              <h3 class="mb-4 font-medium">Follow Us</h3>
              <div class="flex gap-3">
                <button scButton variant="outline" size="icon">
                  <svg siGithubIcon class="size-4"></svg>
                </button>
                <button scButton variant="outline" size="icon">X</button>
              </div>
            </div>
          </div>

          <!-- Right column - Contact form -->
          <div scCard>
            <div scCardHeader>
              <h2 scCardTitle class="text-xl">Send us a message</h2>
            </div>

            <div scCardBody class="space-y-4">
              <div class="space-y-2">
                <label scLabel for="name">Name</label>
                <input
                  scInput
                  id="name"
                  type="text"
                  placeholder="Your name"
                  autocomplete="name"
                />
              </div>

              <div class="space-y-2">
                <label scLabel for="email">Email</label>
                <input
                  scInput
                  id="email"
                  type="email"
                  placeholder="you&#64;example.com"
                  autocomplete="email"
                />
              </div>

              <div class="space-y-2">
                <label scLabel for="subject">Subject</label>
                <input
                  scInput
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                />
              </div>

              <div class="space-y-2">
                <label scLabel for="message">Message</label>
                <textarea
                  scTextarea
                  id="message"
                  placeholder="Your message..."
                  rows="5"
                ></textarea>
              </div>

              <button scButton class="w-full">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage {}
