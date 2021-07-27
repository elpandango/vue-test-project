<template>
  <div class="add-product-form">
    <h2 class="title">Add new product</h2>
    <form action="">
      <div class="form-row">
        <div class="form-col w50p">
          <div class="form-label">Name</div>
          <div class="form-control">
            <label><input type="email"
                          name="email"
                          v-model="formData.name"
                          placeholder="Product name"
                          required></label>
          </div>
        </div>

        <div class="form-col w50p">
          <div class="form-label">Category</div>
          <div class="form-control">
            <label>
              <select v-model="formData.category"
                      required>
                <option disabled value="">Please select category</option>
                <option v-for="option in categories"
                        :key="option.id">{{ option.value }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <input type="file"
                 name="photo"
                 ref="productPhoto"
                 @change="previewFiles">
        </div>
      </div>

      <div class="form-row">
        <div class="form-col btn-block">
          <button type="button"
                  @click="saveBtnClickHandler"
                  class="btn btn-default">Save
          </button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import {httpRequest} from "@/api";

export default {
  name: "ProductAdd",
  data() {
    return {
      formData: {
        name: '',
        category: '',
        photo: ''
      },
      categories: [
        {
          value: 'Category 1',
          id: 1
        },
        {
          value: 'Category 2',
          id: 2
        },
        {
          value: 'Category 3',
          id: 3
        },
        {
          value: 'Category 4',
          id: 4
        },
        {
          value: 'Category 5',
          id: 5
        }
      ]
    }
  },
  methods: {
    removeFile() {
      let uploadedFile = this.$refs.productPhoto.files[0];
      this.$refs.productPhoto.file.removeFile(uploadedFile);
    },
    previewFiles() {
      let typesArray = ['jpg', 'png'];
      let uploadedFile = this.$refs.productPhoto.files;
      let fileType = uploadedFile[0].type.split('/')[0];
      let imageType = uploadedFile[0].type.split('/')[1];

      if (fileType === 'image') {
        if (typesArray.includes(imageType)) {
          const reader = new FileReader;
          // console.log(reader);
          reader.onload = e => {
            let image = new Image();
            image.src = e.target.result;
            image.onload = (img) => {
              let width = parseInt(img.path[0].width);
              let height = parseInt(img.path[0].height);
              console.log('Image size: ', width, height);
            }
          };
          reader.readAsDataURL(uploadedFile[0]);
        } else {
          console.log('Выбран неправильный формат картинки. Разрешены только форматы jpg и png');
          // this.$refs.productPhoto.files[0] = null;
        }
      } else {
        // console.log('Выбран неправильный тип файла. Разрешены только картинки');
      }

    },
    generateId() {
      return Math.random().toString(36).substring(2);
    },
    async saveBtnClickHandler() {
      const id = this.generateId();
      const createdDate = new Date();
      const imageName = this.$refs.productPhoto.files[0]?.name ?? null;
      const imageType = this.$refs.productPhoto.files[0]?.type.split('/')[1] ?? null;
      const data = {
        id,
        created_date: createdDate,
        name: this.formData.name,
        category: this.formData.category,
        image_name: imageName,
        image_type: imageType,
      };

      // console.log(this.$refs.productPhoto.files[0]);

      await httpRequest('POST', data);

      // console.log(result);

      this.$emit('productAdded');

    }
  }
}
</script>

<style lang="scss" src="./styles.scss"></style>