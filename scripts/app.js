const inputBox = document.getElementById('input-box');
const inputFile = document.getElementById('file-input');
const imgPreview = document.querySelector('.img-preview');

inputFile.addEventListener('change', imageUpload);

function imageUpload()
{
   const file = inputFile.files[0];

   if (!file) return;

   const imgLink = URL.createObjectURL(file);
   imgPreview.innerHTML = `
   <img src="${imgLink}" alt="uploaded img">
   `

}