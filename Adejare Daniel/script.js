const themeIcon = document.getElementById("theme-icon");
const themeIconClass = themeIcon.classList;

themeIcon.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (themeIconClass.contains("fa-sun")) {
    themeIconClass.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    themeIconClass.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});

let localTheme = localStorage.getItem("theme");
if (localTheme == "dark") {
  themeIconClass.replace("fa-moon", "fa-sun");
  document.body.classList.remove("light-theme");
} else if (localTheme == "light") {
  themeIconClass.replace("fa-sun", "fa-moon");
  document.body.classList.add("light-theme");
}
if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "dark");
}

// sidebar
const sidebar = document.getElementById("sidebar");
const sidebarToggler = document.getElementById("sidebar-toggler");
const closeSidebar = document.getElementById("close-sidebar");

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("open-sidebar");
});
closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("open-sidebar");
});

// filter buttons
const projectCards = document.querySelectorAll(".projects-container .row>div");
const btnContainer = document.querySelector(".filter-buttons-container");
if (projectCards.length > 0) {
  // create buttons dynamically using the category of all the items
  let buttons = ["all"];
  projectCards.forEach((element) => {
    const category = element.dataset.category;
    buttons.push(category);
  });
  buttons = [...new Set(buttons)];

  btnContainer.innerHTML = buttons
    .map((btnCategory) => {
      return `
    <button class="btn btn-primary filter-btn rounded-0 px-4 py-2 text-uppercase my-1" data-value=${btnCategory}>${btnCategory}</button>
    `;
    })
    .join("");

  const filterButtonsEl = document.querySelectorAll(".filter-btn");
  filterButtonsEl.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const categoryOfBtn = e.currentTarget.dataset.value;
      projectCards.forEach((element) => {
        if (categoryOfBtn == "all") {
          element.style.display = "block";
          return;
        }
        if (element.dataset.category != categoryOfBtn) {
          element.style.display = "none";
        } else {
          element.style.display = "block";
        }
      });
    });
  });
}
