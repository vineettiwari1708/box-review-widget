document.addEventListener("DOMContentLoaded", function () {
  const scriptTag = document.getElementById("review-widget-script");
  if (!scriptTag) return;

  let reviews = [];

  try {
    reviews = JSON.parse(scriptTag.getAttribute("data-reviews")) || [];
  } catch (e) {
    console.error("Invalid review JSON in script tag:", e);
    return;
  }

  if (!reviews.length) return;

  let index = 0;

  const widget = document.createElement("div");
  widget.id = "review-widget";
  widget.style.position = "fixed";
  widget.style.bottom = "20px";
  widget.style.left = "20px";
  widget.style.width = "280px";
  widget.style.background = "#fff";
  widget.style.border = "1px solid #ccc";
  widget.style.borderRadius = "10px";
  widget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
  widget.style.padding = "16px";
  widget.style.zIndex = "100000";
  widget.style.fontSize = "14px";
  widget.style.lineHeight = "1.5";
  widget.style.display = "flex";
  widget.style.flexDirection = "column";
  widget.style.transition = "opacity 0.3s ease";
  widget.style.opacity = "0";

  const content = document.createElement("div");
  content.id = "review-content";
  widget.appendChild(content);

  document.body.appendChild(widget);

  function updateReview() {
    const review = reviews[index];
    content.innerHTML = `
      <div class="d-flex align-items-center mb-2">
        <i class="fas fa-user-circle fa-2x me-2 text-primary"></i>
        <strong>${review.name}</strong>
      </div>
      <p class="mb-1">"${review.message}"</p>
      <div class="text-warning">
        ${"★".repeat(review.stars)}${"☆".repeat(5 - review.stars)}
      </div>
    `;
    widget.style.opacity = "1";
    index = (index + 1) % reviews.length;
  }

  updateReview();
  setInterval(updateReview, 5000);
});
