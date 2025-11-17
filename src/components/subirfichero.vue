<template>
  <div class="form-container">
    <div class="form-header">
      <h2 class="form-title">
        <i class="fas fa-file"></i>
        Subir Fichero
      </h2>
      <p class="form-subtitle">Seleccione un archivo para subir</p>
    </div>

    <form class="file-form" v-on:submit.prevent="insertFile()">
      <div class="form-group">
        <label for="fileInput" class="form-label">
          <i class="fas fa-file-upload"></i>
          Seleccionar Archivo
        </label>
        <input
          type="file"
          id="fileInput"
          @change="onFileChange"
          class="form-input"
          required
        />
        <div class="input-icon">
          <i class="fas fa-file"></i>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
        <i class="fas fa-upload"></i>
        Subir Fichero
      </button>
    </form>
  </div>
</template>

<script>
import ServiceFile from "@/services/fichero.service.js";

const servicioFile = new ServiceFile();
export default {
  name: "FileUploadComponent",
  data() {
    return {
      file: {
        fileName: "",
        fileContent: "",
      },
    };
  },
  mounted() {},
  methods: {
    onFileChange(event) {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;

      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;
        this.file.fileName = selectedFile.name;
        this.file.fileContent = base64.split(',')[1];
      };

      reader.readAsDataURL(selectedFile);
    },
    insertFile() {
      servicioFile
        .createFile(this.file)
        .then((result) => {
          console.log(result);

            alert("Fichero subido correctamente");
          this.file = {
            fileName: "",
            fileContent: ""
          };
          document.getElementById("fileInput").value = "";
           
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  color: #2c3e50;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.form-title i {
  color: #667eea;
}

.form-subtitle {
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
}

.file-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
  margin-bottom: 0.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-label i {
  color: #667eea;
  width: 16px;
}

.form-input {
  width: 80%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e1e8ed;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-input::placeholder {
  color: #a0a0a0;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  transition: color 0.3s ease;
}

.form-input:focus + .input-icon {
  color: #667eea;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .form-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 1.5rem 1rem;
  }

  .form-title {
    font-size: 1.25rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-input {
    padding: 0.75rem 1rem 0.75rem 2.5rem;
  }

  .input-icon {
    left: 0.75rem;
  }
}
</style>