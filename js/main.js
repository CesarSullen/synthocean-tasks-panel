// Interception Observer
const animatedElements = document.querySelectorAll(
	".show-up, .show-down, .show-left, .show-right, .bounce-in, .rotate-left, .rotate-right"
);

const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animated");
				observer.unobserve(entry.target);
			}
		});
	},
	{ root: null, rootMargin: "0px", threshold: 0.2 }
);

animatedElements.forEach((el) => observer.observe(el));

// Accordion
const accordions = document.querySelectorAll(".accordion-item");

accordions.forEach((item) => {
	const header = item.querySelector(".accordion-header");

	header.addEventListener("click", () => {
		accordions.forEach((i) => {
			if (i !== item) {
				i.classList.remove("open");
				i.querySelector(".accordion-header").classList.remove("active");
			}
		});

		item.classList.toggle("open");
		header.classList.toggle("active");
	});
});
