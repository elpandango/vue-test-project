<template>
  <div class="add-product-form">
    <h2 class="title">Add new product</h2>
    <form id="add-product">
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
          <error-message v-if="errors.name"
                         type="error">Name is required!
          </error-message>
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
          <error-message v-if="errors.category"
                         type="error">Category is required!
          </error-message>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <input type="file"
                 name="photo"
                 ref="productPhoto"
                 @change="previewFiles">
          <error-message v-if="errors.photo && errors.message.length > 0"
                         type="error">{{errors.message}}
          </error-message>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col btn-block">
          <error-message v-if="errors.success"
                         type="success">Product has been successfully added!
          </error-message>

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
import ErrorMessage from "@/components/ui/error-message/ErrorMessage";

export default {
  name: "ProductAdd",
  components: {
    'error-message': ErrorMessage,
  },
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
      ],
      errors: {
        name: false,
        category: false,
        success: false,
        message: '',
        photo: false
      }
    }
  },
  methods: {
    removeFile() {
      let uploadedFile = this.$refs.productPhoto.files[0];
      this.$refs.productPhoto.file.removeFile(uploadedFile);
    },
    async previewFiles() {
      let typesArray = ['jpg', 'png'];
      let uploadedFile = this.$refs.productPhoto.files;
      let fileType = uploadedFile[0].type.split('/')[0];
      let imageType = uploadedFile[0].type.split('/')[1];

      if (fileType === 'image') {
        if (typesArray.includes(imageType)) {
          const reader = new FileReader;
          reader.onload = e => {
            let image = new Image();
            image.src = e.target.result;
            this.formData.photo = e.target.result;
          };
          reader.readAsDataURL(uploadedFile[0]);
          this.errors.photo = false;
          this.errors.message = '';
        } else {
          this.errors.photo = true;
          this.errors.message = 'Выбран неправильный формат картинки. Разрешены только форматы jpg и png';
          // this.$refs.productPhoto.files[0] = null;
        }
      } else {
        this.errors.photo = true;
        this.errors.message = 'Выбран неправильный тип файла. Разрешены только картинки';
      }

    },
    validateFields() {
      let errorCounter = 0;
      for (const key in this.formData) {
        if (!this.formData[key] && key !== 'photo') {
          this.errors[key] = true;
          this.errors.success = false;
          errorCounter++;
        } else {
          this.errors[key] = false;
        }
      }

      if (errorCounter === 0) {
        this.errors.success = true;
      }

      return errorCounter === 0;
    },
    generateId() {
      return Math.random().toString(36).substring(2);
    },
    resetErrorMessages() {
      setTimeout(function () {
        this.errors.name = false;
        this.errors.category = false;
        this.errors.success = false;
      }.bind(this), 1500);
    },
    resetForm() {
      this.formData = {
        name: '',
        category: '',
        photo: ''
      }
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
        image_base64: this.formData.photo,
        image_name: imageName,
        image_type: imageType,
      };

      if (!this.validateFields()) {
        return;
      }

      await httpRequest('POST', data);
      this.$emit('productAdded');
      this.resetErrorMessages();
      this.resetForm();
    }
  }
}
</script>

<style lang="scss" src="./styles.scss"></style>