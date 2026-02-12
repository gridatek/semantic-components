import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

// Emoji data structure
export interface Emoji {
  emoji: string;
  name: string;
  keywords?: string[];
}

export interface EmojiCategory {
  id: string;
  name: string;
  icon: string;
  emojis: Emoji[];
}

// Default emoji categories
const DEFAULT_CATEGORIES: EmojiCategory[] = [
  {
    id: 'smileys',
    name: 'Smileys & Emotion',
    icon: '😀',
    emojis: [
      { emoji: '😀', name: 'grinning face', keywords: ['happy', 'smile'] },
      {
        emoji: '😃',
        name: 'grinning face with big eyes',
        keywords: ['happy', 'joy'],
      },
      {
        emoji: '😄',
        name: 'grinning face with smiling eyes',
        keywords: ['happy', 'joy'],
      },
      {
        emoji: '😁',
        name: 'beaming face with smiling eyes',
        keywords: ['happy', 'grin'],
      },
      {
        emoji: '😆',
        name: 'grinning squinting face',
        keywords: ['happy', 'laugh'],
      },
      {
        emoji: '😅',
        name: 'grinning face with sweat',
        keywords: ['hot', 'nervous'],
      },
      {
        emoji: '🤣',
        name: 'rolling on the floor laughing',
        keywords: ['lol', 'laugh'],
      },
      {
        emoji: '😂',
        name: 'face with tears of joy',
        keywords: ['laugh', 'cry'],
      },
      { emoji: '🙂', name: 'slightly smiling face', keywords: ['smile'] },
      { emoji: '🙃', name: 'upside-down face', keywords: ['silly', 'sarcasm'] },
      { emoji: '😉', name: 'winking face', keywords: ['wink', 'flirt'] },
      {
        emoji: '😊',
        name: 'smiling face with smiling eyes',
        keywords: ['blush', 'happy'],
      },
      {
        emoji: '😇',
        name: 'smiling face with halo',
        keywords: ['angel', 'innocent'],
      },
      {
        emoji: '🥰',
        name: 'smiling face with hearts',
        keywords: ['love', 'crush'],
      },
      {
        emoji: '😍',
        name: 'smiling face with heart-eyes',
        keywords: ['love', 'crush'],
      },
      { emoji: '🤩', name: 'star-struck', keywords: ['excited', 'star'] },
      { emoji: '😘', name: 'face blowing a kiss', keywords: ['kiss', 'love'] },
      { emoji: '😗', name: 'kissing face', keywords: ['kiss'] },
      {
        emoji: '😚',
        name: 'kissing face with closed eyes',
        keywords: ['kiss'],
      },
      {
        emoji: '😙',
        name: 'kissing face with smiling eyes',
        keywords: ['kiss'],
      },
      {
        emoji: '🥲',
        name: 'smiling face with tear',
        keywords: ['sad', 'happy'],
      },
      {
        emoji: '😋',
        name: 'face savoring food',
        keywords: ['yum', 'delicious'],
      },
      {
        emoji: '😛',
        name: 'face with tongue',
        keywords: ['tongue', 'playful'],
      },
      {
        emoji: '😜',
        name: 'winking face with tongue',
        keywords: ['tongue', 'wink'],
      },
      { emoji: '🤪', name: 'zany face', keywords: ['crazy', 'wild'] },
      {
        emoji: '😝',
        name: 'squinting face with tongue',
        keywords: ['tongue', 'playful'],
      },
      { emoji: '🤑', name: 'money-mouth face', keywords: ['money', 'rich'] },
      { emoji: '🤗', name: 'hugging face', keywords: ['hug', 'love'] },
      {
        emoji: '🤭',
        name: 'face with hand over mouth',
        keywords: ['oops', 'giggle'],
      },
      { emoji: '🤫', name: 'shushing face', keywords: ['quiet', 'secret'] },
      { emoji: '🤔', name: 'thinking face', keywords: ['think', 'hmm'] },
      { emoji: '🤐', name: 'zipper-mouth face', keywords: ['secret', 'quiet'] },
    ],
  },
  {
    id: 'gestures',
    name: 'People & Body',
    icon: '👋',
    emojis: [
      { emoji: '👋', name: 'waving hand', keywords: ['hello', 'bye'] },
      { emoji: '🤚', name: 'raised back of hand', keywords: ['stop'] },
      {
        emoji: '🖐️',
        name: 'hand with fingers splayed',
        keywords: ['high five'],
      },
      { emoji: '✋', name: 'raised hand', keywords: ['stop', 'high five'] },
      { emoji: '🖖', name: 'vulcan salute', keywords: ['spock', 'star trek'] },
      { emoji: '👌', name: 'OK hand', keywords: ['ok', 'perfect'] },
      { emoji: '🤌', name: 'pinched fingers', keywords: ['italian'] },
      { emoji: '🤏', name: 'pinching hand', keywords: ['small', 'tiny'] },
      { emoji: '✌️', name: 'victory hand', keywords: ['peace', 'victory'] },
      { emoji: '🤞', name: 'crossed fingers', keywords: ['luck', 'hope'] },
      { emoji: '🤟', name: 'love-you gesture', keywords: ['love', 'rock'] },
      { emoji: '🤘', name: 'sign of the horns', keywords: ['rock', 'metal'] },
      { emoji: '🤙', name: 'call me hand', keywords: ['call', 'shaka'] },
      { emoji: '👈', name: 'backhand index pointing left', keywords: ['left'] },
      {
        emoji: '👉',
        name: 'backhand index pointing right',
        keywords: ['right'],
      },
      { emoji: '👆', name: 'backhand index pointing up', keywords: ['up'] },
      { emoji: '🖕', name: 'middle finger', keywords: ['rude'] },
      { emoji: '👇', name: 'backhand index pointing down', keywords: ['down'] },
      { emoji: '☝️', name: 'index pointing up', keywords: ['up', 'one'] },
      { emoji: '👍', name: 'thumbs up', keywords: ['like', 'yes', 'approve'] },
      { emoji: '👎', name: 'thumbs down', keywords: ['dislike', 'no'] },
      { emoji: '✊', name: 'raised fist', keywords: ['power', 'punch'] },
      { emoji: '👊', name: 'oncoming fist', keywords: ['punch', 'fist bump'] },
      { emoji: '🤛', name: 'left-facing fist', keywords: ['fist bump'] },
      { emoji: '🤜', name: 'right-facing fist', keywords: ['fist bump'] },
      { emoji: '👏', name: 'clapping hands', keywords: ['applause', 'clap'] },
      {
        emoji: '🙌',
        name: 'raising hands',
        keywords: ['celebration', 'hooray'],
      },
      { emoji: '👐', name: 'open hands', keywords: ['jazz hands'] },
      { emoji: '🤲', name: 'palms up together', keywords: ['prayer'] },
      { emoji: '🤝', name: 'handshake', keywords: ['deal', 'agreement'] },
      {
        emoji: '🙏',
        name: 'folded hands',
        keywords: ['pray', 'please', 'thanks'],
      },
    ],
  },
  {
    id: 'animals',
    name: 'Animals & Nature',
    icon: '🐶',
    emojis: [
      { emoji: '🐶', name: 'dog face', keywords: ['pet', 'puppy'] },
      { emoji: '🐱', name: 'cat face', keywords: ['pet', 'kitten'] },
      { emoji: '🐭', name: 'mouse face', keywords: ['rodent'] },
      { emoji: '🐹', name: 'hamster', keywords: ['pet', 'rodent'] },
      { emoji: '🐰', name: 'rabbit face', keywords: ['bunny', 'pet'] },
      { emoji: '🦊', name: 'fox', keywords: ['animal'] },
      { emoji: '🐻', name: 'bear', keywords: ['animal'] },
      { emoji: '🐼', name: 'panda', keywords: ['animal', 'china'] },
      { emoji: '🐨', name: 'koala', keywords: ['animal', 'australia'] },
      { emoji: '🐯', name: 'tiger face', keywords: ['animal'] },
      { emoji: '🦁', name: 'lion', keywords: ['animal', 'king'] },
      { emoji: '🐮', name: 'cow face', keywords: ['animal', 'farm'] },
      { emoji: '🐷', name: 'pig face', keywords: ['animal', 'farm'] },
      { emoji: '🐸', name: 'frog', keywords: ['animal'] },
      { emoji: '🐵', name: 'monkey face', keywords: ['animal'] },
      { emoji: '🐔', name: 'chicken', keywords: ['animal', 'farm'] },
      { emoji: '🐧', name: 'penguin', keywords: ['animal', 'bird'] },
      { emoji: '🐦', name: 'bird', keywords: ['animal'] },
      { emoji: '🐤', name: 'baby chick', keywords: ['animal', 'bird'] },
      { emoji: '🦆', name: 'duck', keywords: ['animal', 'bird'] },
      { emoji: '🦅', name: 'eagle', keywords: ['animal', 'bird'] },
      { emoji: '🦉', name: 'owl', keywords: ['animal', 'bird', 'wise'] },
      { emoji: '🦇', name: 'bat', keywords: ['animal'] },
      { emoji: '🐺', name: 'wolf', keywords: ['animal'] },
      { emoji: '🐗', name: 'boar', keywords: ['animal'] },
      { emoji: '🐴', name: 'horse face', keywords: ['animal'] },
      { emoji: '🦄', name: 'unicorn', keywords: ['animal', 'magic'] },
      { emoji: '🐝', name: 'honeybee', keywords: ['insect', 'bee'] },
      { emoji: '🐛', name: 'bug', keywords: ['insect'] },
      { emoji: '🦋', name: 'butterfly', keywords: ['insect', 'pretty'] },
      { emoji: '🐌', name: 'snail', keywords: ['slow'] },
      { emoji: '🐞', name: 'lady beetle', keywords: ['insect', 'ladybug'] },
    ],
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: '🍔',
    emojis: [
      { emoji: '🍎', name: 'red apple', keywords: ['fruit', 'healthy'] },
      { emoji: '🍐', name: 'pear', keywords: ['fruit'] },
      { emoji: '🍊', name: 'tangerine', keywords: ['fruit', 'orange'] },
      { emoji: '🍋', name: 'lemon', keywords: ['fruit', 'sour'] },
      { emoji: '🍌', name: 'banana', keywords: ['fruit'] },
      { emoji: '🍉', name: 'watermelon', keywords: ['fruit', 'summer'] },
      { emoji: '🍇', name: 'grapes', keywords: ['fruit'] },
      { emoji: '🍓', name: 'strawberry', keywords: ['fruit', 'berry'] },
      { emoji: '🍈', name: 'melon', keywords: ['fruit'] },
      { emoji: '🍒', name: 'cherries', keywords: ['fruit'] },
      { emoji: '🍑', name: 'peach', keywords: ['fruit'] },
      { emoji: '🥭', name: 'mango', keywords: ['fruit', 'tropical'] },
      { emoji: '🍍', name: 'pineapple', keywords: ['fruit', 'tropical'] },
      { emoji: '🥥', name: 'coconut', keywords: ['fruit', 'tropical'] },
      { emoji: '🥝', name: 'kiwi fruit', keywords: ['fruit'] },
      { emoji: '🍅', name: 'tomato', keywords: ['vegetable', 'fruit'] },
      { emoji: '🥑', name: 'avocado', keywords: ['fruit', 'guacamole'] },
      { emoji: '🍔', name: 'hamburger', keywords: ['food', 'burger'] },
      { emoji: '🍟', name: 'french fries', keywords: ['food', 'fast food'] },
      { emoji: '🍕', name: 'pizza', keywords: ['food', 'italian'] },
      { emoji: '🌭', name: 'hot dog', keywords: ['food'] },
      { emoji: '🥪', name: 'sandwich', keywords: ['food'] },
      { emoji: '🌮', name: 'taco', keywords: ['food', 'mexican'] },
      { emoji: '🌯', name: 'burrito', keywords: ['food', 'mexican'] },
      {
        emoji: '🍜',
        name: 'steaming bowl',
        keywords: ['food', 'noodles', 'ramen'],
      },
      {
        emoji: '🍝',
        name: 'spaghetti',
        keywords: ['food', 'pasta', 'italian'],
      },
      { emoji: '🍣', name: 'sushi', keywords: ['food', 'japanese'] },
      { emoji: '🍦', name: 'soft ice cream', keywords: ['dessert', 'sweet'] },
      { emoji: '🍩', name: 'doughnut', keywords: ['dessert', 'sweet'] },
      { emoji: '🍪', name: 'cookie', keywords: ['dessert', 'sweet'] },
      {
        emoji: '☕',
        name: 'hot beverage',
        keywords: ['coffee', 'tea', 'drink'],
      },
      { emoji: '🍺', name: 'beer mug', keywords: ['drink', 'alcohol'] },
    ],
  },
  {
    id: 'activities',
    name: 'Activities',
    icon: '⚽',
    emojis: [
      { emoji: '⚽', name: 'soccer ball', keywords: ['sport', 'football'] },
      { emoji: '🏀', name: 'basketball', keywords: ['sport'] },
      { emoji: '🏈', name: 'american football', keywords: ['sport'] },
      { emoji: '⚾', name: 'baseball', keywords: ['sport'] },
      { emoji: '🥎', name: 'softball', keywords: ['sport'] },
      { emoji: '🎾', name: 'tennis', keywords: ['sport'] },
      { emoji: '🏐', name: 'volleyball', keywords: ['sport'] },
      { emoji: '🏉', name: 'rugby football', keywords: ['sport'] },
      { emoji: '🥏', name: 'flying disc', keywords: ['sport', 'frisbee'] },
      { emoji: '🎱', name: 'pool 8 ball', keywords: ['game', 'billiards'] },
      { emoji: '🏓', name: 'ping pong', keywords: ['sport', 'table tennis'] },
      { emoji: '🏸', name: 'badminton', keywords: ['sport'] },
      { emoji: '🏒', name: 'ice hockey', keywords: ['sport'] },
      { emoji: '🏑', name: 'field hockey', keywords: ['sport'] },
      { emoji: '🥍', name: 'lacrosse', keywords: ['sport'] },
      { emoji: '🏏', name: 'cricket game', keywords: ['sport'] },
      { emoji: '🥊', name: 'boxing glove', keywords: ['sport', 'fight'] },
      {
        emoji: '🥋',
        name: 'martial arts uniform',
        keywords: ['sport', 'karate'],
      },
      {
        emoji: '🎯',
        name: 'direct hit',
        keywords: ['game', 'target', 'bullseye'],
      },
      { emoji: '⛳', name: 'flag in hole', keywords: ['sport', 'golf'] },
      { emoji: '🎮', name: 'video game', keywords: ['game', 'controller'] },
      { emoji: '🎲', name: 'game die', keywords: ['game', 'dice'] },
      { emoji: '🎭', name: 'performing arts', keywords: ['theater', 'drama'] },
      { emoji: '🎨', name: 'artist palette', keywords: ['art', 'paint'] },
      { emoji: '🎬', name: 'clapper board', keywords: ['movie', 'film'] },
      {
        emoji: '🎤',
        name: 'microphone',
        keywords: ['music', 'sing', 'karaoke'],
      },
      { emoji: '🎧', name: 'headphone', keywords: ['music', 'audio'] },
      { emoji: '🎼', name: 'musical score', keywords: ['music'] },
      { emoji: '🎹', name: 'musical keyboard', keywords: ['music', 'piano'] },
      { emoji: '🎸', name: 'guitar', keywords: ['music', 'rock'] },
      { emoji: '🎺', name: 'trumpet', keywords: ['music', 'brass'] },
      { emoji: '🎻', name: 'violin', keywords: ['music', 'classical'] },
    ],
  },
  {
    id: 'objects',
    name: 'Objects',
    icon: '💡',
    emojis: [
      { emoji: '⌚', name: 'watch', keywords: ['time'] },
      { emoji: '📱', name: 'mobile phone', keywords: ['phone', 'smartphone'] },
      { emoji: '💻', name: 'laptop', keywords: ['computer'] },
      { emoji: '⌨️', name: 'keyboard', keywords: ['computer', 'type'] },
      { emoji: '🖥️', name: 'desktop computer', keywords: ['computer'] },
      { emoji: '🖨️', name: 'printer', keywords: ['computer'] },
      { emoji: '🖱️', name: 'computer mouse', keywords: ['computer'] },
      { emoji: '💾', name: 'floppy disk', keywords: ['save', 'computer'] },
      { emoji: '💿', name: 'optical disk', keywords: ['cd', 'dvd'] },
      { emoji: '📷', name: 'camera', keywords: ['photo'] },
      { emoji: '📹', name: 'video camera', keywords: ['video', 'record'] },
      { emoji: '🎥', name: 'movie camera', keywords: ['film', 'cinema'] },
      { emoji: '📺', name: 'television', keywords: ['tv', 'watch'] },
      { emoji: '📻', name: 'radio', keywords: ['music', 'audio'] },
      { emoji: '🔦', name: 'flashlight', keywords: ['light', 'torch'] },
      { emoji: '💡', name: 'light bulb', keywords: ['idea', 'light'] },
      {
        emoji: '🔌',
        name: 'electric plug',
        keywords: ['power', 'electricity'],
      },
      { emoji: '🔋', name: 'battery', keywords: ['power', 'energy'] },
      { emoji: '📚', name: 'books', keywords: ['read', 'library'] },
      { emoji: '📖', name: 'open book', keywords: ['read'] },
      { emoji: '📝', name: 'memo', keywords: ['write', 'note'] },
      { emoji: '✏️', name: 'pencil', keywords: ['write', 'draw'] },
      { emoji: '🖊️', name: 'pen', keywords: ['write'] },
      { emoji: '📎', name: 'paperclip', keywords: ['office'] },
      { emoji: '📌', name: 'pushpin', keywords: ['pin', 'location'] },
      { emoji: '📍', name: 'round pushpin', keywords: ['pin', 'location'] },
      { emoji: '🔑', name: 'key', keywords: ['lock', 'password'] },
      { emoji: '🔒', name: 'locked', keywords: ['security', 'private'] },
      { emoji: '🔓', name: 'unlocked', keywords: ['security', 'open'] },
      { emoji: '🔧', name: 'wrench', keywords: ['tool', 'fix'] },
      { emoji: '🔨', name: 'hammer', keywords: ['tool', 'build'] },
      { emoji: '⚙️', name: 'gear', keywords: ['settings', 'cog'] },
    ],
  },
  {
    id: 'symbols',
    name: 'Symbols',
    icon: '❤️',
    emojis: [
      { emoji: '❤️', name: 'red heart', keywords: ['love'] },
      { emoji: '🧡', name: 'orange heart', keywords: ['love'] },
      { emoji: '💛', name: 'yellow heart', keywords: ['love'] },
      { emoji: '💚', name: 'green heart', keywords: ['love'] },
      { emoji: '💙', name: 'blue heart', keywords: ['love'] },
      { emoji: '💜', name: 'purple heart', keywords: ['love'] },
      { emoji: '🖤', name: 'black heart', keywords: ['love'] },
      { emoji: '🤍', name: 'white heart', keywords: ['love'] },
      { emoji: '🤎', name: 'brown heart', keywords: ['love'] },
      { emoji: '💔', name: 'broken heart', keywords: ['sad', 'heartbreak'] },
      { emoji: '💕', name: 'two hearts', keywords: ['love'] },
      { emoji: '💞', name: 'revolving hearts', keywords: ['love'] },
      { emoji: '💓', name: 'beating heart', keywords: ['love'] },
      { emoji: '💗', name: 'growing heart', keywords: ['love'] },
      { emoji: '💖', name: 'sparkling heart', keywords: ['love'] },
      { emoji: '💘', name: 'heart with arrow', keywords: ['love', 'cupid'] },
      { emoji: '💝', name: 'heart with ribbon', keywords: ['love', 'gift'] },
      { emoji: '✨', name: 'sparkles', keywords: ['magic', 'shine'] },
      { emoji: '⭐', name: 'star', keywords: ['favorite'] },
      { emoji: '🌟', name: 'glowing star', keywords: ['shine', 'awesome'] },
      { emoji: '💫', name: 'dizzy', keywords: ['star', 'sparkle'] },
      { emoji: '🔥', name: 'fire', keywords: ['hot', 'lit'] },
      { emoji: '💯', name: 'hundred points', keywords: ['perfect', 'score'] },
      { emoji: '✅', name: 'check mark button', keywords: ['yes', 'done'] },
      { emoji: '❌', name: 'cross mark', keywords: ['no', 'wrong'] },
      { emoji: '❓', name: 'question mark', keywords: ['what', 'confused'] },
      {
        emoji: '❗',
        name: 'exclamation mark',
        keywords: ['warning', 'important'],
      },
      { emoji: '💬', name: 'speech balloon', keywords: ['chat', 'message'] },
      { emoji: '💭', name: 'thought balloon', keywords: ['think'] },
      { emoji: '🔔', name: 'bell', keywords: ['notification', 'alert'] },
      { emoji: '🎵', name: 'musical note', keywords: ['music', 'song'] },
      { emoji: '🎶', name: 'musical notes', keywords: ['music', 'song'] },
    ],
  },
  {
    id: 'flags',
    name: 'Flags',
    icon: '🏁',
    emojis: [
      { emoji: '🏁', name: 'chequered flag', keywords: ['race', 'finish'] },
      { emoji: '🚩', name: 'triangular flag', keywords: ['red flag'] },
      { emoji: '🎌', name: 'crossed flags', keywords: ['japan'] },
      { emoji: '🏴', name: 'black flag', keywords: ['flag'] },
      { emoji: '🏳️', name: 'white flag', keywords: ['surrender'] },
      { emoji: '🏳️‍🌈', name: 'rainbow flag', keywords: ['pride', 'lgbtq'] },
      { emoji: '🏴‍☠️', name: 'pirate flag', keywords: ['pirate', 'jolly roger'] },
      {
        emoji: '🇺🇸',
        name: 'flag: United States',
        keywords: ['usa', 'america'],
      },
      {
        emoji: '🇬🇧',
        name: 'flag: United Kingdom',
        keywords: ['uk', 'britain'],
      },
      { emoji: '🇨🇦', name: 'flag: Canada', keywords: ['canada'] },
      { emoji: '🇦🇺', name: 'flag: Australia', keywords: ['australia'] },
      { emoji: '🇩🇪', name: 'flag: Germany', keywords: ['germany'] },
      { emoji: '🇫🇷', name: 'flag: France', keywords: ['france'] },
      { emoji: '🇮🇹', name: 'flag: Italy', keywords: ['italy'] },
      { emoji: '🇪🇸', name: 'flag: Spain', keywords: ['spain'] },
      { emoji: '🇯🇵', name: 'flag: Japan', keywords: ['japan'] },
      { emoji: '🇰🇷', name: 'flag: South Korea', keywords: ['korea'] },
      { emoji: '🇨🇳', name: 'flag: China', keywords: ['china'] },
      { emoji: '🇮🇳', name: 'flag: India', keywords: ['india'] },
      { emoji: '🇧🇷', name: 'flag: Brazil', keywords: ['brazil'] },
      { emoji: '🇲🇽', name: 'flag: Mexico', keywords: ['mexico'] },
      { emoji: '🇷🇺', name: 'flag: Russia', keywords: ['russia'] },
    ],
  },
];

// ============================================================================
// EmojiPicker
// ============================================================================
@Component({
  selector: 'sc-emoji-picker',
  exportAs: 'scEmojiPicker',
  template: `
    <div [class]="containerClass()">
      <!-- Search -->
      @if (showSearch()) {
        <div class="p-2 border-b">
          <input
            type="text"
            [value]="searchQuery()"
            (input)="onSearchInput($event)"
            placeholder="Search emoji..."
            [class]="searchInputClass()"
          />
        </div>
      }

      <!-- Category tabs -->
      @if (showCategories() && !searchQuery()) {
        <div class="flex border-b overflow-x-auto">
          @for (category of categories(); track category.id) {
            <button
              type="button"
              [class]="categoryTabClass(category.id === activeCategory())"
              (click)="activeCategory.set(category.id)"
              [attr.aria-label]="category.name"
              [attr.aria-pressed]="category.id === activeCategory()"
            >
              {{ category.icon }}
            </button>
          }
        </div>
      }

      <!-- Emoji grid -->
      <div [class]="gridContainerClass()">
        @if (searchQuery()) {
          <!-- Search results -->
          @if (filteredEmojis().length > 0) {
            <div class="p-2">
              <div [class]="gridClass()">
                @for (emoji of filteredEmojis(); track emoji.emoji) {
                  <button
                    type="button"
                    [class]="emojiButtonClass()"
                    (click)="selectEmoji(emoji)"
                    [attr.aria-label]="emoji.name"
                  >
                    {{ emoji.emoji }}
                  </button>
                }
              </div>
            </div>
          } @else {
            <div class="p-4 text-center text-sm text-muted-foreground">
              No emoji found
            </div>
          }
        } @else {
          <!-- Category emojis -->
          @for (category of categories(); track category.id) {
            @if (category.id === activeCategory()) {
              <div class="p-2">
                <div [class]="gridClass()">
                  @for (emoji of category.emojis; track emoji.emoji) {
                    <button
                      type="button"
                      [class]="emojiButtonClass()"
                      (click)="selectEmoji(emoji)"
                      [attr.aria-label]="emoji.name"
                    >
                      {{ emoji.emoji }}
                    </button>
                  }
                </div>
              </div>
            }
          }
        }
      </div>

      <!-- Recently used -->
      @if (showRecent() && recentEmojis().length > 0 && !searchQuery()) {
        <div class="border-t p-2">
          <p class="text-xs text-muted-foreground mb-1">Recently used</p>
          <div class="flex gap-1 flex-wrap">
            @for (emoji of recentEmojis(); track emoji.emoji) {
              <button
                type="button"
                [class]="emojiButtonClass()"
                (click)="selectEmoji(emoji)"
                [attr.aria-label]="emoji.name"
              >
                {{ emoji.emoji }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'emoji-picker',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEmojiPicker {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly categories = input<EmojiCategory[]>(DEFAULT_CATEGORIES);
  readonly showSearch = input<boolean>(true);
  readonly showCategories = input<boolean>(true);
  readonly showRecent = input<boolean>(true);
  readonly maxRecent = input<number>(8);
  readonly columns = input<number>(8);

  readonly value = model<string>('');
  readonly emojiSelect = output<Emoji>();

  readonly searchQuery = signal<string>('');
  readonly activeCategory = signal<string>('smileys');
  readonly recentEmojis = signal<Emoji[]>([]);

  protected readonly filteredEmojis = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return [];

    const results: Emoji[] = [];
    for (const category of this.categories()) {
      for (const emoji of category.emojis) {
        if (
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords?.some((k) => k.toLowerCase().includes(query))
        ) {
          results.push(emoji);
        }
      }
    }
    return results;
  });

  protected readonly containerClass = computed(() =>
    cn(
      'w-72 rounded-lg border bg-popover text-popover-foreground shadow-md',
      this.classInput(),
    ),
  );

  protected readonly searchInputClass = computed(() =>
    cn(
      'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm',
      'placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring',
    ),
  );

  protected readonly gridContainerClass = computed(() =>
    cn('h-64 overflow-y-auto'),
  );

  protected readonly gridClass = computed(() =>
    cn('grid gap-1', `grid-cols-${this.columns()}`),
  );

  protected categoryTabClass(isActive: boolean): string {
    return cn(
      'flex-shrink-0 p-2 text-lg hover:bg-accent transition-colors',
      isActive && 'bg-accent',
    );
  }

  protected readonly emojiButtonClass = computed(() =>
    cn(
      'flex items-center justify-center rounded p-1 text-xl hover:bg-accent transition-colors',
      'focus:outline-none focus:ring-1 focus:ring-ring',
    ),
  );

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectEmoji(emoji: Emoji): void {
    this.value.set(emoji.emoji);
    this.emojiSelect.emit(emoji);
    this.addToRecent(emoji);
  }

  private addToRecent(emoji: Emoji): void {
    const recent = this.recentEmojis();
    const filtered = recent.filter((e) => e.emoji !== emoji.emoji);
    const updated = [emoji, ...filtered].slice(0, this.maxRecent());
    this.recentEmojis.set(updated);
  }

  clearRecent(): void {
    this.recentEmojis.set([]);
  }
}
