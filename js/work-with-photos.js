'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var OPTIONS_PHOTO = {
    WIDTH: 140 + 'px',
    HEIGHT: 70 + 'px',
    MARGIN_LEFT: 17 + 'px',
    MARGIN_BOTTOM: 10 + 'px'
  };

  var avatar = {
    dropZone: document.querySelector('.upload .drop-zone'),
    chooser: document.querySelector('.upload input[type=file]'),
    preview: document.querySelector('.notice__preview img')
  };

  var photoAccommodation = {
    photosBlock: document.querySelector('.form__photo-container'),
    upLoadBlock: document.querySelector('.form__photo-container .upload'),
    dropZone: document.querySelector('.form__photo-container .drop-zone'),
    chooser: document.querySelector('.form__photo-container input[type=file]')
  };

  avatar.chooser.addEventListener('change', function () {
    var file = avatar.chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var loadPhotos = function (item) {
    var file = item;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newPhoto = document.createElement('img');
        photoAccommodation.photosBlock.insertBefore(newPhoto, photoAccommodation.upLoadBlock);
        newPhoto.style.width = OPTIONS_PHOTO.WIDTH;
        newPhoto.style.height = OPTIONS_PHOTO.HEIGHT;
        newPhoto.style.marginRight = OPTIONS_PHOTO.MARGIN_LEFT;
        newPhoto.style.marginBottom = OPTIONS_PHOTO.MARGIN_BOTTOM;
        newPhoto.classList.add('drop-zone');
        newPhoto.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  photoAccommodation.chooser.addEventListener('change', function () {
    for (var i = 0; i < photoAccommodation.chooser.files.length; i++) {
      loadPhotos(photoAccommodation.chooser.files[i]);
    }
  });

  avatar.dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  photoAccommodation.dropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  avatar.dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    avatar.chooser.files = evt.dataTransfer.files;
  });

  photoAccommodation.dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    photoAccommodation.chooser.files = evt.dataTransfer.files;
  });

})();
