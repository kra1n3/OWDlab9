document.addEventListener("DOMContentLoaded", () => {
  const bouquetsSection = document.querySelector(".wedding-bouquets");
  const leftButton = document.querySelector(".wedding-bouquets__button--left");
  const rightButton = document.querySelector(
    ".wedding-bouquets__button--right"
  );
  const descriptionElement = document.querySelector(
    ".wedding-bouquets__description"
  );
  const images = [
    "bouquets1.webp",
    "bouquets2.webp",
    "bouquets3.webp",
    "bouquets4.webp",
    "bouquets5.webp",
  ];
  const descriptions = [
    "Прекрасна композиція з білих троянд і дихання дитини ідеально підходить для класичного весілля.",
    "Яскраве поєднання соняшників і ромашок, що привносить відтінок літа у ваш особливий день.",
    "Елегантний і позачасовий букет містить червоні троянди та листя евкаліпта.",
    "Романтичний букет з рожевих півоній і лаванди ідеальний для весняного весілля.",
    "Екзотична композиція з орхідей і тропічних квітів ідеально підходить для пляжного весілля.",
  ];
  let currentImageIndex = 0;

  function updateBackgroundImage() {
    bouquetsSection.style.backgroundImage = `url("./images/${images[currentImageIndex]}")`;
    descriptionElement.textContent = descriptions[currentImageIndex];
  }

  leftButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateBackgroundImage();
  });

  rightButton.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateBackgroundImage();
  });

  updateBackgroundImage();
});
