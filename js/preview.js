const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;

const avatarChooser = document.querySelector('.ad-form-header__input');
const photoChooser = document.querySelector('.ad-form__input');
const avatarPreview = document.querySelector('.ad-form-header__avatar');
const photoPreview = document.querySelector('.ad-form__photo');

const imageForPreview = document.createElement('img');

photoPreview.append(imageForPreview);
imageForPreview.width = IMAGE_WIDTH;
imageForPreview.height = IMAGE_HEIGHT;
imageForPreview.classList.add('ad-form__photo-image');

const onImageChange = (input, output) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      output.src = URL.createObjectURL(file);
    }
  });
};

onImageChange(avatarChooser,avatarPreview);
onImageChange(photoChooser,imageForPreview);
