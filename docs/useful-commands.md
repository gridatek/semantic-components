$env:FORCE_NG_UPDATE='true'
ng update

https://lucide-studio.vercel.app/

afterNextRender => afterFirstRender
afterRender => afterEachRender

remplace ngAfterViewInit with afterNextRender

npx npm-check-updates --filter "/@nx/\*/" --target greatest --upgrade

npx npm-check-updates --filter "/@nx/\*/" -u
npm i nx@latest

npx npm-check-updates "@angular\*" -u
npm i @schematics/angular@latest --force

npx npm-check-updates --filter "/@angular\*/" -u
npx npm-check-updates --filter "/@schematics/angular/" -u
npx npm-check-updates --filter "/ng-packagr/" -u

npx npm-check-updates @tiptap\* -u

nx generate @angular/core:cleanup-unused-imports

nx generate @angular/core:control-flow

nx generate @angular/core:inject

nx generate @angular/core:signal-input-migration

nx g @nx/angular:library libs/styles --publishable --import-path=@semantic-components/styles

nx g @nx/angular:library libs/logging --publishable --import-path=@semantic-components/logging

nx g @nx/angular:library libs/experimental --publishable --import-path=@semantic-components/experimental

nx g @nx/angular:library libs/image-cropper --publishable --import-path=@semantic-components/image-cropper

nx g @nx/angular:library libs/editor --publishable --import-path=@semantic-components/editor

nx g @nx/angular:library libs/code-highlighter --publishable --import-path=@semantic-components/code-highlighter

nx g @nx/angular:library libs/breadcrumb --publishable --import-path=@semantic-components/breadcrumb

nx g @nx/angular:application apps/breadcrumb-showcase
