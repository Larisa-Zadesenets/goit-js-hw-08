// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList= document.querySelector(".gallery");
const imgCard = createImgCard (galleryItems);
galleryList.insertAdjacentHTML("beforeend", imgCard);

function createImgCard (galleryItems) {
    return galleryItems.map(({preview, original, description})=>{
        return `
        <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      
    />
  </a>
</li>
        `;
    }).join("");
}
const lightbox = new SimpleLightbox(".gallery__link", 
{ captionsData: "alt", captionDelay: "250" })