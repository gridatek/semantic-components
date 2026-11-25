# @semantic-components/ui/emoji-picker

A searchable emoji picker for the Semantic Components library, modelled on Frimousse: one virtualised list of every category with sticky headers, skin tones, the emojis' names in 28 languages, and the emojis the system can't draw left out. Its data is Emojibase's (`emojibase-data`).

## Install

`emojibase-data` (with `emojibase`, its types) is an optional peer of `@semantic-components/ui`: install it where you use the picker.

```sh
npm install emojibase-data emojibase
```

The data is bundled with your app — each locale a chunk of its own, loaded the first time a picker shows it. Nothing is fetched from a CDN, and there's nothing to host.

## Usage

```ts
import { ScEmojiPicker, ScEmojiPickerList, ScEmojiPickerSearch, ScEmojiPickerViewport } from '@semantic-components/ui/emoji-picker';
```

See `src/lib/components/emoji-picker/README.md` for every part.
