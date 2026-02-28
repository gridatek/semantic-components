I don't like the Image Cropper architecture and you didn't undestand my need so i created this doc to explain to you what i want.

I want the consumer to be able to use Image Cropper like this. we provide everthing css and behavour.
he can if he want change css.

create a new folder image-cropper-x and refcator the code there. for now keep both code

This is just an idea you neeed to comlpete from you in plan mode

```html
<div scxImageCropper>
  <div scxCropperArea>
    <!-- Original image will be displayed here -->
    <img scxCropperAreaSourceImage src="" alt="Image to crop" />

    <!-- Crop Overlay -->
    <div scxCropperAreaCropOverlay></div>

    <!-- Crop Box -->
    <div scxCropperAreaCropBox>
      <!-- Corner Handles -->
      <div scxCropperAreaCornerHandle position="top-left"></div>
      <div scxCropperAreaCornerHandle position="top-right"></div>
      <div scxCropperAreaCornerHandle position="bottom-left"></div>
      <div scxCropperAreaCornerHandle position="bottom-right"></div>

      <!-- Edge Handles -->
      <div scxCropperAreaEdgeHandle position="top"></div>
      <div scxCropperAreaEdgeHandle position="right"></div>
      <div scxCropperAreaEdgeHandle position="bottom"></div>
      <div scxCropperAreaEdgeHandle position="left"></div>

      <!-- Center Drag Area -->
      <div class="drag-area"></div>

      <!-- Grid Lines (Rule of Thirds) -->
      <div scxCropperAreaGridLines vertical="2" horizontal="3"></div>
    </div>
  </div>

  <!-- File Upload (Hidden, triggered by separate button) -->
  <input type="file" scxCropperAreaHiddenFileInput accept="image/*" />
</div>
```
