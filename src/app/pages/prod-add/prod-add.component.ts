import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-prod-add',
  imports: [],
  templateUrl: './prod-add.component.html',
  styleUrl: './prod-add.component.css'
})
export class ProdAddComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const inputImg = document.getElementById("item-image") as HTMLInputElement;
    const uploadArea = document.getElementById("upload-area") as HTMLElement;

    inputImg?.addEventListener("change", () => {
      const file = inputImg.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          const imageUrl = e.target?.result as string;

          // Define a imagem como fundo da área
          uploadArea.style.backgroundImage = `url('${imageUrl}')`;
          uploadArea.classList.add("has-image");
        };
        reader.readAsDataURL(file);
      }
    });

    const sizeLabels = document.querySelectorAll(".item-sizes label");
    sizeLabels.forEach(label => {
      label.addEventListener("click", () => {
        label.classList.toggle("active");
      });
    });
  }
}
